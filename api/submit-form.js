// POST /api/submit-form — shared server-side intake for all four public
// forms (Request Transport, Contact, Event EMS Standby, Government
// Contracting). Validates and sanitizes the submission, then sends a
// staff notification email via Resend. RESEND_API_KEY is read only in
// api/_lib/resend-client.js, which nothing under src/ imports, so it
// never reaches the client bundle.
import { FORM_CONFIGS } from './_lib/forms.js'
import { validateSubmission } from './_lib/validate.js'
import { renderHtmlEmail, renderTextEmail } from './_lib/email-template.js'
import { sendNotificationEmail } from './_lib/resend-client.js'
import { isDuplicateSubmission, clearSubmission } from './_lib/dedupe.js'
import { isRateLimited } from './_lib/rate-limit.js'
import { requireMethod, sendJson } from './_lib/respond.js'

function parseBody(req) {
  if (!req.body) return {}
  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body)
    } catch {
      return null
    }
  }
  return req.body
}

function clientIp(req) {
  const forwarded = req.headers?.['x-forwarded-for']
  if (typeof forwarded === 'string' && forwarded) return forwarded.split(',')[0].trim()
  return req.socket?.remoteAddress || null
}

export default async function handler(req, res) {
  if (!requireMethod(req, res, ['POST'])) return

  if (isRateLimited(clientIp(req))) {
    return sendJson(res, 429, { error: 'Too many submissions. Please try again later, or call (956) 660-6543.' })
  }

  const body = parseBody(req)
  if (body === null) {
    return sendJson(res, 400, { error: 'Invalid JSON body.' })
  }

  const { formType, submissionId } = body

  // Duplicate rapid submit (e.g. a double-click before the button's
  // disabled state takes effect): treat as the same request, not a
  // new inquiry, and not an error the user needs to see.
  if (isDuplicateSubmission(submissionId)) {
    return sendJson(res, 200, { ok: true, duplicate: true })
  }

  const validated = validateSubmission(formType, body)
  if (!validated.ok) {
    // No email was sent for this id — clear it so a retry after fixing
    // the input isn't misreported as a duplicate success.
    clearSubmission(submissionId)
    return sendJson(res, validated.status, { error: validated.error })
  }
  if (validated.honeypot) {
    // Silently accept without sending anything — a real visitor never
    // fills the hidden field, so this only ever fires for bots.
    return sendJson(res, 200, { ok: true })
  }

  const config = FORM_CONFIGS[formType]
  const submittedAt = new Date().toLocaleString('en-US', {
    timeZone: 'America/Chicago',
    dateStyle: 'full',
    timeStyle: 'short',
  })

  const html = renderHtmlEmail({ config, data: validated.data, submittedAt, source: config.pageSource })
  const text = renderTextEmail({ config, data: validated.data, submittedAt, source: config.pageSource })

  const result = await sendNotificationEmail({
    subject: config.subject,
    html,
    text,
    replyTo: validated.data[config.emailField],
  })

  if (!result.ok) {
    // Delivery failed — no email was actually sent, so clear the id
    // the same way as a validation failure: a retry must not be
    // reported as a duplicate of a request that never succeeded.
    clearSubmission(submissionId)
    return sendJson(res, 502, {
      error: 'We could not send your request right now. Please call (956) 660-6543.',
    })
  }

  return sendJson(res, 200, { ok: true })
}
