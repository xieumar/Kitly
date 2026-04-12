import React from "react";
import { ScrollView, View, TouchableOpacity, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";

import { Colors } from "@/src/constants/colors";

import KitlyLogo from "@/components/home/KitlyLogo";
import LiveClock from "@/components/home/LiveClock";
import ModuleCard from "@/components/home/ModuleCard";
import CalculatorCard from "@/components/home/CalculatorCard";
import SequenceTimer from "@/components/home/SequenceTimer";
import RecentActivity from "@/components/home/RecentActivity";
import SystemReliability from "@/components/home/SystemReliability";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
      <ScrollView
        style={{ flex: 1, backgroundColor: Colors.bg }}
        contentContainerStyle={{ padding: 20 }}
      >
        <Animated.View
          entering={FadeIn.duration(300)}
          style={{ flexDirection: "row", justifyContent: "space-between" }}
        >
          <KitlyLogo />
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(50).duration(400)} style={{ marginTop: 16 }}>
          <Text
            style={{
              fontSize: 10,
              fontWeight: "700",
              letterSpacing: 1.5,
              color: Colors.accent,
              marginBottom: 6,
              marginTop: 4,
            }}
          >
            SYSTEM STATUS: OPTIMAL
          </Text>

          <Text
            style={{
              fontSize: 34,
              fontWeight: "800",
              color: Colors.textPrimary,
              lineHeight: 42,
              marginBottom: 12,
            }}
          >
            Welcome,{"\n"}Kitler.
          </Text>

          <Text
            style={{
              fontSize: 13,
              color: Colors.textSecondary,
              lineHeight: 20,
              marginBottom: 16,
            }}
          >
            Precision orchestration for your daily workflows. All modules are
            calibrated and ready for execution.
          </Text>

          <LiveClock />
        </Animated.View>

        {/* MODULES */}
        <ModuleCard
          title="Unit Converter"
          subtitle="Real time engineering conversion engine."
          primaryLabel="LAUNCH TOOL"
          icon="swap-horizontal-outline"
          onPrimary={() => router.push("/(tabs)/converter")}
        />

        <ModuleCard
          title="Technical Notes"
          subtitle="Markdown-based documentation tool."
          primaryLabel="OPEN RECENT"
          icon="document-text-outline"
          onPrimary={() => router.push("/(tabs)/notes")}
        />

        <CalculatorCard />
        <SequenceTimer />
        <RecentActivity />
        <SystemReliability />

        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}