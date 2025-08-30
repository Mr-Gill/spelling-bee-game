const STORAGE_KEY = 'reviewQueue';
const DAY = 24 * 60 * 60 * 1000;

interface ReviewItem {
  word: string;
  nextReview: number;
  interval: number;
  successCount: number;
}

function loadQueue(): ReviewItem[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

function saveQueue(queue: ReviewItem[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(queue));
}

export function addReviewWord(word: string) {
  if (!word) return;
  const queue = loadQueue();
  const existing = queue.find(q => q.word === word);
  const now = Date.now();
  if (existing) {
    existing.nextReview = now + DAY;
    existing.interval = DAY;
    existing.successCount = 0;
  } else {
    queue.push({ word, nextReview: now + DAY, interval: DAY, successCount: 0 });
  }
  saveQueue(queue);
}

export function getDueReviewWords(): ReviewItem[] {
  const now = Date.now();
  return loadQueue().filter(item => item.nextReview <= now);
}

export function rescheduleReviewWord(word: string, wasCorrect: boolean) {
  const queue = loadQueue();
  const index = queue.findIndex(q => q.word === word);
  if (index === -1) return;
  const item = queue[index];
  const now = Date.now();
  if (wasCorrect) {
    item.successCount += 1;
    item.interval = item.interval * 2;
    item.nextReview = now + item.interval;
    if (item.successCount >= 3) {
      queue.splice(index, 1);
    }
  } else {
    item.successCount = 0;
    item.interval = DAY;
    item.nextReview = now + DAY;
  }
  saveQueue(queue);
}

export function dueReviewCount(): number {
  return getDueReviewWords().length;
}
