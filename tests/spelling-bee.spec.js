const { test, expect } = require('@playwright/test');

test('Game loads successfully', async ({ page }) => {
  await page.goto('http://localhost:3000/spelling-bee-game/');
  await expect(page).toHaveTitle('Spelling Bee Game');
});

test('Can start a new game', async ({ page }) => {
  await page.goto('http://localhost:3000/spelling-bee-game/');
  await page.click('button:has-text("Start Game")');
  await expect(page.locator('.current-word')).toBeVisible();
});

test('Spell a word correctly', async ({ page }) => {
  await page.goto('http://localhost:3000/spelling-bee-game/');
  await page.click('button:has-text("Start Game")');
  
  // Type each letter of the current word
  const word = await page.textContent('.current-word');
  for (const letter of word) {
    await page.click(`button:has-text("${letter}")`);
  }
  
  // Submit word
  await page.click('button:has-text("Submit")');
  await expect(page.locator('.feedback.correct')).toBeVisible();
});

test('Handle incorrect spelling', async ({ page }) => {
  await page.goto('http://localhost:3000/spelling-bee-game/');
  await page.click('button:has-text("Start Game")');
  
  // Type wrong letters
  await page.click('button:has-text("A")');
  await page.click('button:has-text("B")');
  await page.click('button:has-text("C")');
  
  // Submit word
  await page.click('button:has-text("Submit")');
  await expect(page.locator('.feedback.incorrect')).toBeVisible();
});
