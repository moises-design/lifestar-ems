// Fixed-window in-memory rate limit for the public form-submission
// endpoint: at most `LIMIT` requests per IP within `WINDOW_MS`. This
// endpoint sends a real email for every valid POST with no auth, so
// without this a script can mint a fresh submissionId per request
// (submissionId dedupe is caller-controlled and doesn't stop that) and
// flood the staff inbox / exhaust the Resend quota.
//
// Mirrors the policy already designed for this project's Supabase
// Edge Function (supabase/functions/submit-inquiry/validate.js:
// isRateLimited, 5 per 10 minutes per hashed IP) but reimplemented as
// a dependency-free in-memory store, consistent with api/_lib/dedupe.js,
// since this endpoint has no database of its own. Like that module,
// this is best-effort: a serverless instance can be reused across
// nearby invocations, which is enough to catch real abuse bursts, but
// it isn't a durable, cross-instance limit.

const WINDOW_MS = 10 * 60 * 1000
const LIMIT = 5

const counts = new Map() // ip -> { count, windowStart }

function sweep(now) {
  for (const [ip, entry] of counts) {
    if (now - entry.windowStart >= WINDOW_MS) counts.delete(ip)
  }
}

// Returns true if `ip` has exceeded the limit for the current window.
// Always counts the call (including the one that trips the limit), so
// the caller should check this before doing any real work for the
// request.
export function isRateLimited(ip) {
  if (!ip || typeof ip !== 'string') return false
  const now = Date.now()
  sweep(now)

  const entry = counts.get(ip)
  if (!entry || now - entry.windowStart >= WINDOW_MS) {
    counts.set(ip, { count: 1, windowStart: now })
    return false
  }
  entry.count += 1
  return entry.count > LIMIT
}

// Exposed for tests only, to reset state between cases.
export function _resetRateLimitStoreForTests() {
  counts.clear()
}
