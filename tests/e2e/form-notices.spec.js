// Regression coverage for two PR-review findings: the Government
// Contracting inquiry form was missing a privacy notice, and the Event
// EMS Standby form had no emergency-911 notice. Both are plain content
// checks against the rendered form, run at a representative width plus a
// mobile width to confirm the notice is visible on both.
import { test, expect } from '@playwright/test'

const WIDTHS = [375, 1280]

for (const width of WIDTHS) {
  test(`Government Contracting inquiry form shows a privacy notice @ ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/government-contracting', { waitUntil: 'load' })
    const form = page.locator('.gc-form')
    await expect(form).toBeVisible()
    await expect(form).toContainText(/privacy notice/i)
    await expect(form).toContainText(/do not include/i)
    await expect(form).toContainText(/social security/i)
    await expect(form).toContainText(/insurance member id/i)
    await expect(form).toContainText(/medical records/i)
  })

  test(`Event EMS Standby form shows an emergency 911 notice @ ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/services/events', { waitUntil: 'load' })
    const form = page.locator('.event-form-box form')
    await expect(form).toBeVisible()
    await expect(form).toContainText(/call 911/i)
    await expect(form).toContainText(/does not confirm staffing, pricing, or event coverage/i)
  })
}
