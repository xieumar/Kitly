import React from "react";
import { TouchableOpacity } from "react-native";
import { Note } from "@/src/constants/mockData";
import TechnicalNoteCard from "./TechnicalNoteCard";
import VisualNoteCard from "./VisualNoteCard";
import SimpleNoteCard from "./SimpleNoteCard";
import ChecklistNoteCard from "./ChecklistNoteCard";
import SensorNoteCard from "./SensorNoteCard";

export default function NoteCardRenderer({
  note,
  onPress,
}: {
  note: Note;
  onPress: () => void;
}) {
  const render = () => {
    switch (note.type) {
      case "technical":
        return <TechnicalNoteCard note={note} />;
      case "visual":
        return <VisualNoteCard note={note} />;
      case "simple":
        return <SimpleNoteCard note={note} />;
      case "checklist":
        return <ChecklistNoteCard note={note} />;
      case "sensor":
        return <SensorNoteCard note={note} />;
    }
  };

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.85}>
      {render()}
    </TouchableOpacity>
  );
}