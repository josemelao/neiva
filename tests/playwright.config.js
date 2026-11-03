// @ts-check
const { defineConfig, devices } = require('@playwright/test');
const path = require('path');

const PORT = 4173;

module.exports = defineConfig({
  testDir: './e2e',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: 1,
  reporter: [['list'], ['html', { open: 'never' }]],
  timeout: 30000,
  expect: {
    timeout: 8000,
    toHaveScreenshot: {
      maxDiffPixelRatio: 0.002,
      animations: 'disabled',
    },
  },
  use: {
    baseURL: `http://127.0.0.1:${PORT}`,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  webServer: {
    command: 'python -m http.server 4173 --bind 127.0.0.1',
    cwd: path.resolve(__dirname, '..'),
    port: PORT,
    reuseExistingServer: true,
    timeout: 30000,
  },
  projects: [
    {
      name: 'desktop',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1280, height: 900 },
        reducedMotion: 'reduce',
      },
    },
    {
      name: 'mobile',
      use: {
        ...devices['Pixel 7'],
        reducedMotion: 'reduce',
      },
    },
  ],
});
