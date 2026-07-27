// Route smoke test: every known public route loads with no console
// errors, no broken images, and no horizontal overflow, at each of the
// mission's 7 required widths. This is layout/error coverage only (cheap,
// runs at every width); the separate accessibility.spec.js runs the more
// expensive axe scan once per route at a representative width rather than
// at all 7 x 14 combinations — see the note in that file.
import { test, expect } from '@playwright/test'
import { ROUTES } from './routes.js'

const WIDTHS = [320, 375, 390, 768, 1024, 1440, 1920]

for (const route of ROUTES) {
  for (const width of WIDTHS) {
    test(`${route} @ ${width}px: loads clean, no horizontal overflow`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 })
      const errors = []
      page.on('pageerror', e => errors.push(String(e)))
      page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()) })

      const response = await page.goto(route, { waitUntil: 'load' })
      expect(response.status(), `${route} HTTP status`).toBe(200)

      await expect(page.locator('h1').first()).toBeVisible()
      // Wait for web fonts before measuring layout: under CPU contention
      // (e.g. many parallel test workers) a fallback-font line can be
      // briefly wider than the final Inter/Source Serif metrics, which
      // would otherwise read as a false-positive horizontal-overflow
      // failure that no real user, post-font-swap, ever sees.
      await page.evaluate(() => document.fonts.ready)

      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      )
      expect(overflow, `${route} @ ${width}px horizontal overflow (px)`).toBeLessThanOrEqual(1)

      const brokenImages = await page.evaluate(() =>
        [...document.querySelectorAll('img')]
          .filter(img => img.complete && img.naturalWidth === 0)
          .map(img => img.src),
      )
      expect(brokenImages, `${route} @ ${width}px broken images`).toEqual([])

      expect(errors, `${route} @ ${width}px console/page errors`).toEqual([])
    })
  }
}

test('unknown route renders the NotFound page content client-side', async ({ page }) => {
  await page.goto('/this-route-does-not-exist-xyz123', { waitUntil: 'load' })
  await expect(page.locator('h1').first()).toBeVisible()
})
