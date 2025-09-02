const { test, expect } = require('@playwright/test');
const React = require('react');
const { render } = require('@testing-library/react');
const { JSDOM } = require('jsdom');

// Create a basic DOM environment
const dom = new JSDOM('<!doctype html><html><body><div id="root"></div></body></html>');
global.window = dom.window;
global.document = dom.window.document;

// Mock audio files in Playwright config
test.beforeEach(async ({ page }) => {
  await page.route('**/audio/*.mp3', route => route.fulfill({
    status: 200,
    contentType: 'audio/mpeg',
    body: Buffer.from('') // Empty audio file
  }));
});

test('GameScreen mounts with minimal config without runtime errors', async ({ page }) => {
  // Mock localStorage
  global.localStorage = {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {},
  };

  const GameScreen = require('../src/GameScreen').default;
  
  const { container } = render(
    <GameScreen 
      words={[]} 
      participants={[]} 
      onComplete={() => {}} 
    />
  );
  
  expect(container).toBeTruthy();
});
