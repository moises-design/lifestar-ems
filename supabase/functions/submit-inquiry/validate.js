// Pure validation/shaping logic for inbound inquiry submissions, kept
// framework-agnostic (no Deno-specific APIs) so it can run both inside
// the Edge Function (supabase/functions/submit-inquiry/index.ts imports
// this file directly — Deno supports plain ESM imports) and under Vitest
// in tests/unit/form-validation.test.js, without needing a Deno runtime
// or a live Supabase project to test the logic itself.

export const INQUIRY_TYPES = [
  'general', 'dialysis', 'therapy', 'pediatrics', 'events', 'long-distance', 'government',
]

const NAME_MAX = 120
const PHONE_MAX = 30
const EMAIL_MAX = 200
const TEXT_MAX = 4000
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function trimmedString(value, max) {
  if (typeof value !== 'string') return ''
  return value.trim().slice(0, max)
}

// Validates and shapes a raw JSON body into a safe record ready for
// insertion. Returns { ok: true, data } or { ok: false, errors }.
// This never throws on malformed input — it always returns a result.
export function validateInquiry(body) {
  const errors = []
  if (!body || typeof body !== 'object') {
    return { ok: false, errors: ['Request body must be a JSON object.'] }
  }

  // Honeypot: a real visitor never fills this hidden field. Treated as a
  // silent success (not an error) so bots don't learn the check exists.
  if (trimmedString(body.website, 200)) {
    return { ok: true, honeypot: true, data: null }
  }

  const name = trimmedString(body.name, NAME_MAX)
  if (!name) errors.push('Name is required.')

  const email = trimmedString(body.email, EMAIL_MAX)
  if (!email || !EMAIL_RE.test(email)) errors.push('A valid email is required.')

  const phone = trimmedString(body.phone, PHONE_MAX)

  const message = trimmedString(body.message, TEXT_MAX)
  if (!message) errors.push('A message is required.')

  const inquiryType = INQUIRY_TYPES.includes(body.inquiry_type) ? body.inquiry_type : 'general'
  const source = trimmedString(body.source, 60) || 'website'

  if (errors.length) return { ok: false, errors }

  return {
    ok: true,
    honeypot: false,
    data: { name, email, phone, message, inquiry_type: inquiryType, source, status: 'new' },
  }
}

// Fixed-window rate limiting: at most `limit` submissions per `ip_hash`
// per `windowMs`. Pure function over a "now" count so it's testable
// without a database — the Edge Function itself does the DB read/write
// this decides for.
export function isRateLimited({ countInWindow, limit = 5 }) {
  return countInWindow >= limit
}
