import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { ACTIVITY_ITEMS } from "@/src/constants/mockData";
import { Colors } from "@/src/constants/colors";

export default function RecentActivity() {
  return (
    <Animated.View entering={FadeInDown.delay(400)} style={styles.card}>
      <Text style={styles.label}>RECENT ACTIVITY</Text>

      {ACTIVITY_ITEMS.map((item) => (
        <View key={item.time} style={styles.row}>
          <View style={styles.dot} />
          <Text style={styles.text}>{item.text}</Text>
          <Text style={styles.time}>{item.time}</Text>
        </View>
      ))}

      <TouchableOpacity style={styles.link}>
        <Text style={styles.linkText}>VIEW AUDIT LOG</Text>
        <Ionicons name="chevron-forward" size={12} color={Colors.accent} />
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
  label: {
    fontSize: 9,
    fontWeight: "700",
    color: Colors.textMuted,
    marginBottom: 14,
  },
  row: { flexDirection: "row", gap: 10, marginBottom: 10 },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: Colors.accent },
  text: { flex: 1, color: Colors.textSecondary, fontSize: 12 },
  time: { fontSize: 10, color: Colors.textMuted },
  link: { flexDirection: "row", gap: 4, marginTop: 6 },
  linkText: { fontSize: 10, fontWeight: "700", color: Colors.accent },
});