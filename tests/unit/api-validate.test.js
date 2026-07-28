import { describe, it, expect } from 'vitest'
import { validateSubmission, escapeHtml } from '../../api/_lib/validate.js'
import { renderHtmlEmail, renderTextEmail } from '../../api/_lib/email-template.js'
import { FORM_CONFIGS, FORM_TYPES } from '../../api/_lib/forms.js'

const validContact = { formType: 'contact', name: 'Jane Doe', email: 'jane@example.com', message: 'Please call me back.' }

describe('validateSubmission', () => {
  it('accepts a well-formed contact submission', () => {
    const result = validateSubmission('contact', validContact)
    expect(result.ok).toBe(true)
    expect(result.honeypot).toBe(false)
    expect(result.data).toMatchObject({ name: 'Jane Doe', email: 'jane@example.com', message: 'Please call me back.' })
  })

  it('rejects an unsupported form type', () => {
    const result = validateSubmission('not-a-real-form', validContact)
    expect(result.ok).toBe(false)
    expect(result.status).toBe(400)
    expect(result.error).toMatch(/unsupported form type/i)
  })

  it('rejects a missing required field', () => {
    const result = validateSubmission('contact', { email: 'jane@example.com', message: 'hi' })
    expect(result.ok).toBe(false)
    expect(result.error).toMatch(/full name is required/i)
  })

  it('rejects an invalid email address', () => {
    const result = validateSubmission('contact', { name: 'Jane', email: 'not-an-email', message: 'hi' })
    expect(result.ok).toBe(false)
    expect(result.error).toMatch(/valid email is required/i)
  })

  it('rejects a non-object body', () => {
    expect(validateSubmission('contact', null).ok).toBe(false)
    expect(validateSubmission('contact', 'a string').ok).toBe(false)
  })

  it('silently accepts and drops honeypot-triggered submissions', () => {
    const result = validateSubmission('contact', { ...validContact, website: 'http://spam.example' })
    expect(result.ok).toBe(true)
    expect(result.honeypot).toBe(true)
    expect(result.data).toBeNull()
  })

  it('truncates over-length fields instead of rejecting them', () => {
    const result = validateSubmission('contact', { ...validContact, message: 'x'.repeat(10000) })
    expect(result.ok).toBe(true)
    expect(result.data.message.length).toBe(4000)
  })

  it('coerces checkbox fields to booleans (government form)', () => {
    const base = {
      name: 'A', organization: 'B', agencyType: 'City', email: 'a@b.com',
      service: 'Ambulance', message: 'hi',
    }
    expect(validateSubmission('government', { ...base, wantsPdf: true }).data.wantsPdf).toBe(true)
    expect(validateSubmission('government', { ...base, wantsPdf: 'yes' }).data.wantsPdf).toBe(false)
    expect(validateSubmission('government', base).data.wantsPdf).toBe(false)
  })

  it('validates every declared form type end to end', () => {
    const goodBodies = {
      'transport-request': { name: 'A', phone: '9', email: 'a@b.com', service: 'Dialysis', details: 'x' },
      contact: validContact,
      event: { name: 'A', phone: '9', email: 'a@b.com', event_name: 'Game' },
      government: { name: 'A', organization: 'B', agencyType: 'City', email: 'a@b.com', service: 'Ambulance', message: 'x' },
    }
    for (const formType of FORM_TYPES) {
      const result = validateSubmission(formType, goodBodies[formType])
      expect(result.ok, `${formType} should validate`).toBe(true)
    }
  })
})

describe('escapeHtml', () => {
  it('escapes HTML-significant characters', () => {
    expect(escapeHtml('<script>alert("x")</script>')).toBe('&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;')
  })
  it('handles null/undefined safely', () => {
    expect(escapeHtml(null)).toBe('')
    expect(escapeHtml(undefined)).toBe('')
  })
})

describe('email templates', () => {
  const data = { name: 'Jane Doe', email: 'jane@example.com', message: '<b>hi</b>' }
  const args = { config: FORM_CONFIGS.contact, data, submittedAt: 'July 28, 2026 at 9:00 AM', source: '/contact' }

  it('renders an HTML email containing every field label and escaped values', () => {
    const html = renderHtmlEmail(args)
    expect(html).toContain('Jane Doe')
    expect(html).toContain('&lt;b&gt;hi&lt;/b&gt;')
    expect(html).not.toContain('<b>hi</b>')
    expect(html).toContain('Submitted: July 28, 2026 at 9:00 AM')
    expect(html).toContain('Source: /contact')
  })

  it('renders a plain-text fallback with every field', () => {
    const text = renderTextEmail(args)
    expect(text).toContain('Full Name: Jane Doe')
    expect(text).toContain('Message: <b>hi</b>') // text email is not HTML-escaped
    expect(text).toContain('Submitted: July 28, 2026 at 9:00 AM')
    expect(text).toContain('Source: /contact')
  })

  it('shows "(not provided)" for empty optional fields', () => {
    const text = renderTextEmail({ ...args, data: { name: 'Jane', email: 'j@e.com', message: '' } })
    // message is empty here even though required at validation time — template must not crash
    expect(text).toContain('(not provided)')
  })
})
