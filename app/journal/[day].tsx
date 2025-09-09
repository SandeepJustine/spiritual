import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, Save, Trash2, Calendar, Tag } from 'lucide-react-native';
import { JournalEntry, journalPrompts, moodEmojis, moodColors } from '@/data/journalData';
import { saveJournalEntry, getJournalEntryByDay, deleteJournalEntry } from '@/utils/journalStorage';
import { septemberCalendar } from '@/data/septemberCalendar';

export default function JournalEntryScreen() {
  const { day } = useLocalSearchParams<{ day: string }>();
  const dayNumber = parseInt(day as string, 10);
  
  const [entry, setEntry] = useState<JournalEntry | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [mood, setMood] = useState<keyof typeof moodEmojis>('peaceful');
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const activity = septemberCalendar.find(a => a.day === dayNumber);
  const prompts = journalPrompts.find(p => p.day === dayNumber);

  useEffect(() => {
    loadEntry();
  }, [dayNumber]);

  const loadEntry = async () => {
    try {
      const existingEntry = await getJournalEntryByDay(dayNumber);
      if (existingEntry) {
        setEntry(existingEntry);
        setTitle(existingEntry.title);
        setContent(existingEntry.content);
        setMood(existingEntry.mood);
        setTags(existingEntry.tags);
      } else {
        // Set default title for new entries
        setTitle(activity?.title || `Day ${dayNumber} Reflection`);
      }
    } catch (error) {
      console.error('Error loading entry:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      Alert.alert('Missing Information', 'Please add both a title and content for your journal entry.');
      return;
    }

    setIsSaving(true);
    try {
      const now = new Date();
      const entryToSave: JournalEntry = {
        id: entry?.id || `${dayNumber}-${Date.now()}`,
        day: dayNumber,
        date: activity?.date || `Sept ${dayNumber}`,
        title: title.trim(),
        content: content.trim(),
        mood,
        tags,
        createdAt: entry?.createdAt || now,
        updatedAt: now,
      };

      await saveJournalEntry(entryToSave);
      setEntry(entryToSave);
      
      Alert.alert(
        'Entry Saved',
        'Your journal entry has been saved successfully!',
        [{ text: 'OK' }]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to save your journal entry. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = () => {
    if (!entry) return;

    Alert.alert(
      'Delete Entry',
      'Are you sure you want to delete this journal entry? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive', 
          onPress: async () => {
            try {
              await deleteJournalEntry(entry.id);
              router.back();
            } catch (error) {
              Alert.alert('Error', 'Failed to delete the entry. Please try again.');
            }
          }
        }
      ]
    );
  };

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const insertPrompt = (prompt: string) => {
    const newContent = content + (content ? '\n\n' : '') + prompt + '\n\n';
    setContent(newContent);
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const moods = Object.keys(moodEmojis) as Array<keyof typeof moodEmojis>;

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      
      <LinearGradient
        colors={['#60A5FA', '#3B82F6']}
        style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}>
            <ArrowLeft size={24} color="#FFFFFF" />
          </TouchableOpacity>
          
          <View style={styles.headerActions}>
            {entry && (
              <TouchableOpacity 
                style={styles.deleteButton}
                onPress={handleDelete}>
                <Trash2 size={20} color="#FFFFFF" />
              </TouchableOpacity>
            )}
            
            <TouchableOpacity 
              style={[styles.saveButton, isSaving && styles.savingButton]}
              onPress={handleSave}
              disabled={isSaving}>
              <Save size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.headerContent}>
          <Text style={styles.dayNumber}>Day {dayNumber}</Text>
          <Text style={styles.activityTitle}>{activity?.title}</Text>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Entry Form */}
        <View style={styles.formCard}>
          <Text style={styles.formLabel}>Entry Title</Text>
          <TextInput
            style={styles.titleInput}
            value={title}
            onChangeText={setTitle}
            placeholder="Give your entry a meaningful title..."
            placeholderTextColor="#9CA3AF"
          />

          <Text style={styles.formLabel}>How are you feeling?</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.moodSelector}>
            {moods.map((moodOption) => (
              <TouchableOpacity
                key={moodOption}
                style={[
                  styles.moodOption,
                  mood === moodOption && styles.selectedMood,
                  { borderColor: moodColors[moodOption] }
                ]}
                onPress={() => setMood(moodOption)}>
                <Text style={styles.moodEmoji}>{moodEmojis[moodOption]}</Text>
                <Text style={[
                  styles.moodText,
                  mood === moodOption && styles.selectedMoodText
                ]}>
                  {moodOption.charAt(0).toUpperCase() + moodOption.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <Text style={styles.formLabel}>Your Reflection</Text>
          <TextInput
            style={styles.contentInput}
            value={content}
            onChangeText={setContent}
            placeholder="Share your thoughts, prayers, insights, and experiences from today's spiritual activity..."
            placeholderTextColor="#9CA3AF"
            multiline
            textAlignVertical="top"
          />

          {/* Tags */}
          <Text style={styles.formLabel}>Tags</Text>
          <View style={styles.tagsSection}>
            <View style={styles.tagsContainer}>
              {tags.map((tag, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.tag}
                  onPress={() => removeTag(tag)}>
                  <Text style={styles.tagText}>{tag}</Text>
                  <Text style={styles.removeTagText}>×</Text>
                </TouchableOpacity>
              ))}
            </View>
            
            <View style={styles.addTagContainer}>
              <TextInput
                style={styles.tagInput}
                value={newTag}
                onChangeText={setNewTag}
                placeholder="Add a tag..."
                placeholderTextColor="#9CA3AF"
                onSubmitEditing={addTag}
              />
              <TouchableOpacity style={styles.addTagButton} onPress={addTag}>
                <Tag size={16} color="#60A5FA" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Reflection Prompts */}
        {prompts && (
          <View style={styles.promptsCard}>
            <Text style={styles.promptsTitle}>💭 Reflection Prompts</Text>
            <Text style={styles.promptsDescription}>
              Tap any prompt to add it to your journal entry
            </Text>
            {prompts.prompts.map((prompt, index) => (
              <TouchableOpacity
                key={index}
                style={styles.promptItem}
                onPress={() => insertPrompt(prompt)}>
                <Text style={styles.promptText}>{prompt}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Activity Context */}
        {activity && (
          <View style={styles.contextCard}>
            <Text style={styles.contextTitle}>Today's Activity</Text>
            <Text style={styles.contextDescription}>{activity.description}</Text>
            
            <TouchableOpacity 
              style={styles.viewActivityButton}
              onPress={() => router.push(`/day/${dayNumber}`)}>
              <Calendar size={16} color="#60A5FA" />
              <Text style={styles.viewActivityButtonText}>View Full Activity Details</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Journal Guidelines */}
        <View style={styles.guidelinesCard}>
          <Text style={styles.guidelinesTitle}>📝 Journaling Guidelines</Text>
          <View style={styles.guidelinesList}>
            <Text style={styles.guidelineItem}>• Be honest about your spiritual experiences</Text>
            <Text style={styles.guidelineItem}>• Include both challenges and victories</Text>
            <Text style={styles.guidelineItem}>• Record specific prayers and requests</Text>
            <Text style={styles.guidelineItem}>• Note how God is speaking to you</Text>
            <Text style={styles.guidelineItem}>• Write about insights from scripture</Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  deleteButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(239, 68, 68, 0.8)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(16, 185, 129, 0.8)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  savingButton: {
    opacity: 0.6,
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  formCard: {
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
  formLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
    marginTop: 16,
  },
  titleInput: {
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#1F2937',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  moodSelector: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  moodOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    backgroundColor: '#F9FAFB',
    marginRight: 8,
  },
  selectedMood: {
    backgroundColor: '#F0F9FF',
  },
  moodEmoji: {
    fontSize: 16,
    marginRight: 6,
  },
  moodText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
  },
  selectedMoodText: {
    color: '#60A5FA',
  },
  contentInput: {
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#1F2937',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    minHeight: 200,
  },
  tagsSection: {
    marginBottom: 16,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F9FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 6,
    marginBottom: 4,
    borderWidth: 1,
    borderColor: '#BAE6FD',
  },
  tagText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#60A5FA',
    marginRight: 4,
  },
  removeTagText: {
    fontSize: 14,
    color: '#9CA3AF',
    fontWeight: 'bold',
  },
  addTagContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tagInput: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    borderRadius: 6,
    padding: 8,
    fontSize: 14,
    color: '#1F2937',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginRight: 8,
  },
  addTagButton: {
    backgroundColor: '#F0F9FF',
    padding: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#BAE6FD',
  },
  promptsCard: {
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
  promptsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  promptsDescription: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 16,
    fontStyle: 'italic',
  },
  promptItem: {
    backgroundColor: '#F8FAFC',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#60A5FA',
  },
  promptText: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },
  contextCard: {
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
  contextTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
  },
  contextDescription: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
    marginBottom: 16,
  },
  viewActivityButton: {
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
  viewActivityButtonText: {
    color: '#60A5FA',
    fontWeight: '600',
    marginLeft: 8,
  },
  guidelinesCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  guidelinesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
  },
  guidelinesList: {
    marginTop: 8,
  },
  guidelineItem: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
    marginBottom: 8,
  },
});