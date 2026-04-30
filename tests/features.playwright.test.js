const { test, expect } = require('@playwright/test');

test('team mode shows team roster', async ({ page }) => {
  await page.goto('./');
  await page.getByRole('button', { name: /TEAM BATTLE/i }).evaluate(el => el.click());
  await expect(page.getByText(/TEAM ROSTER/i)).toBeVisible();
});

test('help shop shows available hints in game', async ({ page }) => {
  // Start a game to access the help shop
  await page.goto('./');
  const startButton = page.getByRole('button', { name: /START CUSTOM GAME/i });
  await expect(startButton).toBeEnabled();
  await startButton.evaluate(el => el.click());
  
  // Wait for game to load and open help shop
  const helpButton = page.getByRole('button', { name: 'Open help shop' });
  await expect(helpButton).toBeVisible();
  await helpButton.evaluate(el => el.click());
  
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

  await page.getByRole('button', { name: /Accessibility Settings/i }).evaluate(el => el.click());
  await expect(page.getByRole('dialog', { name: /Accessibility Settings/i })).toBeVisible();

  await page.getByRole('button', { name: '125%' }).click();
  await page.getByLabel(/Reduce Motion/i).check();

  await expect(page.locator('html')).toHaveAttribute('data-reduce-motion', 'true');
  await expect(page.locator('html')).toHaveCSS('font-size', '20px');
});

test('warm-up practice is available before the main game', async ({ page }) => {
  await page.goto('./');

  const warmupButton = page.getByRole('button', { name: /WARM-UP/i });
  await expect(warmupButton).toBeEnabled();
  await warmupButton.evaluate(el => el.click());
  await expect(page.getByRole('heading', { name: /Warm-Up Practice/i })).toBeVisible();
  await expect(page.getByRole('button', { name: /Hear Word/i })).toBeVisible();

  await page.getByRole('button', { name: /Back to Setup/i }).click();
  await expect(page.getByRole('button', { name: /START CUSTOM GAME/i })).toBeVisible();
});

test('setup presets save and load game options', async ({ page }) => {
  await page.goto('./');

  // Open the collapsible presets panel first
  await page.locator('summary').filter({ hasText: /Load \/ Save Setup/i }).click();
  await page.getByLabel(/Session Length/i).fill('12');
  await page.getByLabel(/Preset Name/i).fill('Friday groups');
  await page.getByRole('button', { name: 'Save', exact: true }).click();
  await expect(page.getByText(/Saved "Friday groups"/i)).toBeVisible();

  await page.getByLabel(/Session Length/i).fill('5');
  await page.getByLabel(/Saved Presets/i).selectOption('Friday groups');
  await page.getByRole('button', { name: 'Load', exact: true }).click();

  await expect(page.getByLabel(/Session Length/i)).toHaveValue('12');
});

test('team display route opens in display mode', async ({ page }) => {
  await page.goto('./?team=1');

  await expect(page.getByText(/Team Display/i)).toBeVisible();
  await expect(page.getByText(/Waiting for the next word/i)).toBeVisible();
});

test('scoreboard route opens in display mode', async ({ page }) => {
  await page.goto('./?scoreboard=1');

  await expect(page.getByText(/Live Scoreboard/i)).toBeVisible();
  await expect(page.getByText(/Waiting for scores/i)).toBeVisible();
});

test('privacy display hides names during gameplay', async ({ page }) => {
  await page.goto('./');
  await page.getByLabel('Hide names on game and scoreboard displays').check();
  await page.getByRole('button', { name: /START CUSTOM GAME/i }).click();

  await expect(page.getByText(/WORD FOR TEAM: TEAM 1/i)).toBeVisible();
  await expect(page.getByText('Team Alpha')).toHaveCount(0);

  const hideScoreboardNames = await page.evaluate(() => localStorage.getItem('scoreboardHideNames'));
  expect(hideScoreboardNames).toBe('true');
});

test('pasted CSV word lists start with the word hidden', async ({ page }) => {
  await page.goto('./');
  const csv = '"word","syllables","definition","origin","example","prefix","suffix","pronunciation"\n"harmony","[\\"har\\",\\"mo\\",\\"ny\\"]","A pleasing blend of sounds that makes chaos behave politely.","Greek via Latin","The classroom found harmony after one bee loudly inspected the xylophone.","","","HAR-muh-nee"';

  await page.getByLabel(/Or Paste Word List Data/i).fill(csv);
  await page.getByRole('button', { name: /START CUSTOM GAME/i }).click();

  await expect(page.getByRole('button', { name: /Show Word/i })).toBeVisible();
  await expect(page.getByText('harmony', { exact: true })).toHaveCount(0);
});

test('word list templates are downloadable in supported filetypes', async ({ page }) => {
  await page.goto('./');

  for (const extension of ['CSV', 'TSV', 'TXT', 'JSON']) {
    const link = page.getByRole('link', { name: `Download ${extension} Template` });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute('href', new RegExp(`wordlists/template\\.${extension.toLowerCase()}$`));
  }
});

test('randomised team names stay short during gameplay', async ({ page }) => {
  await page.goto('./');
  await page.getByRole('button', { name: /SOLO CHALLENGE/i }).click();
  await page.getByPlaceholder(/Paste names/i).fill('Alice, Bob, Charlie, Dakota');
  await page.getByRole('button', { name: 'Add Names' }).click();
  await page.getByPlaceholder('Number of teams').fill('2');
  await page.getByRole('button', { name: 'Randomize' }).click();
  await page.getByRole('button', { name: /TEAM BATTLE/i }).click();

  await expect(page.locator('input[value="Team 1"]')).toBeVisible();
  await expect(page.locator('input[value*="Alice"], input[value*="Bob"], input[value*="Charlie"], input[value*="Dakota"]')).toHaveCount(0);

  await page.getByRole('button', { name: /START CUSTOM GAME/i }).click();
  await expect(page.getByText(/WORD FOR TEAM: TEAM 1/i)).toBeVisible();
});
