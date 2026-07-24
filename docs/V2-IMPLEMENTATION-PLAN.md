# Life Star EMS V2 — Implementation Plan

Date: 2026-07-24

Ground rules for every mission: work on feature branches only, preview
deployments only, never touch `master`, never weaken the SEO foundation
(checklist in `docs/V2-CREATIVE-DIRECTION.md` §14), verified facts only, no
em dashes in public copy, current route paths preserved.

"Previewable independently" means the mission can be pushed and reviewed as a
Vercel preview without waiting for later missions.

---

## Mission 1: Design research and creative direction — **this mission, complete**

- **Objective:** Evidence-based direction and plans.
- **Files:** the five `docs/V2-*.md` documents.
- **Deliverables/acceptance:** delivered with Mobbin evidence links; accepted
  when the owner signs off on the direction and answers §Owner items.
- **Tests:** none (documentation).
- **Risks:** direction rejected → revise before Mission 2.
- **Owner content required:** direction approval; photography appetite
  (faces/names yes or no); Spanish scope decision.
- **Photography required:** none.
- **Previewable:** n/a (docs only).

## Mission 2: Homepage shell and navigation

- **Objective:** V2 tokens + shared shell (header, footer, CTA band,
  containers) behind the new visual system, applied first to the homepage
  skeleton.
- **Files:** `src/index.css` (tokens), new `src/v2/` component folder
  (`Header`, `Footer`, `CtaBand`, `Section`, `Container`), `src/App.jsx`
  wiring, font loading in `index.html` (self-hosted woff2).
- **Deliverables:** design tokens as CSS custom properties; new header
  (desktop + mobile sheet, accessible dropdown with aria-expanded/Escape);
  new footer with NAP; persistent mobile bar restyled.
- **Acceptance:** matches design-system tokens; contrast pairs re-measured
  and recorded; lint/build clean; SEO checklist passes (routeMeta, robots,
  sitemap, schema untouched; one h1 per page preserved).
- **Tests:** `npm run lint`, `npm run build`, headless sweep (existing
  script) for metadata regression, keyboard-only nav walkthrough, Lighthouse
  a11y ≥ 95 on homepage skeleton.
- **Risks:** font payload bloat (cap 120 kB); header regressions on small
  phones (test 320px).
- **Owner content:** confirmed hours line for footer (or omit); 911 notice
  approval.
- **Photography:** none.
- **Previewable:** yes.

## Mission 3: Homepage hero

- **Objective:** Editorial hero (statement, sub-line, two CTAs, PH-01 media
  panel, quiet local line).
- **Files:** `src/v2/Hero.jsx/.css`, homepage assembly; `public/images/mock/`
  first AI placeholders (generated under the photography-plan rules).
- **Deliverables:** hero at all breakpoints; LCP image pipeline (AVIF/WebP,
  `fetchpriority="high"`, width/height).
- **Acceptance:** LCP < 2.5s on preview (throttled), headline copy uses only
  verified facts, no em dashes; hero h1 remains the page's single h1.
- **Tests:** Lighthouse performance + a11y, metadata sweep, visual review at
  320/768/1440.
- **Risks:** AI mock quality (regenerate until checklist passes; the mock
  gate is in V2-PHOTOGRAPHY-PLAN.md §3).
- **Owner content:** hero statement approval.
- **Photography:** PH-01 (mock).
- **Previewable:** yes.

## Mission 4: Homepage service storytelling

- **Objective:** Numbered service index + "how scheduling works" + the four
  service chapters.
- **Files:** `src/v2/ServiceIndex.jsx`, `src/v2/HowItWorks.jsx`,
  `src/v2/ServiceChapter.jsx`, homepage assembly; mocks PH-05..PH-08.
- **Deliverables:** sections per wireframe; internal links to the four
  service routes.
- **Acceptance:** copy fact-clean; index keyboard-navigable; images lazy;
  CLS < 0.02 on the section.
- **Tests:** lint/build/metadata sweep; axe pass; link check.
- **Risks:** chapters ballooning into icon-grids (design review against
  direction doc).
- **Owner content:** three verifiable facts per service (from fact sheet).
- **Photography:** PH-05..08 (mocks).
- **Previewable:** yes.

## Mission 5: Crew, trust, and coverage sections

- **Objective:** Human trust story, dark crew/operations chapter, coverage
  map, event standby door, audience paths.
- **Files:** `src/v2/TrustStory.jsx`, `src/v2/CrewChapter.jsx`, new light
  `CoverageMap` treatment (replaces space-styled SVG), `src/v2/EventDoor.jsx`,
  `src/v2/AudiencePaths.jsx`; mocks PH-02, PH-03/04/09, PH-10.
- **Deliverables:** sections per wireframe; map accessible (role=img +
  text city list is the real content).
- **Acceptance:** dark chapter is the only dark band; unverified claims
  absent (no partner names, no ratings); reduced-motion clean.
- **Tests:** lint/build/metadata sweep; contrast check on night tokens;
  screen-reader pass on map + collage.
- **Risks:** map rebuild scope creep (keep it static/light, interactivity
  optional later).
- **Owner content:** crew facts (bilingual reality, training/maintenance
  practices) verified wording.
- **Photography:** PH-02/03/04/09/10 (mocks).
- **Previewable:** yes.

## Mission 6: Conversion sections and footer polish

- **Objective:** FAQ, reviews placeholder (hidden), big CTA band, footer
  final, homepage complete.
- **Files:** `src/v2/Faq.jsx`, `src/v2/Reviews.jsx` (feature-flagged off),
  `CtaBand` final, homepage assembly complete; retire unused V1 homepage
  sections from the route (files archived, not deleted).
- **Deliverables:** complete homepage; FAQ content from owner answers;
  FAQPage schema **only if** answers are owner-approved (else defer to
  Mission 10).
- **Acceptance:** homepage reads complete with reviews hidden; all wireframe
  sections present; end-to-end keyboard pass.
- **Tests:** full Lighthouse (perf ≥ 85 mobile target now, ≥ 90 after M9),
  metadata sweep, link check.
- **Risks:** FAQ answers stall on owner input (ship with 4 process questions
  that need no new facts).
- **Owner content:** FAQ answers; review-integration decision (Google link).
- **Photography:** none new.
- **Previewable:** yes — this is the homepage sign-off preview.

## Mission 7: Service-page redesign

- **Objective:** Apply V2 to the four service pages + coverage + contact +
  request + 404 per V2-PAGE-ARCHITECTURE.md.
- **Files:** all `src/pages/*` (V2 rebuilds using v2 components), form
  restyle with proper label association (fixes audit A11y-1), space theme
  fully retired.
- **Deliverables:** eight pages on the system; request form UX improved;
  cross-links and breadcrumbs in place.
- **Acceptance:** zero space-theme remnants; every page one h1, fact-clean;
  forms accessible; per-route metadata untouched and verified by sweep.
- **Tests:** lint/build; full-route headless sweep; axe on every form page;
  320px review.
- **Risks:** biggest mission — split into 7a (dialysis+therapy), 7b
  (pediatrics+events), 7c (coverage/contact/request/404) if needed.
- **Owner content:** per-service FAQ answers; ride-along and child-seat
  policy wording.
- **Photography:** already-generated mocks reused.
- **Previewable:** yes (per sub-mission).

## Mission 8: Mobile refinement

- **Objective:** Dedicated small-screen pass across all pages.
- **Files:** CSS refinements; mobile bar behavior; menu sheet.
- **Deliverables:** art-directed mobile crops wired (`<picture>`), type
  rhythm at 320-480px, thumb-reach audit of CTAs.
- **Acceptance:** no horizontal scroll anywhere; tap targets ≥48px; mobile
  Lighthouse a11y ≥ 95.
- **Tests:** device-emulation matrix (320/375/414/768), real-device spot
  check by owner.
- **Risks:** crop assets missing (photography plan defines them up front).
- **Owner content:** none.
- **Photography:** mobile crops of existing mocks.
- **Previewable:** yes.

## Mission 9: Accessibility and performance hardening

- **Objective:** Close the remaining audit findings and V2 debt.
- **Files:** route-level code splitting (`React.lazy`), image pipeline
  finalization, skip link, aria-live on form status, reduced-motion audit,
  bundle diet.
- **Deliverables:** perf ≥ 90 / a11y ≥ 95 mobile Lighthouse on all key
  pages; JS ≤ 200 kB raw on homepage.
- **Acceptance/tests:** Lighthouse CI run recorded in docs; axe clean;
  keyboard + screen-reader pass documented.
- **Risks:** lazy-loading flicker on route change (prefetch on intent).
- **Owner content:** none. **Photography:** none.
- **Previewable:** yes.

## Mission 10: SEO and structured-data verification

- **Objective:** Prove the redesign preserved and improved SEO.
- **Files:** `src/seo/routeMeta.js` (description refresh if page content
  shifted), sitemap regeneration check, JSON-LD upgrade **only with
  verified facts** (LocalBusiness/address/hours if confirmed by then),
  FAQPage schema for approved FAQs, breadcrumb schema.
- **Deliverables:** full-route metadata sweep results in docs; Rich Results
  passes; social debugger passes with the OG image (refresh OG to PH-11 real
  photo if available).
- **Acceptance:** zero regressions vs the V1.5 foundation; new schema
  validates; fact sheet cross-check signed.
- **Tests:** headless sweep, schema validators, Search Console fetch (owner).
- **Risks:** fact sheet still unresolved → schema stays conservative (that
  is a pass, not a failure).
- **Owner content:** the completed fact-verification sheet.
- **Photography:** PH-11 if shot. **Previewable:** yes.

## Mission 11: Final QA and production readiness

- **Objective:** Release gate.
- **Files:** none new (fixes only); `docs/` release checklist.
- **Deliverables:** cross-browser pass (Chrome/Safari/Firefox/Edge, iOS
  Safari, Android Chrome); forms tested end-to-end into Supabase with the
  notification workflow confirmed; 404 behavior on Vercel verified; content
  proofread (no em dashes, no unverified claims); rollback plan (previous
  production deployment pinned).
- **Acceptance:** owner sign-off on the preview; go/no-go documented.
  Deployment to production happens only by explicit owner instruction, by
  merging to `master` through a PR.
- **Tests:** the full battery above.
- **Risks:** AI mocks still in hero at launch → explicit owner decision
  required per photography plan §3.
- **Owner content:** final approval. **Photography:** real shoot ideally
  complete. **Previewable:** yes — the release-candidate preview.

---

## Sequence and dependencies

M1 → M2 → M3 → M4 → M5 → M6 (homepage complete) → M7 (7a/7b/7c) → M8 → M9 →
M10 → M11. Photography (mock generation) starts inside M3 and the real shoot
can be scheduled any time after direction sign-off; PH-11/PH-12 are the only
real-only blockers and they gate nothing before M10.
