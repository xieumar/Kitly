import React, { useEffect, useState, useRef, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  FadeIn,
  FadeInDown,
} from 'react-native-reanimated';
import { Colors } from '@/src/constants/colors';
import { ACTIVITY_ITEMS } from '@/src/constants/mockData';

function KitlyLogo() {
  return (
    <View style={styles.logoRow}>
      <Ionicons name="flash" size={18} color={Colors.accent} />
      <Text style={styles.logoText}>KITLY</Text>
    </View>
  );
}

function LiveClock() {
  const [time, setTime] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const h = String(time.getHours()).padStart(2, '0');
  const m = String(time.getMinutes()).padStart(2, '0');
  const s = String(time.getSeconds()).padStart(2, '0');
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

type ModuleCardProps = {
  moduleNum: string;
  title: string;
  subtitle: string;
  primaryLabel: string;
  onPrimary: () => void;
  icon: keyof typeof Ionicons.glyphMap;
};

function ModuleCard({ moduleNum, title, subtitle, primaryLabel, onPrimary, icon }: ModuleCardProps) {
  return (
    <Animated.View entering={FadeInDown.delay(100).duration(400)} style={styles.moduleCard}>
      <View style={styles.moduleHeader}>
        <View style={styles.moduleIconBox}>
          <Ionicons name={icon} size={20} color={Colors.accent} />
        </View>
        <View style={styles.moduleNumBadge}>
          <Text style={styles.moduleNumText}>{moduleNum}</Text>
        </View>
      </View>
      <Text style={styles.moduleTitle}>{title}</Text>
      <Text style={styles.moduleSub}>{subtitle}</Text>
      <View style={styles.moduleActions}>
        <TouchableOpacity style={styles.moduleBtn} onPress={onPrimary} activeOpacity={0.8}>
          <Text style={styles.moduleBtnText}>{primaryLabel}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.moduleSettingsBtn} activeOpacity={0.8}>
          <Ionicons name="settings-outline" size={16} color={Colors.textSecondary} />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}

function CalculatorCard() {
  return (
    <Animated.View entering={FadeInDown.delay(200).duration(400)} style={styles.calcCard}>
      <View style={styles.calcHeader}>
        <Ionicons name="calculator-outline" size={14} color={Colors.accent} />
        <Text style={styles.calcLabel}>CALCULATOR</Text>
        <View style={styles.calcMetaRow}>
          <Text style={styles.calcMeta}>GLOBAL COST</Text>
          <Text style={styles.calcMetaSep}>  ·  </Text>
          <Text style={styles.calcMeta}>$ 4.99</Text>
        </View>
      </View>
      <Text style={styles.calcAmount}>27,000.00</Text>
      <TouchableOpacity style={styles.calcActionBtn} activeOpacity={0.8}>
        <Text style={styles.calcActionText}>POLY_INTERFACE</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

function SequenceTimer() {
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
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [running]);

  const m = String(Math.floor(seconds / 60)).padStart(2, '0');
  const s = String(seconds % 60).padStart(2, '0');

  const pulse = useSharedValue(1);
  useEffect(() => {
    pulse.value = withRepeat(
      withSequence(withTiming(1.06, { duration: 800 }), withTiming(1, { duration: 800 })),
      -1
    );
  }, []);
  const pulseStyle = useAnimatedStyle(() => ({ transform: [{ scale: pulse.value }] }));

  return (
    <Animated.View entering={FadeInDown.delay(300).duration(400)} style={styles.timerCard}>
      <View style={styles.timerHeader}>
        <Ionicons name="timer-outline" size={14} color={Colors.accent} />
        <Text style={styles.timerLabel}>SEQUENCE TIMER</Text>
      </View>
      <Animated.View style={[styles.timerCircle, pulseStyle]}>
        <Text style={styles.timerValue}>{`${m}:${s}`}</Text>
      </Animated.View>
      <View style={styles.timerBtns}>
        <TouchableOpacity
          style={styles.timerBtnOutline}
          onPress={() => { setSeconds(842); setRunning(false); }}
          activeOpacity={0.8}
        >
          <Text style={styles.timerBtnOutlineText}>RESET</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.timerBtnFill}
          onPress={() => setRunning((r) => !r)}
          activeOpacity={0.8}
        >
          <Text style={styles.timerBtnFillText}>{running ? 'PAUSE' : 'RESUME'}</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}

function RecentActivity() {
  return (
    <Animated.View entering={FadeInDown.delay(400).duration(400)} style={styles.activityCard}>
      <Text style={styles.sectionLabel}>RECENT ACTIVITY</Text>
      {ACTIVITY_ITEMS.map((item) => (
        <View key={item.id} style={styles.activityRow}>
          <View style={styles.activityDot} />
          <Text style={styles.activityText}>{item.text}</Text>
          <Text style={styles.activityTime}>{item.time}</Text>
        </View>
      ))}
      <TouchableOpacity style={styles.auditLink} activeOpacity={0.7}>
        <Text style={styles.auditLinkText}>VIEW AUDIT LOG</Text>
        <Ionicons name="chevron-forward" size={12} color={Colors.accent} />
      </TouchableOpacity>
    </Animated.View>
  );
}

function SystemReliability() {
  return (
    <Animated.View entering={FadeInDown.delay(500).duration(400)} style={styles.reliabilityCard}>
      <Text style={styles.reliabilityTitle}>System Reliability</Text>
      <View style={styles.reliabilityStats}>
        <View style={styles.reliabilityStat}>
          <Text style={styles.reliabilityValue}>99.98%</Text>
          <Text style={styles.reliabilityStatLabel}>UPTIME</Text>
        </View>
        <View style={styles.reliabilityStat}>
          <Text style={styles.reliabilityValue}>14ms</Text>
          <Text style={styles.reliabilityStatLabel}>LATENCY</Text>
        </View>
      </View>
      <Text style={styles.reliabilityDesc}>
        KITLY's core infrastructure is built on low-latency protocols designed for high-frequency professional use. Every interaction is measured and optimised for zero-drag operation.
      </Text>
      <View style={styles.encryptedBadge}>
        <Ionicons name="lock-closed" size={11} color={Colors.accent} />
        <Text style={styles.encryptedText}>ENCRYPTED CONNECTION</Text>
        <Text style={styles.encryptedSub}>  AES-256 PROTOCOL ACTIVE</Text>
      </View>
    </Animated.View>
  );
}

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Animated.View entering={FadeIn.duration(300)} style={styles.header}>
        <KitlyLogo />
        <TouchableOpacity style={styles.headerBtn} activeOpacity={0.7}>
          <Ionicons name="settings-outline" size={20} color={Colors.textSecondary} />
        </TouchableOpacity>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(50).duration(400)}>
        <Text style={styles.systemStatus}>SYSTEM STATUS: OPTIMAL</Text>
        <Text style={styles.welcomeText}>Welcome,{'\n'}Operator.</Text>
        <Text style={styles.welcomeSub}>
          Precision orchestration for your daily workflows. All modules are calibrated and ready for execution.
        </Text>
        <LiveClock />
      </Animated.View>

      <ModuleCard
        moduleNum="MODULE 01"
        title="Unit Converter"
        subtitle="Real time engineering and physical constants conversion engine."
        primaryLabel="LAUNCH TOOL"
        icon="swap-horizontal-outline"
        onPrimary={() => router.push('/(tabs)/converter')}
      />

      <ModuleCard
        moduleNum="MODULE 02"
        title="Technical Notes"
        subtitle="Markdown-enabled technical documentation and persistent scratchpad."
        primaryLabel="OPEN RECENT"
        icon="document-text-outline"
        onPrimary={() => router.push('/(tabs)/notes')}
      />

      <CalculatorCard />
      <SequenceTimer />
      <RecentActivity />
      <SystemReliability />
      <View style={{ height: 24 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg },
  content: { padding: 20, paddingTop: 56 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 28,
  },
  logoRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  logoText: {
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 2,
    color: Colors.textPrimary,
  },
  headerBtn: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  systemStatus: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.5,
    color: Colors.accent,
    marginBottom: 6,
  },
  welcomeText: {
    fontSize: 34,
    fontWeight: '800',
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
  clockRow: { marginBottom: 24 },
  clockLabel: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1.5,
    color: Colors.textMuted,
    marginBottom: 4,
  },
  clockValueRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  clockText: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.accent,
    fontVariant: ['tabular-nums'],
  },
  tzBadge: {
    backgroundColor: Colors.surface,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  tzText: { fontSize: 10, fontWeight: '600', color: Colors.textSecondary },
  moduleCard: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 18,
    marginBottom: 14,
  },
  moduleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  moduleIconBox: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: Colors.accentDim,
    borderWidth: 1,
    borderColor: Colors.accentBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  moduleNumBadge: {
    backgroundColor: Colors.surface,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  moduleNumText: { fontSize: 9, fontWeight: '700', color: Colors.textMuted, letterSpacing: 1 },
  moduleTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 6,
  },
  moduleSub: {
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 18,
    marginBottom: 16,
  },
  moduleActions: { flexDirection: 'row', gap: 10 },
  moduleBtn: {
    flex: 1,
    backgroundColor: Colors.accent,
    borderRadius: 10,
    paddingVertical: 11,
    alignItems: 'center',
  },
  moduleBtnText: { fontSize: 11, fontWeight: '800', color: Colors.bg, letterSpacing: 1 },
  moduleSettingsBtn: {
    width: 42,
    borderRadius: 10,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  calcCard: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 18,
    marginBottom: 14,
  },
  calcHeader: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 8 },
  calcLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.5,
    color: Colors.accent,
    flex: 1,
  },
  calcMetaRow: { flexDirection: 'row', alignItems: 'center' },
  calcMeta: { fontSize: 9, color: Colors.textMuted, fontWeight: '600', letterSpacing: 0.5 },
  calcMetaSep: { color: Colors.textMuted },
  calcAmount: {
    fontSize: 36,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginBottom: 14,
    fontVariant: ['tabular-nums'],
  },
  calcActionBtn: {
    backgroundColor: Colors.surface,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingVertical: 11,
    alignItems: 'center',
  },
  calcActionText: { fontSize: 11, fontWeight: '700', color: Colors.textSecondary, letterSpacing: 1 },
  timerCard: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 18,
    marginBottom: 14,
    alignItems: 'center',
  },
  timerHeader: { flexDirection: 'row', alignItems: 'center', gap: 6, alignSelf: 'flex-start', marginBottom: 20 },
  timerLabel: { fontSize: 10, fontWeight: '700', letterSpacing: 1.5, color: Colors.accent },
  timerCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: Colors.accentBorder,
    backgroundColor: Colors.accentDim,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  timerValue: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.textPrimary,
    fontVariant: ['tabular-nums'],
  },
  timerBtns: { flexDirection: 'row', gap: 12, alignSelf: 'stretch' },
  timerBtnOutline: {
    flex: 1,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingVertical: 11,
    alignItems: 'center',
  },
  timerBtnOutlineText: { fontSize: 11, fontWeight: '700', color: Colors.textSecondary, letterSpacing: 1 },
  timerBtnFill: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: Colors.accent,
    paddingVertical: 11,
    alignItems: 'center',
  },
  timerBtnFillText: { fontSize: 11, fontWeight: '800', color: Colors.bg, letterSpacing: 1 },
  activityCard: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 18,
    marginBottom: 14,
  },
  sectionLabel: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1.5,
    color: Colors.textMuted,
    marginBottom: 14,
  },
  activityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  activityDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.accent,
  },
  activityText: { flex: 1, fontSize: 12, color: Colors.textSecondary },
  activityTime: { fontSize: 10, color: Colors.textMuted },
  auditLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 6,
  },
  auditLinkText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
    color: Colors.accent,
  },
  reliabilityCard: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 18,
    marginBottom: 14,
  },
  reliabilityTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginBottom: 16,
  },
  reliabilityStats: { flexDirection: 'row', gap: 24, marginBottom: 16 },
  reliabilityStat: {},
  reliabilityValue: { fontSize: 24, fontWeight: '800', color: Colors.accent, marginBottom: 2 },
  reliabilityStatLabel: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1.5,
    color: Colors.textMuted,
  },
  reliabilityDesc: {
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 18,
    marginBottom: 16,
  },
  encryptedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: Colors.accentDim,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.accentBorder,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  encryptedText: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1,
    color: Colors.accent,
  },
  encryptedSub: {
    fontSize: 9,
    color: Colors.textMuted,
    letterSpacing: 0.5,
  },
});
