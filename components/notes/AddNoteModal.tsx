import { Colors } from "@/src/constants/colors";
import { Note, NoteType } from "@/src/constants/mockData";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
    KeyboardAvoidingView,
    Modal,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

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
  const [completed, setCompleted] = useState(false);
  const [checklistItems, setChecklistItems] = useState<{label: string; status: 'pending' | 'in_progress' | 'completed'}[]>([]);
  const [taskInput, setTaskInput] = useState("");

  const handleSave = () => {
    if (!title.trim()) return;
    const newNote: Note = {
      id: Date.now().toString(),
      title: title.trim(),
      preview: type === "checklist" ? `${checklistItems.length} Tasks` : content.trim(),
      type,
      completed,
      ...(type === "checklist" ? { checklistItems } : {}),
    };
    onSave(newNote);
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setTitle("");
    setContent("");
    setType("simple");
    setCompleted(false);
    setChecklistItems([]);
    setTaskInput("");
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const addTask = () => {
    if (!taskInput.trim()) return;
    setChecklistItems([...checklistItems, { label: taskInput.trim(), status: 'pending' }]);
    setTaskInput("");
  };

  const removeTask = (index: number) => {
    setChecklistItems(checklistItems.filter((_, i) => i !== index));
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={handleClose}>
      {/* KeyboardAvoidingView is now the root element inside the Modal */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.avoidingView}
      >
        <Pressable style={styles.overlay} onPress={handleClose}>
          <Pressable style={styles.sheet} onPress={(e) => e.stopPropagation()}>
            <View style={styles.handle} />

            <View style={styles.sheetHeader}>
              <Text style={styles.sheetTitle}>New Note</Text>
              <TouchableOpacity onPress={handleClose} style={styles.closeBtn}>
                <Ionicons name="close" size={18} color={Colors.textSecondary} />
              </TouchableOpacity>
            </View>

            <ScrollView 
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled" 
              contentContainerStyle={styles.scrollContent}
            >
              <Text style={styles.fieldLabel}>TYPE</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.typeRow} keyboardShouldPersistTaps="handled">
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

              <View style={styles.completedRow}>
                <TouchableOpacity
                  style={[styles.checkbox, completed && styles.checkboxActive]}
                  onPress={() => setCompleted(!completed)}
                >
                  {completed && (
                    <Ionicons name="checkmark" size={14} color={Colors.bg} />
                  )}
                </TouchableOpacity>
                <Text style={styles.completedLabel}>Mark as completed</Text>
              </View>

              {type === "checklist" ? (
                <>
                  <Text style={styles.fieldLabel}>TASKS</Text>
                  <View style={styles.taskInputRow}>
                    <TextInput
                      value={taskInput}
                      onChangeText={setTaskInput}
                      placeholder="Add a task..."
                      placeholderTextColor={Colors.textMuted}
                      style={styles.taskInput}
                      onSubmitEditing={addTask}
                    />
                    <TouchableOpacity style={styles.addTaskBtn} onPress={addTask}>
                      <Ionicons name="add" size={20} color={Colors.bg} />
                    </TouchableOpacity>
                  </View>
                  {checklistItems.map((item, idx) => (
                    <View key={idx} style={styles.taskItem}>
                      <Ionicons name="ellipse-outline" size={16} color={Colors.textMuted} />
                      <Text style={styles.taskItemText}>{item.label}</Text>
                      <TouchableOpacity onPress={() => removeTask(idx)}>
                        <Ionicons name="close" size={16} color={Colors.textMuted} />
                      </TouchableOpacity>
                    </View>
                  ))}
                  <View style={{ marginBottom: 20 }} />
                </>
              ) : (
                <>
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
                </>
              )}

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
        </Pressable>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  avoidingView: {
    flex: 1, // Crucial for KeyboardAvoidingView to take up the full screen
  },
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: Colors.overlay,
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
  scrollContent: {
    paddingBottom: 40, // Ensures content isn't clipped by the keyboard at the very bottom
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
  taskInputRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 12,
  },
  taskInput: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    padding: 12,
    fontSize: 14,
    color: Colors.textPrimary,
  },
  addTaskBtn: {
    backgroundColor: Colors.accent,
    width: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 10,
    marginBottom: 8,
    gap: 10,
  },
  taskItemText: {
    flex: 1,
    fontSize: 14,
    color: Colors.textPrimary,
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
  completedRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 10,
    marginBottom: 16,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: Colors.border,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.surface,
  },
  checkboxActive: {
    backgroundColor: Colors.accent,
    borderColor: Colors.accent,
  },
  completedLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: Colors.textSecondary,
  },
});