export interface DayActivity {
  day: number;
  date: string;
  title: string;
  description: string;
  week: number;
  weekTheme: string;
  type: 'prayer' | 'reading' | 'fasting' | 'service' | 'worship' | 'reflection';
}

export const septemberCalendar: DayActivity[] = [
  // Week 1: Dedication & Purification (Sept 1–7)
  {
    day: 1,
    date: 'Sept 1',
    title: 'Commit & Set Goals',
    description: 'Commit the month to God in prayer & fasting. Write down your spiritual goals.',
    week: 1,
    weekTheme: 'Dedication & Purification',
    type: 'prayer'
  },
  {
    day: 2,
    date: 'Sept 2',
    title: 'Path of Righteousness',
    description: 'Read Psalm 1 and meditate on choosing the path of righteousness.',
    week: 1,
    weekTheme: 'Dedication & Purification',
    type: 'reading'
  },
  {
    day: 3,
    date: 'Sept 3',
    title: 'Gratitude Walk',
    description: 'Morning prayer walk — give thanks for creation.',
    week: 1,
    weekTheme: 'Dedication & Purification',
    type: 'prayer'
  },
  {
    day: 4,
    date: 'Sept 4',
    title: 'Digital Fast',
    description: 'Fast from social media/entertainment; spend time in scripture (John 15:1–11).',
    week: 1,
    weekTheme: 'Dedication & Purification',
    type: 'fasting'
  },
  {
    day: 5,
    date: 'Sept 5',
    title: 'Self-Examination',
    description: 'Journal on areas of your life needing alignment with God.',
    week: 1,
    weekTheme: 'Dedication & Purification',
    type: 'reflection'
  },
  {
    day: 6,
    date: 'Sept 6',
    title: 'Silent Kindness',
    description: 'Act of kindness — help someone silently.',
    week: 1,
    weekTheme: 'Dedication & Purification',
    type: 'service'
  },
  {
    day: 7,
    date: 'Sept 7',
    title: 'Worship Day',
    description: 'Attend/stream a worship service or do extended home worship.',
    week: 1,
    weekTheme: 'Dedication & Purification',
    type: 'worship'
  },

  // Week 2: Prayer & Intercession (Sept 8–14)
  {
    day: 8,
    date: 'Sept 8',
    title: 'Family Intercession',
    description: 'Pray for family & close friends.',
    week: 2,
    weekTheme: 'Prayer & Intercession',
    type: 'prayer'
  },
  {
    day: 9,
    date: 'Sept 9',
    title: 'Thanksgiving Prayer',
    description: 'Read Philippians 4:6–9 and practice thanksgiving prayer.',
    week: 2,
    weekTheme: 'Prayer & Intercession',
    type: 'reading'
  },
  {
    day: 10,
    date: 'Sept 10',
    title: 'Community Fast',
    description: 'Fast from one meal and pray for your community/nation.',
    week: 2,
    weekTheme: 'Prayer & Intercession',
    type: 'fasting'
  },
  {
    day: 11,
    date: 'Sept 11',
    title: 'Celebrate Faithfulness',
    description: 'Journal answered prayers from your past — celebrate God\'s faithfulness.',
    week: 2,
    weekTheme: 'Prayer & Intercession',
    type: 'reflection'
  },
  {
    day: 12,
    date: 'Sept 12',
    title: 'Night Vigil',
    description: 'Night prayer vigil (short, even 30 minutes before bed).',
    week: 2,
    weekTheme: 'Prayer & Intercession',
    type: 'prayer'
  },
  {
    day: 13,
    date: 'Sept 13',
    title: 'Encourage Others',
    description: 'Reach out to someone who needs encouragement.',
    week: 2,
    weekTheme: 'Prayer & Intercession',
    type: 'service'
  },
  {
    day: 14,
    date: 'Sept 14',
    title: 'Worship & Gratitude',
    description: 'Worship & gratitude day (sing, dance, or listen to worship music).',
    week: 2,
    weekTheme: 'Prayer & Intercession',
    type: 'worship'
  },

  // Week 3: Word & Wisdom (Sept 15–21)
  {
    day: 15,
    date: 'Sept 15',
    title: 'Trust Fully',
    description: 'Read Proverbs 3 — reflect on trusting God fully.',
    week: 3,
    weekTheme: 'Word & Wisdom',
    type: 'reading'
  },
  {
    day: 16,
    date: 'Sept 16',
    title: 'Scripture Memory',
    description: 'Memorize one verse (e.g., Romans 8:28).',
    week: 3,
    weekTheme: 'Word & Wisdom',
    type: 'reading'
  },
  {
    day: 17,
    date: 'Sept 17',
    title: 'Character Study',
    description: 'Study one Bible character (e.g., Joseph — Genesis 39).',
    week: 3,
    weekTheme: 'Word & Wisdom',
    type: 'reading'
  },
  {
    day: 18,
    date: 'Sept 18',
    title: 'Silent Listening',
    description: 'Practice silence for 30 mins — listen for God\'s voice.',
    week: 3,
    weekTheme: 'Word & Wisdom',
    type: 'prayer'
  },
  {
    day: 19,
    date: 'Sept 19',
    title: 'Share Scripture',
    description: 'Share a scripture with someone.',
    week: 3,
    weekTheme: 'Word & Wisdom',
    type: 'service'
  },
  {
    day: 20,
    date: 'Sept 20',
    title: 'Learning Journal',
    description: 'Journal what God has been teaching you so far.',
    week: 3,
    weekTheme: 'Word & Wisdom',
    type: 'reflection'
  },
  {
    day: 21,
    date: 'Sept 21',
    title: 'Fellowship',
    description: 'Attend a Bible study/fellowship or organize a small one.',
    week: 3,
    weekTheme: 'Word & Wisdom',
    type: 'service'
  },

  // Week 4: Service & Surrender (Sept 22–30)
  {
    day: 22,
    date: 'Sept 22',
    title: 'Serve the Needy',
    description: 'Volunteer or give to the needy.',
    week: 4,
    weekTheme: 'Service & Surrender',
    type: 'service'
  },
  {
    day: 23,
    date: 'Sept 23',
    title: 'True Fasting',
    description: 'Read Isaiah 58 (true fasting & justice).',
    week: 4,
    weekTheme: 'Service & Surrender',
    type: 'reading'
  },
  {
    day: 24,
    date: 'Sept 24',
    title: 'Global Intercession',
    description: 'Fast and intercede for global issues (peace, poverty, etc.).',
    week: 4,
    weekTheme: 'Service & Surrender',
    type: 'fasting'
  },
  {
    day: 25,
    date: 'Sept 25',
    title: 'Gratitude List',
    description: 'Write a gratitude list of 30 things.',
    week: 4,
    weekTheme: 'Service & Surrender',
    type: 'reflection'
  },
  {
    day: 26,
    date: 'Sept 26',
    title: 'Forgiveness',
    description: 'Forgive someone you\'ve struggled with.',
    week: 4,
    weekTheme: 'Service & Surrender',
    type: 'reflection'
  },
  {
    day: 27,
    date: 'Sept 27',
    title: 'Reconciliation',
    description: 'Reach out to reconcile a relationship.',
    week: 4,
    weekTheme: 'Service & Surrender',
    type: 'service'
  },
  {
    day: 28,
    date: 'Sept 28',
    title: 'Extended Prayer',
    description: 'Extended worship/prayer session.',
    week: 4,
    weekTheme: 'Service & Surrender',
    type: 'worship'
  },
  {
    day: 29,
    date: 'Sept 29',
    title: 'Monthly Testimony',
    description: 'Reflect on how God has shaped you this month — write a testimony.',
    week: 4,
    weekTheme: 'Service & Surrender',
    type: 'reflection'
  },
  {
    day: 30,
    date: 'Sept 30',
    title: 'Dedication Forward',
    description: 'Thanksgiving service — dedicate the next season to God.',
    week: 4,
    weekTheme: 'Service & Surrender',
    type: 'worship'
  }
];

export const weekThemes = [
  { week: 1, theme: 'Dedication & Purification', color: '#E0F2FE' },
  { week: 2, theme: 'Prayer & Intercession', color: '#DBEAFE' },
  { week: 3, theme: 'Word & Wisdom', color: '#F0F9FF' },
  { week: 4, theme: 'Service & Surrender', color: '#F8FAFC' }
];

export const activityTypes = {
  prayer: { icon: '🙏', color: '#60A5FA' },
  reading: { icon: '📖', color: '#3B82F6' },
  fasting: { icon: '🕊️', color: '#1D4ED8' },
  service: { icon: '❤️', color: '#2563EB' },
  worship: { icon: '🎵', color: '#1E40AF' },
  reflection: { icon: '✍️', color: '#1E3A8A' }
};