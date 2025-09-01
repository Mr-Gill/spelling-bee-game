import { test, expect } from '@playwright/test';

test.describe('Spelling Bee Game', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the app before each test
    await page.goto('/');
  });

  test('should load the home page', async ({ page }) => {
    // Check if the main heading is visible
    await expect(page.getByRole('heading', { name: /spelling bee game/i })).toBeVisible();
    
    // Check if the start button is visible
    await expect(page.getByRole('button', { name: /start game/i })).toBeVisible();
  });

  test('should start a new game', async ({ page }) => {
    // Click the start game button
    await page.getByRole('button', { name: /start game/i }).click();
    
    // Check if the game screen is displayed
    await expect(page.getByText(/spell the word/i)).toBeVisible();
    
    // Check if the word display is visible
    await expect(page.getByTestId('word-display')).toBeVisible();
    
    // Check if the letter buttons are visible
    const letterButtons = page.getByTestId('letter-button');
    await expect(letterButtons).toHaveCount(7);
  });

  test('should allow typing letters', async ({ page }) => {
    // Start the game
    await page.getByRole('button', { name: /start game/i }).click();
    
    // Get the first letter button and click it
    const firstLetterButton = page.getByTestId('letter-button').first();
    const firstLetter = await firstLetterButton.textContent();
    await firstLetterButton.click();
    
    // Check if the letter appears in the input
    await expect(page.getByTestId('word-input')).toHaveValue(firstLetter);
  });

  test('should allow submitting a word', async ({ page }) => {
    // Start the game
    await page.getByRole('button', { name: /start game/i }).click();
    
    // Type a word by clicking letter buttons
    const letterButtons = await page.getByTestId('letter-button').all();
    const word = (await Promise.all(letterButtons.map(btn => btn.textContent()))).join('');
    
    for (const button of letterButtons) {
      await button.click();
    }
    
    // Submit the word
    await page.getByRole('button', { name: /submit/i }).click();
    
    // Check if the word appears in the word list
    await expect(page.getByTestId('word-list')).toContainText(word);
  });

  test('should show success message for correct word', async ({ page }) => {
    // This test would need to be updated based on the actual game logic
    // Currently, it's a placeholder for the success case
    await page.getByRole('button', { name: /start game/i }).click();
    
    // Mock a successful word submission
    await page.evaluate(() => {
      window.dispatchEvent(new CustomEvent('wordSubmitted', { 
        detail: { word: 'test', isCorrect: true }
      }));
    });
    
    await expect(page.getByText(/correct!/i)).toBeVisible();
  });

  test('should show error message for incorrect word', async ({ page }) => {
    // This test would need to be updated based on the actual game logic
    // Currently, it's a placeholder for the error case
    await page.getByRole('button', { name: /start game/i }).click();
    
    // Mock a failed word submission
    await page.evaluate(() => {
      window.dispatchEvent(new CustomEvent('wordSubmitted', { 
        detail: { word: 'invalid', isCorrect: false }
      }));
    });
    
    await expect(page.getByText(/try again/i)).toBeVisible();
  });
});
