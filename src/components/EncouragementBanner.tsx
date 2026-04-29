import React from 'react';

export const ENCOURAGEMENT_STORAGE_KEY = 'encouragementPhrases';

export const DEFAULT_ENCOURAGEMENT_PHRASES = [
  '{name} recognised that word on sight. The word didn\'t stand a chance.',
  '{name} did not guess. {name} knew.',
  '{name} put every letter exactly where it was supposed to go.',
  '{name} handled that. Now everyone can move on.',
  'Beautifully done. {name} has handled that word with care.',
  'Sharp work, {name}. The alphabet approves.',
  'Correct. That word was watching, and {name} did not flinch.',
  'Correct. One more word filed in the correct drawer.',
  'Well spelled. The word has sat down quietly.',
  'Correct. {name} has briefly organised the alphabet.',
  '{name} has sorted that word out efficiently and without drama.',
  'The word was not expecting that level of confidence from {name}.',
  '{name} walked up to that word and did not apologise.',
  '{name} has completed the spelling. The bee is impressed, professionally.',
  'Good spelling. {name} has briefly organised the chaos.',
  '{name} spelled that with the calm of someone who has spelled many things.',
  '{name} approached that word with quiet confidence and reasonable footwear.',
  'Correct. {name} has been professional about this whole situation.',
  '{name} collected that word and placed it gently in the correct position.',
  '{name} did not blink once during that word. This is admirable.',
  '{name} handled that word like it was a minor administrative task. It was.',
  'The word made itself very clear, and {name} was listening.',
  '{name} has demonstrated an above-average arrangement of letters.',
  'That word has been processed. {name} was the one who did it.',
  'Correct. {name} showed up, spelled a word, and that is all anyone can ask.',
  '{name} made very specific choices about letters, and they were correct.',
  'The word arrived, {name} addressed it, the word left. A complete interaction.',
  '{name} has given the letters a place to be. They appear grateful.',
  'Correct. {name} did that completely and now it is done.',
  'The spelling was correct. {name} was involved. These facts are related.',
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
