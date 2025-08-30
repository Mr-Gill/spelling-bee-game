import { Word } from './types';
import { useState } from 'react';
import { getDailyChallenge } from './utils/challenges';
import GameScreen from './GameScreen'; // Assuming GameScreen is a separate component

const DATE_KEY = 'dailyChallengeDates';
const HIGH_KEY = 'dailyChallengeHighest';

// Build filename based on today's date (YYYY-MM-DD.json)
export const fetchDailyWordList = async (): Promise<Word[]> => {
  const today = new Date().toISOString().split('T')[0];
  const response = await fetch(`wordlists/${today}.json`);
  if (!response.ok) throw new Error('Daily word list not found');
  return response.json();
};

// Compute current streak based on consecutive dates including today
const computeCurrentStreak = (dates: string[]): number => {
  const set = new Set(dates);
  let streak = 0;
  const date = new Date();
  while (true) {
    const key = date.toISOString().split('T')[0];
    if (!set.has(key)) break;
    streak++;
    date.setDate(date.getDate() - 1);
  }
  return streak;
};

// Compute the highest streak from the stored dates
const computeHighestStreak = (dates: string[]): number => {
  const sorted = Array.from(new Set(dates)).sort();
  let max = 0;
  let cur = 0;
  let prev: string | null = null;
  for (const d of sorted) {
    if (!prev) {
      cur = 1;
    } else {
      const diff =
        (new Date(d).getTime() - new Date(prev).getTime()) / (1000 * 60 * 60 * 24);
      cur = diff === 1 ? cur + 1 : 1;
    }
    if (cur > max) max = cur;
    prev = d;
  }
  return max;
};

export interface StreakInfo {
  currentStreak: number;
  highestStreak: number;
}

// Retrieve current and highest streak information
export const getStreakInfo = (): StreakInfo => {
  const dates: string[] = JSON.parse(localStorage.getItem(DATE_KEY) || '[]');
  return {
    currentStreak: computeCurrentStreak(dates),
    highestStreak: computeHighestStreak(dates),
  };
};

// Record completion for today and update streak stats
export const recordDailyCompletion = (): StreakInfo => {
  const today = new Date().toISOString().split('T')[0];
  const dates: string[] = JSON.parse(localStorage.getItem(DATE_KEY) || '[]');
  if (!dates.includes(today)) {
    dates.push(today);
    localStorage.setItem(DATE_KEY, JSON.stringify(dates));
  }
  const info = getStreakInfo();
  localStorage.setItem(HIGH_KEY, String(info.highestStreak));
  return info;
};

const DailyChallenge = () => {
  const [todayChallenge, setTodayChallenge] = useState(getDailyChallenge());
  
  return (
    <GameScreen 
      mode="daily"
      words={todayChallenge.words}
      onComplete={(stats) => saveDailyChallengeResults(stats)}
    />
  );
};

export default DailyChallenge;
