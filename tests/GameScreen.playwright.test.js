const { test, expect } = require('@playwright/test');

test('keyboard input', async ({ page }) => {
  await page.goto('/game');
  await page.keyboard.press('A');
  await page.keyboard.press('P');
  await page.keyboard.press('P');
  await page.keyboard.press('Enter');
  await expect(page.locator('.feedback')).toContainText('Try again!');
});

test('accessibility checks', async ({ page }) => {
  await page.goto('/game');
  await expect(page.locator('button[aria-label="Submit spelling"]')).toBeVisible();
});
