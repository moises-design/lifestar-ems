// End-to-end coverage for the four forms wired to POST
// /api/submit-form. There is no real backend running under
// `vite preview` (see playwright.config.js), so /api/submit-form is
// intercepted here — this verifies the actual client-side contract
// (request shape, success/error gating on the server's response,
// duplicate-click safety) exactly as a real deployment would exercise
// it, without needing a live Resend account.
import { test, expect } from '@playwright/test'

const FORMS = [
  {
    name: 'contact',
    path: '/contact',
    formSelector: '.contact-form',
    submitSelector: '.form-submit-btn',
    successSelector: '.form-done',
    errorSelector: '.contact-form .v2-form-status-error',
    expectedFormType: 'contact',
    fill: async (page) => {
      await page.fill('#ct-name', 'Jane Doe')
      await page.fill('#ct-phone', '9560000000')
      await page.fill('#ct-email', 'jane@example.com')
      await page.fill('#ct-message', 'Please call me back.')
    },
  },
  {
    name: 'transport-request',
    path: '/request',
    formSelector: '.req-form',
    submitSelector: '.req-submit',
    successSelector: '.req-success',
    errorSelector: '.req-form .v2-form-status-error',
    expectedFormType: 'transport-request',
    fill: async (page) => {
      await page.fill('#req-name', 'Jane Doe')
      await page.fill('#req-phone', '9560000000')
      await page.fill('#req-email', 'jane@example.com')
      await page.selectOption('#req-service', { index: 1 })
      await page.fill('#req-details', 'Weekly dialysis rides needed.')
    },
  },
  {
    name: 'event',
    path: '/services/events',
    formSelector: '.event-form-box form',
    submitSelector: '.ev-submit',
    successSelector: '.event-form-box .v2-form-status-success',
    errorSelector: '.event-form-box .v2-form-status-error',
    expectedFormType: 'event',
    fill: async (page) => {
      const form = page.locator('.event-form-box form')
      await form.locator('input[name="name"]').fill('Jane Doe')
      await form.locator('input[name="phone"]').fill('9560000000')
      await form.locator('input[name="email"]').fill('jane@example.com')
      await form.locator('input[name="event_name"]').fill('Championship Game')
    },
  },
  {
    name: 'government',
    path: '/government-contracting',
    formSelector: '.gc-form',
    submitSelector: '.gc-submit',
    successSelector: '.gc-form-success',
    errorSelector: '.gc-form-error',
    expectedFormType: 'government',
    fill: async (page) => {
      await page.fill('#gc-name', 'Jane Doe')
      await page.fill('#gc-org', 'City of Edinburg')
      await page.selectOption('#gc-type', { index: 1 })
      await page.selectOption('#gc-service', { index: 1 })
      await page.fill('#gc-email', 'jane@example.com')
      await page.fill('#gc-msg', 'Question about an upcoming solicitation.')
    },
  },
]

for (const form of FORMS) {
  test.describe(`${form.name} form`, () => {
    test('shows success only after the server confirms acceptance', async ({ page }) => {
      let capturedBody = null
      await page.route('**/api/submit-form', async (route) => {
        capturedBody = route.request().postDataJSON()
        await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ ok: true }) })
      })

      await page.goto(form.path, { waitUntil: 'load' })
      await form.fill(page)
      await page.click(form.submitSelector)

      await expect(page.locator(form.successSelector)).toBeVisible()
      expect(capturedBody.formType).toBe(form.expectedFormType)
      expect(capturedBody.email).toBe('jane@example.com')
      expect(typeof capturedBody.submissionId).toBe('string')
      expect(capturedBody.submissionId.length).toBeGreaterThan(0)
    })

    test('shows a clear error and not the success state when delivery fails', async ({ page }) => {
      await page.route('**/api/submit-form', async (route) => {
        await route.fulfill({
          status: 502,
          contentType: 'application/json',
          body: JSON.stringify({ error: 'We could not send your request right now. Please call (956) 660-6543.' }),
        })
      })

      await page.goto(form.path, { waitUntil: 'load' })
      await form.fill(page)
      await page.click(form.submitSelector)

      await expect(page.locator(form.errorSelector)).toBeVisible()
      await expect(page.locator(form.errorSelector)).toContainText('660-6543')
      await expect(page.locator(form.successSelector)).toHaveCount(0)
    })

    test('a rapid double-click only sends one request', async ({ page }) => {
      let hitCount = 0
      await page.route('**/api/submit-form', async (route) => {
        hitCount += 1
        // Hold the response briefly so a genuine double-click would race
        // ahead of the button's disabled state if the ref guard weren't
        // in place.
        await new Promise((resolve) => setTimeout(resolve, 200))
        await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ ok: true }) })
      })

      await page.goto(form.path, { waitUntil: 'load' })
      await form.fill(page)

      // Dispatch two native clicks back-to-back in the page itself
      // (no `await` between them) so both fire before React's first
      // re-render can flip the button's `disabled` attribute — this is
      // what a genuine rapid double-click looks like at the DOM level,
      // and it is exactly the case the submittingRef guard in each
      // form's submit handler exists for. Using Playwright's own
      // `.click()` twice is not equivalent: its auto-waiting/actionability
      // checks serialize against the disabled/detached button instead of
      // racing it.
      await page.evaluate((selector) => {
        const button = document.querySelector(selector)
        button.click()
        button.click()
      }, form.submitSelector)

      await expect(page.locator(form.successSelector)).toBeVisible()
      expect(hitCount).toBe(1)
    })
  })
}
