# AGENTS.md: lifestar-ems (LifeStar EMS)

> PROPOSED draft (Oct 10, 2026), not committed. Needs Moises's approval, then lands via PR (never a direct push to master).

## Stack
- **React + Vite** — frontend (`src/`)
- **Vercel serverless functions (`api/`)** — form intake (`POST /api/submit-form`, `api/submit-form.js`, `api/_lib/`)
- **Resend** — form notification email (`api/_lib/resend-client.js`)
- **Supabase** — long-distance transport requests (`supabase/migrations/`, `src/lib/supabase.js`)
- **Vercel** — hosting
- **Vitest** — unit tests (`tests/unit/`)
- **Playwright** — end-to-end tests (`tests/e2e/`)

## Commands
- `npm install`
- `npm run dev` — Vite dev server at http://localhost:5173
- `npm run build` — `vite build && node scripts/prerender.mjs`
- `npm run lint` — `eslint .`
- `npm run preview` — `vite preview`
- `npm run test` — `vitest run`
- `npm run test:e2e` — `playwright test`

## Branch and merge workflow
Feature branch -> PR -> Moises approves -> merge to default branch (`master`). Never push to `master` directly.

## Standing rules (from Alfred, approved by Moises Oct 10)
Evidence before "done": When you report a mission complete, include the tests or checks you actually ran and their results, the list of changed files, and the deploy or preview link if there is one. Then list plainly what you did not verify. Without evidence, report it as unverified, not done.

Failed checks: If a check fails (yours, mine, or Startup QA Bot's), send the work back with the exact gap named: the failing test, the broken step, or the missing evidence. If the same task fails twice, stop retrying. Re-scope it or split it into smaller pieces and tell me the new plan.

Independent check: Treat Startup QA Bot's findings as the independent check on shipped work. Don't call a release verified while its open findings remain unaddressed. Say which ones are still open.

Repo rules files: Her Cycle, Cherish Us, and Vital Care each keep an AGENTS.md at the repo root holding standing security, privacy, and launch decisions. Read it before changing the repo, and add new decisions to it, not just to chat. Health-data must-pass items for these repos:
- No health data, or pages that imply a health condition, goes to ad pixels, analytics, or session-replay tools.
- Keep an inventory of every tool or vendor that receives data from health screens, and update it whenever one is added.

Launch-readiness audit: Run a launch-readiness audit (data access, third parties, privacy paperwork, consent, health data, payments, email) before each release. Run it again whenever a vendor, form, price, or AI feature is added or changed. Report each item as pass, fail, or unverified with file and line, and fix nothing without my approval.

## Safety rules
- No fabricated data: no invented testimonials, reviews, stats, customers, logos or test results. Mark unknowns "unverified".
- Evidence before done: list the commands run and their output, changed files, and the preview/deploy link. Say what was not verified.
- Secrets: never commit .env files, keys or tokens. Only .env.example with placeholders. Production env vars change only with approval.
- Migrations: additive and reversible where possible; tested locally; applied to production only with Moises's explicit approval. SQL lives in `supabase/migrations/`.
- No destructive or external actions (deleting data, force-push, sending email/SMS, changing billing/Stripe/DNS) without approval.
- Record new standing decisions in this file, not just in chat.

## Health-data must-pass items (Alfred's rules, approved Oct 10)
- No health data, or pages that imply a health condition, goes to ad pixels, analytics, or session-replay tools.
- Keep an inventory of every tool or vendor that receives data from health screens (`docs/vendor-inventory.md`), and update it whenever one is added.

Additional PHI handling (proposed, HIPAA-style; confirm with Moises):
- No PHI/health data in logs, error payloads, crash reports, or analytics events. Log internal ids and safe codes only.
- Encrypt in transit (TLS only) and at rest (managed DB/storage encryption). Never store PHI in local files, URLs or query strings.
- Access to PHI is role-checked and access-logged (who, what record, when).
- Any vendor that touches PHI needs a signed BAA before data flows. Record the BAA status in the vendor inventory.
- Use synthetic data only in tests, seeds, screenshots and demos.


## Launch-readiness audit
Before each release, and whenever a vendor, form, price or AI feature changes: check data access, third parties, privacy paperwork, consent, health data, payments and email. Report each as pass/fail/unverified with file:line. Fix nothing without approval.
