// Regression coverage for the production content/visual repair mission
// (docs/PRODUCTION-CONTENT-CLAIM-AUDIT.md): the sitewide emergency banner
// removal, the homepage image/placeholder fixes, the new Request/Contact
// form notices, the Coverage page's de-duplicated heading, the Event page's
// claim removal, and the inline-link non-color distinction fix.
import { test, expect } from '@playwright/test'
import { ROUTES } from './routes.js'

const OLD_BANNER_SENTENCE =
  'For a medical emergency, call 911. Life Star EMS provides scheduled transportation and event standby services.'

test.describe('sitewide emergency banner is fully removed', () => {
  for (const route of ROUTES) {
    test(`${route}: page does not render the old sitewide banner sentence`, async ({ page }) => {
      await page.goto(route, { waitUntil: 'load' })
      const bodyText = await page.locator('body').innerText()
      expect(bodyText).not.toContain(OLD_BANNER_SENTENCE)
    })
  }

  test('mobile menu sheet no longer renders a notice paragraph', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/', { waitUntil: 'load' })
    const toggle = page.getByRole('button', { name: /menu/i })
    await toggle.click()
    await expect(page.locator('.v2h-sheet-notice')).toHaveCount(0)
  })
})

test('footer excludes the removed emergency sentence and the old notice element', async ({ page }) => {
  await page.goto('/', { waitUntil: 'load' })
  const footer = page.locator('footer.v2f')
  await expect(footer).toBeVisible()
  await expect(footer).not.toContainText(/for a medical emergency, call 911/i)
  await expect(page.locator('.v2f-notice')).toHaveCount(0)
})

test.describe('homepage key image sections render real content', () => {
  test('"Care in every mile" section has a valid, loaded photo', async ({ page }) => {
    await page.goto('/', { waitUntil: 'load' })
    const section = page.locator('#why-life-star')
    await expect(section.locator('h2')).toHaveText('Care in every mile')
    const img = section.locator('.v2home-photo-slot-img')
    await img.scrollIntoViewIfNeeded()
    await expect(img).toBeVisible()
    await expect.poll(() => img.evaluate(el => el.naturalWidth)).toBeGreaterThan(0)
  })

  test('"Who shows up when you call" section has multiple valid, loaded photos', async ({ page }) => {
    await page.goto('/', { waitUntil: 'load' })
    const section = page.locator('#operations')
    await expect(section.locator('h2')).toHaveText('Who shows up when you call')
    const photos = section.locator('.v2home-realops-photo')
    const count = await photos.count()
    expect(count).toBeGreaterThan(0)
    for (let i = 0; i < count; i++) {
      const photo = photos.nth(i)
      await photo.scrollIntoViewIfNeeded()
      await expect.poll(() => photo.evaluate(el => el.naturalWidth)).toBeGreaterThan(0)
    }
  })

  test('"Across the Rio Grande Valley" coverage panel is not a blank placeholder box', async ({ page }) => {
    await page.goto('/', { waitUntil: 'load' })
    const panel = page.locator('.v2home-coverage-panel')
    await expect(panel).toBeVisible()
    const cityCount = await panel.locator('.v2home-cities li').count()
    expect(cityCount).toBeGreaterThan(0)
    await expect(panel).toContainText(/edinburg/i)
  })
})

test('Request page shows the new submission-confirmation notice', async ({ page }) => {
  await page.goto('/request', { waitUntil: 'load' })
  const note = page.locator('.req-note')
  await expect(note).toContainText(
    /submitting this form does not confirm transportation, crew availability, pricing, or scheduling/i,
  )
  await expect(note).toContainText(/call dispatch for immediate coordination/i)
})

test('Contact page shows the sensitive-information warning', async ({ page }) => {
  await page.goto('/contact', { waitUntil: 'load' })
  const warning = page.locator('.contact-sensitive-warning')
  await expect(warning).toContainText(
    /do not include medical records, diagnoses, social security numbers, insurance member ids/i,
  )
})

test('Coverage page has exactly one "Where we serve" heading, not a duplicate', async ({ page }) => {
  await page.goto('/coverage', { waitUntil: 'load' })
  const heading = page.getByRole('heading', { name: /where we serve/i })
  await expect(heading).toHaveCount(1)
})

test('Event EMS page has no "Paramedic crews" or "Fast response" wording', async ({ page }) => {
  await page.goto('/services/events', { waitUntil: 'load' })
  const bodyText = await page.locator('body').innerText()
  expect(bodyText).not.toMatch(/paramedic crews/i)
  expect(bodyText).not.toMatch(/fast[- ]on-site medical response|fast response/i)
})

test('inline links inside body text are distinguishable by more than color alone', async ({ page }) => {
  await page.goto('/privacy', { waitUntil: 'load' })
  const inlineLink = page.locator('.v2 p a').first()
  await expect(inlineLink).toBeVisible()
  const textDecorationLine = await inlineLink.evaluate(el => getComputedStyle(el).textDecorationLine)
  expect(textDecorationLine).toContain('underline')
})

// Regression coverage for a bug found during final pre-merge QA: the
// global `.v2 a { color: var(--v2-blue-ink) }` link-color rule has
// higher CSS specificity than the legacy `.btn-blue` class alone, so
// any <a>/<Link> styled with .btn-blue inside the .v2 scope silently
// lost its intended dark-ink text color and rendered at ~2:1 contrast
// on the blue button fill instead of the intended ~5.7:1 — a WCAG AA
// failure that the axe scan did not flag. Checks every rendered
// .btn-blue element (button or link) on every route for adequate
// contrast against its own background, computed directly rather than
// relying on axe alone.
test('every .btn-blue element has WCAG AA-adequate text contrast on its background', async ({ page }) => {
  for (const route of ROUTES) {
    await page.goto(route, { waitUntil: 'load' })
    const results = await page.evaluate(() => {
      function toRgb(str) {
        const m = str.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/)
        return m ? [Number(m[1]), Number(m[2]), Number(m[3])] : null
      }
      function relLum([r, g, b]) {
        const lin = c => { c /= 255; return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4 }
        return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b)
      }
      function contrast(c1, c2) {
        const l1 = relLum(c1), l2 = relLum(c2)
        const [a, b] = l1 > l2 ? [l1, l2] : [l2, l1]
        return (a + 0.05) / (b + 0.05)
      }
      return [...document.querySelectorAll('.btn-blue')].map(el => {
        const cs = getComputedStyle(el)
        const fg = toRgb(cs.color)
        const bg = toRgb(cs.backgroundColor)
        return { text: el.textContent.trim(), ratio: fg && bg ? contrast(fg, bg) : null }
      })
    })
    for (const r of results) {
      expect(r.ratio, `${route}: ".btn-blue" (${r.text}) contrast`).not.toBeNull()
      expect(r.ratio, `${route}: ".btn-blue" (${r.text}) contrast ${r.ratio}`).toBeGreaterThanOrEqual(4.5)
    }
  }
})
