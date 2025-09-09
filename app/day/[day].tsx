import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, CircleCheck as CheckCircle, Circle, Share, Calendar, BookOpen } from 'lucide-react-native';
import { septemberCalendar, activityTypes, weekThemes } from '@/data/septemberCalendar';

const { width } = Dimensions.get('window');

export default function DayDetailScreen() {
  const { day } = useLocalSearchParams<{ day: string }>();
  const dayNumber = parseInt(day as string, 10);
  const [completed, setCompleted] = useState(false);

  const activity = septemberCalendar.find(a => a.day === dayNumber);

  if (!activity) {
    return (
      <View style={styles.container}>
        <Text>Activity not found</Text>
      </View>
    );
  }

  const weekTheme = weekThemes.find(w => w.week === activity.week);
  const activityType = activityTypes[activity.type];

  const toggleComplete = () => {
    setCompleted(!completed);
  };

  const handleShare = () => {
    // Share functionality would be implemented here
  };

  const getRelatedActivities = () => {
    return septemberCalendar.filter(a => 
      a.week === activity.week && a.day !== activity.day
    ).slice(0, 3);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={['#60A5FA', '#3B82F6']}
        style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}>
            <ArrowLeft size={24} color="#FFFFFF" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.shareButton}
            onPress={handleShare}>
            <Share size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <View style={styles.headerContent}>
          <Text style={styles.dayNumber}>Day {activity.day}</Text>
          <Text style={styles.activityTitle}>{activity.title}</Text>
          <Text style={styles.activityDate}>{activity.date}</Text>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        {/* Activity Details */}
        <View style={styles.mainCard}>
          <View style={styles.activityHeader}>
            <View style={styles.activityTypeContainer}>
              <Text style={styles.activityIcon}>{activityType.icon}</Text>
              <View>
                <Text style={styles.activityTypeLabel}>
                  {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
                </Text>
                <Text style={styles.weekThemeText}>{activity.weekTheme}</Text>
              </View>
            </View>
            
            <TouchableOpacity 
              onPress={toggleComplete}
              style={styles.completeButton}>
              {completed ? (
                <CheckCircle size={32} color="#10B981" />
              ) : (
                <Circle size={32} color="#9CA3AF" />
              )}
            </TouchableOpacity>
          </View>

          <Text style={styles.description}>{activity.description}</Text>

          {completed && (
            <View style={styles.completedBanner}>
              <Text style={styles.completedText}>✅ Activity Completed!</Text>
            </View>
          )}
        </View>

        {/* Week Context */}
        <View style={[styles.weekCard, { backgroundColor: weekTheme?.color }]}>
          <Text style={styles.weekCardTitle}>Week {activity.week} Focus</Text>
          <Text style={styles.weekCardTheme}>{activity.weekTheme}</Text>
          <Text style={styles.weekCardDescription}>
            This week is focused on {activity.weekTheme.toLowerCase()}. Each day builds upon the previous, creating a deeper spiritual foundation.
          </Text>
        </View>

        {/* Reflection Questions */}
        <View style={styles.reflectionCard}>
          <Text style={styles.reflectionTitle}>💭 Reflection Questions</Text>
          <View style={styles.questionsList}>
            <Text style={styles.question}>• How did this activity draw you closer to God?</Text>
            <Text style={styles.question}>• What insights did you gain today?</Text>
            <Text style={styles.question}>• How can you apply this learning tomorrow?</Text>
            <Text style={styles.question}>• What are you grateful for from today?</Text>
          </View>
        </View>

        {/* Related Activities */}
        <View style={styles.relatedCard}>
          <Text style={styles.relatedTitle}>Other Days This Week</Text>
          {getRelatedActivities().map((relatedActivity) => (
            <TouchableOpacity
              key={relatedActivity.day}
              style={styles.relatedItem}
              onPress={() => router.push(`/day/${relatedActivity.day}`)}>
              <View style={styles.relatedLeft}>
                <Text style={styles.relatedIcon}>
                  {activityTypes[relatedActivity.type].icon}
                </Text>
                <View>
                  <Text style={styles.relatedItemTitle}>Day {relatedActivity.day}: {relatedActivity.title}</Text>
                  <Text style={styles.relatedItemType}>
                    {relatedActivity.type.charAt(0).toUpperCase() + relatedActivity.type.slice(1)}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Quick Actions */}
        <View style={styles.actionsCard}>
          <Text style={styles.actionsTitle}>Quick Actions</Text>
          
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => router.push(`/journal/${dayNumber}`)}>
            <BookOpen size={20} color="#8B5CF6" />
            <Text style={[styles.actionButtonText, { color: '#8B5CF6' }]}>Write in Journal</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => router.push('/(tabs)/calendar')}>
            <Calendar size={20} color="#60A5FA" />
            <Text style={styles.actionButtonText}>View Full Calendar</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => router.push('/(tabs)/')}>
            <ArrowLeft size={20} color="#60A5FA" />
            <Text style={styles.actionButtonText}>Back to Today</Text>
          </TouchableOpacity>
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
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shareButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContent: {
    alignItems: 'center',
  },
  dayNumber: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  activityTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 4,
  },
  activityDate: {
    fontSize: 16,
    color: '#E0F2FE',
    opacity: 0.9,
  },
  content: {
    padding: 20,
    paddingBottom: 100,
  },
  mainCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  activityTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  activityIcon: {
    fontSize: 40,
    marginRight: 16,
  },
  activityTypeLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#60A5FA',
  },
  weekThemeText: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  completeButton: {
    padding: 4,
  },
  description: {
    fontSize: 18,
    color: '#374151',
    lineHeight: 28,
    marginBottom: 16,
  },
  completedBanner: {
    backgroundColor: '#F0FDF4',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#BBF7D0',
  },
  completedText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#10B981',
    textAlign: 'center',
  },
  weekCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  weekCardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  weekCardTheme: {
    fontSize: 16,
    fontWeight: '600',
    color: '#60A5FA',
    marginBottom: 12,
  },
  weekCardDescription: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
  },
  reflectionCard: {
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
  reflectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  questionsList: {
    marginTop: 8,
  },
  question: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
    marginBottom: 12,
  },
  relatedCard: {
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
  relatedTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  relatedItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  relatedLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  relatedIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  relatedItemTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  relatedItemType: {
    fontSize: 12,
    color: '#60A5FA',
    marginTop: 2,
  },
  actionsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  actionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F9FF',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#BAE6FD',
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#60A5FA',
    marginLeft: 12,
  },
});