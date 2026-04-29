import React from 'react';

export const ENCOURAGEMENT_STORAGE_KEY = 'encouragementPhrases';

export const DEFAULT_ENCOURAGEMENT_PHRASES = [
  'Great spelling, {name}!',
  'That one landed beautifully.',
  'Sharp work. Keep going.',
  'Nice focus, {name}.',
  'You earned that one.',
];

export const normaliseEncouragementPhrases = (value: string): string[] =>
  value
    .split('\n')
    .map(phrase => phrase.trim())
    .filter(Boolean);

export const loadEncouragementPhrases = (): string[] => {
  if (typeof window === 'undefined') return DEFAULT_ENCOURAGEMENT_PHRASES;

  try {
    const stored = window.localStorage.getItem(ENCOURAGEMENT_STORAGE_KEY);
    if (!stored) return DEFAULT_ENCOURAGEMENT_PHRASES;
    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed)) return DEFAULT_ENCOURAGEMENT_PHRASES;
    const phrases = parsed.filter((phrase): phrase is string => typeof phrase === 'string' && phrase.trim().length > 0);
    return phrases.length > 0 ? phrases : DEFAULT_ENCOURAGEMENT_PHRASES;
  } catch {
    return DEFAULT_ENCOURAGEMENT_PHRASES;
  }
};

export const saveEncouragementPhrases = (phrases: string[]) => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(ENCOURAGEMENT_STORAGE_KEY, JSON.stringify(phrases));
};

export const pickEncouragementPhrase = (phrases: string[], participantName?: string): string => {
  const fallbackPhrases = phrases.length > 0 ? phrases : DEFAULT_ENCOURAGEMENT_PHRASES;
  const phrase = fallbackPhrases[Math.floor(Math.random() * fallbackPhrases.length)];
  return phrase.replaceAll('{name}', participantName || 'speller');
};

interface EncouragementBannerProps {
  message: string;
}

const EncouragementBanner: React.FC<EncouragementBannerProps> = ({ message }) => (
  <div
    className="fixed left-1/2 top-[34%] z-50 -translate-x-1/2 rounded-2xl bg-white px-6 py-3 text-center text-xl font-black text-kahoot-purple-700 shadow-2xl ring-4 ring-kahoot-yellow-300 animate-bounce-in"
    role="status"
    aria-live="polite"
  >
    {message}
  </div>
);

export default EncouragementBanner;
