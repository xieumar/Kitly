import React from "react";
import { View, Text } from "react-native";
import { Note } from "@/src/constants/mockData";
import { Colors } from "@/src/constants/colors";

export default function TechnicalNoteCard({ note }: { note: Note }) {
  return (
    <View
      style={{
        backgroundColor: Colors.card,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: Colors.border,
        padding: 16,
        marginBottom: 10,
      }}
    >
      {note.tag && (
        <Text style={{ fontSize: 8, color: Colors.textMuted }}>{note.tag}</Text>
      )}

      <Text style={{ fontSize: 14, fontWeight: "700", color: Colors.textPrimary }}>
        {note.title}
      </Text>

      <Text style={{ fontSize: 12, color: Colors.textSecondary }}>
        {note.preview}
      </Text>
    </View>
  );
}