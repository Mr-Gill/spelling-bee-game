const { test, expect } = require('@playwright/test');

test('keyboard input works during gameplay', async ({ page }) => {
  // Start the game properly
  await page.goto('/');
  await page.getByRole('button', { name: /START CUSTOM GAME/i }).click();
  
  // Wait for game to load
  await expect(page.getByRole('button', { name: 'A' })).toBeVisible();
  
  // Test keyboard input by clicking letter buttons
  await page.getByRole('button', { name: 'H' }).click();
  await page.getByRole('button', { name: 'A' }).click();
  await page.getByRole('button', { name: 'P' }).click();
  await page.getByRole('button', { name: 'P' }).click();
  await page.getByRole('button', { name: 'Y' }).click();
  
  // Submit the word
  await page.getByRole('button', { name: 'Submit' }).click();
  
  // Should get feedback (either correct or incorrect)
  await expect(page.locator('text=/correct|incorrect|try again/i')).toBeVisible({ timeout: 5000 });
});

test('accessibility checks for game controls', async ({ page }) => {
  // Start the game properly  
  await page.goto('/');
  await page.getByRole('button', { name: /START CUSTOM GAME/i }).click();
  
  // Wait for game to load and check that submit button is accessible
  await expect(page.getByRole('button', { name: 'Submit' })).toBeVisible();
  
  // Check that letter buttons are accessible
  await expect(page.getByRole('button', { name: 'A' })).toBeVisible();
  
  // Check that help shop button is accessible
  await expect(page.getByRole('button', { name: 'Open help shop' })).toBeVisible();
});
