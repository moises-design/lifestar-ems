-- =============================================================================
-- 004 — Lock down anon access to ePCR tables (security only)
-- Applied to production Supabase project lifestar-ems on 2026-10-19 (CT)
-- with Moises's approval, as migration "lockdown_anon_rls_2026_10_19"
-- (schema_migrations version 20261019210129). This file records exactly what
-- was applied; do not re-run it against production.
--
-- Before: "anon all" policies (FOR ALL TO public USING true / CHECK true) on
-- patients, pcr_reports, staff, units, plus a public read on allowed_users,
-- and full anon table grants. Anyone with the public anon key could read and
-- write those tables.
--
-- After:
--   * anon has no privileges on patients, pcr_reports, staff, units, allowed_users
--   * SELECT/INSERT/UPDATE require a signed-in user with a confirmed email that is
--     listed in allowed_users for the row's tenant; DELETE also requires role 'admin'
--   * allowed_users: a signed-in user can read only their own row; no client writes
--   * public.rls_auto_enable() is no longer executable by PUBLIC/anon/authenticated
-- Untouched: tenants, contact_submissions, long_distance_requests (the
-- marketing site's anon INSERT path is unchanged).
-- Contains no secrets, keys, or data.
-- =============================================================================
-- ---------------------------------------------------------------------------
-- 0. Helper in a schema the API doesn't expose (private), so it can't be called via RPC
-- ---------------------------------------------------------------------------
CREATE SCHEMA IF NOT EXISTS private;
REVOKE ALL ON SCHEMA private FROM PUBLIC, anon;
GRANT USAGE ON SCHEMA private TO authenticated, service_role;

CREATE OR REPLACE FUNCTION private.is_tenant_staff(p_tenant_id uuid, p_require_admin boolean DEFAULT false)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM auth.users u
    JOIN public.allowed_users a ON lower(a.email) = lower(u.email)
    JOIN public.tenants t       ON t.slug = a.tenant_slug
    WHERE u.id = (SELECT auth.uid())
      AND u.email_confirmed_at IS NOT NULL
      AND t.id = p_tenant_id
      AND (NOT p_require_admin OR a.role = 'admin')
  );
$$;

REVOKE ALL ON FUNCTION private.is_tenant_staff(uuid, boolean) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION private.is_tenant_staff(uuid, boolean) TO authenticated, service_role;

-- ---------------------------------------------------------------------------
-- 1. Drop the wide-open policies
-- ---------------------------------------------------------------------------
DROP POLICY IF EXISTS "anon all patients"         ON public.patients;
DROP POLICY IF EXISTS "anon all pcr_reports"      ON public.pcr_reports;
DROP POLICY IF EXISTS "anon all staff"            ON public.staff;
DROP POLICY IF EXISTS "anon all units"            ON public.units;
DROP POLICY IF EXISTS "public read allowed_users" ON public.allowed_users;

-- ---------------------------------------------------------------------------
-- 2. Revoke anon table privileges
-- ---------------------------------------------------------------------------
REVOKE ALL ON TABLE public.patients, public.pcr_reports, public.staff,
                    public.units, public.allowed_users FROM anon;

-- Keep RLS on (it already is; this is a no-op safety net)
ALTER TABLE public.patients      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pcr_reports   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.staff         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.units         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.allowed_users ENABLE ROW LEVEL SECURITY;

-- ---------------------------------------------------------------------------
-- 3. Authenticated, tenant-scoped staff policies
-- ---------------------------------------------------------------------------
DO $do$
DECLARE
  tbl text;
BEGIN
  FOREACH tbl IN ARRAY ARRAY['patients','pcr_reports','staff','units'] LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON public.%I', 'staff select '||tbl, tbl);
    EXECUTE format('DROP POLICY IF EXISTS %I ON public.%I', 'staff insert '||tbl, tbl);
    EXECUTE format('DROP POLICY IF EXISTS %I ON public.%I', 'staff update '||tbl, tbl);
    EXECUTE format('DROP POLICY IF EXISTS %I ON public.%I', 'admin delete '||tbl, tbl);

    EXECUTE format($p$CREATE POLICY %I ON public.%I FOR SELECT TO authenticated
                      USING ((SELECT private.is_tenant_staff(tenant_id)))$p$,
                   'staff select '||tbl, tbl);
    EXECUTE format($p$CREATE POLICY %I ON public.%I FOR INSERT TO authenticated
                      WITH CHECK ((SELECT private.is_tenant_staff(tenant_id)))$p$,
                   'staff insert '||tbl, tbl);
    EXECUTE format($p$CREATE POLICY %I ON public.%I FOR UPDATE TO authenticated
                      USING ((SELECT private.is_tenant_staff(tenant_id)))
                      WITH CHECK ((SELECT private.is_tenant_staff(tenant_id)))$p$,
                   'staff update '||tbl, tbl);
    EXECUTE format($p$CREATE POLICY %I ON public.%I FOR DELETE TO authenticated
                      USING ((SELECT private.is_tenant_staff(tenant_id, true)))$p$,
                   'admin delete '||tbl, tbl);
  END LOOP;
END
$do$;

-- allowed_users: read own row only; writes only via service_role / dashboard
DROP POLICY IF EXISTS "read own allowed_users row" ON public.allowed_users;
CREATE POLICY "read own allowed_users row" ON public.allowed_users
  FOR SELECT TO authenticated
  USING (lower(email) = lower((SELECT auth.jwt()) ->> 'email'));

-- ---------------------------------------------------------------------------
-- 4. rls_auto_enable(): not callable by API roles
-- ---------------------------------------------------------------------------
REVOKE EXECUTE ON FUNCTION public.rls_auto_enable() FROM PUBLIC, anon, authenticated;

-- ---------------------------------------------------------------------------
-- OPTIONAL hardening (not in approved scope, left commented):
-- TRUNCATE skips RLS. The API can't issue it, but a direct SQL login with the
-- authenticated role could.
-- REVOKE TRUNCATE, TRIGGER, REFERENCES ON TABLE public.patients, public.pcr_reports,
--   public.staff, public.units, public.allowed_users FROM authenticated;
-- REVOKE INSERT, UPDATE, DELETE ON TABLE public.allowed_users FROM authenticated;
-- ---------------------------------------------------------------------------
