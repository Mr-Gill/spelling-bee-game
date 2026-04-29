/**
 * Battle Progression System
 *
 * In team battle mode, hint powers are locked at the start and unlock one-by-one
 * as teams collectively get words correct. Each unlock comes with a tutorial
 * modal explaining what the power does.
 *
 * Powers with unlockAt: 0 are available immediately from the start of the game.
 * All others unlock when the combined correct-answer count reaches their threshold.
 */

export interface BattlePower {
  /** Unique identifier — must match the key used in HintPanel */
  id: string;
  /** Display name */
  name: string;
  /** Tutorial description shown in the unlock modal */
  description: string;
  /** Emoji icon */
  icon: string;
  /** Point cost to use the hint */
  cost: number;
  /** Combined correct answers needed before this power unlocks (0 = available from start) */
  unlockAt: number;
}

export const BATTLE_POWERS: BattlePower[] = [
  // ── Available from the start of the game (unlockAt: 0) ──────────────────
  {
    id: 'sentence',
    name: 'Sentence Hint',
    description:
      'See the word used in a real sentence. Context has arrived. It knows what the word means even if you do not yet.',
    icon: '📝',
    cost: 1,
    unlockAt: 0,
  },
  {
    id: 'syllables',
    name: 'Syllable Breakdown',
    description:
      'The word has been divided into smaller parts. Spell one chunk at a time. The bee recommends this approach.',
    icon: '🧩',
    cost: 1,
    unlockAt: 0,
  },
  {
    id: 'wordLength',
    name: 'Word Length Hint',
    description:
      'Find out how many letters are in the word. It is a small number or a large one. Either way, the bee has counted them already.',
    icon: '🔢',
    cost: 1,
    unlockAt: 0,
  },

  // ── Unlock at 2 combined correct ─────────────────────────────────────────
  {
    id: 'definition',
    name: 'Definition Hint',
    description:
      "See what the word means. The dictionary has been consulted. It was cooperative.",
    icon: '📖',
    cost: 1,
    unlockAt: 2,
  },

  // ── Unlock at 4 combined correct ─────────────────────────────────────────
  {
    id: 'extraTime',
    name: 'Extra Time',
    description:
      'Add 15 seconds to the timer. The clock has agreed to wait. It is doing this once.',
    icon: '⏱️',
    cost: 2,
    unlockAt: 4,
  },

  // ── Unlock at 6 combined correct ─────────────────────────────────────────
  {
    id: 'soundItOut',
    name: 'Sound It Out Hint',
    description:
      "The word has been broken into sounds and laid out for inspection. The sounds are being very cooperative.",
    icon: '🔊',
    cost: 2,
    unlockAt: 6,
  },

  // ── Unlock at 8 combined correct ─────────────────────────────────────────
  {
    id: 'affixes',
    name: 'Prefix / Suffix / Root Hint',
    description:
      'The word has been taken apart. Its prefix, root, and suffix are now available for viewing. The word has no objection.',
    icon: '🔠',
    cost: 2,
    unlockAt: 8,
  },

  // ── Unlock at 10 combined correct ────────────────────────────────────────
  {
    id: 'spellingPattern',
    name: 'Spelling Pattern Hint',
    description:
      "A clue about the word's spelling pattern — a silent letter, a double consonant, a special ending. The word has been persuaded to share one secret.",
    icon: '🧠',
    cost: 2,
    unlockAt: 10,
  },

  // ── Unlock at 12 combined correct ────────────────────────────────────────
  {
    id: 'origin',
    name: 'Origin Hint',
    description:
      "Find out where the word comes from. It has travelled a long way to get here and would like you to know that.",
    icon: '🌍',
    cost: 2,
    unlockAt: 12,
  },

  // ── Unlock at 14 combined correct ────────────────────────────────────────
  {
    id: 'multipleAttempts',
    name: 'Multiple Attempts',
    description:
      'Get one extra chance to spell the word. The bee has arranged for a second attempt. Do not waste it.',
    icon: '🎯',
    cost: 3,
    unlockAt: 14,
  },

  // ── Unlock at 16 combined correct ────────────────────────────────────────
  {
    id: 'vowels',
    name: 'Vowel Reveal',
    description:
      'All vowels are revealed. The consonants remain private. This is a compromise the word has agreed to.',
    icon: '🔤',
    cost: 3,
    unlockAt: 16,
  },

  // ── Unlock at 18 combined correct ────────────────────────────────────────
  {
    id: 'hangman',
    name: 'Hangman-Style Reveal',
    description:
      'One hidden letter is revealed. It may not be the one you wanted. The bee selected it fairly.',
    icon: '🕵️',
    cost: 3,
    unlockAt: 18,
  },

  // ── Unlock at 20 combined correct ────────────────────────────────────────
  {
    id: 'quickPeek',
    name: 'Quick Peek',
    description:
      'The full word appears for 1.5 seconds. Memorise it. It will leave. The bee will be watching to see if you managed it.',
    icon: '🔍',
    cost: 4,
    unlockAt: 20,
  },

  // ── Unlock at 22 combined correct ────────────────────────────────────────
  {
    id: 'friendSub',
    name: 'Friend Substitution',
    description:
      'Swap the current speller with a teammate. A fresh bee for a fresh word. The original speller is not offended.',
    icon: '👥',
    cost: 4,
    unlockAt: 22,
  },

  // ── Unlock at 24 combined correct ────────────────────────────────────────
  {
    id: 'skipWord',
    name: 'Skip Word',
    description:
      'Skip this word. No life lost. No points earned. The word has been filed under "next time" and will be reviewed later.',
    icon: '⏭️',
    cost: 5,
    unlockAt: 24,
  },
];

/**
 * Returns powers that should be newly unlocked when moving from
 * `previousCount` to `newCount` total correct answers.
 */
export function getNewlyUnlockedPowers(
  previousCount: number,
  newCount: number
): BattlePower[] {
  return BATTLE_POWERS.filter(
    p => p.unlockAt > previousCount && p.unlockAt <= newCount
  );
}

/**
 * Returns all power IDs that are unlocked for a given total correct count.
 * Powers with unlockAt: 0 are always included.
 */
export function getUnlockedPowerIds(totalCorrect: number): string[] {
  return BATTLE_POWERS.filter(p => p.unlockAt <= totalCorrect).map(p => p.id);
}

/**
 * Returns the next power that hasn't unlocked yet, or null if all are unlocked.
 */
export function getNextLockedPower(totalCorrect: number): BattlePower | null {
  return BATTLE_POWERS.find(p => p.unlockAt > totalCorrect) ?? null;
}
