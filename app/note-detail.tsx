import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { Colors } from '@/src/constants/colors';
import { NOTES, LINKED_PROJECTS } from '@/src/constants/mockData';



type FormatButtonProps = {
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  active?: boolean;
};

function FormatButton({ icon, onPress, active }: FormatButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.formatBtn, active && styles.formatBtnActive]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Ionicons name={icon} size={15} color={active ? Colors.accent : Colors.textSecondary} />
    </TouchableOpacity>
  );
}

type LinkedProjectCardProps = {
  name: string;
  subtitle: string;
  icon: keyof typeof Ionicons.glyphMap;
  hasAccent?: boolean;
};

function LinkedProjectCard({ name, subtitle, icon, hasAccent }: LinkedProjectCardProps) {
  return (
    <View style={[styles.linkedProject, hasAccent && styles.linkedProjectAccent]}>
      {hasAccent && <View style={styles.linkedProjectBar} />}
      <View style={styles.linkedProjectIcon}>
        <Ionicons name={icon} size={14} color={hasAccent ? Colors.accent : Colors.textSecondary} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.linkedProjectName}>{name}</Text>
        <Text style={styles.linkedProjectSub}>{subtitle}</Text>
      </View>
      <Ionicons name="chevron-forward" size={14} color={Colors.textMuted} />
    </View>
  );
}

export default function NoteDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const isNew = id === 'new';

  const existingNote = NOTES.find((n) => n.id === id);

  const [title, setTitle] = useState(isNew ? '' : existingNote?.title ?? '');
  const [body, setBody] = useState(
    isNew ? '' : existingNote?.preview ?? ''
  );
  const [wordCount] = useState(isNew ? 0 : 1240);

  const handleSave = () => {
    Alert.alert('Saved', 'Specification saved successfully.');
  };

  const handleArchive = () => {
    Alert.alert('Archive', 'This note will be archived.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Archive', onPress: () => router.back() },
    ]);
  };

  const handleDelete = () => {
    Alert.alert('Permanent Delete', 'This action cannot be undone.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => router.back() },
    ]);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <Animated.View entering={FadeIn.duration(300)} style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()} activeOpacity={0.7}>
          <Ionicons name="arrow-back" size={20} color={Colors.textSecondary} />
        </TouchableOpacity>
        <View style={styles.logoRow}>
          <Ionicons name="flash" size={16} color={Colors.accent} />
          <Text style={styles.logoText}>KITLY</Text>
        </View>
        <TouchableOpacity style={styles.headerIconBtn} activeOpacity={0.7}>
          <Ionicons name="share-outline" size={18} color={Colors.textSecondary} />
        </TouchableOpacity>
      </Animated.View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Animated.View entering={FadeInDown.delay(50).duration(400)}>
          <Text style={styles.fieldLabel}>DOCUMENT TITLE</Text>
          <TextInput
            style={styles.titleInput}
            value={title}
            onChangeText={setTitle}
            placeholder="Enter title..."
            placeholderTextColor={Colors.textMuted}
            multiline
          />
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(100).duration(400)} style={styles.toolbarRow}>
          <FormatButton icon="text" onPress={() => {}} active />
          <FormatButton icon="pencil-outline" onPress={() => {}} />
          <FormatButton icon="list-outline" onPress={() => {}} />
          <FormatButton icon="code-slash-outline" onPress={() => {}} />
          <FormatButton icon="chatbubble-ellipses-outline" onPress={() => {}} />
          <FormatButton icon="image-outline" onPress={() => {}} />
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(150).duration(400)}>
          <TextInput
            style={styles.bodyInput}
            value={body}
            onChangeText={setBody}
            placeholder="Start writing technical specs..."
            placeholderTextColor={Colors.textMuted}
            multiline
            textAlignVertical="top"
          />
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(200).duration(400)} style={styles.propertiesCard}>
          <Text style={styles.propertiesTitle}>Properties</Text>
          <View style={styles.propertyRow}>
            <Text style={styles.propertyKey}>Status</Text>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>DRAFTING</Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.propertyRow}>
            <Text style={styles.propertyKey}>Modified</Text>
            <Text style={styles.propertyValue}>Oct 24, 2023</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.propertyRow}>
            <Text style={styles.propertyKey}>Word Count</Text>
            <Text style={styles.propertyValue}>{wordCount.toLocaleString()}</Text>
          </View>

          <TouchableOpacity style={styles.saveBtn} onPress={handleSave} activeOpacity={0.85}>
            <Ionicons name="save-outline" size={16} color={Colors.bg} />
            <Text style={styles.saveBtnText}>SAVE SPECIFICATION</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.archiveBtn} onPress={handleArchive} activeOpacity={0.8}>
            <Ionicons name="archive-outline" size={14} color={Colors.textSecondary} />
            <Text style={styles.archiveBtnText}>ARCHIVE TOOL</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.deleteBtn} onPress={handleDelete} activeOpacity={0.8}>
            <Ionicons name="trash-outline" size={14} color={Colors.danger} />
            <Text style={styles.deleteBtnText}>PERMANENT DELETE</Text>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(260).duration(400)} style={styles.visualRefSection}>
          <Text style={styles.visualRefTitle}>TECHINIRAL</Text>
          <Text style={styles.visualRefLabel}>VISUAL REFERENCE</Text>
          <Text style={styles.visualRefFile}>CNC_COMP_01.JPG</Text>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(310).duration(400)} style={styles.linkedCard}>
          <Text style={styles.linkedTitle}>Linked Projects</Text>
          {React.Children.toArray(
            LINKED_PROJECTS.map((project, i) => (
              <LinkedProjectCard
                name={project.name}
                subtitle={project.subtitle}
                icon={project.icon as keyof typeof Ionicons.glyphMap}
                hasAccent={i === 0}
              />
            ))
          )}
        </Animated.View>

        <View style={{ height: 40 }} />
      </ScrollView>
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
    paddingTop: 0,
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
  headerIconBtn: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: { flex: 1 },
  content: { padding: 20 },
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
  toolbarRow: {
    flexDirection: 'row',
    gap: 4,
    backgroundColor: Colors.card,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 8,
    marginBottom: 14,
  },
  formatBtn: {
    width: 34,
    height: 34,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formatBtnActive: {
    backgroundColor: Colors.accentDim,
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
  saveBtnText: {
    fontSize: 12,
    fontWeight: '800',
    color: Colors.bg,
    letterSpacing: 1,
  },
  archiveBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: Colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingVertical: 13,
    marginBottom: 10,
  },
  archiveBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.textSecondary,
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
  visualRefSection: {
    marginBottom: 20,
    padding: 16,
    backgroundColor: Colors.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  visualRefTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: Colors.textMuted,
    opacity: 0.15,
    letterSpacing: 4,
    marginBottom: 12,
  },
  visualRefLabel: {
    fontSize: 8,
    fontWeight: '700',
    letterSpacing: 1.5,
    color: Colors.textMuted,
    marginBottom: 4,
  },
  visualRefFile: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  linkedCard: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 18,
  },
  linkedTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 14,
  },
  linkedProject: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: Colors.surface,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 12,
    marginBottom: 8,
    overflow: 'hidden',
  },
  linkedProjectAccent: {
    borderColor: Colors.accentBorder,
    backgroundColor: Colors.accentDim,
  },
  linkedProjectBar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 3,
    backgroundColor: Colors.accent,
    borderRadius: 2,
  },
  linkedProjectIcon: {
    width: 30,
    height: 30,
    borderRadius: 8,
    backgroundColor: Colors.card,
    alignItems: 'center',
    justifyContent: 'center',
  },
  linkedProjectName: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  linkedProjectSub: {
    fontSize: 9,
    fontWeight: '600',
    letterSpacing: 1,
    color: Colors.textMuted,
  },
});
