// Shared client-side helper for the four forms wired to
// /api/submit-form (Request Transport, Contact, Event EMS Standby,
// Government Contracting). Never shows a success state on its own —
// callers only get a resolved promise when the server actually
// confirmed acceptance, or a rejected promise with a user-facing
// message otherwise.

export async function submitForm(formType, fields) {
  let response
  try {
    response = await fetch('/api/submit-form', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ formType, ...fields }),
    })
  } catch {
    throw new Error('Something went wrong. Please try again or call us.')
  }

  let payload = null
  try {
    payload = await response.json()
  } catch {
    // fall through to the generic error below
  }

  if (!response.ok || !payload?.ok) {
    throw new Error(payload?.error || 'Something went wrong. Please try again or call us.')
  }

  return payload
}

// One id per fresh form: reused across a double-click on the same
// in-flight submit (so the server's dedupe guard treats it as one
// request), regenerated after each terminal (sent/error) state so the
// next real submission gets its own id.
export function newSubmissionId() {
  return crypto.randomUUID()
}
