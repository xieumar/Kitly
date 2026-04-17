import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, {
  FadeInDown,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  Easing,
} from "react-native-reanimated";
import { useFocusEffect, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { Colors } from "@/src/constants/colors";
import { Note } from "@/src/constants/mockData";
import { useNotes } from "@/src/context/NotesContext";

import NotesHeader from "@/components/notes/NotesHeader";
import FilterTabs from "@/components/notes/FilterTabs";
import NoteCardRenderer from "@/components/notes/NoteCardRenderer";
import NotesFAB from "@/components/notes/NotesFAB";
import AddNoteModal from "@/components/notes/AddNoteModal";

// FIXED: Removed "TASKS" from the type and the array
type FilterKey = "ALL" | "TECHNICAL";
const FILTERS: FilterKey[] = ["ALL", "TECHNICAL"];

export default function NotesScreen() {
  const router = useRouter();
  const { notes, addNote } = useNotes();
  const [activeFilter, setActiveFilter] = useState<FilterKey>("ALL");
  const [showAddModal, setShowAddModal] = useState(false);

  const EASE = Easing.out(Easing.cubic);
  const headerOpacity = useSharedValue(0);
  const headerY       = useSharedValue(14);
  const tabsOpacity   = useSharedValue(0);
  const tabsY         = useSharedValue(14);

  useFocusEffect(
    useCallback(() => {
      headerOpacity.value = 0;
      headerY.value       = 14;
      tabsOpacity.value   = 0;
      tabsY.value         = 14;

      headerOpacity.value = withTiming(1, { duration: 300, easing: EASE });
      headerY.value       = withTiming(0, { duration: 300, easing: EASE });
      tabsOpacity.value   = withDelay(80, withTiming(1, { duration: 280, easing: EASE }));
      tabsY.value         = withDelay(80, withTiming(0, { duration: 280, easing: EASE }));
    }, [])
  );

  const headerStyle = useAnimatedStyle(() => ({
    opacity: headerOpacity.value,
    transform: [{ translateY: headerY.value }],
  }));

  const tabsStyle = useAnimatedStyle(() => ({
    opacity: tabsOpacity.value,
    transform: [{ translateY: tabsY.value }],
  }));

  const filteredNotes = notes.filter((n) => {
    if (activeFilter === "TECHNICAL") return n.type === "technical" || n.type === "sensor";
    return true; 
  });

  const handleNotePress = (note: Note) => {
    router.push({
      pathname: "/note-detail" as any,
      params: { id: note.id, noteJson: JSON.stringify(note) },
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
      <View style={{ flex: 1, backgroundColor: Colors.bg }}>
        <ScrollView contentContainerStyle={{ padding: 20 }}>

          <Animated.View style={headerStyle}>
            <NotesHeader noteCount={notes.length} />
          </Animated.View>

          <Animated.View style={tabsStyle}>
            <FilterTabs
              filters={FILTERS}
              active={activeFilter}
              onChange={setActiveFilter}
            />
          </Animated.View>

          {filteredNotes.length === 0 ? (
            <Animated.View entering={FadeInDown.delay(100)} style={styles.emptyState}>
              <View style={styles.emptyIcon}>
                <Ionicons name="document-outline" size={32} color={Colors.textMuted} />
              </View>
              <Text style={styles.emptyTitle}>No notes yet</Text>
              <Text style={styles.emptySubtitle}>
                {activeFilter === "ALL"
                  ? "Tap the + button to create your first note."
                  : `No ${activeFilter.toLowerCase()} notes found.`}
              </Text>
            </Animated.View>
          ) : (
            <Animated.View entering={FadeInDown.delay(100)}>
              {filteredNotes.map((note, i) => (
                <Animated.View key={note.id} entering={FadeInDown.delay(120 + i * 60)}>
                  <NoteCardRenderer
                    note={note}
                    onPress={() => handleNotePress(note)}
                  />
                </Animated.View>
              ))}
            </Animated.View>
          )}

          <View style={{ height: 100 }} />
        </ScrollView>

        <NotesFAB onPress={() => setShowAddModal(true)} />

        <AddNoteModal
          visible={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSave={addNote}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  emptyState: {
    alignItems: "center",
    paddingVertical: 64,
    gap: 12,
  },
  emptyIcon: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  emptyTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: Colors.textPrimary,
  },
  emptySubtitle: {
    fontSize: 13,
    color: Colors.textMuted,
    textAlign: "center",
    maxWidth: 260,
    lineHeight: 20,
  },
});