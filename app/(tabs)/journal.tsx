import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { BookOpen, Plus, Search, CreditCard as Edit3, Calendar, Heart } from 'lucide-react-native';
import { JournalEntry, moodEmojis, moodColors } from '@/data/journalData';
import { getJournalEntries, searchJournalEntries } from '@/utils/journalStorage';

export default function JournalScreen() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredEntries, setFilteredEntries] = useState<JournalEntry[]>([]);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  useEffect(() => {
    loadEntries();
  }, []);

  useEffect(() => {
    filterEntries();
  }, [entries, searchQuery, selectedMood]);

  const loadEntries = async () => {
    try {
      const journalEntries = await getJournalEntries();
      const sortedEntries = journalEntries.sort((a, b) => b.day - a.day);
      setEntries(sortedEntries);
    } catch (error) {
      console.error('Error loading entries:', error);
    }
  };

  const filterEntries = async () => {
    let filtered = entries;

    if (searchQuery) {
      filtered = await searchJournalEntries(searchQuery);
    }

    if (selectedMood) {
      filtered = filtered.filter(entry => entry.mood === selectedMood);
    }

    setFilteredEntries(filtered);
  };

  const navigateToEntry = (day: number) => {
    router.push(`/journal/${day}`);
  };

  const navigateToNewEntry = () => {
    const today = new Date().getDate();
    router.push(`/journal/${today}`);
  };

  const getEntryPreview = (content: string) => {
    return content.length > 120 ? content.substring(0, 120) + '...' : content;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const moods = Object.keys(moodEmojis) as Array<keyof typeof moodEmojis>;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={['#60A5FA', '#3B82F6']}
        style={styles.header}>
        <View style={styles.headerContent}>
          <BookOpen size={32} color="#FFFFFF" />
          <Text style={styles.headerTitle}>Spiritual Journal</Text>
          <Text style={styles.headerSubtitle}>Record your journey with God</Text>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        {/* Search and Filters */}
        <View style={styles.searchCard}>
          <View style={styles.searchContainer}>
            <Search size={20} color="#9CA3AF" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search your entries..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor="#9CA3AF"
            />
          </View>

          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.moodFilters}>
            <TouchableOpacity
              style={[
                styles.moodFilter,
                !selectedMood && styles.selectedMoodFilter
              ]}
              onPress={() => setSelectedMood(null)}>
              <Text style={[
                styles.moodFilterText,
                !selectedMood && styles.selectedMoodFilterText
              ]}>All</Text>
            </TouchableOpacity>
            
            {moods.map((mood) => (
              <TouchableOpacity
                key={mood}
                style={[
                  styles.moodFilter,
                  selectedMood === mood && styles.selectedMoodFilter,
                  { borderColor: moodColors[mood] }
                ]}
                onPress={() => setSelectedMood(selectedMood === mood ? null : mood)}>
                <Text style={styles.moodEmoji}>{moodEmojis[mood]}</Text>
                <Text style={[
                  styles.moodFilterText,
                  selectedMood === mood && styles.selectedMoodFilterText
                ]}>
                  {mood.charAt(0).toUpperCase() + mood.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Quick Actions */}
        <View style={styles.actionsCard}>
          <TouchableOpacity 
            style={styles.newEntryButton}
            onPress={navigateToNewEntry}>
            <Plus size={20} color="#FFFFFF" />
            <Text style={styles.newEntryButtonText}>New Entry</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.calendarButton}
            onPress={() => router.push('/(tabs)/calendar')}>
            <Calendar size={20} color="#60A5FA" />
            <Text style={styles.calendarButtonText}>View Calendar</Text>
          </TouchableOpacity>
        </View>

        {/* Journal Stats */}
        <View style={styles.statsCard}>
          <Text style={styles.statsTitle}>Journal Statistics</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{entries.length}</Text>
              <Text style={styles.statLabel}>Total Entries</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>
                {new Set(entries.map(e => e.day)).size}
              </Text>
              <Text style={styles.statLabel}>Days Journaled</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>
                {entries.reduce((total, entry) => total + entry.content.split(' ').length, 0)}
              </Text>
              <Text style={styles.statLabel}>Words Written</Text>
            </View>
          </View>
        </View>

        {/* Journal Entries */}
        <View style={styles.entriesSection}>
          <Text style={styles.sectionTitle}>
            {searchQuery || selectedMood ? 'Filtered Entries' : 'Recent Entries'}
          </Text>
          
          {filteredEntries.length === 0 ? (
            <View style={styles.emptyState}>
              <BookOpen size={48} color="#9CA3AF" />
              <Text style={styles.emptyTitle}>
                {searchQuery || selectedMood ? 'No entries found' : 'Start Your Journal'}
              </Text>
              <Text style={styles.emptyDescription}>
                {searchQuery || selectedMood 
                  ? 'Try adjusting your search or filter criteria'
                  : 'Begin documenting your spiritual journey by creating your first entry'
                }
              </Text>
              {!searchQuery && !selectedMood && (
                <TouchableOpacity 
                  style={styles.emptyButton}
                  onPress={navigateToNewEntry}>
                  <Text style={styles.emptyButtonText}>Create First Entry</Text>
                </TouchableOpacity>
              )}
            </View>
          ) : (
            filteredEntries.map((entry) => (
              <TouchableOpacity
                key={entry.id}
                style={styles.entryCard}
                onPress={() => navigateToEntry(entry.day)}>
                
                <View style={styles.entryHeader}>
                  <View style={styles.entryLeft}>
                    <Text style={styles.entryMood}>{moodEmojis[entry.mood]}</Text>
                    <View>
                      <Text style={styles.entryTitle}>{entry.title}</Text>
                      <Text style={styles.entryDate}>
                        Day {entry.day} • {formatDate(entry.updatedAt)}
                      </Text>
                    </View>
                  </View>
                  <Edit3 size={16} color="#9CA3AF" />
                </View>

                <Text style={styles.entryPreview}>
                  {getEntryPreview(entry.content)}
                </Text>

                {entry.tags.length > 0 && (
                  <View style={styles.tagsContainer}>
                    {entry.tags.slice(0, 3).map((tag, index) => (
                      <View key={index} style={styles.tag}>
                        <Text style={styles.tagText}>{tag}</Text>
                      </View>
                    ))}
                    {entry.tags.length > 3 && (
                      <Text style={styles.moreTagsText}>+{entry.tags.length - 3} more</Text>
                    )}
                  </View>
                )}
              </TouchableOpacity>
            ))
          )}
        </View>

        {/* Journal Tips */}
        <View style={styles.tipsCard}>
          <Text style={styles.tipsTitle}>✍️ Journaling Tips</Text>
          <View style={styles.tipsList}>
            <Text style={styles.tipItem}>• Write honestly about your spiritual experiences</Text>
            <Text style={styles.tipItem}>• Include both struggles and victories in your entries</Text>
            <Text style={styles.tipItem}>• Use the daily prompts to guide your reflection</Text>
            <Text style={styles.tipItem}>• Record specific prayers and watch for God's answers</Text>
            <Text style={styles.tipItem}>• Review past entries to see your spiritual growth</Text>
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
  searchCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#1F2937',
  },
  moodFilters: {
    flexDirection: 'row',
  },
  moodFilter: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#F9FAFB',
    marginRight: 8,
  },
  selectedMoodFilter: {
    backgroundColor: '#60A5FA',
    borderColor: '#60A5FA',
  },
  moodEmoji: {
    fontSize: 14,
    marginRight: 4,
  },
  moodFilterText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
  },
  selectedMoodFilterText: {
    color: '#FFFFFF',
  },
  actionsCard: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  newEntryButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#60A5FA',
    paddingVertical: 16,
    borderRadius: 12,
  },
  newEntryButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 8,
  },
  calendarButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0F9FF',
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#BAE6FD',
  },
  calendarButtonText: {
    color: '#60A5FA',
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 8,
  },
  statsCard: {
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
  statsTitle: {
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
  entriesSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  emptyState: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 40,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  emptyButton: {
    backgroundColor: '#60A5FA',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  emptyButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
  entryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  entryLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  entryMood: {
    fontSize: 24,
    marginRight: 12,
  },
  entryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  entryDate: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  entryPreview: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
    marginBottom: 12,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  tag: {
    backgroundColor: '#F0F9FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 6,
    marginBottom: 4,
  },
  tagText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#60A5FA',
  },
  moreTagsText: {
    fontSize: 10,
    color: '#9CA3AF',
    fontStyle: 'italic',
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