# Spelling Bee Playability Fix Plan

Date: 2026-04-29

## Playtest Summary

The app builds and the existing browser suite passes, but the classroom flow is not yet reliable enough for levelled student use.

## Implemented In This Pass

- Individual-mode misses now move to the next student's own next word instead of reusing the missed word as a steal attempt.
- Incorrect-attempt stats no longer get overwritten by stale participant state.
- Student difficulty is clamped to Easy, Medium, or Tricky.
- Score cards now show each participant's current level.
- Named solo students save and restore their last difficulty level locally.
- Custom word lists now respect explicit `difficulty` metadata before falling back to word length.
- Regression coverage now checks solo missed-word progression and saved-level restoration.

Verified:

- `npm run build` passes.
- `npm run test:unit` passes: 16 tests.
- `CI=1 npm run test:e2e:chromium` passes: 14 Playwright tests, after allowing Chromium outside the sandbox.
- Manual browser playtest confirms setup, solo mode, roster entry, game start, word reveal, keyboard submission, scoring, turn rotation, and missed-word handling all run without console errors.

Main issue:

- Individual-mode student tracking exists, but the turn logic can give the next student the same word after a miss. This makes the experience feel like a team steal round rather than personal levelled practice.

## Priority 1 - Make Individual Mode Fair And Levelled

Files:

- `[MODIFY] src/GameScreen.tsx`
- `[MODIFY] tests/GameScreen.playwright.test.js` or `[NEW] tests/studentProgression.playwright.test.js`

Changes:

1. Split incorrect-answer handling by mode.
2. In team mode, keep the current steal mechanic.
3. In individual mode, after a miss:
   - update only the current student's lives, streak, stats, and difficulty level
   - add the missed word to review
   - move to the next student
   - select a new word using the next student's own `difficultyLevel`
4. Ensure `showWord`, hints, phonics, extra attempt, and typed letters reset on every turn transition.
5. Add a browser test proving that when Student B misses, Student A does not receive Student B's same word unless it later appears through the review queue.

## Priority 2 - Make Student Level Visible And Stable

Files:

- `[MODIFY] src/components/ScoreCard.tsx`
- `[MODIFY] src/components/ParticipantStats.tsx`
- `[MODIFY] src/GameScreen.tsx`

Changes:

1. Show each student's current level as `Easy`, `Medium`, or `Tricky` on their score card.
2. Clamp `difficultyLevel` to valid levels: `0`, `1`, `2`.
3. Treat review as a separate queue, not as a normal progression level shown to students.
4. Consider slowing automatic promotion:
   - promote after 2 consecutive correct words
   - demote after 2 misses at the current level
   - keep one-off mistakes from immediately dropping a student

## Priority 3 - Persist Useful Student Progress

Files:

- `[MODIFY] src/utils/gameStateManager.ts`
- `[MODIFY] src/spelling-bee-game.tsx`
- `[MODIFY] src/GameScreen.tsx`
- `[NEW] src/utils/studentProgress.ts`

Changes:

1. Add a small student progress model keyed by stable student ID or normalised name.
2. Track:
   - current level
   - recent accuracy by level
   - correct streak
   - missed words
   - last played date
3. Load stored progress when a roster is added.
4. Save progress at the end of each turn and at game end.
5. Fix resume support so `currentParticipants`, `currentParticipantIndex`, current word, missed words, and level state are actually restored.

## Priority 4 - Improve Word List Level Quality

Files:

- `[MODIFY] src/spelling-bee-game.tsx`
- `[MODIFY] src/SetupScreen.tsx`
- `[MODIFY] src/utils/parseWordList.ts`

Changes:

1. Preserve explicit `difficulty` from imported CSV/JSON word lists.
2. Only fall back to word length when a word has no explicit difficulty.
3. Make the setup screen show counts for Easy, Medium, and Tricky before starting.
4. Warn if a selected/custom list has no words for a level.
5. Decide whether custom words should replace or append to the default list. For classroom control, replacing is probably safer, with an explicit "include default words" checkbox.

## Priority 5 - Tighten Tests Around The Real Classroom Flow

Files:

- `[NEW] tests/studentProgression.playwright.test.js`
- `[MODIFY] tests/features.playwright.test.js`
- `[MODIFY] tests/GameScreen.playwright.test.js`

Test cases:

1. Solo mode starts with two named students.
2. Correct answer increases only that student's level/progress.
3. Incorrect answer decreases or stabilises only that student's level/progress.
4. Next student receives a word selected from their own level.
5. Revealed words do not leak into the next student's turn.
6. Resume restores the same student, current word, and participant progress.
7. Imported word lists honour explicit difficulty metadata.

## Suggested Implementation Order

1. Fix the individual-mode miss/next-word bug.
2. Add the browser regression test for that bug.
3. Add visible level labels and clamp level values.
4. Preserve imported word difficulty and show level counts in setup.
5. Add persistent student progress once the per-session behaviour is solid.
