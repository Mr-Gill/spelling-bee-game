const assert = require('assert');
const { test } = require('node:test');

const ResultsScreen = require('../src/ResultsScreen.js');
const HistoryScreen = require('../src/HistoryScreen.js');

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

test('ResultsScreen appends session history entry', () => {
  const mock = createMockStorage();
  global.localStorage = mock;

  const results = {
    participants: [{ points: 7 }],
    duration: 45
  };

  ResultsScreen({ results });

  const history = JSON.parse(mock.getItem('sessionHistory'));
  assert.equal(history.length, 1);
  assert.equal(history[0].score, 7);
  assert.equal(history[0].duration, 45);
  assert.ok(history[0].date);
});

test('HistoryScreen shows entries and clears history', () => {
  const mock = createMockStorage();
  global.localStorage = mock;

  const entry = { date: '2024-01-01T00:00:00.000Z', score: 9, duration: 30 };
  mock.setItem('sessionHistory', JSON.stringify([entry]));

  const screen = HistoryScreen();
  assert.equal(screen.entries.length, 1);
  assert.deepEqual(screen.entries[0], entry);

  screen.clearHistory();
  assert.equal(mock.getItem('sessionHistory'), null);
});
