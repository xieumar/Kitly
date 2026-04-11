import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Note } from "@/src/constants/mockData";
import { Colors } from "@/src/constants/colors";

export default function VisualNoteCard({ note }: { note: Note }) {
  return (
    <View
      style={{
        backgroundColor: Colors.card,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: Colors.border,
        overflow: "hidden",
        marginBottom: 10,
      }}
    >
      <View
        style={{
          height: 140,
          backgroundColor: Colors.surface,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Ionicons name="camera-outline" size={24} color={Colors.textMuted} />
        <Text style={{ fontSize: 10, color: Colors.textMuted }}>
          Visual Reference
        </Text>
      </View>

      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 8, color: Colors.textMuted, marginBottom: 6 }}>
          VISUAL AUDIT
        </Text>
        <Text style={{ fontSize: 14, fontWeight: "700", color: Colors.textPrimary }}>
          {note.title}
        </Text>
        <Text style={{ fontSize: 12, color: Colors.textSecondary }}>
          {note.preview}
        </Text>
      </View>
    </View>
  );
}