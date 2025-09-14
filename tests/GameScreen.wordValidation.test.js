import { test } from 'node:test';
import assert from 'assert';
import { handleSpellingSubmit, validateWordSubmission, calculateWordPoints } from '../src/utils/gameLogic';

test('correct word submission', () => {
  const letters = ['a', 'p', 'p', 'l', 'e'];
  const currentWord = 'apple';
  const result = handleSpellingSubmit(letters, currentWord);
  assert.strictEqual(result.isCorrect, true);
});

test('incorrect word submission', () => {
  const letters = ['a', 'p', 'p', 'l'];
  const currentWord = 'apple';
  const result = handleSpellingSubmit(letters, currentWord);
  assert.strictEqual(result.isCorrect, false);
});

test('empty submission', () => {
  const letters = [];
  const currentWord = 'apple';
  const result = handleSpellingSubmit(letters, currentWord);
  assert.strictEqual(result.isCorrect, false);
});

test('word submission validation', () => {
  assert.strictEqual(validateWordSubmission(['a', 'b', 'c']), true);
  assert.strictEqual(validateWordSubmission([]), false);
  assert.strictEqual(validateWordSubmission(['', '', '']), false);
});

test('word points calculation', () => {
  assert.strictEqual(calculateWordPoints('easy', 0), 5);
  assert.strictEqual(calculateWordPoints('medium', 0), 10);
  assert.strictEqual(calculateWordPoints('tricky', 0), 15);
  assert.strictEqual(calculateWordPoints('easy', 2), 9); // 5 + (2 * 2)
});
