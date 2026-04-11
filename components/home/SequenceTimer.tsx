import React, { useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  FadeInDown,
  cancelAnimation,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/src/constants/colors";

type TimerState = "idle" | "running" | "paused" | "stopped";

export default function SequenceTimer() {
  const [elapsed, setElapsed] = useState(0);
  const [timerState, setTimerState] = useState<TimerState>("idle");
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTicking = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setElapsed((s) => s + 1);
    }, 1000);
  };

  const stopTicking = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    return () => stopTicking();
  }, []);

  const handleStartPause = () => {
    if (timerState === "idle" || timerState === "paused") {
      setTimerState("running");
      startTicking();
    } else if (timerState === "running") {
      setTimerState("paused");
      stopTicking();
    }
  };

  const handleStop = () => {
    stopTicking();
    setTimerState("stopped");
  };

  const handleReset = () => {
    stopTicking();
    setElapsed(0);
    setTimerState("idle");
  };

  const h = Math.floor(elapsed / 3600);
  const m = Math.floor((elapsed % 3600) / 60);
  const s = elapsed % 60;

  const display =
    h > 0
      ? `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
      : `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;

  const pulse = useSharedValue(1);

  useEffect(() => {
    if (timerState === "running") {
      pulse.value = withRepeat(
        withSequence(
          withTiming(1.06, { duration: 800 }),
          withTiming(1, { duration: 800 })
        ),
        -1
      );
    } else {
      cancelAnimation(pulse);
      pulse.value = withTiming(1, { duration: 300 });
    }
  }, [timerState]);

  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulse.value }],
  }));

  const isRunning = timerState === "running";
  const isStopped = timerState === "stopped";
  const isIdle = timerState === "idle";

  const circleBorderColor = isStopped
    ? Colors.danger + "66"
    : isRunning
    ? Colors.accentBorder
    : Colors.border;

  const circleBg = isStopped
    ? Colors.dangerDim
    : isRunning
    ? Colors.accentDim
    : "transparent";

  const statusDotColor = isRunning
    ? Colors.accent
    : isStopped
    ? Colors.danger
    : Colors.textMuted;

  const statusLabel = isRunning
    ? "RUNNING"
    : timerState === "paused"
    ? "PAUSED"
    : isStopped
    ? "STOPPED"
    : "READY";

  return (
    <Animated.View entering={FadeInDown.delay(300)} style={styles.card}>
      <View style={styles.header}>
        <Ionicons name="timer-outline" size={14} color={Colors.accent} />
        <Text style={styles.label}>SEQUENCE TIMER</Text>
        <View style={styles.statusBadge}>
          <View style={[styles.statusDot, { backgroundColor: statusDotColor }]} />
          <Text style={[styles.statusText, { color: statusDotColor }]}>
            {statusLabel}
          </Text>
        </View>
      </View>

      <Animated.View
        style={[
          styles.circle,
          pulseStyle,
          { borderColor: circleBorderColor, backgroundColor: circleBg },
        ]}
      >
        <Text style={styles.value}>{display}</Text>
        {!isIdle && (
          <Text style={styles.unit}>{h > 0 ? "h : m : s" : "min : sec"}</Text>
        )}
        {isIdle && <Text style={styles.idleHint}>tap start</Text>}
      </Animated.View>

      <View style={styles.btns}>
        <TouchableOpacity style={styles.iconBtn} onPress={handleReset}>
          <Ionicons name="refresh" size={16} color={Colors.textSecondary} />
          <Text style={styles.iconBtnText}>RESET</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.primaryBtn, isStopped && styles.primaryBtnDisabled]}
          onPress={handleStartPause}
          disabled={isStopped}
        >
          <Ionicons
            name={isRunning ? "pause" : "play"}
            size={16}
            color={isStopped ? Colors.textMuted : Colors.bg}
          />
          <Text
            style={[styles.primaryBtnText, isStopped && { color: Colors.textMuted }]}
          >
            {isRunning ? "PAUSE" : isIdle ? "START" : "RESUME"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.iconBtn,
            styles.stopBtn,
            (isStopped || isIdle) && styles.iconBtnDisabled,
          ]}
          onPress={handleStop}
          disabled={isStopped || isIdle}
        >
          <Ionicons
            name="stop"
            size={16}
            color={isStopped || isIdle ? Colors.textMuted : Colors.danger}
          />
          <Text
            style={[
              styles.iconBtnText,
              { color: isStopped || isIdle ? Colors.textMuted : Colors.danger },
            ]}
          >
            STOP
          </Text>
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
  header: {
    flexDirection: "row",
    alignSelf: "stretch",
    alignItems: "center",
    gap: 6,
  },
  label: {
    fontSize: 10,
    fontWeight: "700",
    color: Colors.accent,
    flex: 1,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusText: {
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  circle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
    gap: 4,
  },
  value: {
    fontSize: 28,
    fontWeight: "700",
    color: Colors.textPrimary,
    letterSpacing: 1,
  },
  unit: {
    fontSize: 9,
    color: Colors.textMuted,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  idleHint: {
    fontSize: 9,
    color: Colors.textMuted,
    fontWeight: "600",
    fontStyle: "italic",
  },
  btns: {
    flexDirection: "row",
    gap: 8,
    alignSelf: "stretch",
  },
  iconBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 10,
    gap: 4,
  },
  iconBtnDisabled: {
    opacity: 0.4,
  },
  stopBtn: {
    borderColor: Colors.danger + "44",
  },
  iconBtnText: {
    fontSize: 9,
    color: Colors.textSecondary,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  primaryBtn: {
    flex: 2,
    backgroundColor: Colors.accent,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
  },
  primaryBtnDisabled: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  primaryBtnText: {
    fontSize: 11,
    color: Colors.bg,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
});