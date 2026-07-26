# Life Star EMS — Deployment Audit

Date: 2026-07-23
Sources: local git repository, GitHub API, Vercel API (team
`moises-2458s-projects`), DNS resolution. Direct HTTP inspection of the live
site was blocked by this sandbox's network policy; items depending on it are
marked accordingly.

---

## 1. Git state

| Item | Value |
|---|---|
| Current audit branch | `claude/lifestar-ems-audit-iuemy7` |
| Based on | `master` @ `252e249` ("Fix mobile menu", 2026-04-15) |
| Default branch (GitHub) | `master` (the only branch besides the audit branch) |
| Remote | `origin` → github.com `moises-design/lifestar-ems` (via session git proxy) |
| History | 13 commits, all authored 2026-04-14 → 2026-04-15; no changes since |
| Git author on commits | `Life Star EMS <dev@lifestaremsrgv.com>` |

## 2. Vercel configuration (repository side)

`vercel.json`:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

- SPA rewrite is correct for React Router deep links: direct visits to
  `/services/dialysis` etc. will serve `index.html` with HTTP 200 wherever this
  config is deployed. (Live verification pending — see section 6.)
- No redirects (www/apex canonicalization is therefore handled, if at all, in
  the Vercel dashboard domain settings of whichever project owns the domain).
- No headers configuration (no cache or security headers customized).
- There is **no `.vercel/project.json`** in the repo, so the repo itself does
  not pin a Vercel project.

## 3. Vercel account findings (verified via API)

Authenticated team visible to this session: **`moises-2458's projects`**
(`team_4C6xAQR7SmOOjXWRFAoilmi9`, member email `moises@vistatechsolutions.io`).

### Project `lifestar-ems` (`prj_qZj4rDrFfJp57MS0Mwec8I5VtJP1`)

- Framework: vite. Created 2026-04-14 19:45 UTC.
- **Exactly one deployment ever**: `dpl_4Prsi3QtBpFAVwjEsTyV7ysnXGYr`,
  created 2026-04-14, target production, state READY.
  - Deployed **via CLI upload, not Git**: metadata shows `gitDirty: "1"` and
    `actor: "claude"`; commit `22c2a83` = the repo's **initial commit**.
  - This matches the owner's observation that the dashboard shows the project
    as "not connected to Git".
- Domains on the project: `lifestar-ems.vercel.app` plus two team-scoped
  `*.vercel.app` aliases. **The production domain `lifestaremsrgv.com` is NOT
  attached to this project.**
- Consequence: this project serves the **original V1 site frozen at the initial
  commit** and is not what the public sees.

### Project `life-star-hq` (`prj_3VH7GdWuA9QjwaQyngET41eRUjoY`)

- Framework: **Next.js**, Git-connected (has a `life-star-hq-git-master...`
  branch domain), last production deployment 2026-06-11.
- Its domains do not include `lifestaremsrgv.com` either. It appears to be a
  separate internal/HQ app, **not** the public website. Flagged only so nobody
  confuses the two.

No other project in the visible team relates to Life Star EMS.

## 4. Production domain assignment (verified via DNS + inference)

DNS resolution performed from this environment:

| Host | Record | Meaning |
|---|---|---|
| `lifestaremsrgv.com` | A → `76.76.21.21` | Vercel's apex anycast IP |
| `www.lifestaremsrgv.com` | CNAME → `cname.vercel-dns.com` | Vercel |
| `lifestar-ems-brown.vercel.app` | resolves (Vercel edge IPs) | An existing Vercel deployment domain |

Conclusions:

1. **The production domain is served by Vercel** — verified.
2. **It is not attached to any project in the visible team** — verified via API.
3. Therefore **production is served by a Vercel project in a different Vercel
   account**. The `-brown` suffix on `lifestar-ems-brown.vercel.app` is what
   Vercel generates when a project named `lifestar-ems` is created while the
   bare name is already taken globally (it is taken — by the stale project in
   the visible team). The GitHub deployment records the owner saw for
   `lifestar-ems-brown.vercel.app` indicate that other account **is
   Git-connected to `moises-design/lifestar-ems`** and auto-deploys `master`.
4. The Vercel MCP fetch tool could not access `lifestar-ems-brown.vercel.app`
   or the production domain ("Unable to create shareable URL"), which is the
   expected behavior for deployments belonging to **another account** —
   corroborating conclusion 3.

**Requires owner confirmation:** log into the other Vercel account (check which
GitHub user installed the Vercel GitHub App on `moises-design/lifestar-ems`
under Settings → Integrations, or check the email that receives Vercel deploy
notifications) and confirm: (a) the project that owns `lifestaremsrgv.com` +
`www`, (b) which branch it deploys, (c) its environment variables.

## 5. Deployment source and automatic behavior (assessed)

- Visible-team `lifestar-ems`: manual CLI deploys only; **no** auto-deploy.
- Production (other account, inferred): Git-connected, auto-deploys on push to
  `master`. **This means pushing to `master` likely publishes to
  lifestaremsrgv.com immediately.** All work must stay on feature branches
  until this is confirmed and a review gate is in place.
- Repo `master` HEAD `252e249` predates nothing newer; if the production
  project deploys `master`, the live site should equal the current repo build.
  Whether the live meta description still shows (956) 648-9774 could not be
  fetched from this sandbox, but the repo at `master` would produce exactly
  that (`index.html:7`), and the site was reported live with the 660-6543
  number in the UI, which matches this codebase. **Working assumption:
  production = this repo @ master. Requires one-click owner confirmation**
  (view-source on the live site and compare the asset hash
  `index-D35-6Tm6.js`).

## 6. Environment variables

- Repo expects `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
  (`.env.example`, `src/lib/supabase.js:3-4`). `.env` is gitignored.
- Values in the production Vercel project could not be read (different
  account). **Requires owner confirmation.**
- Note: `createClient(undefined, undefined)` — if the production project lacks
  these vars, every form submits to nothing and shows the generic error. Worth
  confirming with a live form test.
- The anon key is a publishable key; RLS policies in
  `supabase/migrations/001_contact_submissions.sql` correctly restrict reads to
  authenticated users and allow public inserts. `002_long_distance_requests.sql`
  creates a second table **without any RLS statements in the migration** —
  worth checking in the Supabase dashboard (if RLS is off, the anon key could
  read submissions; if RLS is on with no policy, the orphaned long-distance
  form would fail anyway since the page is unrouted).

## 7. Supabase usage

- Client-side inserts only, from three rendered forms (Contact, EventStandby,
  RequestCoverage → all into `contact_submissions`) and one orphaned page
  (LongDistanceTransport → `long_distance_requests`, currently unreachable).
- No serverless functions, no webhooks, no email notification pipeline in the
  repo. **How the business learns about a new submission is unknown** —
  requires owner confirmation (Supabase dashboard checking? an email trigger
  configured in Supabase?). This is a conversion-critical operational question.
- No spam protection (no captcha/honeypot/rate limiting) on public-insert
  tables.

## 8. Risks of changing the wrong Vercel project

1. Deploying from this repo to the **visible** `lifestar-ems` project would
   update only `lifestar-ems.vercel.app` — the public site would not change,
   and the team might falsely believe a fix shipped (or worse, DNS could later
   be pointed at the stale project "because the name matches").
2. Deleting the visible stale `lifestar-ems` project frees the global name but
   would break nothing in production; however, do not delete anything until the
   production account is identified.
3. Adding `lifestaremsrgv.com` to a visible-team project would **fail or hijack
   the domain** from the production project depending on verification state.
   Do not attempt domain moves until the owning account is accessed.
4. Pushing to `master` (if auto-deploy is confirmed) is a production release.
   Branch protection is currently **off** (`master` unprotected per GitHub API).

## 9. Safe branch and PR workflow (recommended, not yet implemented)

1. All changes on feature branches (`claude/*` or `feat/*`); never commit to
   `master` directly.
2. Open PRs into `master`; production deploys only on merge. Preview
   deployments (on the Git-connected account) give a shareable review URL per
   PR at `lifestar-ems-brown-git-<branch>...vercel.app`.
3. Enable branch protection on `master` (require PR, forbid force-push).
4. Consolidate to **one** Vercel account: either move the domain + Git
   integration into the account the owner controls day-to-day, or accept the
   current split and document credentials. Decommission the stale visible
   `lifestar-ems` project and the confusion it causes.
5. After consolidation, record the project ID in this doc and (optionally)
   commit `.vercel/project.json` is NOT recommended (contains org/project IDs;
   keep in docs instead).

## 10. Open items for the owner

- [ ] Identify/access the Vercel account serving `lifestaremsrgv.com`
      (owner of `lifestar-ems-brown.vercel.app`).
- [ ] Confirm production branch = `master` and auto-deploy behavior.
- [ ] Confirm env vars `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` exist in
      that project, and which Supabase project they point to.
- [ ] Confirm www ↔ apex redirect direction in that project's domain settings
      (pick `https://www.lifestaremsrgv.com` or apex as canonical; today
      `index.html:11` og:url says apex while marketing uses www).
- [ ] Confirm whether `lifestar-ems-brown.vercel.app` returns
      `X-Robots-Tag: noindex` (Vercel default) so it is not indexed as a
      duplicate.
- [ ] Confirm the submission-notification workflow for Supabase forms.
- [ ] Decide the fate of the stale visible `lifestar-ems` project and of
      `life-star-hq`.
