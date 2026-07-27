// Regression coverage for form-note content. The Government Contracting
// inquiry form must show a privacy notice. The Event EMS Standby form's
// note previously read "For a medical emergency, call 911." — the
// production content repair replaced that with a non-emergency-only
// confirmation notice (see docs/PRODUCTION-CONTENT-CLAIM-AUDIT.md), so
// this now asserts the new wording and the explicit absence of the old
// 911 line. Both run at a representative width plus a mobile width.
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

  test(`Event EMS Standby form shows the non-emergency confirmation notice, not a 911 notice @ ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/services/events', { waitUntil: 'load' })
    const form = page.locator('.event-form-box form')
    await expect(form).toBeVisible()
    await expect(form).toContainText(/does not confirm staffing, pricing, or event coverage/i)
    await expect(form).toContainText(/call dispatch for immediate coordination/i)
    await expect(form).not.toContainText(/call 911/i)
  })
}
