import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Modal,
  FlatList,
  Pressable,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/src/constants/colors";

const WEIGHT_UNITS = [
  { key: "kg", label: "Kilograms", icon: "⚖️" },
  { key: "g", label: "Grams", icon: "🔬" },
  { key: "mg", label: "Milligrams", icon: "💊" },
  { key: "lb", label: "Pounds", icon: "🏋️" },
  { key: "oz", label: "Ounces", icon: "🧂" },
  { key: "t", label: "Metric Tonnes", icon: "🚚" },
  { key: "st", label: "Stones", icon: "🪨" },
];

// All values in grams (relative to 1 unit)
const WEIGHT_TO_GRAMS: Record<string, number> = {
  kg: 1000,
  g: 1,
  mg: 0.001,
  lb: 453.59237,
  oz: 28.349523125,
  t: 1_000_000,
  st: 6350.29318,
};

type Props = {
  value: string;
  onChange: (v: string) => void;
  fromUnit: string;
  toUnit: string;
  onFromUnit: (u: string) => void;
  onToUnit: (u: string) => void;
};

const WeightConverter = ({
  value,
  onChange,
  fromUnit,
  toUnit,
  onFromUnit,
  onToUnit,
}: Props) => {
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);

  const convert = useCallback(() => {
    const num = parseFloat(value) || 0;
    const inGrams = num * WEIGHT_TO_GRAMS[fromUnit];
    const result = inGrams / WEIGHT_TO_GRAMS[toUnit];
    return result.toFixed(6).replace(/\.?0+$/, "") || "0";
  }, [value, fromUnit, toUnit]);

  const rate = (WEIGHT_TO_GRAMS[fromUnit] / WEIGHT_TO_GRAMS[toUnit])
    .toFixed(6)
    .replace(/\.?0+$/, "");

  const swap = () => {
    onFromUnit(toUnit);
    onToUnit(fromUnit);
  };

  const fromInfo = WEIGHT_UNITS.find((u) => u.key === fromUnit)!;
  const toInfo = WEIGHT_UNITS.find((u) => u.key === toUnit)!;

  return (
    <View style={styles.card}>
      <Text style={styles.label}>FROM</Text>

      <TouchableOpacity style={styles.selector} onPress={() => setShowFromPicker(true)}>
        <Text style={styles.icon}>{fromInfo.icon}</Text>
        <View style={{ flex: 1 }}>
          <Text style={styles.selectorText}>{fromInfo.key.toUpperCase()}</Text>
          <Text style={styles.selectorSub}>{fromInfo.label}</Text>
        </View>
        <Ionicons name="chevron-down" size={14} color={Colors.textMuted} />
      </TouchableOpacity>

      <TextInput
        value={value}
        onChangeText={onChange}
        style={styles.input}
        keyboardType="numeric"
        placeholder="Enter weight"
        placeholderTextColor={Colors.textMuted}
      />

      <TouchableOpacity style={styles.swapBtn} onPress={swap}>
        <Ionicons name="swap-vertical" size={18} color={Colors.bg} />
      </TouchableOpacity>

      <Text style={styles.label}>TO</Text>

      <TouchableOpacity style={styles.selector} onPress={() => setShowToPicker(true)}>
        <Text style={styles.icon}>{toInfo.icon}</Text>
        <View style={{ flex: 1 }}>
          <Text style={styles.selectorText}>{toInfo.key.toUpperCase()}</Text>
          <Text style={styles.selectorSub}>{toInfo.label}</Text>
        </View>
        <Ionicons name="chevron-down" size={14} color={Colors.textMuted} />
      </TouchableOpacity>

      <View style={styles.resultBox}>
        <Text style={styles.resultText}>{convert()}</Text>
      </View>

      <Text style={styles.rate}>
        1 {fromUnit.toUpperCase()} = {rate} {toUnit.toUpperCase()}
      </Text>

      {/* FROM Picker */}
      <UnitPicker
        visible={showFromPicker}
        units={WEIGHT_UNITS}
        selected={fromUnit}
        onSelect={(u) => { onFromUnit(u); setShowFromPicker(false); }}
        onClose={() => setShowFromPicker(false)}
        title="Select Unit (From)"
      />

      {/* TO Picker */}
      <UnitPicker
        visible={showToPicker}
        units={WEIGHT_UNITS}
        selected={toUnit}
        onSelect={(u) => { onToUnit(u); setShowToPicker(false); }}
        onClose={() => setShowToPicker(false)}
        title="Select Unit (To)"
      />
    </View>
  );
};

type PickerProps = {
  visible: boolean;
  units: { key: string; label: string; icon: string }[];
  selected: string;
  onSelect: (u: string) => void;
  onClose: () => void;
  title: string;
};

const UnitPicker = ({ visible, units, selected, onSelect, onClose, title }: PickerProps) => (
  <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
    <Pressable style={pickerStyles.overlay} onPress={onClose}>
      <View style={pickerStyles.sheet}>
        <Text style={pickerStyles.title}>{title}</Text>
        <FlatList
          data={units}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[pickerStyles.row, item.key === selected && pickerStyles.active]}
              onPress={() => onSelect(item.key)}
            >
              <Text style={pickerStyles.icon}>{item.icon}</Text>
              <View style={{ flex: 1 }}>
                <Text style={pickerStyles.unitKey}>{item.key.toUpperCase()}</Text>
                <Text style={pickerStyles.unitLabel}>{item.label}</Text>
              </View>
              {item.key === selected && (
                <Ionicons name="checkmark" size={16} color={Colors.accent} />
              )}
            </TouchableOpacity>
          )}
        />
      </View>
    </Pressable>
  </Modal>
);

export default WeightConverter;

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
    gap: 8,
  },
  icon: { fontSize: 18 },
  selectorText: {
    fontSize: 14,
    fontWeight: "700",
    color: Colors.textPrimary,
  },
  selectorSub: {
    fontSize: 11,
    color: Colors.textMuted,
    marginTop: 1,
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

const pickerStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: Colors.overlay,
  },
  sheet: {
    backgroundColor: Colors.surface,
    padding: 20,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: "60%",
  },
  title: {
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 12,
    color: Colors.textPrimary,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 14,
  },
  active: {
    backgroundColor: Colors.accentDim,
    borderRadius: 10,
    paddingHorizontal: 8,
  },
  icon: { fontSize: 18 },
  unitKey: {
    fontSize: 14,
    fontWeight: "700",
    color: Colors.textPrimary,
  },
  unitLabel: {
    fontSize: 11,
    color: Colors.textMuted,
    marginTop: 1,
  },
});