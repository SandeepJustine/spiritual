export interface JournalEntry {
  id: string;
  day: number;
  date: string;
  title: string;
  content: string;
  mood: 'peaceful' | 'grateful' | 'challenged' | 'joyful' | 'reflective';
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface JournalPrompt {
  day: number;
  prompts: string[];
}

export const journalPrompts: JournalPrompt[] = [
  {
    day: 1,
    prompts: [
      "What spiritual goals am I setting for this month?",
      "How do I want to grow closer to God?",
      "What areas of my life need God's guidance?"
    ]
  },
  {
    day: 2,
    prompts: [
      "What does choosing the path of righteousness mean to me?",
      "How can I apply Psalm 1 to my daily life?",
      "What 'streams of water' is God providing in my life?"
    ]
  },
  {
    day: 3,
    prompts: [
      "What aspects of creation am I most grateful for?",
      "How did my prayer walk connect me with God?",
      "What did I notice about God's presence in nature?"
    ]
  },
  {
    day: 4,
    prompts: [
      "What distractions am I choosing to fast from?",
      "How does John 15:1-11 speak to my relationship with Christ?",
      "What fruit is God wanting to produce in my life?"
    ]
  },
  {
    day: 5,
    prompts: [
      "What areas of my life need better alignment with God's will?",
      "How is God calling me to change or grow?",
      "What patterns in my life honor or dishonor God?"
    ]
  },
  {
    day: 6,
    prompts: [
      "How did serving others in secret feel?",
      "What did I learn about God's heart through acts of kindness?",
      "How can I make serving others a regular practice?"
    ]
  },
  {
    day: 7,
    prompts: [
      "How did worship today impact my heart?",
      "What did I learn about God's character through worship?",
      "How can I carry this worship spirit into the new week?"
    ]
  },
  {
    day: 8,
    prompts: [
      "What specific prayers did I lift up for my loved ones?",
      "How is God working in the lives of those I prayed for?",
      "What burdens am I carrying for others that I can give to God?"
    ]
  },
  {
    day: 9,
    prompts: [
      "What am I most thankful for today?",
      "How does thanksgiving change my perspective on challenges?",
      "What peace is God offering me according to Philippians 4?"
    ]
  },
  {
    day: 10,
    prompts: [
      "How did fasting help me focus on prayer?",
      "What concerns for my community did I bring before God?",
      "How is God calling me to be part of the solution in my community?"
    ]
  },
  {
    day: 11,
    prompts: [
      "What answered prayers from my past am I celebrating?",
      "How has God shown His faithfulness in my life?",
      "What current prayers am I trusting God with?"
    ]
  },
  {
    day: 12,
    prompts: [
      "What did I experience during my night prayer time?",
      "How does extended prayer change my perspective?",
      "What is God speaking to my heart in the quiet moments?"
    ]
  },
  {
    day: 13,
    prompts: [
      "Who did I encourage today and how?",
      "How did encouraging others impact my own spirit?",
      "What words of hope is God giving me to share?"
    ]
  },
  {
    day: 14,
    prompts: [
      "How did worship and gratitude fill my heart today?",
      "What songs or expressions of worship moved me most?",
      "How can I maintain a heart of worship daily?"
    ]
  },
  {
    day: 15,
    prompts: [
      "What does it mean to trust God with all my heart?",
      "How is God asking me to lean not on my own understanding?",
      "What paths is God making straight in my life?"
    ]
  },
  {
    day: 16,
    prompts: [
      "How is the verse I memorized speaking to my current situation?",
      "What comfort or strength am I drawing from God's word?",
      "How can I hide God's word deeper in my heart?"
    ]
  },
  {
    day: 17,
    prompts: [
      "What did I learn from studying this Bible character?",
      "How does their story relate to my own journey?",
      "What qualities do I want to emulate in my own life?"
    ]
  },
  {
    day: 18,
    prompts: [
      "What did I hear in the silence today?",
      "How is God speaking to me beyond words?",
      "What is God revealing about His heart for me?"
    ]
  },
  {
    day: 19,
    prompts: [
      "How did sharing scripture impact both me and the other person?",
      "What verses is God highlighting for me to share?",
      "How can I be more intentional about sharing God's word?"
    ]
  },
  {
    day: 20,
    prompts: [
      "What has God been teaching me this month?",
      "How have I grown spiritually since Day 1?",
      "What lessons do I want to remember and apply going forward?"
    ]
  },
  {
    day: 21,
    prompts: [
      "How did fellowship strengthen my faith today?",
      "What did I learn from others in our study/gathering?",
      "How can I be more committed to Christian community?"
    ]
  },
  {
    day: 22,
    prompts: [
      "How did serving others today impact my heart?",
      "What did I learn about God's heart for the needy?",
      "How can I make serving others a regular part of my life?"
    ]
  },
  {
    day: 23,
    prompts: [
      "What does true fasting mean according to Isaiah 58?",
      "How is God calling me to pursue justice and mercy?",
      "What oppression or need around me can I help address?"
    ]
  },
  {
    day: 24,
    prompts: [
      "What global issues weigh on my heart today?",
      "How did interceding for the world change my perspective?",
      "What role is God calling me to play in His global purposes?"
    ]
  },
  {
    day: 25,
    prompts: [
      "What 30 things am I most grateful for?",
      "How has gratitude shifted my heart this month?",
      "What blessings have I taken for granted?"
    ]
  },
  {
    day: 26,
    prompts: [
      "How did forgiveness free my heart today?",
      "What is God teaching me about His forgiveness?",
      "What relationships need the healing power of forgiveness?"
    ]
  },
  {
    day: 27,
    prompts: [
      "How did reaching out for reconciliation feel?",
      "What barriers to relationship is God helping me overcome?",
      "How is God restoring relationships in my life?"
    ]
  },
  {
    day: 28,
    prompts: [
      "How did extended worship transform my heart today?",
      "What aspects of God's character did I encounter in worship?",
      "How can I maintain this heart of worship beyond today?"
    ]
  },
  {
    day: 29,
    prompts: [
      "How has God shaped me throughout this month?",
      "What testimony of God's faithfulness can I share?",
      "What changes do I see in my heart and life?"
    ]
  },
  {
    day: 30,
    prompts: [
      "How am I dedicating the next season to God?",
      "What commitments am I making for continued spiritual growth?",
      "How will I carry forward what I've learned this month?"
    ]
  }
];

export const moodEmojis = {
  peaceful: '🕊️',
  grateful: '🙏',
  challenged: '💪',
  joyful: '😊',
  reflective: '🤔'
};

export const moodColors = {
  peaceful: '#60A5FA',
  grateful: '#10B981',
  challenged: '#F59E0B',
  joyful: '#EC4899',
  reflective: '#8B5CF6'
};