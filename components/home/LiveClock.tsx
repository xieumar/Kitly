import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "@/src/constants/colors";

export default function LiveClock() {
  const [time, setTime] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const h = String(time.getHours()).padStart(2, "0");
  const m = String(time.getMinutes()).padStart(2, "0");
  const s = String(time.getSeconds()).padStart(2, "0");

  return (
    <View style={styles.clockRow}>
      <Text style={styles.clockLabel}>LOCAL TIME</Text>
      <View style={styles.clockValueRow}>
        <Text style={styles.clockText}>{`${h}:${m}:${s}`}</Text>
        <View style={styles.tzBadge}>
          <Text style={styles.tzText}>UTC-7</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  clockRow: { marginBottom: 24 },
  clockLabel: {
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 1.5,
    color: Colors.textMuted,
    marginBottom: 4,
  },
  clockValueRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  clockText: {
    fontSize: 28,
    fontWeight: "700",
    color: Colors.accent,
    fontVariant: ["tabular-nums"],
  },
  tzBadge: {
    backgroundColor: Colors.surface,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  tzText: { fontSize: 10, fontWeight: "600", color: Colors.textSecondary },
});