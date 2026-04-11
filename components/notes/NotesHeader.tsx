import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeIn } from "react-native-reanimated";
import { Colors } from "@/src/constants/colors";

type Props = { noteCount: number };

export default function NotesHeader({ noteCount }: Props) {
  return (
    <Animated.View entering={FadeIn.duration(300)} style={styles.container}>
      <View style={styles.logoRow}>
        <Ionicons name="flash" size={22} color={Colors.accent} />
        <Text style={styles.logoText}>KITLY</Text>
      </View>
      <View style={styles.meta}>
        <Text style={styles.heading}>Notes</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{noteCount}</Text>
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  logoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 14,
  },
  logoText: {
    fontSize: 20,
    fontWeight: "800",
    letterSpacing: 2,
    color: Colors.textPrimary,
  },
  meta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  heading: {
    fontSize: 26,
    fontWeight: "800",
    color: Colors.textPrimary,
    letterSpacing: -0.5,
  },
  badge: {
    backgroundColor: Colors.accentDim,
    borderWidth: 1,
    borderColor: Colors.accentBorder,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "700",
    color: Colors.accent,
  },
});