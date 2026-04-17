import { Task } from "@/src/constants/mockData";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

type TasksContextType = {
  tasks: Task[];
  addTask: (task: Task) => void;
  updateTask: (updated: Task) => void;
  deleteTask: (id: string) => void;
  toggleTaskCompletion: (id: string) => void;
};

const TasksContext = createContext<TasksContextType | null>(null);

const STORAGE_KEY = "@kitly_tasks";

export function TasksProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          setTasks(JSON.parse(stored));
        }
      } catch (error) {
        console.error("Failed to load tasks:", error);
      } finally {
        setIsLoaded(true);
      }
    };
    loadTasks();
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    const saveTasks = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
      } catch (error) {
        console.error("Failed to save tasks:", error);
      }
    };
    saveTasks();
  }, [tasks, isLoaded]);

  const addTask = (task: Task) => {
    setTasks((prev) => [task, ...prev]);
  };

  const updateTask = (updated: Task) => {
    setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleTaskCompletion = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  return (
    <TasksContext.Provider
      value={{ tasks, addTask, updateTask, deleteTask, toggleTaskCompletion }}
    >
      {children}
    </TasksContext.Provider>
  );
}

export function useTasks() {
  const ctx = useContext(TasksContext);
  if (!ctx) throw new Error("useTasks must be used within TasksProvider");
  return ctx;
}

// Backwards compatibility - keep old context for now
type NotesContextType = TasksContextType & {
  notes: Task[];
  addNote: (note: Task) => void;
  updateNote: (updated: Task) => void;
  deleteNote: (id: string) => void;
};

export function useNotes() {
  const ctx = useTasks();
  return {
    notes: ctx.tasks,
    addNote: ctx.addTask,
    updateNote: ctx.updateTask,
    deleteNote: ctx.deleteTask,
  } as NotesContextType;
}
