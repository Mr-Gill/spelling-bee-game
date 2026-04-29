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

test('parses quoted CSV with JSON syllable arrays', () => {
  const csv = '"word","syllables","definition","origin","example","prefix","suffix","pronunciation"\n"harmony","[\\"har\\",\\"mo\\",\\"ny\\"]","A pleasing blend of sounds that makes chaos behave politely.","Greek via Latin","The classroom found harmony after one bee loudly inspected the xylophone.","","","HAR-muh-nee"\n';
  const words = parseWordList(csv);

  assert.equal(words.length, 1);
  assert.equal(words[0].word, 'harmony');
  assert.deepEqual(words[0].syllables, ['har', 'mo', 'ny']);
  assert.equal(words[0].definition, 'A pleasing blend of sounds that makes chaos behave politely.');
});
