import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeIn } from "react-native-reanimated";
import { Colors } from "@/src/constants/colors";

type Props = {
  onSettingsPress?: () => void;
};

const Header = ({ onSettingsPress }: Props) => {
  return (
    <Animated.View entering={FadeIn.duration(300)} style={styles.header}>
      <View style={styles.logoRow}>
        <Ionicons name="flash" size={24} color={Colors.accent} />
        <Text style={styles.logoText}>KITLY</Text>
      </View>
    </Animated.View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 28,
  },
  logoRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  logoText: {
    fontSize: 20,
    fontWeight: "800",
    letterSpacing: 2,
    color: Colors.textPrimary,
  },

});