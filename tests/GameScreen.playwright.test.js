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

test('individual mode miss advances to the next student with a new levelled word', async ({ page }) => {
  await page.goto('./');
  await page.evaluate(() => localStorage.clear());
  await page.reload();

  await page.getByRole('button', { name: /SOLO CHALLENGE/i }).click();
  await page.getByPlaceholder(/Paste names/i).fill('Ada, Ben');
  await page.getByRole('button', { name: 'Add Names' }).click();

  const startButton = page.getByRole('button', { name: /START CUSTOM GAME/i });
  await expect(startButton).toBeEnabled();
  await startButton.click();

  const revealedWord = page.locator('div.inline-block.text-6xl');

  await page.getByRole('button', { name: /Show Word/i }).click();
  const firstWord = (await revealedWord.innerText()).split(/\s+/)[0];
  await page.keyboard.type(firstWord);
  await page.keyboard.press('Enter');

  await expect(page.getByRole('heading', { name: /WORD FOR STUDENT: BEN/i })).toBeVisible({ timeout: 5000 });
  await page.getByRole('button', { name: /Show Word/i }).click();
  const missedWord = (await revealedWord.innerText()).split(/\s+/)[0];

  await page.keyboard.type('zzzzzzzzzzzz');
  await page.keyboard.press('Enter');

  await expect(page.getByRole('heading', { name: /WORD FOR STUDENT: ADA/i })).toBeVisible({ timeout: 5000 });
  await page.getByRole('button', { name: /Show Word/i }).click();
  const nextWord = (await revealedWord.innerText()).split(/\s+/)[0];

  expect(nextWord).not.toBe(missedWord);
});

test('individual mode restores a named student saved level', async ({ page }) => {
  await page.goto('./');
  await page.evaluate(() => {
    localStorage.clear();
    localStorage.setItem(
      'spellingBeeStudentProgress',
      JSON.stringify({
        ben: {
          difficultyLevel: 2,
          wordsAttempted: 12,
          wordsCorrect: 10,
          lastPlayedAt: new Date().toISOString(),
        },
      })
    );
  });
  await page.reload();

  await page.getByRole('button', { name: /SOLO CHALLENGE/i }).click();
  await page.getByPlaceholder(/Paste names/i).fill('Ada, Ben');
  await page.getByRole('button', { name: 'Add Names' }).click();

  const startButton = page.getByRole('button', { name: /START CUSTOM GAME/i });
  await expect(startButton).toBeEnabled();
  await startButton.click();

  await expect(page.locator('.scorecard').filter({ hasText: 'Ben' })).toContainText('Tricky');
});
