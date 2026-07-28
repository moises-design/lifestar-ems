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
import { isDuplicateSubmission } from './_lib/dedupe.js'
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

export default async function handler(req, res) {
  if (!requireMethod(req, res, ['POST'])) return

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
    return sendJson(res, 502, {
      error: 'We could not send your request right now. Please call (956) 660-6543.',
    })
  }

  return sendJson(res, 200, { ok: true })
}
