export interface SessionHistoryEntry {
  date: string;
  score: number;
  duration: number;
}

const STORAGE_KEY = 'sessionHistory';

export function loadHistory(): SessionHistoryEntry[] {
  try {
    return JSON.parse(globalThis.localStorage?.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

export function appendHistoryEntry(entry: { score: number; duration: number; date?: string }): void {
  const history = loadHistory();
  history.push({
    date: entry.date ?? new Date().toISOString(),
    score: entry.score,
    duration: entry.duration
  });
  globalThis.localStorage?.setItem(STORAGE_KEY, JSON.stringify(history));
}

export function clearHistory(): void {
  globalThis.localStorage?.removeItem(STORAGE_KEY);
}
