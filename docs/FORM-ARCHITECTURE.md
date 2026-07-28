# Form architecture: current state and the server-side upgrade

Mission: Complete Life Star EMS Website Experience Transformation, Phase 23.

> **Update — form email notifications mission:** four of this page's
> five forms (Contact, Request Transport, Event EMS Standby, Government
> Contracting) have since been migrated to a **different** secure
> server-side implementation than the one this document describes: a
> shared Vercel serverless endpoint, `POST /api/submit-form` (see
> `api/submit-form.js` and `api/_lib/`), which validates every
> submission server-side and emails a staff notification via Resend —
> deployed and wired to the live forms, not the "not deployed" state
> described below. See `README.md`'s "Resend Setup" section for the
> required environment variables. The Supabase Edge Function
> (`supabase/functions/submit-inquiry/`) described in the rest of this
> document was **not** used for that migration and remains undeployed;
> it is still the relevant reference for `LongDistanceTransport.jsx`
> (`/services/long-distance`), the one form this migration did not
> touch and which still writes directly to Supabase's
> `long_distance_requests` table exactly as described below.

## Current state (live today)

All five forms (Contact, Request Transport, Event EMS, Long-Distance
Transport, Government Contracting inquiry) write directly from the
browser to Supabase via `@supabase/supabase-js` using the public anon
key, into `contact_submissions` or `long_distance_requests`. Row-level
security correctly restricts `anon` to `INSERT` only (no read/update/
delete), and every form now includes a client-side honeypot field and a
`PrivacyNotice`. What this architecture cannot do: enforce schema
validation server-side, apply real rate limiting, or send a staff
notification — a client-side honeypot only stops bots that execute the
React form's JavaScript; nothing stops a script from POSTing straight to
Supabase's REST endpoint with the (necessarily public) anon key.

## What this mission built

- **`supabase/functions/submit-inquiry/`** — a Supabase Edge Function
  (Deno) that validates and shapes every submission
  (`validate.js`, framework-agnostic, unit-tested in
  `tests/unit/form-validation.test.js`), enforces a server-side honeypot
  check, applies a 10-minute fixed-window rate limit (5 submissions per
  hashed IP, tracked in the new `submission_rate_limits` table), verifies
  a Cloudflare Turnstile token when `TURNSTILE_SECRET_KEY` is configured
  (skips verification, rather than blocking real users, when it isn't),
  inserts the validated record with structured `inquiry_type`/`source`/
  `status` audit fields, and sends a minimal-content staff email via
  Resend when `RESEND_API_KEY`/`NOTIFY_EMAIL` are configured.
- **`supabase/migrations/003_form_hardening.sql`** — additive schema
  changes supporting the function: `inquiry_type`/`source`/`status`/
  `user_agent` columns on both existing tables, and the new
  `submission_rate_limits` table (RLS enabled with zero grants — only
  the function's service-role key can touch it). Nothing here breaks the
  current client-side-insert flow; every new column is nullable or
  defaulted.

## Deployment status: NOT deployed, honestly documented

This sandbox has no production Supabase project reference and no real
credentials — `.env.example` contains only placeholder values, and no
`.env` file exists anywhere in the working tree (the same constraint
documented in `docs/NOTICE-OF-PRIVACY-PRACTICES-REQUIRED.md` for the
HIPAA/BAA check). There is also no `RESEND_API_KEY`, `NOTIFY_EMAIL`, or
`TURNSTILE_SECRET_KEY` available here. As a result:

- The migration has **not** been applied to any live database.
- The Edge Function has **not** been deployed.
- The live forms have **not** been rewired to call it — they still POST
  directly to Supabase exactly as before. Cutting them over before the
  function exists in production would break every form on the site.

This matches the mission's own explicit instruction for this exact
situation: *"if no provider credentials exist, implement the interface,
environment contract, and tests, but report the configuration blocker
honestly."*

## Cutover steps (for whoever has project access)

1. Apply `supabase/migrations/003_form_hardening.sql` to the production
   database (`supabase db push` or the SQL editor).
2. Deploy the function: `supabase functions deploy submit-inquiry`.
3. Set secrets: `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` (set
   automatically by Supabase for deployed functions), `ALLOWED_ORIGIN`
   (`https://www.lifestaremsrgv.com`), and optionally
   `TURNSTILE_SECRET_KEY` / `RESEND_API_KEY` + `NOTIFY_EMAIL` +
   `NOTIFY_FROM` — every one of these is optional except the Supabase
   pair; the function degrades gracefully (skips Turnstile, skips the
   email) when the optional ones are unset, rather than failing closed.
4. Update each form component (`src/components/Contact.jsx`,
   `src/pages/RequestCoverage.jsx`, `src/pages/EventStandby.jsx`,
   `src/pages/LongDistanceTransport.jsx`) to `fetch()` the function's URL
   instead of calling `supabase.from(...).insert(...)` directly.
5. Once the cutover is confirmed working, consider tightening the
   `anon` INSERT policies on `contact_submissions`/`long_distance_requests`
   (they can stay as-is with no functional harm, since the function's
   validation is what matters for spam/abuse — but removing direct anon
   insert access closes the "bot skips the React form" gap completely).
6. If a Cloudflare Turnstile site key is added to the client forms, wire
   the widget in and pass its token as `turnstileToken` in each POST
   body — the function already verifies it when present.
