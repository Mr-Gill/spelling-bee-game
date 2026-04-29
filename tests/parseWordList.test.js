const assert = require('assert');
const fs = require('fs');
const { test } = require('node:test');
const path = require('path');
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

test('preserves explicit CSV difficulty metadata', () => {
  const csv = 'word,definition,difficulty\ncat,A short starter word,easy\nevaporation,A longer science word,tricky\n';
  const words = parseWordList(csv);

  assert.equal(words[0].difficulty, 'easy');
  assert.equal(words[1].difficulty, 'hard');
});

test('parses instruction comments before a CSV header', () => {
  const csv = '# Instruction line\n# Another instruction line\n"word","syllables","definition","origin","example","prefix","suffix","pronunciation"\n"tram","[\\"tram\\"]","A city rail vehicle that glides through streets and startles late pedestrians.","Scots","The tram hummed past while a bee inspected every ticket machine suspiciously.","","","TRAM"\n';
  const words = parseWordList(csv);

  assert.equal(words.length, 1);
  assert.equal(words[0].word, 'tram');
});

test('all downloadable templates are uploadable', () => {
  for (const filename of ['template.csv', 'template.tsv', 'template.txt', 'template.json']) {
    const content = fs.readFileSync(path.join(__dirname, '..', 'wordlists', filename), 'utf8');
    const words = parseWordList(content);

    assert.equal(words.length, 10, `${filename} should contain ten example words`);
    assert.equal(words[0].word, 'rain', `${filename} should parse the first example word`);
    assert.deepEqual(words[0].syllables, ['rain'], `${filename} should parse syllables`);
  }
});
