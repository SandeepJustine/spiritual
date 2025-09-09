import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ChevronRight, CircleCheck as CheckCircle, Circle } from 'lucide-react-native';
import { DayActivity, activityTypes } from '@/data/septemberCalendar';

interface ActivityCardProps {
  activity: DayActivity;
  isCompleted: boolean;
  onPress: () => void;
  onToggleComplete: () => void;
}

export default function ActivityCard({ 
  activity, 
  isCompleted, 
  onPress, 
  onToggleComplete 
}: ActivityCardProps) {
  const activityType = activityTypes[activity.type];

  return (
    <TouchableOpacity 
      style={[styles.card, isCompleted && styles.completedCard]}
      onPress={onPress}>
      
      <View style={styles.header}>
        <View style={styles.left}>
          <Text style={styles.icon}>{activityType.icon}</Text>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{activity.title}</Text>
            <Text style={styles.date}>{activity.date} • Day {activity.day}</Text>
          </View>
        </View>
        
        <TouchableOpacity 
          onPress={onToggleComplete}
          style={styles.completeButton}>
          {isCompleted ? (
            <CheckCircle size={24} color="#10B981" />
          ) : (
            <Circle size={24} color="#9CA3AF" />
          )}
        </TouchableOpacity>
      </View>

      <Text style={styles.description} numberOfLines={3}>
        {activity.description}
      </Text>

      <View style={styles.footer}>
        <View style={[styles.typeBadge, { backgroundColor: activityType.color }]}>
          <Text style={styles.typeText}>
            {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
          </Text>
        </View>
        
        <ChevronRight size={16} color="#9CA3AF" />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  completedCard: {
    backgroundColor: '#F0FDF4',
    borderWidth: 1,
    borderColor: '#BBF7D0',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  icon: {
    fontSize: 28,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  date: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  completeButton: {
    padding: 4,
  },
  description: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
    marginBottom: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  typeBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  typeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});