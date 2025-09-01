import { test } from 'node:test';
import assert from 'assert';
import { handleSpellingSubmit } from '../src/GameScreen';

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
