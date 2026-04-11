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
      <TouchableOpacity onPress={onOpenFrom}>
        <Text>{CURRENCY_FLAGS[from]} {from}</Text>
      </TouchableOpacity>

      <TextInput value={amount} onChangeText={onChangeAmount} style={styles.input} />

      <TouchableOpacity onPress={onSwap}>
        <Ionicons name="swap-vertical" size={20} />
      </TouchableOpacity>

      <TouchableOpacity onPress={onOpenTo}>
        <Text>{CURRENCY_FLAGS[to]} {to}</Text>
      </TouchableOpacity>

      <Text>{result}</Text>
      <Text>{rate}</Text>
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
    marginBottom: 16,
  },
  input: { fontSize: 24 },
});