// Best-effort in-memory idempotency guard against rapid duplicate
// submissions (e.g. a double-click before the client's own disabled-
// button state applies). The client generates one `submissionId` per
// fresh form and reuses it for the current in-flight submit, so a
// repeat request for the same id within the window is treated as the
// same click, not a new inquiry.
//
// This is intentionally simple and dependency-free (no Redis/DB): a
// serverless function instance can be reused across nearby invocations,
// which is enough to catch the realistic "user double-clicked the
// button" case this guards against. It is a defense-in-depth layer on
// top of the client-side ref guard and disabled button, not the sole
// protection.

const seen = new Map() // submissionId -> expiry timestamp (ms)
const TTL_MS = 60_000

function sweep(now) {
  for (const [id, expiry] of seen) {
    if (expiry < now) seen.delete(id)
  }
}

// Returns true if this submissionId was already seen within the TTL
// window (i.e. this request should be treated as a duplicate).
// Marks the id as seen immediately (before validation/delivery runs)
// so two genuinely concurrent requests for the same id — the actual
// double-click case this exists for — both see it as taken. Callers
// MUST pair this with clearSubmission() when the request turns out to
// be a validation or delivery failure, so a legitimate retry after a
// fixed/transient error isn't misreported as a duplicate success.
export function isDuplicateSubmission(submissionId) {
  if (!submissionId || typeof submissionId !== 'string') return false
  const now = Date.now()
  sweep(now)
  if (seen.has(submissionId)) return true
  seen.set(submissionId, now + TTL_MS)
  return false
}

// Removes a submissionId from the seen set. Call this when a request
// did NOT result in an email actually being sent (validation error or
// delivery failure), so the client's retry with the same id — it only
// generates a fresh id after a successful send — isn't classified as
// a duplicate of a request that never succeeded.
export function clearSubmission(submissionId) {
  if (!submissionId || typeof submissionId !== 'string') return
  seen.delete(submissionId)
}

// Exposed for tests only, to reset state between cases.
export function _resetDedupeStoreForTests() {
  seen.clear()
}
