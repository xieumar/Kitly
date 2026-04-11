import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Pressable,
  StyleSheet,
  Vibration,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Colors } from "@/src/constants/colors";

type ButtonDef = {
  label: string;
  type: "number" | "operator" | "action" | "equals";
  value: string;
};

const BUTTONS: ButtonDef[][] = [
  [
    { label: "AC", type: "action", value: "AC" },
    { label: "+/-", type: "action", value: "NEGATE" },
    { label: "%", type: "action", value: "%" },
    { label: "÷", type: "operator", value: "/" },
  ],
  [
    { label: "7", type: "number", value: "7" },
    { label: "8", type: "number", value: "8" },
    { label: "9", type: "number", value: "9" },
    { label: "×", type: "operator", value: "*" },
  ],
  [
    { label: "4", type: "number", value: "4" },
    { label: "5", type: "number", value: "5" },
    { label: "6", type: "number", value: "6" },
    { label: "−", type: "operator", value: "-" },
  ],
  [
    { label: "1", type: "number", value: "1" },
    { label: "2", type: "number", value: "2" },
    { label: "3", type: "number", value: "3" },
    { label: "+", type: "operator", value: "+" },
  ],
  [
    { label: "0", type: "number", value: "0" },
    { label: ".", type: "number", value: "." },
    { label: "⌫", type: "action", value: "DEL" },
    { label: "=", type: "equals", value: "=" },
  ],
];

function formatDisplay(val: string): string {
  if (val.length === 0) return "0";
  const num = parseFloat(val);
  if (isNaN(num)) return val;
  if (Math.abs(num) >= 1e12) return num.toExponential(4);
  const parts = val.split(".");
  const intPart = parseInt(parts[0], 10);
  const formatted = isNaN(intPart) ? parts[0] : intPart.toLocaleString();
  return parts.length > 1 ? `${formatted}.${parts[1]}` : formatted;
}

export default function CalculatorCard() {
  const [open, setOpen] = useState(false);
  const [display, setDisplay] = useState("0");
  const [expression, setExpression] = useState("");
  const [operand, setOperand] = useState("");
  const [operator, setOperator] = useState<string | null>(null);
  const [justEvaluated, setJustEvaluated] = useState(false);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const reset = () => {
    setDisplay("0");
    setExpression("");
    setOperand("");
    setOperator(null);
    setJustEvaluated(false);
    setWaitingForOperand(false);
  };

  const evaluate = (a: string, op: string, b: string): string => {
    const numA = parseFloat(a);
    const numB = parseFloat(b);
    if (isNaN(numA) || isNaN(numB)) return b;
    let result: number;
    switch (op) {
      case "+": result = numA + numB; break;
      case "-": result = numA - numB; break;
      case "*": result = numA * numB; break;
      case "/": result = numB !== 0 ? numA / numB : 0; break;
      default: result = numB;
    }
    const str = result.toPrecision(12);
    return parseFloat(str).toString();
  };

  const handlePress = (btn: ButtonDef) => {
    Vibration.vibrate(10);

    if (btn.value === "AC") {
      reset();
      return;
    }

    if (btn.value === "DEL") {
      if (display === "0" || display.length === 1) {
        setDisplay("0");
      } else {
        setDisplay((d) => d.slice(0, -1));
      }
      return;
    }

    if (btn.value === "NEGATE") {
      if (display !== "0") {
        setDisplay((d) => (d.startsWith("-") ? d.slice(1) : "-" + d));
      }
      return;
    }

    if (btn.value === "%") {
      const num = parseFloat(display) || 0;
      let result: number;
      if (operator && operand) {
        const base = parseFloat(operand) || 0;
        if (operator === "+" || operator === "-") {
          result = base * (num / 100);
        } else {
          result = num / 100;
        }
      } else {
        result = num / 100;
      }
      const str = parseFloat(result.toPrecision(12)).toString();
      setDisplay(str);
      setWaitingForOperand(false);
      return;
    }

    if (btn.type === "operator") {
      if (operator && operand && !justEvaluated) {
        const result = evaluate(operand, operator, display);
        setDisplay(result);
        setOperand(result);
        setExpression(`${formatDisplay(result)} ${btn.label}`);
      } else {
        setOperand(display);
        setExpression(`${formatDisplay(display)} ${btn.label}`);
      }
      setOperator(btn.value);
      setJustEvaluated(false);
      setWaitingForOperand(true);
      return;
    }

    if (btn.value === "=") {
      if (operator && operand) {
        const result = evaluate(operand, operator, display);
        setExpression(`${formatDisplay(operand)} ${
          operator === "/" ? "÷" : operator === "*" ? "×" : operator === "-" ? "−" : "+"
        } ${formatDisplay(display)} =`);
        setDisplay(result);
        setOperand("");
        setOperator(null);
        setJustEvaluated(true);
      }
      return;
    }

    if (btn.type === "number") {
      if (waitingForOperand) {
        setDisplay(btn.value === "." ? "0." : btn.value);
        setWaitingForOperand(false);
        return;
      }
      if (justEvaluated) {
        setDisplay(btn.value === "." ? "0." : btn.value);
        setJustEvaluated(false);
        return;
      }
      if (btn.value === "." && display.includes(".")) return;
      if (display === "0" && btn.value !== ".") {
        setDisplay(btn.value);
      } else {
        if (display.replace("-", "").replace(".", "").length >= 10) return;
        setDisplay((d) => d + btn.value);
      }
    }
  };

  const bgForType = (type: ButtonDef["type"]) => {
    if (type === "equals") return Colors.accent;
    if (type === "operator" || type === "action") return Colors.surface;
    return Colors.card;
  };

  const colorForType = (type: ButtonDef["type"]) => {
    if (type === "equals") return Colors.bg;
    if (type === "operator") return Colors.accent;
    if (type === "action") return Colors.textSecondary;
    return Colors.textPrimary;
  };

  return (
    <>
      <Animated.View entering={FadeInDown.delay(200).duration(400)} style={styles.card}>
        <View style={styles.header}>
          <Ionicons name="calculator-outline" size={14} color={Colors.accent} />
          <Text style={styles.label}>CALCULATOR</Text>
        </View>

        <Text style={styles.amount} numberOfLines={1} adjustsFontSizeToFit>
          {formatDisplay(display)}
        </Text>

        <TouchableOpacity style={styles.btn} onPress={() => setOpen(true)}>
          <Ionicons name="calculator" size={13} color={Colors.textSecondary} />
          <Text style={styles.btnText}>OPEN CALCULATOR</Text>
        </TouchableOpacity>
      </Animated.View>

      <Modal visible={open} transparent animationType="slide" onRequestClose={() => setOpen(false)}>
        <Pressable style={styles.overlay} onPress={() => setOpen(false)}>
          <Pressable style={styles.sheet} onPress={(e) => e.stopPropagation()}>
            <View style={styles.sheetHandle} />

            <View style={styles.displayArea}>
              {expression ? (
                <Text style={styles.expressionText} numberOfLines={1}>{expression}</Text>
              ) : null}
              <Text style={styles.displayText} numberOfLines={1} adjustsFontSizeToFit>
                {formatDisplay(display)}
              </Text>
            </View>

            <View style={styles.grid}>
              {BUTTONS.map((row, ri) => (
                <View key={ri} style={styles.row}>
                  {row.map((btn) => (
                    <TouchableOpacity
                      key={btn.value}
                      style={[styles.key, { backgroundColor: bgForType(btn.type) }]}
                      onPress={() => handlePress(btn)}
                      activeOpacity={0.7}
                    >
                      <Text style={[styles.keyText, { color: colorForType(btn.type) }]}>
                        {btn.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              ))}
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 18,
    marginBottom: 14,
  },
  header: {
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
    marginBottom: 8,
  },
  label: { fontSize: 10, fontWeight: "700", color: Colors.accent },
  amount: {
    fontSize: 36,
    fontWeight: "800",
    color: Colors.textPrimary,
    marginBottom: 14,
  },
  btn: {
    backgroundColor: Colors.surface,
    borderRadius: 10,
    paddingVertical: 11,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
  },
  btnText: {
    fontSize: 11,
    fontWeight: "700",
    color: Colors.textSecondary,
  },
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: Colors.overlay,
  },
  sheet: {
    backgroundColor: Colors.bg,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingTop: 12,
    paddingHorizontal: 16,
    paddingBottom: 32,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  sheetHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.border,
    alignSelf: "center",
    marginBottom: 16,
  },
  displayArea: {
    alignItems: "flex-end",
    paddingHorizontal: 8,
    paddingVertical: 12,
    minHeight: 90,
    justifyContent: "flex-end",
  },
  expressionText: {
    fontSize: 14,
    color: Colors.textMuted,
    fontWeight: "500",
    marginBottom: 4,
  },
  displayText: {
    fontSize: 52,
    fontWeight: "700",
    color: Colors.textPrimary,
    letterSpacing: -1,
  },
  grid: {
    gap: 10,
    marginTop: 8,
  },
  row: {
    flexDirection: "row",
    gap: 10,
  },
  key: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: Colors.border,
  },
  keyText: {
    fontSize: 22,
    fontWeight: "600",
  },
});