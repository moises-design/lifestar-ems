// Regression coverage for the premium homepage redesign
// (claude/lifestar-premium-homepage-v1). Focused on the specific bugs
// found during this mission's own QA pass plus basic presence/structure
// checks for the new sections, rather than re-testing everything the
// broader mission-repair.spec.js suite already covers.
import { test, expect } from '@playwright/test'

test('hero eyebrow and heading render at full opacity immediately (no fade-in contrast dip)', async ({ page }) => {
  // Regression guard: an earlier version of this redesign faded the
  // hero eyebrow/heading/lead in via CSS opacity animation, which
  // could render at reduced contrast for the animation's first ~100ms
  // and failed an axe color-contrast check as a result. Motion now
  // applies only to the hero photo, never to this text.
  await page.goto('/', { waitUntil: 'load' })
  const eyebrow = page.locator('.v2home-hero-eyebrow')
  const heading = page.locator('#hero-h')
  await expect(eyebrow).toBeVisible()
  await expect(heading).toBeVisible()
  const [eyebrowOpacity, headingOpacity] = await Promise.all([
    eyebrow.evaluate(el => getComputedStyle(el).opacity),
    heading.evaluate(el => getComputedStyle(el).opacity),
  ])
  expect(Number(eyebrowOpacity)).toBe(1)
  expect(Number(headingOpacity)).toBe(1)
})

test('hero shows the real ambulance photo with at most two floating badges', async ({ page }) => {
  await page.goto('/', { waitUntil: 'load' })
  const photo = page.locator('.v2home-hero-photo')
  await expect(photo).toBeVisible()
  await expect.poll(() => photo.evaluate(el => el.naturalWidth)).toBeGreaterThan(0)
  const badgeCount = await page.locator('.v2home-hero-badge').count()
  expect(badgeCount).toBeLessThanOrEqual(2)
})

test('mosaic photography section renders exactly four distinct real photos with no empty grid cells', async ({ page }) => {
  await page.goto('/', { waitUntil: 'load' })
  const items = page.locator('.v2home-mosaic-item')
  await expect(items).toHaveCount(4)
  const srcs = await page.locator('.v2home-mosaic-photo').evaluateAll(imgs => imgs.map(i => i.currentSrc || i.src))
  expect(new Set(srcs).size).toBe(4)
})

test('audience pathways include a fourth government and institutional buyers card', async ({ page }) => {
  await page.goto('/', { waitUntil: 'load' })
  const cards = page.locator('#paths .v2home-path-card')
  await expect(cards).toHaveCount(4)
  const govCard = cards.filter({ hasText: 'government and institutional buyers' })
  await expect(govCard).toHaveCount(1)
  await expect(govCard.getByRole('link')).toHaveAttribute('href', '/government-contracting')
})

test('elevated government section lists verified buyer types and both required actions', async ({ page }) => {
  await page.goto('/', { waitUntil: 'load' })
  const gov = page.locator('#government')
  await expect(gov).toContainText('School districts')
  await expect(gov).toContainText('Universities')
  await expect(gov).toContainText('Emergency management organizations')
  await expect(gov).toContainText('Prime contractors')
  await expect(gov.getByRole('link', { name: /view government contracting/i })).toHaveAttribute('href', '/government-contracting')
  await expect(gov.getByRole('link', { name: /download capability statement/i })).toHaveAttribute('href', /capability-statement\.pdf$/)
})

test('leadership block preserves the woman-owned wording and links to About', async ({ page }) => {
  await page.goto('/', { waitUntil: 'load' })
  const section = page.locator('#leadership')
  await expect(section.locator('h2')).toHaveText('Woman-Owned Leadership')
  await expect(section).toContainText('Heather Ayala-Segovia')
  await expect(section.getByRole('link', { name: /more about life star/i })).toHaveAttribute('href', '/about')
})

test('service discovery section has five real, distinct service cards with no emoji', async ({ page }) => {
  await page.goto('/', { waitUntil: 'load' })
  const cards = page.locator('#services .v2-service-card')
  await expect(cards).toHaveCount(5)
  const text = await page.locator('#services').innerText()
  const hasEmoji = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u.test(text)
  expect(hasEmoji).toBe(false)
})

test('homepage has no unsupported ALS, paramedic, or guarantee claims', async ({ page }) => {
  await page.goto('/', { waitUntil: 'load' })
  const bodyText = await page.locator('body').innerText()
  expect(bodyText).not.toMatch(/paramedic/i)
  expect(bodyText).not.toMatch(/\bALS\b/)
  expect(bodyText).not.toMatch(/\bguarantee[sd]?\b/i)
  // The "Texas Licensed EMS Provider" hero trust item deliberately stays
  // BLS-only and defers to the exact DSHS wording on the identifiers
  // page it links to, rather than restating licensing details here.
  const licenseLink = page.getByRole('link', { name: /texas licensed ems provider/i })
  await expect(licenseLink).toHaveAttribute('href', '/government-contracting#identifiers')
})
