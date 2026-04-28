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
  await expect(page.locator('text=/correct|incorrect|try again/i')).toBeVisible({ timeout: 8000 });
});

test('accessibility checks for game controls', async ({ page }) => {
  // Start the game properly  
  await page.goto('./');
  const startButton = page.getByRole('button', { name: /START CUSTOM GAME/i });
  await expect(startButton).toBeEnabled();
  await startButton.evaluate(el => el.click());
  
  // Wait for game to load and check that submit button is accessible
  await expect(page.getByRole('button', { name: 'Submit' })).toBeVisible();
  
  // Check that letter buttons are accessible (use exact match to avoid conflicts)
  await expect(page.getByRole('button', { name: 'A', exact: true })).toBeVisible();
  
  // Check that help shop button is accessible
  await expect(page.getByRole('button', { name: 'Open help shop' })).toBeVisible();
});
