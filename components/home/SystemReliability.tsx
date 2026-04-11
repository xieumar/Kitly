import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/src/constants/colors";

export default function SystemReliability() {
  return (
    <Animated.View entering={FadeInDown.delay(500)} style={styles.card}>
      <Text style={styles.title}>System Reliability</Text>

      <View style={styles.stats}>
        <View>
          <Text style={styles.value}>99.98%</Text>
          <Text style={styles.label}>UPTIME</Text>
        </View>

        <View>
          <Text style={styles.value}>14ms</Text>
          <Text style={styles.label}>LATENCY</Text>
        </View>
      </View>

      <Text style={styles.desc}>
        KITLY's infrastructure is optimized for low-latency execution and high-frequency workflows.
      </Text>

      <View style={styles.badge}>
        <Ionicons name="lock-closed" size={11} color={Colors.accent} />
        <Text style={styles.badgeText}>ENCRYPTED CONNECTION</Text>
      </View>
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
  title: { fontSize: 18, fontWeight: "800", marginBottom: 16, color: Colors.textPrimary },
  stats: { flexDirection: "row", gap: 24, marginBottom: 16 },
  value: { fontSize: 24, fontWeight: "800", color: Colors.accent },
  label: { fontSize: 9, color: Colors.textMuted },
  desc: { fontSize: 12, color: Colors.textSecondary, marginBottom: 16 },
  badge: { flexDirection: "row", gap: 6, alignItems: "center" },
  badgeText: { fontSize: 9, color: Colors.accent, fontWeight: "700" },
});