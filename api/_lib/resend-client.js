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

// Sends the staff notification email. Returns { ok: true } or
// { ok: false, reason } — never throws, so callers always get a
// definite answer to gate the success/error response on.
export async function sendNotificationEmail({ subject, html, text, replyTo }) {
  const resend = getClient()
  const to = process.env.FORM_NOTIFICATION_EMAIL
  const from = process.env.FORM_FROM_EMAIL || DEFAULT_FROM

  if (!resend) return { ok: false, reason: 'Email delivery is not configured (missing RESEND_API_KEY).' }
  if (!to) return { ok: false, reason: 'Email delivery is not configured (missing FORM_NOTIFICATION_EMAIL).' }

  try {
    const { error } = await resend.emails.send({
      from,
      to,
      subject,
      html,
      text,
      reply_to: replyTo || undefined,
    })
    if (error) return { ok: false, reason: error.message || 'Resend rejected the request.' }
    return { ok: true }
  } catch (err) {
    return { ok: false, reason: err?.message || 'Unexpected email delivery error.' }
  }
}
