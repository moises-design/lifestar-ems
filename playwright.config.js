import { existsSync } from 'node:fs'
import { defineConfig } from '@playwright/test'

// Reuses this environment's pre-installed full Chromium (not the default
// "headless shell" variant, which is a different, separately-versioned
// download that isn't present here) instead of fetching a browser. Falls
// back to Playwright's normal resolution (PLAYWRIGHT_CHROMIUM_PATH, then
// its own default) wherever this exact sandbox path doesn't exist, so the
// suite still runs in a real CI or a future environment with browsers
// installed the standard way. webServer builds and serves the real
// production bundle so tests exercise what actually ships, including the
// prerendered per-route HTML written by scripts/prerender.mjs.
const SANDBOX_CHROMIUM = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome'
const executablePath = existsSync(SANDBOX_CHROMIUM)
  ? SANDBOX_CHROMIUM
  : process.env.PLAYWRIGHT_CHROMIUM_PATH || undefined

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  retries: 0,
  reporter: [['list']],
  use: {
    baseURL: 'http://localhost:4173',
    launchOptions: { executablePath },
  },
  webServer: {
    command: 'npm run preview -- --port 4173 --strictPort',
    url: 'http://localhost:4173',
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
})
