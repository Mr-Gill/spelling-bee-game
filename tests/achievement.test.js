process.env.TS_NODE_COMPILER_OPTIONS = '{"module":"commonjs"}';
process.env.TS_NODE_IGNORE_DIAGNOSTICS = '2664';
require('ts-node/register');
const { test } = require('node:test');
const assert = require('assert');
const { defaultAchievements } = require('../src/types.ts');

test('unlocks achievements when thresholds met', () => {
  const participant = { wordsCorrect: 55 };
  const unlocked = [];
  const newlyUnlocked = defaultAchievements.filter(
    ach => participant.wordsCorrect >= ach.threshold && !unlocked.includes(ach.id)
  );
  assert.deepStrictEqual(newlyUnlocked.map(a => a.id), ['ten-words', 'fifty-words']);
});

test('skips already unlocked achievements', () => {
  const participant = { wordsCorrect: 60 };
  const unlocked = ['ten-words'];
  const newlyUnlocked = defaultAchievements.filter(
    ach => participant.wordsCorrect >= ach.threshold && !unlocked.includes(ach.id)
  );
  assert.deepStrictEqual(newlyUnlocked.map(a => a.id), ['fifty-words']);
});
