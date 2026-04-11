import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeIn } from "react-native-reanimated";
import { Colors } from "@/src/constants/colors";


export default function NotesHeader() {
  return (
    <Animated.View entering={FadeIn.duration(300)} style={styles.container}>
      <View style={styles.logoRow}>
        <Ionicons name="flash" size={22} color={Colors.accent} />
        <Text style={styles.logoText}>KITLY</Text>
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

  
});