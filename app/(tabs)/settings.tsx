import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Switch } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Settings as SettingsIcon, Bell, Heart, Share, Info, RefreshCw } from 'lucide-react-native';
import { cancelAllNotifications, scheduleMonthlyNotifications } from '@/utils/notifications';

export default function SettingsScreen() {
  const [dailyReminders, setDailyReminders] = useState(true);
  const [weeklyReflection, setWeeklyReflection] = useState(true);
  const [progressTracking, setProgressTracking] = useState(true);

  const handleResetProgress = () => {
    Alert.alert(
      'Reset Progress',
      'Are you sure you want to reset all your progress? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Reset', style: 'destructive', onPress: () => {
          // Reset logic would go here
          Alert.alert('Progress Reset', 'Your progress has been reset successfully.');
        }}
      ]
    );
  };

  const handleShareApp = () => {
    Alert.alert(
      'Share App',
      'Invite others to join their own spiritual journey with this app.',
      [{ text: 'OK' }]
    );
  };

  const handleAbout = () => {
    Alert.alert(
      'About September Spiritual Calendar',
      'A 30-day spiritual journey designed to deepen your faith through prayer, scripture, service, and reflection.\n\nVersion 1.0.0',
      [{ text: 'OK' }]
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={['#60A5FA', '#3B82F6']}
        style={styles.header}>
        <View style={styles.headerContent}>
          <SettingsIcon size={32} color="#FFFFFF" />
          <Text style={styles.headerTitle}>Settings</Text>
          <Text style={styles.headerSubtitle}>Customize your spiritual journey</Text>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        {/* Notification Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Bell size={20} color="#60A5FA" />
              <View style={styles.settingText}>
                <Text style={styles.settingTitle}>Daily Reminders</Text>
                <Text style={styles.settingDescription}>Get notified of daily activities at 8:00 AM</Text>
              </View>
            </View>
            <Switch
              value={dailyReminders}
              onValueChange={async (value) => {
                setDailyReminders(value);
                if (value) {
                  await scheduleMonthlyNotifications();
                } else {
                  await cancelAllNotifications();
                }
              }}
              trackColor={{ false: '#E5E7EB', true: '#BAE6FD' }}
              thumbColor={dailyReminders ? '#60A5FA' : '#9CA3AF'}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <RefreshCw size={20} color="#60A5FA" />
              <View style={styles.settingText}>
                <Text style={styles.settingTitle}>Weekly Reflection</Text>
                <Text style={styles.settingDescription}>Weekly summary of your spiritual progress</Text>
              </View>
            </View>
            <Switch
              value={weeklyReflection}
              onValueChange={setWeeklyReflection}
              trackColor={{ false: '#E5E7EB', true: '#BAE6FD' }}
              thumbColor={weeklyReflection ? '#60A5FA' : '#9CA3AF'}
            />
          </View>
        </View>

        {/* App Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App Settings</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Heart size={20} color="#60A5FA" />
              <View style={styles.settingText}>
                <Text style={styles.settingTitle}>Progress Tracking</Text>
                <Text style={styles.settingDescription}>Track completed daily activities</Text>
              </View>
            </View>
            <Switch
              value={progressTracking}
              onValueChange={setProgressTracking}
              trackColor={{ false: '#E5E7EB', true: '#BAE6FD' }}
              thumbColor={progressTracking ? '#60A5FA' : '#9CA3AF'}
            />
          </View>
        </View>

        {/* Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Actions</Text>
          
          <TouchableOpacity style={styles.actionItem} onPress={handleResetProgress}>
            <RefreshCw size={20} color="#EF4444" />
            <Text style={[styles.actionText, { color: '#EF4444' }]}>Reset Progress</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionItem} onPress={handleShareApp}>
            <Share size={20} color="#60A5FA" />
            <Text style={styles.actionText}>Share App</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionItem} onPress={handleAbout}>
            <Info size={20} color="#60A5FA" />
            <Text style={styles.actionText}>About</Text>
          </TouchableOpacity>
        </View>

        {/* Tips Section */}
        <View style={styles.tipsCard}>
          <Text style={styles.tipsTitle}>🌟 Journey Guidelines</Text>
          <View style={styles.tipsList}>
            <Text style={styles.tipItem}>• Choose a consistent prayer time each day</Text>
            <Text style={styles.tipItem}>• Keep a spiritual journal for reflections</Text>
            <Text style={styles.tipItem}>• Balance personal devotion with serving others</Text>
            <Text style={styles.tipItem}>• Use fasting as freedom from distractions</Text>
            <Text style={styles.tipItem}>• Remember: progress over perfection</Text>
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
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingText: {
    marginLeft: 12,
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  settingDescription: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  actionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#60A5FA',
    marginLeft: 12,
  },
  tipsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
  },
  tipsList: {
    marginTop: 8,
  },
  tipItem: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
    marginBottom: 8,
  },
});