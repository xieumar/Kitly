import { Colors } from "@/src/constants/colors";
import { Note } from "@/src/constants/mockData";
import { useNotes } from "@/src/context/NotesContext";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function ChecklistNoteCard({ note }: { note: Note }) {
  const { updateNote } = useNotes();
  const done = note.checklistItems?.filter((i) => i.status === 'completed').length ?? 0;
  const inProgress = note.checklistItems?.filter((i) => i.status === 'in_progress').length ?? 0;
  const total = note.checklistItems?.length ?? 0;

  const handleToggle = (index: number) => {
    if (!note.checklistItems) return;
    const newItems = [...note.checklistItems];
    const current = newItems[index].status;
    if (current === 'pending') newItems[index].status = 'in_progress';
    else if (current === 'in_progress') newItems[index].status = 'completed';
    else newItems[index].status = 'pending';
    updateNote({
      ...note,
      checklistItems: newItems,
    });
  };

  return (
    <View style={{ backgroundColor: Colors.card, borderRadius: 14, borderWidth: 1, borderColor: Colors.border, padding: 16, marginBottom: 10, opacity: note.completed ? 0.6 : 1 }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 10 }}>
        <View style={{ backgroundColor: Colors.surface, borderWidth: 1, borderColor: Colors.border, borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3 }}>
          <Text style={{ fontSize: 8, fontWeight: "700", color: Colors.textSecondary, letterSpacing: 0.8 }}>CHECKLIST</Text>
        </View>
        {total > 0 && (
          <Text style={{ fontSize: 9, color: Colors.textMuted }}>
            {done}/{total} done
            {inProgress > 0 && ` • ${inProgress} in progress`}
          </Text>
        )}
      </View>
      <Text style={{ fontSize: 14, fontWeight: "700", color: Colors.textPrimary, marginBottom: 8, textDecorationLine: note.completed ? "line-through" : "none" }}>{note.title}</Text>
      {note.checklistItems?.map((item, i) => (
        <TouchableOpacity key={i} onPress={() => handleToggle(i)} activeOpacity={0.7} style={{ flexDirection: "row", alignItems: "center", marginTop: 6, gap: 10 }}>
          {item.status === 'completed' ? (
            <Ionicons name="checkmark-circle" size={16} color={Colors.accent} />
          ) : item.status === 'in_progress' ? (
            <Ionicons name="hourglass-outline" size={16} color={Colors.warning} />
          ) : (
            <View style={{ width: 16, height: 16, borderRadius: 8, borderWidth: 1.5, borderColor: Colors.textMuted }} />
          )}
          <Text style={{ fontSize: 13, color: item.status === 'completed' ? Colors.textMuted : Colors.textSecondary, textDecorationLine: item.status === 'completed' ? "line-through" : "none" }}>
            {item.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}