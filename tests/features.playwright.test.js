const { test, expect } = require('@playwright/test');

test('team mode shows team roster', async ({ page }) => {
  await page.goto('./');
  await page.getByRole('button', { name: /TEAM BATTLE/i }).click();
  await expect(page.getByText(/TEAM ROSTER/i)).toBeVisible();
});

test('help shop shows available hints in game', async ({ page }) => {
  // Start a game to access the help shop
  await page.goto('./');
  await page.getByRole('button', { name: /START CUSTOM GAME/i }).click();
  
  // Wait for game to load and open help shop
  await expect(page.getByRole('button', { name: 'Open help shop' })).toBeVisible();
  await page.getByRole('button', { name: 'Open help shop' }).click();
  
  // Check that help shop opened with coin display
  await expect(page.getByText(/Your coins:/i)).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Help Shop' })).toBeVisible();
});

test('achievements screen is accessible', async ({ page }) => {
  await page.goto('./');
  
  // Click VIEW ACHIEVEMENTS button using evaluate to avoid animation issues
  await page.getByRole('button', { name: /VIEW ACHIEVEMENTS/i }).evaluate(el => el.click());
  
  // Check achievements screen loaded
  await expect(page.getByRole('heading', { name: 'Achievements' })).toBeVisible();
  await expect(page.getByText(/First Victory/i)).toBeVisible();
});

test('accessibility settings can be changed from setup', async ({ page }) => {
  await page.goto('./');

  await page.getByRole('button', { name: /Accessibility Settings/i }).click();
  await expect(page.getByRole('dialog', { name: /Accessibility Settings/i })).toBeVisible();

  await page.getByRole('button', { name: '125%' }).click();
  await page.getByLabel(/Reduce Motion/i).check();

  await expect(page.locator('html')).toHaveAttribute('data-reduce-motion', 'true');
  await expect(page.locator('html')).toHaveCSS('font-size', '20px');
});
