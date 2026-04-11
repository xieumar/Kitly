import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Note } from "@/src/constants/mockData";
import { Colors } from "@/src/constants/colors";

export default function ChecklistNoteCard({ note }: { note: Note }) {
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
        <Text style={{ fontSize: 8, color: Colors.textMuted, marginBottom: 6 }}>
          {note.tag}
        </Text>
      )}

      <Text style={{ fontSize: 14, fontWeight: "700", color: Colors.textPrimary }}>
        {note.title}
      </Text>

      {note.checklistItems?.map((item, i) => (
        <View
          key={i}
          style={{ flexDirection: "row", alignItems: "center", marginTop: 10, gap: 10 }}
        >
          {item.done ? (
            <Ionicons name="checkmark-circle" size={16} color={Colors.accent} />
          ) : (
            <View
              style={{
                width: 16,
                height: 16,
                borderRadius: 8,
                borderWidth: 1.5,
                borderColor: Colors.textMuted,
              }}
            />
          )}

          <Text
            style={{
              fontSize: 13,
              color: item.done ? Colors.textMuted : Colors.textSecondary,
              textDecorationLine: item.done ? "line-through" : "none",
            }}
          >
            {item.label}
          </Text>
        </View>
      ))}
    </View>
  );
}