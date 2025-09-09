import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Switch } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Bell, BellOff, Clock, Calendar } from 'lucide-react-native';
import { scheduleMonthlyNotifications, cancelAllNotifications, requestNotificationPermissions } from '@/utils/notifications';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

export default function NotificationsScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [scheduledCount, setScheduledCount] = useState(0);

  useEffect(() => {
    checkPermissionStatus();
    getScheduledNotificationsCount();
  }, []);

  const checkPermissionStatus = async () => {
    if (Platform.OS === 'web') {
      setPermissionGranted(Notification.permission === 'granted');
    } else {
      const { status } = await Notifications.getPermissionsAsync();
      setPermissionGranted(status === 'granted');
    }
  };

  const getScheduledNotificationsCount = async () => {
    if (Platform.OS !== 'web') {
      const notifications = await Notifications.getAllScheduledNotificationsAsync();
      setScheduledCount(notifications.length);
      setNotificationsEnabled(notifications.length > 0);
    }
  };

  const handleToggleNotifications = async () => {
    if (!notificationsEnabled) {
      // Enable notifications
      const success = await scheduleMonthlyNotifications();
      if (success) {
        setNotificationsEnabled(true);
        setPermissionGranted(true);
        await getScheduledNotificationsCount();
        Alert.alert(
          'Notifications Scheduled',
          'Daily reminders have been set for your September spiritual journey!',
          [{ text: 'OK' }]
        );
      } else {
        Alert.alert(
          'Permission Required',
          'Please allow notifications to receive daily spiritual reminders.',
          [{ text: 'OK' }]
        );
      }
    } else {
      // Disable notifications
      await cancelAllNotifications();
      setNotificationsEnabled(false);
      setScheduledCount(0);
      Alert.alert(
        'Notifications Cancelled',
        'All scheduled reminders have been cancelled.',
        [{ text: 'OK' }]
      );
    }
  };

  const testNotification = async () => {
    if (Platform.OS === 'web') {
      if (Notification.permission === 'granted') {
        new Notification('Test Reminder', {
          body: 'This is a test of your spiritual journey notifications!',
          icon: '/icon.png'
        });
      }
    } else {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Test Reminder',
          body: 'This is a test of your spiritual journey notifications!',
        },
        trigger: { seconds: 1 },
      });
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={['#60A5FA', '#3B82F6']}
        style={styles.header}>
        <View style={styles.headerContent}>
          <Bell size={32} color="#FFFFFF" />
          <Text style={styles.headerTitle}>Daily Reminders</Text>
          <Text style={styles.headerSubtitle}>Stay connected to your spiritual journey</Text>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        {/* Notification Toggle */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.cardTitleContainer}>
              {notificationsEnabled ? (
                <Bell size={24} color="#60A5FA" />
              ) : (
                <BellOff size={24} color="#9CA3AF" />
              )}
              <Text style={styles.cardTitle}>Daily Notifications</Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={handleToggleNotifications}
              trackColor={{ false: '#E5E7EB', true: '#BAE6FD' }}
              thumbColor={notificationsEnabled ? '#60A5FA' : '#9CA3AF'}
            />
          </View>
          
          <Text style={styles.cardDescription}>
            Receive daily reminders at 8:00 AM for your September spiritual activities.
          </Text>
          
          {notificationsEnabled && (
            <View style={styles.statusContainer}>
              <Text style={styles.statusText}>
                ✅ {scheduledCount} reminders scheduled for September
              </Text>
            </View>
          )}
        </View>

        {/* Notification Schedule */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.cardTitleContainer}>
              <Clock size={24} color="#60A5FA" />
              <Text style={styles.cardTitle}>Reminder Schedule</Text>
            </View>
          </View>
          
          <View style={styles.scheduleItem}>
            <Text style={styles.scheduleTime}>8:00 AM</Text>
            <Text style={styles.scheduleDescription}>Daily spiritual activity reminder</Text>
          </View>
          
          <View style={styles.scheduleItem}>
            <Text style={styles.scheduleTime}>Weekly</Text>
            <Text style={styles.scheduleDescription}>Week theme transition notification</Text>
          </View>
        </View>

        {/* Test Notification */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Test Notifications</Text>
          <Text style={styles.cardDescription}>
            Send a test notification to make sure everything is working properly.
          </Text>
          
          <TouchableOpacity 
            style={styles.testButton}
            onPress={testNotification}>
            <Text style={styles.testButtonText}>Send Test Notification</Text>
          </TouchableOpacity>
        </View>

        {/* Permission Status */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.cardTitleContainer}>
              <Calendar size={24} color="#60A5FA" />
              <Text style={styles.cardTitle}>Permission Status</Text>
            </View>
          </View>
          
          <View style={styles.permissionStatus}>
            <Text style={[
              styles.permissionText,
              { color: permissionGranted ? '#10B981' : '#EF4444' }
            ]}>
              {permissionGranted ? '✅ Notifications Allowed' : '❌ Permission Required'}
            </Text>
          </View>
          
          {!permissionGranted && (
            <TouchableOpacity 
              style={styles.permissionButton}
              onPress={() => requestNotificationPermissions().then(setPermissionGranted)}>
              <Text style={styles.permissionButtonText}>Request Permission</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Tips */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>💡 Notification Tips</Text>
          <View style={styles.tipsList}>
            <Text style={styles.tipItem}>• Set your phone to allow notifications from this app</Text>
            <Text style={styles.tipItem}>• Choose a consistent time for spiritual activities</Text>
            <Text style={styles.tipItem}>• Use reminders as gentle prompts, not rigid rules</Text>
            <Text style={styles.tipItem}>• Turn off notifications if you prefer self-guided practice</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 32,
    paddingHorizontal: 24,
  },
  headerContent: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 12,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#E0F2FE',
    opacity: 0.9,
  },
  content: {
    padding: 20,
    paddingBottom: 100,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginLeft: 12,
  },
  cardDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  statusContainer: {
    marginTop: 12,
    padding: 12,
    backgroundColor: '#F0FDF4',
    borderRadius: 8,
  },
  statusText: {
    fontSize: 14,
    color: '#10B981',
    fontWeight: '600',
  },
  scheduleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  scheduleTime: {
    fontSize: 16,
    fontWeight: '600',
    color: '#60A5FA',
    width: 80,
  },
  scheduleDescription: {
    fontSize: 14,
    color: '#4B5563',
    flex: 1,
  },
  testButton: {
    backgroundColor: '#60A5FA',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  testButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
  permissionStatus: {
    padding: 12,
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    marginBottom: 12,
  },
  permissionText: {
    fontSize: 14,
    fontWeight: '600',
  },
  permissionButton: {
    backgroundColor: '#EF4444',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  permissionButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
  tipsList: {
    marginTop: 8,
  },
  tipItem: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
    marginBottom: 6,
  },
});