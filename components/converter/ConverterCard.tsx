import React from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/src/constants/colors";
import { CURRENCY_FLAGS } from "@/src/constants/mockData";

type Props = {
  from: string;
  to: string;
  amount: string;
  result: string;
  rate: string;
  onChangeAmount: (v: string) => void;
  onSwap: () => void;
  onOpenFrom: () => void;
  onOpenTo: () => void;
};

const ConverterCard = ({
  from,
  to,
  amount,
  result,
  rate,
  onChangeAmount,
  onSwap,
  onOpenFrom,
  onOpenTo,
}: Props) => {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>FROM</Text>

      <TouchableOpacity style={styles.selector} onPress={onOpenFrom}>
        <Text style={styles.flag}>{CURRENCY_FLAGS[from]}</Text>
        <Text style={styles.selectorText}>{from}</Text>
      </TouchableOpacity>

      <TextInput
        value={amount}
        onChangeText={onChangeAmount}
        style={styles.input}
        keyboardType="numeric"
        placeholder="Enter amount"
        placeholderTextColor={Colors.textMuted}
      />

      <TouchableOpacity style={styles.swapBtn} onPress={onSwap}>
        <Ionicons name="swap-vertical" size={18} color={Colors.bg} />
      </TouchableOpacity>

      <Text style={styles.label}>TO</Text>

      <TouchableOpacity style={styles.selector} onPress={onOpenTo}>
        <Text style={styles.flag}>{CURRENCY_FLAGS[to]}</Text>
        <Text style={styles.selectorText}>{to}</Text>
      </TouchableOpacity>

      <View style={styles.resultBox}>
        <Text style={styles.resultText}>{result}</Text>
      </View>

      <Text style={styles.rate}>{rate}</Text>
    </View>
  );
};

export default ConverterCard;

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.card,
    marginBottom: 16,
  },
  label: {
    fontSize: 10,
    fontWeight: "700",
    color: Colors.textMuted,
    marginBottom: 6,
  },
  selector: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.surface,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 10,
  },
  selectorText: {
    fontSize: 14,
    fontWeight: "700",
    color: Colors.textPrimary,
  },
  flag: {
    fontSize: 18,
    marginRight: 8,
  },
  input: {
    fontSize: 22,
    fontWeight: "800",
    color: Colors.textPrimary,
    textAlign: "right",
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
  },
  swapBtn: {
    alignSelf: "center",
    marginVertical: 12,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.accent,
    alignItems: "center",
    justifyContent: "center",
  },
  resultBox: {
    marginTop: 10,
    padding: 12,
    borderRadius: 10,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.accentBorder,
  },
  resultText: {
    fontSize: 20,
    fontWeight: "800",
    color: Colors.accent,
    textAlign: "right",
  },
  rate: {
    marginTop: 8,
    fontSize: 11,
    color: Colors.textSecondary,
  },
});