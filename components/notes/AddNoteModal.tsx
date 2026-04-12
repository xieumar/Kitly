import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/src/constants/colors";
import { Note, NoteType } from "@/src/constants/mockData";

const TYPE_OPTIONS: { key: NoteType; label: string; icon: string }[] = [
  { key: "simple", label: "Note", icon: "document-text-outline" },
  { key: "technical", label: "Technical", icon: "code-slash-outline" },
  { key: "checklist", label: "Checklist", icon: "checkbox-outline" },
  { key: "sensor", label: "Sensor Log", icon: "pulse-outline" },
  { key: "visual", label: "Visual", icon: "image-outline" },
];

type Props = {
  visible: boolean;
  onClose: () => void;
  onSave: (note: Note) => void;
};

export default function AddNoteModal({ visible, onClose, onSave }: Props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [type, setType] = useState<NoteType>("simple");

  const handleSave = () => {
    if (!title.trim()) return;
    const newNote: Note = {
      id: Date.now().toString(),
      title: title.trim(),
      preview: content.trim(),
      type,
      timeAgo: "just now",
    };
    onSave(newNote);
    setTitle("");
    setContent("");
    setType("simple");
    onClose();
  };

  const handleClose = () => {
    setTitle("");
    setContent("");
    setType("simple");
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={handleClose}>
      <Pressable style={styles.overlay} onPress={handleClose}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.avoidingView}
        >
          <Pressable style={styles.sheet} onPress={(e) => e.stopPropagation()}>
            <View style={styles.handle} />

            <View style={styles.sheetHeader}>
              <Text style={styles.sheetTitle}>New Note</Text>
              <TouchableOpacity onPress={handleClose} style={styles.closeBtn}>
                <Ionicons name="close" size={18} color={Colors.textSecondary} />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.fieldLabel}>TYPE</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.typeRow}>
                {TYPE_OPTIONS.map((opt) => (
                  <TouchableOpacity
                    key={opt.key}
                    style={[styles.typeChip, type === opt.key && styles.typeChipActive]}
                    onPress={() => setType(opt.key)}
                  >
                    <Ionicons
                      name={opt.icon as any}
                      size={13}
                      color={type === opt.key ? Colors.accent : Colors.textMuted}
                    />
                    <Text
                      style={[styles.typeChipText, type === opt.key && styles.typeChipTextActive]}
                    >
                      {opt.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>

              <Text style={styles.fieldLabel}>TITLE</Text>
              <TextInput
                value={title}
                onChangeText={setTitle}
                placeholder="Note title..."
                placeholderTextColor={Colors.textMuted}
                style={styles.titleInput}
                maxLength={80}
                returnKeyType="next"
              />

              <Text style={styles.fieldLabel}>CONTENT</Text>
              <TextInput
                value={content}
                onChangeText={setContent}
                placeholder="Write your note here..."
                placeholderTextColor={Colors.textMuted}
                style={styles.contentInput}
                multiline
                textAlignVertical="top"
                maxLength={1000}
              />

              <View style={styles.footer}>
                <TouchableOpacity style={styles.cancelBtn} onPress={handleClose}>
                  <Text style={styles.cancelText}>CANCEL</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.saveBtn, !title.trim() && styles.saveBtnDisabled]}
                  onPress={handleSave}
                  disabled={!title.trim()}
                >
                  <Ionicons name="checkmark" size={15} color={Colors.bg} />
                  <Text style={styles.saveText}>SAVE NOTE</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </Pressable>
        </KeyboardAvoidingView>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: Colors.overlay,
  },
  avoidingView: {
    justifyContent: "flex-end",
  },
  sheet: {
    backgroundColor: Colors.bg,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingTop: 12,
    paddingHorizontal: 20,
    paddingBottom: 40,
    borderWidth: 1,
    borderColor: Colors.border,
    height: "85%",
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.border,
    alignSelf: "center",
    marginBottom: 16,
  },
  sheetHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  sheetTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "800",
    color: Colors.textPrimary,
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  fieldLabel: {
    fontSize: 9,
    fontWeight: "700",
    color: Colors.textMuted,
    letterSpacing: 1,
    marginBottom: 8,
    marginTop: 4,
  },
  typeRow: {
    flexDirection: "row",
    marginBottom: 18,
  },
  typeChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.card,
    marginRight: 8,
  },
  typeChipActive: {
    borderColor: Colors.accentBorder,
    backgroundColor: Colors.accentDim,
  },
  typeChipText: {
    fontSize: 11,
    fontWeight: "700",
    color: Colors.textMuted,
  },
  typeChipTextActive: {
    color: Colors.accent,
  },
  titleInput: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    padding: 14,
    fontSize: 15,
    fontWeight: "600",
    color: Colors.textPrimary,
    marginBottom: 16,
  },
  contentInput: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    padding: 14,
    fontSize: 13,
    color: Colors.textPrimary,
    minHeight: 120,
    marginBottom: 20,
  },
  footer: {
    flexDirection: "row",
    gap: 10,
  },
  cancelBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: "center",
  },
  cancelText: {
    fontSize: 11,
    fontWeight: "700",
    color: Colors.textSecondary,
    letterSpacing: 0.5,
  },
  saveBtn: {
    flex: 2,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: Colors.accent,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
  },
  saveBtnDisabled: {
    opacity: 0.4,
  },
  saveText: {
    fontSize: 11,
    fontWeight: "800",
    color: Colors.bg,
    letterSpacing: 0.5,
  },
});
