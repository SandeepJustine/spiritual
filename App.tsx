import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Calendar, Clock12Icon as Home, Settings, Bell, BookOpen } from 'lucide-react-native';

// Import screens
import TodayScreen from './app/(tabs)/index';
import CalendarScreen from './app/(tabs)/calendar';
import JournalScreen from './app/(tabs)/journal';
import NotificationsScreen from './app/(tabs)/notifications';
import SettingsScreen from './app/(tabs)/settings';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#60A5FA',
          tabBarInactiveTintColor: '#9CA3AF',
          tabBarStyle: {
            backgroundColor: '#FFFFFF',
            borderTopWidth: 1,
            borderTopColor: '#E5E7EB',
            paddingBottom: 8,
            paddingTop: 8,
            height: 80,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '600',
            marginTop: 4,
          },
        }}>
        <Tab.Screen
          name="Today"
          component={TodayScreen}
          options={{
            tabBarIcon: ({ size, color }) => (
              <Home size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Calendar"
          component={CalendarScreen}
          options={{
            tabBarIcon: ({ size, color }) => (
              <Calendar size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Journal"
          component={JournalScreen}
          options={{
            tabBarIcon: ({ size, color }) => (
              <BookOpen size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Reminders"
          component={NotificationsScreen}
          options={{
            tabBarIcon: ({ size, color }) => (
              <Bell size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            tabBarIcon: ({ size, color }) => (
              <Settings size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
      <StatusBar style="light" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
</Tab.Screen>