const { test, expect } = require('@playwright/test');

test('team mode shows team roster', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: /TEAM BATTLE/i }).click();
  await expect(page.getByText(/TEAM ROSTER/i)).toBeVisible();
});

test('hint purchase deducts coins', async ({ page }) => {
  await page.goto('/shop');
  await page.evaluate(() => localStorage.setItem('coins', '50'));
  await page.reload();
  await page.getByRole('button', { name: 'Buy Hint: Reveal a Letter' }).click();
  await expect(page.getByText('30 coins')).toBeVisible();
});

test('leaderboard reflects stored scores', async ({ page }) => {
  await page.goto('/leaderboard');
  await page.evaluate(() => {
    localStorage.setItem('leaderboard', JSON.stringify([{ name: 'Alice', score: 42, date: '2024-01-01' }]));
  });
  await page.reload();
  await expect(page.getByText('Alice')).toBeVisible();
});
