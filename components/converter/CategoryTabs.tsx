import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Colors } from "@/src/constants/colors";

type ConversionCategory = "Length" | "Temp" | "Weight" | "Currency";

type Category = {
  key: ConversionCategory;
  icon: keyof typeof Ionicons.glyphMap;
};

type Props = {
  categories: readonly Category[];
  active: ConversionCategory;
  onChange: (val: ConversionCategory) => void;
};

const CategoryTabs = ({ categories, active, onChange }: Props) => {
  return (
    <Animated.View
      entering={FadeInDown.delay(100).duration(400)}
      style={styles.row}
    >
      {categories.map(({ key, icon }) => (
        <TouchableOpacity
          key={key}
          style={[styles.btn, active === key && styles.active]}
          onPress={() => onChange(key)}
          activeOpacity={0.8}
        >
          <Ionicons
            name={icon}
            size={14}
            color={active === key ? Colors.bg : Colors.textSecondary}
          />

          <Text
            style={[styles.text, active === key && styles.textActive]}
          >
            {key.toUpperCase()}
          </Text>
        </TouchableOpacity>
      ))}
    </Animated.View>
  );
};

export default CategoryTabs;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 24,
    flexWrap: "wrap",
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  active: {
    backgroundColor: Colors.accent,
    borderColor: Colors.accent,
  },
  text: {
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1,
    color: Colors.textSecondary,
  },
  textActive: {
    color: Colors.bg,
  },
});