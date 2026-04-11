import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/src/constants/colors";

type Props = {
  noteCount: number;
};

export default function NotesHeader({ noteCount }: Props) {
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 16 }}>
      <View>
        <Text style={{ fontSize: 9, color: Colors.textMuted, fontWeight: "700" }}>
          SYSTEM:1009_V4.0
        </Text>
        <Text style={{ fontSize: 9, color: Colors.textSecondary, fontWeight: "700" }}>
          {noteCount * 8 + 1} ACTIVE RECORDS
        </Text>
      </View>

      <View style={{ flexDirection: "row", gap: 8 }}>
        <TouchableOpacity>
          <Ionicons name="search-outline" size={18} color={Colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="settings-outline" size={18} color={Colors.textSecondary} />
        </TouchableOpacity>
      </View>
    </View>
  );
}