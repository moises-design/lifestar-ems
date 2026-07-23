# Life Star EMS — SEO, Technical, and Content Audit

Date: 2026-07-23
Auditor: Claude Code (repository and API-level audit)
Repository: moises-design/lifestar-ems
Audit branch: `claude/lifestar-ems-audit-iuemy7` (based on `master` @ `252e249`)
Production domain: https://www.lifestaremsrgv.com/

> Audit scope note: this audit was performed from a sandboxed environment whose
> network policy blocks direct HTTP requests to external websites. All findings
> below are verified against the repository source, the local production build
> (`npm run build`), DNS resolution, the Vercel API, and the GitHub API. Findings
> that could only be confirmed by loading the live site in a browser are
> explicitly marked **"requires owner confirmation"**.

---

## 1. Executive summary

The Life Star EMS website is a well-presented, conversion-oriented single page
application (React 19 + Vite 8 + React Router 7). The visual design, mobile
navigation, and calls to action are strong. However, the site currently has
**almost no technical SEO infrastructure**:

- Every route shares one global `<title>` and meta description from `index.html`.
- The shared meta description advertises **"emergency ... Available 24/7"** and a
  phone number **(956) 648-9774** that appears nowhere else on the site. The
  entire application UI uses **(956) 660-6543**. Commit history shows the team
  deliberately removed emergency/911 messaging ("no 911" in commits `2486339`
  and `528f6aa`), so the head metadata contradicts the site's own positioning.
- There is no `robots.txt`, no `sitemap.xml`, no canonical URL, no `og:image`,
  no Twitter card, no web manifest, and **no structured data of any kind**.
- The initial HTML served to crawlers is an empty `<div id="root">`; all content
  depends on client-side JavaScript.
- There is no 404 handling: any unknown URL returns HTTP 200 with an empty page
  (soft 404s).
- The homepage displays an unverified **"★ 5.0 Google Rated"** claim, and pages
  display insurance, licensing, BLS/ALS, and school-district partner claims that
  must be verified before they can be defended.
- Deployment is misaligned: the Vercel project named `lifestar-ems` in the
  visible account is **not connected to Git**, holds a single stale CLI
  deployment of the initial commit (2026-04-14), and does **not** own the
  production domain. DNS shows `lifestaremsrgv.com` is served by Vercel, but by
  a project in a **different Vercel account** (consistent with the
  `lifestar-ems-brown.vercel.app` deployments visible in GitHub). Until that is
  resolved, no repository change can be safely shipped to production.

Severity counts: **6 Critical, 9 High, 10 Medium, 6 Low** (see section 14).

---

## 2. Current architecture

| Layer | Technology | Evidence |
|---|---|---|
| Framework | React 19.2 (client-side only, no SSR/SSG) | `package.json:14-15` |
| Bundler | Vite 8 | `package.json:28`, `vite.config.js` |
| Routing | React Router 7 (`BrowserRouter`) | `src/main.jsx:3`, `src/App.jsx` |
| Styling | Plain CSS files per component | `src/components/*.css` |
| Icons | react-icons (Font Awesome) | `package.json:16` |
| Forms/backend | Supabase (`contact_submissions`, `long_distance_requests`) | `src/lib/supabase.js`, `supabase/migrations/` |
| Hosting | Vercel (SPA rewrite of all paths to `/index.html`) | `vercel.json:5-7` |
| Head management | None (single static `index.html`, no react-helmet or equivalent) | `index.html`, grep of `src/` |

Build output is a single JS bundle: `dist/assets/index-D35-6Tm6.js` 498.11 kB
(143.11 kB gzip) plus 44.66 kB CSS. `dist/index.html` body contains only
`<div id="root"></div>`.

## 3. Current routes

Defined in `src/App.jsx:44-53`:

| Route | Component | Purpose |
|---|---|---|
| `/` | Hero + Services + About + CoverageMap + Contact | Homepage |
| `/services/dialysis` | `pages/DialysisTransport.jsx` | Dialysis transport |
| `/services/therapy` | `pages/TherapyTransport.jsx` | Pediatric therapy transport |
| `/services/pediatrics` | `pages/PediatricsTransport.jsx` | Pediatric / long-distance |
| `/services/events` | `pages/EventStandby.jsx` | Event EMS standby |
| `/request` | `pages/RequestCoverage.jsx` | Request form |
| `/coverage` | `pages/CoveragePage.jsx` (wraps CoverageMap) | Service area |
| `/contact` | `pages/ContactPage.jsx` (wraps Contact) | Contact |

There is **no catch-all `*` route**, so unknown paths render an empty `<main>`
between the navbar and footer with HTTP 200 (see C6).

Orphaned files (present in the repo, never imported, never rendered):

- `src/components/Gallery.jsx`
- `src/components/Insurance.jsx` (the entire "Insurance We Accept" section with 14 insurer logos)
- `src/components/EmergencyBar.jsx` (the 911 / non-emergency disclaimer bar)
- `src/components/Coverage.jsx`
- `src/components/LongDistance.jsx`
- `src/components/LongDistanceCities.jsx`
- `src/pages/LongDistanceTransport.jsx` (a full long-distance page with its own
  form writing to `long_distance_requests`; not routed — `/services/pediatrics`
  uses `PediatricsTransport.jsx` instead)

---

## 4. Critical SEO problems

**C1. Wrong phone number and contradictory service claims in the sitewide meta
description.** `index.html:7` reads: "Professional emergency and non-emergency
medical transportation across the Rio Grande Valley, TX. Available 24/7. Call
(956) 648-9774." Every other occurrence of a phone number in the app (44
occurrences across 15 files) is (956) 660-6543. This description is what Google
shows in search results for every page: it advertises a possibly-dead number
and claims emergency 24/7 service that the site itself does not offer (the
request form at `src/pages/RequestCoverage.jsx:72` says "This form is for
non-emergency scheduling only"). For a medical transport company this is a
patient-safety and liability issue, not just an SEO issue.
Status: repository side verified; which number is actually correct **requires
owner confirmation**.

**C2. One global title/description for all eight routes.** `index.html:7,12` is
the only place a title or description exists; there is no head-management
library in `package.json` and no `document.title` usage in `src/`. All routes
present identical snippets in search results and social shares, so service
pages cannot rank for their own queries ("dialysis transport McAllen",
"event EMS standby RGV", etc.). Verified.

**C3. No robots.txt and no sitemap.xml.** `public/` contains only
`favicon.svg`, `icons.svg`, and `images/`. Nothing generates either file at
build time. Google has no crawl guidance and no route discovery beyond in-app
links. Verified (repository); live-site absence **requires owner confirmation**
(nothing in the repo could produce them, so absence is near-certain unless
another deploy source serves different files — see DEPLOYMENT-AUDIT.md).

**C4. Empty-shell HTML; all content requires JavaScript.** `dist/index.html`
body is `<div id="root"></div>` plus a script tag. Googlebot can render JS, but
rendering is deferred and imperfect; Bing/other crawlers and link-preview bots
(Facebook, iMessage, WhatsApp) do not execute JS at all, so shares show only
the global title/description with **no image** (no `og:image` exists). For a
local business dependent on Facebook (the footer links to
facebook.com/LifeStarEMSRGV), this materially hurts sharing. Verified.

**C5. Unverifiable rating claim on the homepage.** `src/components/Hero.jsx:9`
displays `★ 5.0 Google Rated`. If this does not match a real, public Google
Business Profile rating, it is a fabricated review claim (FTC risk, Google
policy risk, trust risk). No structured data backs it (which is good — rating
schema without reviews would be worse). **Requires owner confirmation**;
treat as unpublishable until verified.

**C6. Soft 404s: no catch-all route.** `vercel.json:5-7` rewrites every path to
`/index.html` (correct for an SPA), but `src/App.jsx:44-53` has no `*` route,
so `/anything-else` returns HTTP 200 with an empty main region. Search engines
index or repeatedly recrawl junk URLs, and users get a blank page with no
message. Verified.

## 5. High-priority problems

**H1. No canonical URLs; www/apex ambiguity.** No `<link rel="canonical">`
anywhere. `index.html:11` sets `og:url` to `https://lifestaremsrgv.com` (apex)
while the production site is referenced as `https://www.lifestaremsrgv.com/`.
Whether apex 301-redirects to www (or vice versa) could not be verified from
this sandbox. **Redirect behavior requires owner confirmation.**

**H2. No structured data.** No LocalBusiness/MedicalBusiness JSON-LD, no
address, no geo, no opening hours, no service schema. For a local medical
transport business this is the single biggest local-SEO lever after Google
Business Profile. Verified (grep for `ld+json`/`schema.org` returns nothing).

**H3. No Open Graph image, no Twitter card, incomplete OG set.** Only
`og:title`, `og:description`, `og:url` exist (`index.html:9-11`); missing
`og:image`, `og:type`, `og:site_name`, `twitter:card`. Verified.

**H4. Insurance and partner claims are load-bearing but unverified.**
- `src/components/About.jsx:13`: "Medicare, Medicaid & major insurance accepted".
- `src/pages/EventStandby.jsx:19-27`: seven named organizations with logos
  (Boys & Girls Club of McAllen, PSJA ISD, Mission CISD, Sharyland ISD,
  Edinburg CISD, UTRGV, Special Olympics Texas) under the heading "Trusted By".
  Using a school district's name/mark as an endorsement without permission is a
  legal exposure as well as a trust risk. The logo files are hand-drawn SVG
  stand-ins (`public/images/*.svg`), which reduces trademark exposure but the
  named endorsement claim remains.
- Orphaned `src/components/Insurance.jsx:3-18` lists 14 insurers including
  Medicare and "Medicaid / CSHCN"; not currently rendered, but one `git
  revert`/import away from being published.
**Requires owner confirmation** for every named entity.

**H5. Licensing/certification claims without substantiation.**
"Licensed and certified EMS professionals" (`src/components/About.jsx:6`),
"BLS/ALS Certified Crews" (`src/components/Hero.jsx:7`), "BLS/ALS Licensed"
(`src/pages/EventStandby.jsx:65`), "Certified EMT and Paramedic crews"
(`src/pages/EventStandby.jsx:113`). Texas DSHS EMS provider licensing has a
specific meaning; the wording must match the actual license type. **Requires
owner confirmation** (TX DSHS provider license number and level).

**H6. Response-time promises.** "We'll contact you within 2 hours"
(`src/pages/RequestCoverage.jsx:28,41`; orphaned
`src/pages/LongDistanceTransport.jsx:117`), "within 24 hours with a custom
quote" (`src/pages/EventStandby.jsx:118`). These are operational commitments;
publish only if the owner will honor them. **Requires owner confirmation.**

**H7. Conflicting hours and garbled availability copy.**
- `src/components/Contact.jsx:34`: "Office Hours: Mon–Sat · Flexible Scheduling"
- `src/pages/DialysisTransport.jsx:62`: "Available 7 days a week"
- `src/pages/DialysisTransport.jsx:72` and `src/pages/RequestCoverage.jsx:82`:
  the string "Available Scheduled" ("Available Scheduled for emergencies and
  scheduling") is broken English left from a find-and-replace that removed
  "24/7". Verified as inconsistent; true hours **require owner confirmation**.

**H8. No indexability controls at all.** No meta robots, no `noindex` anywhere
(acceptable), but also nothing preventing the `*.vercel.app` deployment domains
from being indexed as duplicates of the production domain. Vercel now sends
`X-Robots-Tag: noindex` on `*.vercel.app` by default, but the previously
observed `lifestar-ems-brown.vercel.app` should be checked. **Requires owner
confirmation.**

**H9. Heavy single bundle and unoptimized images hurt Core Web Vitals.**
498 kB JS (143 kB gzip) for a brochure site, no route-level code splitting, no
`React.lazy`. `public/images/ambulance-1.jpg` 257 kB, `photo-2.jpg` 281 kB,
`photo-3.jpg` 374 kB, `logo-*.png` up to 77 kB, all served at original size
with no `width/height`, no `loading="lazy"`, no WebP/AVIF. The hero background
image is CSS-loaded (`src/components/Hero.css`) so it cannot get
`fetchpriority="high"`. Verified in repo; field CWV data **requires owner
confirmation** via Search Console/PageSpeed.

## 6. Medium-priority problems

**M1. Keywords meta tag** (`index.html:8`) is ignored by Google and lists
"ambulance, emergency medical", reinforcing the emergency mispositioning. Remove.

**M2. Em dashes throughout public copy** violate the owner's copy standard
(18 files contain them, e.g. `src/components/About.jsx`, `index.html:7`,
`src/components/Hero.jsx:35`). To be rewritten with commas/periods in the
content mission.

**M3. Emoji in navigation labels and headings** (`src/components/Navbar.jsx:7-10`
"🏥 Dialysis Transport" etc., mobile menu icons, `src/pages/EventStandby.jsx:121`
"🏆 Request Event Coverage" as a form heading). Screen readers announce these
("hospital emoji Dialysis Transport"); they also appear in any future
crawlable text. Minor SEO, real accessibility noise.

**M4. Favicon/manifest gaps.** Only `favicon.svg` (`index.html:5`). No
`favicon.ico` fallback, no `apple-touch-icon`, no `site.webmanifest`, no
`theme-color`. iOS home-screen and Google result favicons will be degraded.

**M5. No `lang` alternates / Spanish content.** The site advertises "Bilingual
staff — English & Spanish" in five places but has zero Spanish content. For the
RGV market (majority bilingual), a Spanish version is a major opportunity;
until then no `hreflang` is needed. Content gap, not an error.

**M6. Footer link labeled "Pediatric Page"** (`src/components/Footer.jsx:35`)
duplicates the Services column link to `/services/pediatrics` with
non-descriptive anchor text.

**M7. Internal linking is shallow.** Service pages do not link to each other or
to `/coverage`; no breadcrumbs anywhere; the homepage sections are the only hub.

**M8. `og:url` points at apex without trailing slash and without per-route
values** (`index.html:11`); once canonical strategy is set this must be
per-route.

**M9. Orphaned components risk accidental publication of unverified claims**
(Insurance list, EmergencyBar, LongDistanceTransport with its own form). Either
delete after owner sign-off or move to an `archive/` folder. (Do not delete in
this audit per instructions.)

**M10. Duplicate logo assets** — `logo-blue.png` and `logo-final.png` are
byte-identical (63,045 bytes), plus 7 more logo variants; only
`logo-icon.png` (39.8 kB) is referenced by rendered components.

## 7. Content gaps

1. **No Spanish-language content** despite "bilingual staff" claims (see M5).
2. **No FAQ content** — high-intent queries ("does Medicaid cover dialysis
   transport in Texas", "how do I schedule NEMT") have no landing content and
   no FAQPage potential.
3. **No insurance page** rendered — the built section exists
   (`src/components/Insurance.jsx`) but is orphaned; insurance eligibility is
   the top NEMT query driver.
4. **No about/company page** — About is a homepage section only; no team, no
   story, no license display.
5. **No testimonials/reviews section** (and none should exist until real
   reviews are verified).
6. **No blog/resources** — zero informational content for topical authority.
7. **Thin pages:** `/coverage` and `/contact` are single re-wrapped homepage
   sections (`src/pages/CoveragePage.jsx` is 3 lines); as standalone indexed
   URLs they are thin/duplicate content against the homepage.
8. **No privacy policy, terms of service, accessibility statement, or
   HIPAA/PHI notice** — the forms collect names, phones, and free-text medical
   details (including children's needs, `src/pages/RequestCoverage.jsx:69`)
   into Supabase with no consent language, no privacy link, and no data-use
   statement. This is a compliance gap and also a Google quality signal
   (YMYL trust).

## 8. Local SEO gaps

1. **No city landing pages.** Edinburg, McAllen, Mission, Pharr, Weslaco,
   Harlingen, Brownsville exist only as SVG map dots and a chip list
   (`src/components/CoverageMap.jsx:6-19`) and one sentence in the request
   sidebar (`src/pages/RequestCoverage.jsx:94`). No crawlable city+service
   content exists for queries like "dialysis transport Harlingen".
2. **NAP is not machine-readable.** Address "2526 W. Freddy Gonzalez, Edinburg
   TX 78539" appears in five components as plain text with slightly varying
   formats (with/without "Dr", with/without ZIP: `src/components/About.jsx:55`
   omits the ZIP) and no `<address>` markup, no schema, no map link.
3. **No Google Business Profile linkage** — no GBP link, no map embed, no
   review link; the "5.0 Google Rated" claim has no target.
4. **County-level terms** (Hidalgo, Cameron, Starr) exist only as SVG text
   inside the map graphic, invisible as content.
5. **Only one outbound trust link** (Facebook). No citations to/from local
   directories, hospital systems, dialysis centers, or school districts.
6. **Email on a gmail.com address** (`lifestarems.rgv@gmail.com`,
   `src/components/Footer.jsx:46`) rather than the domain; weak trust signal
   and inconsistent with `dev@lifestaremsrgv.com` used in git config and
   `info@lifestaremsrgv.com` referenced in `README.md:72`.

## 9. Accessibility findings

1. **Form labels are not programmatically associated.** All forms use
   `<label>` adjacent to `<input>` with no `htmlFor`/`id` pairing
   (`src/components/Contact.jsx:72-76`, `src/pages/RequestCoverage.jsx:48-69`,
   `src/pages/EventStandby.jsx:123-142`). Screen readers announce unlabeled
   fields; clicking labels does not focus inputs.
2. **Services dropdown button has no `aria-expanded`/`aria-haspopup`**
   (`src/components/Navbar.jsx:67`), and the dropdown is not keyboard-dismissable
   (closes only on mousedown outside, `Navbar.jsx:33-39`; no Escape handling).
3. **Mobile menu close button has no accessible name**
   (`src/components/Navbar.jsx:109` — icon-only `<button>`; the burger at
   `Navbar.jsx:96` does have `aria-label="Toggle menu"`).
4. **Decorative emoji exposed to screen readers** in nav items, trust badges
   (`src/pages/TherapyTransport.jsx:113-116`), and headings (see M3); floating
   animated emoji lack `aria-hidden` (`TherapyTransport.jsx:73-82`).
5. **No `prefers-reduced-motion` handling anywhere** (grep across all CSS
   returned nothing) despite continuous star fields, shooting stars, pulsing
   rings, and floating icons on therapy/pediatrics pages.
6. **SVG coverage map has no text alternative** — city data is only visual/
   hover-based (`src/components/CoverageMap.jsx:49-152`; `<svg>` lacks
   `role="img"`/`aria-label`; hover-only interactions exclude keyboard users).
   The chip list partially mitigates this.
7. **Success/error status messages are not announced** — form status swaps are
   plain divs with no `aria-live`/`role="status"`
   (`src/components/Contact.jsx:61-67`, `src/pages/EventStandby.jsx:117-118`).
8. **Skip link absent**; keyboard users must tab through the entire nav on
   every page.
9. **Heading order issues:** section labels are styled `<span>`s (fine), but
   several pages jump straight from `h1` to multiple `h2`/`h3` groupings inside
   cards; overall structure is acceptable, worth a manual pass.
10. **Color contrast requires manual verification** — light-blue text on navy
    backgrounds (e.g. `--blue-light` on `#0C1E3A`) may pass, but the low-opacity
    SVG map labels (`rgba(168,200,220,0.9)` at 7-9px) will not; they are inside
    an image-like graphic so severity is moderate.

## 10. Performance findings

1. **Single 498 kB JS bundle (143 kB gzip)** — no code splitting; all seven
   pages plus react-icons ship on first load (`npm run build` output). For
   comparison, this site's actual interactive needs (menu toggle, forms) are
   tiny.
2. **JPEG/PNG images unoptimized** (257-374 kB photos; 9 logo variants; see H9).
3. **Continuous CSS animations** (80-star field + 5 shooting stars + nebula
   blobs on therapy page; 55 stars on pediatrics; 10 hero particles) consume
   main-thread/GPU on low-end phones — the site's dominant audience is mobile.
4. **`Math.random()` during render** (`src/pages/TherapyTransport.jsx:216-220`)
   — flagged by ESLint (8 errors); regenerates 30 star positions every re-render
   of the CTA banner.
5. **No font strategy issues** (system fonts — good).
6. **No caching concerns** — Vercel defaults are fine; asset hashing present.
7. Real-user metrics (LCP/INP/CLS) **require owner confirmation** via
   PageSpeed Insights / Search Console once access exists.

## 11. Conversion findings

Strengths: persistent mobile call bar (`src/components/Navbar.jsx:151-158`),
tel: links everywhere, clear service-specific CTAs, short request form, sticky
navbar CTA. These are genuinely good.

Issues:

1. The **global meta description advertises a different phone number** than
   every on-page CTA (C1) — a caller who finds the number via Google may reach
   a dead line.
2. **"Free evaluation" / "Free quote"** promises appear on dialysis, therapy,
   pediatrics, events pages — fine if true; **requires owner confirmation**.
3. **Form fallbacks reference the dispatch number** — good — but there is no
   server-side notification path visible (Supabase insert only; no email/SMS
   trigger in the repo), so **form submissions are only seen if someone checks
   the Supabase table**. If nobody monitors it, "we'll contact you within 2
   hours" fails silently. **Requires owner confirmation** of the notification
   workflow (a Supabase webhook/edge function may exist outside the repo).
4. **No thank-you routes** (`/request` success is in-page state), so no
   conversion tracking destination; no analytics of any kind in the repo (no
   GA4, no Vercel Analytics, no Meta pixel).
5. **Unknown-path visitors see a blank page** (C6) — dead end with no CTA.

## 12. Trust and compliance findings

1. Unverified "★ 5.0 Google Rated" (C5).
2. Unverified insurer acceptance list and Medicare/Medicaid claims (H4).
3. Unverified license/certification wording (H5).
4. Named school districts and organizations as clients without documented
   permission (H4).
5. No privacy policy despite collecting PII/health-adjacent data (Content gap 8).
6. No emergency disclaimer on rendered pages: the component that said
   "Medical Emergency? Call 911" (`src/components/EmergencyBar.jsx`) was
   deliberately un-rendered ("no 911" commits). A non-emergency medical
   transport site should still carry a clear "call 911 for emergencies" notice
   near its contact points; its absence plus the "emergency ... 24/7" meta
   description (C1) is the worst possible combination.
7. Form success promises ("within 2 hours") create implied service contracts
   (H6).
8. `README.md:71-72` confirms the site was built from a template checklist
   ("Search for these and replace with your real details: 9566489774 → your
   phone") — the index.html description was simply never updated. This
   strengthens the case that (956) 660-6543 is correct, but confirmation is
   still required.

## 13. Evidence index (key file/line references)

| Fact | Location |
|---|---|
| Global title | `index.html:12` |
| Global description with (956) 648-9774 + "emergency 24/7" | `index.html:7` |
| og:url apex, no og:image | `index.html:9-11` |
| SPA rewrite | `vercel.json:5-7` |
| Routes, no `*` route | `src/App.jsx:44-53` |
| "★ 5.0 Google Rated" | `src/components/Hero.jsx:9` |
| Dispatch number canonical usage (examples) | `src/components/Navbar.jsx:87,142,153`; `src/components/Footer.jsx:45`; `src/components/Contact.jsx:31` |
| Address occurrences | `src/components/Contact.jsx:33`, `src/components/Footer.jsx:47-48`, `src/components/About.jsx:55`, `src/pages/DialysisTransport.jsx:72`, `src/pages/TherapyTransport.jsx:204` |
| Hours "Mon–Sat" | `src/components/Contact.jsx:34` |
| "7 days a week" | `src/pages/DialysisTransport.jsx:62` |
| "Available Scheduled" broken copy | `src/pages/DialysisTransport.jsx:72`, `src/pages/RequestCoverage.jsx:82` |
| Insurance claims | `src/components/About.jsx:13`; orphaned `src/components/Insurance.jsx:3-18` |
| Partner organizations | `src/pages/EventStandby.jsx:19-27,89-103` |
| License/BLS/ALS claims | `src/components/About.jsx:6`, `src/components/Hero.jsx:7`, `src/pages/EventStandby.jsx:65,113` |
| 2-hour promise | `src/pages/RequestCoverage.jsx:28,41` |
| 24-hour quote promise | `src/pages/EventStandby.jsx:118` |
| Non-emergency disclaimer (rendered) | `src/pages/RequestCoverage.jsx:72` |
| 911 bar (orphaned) | `src/components/EmergencyBar.jsx` |
| Supabase form inserts | `src/components/Contact.jsx:15`, `src/pages/EventStandby.jsx:38`, `src/pages/RequestCoverage.jsx:15` |
| Lint failures (8 errors) | `src/pages/TherapyTransport.jsx:216-220`, `src/pages/PediatricsTransport.jsx:32`, `src/components/Navbar.jsx:28` |
| Bundle size | `npm run build` output (dist/assets/index-D35-6Tm6.js 498.11 kB) |
| Facebook page link | `src/components/Footer.jsx:16` |
| Email addresses | `src/components/Footer.jsx:46` (gmail), `README.md:72` (info@), git author `dev@lifestaremsrgv.com` |

## 14. Prioritized severity table

| ID | Severity | Finding | Verified? |
|---|---|---|---|
| C1 | Critical | Meta description: wrong phone (956) 648-9774 + "emergency 24/7" claim | Repo verified; correct number needs owner |
| C2 | Critical | One global title/description for all routes | Verified |
| C3 | Critical | No robots.txt / sitemap.xml | Verified in repo |
| C4 | Critical | Empty-shell HTML; no og:image; JS-dependent content | Verified |
| C5 | Critical | Unverified "5.0 Google Rated" claim | Needs owner |
| C6 | Critical | No 404 route; soft 404s sitewide | Verified |
| H1 | High | No canonicals; www vs apex unresolved | Partially; redirect needs owner |
| H2 | High | No structured data (LocalBusiness etc.) | Verified |
| H3 | High | No og:image/twitter card | Verified |
| H4 | High | Insurance + partner-org claims unverified | Needs owner |
| H5 | High | License/BLS/ALS wording unverified | Needs owner |
| H6 | High | Response-time promises unverified | Needs owner |
| H7 | High | Conflicting hours; "Available Scheduled" broken copy | Verified inconsistency |
| H8 | High | vercel.app duplicate-domain indexing unchecked | Needs owner |
| H9 | High | 498 kB bundle; unoptimized images | Verified |
| M1 | Medium | Keywords meta tag (emergency terms) | Verified |
| M2 | Medium | Em dashes throughout copy | Verified |
| M3 | Medium | Emoji in nav/headings | Verified |
| M4 | Medium | Favicon/manifest/apple-touch gaps | Verified |
| M5 | Medium | No Spanish content despite bilingual claims | Verified |
| M6 | Medium | "Pediatric Page" footer duplicate link | Verified |
| M7 | Medium | Weak internal linking, no breadcrumbs | Verified |
| M8 | Medium | og:url not per-route | Verified |
| M9 | Medium | Orphaned components carrying unverified claims | Verified |
| M10 | Medium | Duplicate/unused image assets | Verified |
| L1 | Low | Lint: Math.random in render, unused vars, setState-in-effect | Verified |
| L2 | Low | No analytics/conversion tracking | Verified |
| L3 | Low | No skip link | Verified |
| L4 | Low | gmail.com contact address | Verified |
| L5 | Low | SVG map contrast/keyboard access | Verified |
| L6 | Low | Thin `/coverage`, `/contact` wrapper pages | Verified |

## 15. Verified vs. requires-owner-confirmation summary

**Verified from repository/build/APIs:** C2, C3, C4, C6, H2, H3, H7 (the
inconsistency), H9, all Medium and Low items, deployment facts in
DEPLOYMENT-AUDIT.md.

**Requires owner confirmation before any copy is published:** correct dispatch
number (C1), Google rating (C5), insurer list and Medicare/Medicaid (H4),
partner organizations and permission to name them (H4), license/certification
wording and TX DSHS license number (H5), response-time promises (H6), true
hours (H7), redirect and vercel.app indexing behavior (H1, H8), form
notification workflow, and everything listed in SEO-FACT-VERIFICATION.md.
