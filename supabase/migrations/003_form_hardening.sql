-- ============================================
-- Life Star EMS — Form hardening (Phase 23)
-- Additive columns + a rate-limit table supporting
-- supabase/functions/submit-inquiry. Safe to run even before that
-- function is deployed: existing client-side inserts keep working
-- unchanged (every new column is nullable or defaulted), and the
-- existing anon INSERT-only RLS policies are untouched.
-- ============================================

-- Structured audit fields so submissions can be filtered/reported by
-- type and source without parsing free-text messages, and so staff can
-- track review status.
ALTER TABLE contact_submissions
  ADD COLUMN IF NOT EXISTS inquiry_type TEXT DEFAULT 'general',
  ADD COLUMN IF NOT EXISTS source TEXT DEFAULT 'website',
  ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'new',
  ADD COLUMN IF NOT EXISTS user_agent TEXT;

ALTER TABLE long_distance_requests
  ADD COLUMN IF NOT EXISTS source TEXT DEFAULT 'website',
  ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'new',
  ADD COLUMN IF NOT EXISTS user_agent TEXT;

-- Server-side rate limiting for supabase/functions/submit-inquiry. Keyed
-- by a salted hash of the submitter's IP (never the raw IP) plus a time
-- window. No RLS policy grants anon or authenticated access at all —
-- only the Edge Function's service-role key can read or write this
-- table, by design.
CREATE TABLE IF NOT EXISTS submission_rate_limits (
  id           BIGSERIAL PRIMARY KEY,
  ip_hash      TEXT NOT NULL,
  window_start TIMESTAMPTZ NOT NULL,
  count        INTEGER NOT NULL DEFAULT 1,
  UNIQUE (ip_hash, window_start)
);

ALTER TABLE submission_rate_limits ENABLE ROW LEVEL SECURITY;
-- Intentionally no policies: RLS enabled with zero grants denies all
-- access from anon/authenticated roles; only the service role (which
-- bypasses RLS) can touch this table.

-- ============================================
-- Verify: after running,
-- SELECT column_name FROM information_schema.columns
--   WHERE table_name = 'contact_submissions';
-- ============================================
