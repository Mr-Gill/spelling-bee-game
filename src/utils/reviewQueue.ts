import type { Word } from '../types';

const STORAGE_KEY = 'reviewQueue';
const DAY = 24 * 60 * 60 * 1000;

export interface ReviewQueueItem {
  word: Word;
  nextReview: number;
  interval: number;
  successCount: number;
  lastMissedAt: number;
}

const normaliseWordKey = (word: Word | string) =>
  (typeof word === 'string' ? word : word.word).trim().toLowerCase();

const loadQueue = (): ReviewQueueItem[] => {
  if (typeof window === 'undefined') return [];
  try {
    const parsed = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]');
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const saveQueue = (queue: ReviewQueueItem[]) => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(queue));
};

export const addReviewWord = (word: Word) => {
  const key = normaliseWordKey(word);
  if (!key) return;

  const queue = loadQueue();
  const now = Date.now();
  const existing = queue.find(item => normaliseWordKey(item.word) === key);

  if (existing) {
    existing.word = word;
    existing.nextReview = now;
    existing.interval = DAY;
    existing.successCount = 0;
    existing.lastMissedAt = now;
  } else {
    queue.push({ word, nextReview: now, interval: DAY, successCount: 0, lastMissedAt: now });
  }

  saveQueue(queue);
};

export const getDueReviewWords = (): Word[] => {
  const now = Date.now();
  return loadQueue()
    .filter(item => item.nextReview <= now)
    .sort((a, b) => a.lastMissedAt - b.lastMissedAt)
    .map(item => item.word);
};

export const rescheduleReviewWord = (word: Word | string, wasCorrect: boolean) => {
  const key = normaliseWordKey(word);
  const queue = loadQueue();
  const index = queue.findIndex(item => normaliseWordKey(item.word) === key);
  if (index === -1) return;

  const item = queue[index];
  const now = Date.now();

  if (wasCorrect) {
    item.successCount += 1;
    if (item.successCount >= 3) {
      queue.splice(index, 1);
    } else {
      item.interval *= 2;
      item.nextReview = now + item.interval;
    }
  } else {
    item.successCount = 0;
    item.interval = DAY;
    item.nextReview = now;
    item.lastMissedAt = now;
  }

  saveQueue(queue);
};

export const dueReviewCount = () => getDueReviewWords().length;
