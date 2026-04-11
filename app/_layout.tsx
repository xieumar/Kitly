import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { NotesProvider } from '@/src/context/NotesContext';

export default function RootLayout() {
  return (
    <NotesProvider>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="note-detail" />
      </Stack>
    </NotesProvider>
  );
}