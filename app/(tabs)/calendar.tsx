import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { septemberCalendar, weekThemes, activityTypes } from '@/data/septemberCalendar';

const { width } = Dimensions.get('window');
const cardWidth = (width - 60) / 2;

export default function CalendarScreen() {
  const [completedActivities, setCompletedActivities] = useState<Set<number>>(new Set());

  const navigateToDay = (day: number) => {
    router.push(`/day/${day}`);
  };

  const getWeekDays = (weekNumber: number) => {
    return septemberCalendar.filter(activity => activity.week === weekNumber);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={['#60A5FA', '#3B82F6']}
        style={styles.header}>
        <Text style={styles.headerTitle}>September Calendar</Text>
        <Text style={styles.headerSubtitle}>30-Day Spiritual Journey</Text>
      </LinearGradient>

      <View style={styles.content}>
        {weekThemes.map((week) => (
          <View key={week.week} style={styles.weekSection}>
            <View style={[styles.weekHeader, { backgroundColor: week.color }]}>
              <Text style={styles.weekTitle}>Week {week.week}</Text>
              <Text style={styles.weekTheme}>{week.theme}</Text>
            </View>
            
            <View style={styles.daysGrid}>
              {getWeekDays(week.week).map((activity) => (
                <TouchableOpacity
                  key={activity.day}
                  style={[
                    styles.dayCard,
                    { width: cardWidth },
                    completedActivities.has(activity.day) && styles.completedCard
                  ]}
                  onPress={() => navigateToDay(activity.day)}>
                  
                  <View style={styles.dayHeader}>
                    <Text style={styles.dayNumber}>{activity.day}</Text>
                    <Text style={styles.activityIcon}>
                      {activityTypes[activity.type].icon}
                    </Text>
                  </View>
                  
                  <Text style={styles.dayTitle} numberOfLines={2}>
                    {activity.title}
                  </Text>
                  
                  <Text style={styles.dayDescription} numberOfLines={3}>
                    {activity.description}
                  </Text>
                  
                  <View style={[
                    styles.activityTypeBadge,
                    { backgroundColor: activityTypes[activity.type].color }
                  ]}>
                    <Text style={styles.activityTypeText}>
                      {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        {/* Monthly Overview */}
        <View style={styles.overviewCard}>
          <Text style={styles.sectionTitle}>Monthly Overview</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>30</Text>
              <Text style={styles.statLabel}>Total Days</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>4</Text>
              <Text style={styles.statLabel}>Weeks</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{completedActivities.size}</Text>
              <Text style={styles.statLabel}>Completed</Text>
            </View>
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
  weekSection: {
    marginBottom: 32,
  },
  weekHeader: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  weekTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  weekTheme: {
    fontSize: 14,
    color: '#4B5563',
    marginTop: 2,
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  dayCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  completedCard: {
    backgroundColor: '#F0FDF4',
    borderWidth: 2,
    borderColor: '#10B981',
  },
  dayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  dayNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#60A5FA',
  },
  activityIcon: {
    fontSize: 20,
  },
  dayTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 6,
  },
  dayDescription: {
    fontSize: 12,
    color: '#6B7280',
    lineHeight: 16,
    marginBottom: 12,
  },
  activityTypeBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  activityTypeText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  overviewCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
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
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#60A5FA',
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
});