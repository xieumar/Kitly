import { Tabs } from 'expo-router';
import { View, Text, TouchableOpacity } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';

function KitlyTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const tabs = [
    { name: 'index', label: 'HOME', icon: 'home' as const },
    { name: 'converter', label: 'CONVERTER', icon: 'repeat' as const },
    { name: 'notes', label: 'NOTES', icon: 'file-text' as const },
  ];

  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: '#0d1117',
        borderTopWidth: 1,
        borderTopColor: '#1e2736',
        paddingBottom: 24,
        paddingTop: 12,
      }}
    >
      {tabs.map((tab, index) => {
        const isFocused = state.index === index;
        return (
          <TouchableOpacity
            key={tab.name}
            onPress={() => navigation.navigate(tab.name)}
            style={{ flex: 1, alignItems: 'center', gap: 4 }}
            activeOpacity={0.7}
          >
            <Feather
              name={tab.icon}
              size={20}
              color={isFocused ? '#2ecc8f' : '#4a5568'}
            />
            <Text
              style={{
                fontSize: 9,
                letterSpacing: 1,
                fontWeight: '600',
                color: isFocused ? '#2ecc8f' : '#4a5568',
              }}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default function TabsLayout() {
  return (
    <Tabs tabBar={(props) => <KitlyTabBar {...props} />} screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="index" />
      <Tabs.Screen name="converter" />
      <Tabs.Screen name="notes" />
    </Tabs>
  );
}