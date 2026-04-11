import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Note } from "@/src/constants/mockData";
import { Colors } from "@/src/constants/colors";

export default function ChecklistNoteCard({ note }: { note: Note }) {
  const done = note.checklistItems?.filter((i) => i.done).length ?? 0;
  const total = note.checklistItems?.length ?? 0;

  return (
    <View style={{ backgroundColor: Colors.card, borderRadius: 14, borderWidth: 1, borderColor: Colors.border, padding: 16, marginBottom: 10 }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 10 }}>
        <View style={{ backgroundColor: Colors.surface, borderWidth: 1, borderColor: Colors.border, borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3 }}>
          <Text style={{ fontSize: 8, fontWeight: "700", color: Colors.textSecondary, letterSpacing: 0.8 }}>CHECKLIST</Text>
        </View>
        {total > 0 && (
          <Text style={{ fontSize: 9, color: Colors.textMuted }}>{done}/{total} done</Text>
        )}
      </View>
      <Text style={{ fontSize: 14, fontWeight: "700", color: Colors.textPrimary, marginBottom: 8 }}>{note.title}</Text>
      {note.checklistItems?.map((item, i) => (
        <View key={i} style={{ flexDirection: "row", alignItems: "center", marginTop: 6, gap: 10 }}>
          {item.done ? (
            <Ionicons name="checkmark-circle" size={16} color={Colors.accent} />
          ) : (
            <View style={{ width: 16, height: 16, borderRadius: 8, borderWidth: 1.5, borderColor: Colors.textMuted }} />
          )}
          <Text style={{ fontSize: 13, color: item.done ? Colors.textMuted : Colors.textSecondary, textDecorationLine: item.done ? "line-through" : "none" }}>
            {item.label}
          </Text>
        </View>
      ))}
    </View>
  );
}