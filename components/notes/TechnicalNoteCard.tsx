import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Note } from "@/src/constants/mockData";
import { Colors } from "@/src/constants/colors";

export default function TechnicalNoteCard({ note }: { note: Note }) {
  return (
    <View style={{ backgroundColor: Colors.card, borderRadius: 14, borderWidth: 1, borderColor: Colors.border, padding: 16, marginBottom: 10 }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 10 }}>
        <View style={{ backgroundColor: Colors.accentDim, borderWidth: 1, borderColor: Colors.accentBorder, borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3 }}>
          <Text style={{ fontSize: 8, fontWeight: "700", color: Colors.accent, letterSpacing: 0.8 }}>TECHNICAL</Text>
        </View>
        {note.tag && (
          <View style={{ backgroundColor: Colors.surface, borderWidth: 1, borderColor: Colors.border, borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3 }}>
            <Text style={{ fontSize: 8, fontWeight: "700", color: Colors.textMuted, letterSpacing: 0.8 }}>{note.tag}</Text>
          </View>
        )}
      </View>
      <Text style={{ fontSize: 14, fontWeight: "700", color: Colors.textPrimary }}>{note.title}</Text>
      {!!note.preview && <Text style={{ fontSize: 12, color: Colors.textSecondary, marginTop: 4 }}>{note.preview}</Text>}
      {note.progress !== undefined && (
        <View style={{ marginTop: 12 }}>
          <View style={{ height: 3, backgroundColor: Colors.border, borderRadius: 2 }}>
            <View style={{ width: `${note.progress}%`, height: 3, backgroundColor: Colors.accent, borderRadius: 2 }} />
          </View>
          <Text style={{ fontSize: 9, color: Colors.textMuted, marginTop: 4 }}>{note.progress}% complete</Text>
        </View>
      )}
    </View>
  );
}