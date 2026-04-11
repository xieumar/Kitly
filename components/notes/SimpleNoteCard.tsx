import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Note } from "@/src/constants/mockData";
import { Colors } from "@/src/constants/colors";

export default function SimpleNoteCard({ note }: { note: Note }) {
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
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View
          style={{
            width: 28,
            height: 28,
            borderRadius: 7,
            backgroundColor: Colors.surface,
            borderWidth: 1,
            borderColor: Colors.border,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Ionicons name="document-outline" size={14} color={Colors.textSecondary} />
        </View>

        {note.timeAgo && (
          <Text style={{ fontSize: 10, color: Colors.textMuted }}>
            {note.timeAgo}
          </Text>
        )}
      </View>

      <Text style={{ fontSize: 14, fontWeight: "700", color: Colors.textPrimary, marginTop: 10 }}>
        {note.title}
      </Text>

      <Text style={{ fontSize: 12, color: Colors.textSecondary }}>
        {note.preview}
      </Text>
    </View>
  );
}