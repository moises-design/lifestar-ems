// Small response helpers shared by API routes.

export function sendJson(res, status, body) {
  res.status(status).json(body)
}

// Returns false (and writes the 405 response) if the request method
// isn't in `allowed`. Callers should return immediately when this
// returns false.
export function requireMethod(req, res, allowed) {
  if (!allowed.includes(req.method)) {
    res.setHeader('Allow', allowed.join(', '))
    sendJson(res, 405, { error: 'Method not allowed' })
    return false
  }
  return true
}
