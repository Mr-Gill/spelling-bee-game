import { test, expect } from '@playwright/test';

test.describe.configure({ mode: 'serial' });

test.describe('Visual Regression Testing', () => {

  test('home page matches visual snapshot', async ({ page }) => {
    await page.goto('/');
    
    // Wait for the page to be fully loaded
    await expect(page.getByRole('heading', { name: /spelling bee game/i })).toBeVisible();
    
    // Take a screenshot and compare with the baseline
    await expect(page).toHaveScreenshot('home-page.png', {
      maxDiffPixelRatio: 0.02,
      threshold: 0.2,
      animations: 'disabled',
    });
  });

  test('game screen matches visual snapshot', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /start game/i }).click();
    
    // Wait for the game to be ready
    await expect(page.getByTestId('word-display')).toBeVisible();
    
    // Take a screenshot of the game screen
    await expect(page).toHaveScreenshot('game-screen.png', {
      maxDiffPixelRatio: 0.02,
      threshold: 0.2,
      animations: 'disabled',
    });
  });

  test('letter buttons have consistent styling', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /start game/i }).click();
    
    // Get the first letter button
    const letterButton = page.getByTestId('letter-button').first();
    
    // Check button styling
    await expect(letterButton).toHaveScreenshot('letter-button.png', {
      maxDiffPixelRatio: 0.02,
      threshold: 0.2,
    });
    
    // Check hover state
    await letterButton.hover();
    await expect(letterButton).toHaveScreenshot('letter-button-hover.png', {
      maxDiffPixelRatio: 0.02,
      threshold: 0.2,
    });
  });

  test('responsive design works on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 812 }); // iPhone X dimensions
    
    await page.goto('/');
    await page.getByRole('button', { name: /start game/i }).click();
    
    // Verify responsive layout
    await expect(page.getByTestId('word-display')).toBeInViewport();
    
    // Take a screenshot of mobile view
    await expect(page).toHaveScreenshot('mobile-game-screen.png', {
      maxDiffPixelRatio: 0.02,
      threshold: 0.2,
      animations: 'disabled',
    });
  });
});
