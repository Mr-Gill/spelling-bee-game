import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * Playwright test configuration.
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  testMatch: /.*\.playwright\.test\.[tj]s$/,
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 1 : 0,
  /* Optimize workers for CI vs local development */
  workers: process.env.CI ? 2 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: process.env.CI ? [['github'], ['html']] : 'html',
  /* Global timeout for each test */
  timeout: 30000,
  /* Expect timeout for assertions */
  expect: {
    timeout: 10000,
  },
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: process.env.BASE_URL || 'http://localhost:5000',
    
    /* Visual testing configuration - optimized for CI */
    screenshot: process.env.CI ? 'only-on-failure' : 'off',
    video: process.env.CI ? 'retain-on-failure' : 'off',
    trace: process.env.CI ? 'retain-on-failure' : 'on-first-retry',
    
    /* Reduce action timeout for faster feedback */
    actionTimeout: 10000,
    navigationTimeout: 15000,
  },

  /* Configure projects for major browsers - optimized for CI performance */
  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        viewport: { width: 1280, height: 800 },
        launchOptions: {
          // Remove slowMo in CI for better performance
          slowMo: process.env.CI ? 0 : 100,
        },
      },
    },
    
    // Only run additional browsers in visual test mode or when explicitly requested
    {
      name: 'firefox',
      use: { 
        ...devices['Desktop Firefox'],
        viewport: { width: 1280, height: 800 },
      },
      // Only run Firefox in visual testing workflow
      metadata: {
        platform: 'firefox',
      },
    },
    {
      name: 'webkit',
      use: { 
        ...devices['Desktop Safari'],
        viewport: { width: 1280, height: 800 },
      },
      // Only run WebKit in visual testing workflow
      metadata: {
        platform: 'webkit',
      },
    },
  ],

  /* Configure web server for tests */
  webServer: process.env.CI ? undefined : {
    command: 'npm run serve',
    url: 'http://localhost:5000',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
});
