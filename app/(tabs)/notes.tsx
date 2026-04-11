import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import { useRouter } from "expo-router";

import { Colors } from "@/src/constants/colors";
import { NOTES, Note } from "@/src/constants/mockData";

import NotesHeader from "@/components/notes/NotesHeader";
import FilterTabs from "@/components/notes/FilterTabs";
import NoteCardRenderer from "@/components/notes/NoteCardRenderer";
import NotesFAB from "@/components/notes/NotesFAB";

type FilterKey = "ALL" | "TECHNICAL" | "DRAFTS";
const FILTERS: FilterKey[] = ["ALL", "TECHNICAL", "DRAFTS"];

export default function NotesScreen() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState<FilterKey>("ALL");

  const filteredNotes = NOTES.filter((n) => {
    if (activeFilter === "TECHNICAL") return n.type === "technical" || n.type === "sensor";
    if (activeFilter === "DRAFTS") return n.type === "simple";
    return true;
  });

  const handleNotePress = (note: Note) => {
    router.push({ pathname: "/note-detail" as any, params: { id: note.id } });
  };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
      <View style={{ flex: 1, backgroundColor: Colors.bg }}>
        <ScrollView contentContainerStyle={{ padding: 20 }}>

          <Animated.View entering={FadeIn.duration(300)}>
            <NotesHeader noteCount={NOTES.length} />
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(50)}>
            <FilterTabs
              filters={FILTERS}
              active={activeFilter}
              onChange={setActiveFilter}
            />
          </Animated.View>

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

          <View style={{ height: 100 }} />
        </ScrollView>

        <NotesFAB
          onPress={() =>
            router.push({ pathname: "/note-detail" as any, params: { id: "new" } })
          }
        />
      </View>
    </SafeAreaView>
  );
}