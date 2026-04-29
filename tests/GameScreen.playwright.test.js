const { test, expect } = require('@playwright/test');

test('keyboard input works during gameplay', async ({ page }) => {
  // Start the game properly
  await page.goto('./');
  const startButton = page.getByRole('button', { name: /START CUSTOM GAME/i });
  await expect(startButton).toBeEnabled();
  await startButton.evaluate(el => el.click());
  
  // Wait for game to load
  await expect(page.getByRole('button', { name: 'A', exact: true })).toBeVisible();
  
  // Test keyboard input by typing an intentionally wrong word
  await page.keyboard.press('X');
  await page.keyboard.press('Y');
  await page.keyboard.press('Z');
  
  // Submit the word
  await page.keyboard.press('Enter');
  
  // Should get feedback (either correct or incorrect)
  await expect(page.locator('text=/correct|incorrect|try again/i').first()).toBeVisible({ timeout: 8000 });
});

test('accessibility checks for game controls', async ({ page }) => {
  // Start the game properly  
  await page.goto('./');
  const startButton = page.getByRole('button', { name: /START CUSTOM GAME/i });
  await expect(startButton).toBeEnabled();
  await startButton.evaluate(el => el.click());
  
  // Wait for game to load and check that submit button is accessible
  await expect(page.getByRole('button', { name: 'Submit' })).toBeVisible();
  await expect(page.getByText(/Session \d{1,2}:\d{2}/i)).toBeVisible();
  
  // Check that letter buttons are accessible (use exact match to avoid conflicts)
  await expect(page.getByRole('button', { name: 'A', exact: true })).toBeVisible();
  
  // Check that help shop button is accessible
  await expect(page.getByRole('button', { name: 'Open help shop' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Edit encouragement phrases' })).toBeVisible();

  // Phonics support appears for words that include phoneme data
  await page.getByRole('button', { name: /Show Phonics/i }).click();
  await expect(page.getByText(/Phonics Breakdown/i)).toBeVisible();
});

test('teacher can customise encouragement phrases', async ({ page }) => {
  await page.goto('./');
  const startButton = page.getByRole('button', { name: /START CUSTOM GAME/i });
  await expect(startButton).toBeEnabled();
  await startButton.evaluate(el => el.click());

  await page.getByRole('button', { name: 'Edit encouragement phrases' }).click();
  await expect(page.getByRole('heading', { name: 'Encouragement phrases' })).toBeVisible();

  await page.getByRole('textbox', { name: 'Encouragement phrases' }).fill('Brilliant, {name}!');
  await page.getByRole('button', { name: 'Save' }).click();
  await expect(page.getByText('Saved encouragement phrases.')).toBeVisible();

  const stored = await page.evaluate(() => localStorage.getItem('encouragementPhrases'));
  expect(stored).toBe(JSON.stringify(['Brilliant, {name}!']));
});
