const { test } = require('node:test');
const assert = require('assert');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const esbuild = require('esbuild');
const path = require('path');
const Module = require('module');

test.skip('GameScreen mounts with minimal config without runtime errors', () => {
  global.localStorage = {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {},
  };
  global.document = {
    body: { classList: { add: () => {}, remove: () => {} } },
    addEventListener: () => {},
    removeEventListener: () => {},
  };
  const result = esbuild.buildSync({
    entryPoints: [path.join(__dirname, '../src/GameScreen.tsx')],
    bundle: true,
    platform: 'node',
    format: 'cjs',
    write: false,
    loader: { '.ts': 'ts', '.tsx': 'tsx', '.mp3': 'dataurl', '.svg': 'dataurl' },
    external: ['react', 'react-dom']
  });
  const code = result.outputFiles[0].text;
  const m = new Module('');
  m.paths = Module._nodeModulePaths(process.cwd());
  m._compile(code, 'GameScreen.js');
  const GameScreen = m.exports.default;
  const config = {
    participants: [{
      name: 'Test',
      lives: 1,
      points: 0,
      difficultyLevel: 1,
      streak: 0,
      attempted: 0,
      correct: 0,
      wordsAttempted: 0,
      wordsCorrect: 0,
    }],
    gameMode: 'individual',
    timerDuration: 60,
    wordDatabase: { easy: [], medium: [], tricky: [] },
    skipPenaltyType: 'lives',
    skipPenaltyValue: 0,
    soundEnabled: true,
    effectsEnabled: true,
    musicStyle: 'Funk',
    musicVolume: 0.5,
    difficultyLevel: 1,
    progressionSpeed: 1,
  };
  assert.doesNotThrow(() => {
    ReactDOMServer.renderToString(
      React.createElement(GameScreen, { config, onEndGame: () => {} })
    );
  });
});
