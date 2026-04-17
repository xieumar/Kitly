import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/src/constants/colors";

type FilterKey = "ALL" | "TECHNICAL" ;

type Props = {
  filters: FilterKey[];
  active: FilterKey;
  onChange: (f: FilterKey) => void;
};

export default function FilterTabs({ filters, active, onChange }: Props) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 14 }}>

      {filters.map((f) => (
        <TouchableOpacity
          key={f}
          onPress={() => onChange(f)}
          style={{
            paddingHorizontal: 14,
            paddingVertical: 7,
            borderRadius: 8,
            backgroundColor: active === f ? Colors.cardElevated : Colors.card,
            borderWidth: 1,
            borderColor: active === f ? Colors.accent : Colors.border,
          }}
        >
          <Text
            style={{
              fontSize: 10,
              fontWeight: "700",
              color: active === f ? Colors.accent : Colors.textMuted,
            }}
          >
            {f}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}