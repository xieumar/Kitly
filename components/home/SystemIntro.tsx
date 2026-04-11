import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import LiveClock from "./LiveClock";
import { Colors } from "@/src/constants/colors";

export default function SystemIntro() {
  return (
    <Animated.View entering={FadeInDown.delay(50).duration(400)} style={styles.wrapper}>
      <Text style={styles.systemStatus}>SYSTEM STATUS: OPTIMAL</Text>

      <Text style={styles.welcomeText}>
        Welcome,{"\n"}Kitler.
      </Text>

      <Text style={styles.welcomeSub}>
        Precision orchestration for your daily workflows. All modules are calibrated and ready for execution.
      </Text>

      <LiveClock />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 24,
  },
  systemStatus: {
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1.5,
    color: Colors.accent,
    marginBottom: 6,
  },
  welcomeText: {
    fontSize: 34,
    fontWeight: "800",
    color: Colors.textPrimary,
    lineHeight: 42,
    marginBottom: 12,
  },
  welcomeSub: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 20,
    marginBottom: 24,
  },
});