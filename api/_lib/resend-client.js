// Thin wrapper around the Resend SDK. Kept isolated in its own module
// so tests can mock the `resend` package import without touching the
// validation/template logic, and so RESEND_API_KEY is read in exactly
// one place, server-side only — this file is never imported by
// anything under src/, so it never reaches the Vite client bundle.

import { Resend } from 'resend'

const DEFAULT_FROM = 'Life Star EMS Website <onboarding@resend.dev>'

let cachedClient = null
function getClient() {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return null
  if (!cachedClient) cachedClient = new Resend(apiKey)
  return cachedClient
}

// Logs a delivery failure with only non-secret, operationally useful
// fields — the configured `to`/`from` (config values, not user PII),
// the Resend SDK's error classification (`code`/`status`), and a
// human-readable reason. Deliberately never logs RESEND_API_KEY (never
// in scope here) or the submitter's own data (name/email/message),
// consistent with keeping staff-notification failure logs free of
// visitor PII. Without this, every failure mode below — a missing/
// invalid key, an unverified sender domain, a bad recipient, or a
// transient network error — produced the exact same generic 502 with
// nothing in the logs to tell them apart.
function logDeliveryFailure({ to, from, code, status, reason }) {
  console.error('[submit-form] Resend delivery failed', { to, from, code, status, reason })
}

// Sends the staff notification email. Returns { ok: true } or
// { ok: false, reason } — never throws, so callers always get a
// definite answer to gate the success/error response on.
export async function sendNotificationEmail({ subject, html, text, replyTo }) {
  const resend = getClient()
  const to = process.env.FORM_NOTIFICATION_EMAIL
  const from = process.env.FORM_FROM_EMAIL || DEFAULT_FROM

  if (!resend) {
    const reason = 'Email delivery is not configured (missing RESEND_API_KEY).'
    logDeliveryFailure({ to, from, code: 'missing_api_key', status: null, reason })
    return { ok: false, reason }
  }
  if (!to) {
    const reason = 'Email delivery is not configured (missing FORM_NOTIFICATION_EMAIL).'
    logDeliveryFailure({ to, from, code: 'missing_notification_email', status: null, reason })
    return { ok: false, reason }
  }

  try {
    const { error } = await resend.emails.send({
      from,
      to,
      subject,
      html,
      text,
      // The Resend Node SDK's CreateEmailOptions type uses the
      // camelCase `replyTo` (it translates to the API's `reply_to`
      // internally) — passing `reply_to` directly is silently dropped
      // as an unrecognized field, so Reply-To never actually applies.
      replyTo: replyTo || undefined,
    })
    if (error) {
      const reason = error.message || 'Resend rejected the request.'
      logDeliveryFailure({ to, from, code: error.name || 'unknown', status: error.statusCode ?? null, reason })
      return { ok: false, reason }
    }
    return { ok: true }
  } catch (err) {
    const reason = err?.message || 'Unexpected email delivery error.'
    logDeliveryFailure({ to, from, code: 'thrown_exception', status: null, reason })
    return { ok: false, reason }
  }
}
