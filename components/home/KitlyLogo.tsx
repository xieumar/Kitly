import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/src/constants/colors";

export default function KitlyLogo() {
  return (
    <View style={styles.logoRow}>
      <Ionicons name="flash" size={18} color={Colors.accent} />
      <Text style={styles.logoText}>KITLY</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  logoRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  logoText: {
    fontSize: 15,
    fontWeight: "800",
    letterSpacing: 2,
    color: Colors.textPrimary,
  },
});