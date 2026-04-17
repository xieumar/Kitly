import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Note } from "@/src/constants/mockData";

type NotesContextType = {
  notes: Note[];
  addNote: (note: Note) => void;
  updateNote: (updated: Note) => void;
  deleteNote: (id: string) => void;
};

const NotesContext = createContext<NotesContextType | null>(null);

const STORAGE_KEY = "@kitly_notes";

export function NotesProvider({ children }: { children: React.ReactNode }) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadNotes = async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          setNotes(JSON.parse(stored));
        }
      } catch (error) {
        console.error("Failed to load notes:", error);
      } finally {
        setIsLoaded(true);
      }
    };
    loadNotes();
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    const saveNotes = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
      } catch (error) {
        console.error("Failed to save notes:", error);
      }
    };
    saveNotes();
  }, [notes, isLoaded]);

  const addNote = (note: Note) => {
    setNotes((prev) => [note, ...prev]);
  };

  const updateNote = (updated: Note) => {
    setNotes((prev) => prev.map((n) => (n.id === updated.id ? updated : n)));
  };

  const deleteNote = (id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <NotesContext.Provider value={{ notes, addNote, updateNote, deleteNote }}>
      {children}
    </NotesContext.Provider>
  );
}

export function useNotes() {
  const ctx = useContext(NotesContext);
  if (!ctx) throw new Error("useNotes must be used within NotesProvider");
  return ctx;
}
