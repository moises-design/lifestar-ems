// Regression coverage for the production incident where every email
// delivery failure produced the identical generic 502 with nothing in
// Vercel's logs to distinguish a missing RESEND_API_KEY from a bad
// FORM_FROM_EMAIL from an actual Resend rejection. sendNotificationEmail
// must now log enough to tell those apart — and must never log the
// API key or the submitter's own data while doing it.
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest'

const { mockSend } = vi.hoisted(() => ({ mockSend: vi.fn() }))
vi.mock('resend', () => ({
  Resend: class Resend {
    constructor() {
      this.emails = { send: mockSend }
    }
  },
}))

import { sendNotificationEmail } from '../../api/_lib/resend-client.js'

const SECRET_KEY = 'test_resend_key_should_never_appear_in_logs'

let errorSpy

beforeEach(() => {
  mockSend.mockReset()
  process.env.RESEND_API_KEY = SECRET_KEY
  process.env.FORM_NOTIFICATION_EMAIL = 'lifestarems.rgv@gmail.com'
  process.env.FORM_FROM_EMAIL = 'Life Star EMS Website <onboarding@resend.dev>'
  errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
})

afterEach(() => {
  errorSpy.mockRestore()
})

function loggedPayloads() {
  return errorSpy.mock.calls.map((call) => JSON.stringify(call))
}

describe('sendNotificationEmail failure logging', () => {
  it('logs a distinguishable reason when RESEND_API_KEY is missing', async () => {
    delete process.env.RESEND_API_KEY
    const result = await sendNotificationEmail({ subject: 'Test', html: '<p>x</p>', text: 'x', replyTo: 'a@b.com' })
    expect(result.ok).toBe(false)
    expect(errorSpy).toHaveBeenCalledTimes(1)
    const [, payload] = errorSpy.mock.calls[0]
    expect(payload.code).toBe('missing_api_key')
  })

  it('logs a distinguishable reason when FORM_NOTIFICATION_EMAIL is missing', async () => {
    delete process.env.FORM_NOTIFICATION_EMAIL
    const result = await sendNotificationEmail({ subject: 'Test', html: '<p>x</p>', text: 'x', replyTo: 'a@b.com' })
    expect(result.ok).toBe(false)
    const [, payload] = errorSpy.mock.calls[0]
    expect(payload.code).toBe('missing_notification_email')
  })

  it('logs the Resend SDK error code, status, and message when Resend rejects the request', async () => {
    mockSend.mockResolvedValueOnce({
      data: null,
      error: { name: 'invalid_from_address', statusCode: 403, message: 'The from address is not verified.' },
    })
    const result = await sendNotificationEmail({ subject: 'Test', html: '<p>x</p>', text: 'x', replyTo: 'a@b.com' })
    expect(result.ok).toBe(false)
    expect(result.reason).toBe('The from address is not verified.')
    const [, payload] = errorSpy.mock.calls[0]
    expect(payload.code).toBe('invalid_from_address')
    expect(payload.status).toBe(403)
    expect(payload.reason).toBe('The from address is not verified.')
    expect(payload.to).toBe('lifestarems.rgv@gmail.com')
    expect(payload.from).toBe('Life Star EMS Website <onboarding@resend.dev>')
  })

  it('logs a distinguishable reason when the Resend call throws', async () => {
    mockSend.mockRejectedValueOnce(new Error('fetch failed'))
    const result = await sendNotificationEmail({ subject: 'Test', html: '<p>x</p>', text: 'x', replyTo: 'a@b.com' })
    expect(result.ok).toBe(false)
    const [, payload] = errorSpy.mock.calls[0]
    expect(payload.code).toBe('thrown_exception')
    expect(payload.reason).toBe('fetch failed')
  })

  it('does not log anything on success', async () => {
    mockSend.mockResolvedValueOnce({ data: { id: 'email_123' }, error: null })
    const result = await sendNotificationEmail({ subject: 'Test', html: '<p>x</p>', text: 'x', replyTo: 'a@b.com' })
    expect(result.ok).toBe(true)
    expect(errorSpy).not.toHaveBeenCalled()
  })

  it('never includes the RESEND_API_KEY value in any logged payload, across every realistic failure path', async () => {
    // RESEND_API_KEY is set to SECRET_KEY throughout (see beforeEach) so
    // this exercises the real, non-contrived code paths: the key is in
    // scope the whole time, and none of logDeliveryFailure's fields
    // (to/from/code/status/reason) are ever derived from it.
    delete process.env.FORM_NOTIFICATION_EMAIL
    await sendNotificationEmail({ subject: 'Test', html: '<p>x</p>', text: 'x', replyTo: 'a@b.com' })

    process.env.FORM_NOTIFICATION_EMAIL = 'lifestarems.rgv@gmail.com'
    mockSend.mockResolvedValueOnce({ data: null, error: { name: 'invalid_api_key', statusCode: 401, message: 'Invalid API key.' } })
    await sendNotificationEmail({ subject: 'Test', html: '<p>x</p>', text: 'x', replyTo: 'a@b.com' })

    mockSend.mockRejectedValueOnce(new Error('fetch failed'))
    await sendNotificationEmail({ subject: 'Test', html: '<p>x</p>', text: 'x', replyTo: 'a@b.com' })

    expect(errorSpy).toHaveBeenCalledTimes(3)
    for (const payload of loggedPayloads()) {
      expect(payload).not.toContain(SECRET_KEY)
    }
  })
})
