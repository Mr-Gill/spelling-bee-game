import React from 'react';

export const ENCOURAGEMENT_STORAGE_KEY = 'encouragementPhrases';

export const DEFAULT_ENCOURAGEMENT_PHRASES = [
  '{name} looked at that word like it owed them money.',
  '{name} didn\'t even hesitate. That\'s the worrying part.',
  '{name} and the alphabet briefly understood each other.',
  '{name} handled that word with unnecessary confidence.',
  '{name} made the spelling look planned.',
  '{name} approached that spelling with suspicious calm.',
  'That word didn\'t stand a chance once {name} showed up.',
  '{name} made eye contact with the alphabet and won.',
  '{name} handled that word like they had been expecting it personally.',
  'Correct. {name} did not flinch once during that whole word.',
  '{name} spelled that without the word putting up a fight.',
  '{name} recognised that word on sight. The word had no time to object.',
  'Sharp work, {name}. Even the word looked slightly taken aback.',
  '{name} walked up to that word and sorted it out.',
  '{name} approached that word with the calm of someone who had already won.',
  'Well spelled. {name} didn\'t make a production of it.',
  'The word showed up. {name} was ready. That\'s the whole story.',
  '{name} has demonstrated an above-average arrangement of letters.',
  '{name} showed up, spelled a word, made it look easy.',
  '{name} and that word had a conversation, and {name} won it.',
  '{name} spotted exactly where the letters needed to go.',
  '{name} made a series of specific letter choices. They were all correct.',
  'That word thought it was difficult. {name} disagreed.',
  '{name} did not guess. {name} knew.',
  '{name} handled that word like it was a minor inconvenience.',
  'The word tried to make things complicated. {name} was not interested.',
  '{name} committed to that spelling with concerning certainty. Correctly.',
  'Well done, {name}. The word came in and left without causing trouble.',
  '{name} looked at the letters and put them somewhere correct.',
  '{name} saw that word coming from a long way off.',
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
    className="fixed left-1/2 top-[34%] z-50 -translate-x-1/2 rounded-2xl bg-white px-6 py-3 text-center text-xl font-black text-purple-800 shadow-2xl ring-4 ring-kahoot-yellow-300 animate-bounce-in"
    role="status"
    aria-live="polite"
  >
    {message}
  </div>
);

export default EncouragementBanner;
