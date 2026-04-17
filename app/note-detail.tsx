import { Colors } from '@/src/constants/colors';
import { Note, NoteType } from '@/src/constants/mockData';
import { useNotes } from '@/src/context/NotesContext';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  Modal,
  Animated as RNAnimated,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

const TYPE_LABELS: Record<NoteType, string> = {
  simple: 'NOTE',
  technical: 'TECHNICAL',
  checklist: 'CHECKLIST',
  sensor: 'SENSOR LOG',
  visual: 'VISUAL',
};

export default function NoteDetailScreen() {
  const router = useRouter();
  const { updateNote, deleteNote } = useNotes();
  const { noteJson } = useLocalSearchParams<{ noteJson: string }>();

  const existingNote: Note | null = noteJson ? JSON.parse(noteJson) : null;

  const [title, setTitle] = useState(existingNote?.title ?? '');
  const [body, setBody] = useState(existingNote?.preview ?? '');
  const [completed, setCompleted] = useState(existingNote?.completed ?? false);
  const [checklistItems, setChecklistItems] = useState<{ label: string; status: 'pending' | 'in_progress' | 'completed' }[]>(existingNote?.checklistItems ?? []);
  const [newTaskInput, setNewTaskInput] = useState('');

  const noteType = existingNote?.type ?? 'simple';
  const typeLabel = TYPE_LABELS[noteType];

  const wordCount = body.trim()
    ? body.trim().split(/\s+/).filter(Boolean).length
    : 0;

  const toastAnim = useRef(new RNAnimated.Value(0)).current;
  const toastTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [toastMsg, setToastMsg] = useState('');
  const [toastType, setToastType] = useState<'success' | 'danger'>('success');
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Check if the save button should be disabled
  const isSaveDisabled = !title.trim();

  const handleSave = () => {
    if (isSaveDisabled || !existingNote) return;

    const isChecklist = noteType === 'checklist';
    const updated: Note = {
      ...existingNote,
      title: title.trim(),
      preview: isChecklist ? `${checklistItems.length} Tasks` : body.trim(),
      completed,
      timeAgo: 'just now',
      ...(isChecklist ? { checklistItems } : {}),
    };
    updateNote(updated);
    router.back();
  };

  const handleDelete = () => {
    if (!existingNote) return;
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (!existingNote) return;
    deleteNote(existingNote.id);
    setShowDeleteModal(false);
    router.back();
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      {/* Header */}
      <Animated.View entering={FadeIn.duration(300)} style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()} activeOpacity={0.7}>
          <Ionicons name="arrow-back" size={20} color={Colors.textSecondary} />
        </TouchableOpacity>
        <View style={styles.logoRow}>
          <Ionicons name="flash" size={16} color={Colors.accent} />
          <Text style={styles.logoText}>KITLY</Text>
        </View>
      </Animated.View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Animated.View entering={FadeInDown.delay(40).duration(400)}>
          <View style={styles.typeBadge}>
            <Text style={styles.typeBadgeText}>{typeLabel}</Text>
          </View>
        </Animated.View>

        {/* Title Input */}
        <Animated.View entering={FadeInDown.delay(80).duration(400)}>
          <Text style={styles.fieldLabel}>DOCUMENT TITLE</Text>
          <TextInput
            style={styles.titleInput}
            value={title}
            onChangeText={setTitle}
            placeholder="Enter title..."
            placeholderTextColor={Colors.textMuted}
            multiline
          />
          <TouchableOpacity
            style={[styles.completionToggle, completed && styles.completionToggleActive]}
            onPress={() => setCompleted(!completed)}
          >
            <Ionicons
              name={completed ? "checkmark-circle" : "ellipse-outline"}
              size={18}
              color={completed ? Colors.accent : Colors.textSecondary}
            />
            <Text style={[styles.completionToggleText, completed && styles.completionToggleTextActive]}>
              {completed ? 'Completed' : 'Mark as complete'}
            </Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Content Logic */}
        {noteType === 'checklist' ? (
          <Animated.View entering={FadeInDown.delay(160).duration(400)} style={{ marginBottom: 20 }}>
            <View style={styles.taskInputRow}>
              <TextInput
                style={styles.taskInput}
                value={newTaskInput}
                onChangeText={setNewTaskInput}
                placeholder="Add a new task..."
                placeholderTextColor={Colors.textMuted}
                onSubmitEditing={() => {
                  if (!newTaskInput.trim()) return;
                  setChecklistItems([...checklistItems, { label: newTaskInput.trim(), status: 'pending' }]);
                  setNewTaskInput('');
                }}
              />
              <TouchableOpacity
                style={styles.addTaskBtn}
                onPress={() => {
                  if (!newTaskInput.trim()) return;
                  setChecklistItems([...checklistItems, { label: newTaskInput.trim(), status: 'pending' }]);
                  setNewTaskInput('');
                }}
              >
                <Ionicons name="add" size={20} color={Colors.bg} />
              </TouchableOpacity>
            </View>
            {checklistItems.map((item, idx) => (
              <View key={idx} style={styles.taskItem}>
                <TouchableOpacity
                  onPress={() => {
                    const newItems = [...checklistItems];
                    const current = newItems[idx].status;
                    if (current === 'pending') newItems[idx].status = 'in_progress';
                    else if (current === 'in_progress') newItems[idx].status = 'completed';
                    else newItems[idx].status = 'pending';
                    setChecklistItems(newItems);
                  }}
                >
                  <Ionicons
                    name={item.status === 'completed' ? "checkmark-circle" : item.status === 'in_progress' ? "hourglass-outline" : "ellipse-outline"}
                    size={22}
                    color={item.status === 'completed' ? Colors.accent : item.status === 'in_progress' ? Colors.warning : Colors.textMuted}
                  />
                </TouchableOpacity>
                <Text style={[styles.taskItemText, item.status === 'completed' && styles.taskItemTextDone]}>
                  {item.label}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    const newItems = [...checklistItems];
                    newItems.splice(idx, 1);
                    setChecklistItems(newItems);
                  }}
                >
                  <Ionicons name="trash-outline" size={18} color={Colors.danger} />
                </TouchableOpacity>
              </View>
            ))}
          </Animated.View>
        ) : (
          <Animated.View entering={FadeInDown.delay(160).duration(400)}>
            <TextInput
              style={styles.bodyInput}
              value={body}
              onChangeText={setBody}
              placeholder="Start writing..."
              placeholderTextColor={Colors.textMuted}
              multiline
              textAlignVertical="top"
            />
          </Animated.View>
        )}

        {/* Properties Card */}
        <Animated.View entering={FadeInDown.delay(200).duration(400)} style={styles.propertiesCard}>
          <Text style={styles.propertiesTitle}>Properties</Text>
          <View style={styles.propertyRow}>
            <Text style={styles.propertyKey}>Type</Text>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>{typeLabel}</Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.propertyRow}>
            <Text style={styles.propertyKey}>Modified</Text>
            <Text style={styles.propertyValue}>{existingNote?.timeAgo ?? '—'}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.propertyRow}>
            <Text style={styles.propertyKey}>{noteType === 'checklist' ? 'Total Tasks' : 'Word Count'}</Text>
            <Text style={styles.propertyValue}>{noteType === 'checklist' ? checklistItems.length : wordCount.toLocaleString()}</Text>
          </View>

          {/* SAVE BUTTON - FIXED LOGIC */}
          <TouchableOpacity
            style={[styles.saveBtn, isSaveDisabled && styles.saveBtnDisabled]}
            onPress={handleSave}
            activeOpacity={0.85}
            disabled={isSaveDisabled}
          >
            <Ionicons name="save-outline" size={16} color={Colors.bg} />
            <Text style={styles.saveBtnText}>SAVE NOTE</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.deleteBtn} onPress={handleDelete} activeOpacity={0.8}>
            <Ionicons name="trash-outline" size={14} color={Colors.danger} />
            <Text style={styles.deleteBtnText}>DELETE NOTE</Text>
          </TouchableOpacity>
        </Animated.View>

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* Delete Modal */}
      <Modal visible={showDeleteModal} transparent animationType="fade" onRequestClose={() => setShowDeleteModal(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalIconBox}>
              <Ionicons name="warning" size={24} color={Colors.danger} />
            </View>
            <Text style={styles.modalTitle}>Delete Note</Text>
            <Text style={styles.modalMessage}>This action cannot be undone. Are you sure you want to permanently delete this note?</Text>
            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.modalCancelBtn} onPress={() => setShowDeleteModal(false)} activeOpacity={0.7}>
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalDeleteBtn} onPress={confirmDelete} activeOpacity={0.8}>
                <Text style={styles.modalDeleteText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  logoText: {
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 2,
    color: Colors.textPrimary,
  },
  scrollView: { flex: 1 },
  content: { padding: 20 },
  typeBadge: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.accentDim,
    borderWidth: 1,
    borderColor: Colors.accentBorder,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginBottom: 14,
  },
  typeBadgeText: {
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1,
    color: Colors.accent,
  },
  fieldLabel: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1.5,
    color: Colors.textMuted,
    marginBottom: 8,
  },
  titleInput: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 14,
    fontSize: 15,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 14,
    minHeight: 56,
  },
  bodyInput: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 14,
    fontSize: 13,
    color: Colors.textSecondary,
    minHeight: 180,
    lineHeight: 20,
    marginBottom: 20,
  },
  taskInputRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  taskInput: {
    flex: 1,
    backgroundColor: Colors.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 14,
    fontSize: 14,
    color: Colors.textPrimary,
  },
  addTaskBtn: {
    backgroundColor: Colors.accent,
    width: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    gap: 12,
  },
  taskItemText: {
    flex: 1,
    fontSize: 15,
    color: Colors.textPrimary,
  },
  taskItemTextDone: {
    textDecorationLine: 'line-through',
    color: Colors.textMuted,
  },
  propertiesCard: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 18,
    marginBottom: 20,
  },
  propertiesTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 16,
  },
  propertyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  propertyKey: { fontSize: 13, color: Colors.textSecondary },
  propertyValue: { fontSize: 13, fontWeight: '600', color: Colors.textPrimary },
  statusBadge: {
    backgroundColor: Colors.accentDim,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: Colors.accentBorder,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  statusText: {
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1,
    color: Colors.accent,
  },
  divider: { height: 1, backgroundColor: Colors.border },
  saveBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: Colors.accent,
    borderRadius: 12,
    paddingVertical: 14,
    marginTop: 20,
    marginBottom: 10,
  },
  saveBtnDisabled: {
    opacity: 0.4,
  },
  saveBtnText: {
    fontSize: 12,
    fontWeight: '800',
    color: Colors.bg,
    letterSpacing: 1,
  },
  deleteBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: Colors.dangerDim,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,59,71,0.3)',
    paddingVertical: 13,
  },
  deleteBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.danger,
    letterSpacing: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: Colors.overlay,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 24,
    width: '100%',
    maxWidth: 340,
    alignItems: 'center',
  },
  modalIconBox: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.dangerDim,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,59,71,0.3)',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 8,
    textAlign: 'center',
  },
  modalMessage: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  modalActions: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  modalCancelBtn: {
    flex: 1,
    backgroundColor: Colors.surface,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
  },
  modalCancelText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  modalDeleteBtn: {
    flex: 1,
    backgroundColor: Colors.danger,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalDeleteText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.bg,
  },
  completionToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 15,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: Colors.surface,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  completionToggleActive: {
    borderColor: Colors.accentBorder,
    backgroundColor: Colors.accentDim,
  },
  completionToggleText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  completionToggleTextActive: {
    color: Colors.accent,
  },
});