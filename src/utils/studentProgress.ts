import type { Participant } from '../types';

const STORAGE_KEY = 'spellingBeeStudentProgress';
const MIN_DIFFICULTY_LEVEL = 0;
const MAX_DIFFICULTY_LEVEL = 2;

export interface StudentProgressRecord {
  difficultyLevel: number;
  wordsAttempted: number;
  wordsCorrect: number;
  lastPlayedAt: string;
}

type StudentProgressMap = Record<string, StudentProgressRecord>;

const clampDifficultyLevel = (level: number) => {
  if (!Number.isFinite(level)) return MIN_DIFFICULTY_LEVEL;
  return Math.max(MIN_DIFFICULTY_LEVEL, Math.min(MAX_DIFFICULTY_LEVEL, level));
};

export const normaliseStudentKey = (name: string) => name.trim().toLowerCase();

export const loadStudentProgress = (): StudentProgressMap => {
  if (typeof window === 'undefined') return {};
  try {
    const parsed = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '{}');
    return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : {};
  } catch {
    return {};
  }
};

export const getStudentDifficultyLevel = (name: string, fallbackLevel: number) => {
  const key = normaliseStudentKey(name);
  if (!key) return clampDifficultyLevel(fallbackLevel);

  const record = loadStudentProgress()[key];
  return clampDifficultyLevel(record?.difficultyLevel ?? fallbackLevel);
};

export const saveStudentProgress = (participant: Participant) => {
  if (typeof window === 'undefined') return;

  const key = normaliseStudentKey(participant.name);
  if (!key) return;

  const progress = loadStudentProgress();
  progress[key] = {
    difficultyLevel: clampDifficultyLevel(participant.difficultyLevel),
    wordsAttempted: participant.wordsAttempted,
    wordsCorrect: participant.wordsCorrect,
    lastPlayedAt: new Date().toISOString(),
  };

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
};

