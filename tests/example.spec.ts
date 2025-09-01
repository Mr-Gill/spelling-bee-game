import { test, expect } from '@playwright/test';

test.describe('Spelling Bee Game', () => {
  test('should load the home page', async ({ page }) => {
    // Start from the index page
    await page.goto('http://localhost:3000');
    
    // Verify the page title
    await expect(page).toHaveTitle('Spelling Bee Game');
    
    // Verify the main heading is visible
    await expect(page.getByRole('heading', { name: /spelling bee game/i })).toBeVisible();
  });

  test('should start a new game', async ({ page }) => {
    await page.goto('http://localhost:3000');
    
    // Click the start game button if it exists
    const startButton = page.getByRole('button', { name: /start game/i });
    if (await startButton.isVisible()) {
      await startButton.click();
    }
    
    // Verify we're on the game screen
    await expect(page.getByText(/spell the word/i)).toBeVisible();
  });
});
