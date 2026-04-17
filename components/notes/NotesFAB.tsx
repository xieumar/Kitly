import React from "react";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/src/constants/colors";

export default function NotesFAB({ onPress }: { onPress: () => void }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        position: "absolute",
        bottom: 50,
        right: 20,
        width: 54,
        height: 54,
        borderRadius: 27,
        backgroundColor: Colors.accent,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Ionicons name="add" size={28} color={Colors.bg} />
    </TouchableOpacity>
  );
}
