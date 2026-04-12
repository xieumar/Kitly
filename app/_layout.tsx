import { Colors } from '@/src/constants/colors';
import { NotesProvider } from '@/src/context/NotesContext';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

export default function RootLayout() {
  return (
    <NotesProvider>
      <View style={{ flex: 1, backgroundColor: Colors.bg }}>
        <StatusBar style="light" />
        <Stack screenOptions={{ 
          headerShown: false,
        }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="note-detail" />
        </Stack>
      </View>
    </NotesProvider>
  );
}