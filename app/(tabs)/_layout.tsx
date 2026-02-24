import { MaterialIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { useColorScheme } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const tintColor = colorScheme === 'dark' ? '#60a5fa' : '#2563eb';

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: tintColor,
        headerShown: true,
        headerStyle: { backgroundColor: colorScheme === 'dark' ? '#1f2937' : '#ffffff' },
        headerTintColor: colorScheme === 'dark' ? '#ffffff' : '#111827',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Courses',
          tabBarIcon: ({ color }) => <MaterialIcons name="library-books" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <MaterialIcons name="person" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
