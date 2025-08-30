const assert = require('assert');
const { test } = require('node:test');
const { parseWordList } = require('../src/utils/parseWordList');

test('throws for JSON missing required fields', () => {
  const badJson = JSON.stringify([{ word: 'apple' }]);
  assert.throws(() => parseWordList(badJson), /missing required field/i);
});

test('throws for CSV missing required fields', () => {
  const csv = 'word,definition\napple,';
  assert.throws(() => parseWordList(csv), /missing required field/i);
});

test('throws for TSV missing required fields', () => {
  const tsv = 'word\tdefinition\napple\t';
  assert.throws(() => parseWordList(tsv), /missing required field/i);
});
