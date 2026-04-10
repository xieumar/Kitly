import { Tabs } from 'expo-router';
import { StyleSheet, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/src/constants/colors';

type TabIconProps = {
  name: keyof typeof Ionicons.glyphMap;
  focused: boolean;
  label: string;
};

function TabIcon({ name, focused, label }: TabIconProps) {
  return (
    <View style={styles.tabItem}>
      <Ionicons
        name={name}
        size={20}
        color={focused ? Colors.accent : Colors.textMuted}
      />
      <Text style={[styles.tabLabel, focused && styles.tabLabelActive]}>
        {label}
      </Text>
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon name="home-outline" focused={focused} label="HOME" />
          ),
        }}
      />
      <Tabs.Screen
        name="converter"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon name="swap-horizontal-outline" focused={focused} label="CONVERTER" />
          ),
        }}
      />
      <Tabs.Screen
        name="notes"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon name="document-text-outline" focused={focused} label="NOTES" />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.surface,
    borderTopColor: Colors.border,
    borderTopWidth: 1,
    height: 64,
    paddingBottom: 8,
    paddingTop: 8,
  },
  tabItem: {
    alignItems: 'center',
    gap: 4,
  },
  tabLabel: {
    fontSize: 9,
    fontWeight: '600',
    letterSpacing: 0.8,
    color: Colors.textMuted,
  },
  tabLabelActive: {
    color: Colors.accent,
  },
});