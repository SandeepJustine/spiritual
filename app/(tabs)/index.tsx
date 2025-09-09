import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { ChevronRight, CircleCheck as CheckCircle, Circle, BookOpen } from 'lucide-react-native';
import { septemberCalendar, activityTypes } from '@/data/septemberCalendar';

const { width } = Dimensions.get('window');

export default function TodayScreen() {
  const [completedActivities, setCompletedActivities] = useState<Set<number>>(new Set());
  const today = new Date();
  const currentDay = today.getDate();
  const currentMonth = today.getMonth();
  
  // For demo purposes, show September activities regardless of current month
  const todayActivity = septemberCalendar.find(activity => activity.day === currentDay) || septemberCalendar[0];

  const toggleComplete = (day: number) => {
    const newCompleted = new Set(completedActivities);
    if (newCompleted.has(day)) {
      newCompleted.delete(day);
    } else {
      newCompleted.add(day);
    }
    setCompletedActivities(newCompleted);
  };

  const navigateToDay = (day: number) => {
    router.push(`/day/${day}`);
  };

  const getUpcomingActivities = () => {
    return septemberCalendar.slice(currentDay, currentDay + 3);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={['#60A5FA', '#3B82F6']}
        style={styles.header}>
        <Text style={styles.headerTitle}>September Spiritual Journey</Text>
        <Text style={styles.headerSubtitle}>Day {todayActivity.day} • {todayActivity.weekTheme}</Text>
      </LinearGradient>

      <View style={styles.content}>
        {/* Today's Activity */}
        <View style={styles.todayCard}>
          <View style={styles.todayHeader}>
            <View style={styles.activityTypeContainer}>
              <Text style={styles.activityIcon}>
                {activityTypes[todayActivity.type].icon}
              </Text>
              <View>
                <Text style={styles.todayTitle}>{todayActivity.title}</Text>
                <Text style={styles.todayDate}>{todayActivity.date}</Text>
              </View>
            </View>
            <TouchableOpacity 
              onPress={() => toggleComplete(todayActivity.day)}
              style={styles.completeButton}>
              {completedActivities.has(todayActivity.day) ? (
                <CheckCircle size={28} color="#10B981" />
              ) : (
                <Circle size={28} color="#9CA3AF" />
              )}
            </TouchableOpacity>
          </View>
          
          <Text style={styles.todayDescription}>{todayActivity.description}</Text>
          
          <TouchableOpacity 
            style={styles.detailsButton}
            onPress={() => navigateToDay(todayActivity.day)}>
            <Text style={styles.detailsButtonText}>View Full Details</Text>
            <ChevronRight size={16} color="#60A5FA" />
          </TouchableOpacity>
        </View>

        {/* Week Progress */}
        <View style={styles.weekProgressCard}>
          <Text style={styles.sectionTitle}>Week {todayActivity.week} Progress</Text>
          <Text style={styles.weekTheme}>{todayActivity.weekTheme}</Text>
          
          <View style={styles.progressBar}>
            <View style={styles.progressTrack}>
              <View 
                style={[
                  styles.progressFill, 
                  { width: `${(todayActivity.day % 7 || 7) * 14.28}%` }
                ]} 
              />
            </View>
            <Text style={styles.progressText}>
              {todayActivity.day % 7 || 7}/7 days
            </Text>
          </View>
        </View>

        {/* Upcoming Activities */}
        <View style={styles.upcomingCard}>
          <Text style={styles.sectionTitle}>Coming Up</Text>
          {getUpcomingActivities().map((activity) => (
            <TouchableOpacity
              key={activity.day}
              style={styles.upcomingItem}
              onPress={() => navigateToDay(activity.day)}>
              <View style={styles.upcomingLeft}>
                <Text style={styles.upcomingIcon}>
                  {activityTypes[activity.type].icon}
                </Text>
                <View>
                  <Text style={styles.upcomingTitle}>{activity.title}</Text>
                  <Text style={styles.upcomingDate}>{activity.date}</Text>
                </View>
              </View>
              <ChevronRight size={16} color="#9CA3AF" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Tips Section */}
        <View style={styles.tipsCard}>
          <Text style={styles.sectionTitle}>📌 Tips for Success</Text>
          <View style={styles.tipsList}>
            <Text style={styles.tipItem}>• Choose a set prayer time and stick with it</Text>
            <Text style={styles.tipItem}>• Keep a spiritual journal for prayers and reflections</Text>
            <Text style={styles.tipItem}>• Fast from distractions, not just food</Text>
            <Text style={styles.tipItem}>• Balance private devotion with acts of love</Text>
          </View>
        </View>
        
        <TouchableOpacity 
          style={styles.journalButton}
          onPress={() => router.push(`/journal/${todayActivity.day}`)}>
          <BookOpen size={16} color="#8B5CF6" />
          <Text style={styles.journalButtonText}>Write in Journal</Text>
        </TouchableOpacity>
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
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
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
  todayCard: {
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
  todayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  activityTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  activityIcon: {
    fontSize: 32,
    marginRight: 12,
  },
  todayTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  todayDate: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  completeButton: {
    padding: 4,
  },
  todayDescription: {
    fontSize: 16,
    color: '#4B5563',
    lineHeight: 24,
    marginBottom: 16,
  },
  detailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0F9FF',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#BAE6FD',
  },
  detailsButtonText: {
    color: '#60A5FA',
    fontWeight: '600',
    marginRight: 4,
  },
  journalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FAF5FF',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DDD6FE',
    marginTop: 8,
  },
  journalButtonText: {
    color: '#8B5CF6',
    fontWeight: '600',
    marginLeft: 4,
  },
  weekProgressCard: {
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  weekTheme: {
    fontSize: 14,
    color: '#60A5FA',
    fontWeight: '600',
    marginBottom: 16,
  },
  progressBar: {
    marginTop: 8,
  },
  progressTrack: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#60A5FA',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'right',
    marginTop: 4,
  },
  upcomingCard: {
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
  upcomingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  upcomingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  upcomingIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  upcomingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  upcomingDate: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
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