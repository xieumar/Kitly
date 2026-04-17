import { Colors } from "@/src/constants/colors";
import { Note } from "@/src/constants/mockData";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";

export default function VisualNoteCard({ note }: { note: Note }) {
  return (
    <View style={{ backgroundColor: Colors.card, borderRadius: 14, borderWidth: 1, borderColor: Colors.border, overflow: "hidden", marginBottom: 10, opacity: note.completed ? 0.6 : 1 }}>
      <View style={{ height: 120, backgroundColor: Colors.surface, alignItems: "center", justifyContent: "center" }}>
        <Ionicons name="camera-outline" size={24} color={Colors.textMuted} />
        <Text style={{ fontSize: 10, color: Colors.textMuted, marginTop: 4 }}>Visual Reference</Text>
      </View>
      <View style={{ padding: 16 }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 8 }}>
          <View style={{ backgroundColor: Colors.surface, borderWidth: 1, borderColor: Colors.border, borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3 }}>
            <Text style={{ fontSize: 8, fontWeight: "700", color: Colors.textSecondary, letterSpacing: 0.8 }}>VISUAL</Text>
          </View>
        </View>
        <Text style={{ fontSize: 14, fontWeight: "700", color: Colors.textPrimary, textDecorationLine: note.completed ? "line-through" : "none" }}>{note.title}</Text>
        {!!note.preview && <Text style={{ fontSize: 12, color: Colors.textSecondary, marginTop: 4, textDecorationLine: note.completed ? "line-through" : "none" }}>{note.preview}</Text>}
      </View>
    </View>
  );
}