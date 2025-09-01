import { test as base } from '@playwright/test';

export const test = base.extend({
  page: async ({ page }, use) => {
    // Set consistent viewport for visual tests
    await page.setViewportSize({ width: 1280, height: 800 });
    await use(page);
  }
});

export { expect } from '@playwright/test';
