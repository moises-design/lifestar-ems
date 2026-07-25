# Government Contracting Hub

Date: 2026-07-25
Branch: `claude/lifestar-government-contracting`
Route: `/government-contracting`

## 1. Source of truth

All facts on this page come from the committed capability statement:

`docs/source/Life_Star_EMS_Capability_Statement.pdf`
(committed at `3b2fbb6`, SHA-256 `da4b2a80…9911462c1`)

That PDF is the **original, unmodified source** and must never be edited or
regenerated. The public copy served to visitors is a byte-identical copy:

`public/documents/life-star-ems-capability-statement.pdf`
→ served at **`https://www.lifestaremsrgv.com/documents/life-star-ems-capability-statement.pdf`**

Both files share the same SHA-256 hash (verified at build time and again in
this document). If the capability statement is ever updated, replace
**both** files with the new original (`git mv`/copy, never edit in place)
and re-verify the hash match before committing.

All page copy is centralized in `src/v2/content/government.js` — no
government fact is hardcoded in a component. Every string in that file
traces back to a line in the PDF; the file's header comment repeats the
factual safeguards below so future edits don't drift from the source.

## 2. Contracting phone vs. dispatch phone

Two numbers appear on this page, always labeled, never combined:

| Number | Label | Purpose |
|---|---|---|
| (956) 309-3052 | "Contracting and Administrative Contact" | Heather Ayala-Segovia, CEO — procurement, RFIs, capability statement requests |
| (956) 660-6543 | "24/7 Dispatch" | Active transports and immediate operational needs (the number used everywhere else on the site) |

## 3. Verified DSHS wording

The page uses the exact phrase **"Current, Ground Only, BLS"** wherever the
DSHS provider status is stated. The site does not claim ALS licensure
anywhere; a code search for a standalone "ALS" claim on the page returns
none (verified in testing — see §9).

## 4. Ownership claim safeguards

Ownership ("Woman-owned, minority-owned, Hispanic American-owned") is
labeled **company-provided information** with the qualifier "Certification
status should be verified for each solicitation" directly beneath it. The
page makes no WOSB/EDWOSB/8(a)/HUBZone/SDVOSB/VOSB/SBA-certification claim;
verified by a text search in testing that returns no matches for those
terms.

## 5. Page architecture

Single route, `src/pages/GovernmentContracting.jsx`, styled by
`GovernmentContracting.css` (tokens-only, no new colors). Sections, in
order: procurement hero with identity panel → contracting overview →
core capabilities (3 grouped cards) → differentiators → representative
experience → identifiers and codes (the page's one dark/night chapter,
matching the "Calm Response" single-night-band rule) → operational
readiness → who we support → capability statement download → contracting
contact + inquiry form → FAQ → final CTA. One `<h1>`, sequential `<h2>`s,
a breadcrumb nav, and page-scoped JSON-LD.

## 6. Identifiers UI

Short identifiers (UEI, CAGE, NAICS, DSHS number) have an accessible
"Copy" button using the Clipboard API with a visible state change
("Copy" → "Copied" for 2s) and an `aria-live` status region for screen
readers; falls back to "Select and copy" if the clipboard API rejects.
Every important identifier also exists as plain HTML text — nothing is
communicated only through the copy button or through the PDF.

## 7. Inquiry form

Reuses the existing form infrastructure: same Supabase table
(`contact_submissions`) and insert pattern already used by
`/request`, `/services/events`, and `/contact` — no new backend was
introduced, honestly reusing what already works rather than faking a new
flow. The structured fields (organization, agency type, solicitation
number, service, location, dates, capability-statement checkbox, preferred
contact method) are packed into the existing `message` column, matching
the pattern already used by the event-standby form. A hidden honeypot
field (`website`, visually hidden, `tabIndex={-1}`) silently drops bot
submissions without a fake success state. All 12 fields have associated
`<label for>`s; required-field browser validation was verified; error and
success states use `role="alert"`/`role="status"`.

**Known limitation:** like the rest of the site's forms, there is no
email/SMS notification wired to new Supabase rows — submissions must be
checked in the Supabase dashboard. This was already a known gap from the
SEO audit and is not new to this mission; flagged again here because
government inquiries are higher-stakes to miss.

## 8. How to update identifiers or replace the capability statement later

1. Edit facts only in `src/v2/content/government.js` — never in the JSX.
2. To replace the PDF: put the new original at
   `docs/source/Life_Star_EMS_Capability_Statement.pdf`, copy it
   byte-identical to `public/documents/life-star-ems-capability-statement.pdf`,
   and update `gov.pdfMeta` (size/page count) in `government.js` if changed.
3. Verify the copy with `sha256sum` on both files before committing (must
   match).
4. If any new fact requires a certification not yet verified (WOSB, 8(a),
   etc.), do not add it to this page until it is confirmed by a separate
   verified source, per the project's fact-verification rules.

## 9. SEO and structured data

- `src/seo/routeMeta.js`: unique title "Government Contracting | Life Star
  EMS" and a 160-character description, both picked up automatically by
  `src/components/Seo.jsx` (canonical, OG, Twitter tags — no new machinery
  needed, the existing per-route system covers it).
- `public/sitemap.xml`: `/government-contracting` added.
- `robots.txt`/global robots policy: unchanged, page is indexable (no
  `noindex`).
- Page-scoped JSON-LD (`@graph`): `Organization` with `identifier`
  PropertyValues for UEI/CAGE/DSHS provider number and a `PostalAddress`;
  `Service` describing EMS/medical transportation for public agencies;
  `BreadcrumbList`; `FAQPage` built directly from the visible FAQ content
  (schema and visible text never diverge, since both read from the same
  `gov.faq.items` array). No `aggregateRating`, no certification claims,
  no invented values in schema — same discipline as the site's existing
  `index.html` Organization block.

## 10. Accessibility

Landmarks, one h1, sequential headings, breadcrumb nav, associated form
labels, `role="alert"`/`role="status"` messaging, visible focus rings
(inherited from the global `.v2 :focus-visible` rule), 48px minimum touch
targets on all buttons/links (verified via the shared `--v2-tap-min`
token), reduced-motion support (page uses no motion beyond the inherited
`prefers-reduced-motion` collapse), and no text conveyed only through the
PDF thumbnail (the "document card" thumbnail is `aria-hidden`; title,
description, and file info are real text beside it).

## 11. Known limitations / facts requiring future verification

- No email/SMS notification on new inquiry submissions (existing sitewide
  gap, not introduced here).
- The document card ships as a static styled placeholder (brand mark +
  wordmark on the night color), not a rendered thumbnail of the actual PDF
  page — this sandbox has no PDF rasterizer available, and the spec
  explicitly disallows heavy PDF-viewer embeds. If a real visual thumbnail
  is wanted later, generate one PNG from page 1 of the PDF (e.g. with
  `pdftoppm`) and swap `.gc-doc-sheet` for an `<img>`; the file stays a
  presentation-only image, never the source of the facts.
- No certifications beyond what's in the PDF (SAM Active, Texas CMBL,
  company-provided ownership description) are claimed; if the owner later
  obtains SBA certifications (WOSB, 8(a), etc.), add them only after
  verification, not from this document.
