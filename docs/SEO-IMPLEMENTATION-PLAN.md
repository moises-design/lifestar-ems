# Life Star EMS — SEO Implementation Plan

Date: 2026-07-23
Companion documents: `docs/SEO-AUDIT.md` (findings, IDs referenced below),
`docs/SEO-FACT-VERIFICATION.md` (facts), `docs/DEPLOYMENT-AUDIT.md` (deploy).

Rules for all missions: one mission per PR, no direct pushes to `master`, no
redesign, no deleted content without owner sign-off, no em dashes in new
public-facing copy, no unverified factual claims, current visual identity
preserved.

---

## Mission 1: Production and deployment verification

- **Objective:** Establish exactly which Vercel account/project/branch serves
  lifestaremsrgv.com so changes ship safely (Audit C-level blocker; see
  DEPLOYMENT-AUDIT.md).
- **Files likely affected:** none (external investigation);
  `docs/DEPLOYMENT-AUDIT.md` updated with results.
- **Deliverables:** identified production Vercel project + account; confirmed
  production branch and auto-deploy behavior; confirmed env vars present;
  confirmed www/apex redirect direction; decision recorded on canonical host;
  branch protection enabled on `master`; stale visible `lifestar-ems` project
  decommission decision.
- **Acceptance criteria:** owner can name the production project ID; a test
  commit on a branch produces a preview URL; documentation updated.
- **Tests:** view-source of live homepage matches repo build asset hash; deep
  route `/services/dialysis` returns 200; `lifestar-ems-brown.vercel.app`
  serves `X-Robots-Tag: noindex`.
- **Risks:** touching the wrong project (mitigation: read-only until confirmed);
  domain hijack if domains are moved prematurely (do not move domains).
- **Owner information required:** access to the Vercel account owning
  `lifestar-ems-brown.vercel.app`; registrar/DNS access confirmation.
- **Repository-side or external:** External (plus doc update).

## Mission 2: Business fact verification and NAP consistency

- **Objective:** Resolve every 🔴/🟡 item in SEO-FACT-VERIFICATION.md; fix the
  wrong phone number and contradictory claims (Audit C1, C5, H4-H7).
- **Files likely affected:** `index.html`; `src/components/Hero.jsx`,
  `About.jsx`, `Contact.jsx`, `Footer.jsx`; `src/pages/DialysisTransport.jsx`,
  `RequestCoverage.jsx`, `EventStandby.jsx`; `README.md`.
- **Deliverables:** corrected meta description (right number, non-emergency
  positioning, no "24/7" unless confirmed); "Available Scheduled" strings
  rewritten; single hours statement everywhere; rating badge kept/removed per
  verification; partner logos kept/removed per permission; one canonical email;
  address in one exact USPS format everywhere.
- **Acceptance criteria:** zero occurrences of (956) 648-9774 unless owner
  confirms it; grep shows one phone, one email, one address format; no claim on
  the site lacks a line in the verification sheet marked confirmed.
- **Tests:** `grep -rn "648-9774\|Available Scheduled" src index.html` returns
  nothing; `npm run build` passes; manual read of every changed string.
- **Risks:** removing a number that is actually in use (mitigation: owner
  confirmation first); accidentally changing visual layout (strings only).
- **Owner information required:** completed SEO-FACT-VERIFICATION.md.
- **Repository-side or external:** Repository (verification itself is external).

## Mission 3: Technical SEO foundation

- **Objective:** robots.txt, sitemap.xml, canonical strategy, 404 handling,
  favicon/manifest set (Audit C3, C6, H1, M4).
- **Files likely affected:** `public/robots.txt`, `public/sitemap.xml` (or a
  small build-time generator script), `index.html` (canonical placeholder,
  icons, manifest, theme-color), `src/App.jsx` (catch-all route),
  new `src/pages/NotFound.jsx`, `public/site.webmanifest`,
  `public/apple-touch-icon.png`, `public/favicon.ico`, `vercel.json`
  (www/apex redirect if the platform doesn't already do it).
- **Deliverables:** valid robots.txt referencing the sitemap; sitemap with the
  8 real routes on the canonical host; `*` route rendering a branded 404 page
  with navigation CTAs; complete icon set; redirect so only one host serves 200.
- **Acceptance criteria:** `curl https://<canonical-host>/robots.txt` and
  `/sitemap.xml` return 200 and validate; unknown URL shows the 404 page;
  non-canonical host 301s.
- **Tests:** `npm run build && npm run preview` route checks; XML validation;
  Lighthouse SEO pass locally.
- **Risks:** sitemap listing the wrong host before Mission 1 completes
  (dependency: Mission 1); rewrite/redirect ordering mistakes in vercel.json
  (test on preview deploy first). Note: an SPA cannot return a true HTTP 404
  status under the current architecture; the soft-404 page plus sitemap
  discipline is the accepted interim state until prerendering (Mission 4 note).
- **Owner information required:** canonical host decision (Mission 1).
- **Repository-side or external:** Repository.

## Mission 4: Page-level metadata and structured data

- **Objective:** Unique title/description/OG/canonical per route plus
  LocalBusiness JSON-LD (Audit C2, C4 partially, H2, H3, M8).
- **Files likely affected:** `package.json` (add `react-helmet-async` or
  equivalent, or adopt vite-plugin-prerender/`vite-react-ssg` per the
  architecture recommendation in SEO-AUDIT.md), new `src/components/Seo.jsx`,
  every file in `src/pages/`, `src/App.jsx`, `index.html` (og:image),
  new `public/images/og-cover.jpg` (1200x630).
- **Deliverables:** per-route `<title>` (service + city pattern, e.g.
  "Dialysis Transportation in the Rio Grande Valley | Life Star EMS"),
  per-route meta description with the verified phone number, per-route
  canonical and og:url, one og:image sitewide minimum, JSON-LD:
  `MedicalBusiness`/`LocalBusiness` with verified NAP, hours, areaServed, and
  `Service` entries; **no aggregateRating markup** unless real GBP reviews are
  verified. **Recommended in the same mission:** adopt static prerendering
  (see architecture recommendation) so titles/descriptions/JSON-LD exist in
  the served HTML, not only after JS runs.
- **Acceptance criteria:** view-source of each prerendered route shows its own
  title/description/canonical/JSON-LD; Rich Results Test passes; Facebook
  Sharing Debugger shows title+image.
- **Tests:** build output inspection per route; schema validator; social
  debuggers on preview URL.
- **Risks:** helmet-only approach leaves crawlers-without-JS unserved (that is
  why prerendering is bundled here); duplicate titles if the pattern is applied
  mechanically.
- **Owner information required:** verified facts (Mission 2); chosen canonical
  host (Mission 1); a real photo for og:image if available.
- **Repository-side or external:** Repository.

## Mission 5: Service-page content improvements

- **Objective:** Deepen the four service pages so each can rank on its own;
  remove copy-standard violations (Audit M2, M3, content gaps 2-4, 7).
- **Files likely affected:** all files in `src/pages/`, `src/components/Footer.jsx`
  (fix "Pediatric Page" link text, M6), possibly re-enable a verified
  `Insurance` section, new FAQ blocks per service page.
- **Deliverables:** each service page gains: an FAQ section (5-8 real
  questions), a "how scheduling works" section, verified insurance note,
  internal links to the other services and `/coverage`; em dashes removed from
  public copy; emoji removed from headings/nav labels (kept in decorative
  spots with `aria-hidden` where they fit the visual identity); `/coverage`
  and `/contact` get unique intro copy so they are not thin duplicates.
- **Acceptance criteria:** every page has 500+ words of substantive,
  non-repeated content; zero em dashes in rendered copy; no unverified claims;
  reading level appropriate for patients/families.
- **Tests:** `grep -rn "—" src/pages src/components` on rendered strings; build;
  manual copy review against fact sheet.
- **Risks:** keyword stuffing while expanding (write for families first);
  scope creep into redesign (structure stays, sections are appended in current
  visual language).
- **Owner information required:** Mission 2 sign-offs; answers to the FAQ
  questions (owner interview, ~30 minutes).
- **Repository-side or external:** Repository.

## Mission 6: Local city landing pages

- **Objective:** Rank for "service + city" queries across the RGV (Local SEO
  gap 1).
- **Files likely affected:** new `src/pages/locations/` (e.g. `Edinburg.jsx`,
  `McAllen.jsx`, `Mission.jsx`, `Pharr.jsx`, `Weslaco.jsx`, `Harlingen.jsx`,
  `Brownsville.jsx` — start with 3-4, not all at once), `src/App.jsx` routes
  (`/locations/:city` as distinct static routes), sitemap, Footer/CoverageMap
  internal links, per-page metadata (Mission 4 component).
- **Deliverables:** city pages with genuinely local content: dialysis centers
  and therapy clinics served in that city (named only with owner confirmation),
  travel notes, city-specific FAQs, links to the relevant service pages;
  CoverageMap chips link to city pages; each page has unique title/description
  and LocalBusiness `areaServed` linkage.
- **Acceptance criteria:** no two city pages share more than boilerplate; each
  is indexed within a month of Mission 9; zero doorway-page patterns (every
  page must contain city-specific facts, not find-and-replace city names).
- **Tests:** similarity spot-check between pages; build; sitemap includes new
  URLs; Search Console indexing after launch.
- **Risks:** doorway-page penalty if pages are templated thin (mitigation:
  launch fewer, richer pages; 3 first); maintenance burden.
- **Owner information required:** which facilities/organizations per city may
  be named; any city-specific service notes.
- **Repository-side or external:** Repository.

## Mission 7: Accessibility and performance

- **Objective:** Fix audit sections 9 and 10 (labels, aria, reduced motion,
  bundle, images) without visual redesign.
- **Files likely affected:** all form components (`Contact.jsx`,
  `RequestCoverage.jsx`, `EventStandby.jsx`), `Navbar.jsx`, `CoverageMap.jsx`,
  therapy/pediatrics pages (star fields), all CSS files (one
  `prefers-reduced-motion` block), `src/App.jsx` (`React.lazy` per route),
  image assets (compress/convert existing ones in place; no visual change),
  `index.html` (preload hero image), lint fixes
  (`TherapyTransport.jsx:216-220`, `PediatricsTransport.jsx:32`,
  `Navbar.jsx:28`).
- **Deliverables:** label/id association on every input; `aria-expanded` +
  Escape handling on the services dropdown; accessible name on the mobile
  close button; `aria-hidden` on decorative emoji/animations;
  `prefers-reduced-motion: reduce` disables star/particle animations;
  `role="img"` + `aria-label` on the coverage SVG; `aria-live` on form status;
  skip link; route-level code splitting; images compressed to WebP with
  width/height and lazy loading; `npm run lint` clean.
- **Acceptance criteria:** Lighthouse a11y ≥ 95 and performance ≥ 85 mobile on
  key pages; total JS for homepage under ~200 kB raw; zero ESLint errors;
  axe DevTools shows no critical issues.
- **Tests:** `npm run lint`, `npm run build`, Lighthouse on preview deploy,
  keyboard-only walkthrough, VoiceOver/NVDA spot check.
- **Risks:** code splitting changing perceived nav speed (prefetch on hover);
  image recompression altering visuals (review side-by-side).
- **Owner information required:** none.
- **Repository-side or external:** Repository.

## Mission 8: Google Business Profile and citation plan

- **Objective:** Establish/clean the off-site local footprint that the "5.0
  Google Rated" claim and local rankings depend on.
- **Files likely affected:** none, or minor (adding GBP review link + map embed
  to Contact once profile is confirmed).
- **Deliverables:** GBP claimed/verified with category "Medical transportation
  service" (primary), exact NAP matching the site, services and photos
  populated, review link in hand; Facebook page NAP aligned; citations created
  or corrected on Bing Places, Apple Business Connect, Yelp, BBB, and 5-10
  Texas/RGV directories; a tracking spreadsheet of every citation.
- **Acceptance criteria:** searching the business name in Maps returns one
  verified listing with correct NAP; no duplicate listings; site and GBP agree
  on every fact.
- **Tests:** manual searches; NAP audit against the fact sheet.
- **Risks:** duplicate GBP listings (merge, don't create); using the gmail
  address publicly if the owner switches to domain email later.
- **Owner information required:** Google account ownership, verification
  ability (postcard/video), photos, decision on address visibility
  (storefront vs. service-area business).
- **Repository-side or external:** External.

## Mission 9: Search Console indexing and validation

- **Objective:** Get every canonical URL indexed and monitored.
- **Files likely affected:** possibly `index.html` (site-verification meta) or
  DNS TXT record (preferred).
- **Deliverables:** Search Console property (domain-level) verified; sitemap
  submitted; Bing Webmaster Tools verified (import from GSC); indexing
  requested for all routes; coverage report reviewed; the stale
  (956) 648-9774 snippet confirmed re-crawled and gone from SERPs; Apple
  Business Connect placement confirmed (overlaps Mission 8).
- **Acceptance criteria:** all canonical URLs "Indexed" in GSC; zero
  soft-404/duplicate warnings; brand SERP shows correct number.
- **Tests:** GSC URL inspection per route; `site:lifestaremsrgv.com` review.
- **Risks:** none significant; requires Missions 1-4 to be live first.
- **Owner information required:** DNS access (TXT record) or deploy rights for
  the verification tag; Google account.
- **Repository-side or external:** Mostly external.

## Mission 10: Measurement and ongoing content

- **Objective:** Know what works; keep the site alive in search.
- **Files likely affected:** `index.html`/`src/main.jsx` (analytics snippet),
  form success handlers (conversion events), possibly new `/resources` route.
- **Deliverables:** privacy-respecting analytics (GA4 or Plausible/Vercel
  Analytics decision recorded), call-click and form-submit events, a monthly
  content cadence (one FAQ/resource article per month drawn from real
  dispatch questions), quarterly NAP/citation re-audit, quarterly fact-sheet
  re-verification, rank tracking for ~20 service+city terms.
- **Acceptance criteria:** dashboard shows calls + form submits per page;
  content published on cadence; a privacy policy page exists **before**
  analytics ships (ties to the compliance gap: privacy policy, terms, and the
  911 notice should be drafted here at the latest, with owner/legal review).
- **Tests:** event firing verified in analytics debugger; policy pages linked
  in footer.
- **Risks:** analytics without a privacy policy (sequence: policy first);
  content drifting into unverified medical claims (fact sheet governs).
- **Owner information required:** analytics preference, privacy policy review
  (legal counsel recommended for the PHI-adjacent form data), FAQ source
  material.
- **Repository-side or external:** Both.

---

## Dependency order

Mission 1 → Mission 2 → Mission 3 → Mission 4 → (5, 6, 7 in any order) →
8 → 9 → 10. Missions 1 and 2 are pure verification and unblock everything;
nothing user-visible should ship before they are complete.
