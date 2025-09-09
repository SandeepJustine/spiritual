import AsyncStorage from '@react-native-async-storage/async-storage';
import { JournalEntry } from '@/data/journalData';

const JOURNAL_STORAGE_KEY = 'spiritual_journal_entries';

export const saveJournalEntry = async (entry: JournalEntry): Promise<void> => {
  try {
    const existingEntries = await getJournalEntries();
    const updatedEntries = existingEntries.filter(e => e.id !== entry.id);
    updatedEntries.push(entry);
    
    await AsyncStorage.setItem(JOURNAL_STORAGE_KEY, JSON.stringify(updatedEntries));
  } catch (error) {
    console.error('Error saving journal entry:', error);
    throw error;
  }
};

export const getJournalEntries = async (): Promise<JournalEntry[]> => {
  try {
    const entriesJson = await AsyncStorage.getItem(JOURNAL_STORAGE_KEY);
    if (!entriesJson) return [];
    
    const entries = JSON.parse(entriesJson);
    return entries.map((entry: any) => ({
      ...entry,
      createdAt: new Date(entry.createdAt),
      updatedAt: new Date(entry.updatedAt)
    }));
  } catch (error) {
    console.error('Error loading journal entries:', error);
    return [];
  }
};

export const getJournalEntryByDay = async (day: number): Promise<JournalEntry | null> => {
  try {
    const entries = await getJournalEntries();
    return entries.find(entry => entry.day === day) || null;
  } catch (error) {
    console.error('Error loading journal entry:', error);
    return null;
  }
};

export const deleteJournalEntry = async (entryId: string): Promise<void> => {
  try {
    const existingEntries = await getJournalEntries();
    const updatedEntries = existingEntries.filter(e => e.id !== entryId);
    
    await AsyncStorage.setItem(JOURNAL_STORAGE_KEY, JSON.stringify(updatedEntries));
  } catch (error) {
    console.error('Error deleting journal entry:', error);
    throw error;
  }
};

export const searchJournalEntries = async (query: string): Promise<JournalEntry[]> => {
  try {
    const entries = await getJournalEntries();
    const lowercaseQuery = query.toLowerCase();
    
    return entries.filter(entry => 
      entry.title.toLowerCase().includes(lowercaseQuery) ||
      entry.content.toLowerCase().includes(lowercaseQuery) ||
      entry.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    );
  } catch (error) {
    console.error('Error searching journal entries:', error);
    return [];
  }
};