// Supabase Edge Function: server-side inquiry intake for every form on
// lifestaremsrgv.com (Contact, Request Transport, Event EMS, Long-Distance).
//
// This exists because the current client-side-only architecture (browser
// -> Supabase anon key -> INSERT) has no schema validation, no real spam
// protection (the client-side honeypot only stops browsers that run the
// React form; a bot can POST straight to Supabase's REST endpoint, since
// the anon key is necessarily public), no rate limiting, and no staff
// notification. See docs/COMPLETE-EXPERIENCE-AUDIT.md §12.
//
// DEPLOYMENT STATUS: written and reviewable, NOT deployed or wired to
// the live forms from this session. This sandbox has no production
// Supabase project reference or credentials (see
// docs/NOTICE-OF-PRIVACY-PRACTICES-REQUIRED.md for the same constraint
// affecting the HIPAA/BAA check) and no RESEND_API_KEY/TURNSTILE
// secret, so this could not be deployed or end-to-end tested from here.
// See docs/FORM-ARCHITECTURE.md for the exact cutover steps once an
// owner or a session with project access deploys this.
//
// deno-lint-ignore-file no-explicit-any
import { createClient } from 'jsr:@supabase/supabase-js@2'
import { validateInquiry, isRateLimited, buildRecord } from './validate.js'

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': Deno.env.get('ALLOWED_ORIGIN') ?? 'https://www.lifestaremsrgv.com',
  'Access-Control-Allow-Headers': 'content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
  })
}

async function hashIp(ip: string): Promise<string> {
  const salt = Deno.env.get('RATE_LIMIT_SALT') ?? 'lifestar-ems'
  const data = new TextEncoder().encode(`${salt}:${ip}`)
  const digest = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(digest)).map(b => b.toString(16).padStart(2, '0')).join('')
}

async function verifyTurnstile(token: string | undefined, ip: string): Promise<boolean> {
  const secret = Deno.env.get('TURNSTILE_SECRET_KEY')
  if (!secret) return true // not configured: skip, don't block real submissions
  if (!token) return false
  const resp = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ secret, response: token, remoteip: ip }),
  })
  const result = await resp.json()
  return result.success === true
}

async function sendNotification(record: Record<string, any>, table: string) {
  const apiKey = Deno.env.get('RESEND_API_KEY')
  const notifyTo = Deno.env.get('NOTIFY_EMAIL')
  if (!apiKey || !notifyTo) return { sent: false, reason: 'not configured' }

  // Minimal content only: name/email/phone/type and a short excerpt, not
  // the full free-text message (keeps notification emails free of
  // whatever a submitter typed, reducing the sensitive-data surface of
  // an email inbox).
  const excerpt = String(record.message ?? record.notes ?? '').slice(0, 200)
  const subject = `New ${record.inquiry_type ?? 'long-distance'} inquiry — Life Star EMS website`
  const text = [
    `Table: ${table}`,
    `Name: ${record.name}`,
    `Email: ${record.email}`,
    `Phone: ${record.phone || '(not provided)'}`,
    `Type: ${record.inquiry_type ?? 'long-distance transport'}`,
    `Excerpt: ${excerpt}`,
    '',
    'Full details are in the Supabase dashboard.',
  ].join('\n')

  const resp = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'content-type': 'application/json' },
    body: JSON.stringify({
      from: Deno.env.get('NOTIFY_FROM') ?? 'notifications@lifestaremsrgv.com',
      to: notifyTo,
      subject,
      text,
    }),
  })
  return { sent: resp.ok, reason: resp.ok ? null : `Resend responded ${resp.status}` }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: CORS_HEADERS })
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405)

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown'
  const userAgent = req.headers.get('user-agent') ?? ''

  let body: any
  try {
    body = await req.json()
  } catch {
    return json({ error: 'Invalid JSON body' }, 400)
  }

  const table = body.table === 'long_distance_requests' ? 'long_distance_requests' : 'contact_submissions'

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
  )

  const ipHash = await hashIp(ip)

  // Fixed-window (10 minute) rate limit, 5 submissions per IP hash.
  const windowMs = 10 * 60 * 1000
  const windowStart = new Date(Math.floor(Date.now() / windowMs) * windowMs).toISOString()
  const { data: existing } = await supabase
    .from('submission_rate_limits')
    .select('count')
    .eq('ip_hash', ipHash)
    .eq('window_start', windowStart)
    .maybeSingle()

  if (isRateLimited({ countInWindow: existing?.count ?? 0 })) {
    return json({ error: 'Too many submissions. Please try again later, or call (956) 660-6543.' }, 429)
  }

  const turnstileOk = await verifyTurnstile(body.turnstileToken, ip)
  if (!turnstileOk) return json({ error: 'Verification failed. Please try again.' }, 400)

  const validated = validateInquiry(body)
  if (!validated.ok) return json({ error: validated.errors.join(' ') }, 400)
  if (validated.honeypot) return json({ ok: true }) // silently accept, insert nothing

  const record = buildRecord(table, validated.data, body, userAgent)

  const { error: insertError } = await supabase.from(table).insert([record])
  if (insertError) return json({ error: 'Could not save your request. Please call (956) 660-6543.' }, 500)

  await supabase.from('submission_rate_limits').upsert(
    { ip_hash: ipHash, window_start: windowStart, count: (existing?.count ?? 0) + 1 },
    { onConflict: 'ip_hash,window_start' },
  )

  const notification = await sendNotification(record, table)
  return json({ ok: true, notified: notification.sent })
})
