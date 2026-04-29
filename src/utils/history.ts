export interface SessionHistoryEntry {
  date: string;
  score: number;
  duration: number;
  comfort?: 'happy' | 'okay' | 'tough';
}

const STORAGE_KEY = 'sessionHistory';

export function loadHistory(): SessionHistoryEntry[] {
  try {
    return JSON.parse(globalThis.localStorage?.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

export function appendHistoryEntry(entry: { score: number; duration: number; date?: string; comfort?: SessionHistoryEntry['comfort'] }): string {
  const history = loadHistory();
  const date = entry.date ?? new Date().toISOString();
  history.push({
    date,
    score: entry.score,
    duration: entry.duration,
    comfort: entry.comfort
  });
  globalThis.localStorage?.setItem(STORAGE_KEY, JSON.stringify(history));
  return date;
}

export function updateHistoryComfort(date: string, comfort: SessionHistoryEntry['comfort']): void {
  const history = loadHistory();
  const updated = history.map(entry => entry.date === date ? { ...entry, comfort } : entry);
  globalThis.localStorage?.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export function clearHistory(): void {
  globalThis.localStorage?.removeItem(STORAGE_KEY);
}
