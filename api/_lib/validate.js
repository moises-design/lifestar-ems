// Server-side validation and sanitization for inbound form submissions.
// Pure functions (no Vercel/Node-specific APIs) so they're directly
// unit-testable without an HTTP layer.

import { FORM_CONFIGS } from './forms.js'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const HONEYPOT_MAX = 200

function trimmedString(value, max) {
  if (typeof value !== 'string') return ''
  return value.trim().slice(0, max)
}

// Validates and shapes a raw JSON body for `formType` into a safe data
// object. Never throws on malformed input. Returns one of:
//   { ok: false, status, error }                 — reject
//   { ok: true, honeypot: true, data: null }      — silently-dropped spam
//   { ok: true, honeypot: false, data }           — good submission
export function validateSubmission(formType, body) {
  const config = FORM_CONFIGS[formType]
  if (!config) {
    return { ok: false, status: 400, error: 'Unsupported form type.' }
  }
  if (!body || typeof body !== 'object') {
    return { ok: false, status: 400, error: 'Request body must be a JSON object.' }
  }

  // Honeypot: a real visitor never fills this hidden field. Treated as a
  // silent success (not an error) so bots don't learn the check exists —
  // matches the client-side honeypot already present on every form.
  if (trimmedString(body.website, HONEYPOT_MAX)) {
    return { ok: true, honeypot: true, data: null }
  }

  const errors = []
  const data = {}

  for (const field of config.fields) {
    if (field.type === 'checkbox') {
      data[field.key] = body[field.key] === true
      continue
    }
    const value = trimmedString(body[field.key], field.max ?? 1000)
    if (field.required && !value) {
      errors.push(`${field.label} is required.`)
    }
    if (value && field.isEmail && !EMAIL_RE.test(value)) {
      errors.push(`A valid ${field.label.toLowerCase()} is required.`)
    }
    data[field.key] = value
  }

  if (errors.length) {
    return { ok: false, status: 400, error: errors.join(' ') }
  }

  return { ok: true, honeypot: false, data }
}

// Escapes text for safe embedding in the HTML email body. Applied at
// render time (not at validation time) so `data` stays plain, readable
// text for the text-email fallback and for tests.
export function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, (ch) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[ch]))
}
