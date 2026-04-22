import { defineConfig, devices } from '@playwright/test'

/**
 * Playwright config — Phase 3 smoke tests.
 *
 * Runs ONE E2E test: can a kid complete M1 end-to-end in under 60s?
 * The goal is structural regression detection, not a full test suite.
 * See tests/e2e/mission-01.spec.ts.
 */
export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? 'github' : 'list',

  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:5200',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'ipad-safari-sim',
      // iPad landscape — the target device per CLAUDE.md
      use: { ...devices['iPad Pro 11 landscape'], browserName: 'webkit' },
    },
  ],

  webServer: process.env.PLAYWRIGHT_BASE_URL
    ? undefined
    : {
        command: 'bun run dev',
        url: 'http://localhost:5200',
        reuseExistingServer: !process.env.CI,
        timeout: 60 * 1000,
      },
})
