import { Colors } from "@/src/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

type Props = {
  title: string;
  subtitle: string;
  primaryLabel: string;
  onPrimary: () => void;
  icon: keyof typeof Ionicons.glyphMap;
};

export default function ModuleCard({
  title,
  subtitle,
  primaryLabel,
  onPrimary,
  icon,
}: Props) {
  return (
    <Animated.View entering={FadeInDown.delay(100).duration(400)} style={styles.card}>
      <View style={styles.header}>
        <View style={styles.iconBox}>
          <Ionicons name={icon} size={20} color={Colors.accent} />
        </View>


      </View>

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.sub}>{subtitle}</Text>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.btn} onPress={onPrimary}>
          <Text style={styles.btnText}>{primaryLabel}</Text>
        </TouchableOpacity>

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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  iconBox: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: Colors.accentDim,
    borderWidth: 1,
    borderColor: Colors.accentBorder,
    alignItems: "center",
    justifyContent: "center",
  },
  badge: {
    backgroundColor: Colors.surface,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  badgeText: {
    fontSize: 9,
    fontWeight: "700",
    color: Colors.textMuted,
  },
  title: {
    fontSize: 17,
    fontWeight: "700",
    color: Colors.textPrimary,
    marginBottom: 6,
  },
  sub: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 16,
  },
  actions: { flexDirection: "row", gap: 10 },
  btn: {
    flex: 1,
    backgroundColor: Colors.accent,
    paddingVertical: 11,
    borderRadius: 10,
    alignItems: "center",
  },
  btnText: {
    fontSize: 11,
    fontWeight: "800",
    color: Colors.bg,
  },
  settings: {
    width: 42,
    borderRadius: 10,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
});