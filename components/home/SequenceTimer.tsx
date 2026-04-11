import React, { useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, withSequence, FadeInDown } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/src/constants/colors";

export default function SequenceTimer() {
  const [seconds, setSeconds] = useState(842);
  const [running, setRunning] = useState(true);
 const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setSeconds((s) => (s > 0 ? s - 1 : 0));
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running]);

  const m = String(Math.floor(seconds / 60)).padStart(2, "0");
  const s = String(seconds % 60).padStart(2, "0");

  const pulse = useSharedValue(1);

  useEffect(() => {
    pulse.value = withRepeat(
      withSequence(
        withTiming(1.06, { duration: 800 }),
        withTiming(1, { duration: 800 })
      ),
      -1
    );
  }, []);

  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulse.value }],
  }));

  return (
    <Animated.View entering={FadeInDown.delay(300)} style={styles.card}>
      <View style={styles.header}>
        <Ionicons name="timer-outline" size={14} color={Colors.accent} />
        <Text style={styles.label}>SEQUENCE TIMER</Text>
      </View>

      <Animated.View style={[styles.circle, pulseStyle]}>
        <Text style={styles.value}>{`${m}:${s}`}</Text>
      </Animated.View>

      <View style={styles.btns}>
        <TouchableOpacity
          style={styles.outline}
          onPress={() => {
            setSeconds(842);
            setRunning(false);
          }}
        >
          <Text style={styles.outText}>RESET</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.fill} onPress={() => setRunning((r) => !r)}>
          <Text style={styles.fillText}>{running ? "PAUSE" : "RESUME"}</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: "center",
    marginBottom: 14,
  },
  header: { flexDirection: "row", alignSelf: "flex-start", gap: 6 },
  label: { fontSize: 10, fontWeight: "700", color: Colors.accent },
  circle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: Colors.accentBorder,
    backgroundColor: Colors.accentDim,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  value: { fontSize: 28, fontWeight: "700", color: Colors.textPrimary },
  btns: { flexDirection: "row", gap: 12, alignSelf: "stretch" },
  outline: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingVertical: 11,
    alignItems: "center",
    borderRadius: 10,
  },
  fill: {
    flex: 1,
    backgroundColor: Colors.accent,
    paddingVertical: 11,
    alignItems: "center",
    borderRadius: 10,
  },
  outText: { fontSize: 11, color: Colors.textSecondary, fontWeight: "700" },
  fillText: { fontSize: 11, color: Colors.bg, fontWeight: "800" },
});