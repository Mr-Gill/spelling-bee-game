const { test } = require('node:test');
const assert = require('assert');
const path = require('path');
const Module = require('module');
const esbuild = require('esbuild');
const React = require('react');
const { JSDOM } = require('jsdom');
const { render, screen, fireEvent } = require('@testing-library/react');

function loadComponent(relativePath) {
  const result = esbuild.buildSync({
    entryPoints: [path.join(__dirname, relativePath)],
    bundle: true,
    platform: 'node',
    format: 'cjs',
    write: false,
    jsx: 'automatic',
    loader: {
      '.ts': 'ts',
      '.tsx': 'tsx',
      '.mp3': 'dataurl',
      '.svg': 'dataurl',
      '.png': 'dataurl',
      '.jpg': 'dataurl',
      '.jpeg': 'dataurl'
    }
  });
  const code = result.outputFiles[0].text;
  const m = new Module('');
  m.paths = Module._nodeModulePaths(process.cwd());
  m._compile(code, relativePath);
  return m.exports.default || m.exports;
}

function setupDom() {
  const dom = new JSDOM('<!doctype html><html><body></body></html>');
  global.window = dom.window;
  global.document = dom.window.document;
  global.navigator = dom.window.navigator;
  global.Audio = class { play() {} };
  window.matchMedia = window.matchMedia || function() {
    return { matches: false, addListener: () => {}, removeListener: () => {} };
  };
}

test('ResultsScreen appends history entry with date, score and duration', () => {
  setupDom();
  const store = {};
  global.localStorage = {
    getItem: (k) => store[k] || null,
    setItem: (k, v) => { store[k] = v; },
    removeItem: (k) => { delete store[k]; }
  };
  const ResultsScreen = loadComponent('../src/ResultsScreen.tsx');
  const config = { dailyChallenge: false, soundEnabled: false, effectsEnabled: false, wordDatabase: { easy: [], medium: [], tricky: [] } };
  const results = {
    participants: [{ name: 'Test', points: 5, lives: 0, wordsCorrect: 0, wordsAttempted: 0, avatar: '' }],
    winner: { name: 'Test' },
    duration: 10,
    missedWords: []
  };
  render(React.createElement(ResultsScreen, { results, config, onRestart: () => {}, onViewLeaderboard: () => {} }));
  const history = JSON.parse(store.sessionHistory);
  assert.equal(history.length, 1);
  assert.equal(history[0].score, 5);
  assert.equal(history[0].duration, 10);
  assert.ok(history[0].date);
});

test('HistoryScreen renders entries and clears history via UI', () => {
  setupDom();
  const store = { sessionHistory: JSON.stringify([{ date: '2024-01-01', score: 7, duration: 30 }]) };
  global.localStorage = {
    getItem: (k) => store[k] || null,
    setItem: (k, v) => { store[k] = v; },
    removeItem: (k) => { delete store[k]; }
  };
  const HistoryScreen = loadComponent('../src/HistoryScreen.tsx');
  render(React.createElement(HistoryScreen));
  let items = screen.getAllByTestId('history-entry');
  assert.equal(items.length, 1);
  fireEvent.click(screen.getByText('Clear History'));
  assert.equal(screen.queryByTestId('history-entry'), null);
  assert.strictEqual(store.sessionHistory, undefined);
});
