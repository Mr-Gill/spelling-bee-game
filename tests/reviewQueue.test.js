const assert = require('assert');
const { test } = require('node:test');

process.env.TS_NODE_COMPILER_OPTIONS = JSON.stringify({ module: 'commonjs' });
require('ts-node/register/transpile-only');
const { addReviewWord, getDueReviewWords, rescheduleReviewWord } = require('../src/utils/reviewQueue');

function createMockStorage() {
  let store = {};
  return {
    getItem(key) {
      return Object.prototype.hasOwnProperty.call(store, key) ? store[key] : null;
    },
    setItem(key, value) {
      store[key] = String(value);
    },
    removeItem(key) {
      delete store[key];
    },
    clear() {
      store = {};
    }
  };
}

const sampleWord = {
  word: 'example',
  syllables: null,
  phonemes: null,
  definition: 'A sample word',
  origin: null,
  example: null,
  prefix: null,
  suffix: null,
  difficulty: 'easy',
};

test('addReviewWord stores a missed word as due immediately', () => {
  const localStorage = createMockStorage();
  global.window = { localStorage };
  global.localStorage = localStorage;

  addReviewWord(sampleWord);

  const dueWords = getDueReviewWords();
  assert.equal(dueWords.length, 1);
  assert.equal(dueWords[0].word, 'example');
  assert.equal(dueWords[0].definition, 'A sample word');
});

test('rescheduleReviewWord removes a word after repeated correct reviews', () => {
  const localStorage = createMockStorage();
  global.window = { localStorage };
  global.localStorage = localStorage;
  addReviewWord(sampleWord);

  rescheduleReviewWord(sampleWord, true);
  rescheduleReviewWord(sampleWord, true);
  rescheduleReviewWord(sampleWord, true);

  assert.deepEqual(getDueReviewWords(), []);
});
