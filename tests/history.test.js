const assert = require('assert');
const { test } = require('node:test');

require('ts-node/register');
const { appendHistoryEntry, loadHistory, clearHistory } = require('../src/utils/history');

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

test('appendHistoryEntry appends session history entry', () => {
  const mock = createMockStorage();
  global.localStorage = mock;

  appendHistoryEntry({ score: 7, duration: 45 });

  const history = JSON.parse(mock.getItem('sessionHistory'));
  assert.equal(history.length, 1);
  assert.equal(history[0].score, 7);
  assert.equal(history[0].duration, 45);
  assert.ok(history[0].date);
});

test('loadHistory returns entries and clearHistory clears history', () => {
  const mock = createMockStorage();
  global.localStorage = mock;

  const entry = { date: '2024-01-01T00:00:00.000Z', score: 9, duration: 30 };
  mock.setItem('sessionHistory', JSON.stringify([entry]));

  const history = loadHistory();
  assert.equal(history.length, 1);
  assert.deepEqual(history[0], entry);

  clearHistory();
  assert.equal(mock.getItem('sessionHistory'), null);
});
