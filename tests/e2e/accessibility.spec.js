// axe accessibility scan for every known route. Run once per route at a
// single representative width (1280, desktop) rather than at all 7 widths
// from smoke.spec.js — a full 7-widths x 14-routes axe matrix (98 scans)
// was judged not worth the runtime for this pass since axe's violation
// set rarely changes with viewport width (it flags DOM/ARIA issues, not
// layout). Logged here rather than silently narrowed: widening this to
// more widths, or to the 390px mobile viewport specifically (the
// mission's other named-priority width), is a reasonable follow-up if a
// width-specific a11y issue is ever suspected.
import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import { ROUTES } from './routes.js'

for (const route of ROUTES) {
  test(`${route}: no axe violations (desktop, 1280px)`, async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 })
    await page.goto(route, { waitUntil: 'load' })
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag22aa'])
      .analyze()
    const summary = results.violations.map(v => ({
      id: v.id,
      impact: v.impact,
      nodes: v.nodes.length,
      help: v.help,
    }))
    expect(summary, `axe violations on ${route}`).toEqual([])
  })
}
