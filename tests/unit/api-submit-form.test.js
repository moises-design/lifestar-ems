// Integration-style tests for the POST /api/submit-form handler, with
// the `resend` package mocked so no real network call is ever made.
// Exercises the handler exactly as Vercel's Node.js runtime would call
// it: a plain (req, res) pair, res.status(...).json(...).
import { vi, describe, it, expect, beforeEach } from 'vitest'

const { mockSend } = vi.hoisted(() => ({ mockSend: vi.fn() }))
vi.mock('resend', () => ({
  // A real class (not vi.fn().mockImplementation()) so `new Resend(...)`
  // in api/_lib/resend-client.js works exactly as it would with the
  // real SDK.
  Resend: class Resend {
    constructor() {
      this.emails = { send: mockSend }
    }
  },
}))

import handler from '../../api/submit-form.js'
import { _resetDedupeStoreForTests } from '../../api/_lib/dedupe.js'

function createMockRes() {
  return {
    statusCode: 200,
    headers: {},
    body: undefined,
    status(code) { this.statusCode = code; return this },
    json(payload) { this.body = payload; return this },
    setHeader(key, value) { this.headers[key] = value },
  }
}

function createMockReq(body) {
  return { method: 'POST', body }
}

const baseContact = { formType: 'contact', name: 'Jane Doe', email: 'jane@example.com', message: 'Please call me back.' }

beforeEach(() => {
  mockSend.mockReset()
  mockSend.mockResolvedValue({ data: { id: 'email_123' }, error: null })
  _resetDedupeStoreForTests()
  process.env.RESEND_API_KEY = 'test_resend_key'
  process.env.FORM_NOTIFICATION_EMAIL = 'lifestarems.rgv@gmail.com'
  process.env.FORM_FROM_EMAIL = 'Life Star EMS Website <onboarding@resend.dev>'
})

describe('POST /api/submit-form', () => {
  it('rejects non-POST methods', async () => {
    const req = { method: 'GET', body: {} }
    const res = createMockRes()
    await handler(req, res)
    expect(res.statusCode).toBe(405)
  })

  it('returns a validation error for missing required fields', async () => {
    const req = createMockReq({ formType: 'contact', email: 'jane@example.com' })
    const res = createMockRes()
    await handler(req, res)
    expect(res.statusCode).toBe(400)
    expect(res.body.error).toMatch(/required/i)
    expect(mockSend).not.toHaveBeenCalled()
  })

  it('rejects an invalid email address', async () => {
    const req = createMockReq({ ...baseContact, email: 'not-an-email' })
    const res = createMockRes()
    await handler(req, res)
    expect(res.statusCode).toBe(400)
    expect(res.body.error).toMatch(/valid email/i)
    expect(mockSend).not.toHaveBeenCalled()
  })

  it('rejects an unsupported form type', async () => {
    const req = createMockReq({ formType: 'newsletter-signup', name: 'A', email: 'a@b.com' })
    const res = createMockRes()
    await handler(req, res)
    expect(res.statusCode).toBe(400)
    expect(res.body.error).toMatch(/unsupported form type/i)
    expect(mockSend).not.toHaveBeenCalled()
  })

  it('returns success on a mocked successful Resend response', async () => {
    const req = createMockReq({ ...baseContact, submissionId: 'sid-success' })
    const res = createMockRes()
    await handler(req, res)
    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual({ ok: true })
    expect(mockSend).toHaveBeenCalledTimes(1)
  })

  it('returns an error and does not report success when Resend fails', async () => {
    mockSend.mockResolvedValueOnce({ data: null, error: { message: 'Resend is down' } })
    const req = createMockReq({ ...baseContact, submissionId: 'sid-failure' })
    const res = createMockRes()
    await handler(req, res)
    expect(res.statusCode).toBe(502)
    expect(res.body.ok).not.toBe(true)
    expect(res.body.error).toBeTruthy()
  })

  it('returns an error when Resend throws', async () => {
    mockSend.mockRejectedValueOnce(new Error('network blip'))
    const req = createMockReq({ ...baseContact, submissionId: 'sid-throw' })
    const res = createMockRes()
    await handler(req, res)
    expect(res.statusCode).toBe(502)
    expect(res.body.ok).not.toBe(true)
  })

  it('blocks duplicate rapid submissions sharing the same submissionId', async () => {
    const req1 = createMockReq({ ...baseContact, submissionId: 'sid-dup' })
    const res1 = createMockRes()
    await handler(req1, res1)
    expect(res1.statusCode).toBe(200)
    expect(mockSend).toHaveBeenCalledTimes(1)

    const req2 = createMockReq({ ...baseContact, submissionId: 'sid-dup' })
    const res2 = createMockRes()
    await handler(req2, res2)
    expect(res2.statusCode).toBe(200)
    expect(res2.body).toEqual({ ok: true, duplicate: true })
    // The duplicate must not trigger a second email send.
    expect(mockSend).toHaveBeenCalledTimes(1)
  })

  it('does not treat two different submissionIds as duplicates', async () => {
    await handler(createMockReq({ ...baseContact, submissionId: 'sid-a' }), createMockRes())
    await handler(createMockReq({ ...baseContact, submissionId: 'sid-b' }), createMockRes())
    expect(mockSend).toHaveBeenCalledTimes(2)
  })

  it('silently accepts honeypot submissions without sending an email', async () => {
    const req = createMockReq({ ...baseContact, submissionId: 'sid-bot', website: 'http://spam.example' })
    const res = createMockRes()
    await handler(req, res)
    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual({ ok: true })
    expect(mockSend).not.toHaveBeenCalled()
  })

  describe('per-form subject, formType, and reply-to', () => {
    const cases = [
      {
        formType: 'transport-request',
        subject: 'New Transport Request | Life Star EMS',
        body: { name: 'A', phone: '9', email: 'requester@example.com', service: 'Dialysis Transport', details: 'Weekly rides' },
      },
      {
        formType: 'contact',
        subject: 'New Website Contact | Life Star EMS',
        body: { name: 'A', email: 'contact@example.com', message: 'Question' },
      },
      {
        formType: 'event',
        subject: 'New Event Coverage Request | Life Star EMS',
        body: { name: 'A', phone: '9', email: 'organizer@example.com', event_name: 'Championship Game' },
      },
      {
        formType: 'government',
        subject: 'New Government Contracting Inquiry | Life Star EMS',
        body: { name: 'A', organization: 'City of Edinburg', agencyType: 'City agency', email: 'buyer@example.com', service: 'Event EMS standby', message: 'RFP question' },
      },
    ]

    for (const { formType, subject, body } of cases) {
      it(`${formType} sends the correct formType, subject, and reply-to`, async () => {
        const req = createMockReq({ formType, ...body, submissionId: `sid-${formType}` })
        const res = createMockRes()
        await handler(req, res)

        expect(res.statusCode).toBe(200)
        expect(mockSend).toHaveBeenCalledTimes(1)
        const sentArgs = mockSend.mock.calls[0][0]
        expect(sentArgs.subject).toBe(subject)
        expect(sentArgs.reply_to).toBe(body.email)
        expect(sentArgs.to).toBe('lifestarems.rgv@gmail.com')
        expect(sentArgs.from).toBe('Life Star EMS Website <onboarding@resend.dev>')
      })
    }
  })

  it('returns a clear delivery error when RESEND_API_KEY is not configured', async () => {
    delete process.env.RESEND_API_KEY
    const req = createMockReq({ ...baseContact, submissionId: 'sid-no-key' })
    const res = createMockRes()
    await handler(req, res)
    expect(res.statusCode).toBe(502)
    expect(res.body.ok).not.toBe(true)
    expect(mockSend).not.toHaveBeenCalled()
  })
})
