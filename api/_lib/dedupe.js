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
export function isDuplicateSubmission(submissionId) {
  if (!submissionId || typeof submissionId !== 'string') return false
  const now = Date.now()
  sweep(now)
  if (seen.has(submissionId)) return true
  seen.set(submissionId, now + TTL_MS)
  return false
}

// Exposed for tests only, to reset state between cases.
export function _resetDedupeStoreForTests() {
  seen.clear()
}
