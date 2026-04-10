import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { Colors } from '@/src/constants/colors';
import { NOTES, Note } from '@/src/constants/mockData';

type FilterKey = 'ALL' | 'TECHNICAL' | 'DRAFTS';
const FILTERS: FilterKey[] = ['ALL', 'TECHNICAL', 'DRAFTS'];

function TechnicalNoteCard({ note }: { note: Note }) {
  return (
    <View style={styles.noteCard}>
      {note.tag && (
        <Text style={styles.noteTag}>{note.tag}</Text>
      )}
      <Text style={styles.noteTitle}>{note.title}</Text>
      <Text style={styles.notePreview}>{note.preview}</Text>
      {note.progress !== undefined && (
        <View style={styles.progressRow}>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${note.progress}%` as any }]} />
          </View>
          <Text style={styles.progressLabel}>ANALYSIS {note.progress}% COMPLETE</Text>
        </View>
      )}
    </View>
  );
}

function VisualNoteCard({ note }: { note: Note }) {
  return (
    <View style={[styles.noteCard, styles.visualCard]}>
      <View style={styles.visualImagePlaceholder}>
        <Ionicons name="camera-outline" size={24} color={Colors.textMuted} />
        <Text style={styles.visualImageLabel}>Visual Reference</Text>
      </View>
      <Text style={styles.visualAuditLabel}>VISUAL AUDIT</Text>
      <Text style={styles.noteTitle}>{note.title}</Text>
      <Text style={styles.notePreview}>{note.preview}</Text>
    </View>
  );
}

function SimpleNoteCard({ note }: { note: Note }) {
  return (
    <View style={styles.noteCard}>
      <View style={styles.simpleHeader}>
        <View style={styles.simpleIconBox}>
          <Ionicons name="document-outline" size={14} color={Colors.textSecondary} />
        </View>
        {note.timeAgo && <Text style={styles.noteTime}>{note.timeAgo}</Text>}
      </View>
      <Text style={styles.noteTitle}>{note.title}</Text>
      <Text style={styles.notePreview}>{note.preview}</Text>
    </View>
  );
}

function ChecklistNoteCard({ note }: { note: Note }) {
  return (
    <View style={styles.noteCard}>
      {note.tag && <Text style={styles.noteTag}>{note.tag}</Text>}
      <Text style={styles.noteTitle}>{note.title}</Text>
      {note.checklistItems?.map((item, i) => (
        <View key={i} style={styles.checkRow}>
          {item.done ? (
            <Ionicons name="checkmark-circle" size={16} color={Colors.accent} />
          ) : (
            <View style={styles.checkCircleEmpty} />
          )}
          <Text style={[styles.checkLabel, item.done && styles.checkLabelDone]}>
            {item.label}
          </Text>
        </View>
      ))}
    </View>
  );
}

function SensorNoteCard({ note }: { note: Note }) {
  return (
    <View style={[styles.noteCard, styles.sensorCard]}>
      {note.tag && <Text style={styles.noteSensorTag}>{note.tag}</Text>}
      <Text style={styles.noteTitle}>{note.title}</Text>
      <Text style={styles.notePreview}>{note.preview}</Text>
      <View style={styles.sensorBar}>
        <View style={styles.sensorBarFill} />
      </View>
    </View>
  );
}

function NoteCardRenderer({ note, onPress }: { note: Note; onPress: () => void }) {
  const renderInner = () => {
    switch (note.type) {
      case 'technical':
        return <TechnicalNoteCard note={note} />;
      case 'visual':
        return <VisualNoteCard note={note} />;
      case 'simple':
        return <SimpleNoteCard note={note} />;
      case 'checklist':
        return <ChecklistNoteCard note={note} />;
      case 'sensor':
        return <SensorNoteCard note={note} />;
    }
  };

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.85}>
      {renderInner()}
    </TouchableOpacity>
  );
}

export default function NotesScreen() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState<FilterKey>('ALL');

  const filteredNotes = NOTES.filter((n) => {
    if (activeFilter === 'TECHNICAL') return n.type === 'technical' || n.type === 'sensor';
    if (activeFilter === 'DRAFTS') return n.type === 'simple';
    return true;
  });

  const handleNotePress = (note: Note) => {
    router.push({ pathname: '/note-detail' as any, params: { id: note.id } });
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Animated.View entering={FadeIn.duration(300)} style={styles.header}>
          <View>
            <Text style={styles.versionLabel}>SYSTEM:1009_V4.0</Text>
            <Text style={styles.activeRecords}>
              {NOTES.length * 8 + 1} ACTIVE RECORDS
            </Text>
          </View>
          <View style={styles.headerBtns}>
            <TouchableOpacity style={styles.headerBtn} activeOpacity={0.7}>
              <Ionicons name="search-outline" size={18} color={Colors.textSecondary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerBtn} activeOpacity={0.7}>
              <Ionicons name="settings-outline" size={18} color={Colors.textSecondary} />
            </TouchableOpacity>
          </View>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(50).duration(400)}>
          <Text style={styles.pageTitle}>Precision{'\n'}Notes</Text>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(100).duration(400)} style={styles.filterRow}>
          <Ionicons name="filter-outline" size={14} color={Colors.textSecondary} />
          {FILTERS.map((f) => (
            <TouchableOpacity
              key={f}
              style={[styles.filterBtn, activeFilter === f && styles.filterBtnActive]}
              onPress={() => setActiveFilter(f)}
              activeOpacity={0.8}
            >
              <Text style={[styles.filterText, activeFilter === f && styles.filterTextActive]}>
                {f}
              </Text>
            </TouchableOpacity>
          ))}
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(120).duration(400)} style={styles.syncRow}>
          <Text style={styles.syncLabel}>LAST SYNCED</Text>
          <Text style={styles.syncTime}>02:44 PM</Text>
        </Animated.View>

        {filteredNotes.map((note, i) => (
          <Animated.View
            key={note.id}
            entering={FadeInDown.delay(150 + i * 60).duration(400)}
          >
            <NoteCardRenderer note={note} onPress={() => handleNotePress(note)} />
          </Animated.View>
        ))}

        <View style={{ height: 100 }} />
      </ScrollView>

      <TouchableOpacity
        style={styles.fab}
        activeOpacity={0.85}
        onPress={() => router.push({ pathname: '/note-detail' as any, params: { id: 'new' } })}
      >
        <Ionicons name="add" size={28} color={Colors.bg} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg },
  content: { padding: 20, paddingTop: 56 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  versionLabel: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1.5,
    color: Colors.textMuted,
    marginBottom: 2,
  },
  activeRecords: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1.5,
    color: Colors.textSecondary,
  },
  headerBtns: { flexDirection: 'row', gap: 8 },
  headerBtn: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pageTitle: {
    fontSize: 36,
    fontWeight: '800',
    color: Colors.textPrimary,
    lineHeight: 44,
    marginBottom: 20,
  },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 14,
  },
  filterBtn: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 8,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  filterBtnActive: {
    backgroundColor: Colors.cardElevated,
    borderColor: Colors.accent,
  },
  filterText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
    color: Colors.textMuted,
  },
  filterTextActive: { color: Colors.accent },
  syncRow: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    marginBottom: 18,
  },
  syncLabel: {
    fontSize: 9,
    fontWeight: '600',
    letterSpacing: 1.5,
    color: Colors.textMuted,
  },
  syncTime: {
    fontSize: 9,
    fontWeight: '700',
    color: Colors.accent,
    letterSpacing: 0.5,
  },
  noteCard: {
    backgroundColor: Colors.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 16,
    marginBottom: 10,
  },
  visualCard: { padding: 0, overflow: 'hidden' },
  sensorCard: { borderColor: Colors.borderLight },
  noteTag: {
    fontSize: 8,
    fontWeight: '700',
    letterSpacing: 1.5,
    color: Colors.textMuted,
    marginBottom: 8,
  },
  noteSensorTag: {
    fontSize: 8,
    fontWeight: '700',
    letterSpacing: 1.5,
    color: Colors.accent,
    marginBottom: 8,
  },
  noteTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 6,
    lineHeight: 20,
  },
  notePreview: {
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  noteTime: { fontSize: 10, color: Colors.textMuted },
  progressRow: { marginTop: 12, gap: 6 },
  progressTrack: {
    height: 3,
    backgroundColor: Colors.border,
    borderRadius: 2,
  },
  progressFill: {
    height: 3,
    backgroundColor: Colors.accent,
    borderRadius: 2,
  },
  progressLabel: {
    fontSize: 8,
    fontWeight: '700',
    letterSpacing: 1,
    color: Colors.textMuted,
  },
  visualImagePlaceholder: {
    height: 140,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  visualImageLabel: { fontSize: 10, color: Colors.textMuted },
  visualAuditLabel: {
    fontSize: 8,
    fontWeight: '700',
    letterSpacing: 1.5,
    color: Colors.textMuted,
    padding: 12,
    paddingBottom: 6,
  },
  simpleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  simpleIconBox: {
    width: 28,
    height: 28,
    borderRadius: 7,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 10,
  },
  checkCircleEmpty: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: Colors.textMuted,
  },
  checkLabel: { fontSize: 13, color: Colors.textSecondary },
  checkLabelDone: {
    textDecorationLine: 'line-through',
    color: Colors.textMuted,
  },
  sensorBar: {
    height: 4,
    backgroundColor: Colors.border,
    borderRadius: 2,
    marginTop: 14,
  },
  sensorBarFill: {
    width: '60%',
    height: 4,
    backgroundColor: Colors.accent,
    borderRadius: 2,
    opacity: 0.4,
  },
  fab: {
    position: 'absolute',
    bottom: 88,
    right: 20,
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: Colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
});
