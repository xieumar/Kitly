import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Note } from "@/src/constants/mockData";
import { Colors } from "@/src/constants/colors";

export default function SimpleNoteCard({ note }: { note: Note }) {
  return (
    <View style={{ backgroundColor: Colors.card, borderRadius: 14, borderWidth: 1, borderColor: Colors.border, padding: 16, marginBottom: 10 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
          <View style={{ width: 28, height: 28, borderRadius: 7, backgroundColor: Colors.surface, borderWidth: 1, borderColor: Colors.border, alignItems: "center", justifyContent: "center" }}>
            <Ionicons name="document-outline" size={14} color={Colors.textSecondary} />
          </View>
          <View style={{ backgroundColor: Colors.surface, borderWidth: 1, borderColor: Colors.border, borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3 }}>
            <Text style={{ fontSize: 8, fontWeight: "700", color: Colors.textMuted, letterSpacing: 0.8 }}>NOTE</Text>
          </View>
        </View>
        {note.timeAgo && <Text style={{ fontSize: 10, color: Colors.textMuted }}>{note.timeAgo}</Text>}
      </View>
      <Text style={{ fontSize: 14, fontWeight: "700", color: Colors.textPrimary }}>{note.title}</Text>
      {!!note.preview && <Text style={{ fontSize: 12, color: Colors.textSecondary, marginTop: 4 }}>{note.preview}</Text>}
    </View>
  );
}