import { words } from '../../public/wordlists/words.json';

type Challenge = {
  date: string;
  words: string[];
};

type ChallengeStats = {
  score: number;
  time: number;
  accuracy: number;
};

export function getDailyChallenge(): Challenge {
  const today = new Date().toISOString().split('T')[0];
  
  // Simple deterministic algorithm for daily challenge
  const dailyWords = [];
  const seed = parseInt(today.replace(/-/g, ''));
  
  for (let i = 0; i < 10; i++) {
    const index = (seed * (i + 1)) % words.length;
    dailyWords.push(words[index]);
  }
  
  return {
    date: today,
    words: dailyWords
  };
}

export function saveDailyChallengeResults(stats: ChallengeStats) {
  // Save to localStorage or API
  localStorage.setItem(`challenge-${new Date().toISOString().split('T')[0]}`, JSON.stringify(stats));
}
