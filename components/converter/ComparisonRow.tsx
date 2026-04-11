import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "@/src/constants/colors";
import { CURRENCY_FLAGS } from "@/src/constants/mockData";

type Props = {
  currency: string;
  amount: number;
  change: string;
  positive: boolean;
};

const ComparisonRow = ({ currency, amount, change, positive }: Props) => {
  return (
    <View style={styles.row}>
      <Text style={styles.flag}>{CURRENCY_FLAGS[currency]}</Text>

      <Text style={styles.amount}>{amount.toFixed(2)}</Text>

      <Text style={[styles.change, positive ? styles.pos : styles.neg]}>
        {change}
      </Text>
    </View>
  );
};

export default ComparisonRow;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    marginBottom: 8,
    backgroundColor: Colors.card,
  },
  flag: {
    fontSize: 18,
    marginRight: 10,
  },
  amount: {
    flex: 1,
    fontSize: 14,
    fontWeight: "700",
    color: Colors.textPrimary,
  },
  change: {
    fontSize: 12,
    fontWeight: "700",
  },
  pos: { color: Colors.accent },
  neg: { color: Colors.danger },
});