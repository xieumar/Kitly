import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Colors } from "@/src/constants/colors";

export default function CalculatorCard() {
  return (
    <Animated.View entering={FadeInDown.delay(200).duration(400)} style={styles.card}>
      <View style={styles.header}>
        <Ionicons name="calculator-outline" size={14} color={Colors.accent} />
        <Text style={styles.label}>CALCULATOR</Text>
      </View>

      <Text style={styles.amount}>27,000.00</Text>

      <TouchableOpacity style={styles.btn}>
        <Text style={styles.btnText}>POLY_INTERFACE</Text>
      </TouchableOpacity>
    </Animated.View>
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
  header: { flexDirection: "row", gap: 6, alignItems: "center", marginBottom: 8 },
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
  },
  btnText: {
    fontSize: 11,
    fontWeight: "700",
    color: Colors.textSecondary,
  },
});