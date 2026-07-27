import { describe, it, expect } from 'vitest'
import { validateInquiry, isRateLimited, INQUIRY_TYPES, buildRecord } from '../../supabase/functions/submit-inquiry/validate.js'

describe('validateInquiry', () => {
  it('accepts a well-formed submission', () => {
    const result = validateInquiry({
      name: 'Jane Doe',
      email: 'jane@example.com',
      phone: '(956) 000-0000',
      message: 'Please contact me about dialysis transport.',
      inquiry_type: 'dialysis',
    })
    expect(result.ok).toBe(true)
    expect(result.honeypot).toBe(false)
    expect(result.data).toMatchObject({
      name: 'Jane Doe',
      email: 'jane@example.com',
      inquiry_type: 'dialysis',
      status: 'new',
      source: 'website',
    })
  })

  it('rejects a missing name', () => {
    const result = validateInquiry({ email: 'a@b.com', message: 'hi' })
    expect(result.ok).toBe(false)
    expect(result.errors).toContain('Name is required.')
  })

  it('rejects an invalid email', () => {
    const result = validateInquiry({ name: 'A', email: 'not-an-email', message: 'hi' })
    expect(result.ok).toBe(false)
    expect(result.errors).toContain('A valid email is required.')
  })

  it('rejects a missing message', () => {
    const result = validateInquiry({ name: 'A', email: 'a@b.com' })
    expect(result.ok).toBe(false)
    expect(result.errors).toContain('A message is required.')
  })

  it('silently accepts and drops honeypot-triggered submissions', () => {
    const result = validateInquiry({ name: 'Bot', email: 'bot@bot.com', message: 'spam', website: 'http://spam.example' })
    expect(result.ok).toBe(true)
    expect(result.honeypot).toBe(true)
    expect(result.data).toBeNull()
  })

  it('falls back to "general" for an unknown inquiry_type', () => {
    const result = validateInquiry({ name: 'A', email: 'a@b.com', message: 'hi', inquiry_type: 'not-a-real-type' })
    expect(result.data.inquiry_type).toBe('general')
  })

  it('truncates over-length fields instead of rejecting them', () => {
    const result = validateInquiry({ name: 'A', email: 'a@b.com', message: 'x'.repeat(10000) })
    expect(result.ok).toBe(true)
    expect(result.data.message.length).toBe(4000)
  })

  it('rejects a non-object body', () => {
    expect(validateInquiry(null).ok).toBe(false)
    expect(validateInquiry('a string').ok).toBe(false)
  })

  it('exposes the known inquiry types', () => {
    expect(INQUIRY_TYPES).toContain('dialysis')
    expect(INQUIRY_TYPES).toContain('long-distance')
  })
})

describe('buildRecord', () => {
  it('drops message and inquiry_type from long-distance records, storing the text under notes', () => {
    const body = { table: 'long_distance_requests', message: 'Please call about a trip to Houston.', pickup_city: 'McAllen' }
    const validated = validateInquiry({ name: 'Jane Doe', email: 'jane@example.com', message: body.message })
    expect(validated.ok).toBe(true)
    expect(validated.data.message).toBe(body.message) // sanity: validation output does contain `message`

    const record = buildRecord('long_distance_requests', validated.data, body, 'test-agent')

    expect(record).not.toHaveProperty('message')
    expect(record).not.toHaveProperty('inquiry_type')
    expect(record.notes).toBe(body.message)
  })

  it('keeps message (and drops nothing) for contact_submissions records', () => {
    const body = { message: 'General inquiry.' }
    const validated = validateInquiry({ name: 'Jane Doe', email: 'jane@example.com', message: body.message })
    const record = buildRecord('contact_submissions', validated.data, body, 'test-agent')

    expect(record.message).toBe(body.message)
    expect(record.inquiry_type).toBe('general')
  })
})

describe('isRateLimited', () => {
  it('allows submissions under the limit', () => {
    expect(isRateLimited({ countInWindow: 0 })).toBe(false)
    expect(isRateLimited({ countInWindow: 4, limit: 5 })).toBe(false)
  })

  it('blocks submissions at or over the limit', () => {
    expect(isRateLimited({ countInWindow: 5, limit: 5 })).toBe(true)
    expect(isRateLimited({ countInWindow: 9, limit: 5 })).toBe(true)
  })
})
