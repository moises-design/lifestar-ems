# Real Photography and Leadership

Documents the authentic Life Star EMS photography and the Heather Ayala-Segovia
leadership content added on `claude/lifestar-real-photography-leadership`.

## Source images

All source photography lives in `public/images/company/`, committed unchanged
at `50bf985`:

| File | Content | Native size |
|---|---|---|
| `heather-ayala-segovia-standing.jpg` | CEO portrait, standing, full body | 4785x5982, ~5.7 MB |
| `heather-ayala-segovia-seated-close.jpg` | CEO portrait, seated, closer crop | 4530x5662, ~10.5 MB |
| `heather-ayala-segovia-seated-full.jpg` | CEO portrait, seated, full body | 4640x5800, ~5.2 MB |
| `ambulance-american-flag.jpg` | Transport van under a large American flag, dusk | 414x414, ~20 KB |
| `ambulance-sunset.jpg` | Ambulance at a school stadium track, sunset | 414x414, ~24 KB |
| `event-mission-stadium.jpg` | Crew member with transport equipment at Tom Landry Stadium (Mission CISD) | 414x414, ~37 KB |
| `medical-transport-van.jpg` | Transport van at a South Texas roadside stop | 414x414, ~24 KB |

Two previously-existing authentic photos were also put to use:

| File | Content | Native size |
|---|---|---|
| `public/images/ambulance-1.jpg` | Ambulance rear-quarter view, school track | 1400x1050, ~251 KB |
| `public/images/photo-2.jpg` | Ambulance side profile (unit LS-1), near a medical facility | 1400x1050, ~274 KB |

`public/images/photo-3.jpg` (ambulance side profile, unit LS-11) remains
authentic and available but was **not** placed on a page in this pass, to keep
each page restrained and avoid repeating similar shots. It is a good
candidate for a future placement (e.g. Coverage or Long-Distance Transport).

All original JPGs are unchanged and untouched by this work.

## Optimized derivatives

Every image actually displayed on the site has a resized, compressed
derivative in a sibling `optimized/` folder (same base filename, both `.jpg`
and `.webp`), referenced via a shared `<picture>` component
(`src/v2/Picture.jsx`) so modern browsers get WebP and everything else falls
back to the optimized JPG. The multi-megabyte originals are never linked from
any page.

| Source | Original | Optimized JPG | Optimized WebP | Resize |
|---|---|---|---|---|
| `heather-ayala-segovia-standing.jpg` | 5876 KB | 60 KB | 24 KB | 4785x5982 → 1100x1375 |
| `heather-ayala-segovia-seated-close.jpg` | 10743 KB | 100 KB | 44 KB | 4530x5662 → 1100x1375 |
| `heather-ayala-segovia-seated-full.jpg` | 5333 KB | 67 KB | 28 KB | 4640x5800 → 1100x1375 (generated but not yet placed on a page) |
| `ambulance-american-flag.jpg` | 20 KB | 20 KB | 13 KB | no resize (native 414x414) |
| `ambulance-sunset.jpg` | 24 KB | 24 KB | 17 KB | no resize |
| `event-mission-stadium.jpg` | 37 KB | 37 KB | 31 KB | no resize |
| `medical-transport-van.jpg` | 24 KB | 24 KB | 16 KB | no resize |
| `ambulance-1.jpg` | 251 KB | 232 KB | 166 KB | no resize (already at target size) |
| `photo-2.jpg` | 274 KB | 236 KB | 176 KB | no resize |

No image was upscaled. The four small 414x414 action photos were re-encoded
(quality 82 JPEG / quality 80 WebP) for consistency and modest savings, not
resized, since they were already at or below their display size.

Generated with Pillow (`ImageOps.exif_transpose` + Lanczos resampling +
`optimize=True, progressive=True` JPEG / `method=6` WebP). Portraits were
resized to 1100px wide (1375px tall, exact 4:5 ratio preserved, no cropping)
to comfortably support the largest display context (the About page executive
profile) at typical desktop pixel density without upscaling on any layout.

## Where each image is used

| Page | Section | Image | Loading |
|---|---|---|---|
| `/` (Homepage) | Hero media panel | `ambulance-american-flag.jpg` | `eager` + `fetchpriority="high"` (above the fold) |
| `/` (Homepage) | "Real people. Real units. Ready to serve." strip | `ambulance-sunset.jpg`, `event-mission-stadium.jpg`, `medical-transport-van.jpg`, `photo-2.jpg` | `lazy` |
| `/about` (new page) | "Who we are" company story | `ambulance-1.jpg` | `lazy` |
| `/about` (new page) | Leadership profile | `heather-ayala-segovia-standing.jpg` | `lazy` |
| `/government-contracting` | Woman-Owned Leadership | `heather-ayala-segovia-seated-close.jpg` | `lazy` |
| `/services/events` | Hero supporting image (`InnerPage` `media` slot) | `event-mission-stadium.jpg` | `lazy` |

`event-mission-stadium.jpg` intentionally appears twice (small strip
thumbnail on the homepage, larger contextual photo on the Events page) since
both placements were explicitly requested and serve different purposes; no
other image repeats across pages.

## Heather Ayala-Segovia — approved copy used verbatim

**About page (`/about`) leadership section:**

> Heather Ayala-Segovia
> CEO, Life Star EMS Inc.
>
> Heather Ayala-Segovia serves as CEO of Life Star EMS Inc. She leads the
> company with a focus on patient care, dependable operations, and service to
> South Texas communities. Under her leadership, Life Star EMS provides
> ambulance transportation, medical transportation, event EMS coverage, and
> disaster-response support.

**Government Contracting (`/government-contracting`) Woman-Owned Leadership
section:**

> Woman-Owned Leadership
>
> Life Star EMS Inc. is a woman-owned and family-operated EMS provider based
> in Edinburg, Texas. Since 2009, the company has supported patients,
> healthcare facilities, schools, universities, public agencies, and
> community events throughout South Texas.
>
> Under Heather Ayala-Segovia's leadership, Life Star EMS focuses on
> dependable service, operational readiness, bilingual patient support, and
> long-term relationships with the communities it serves.
>
> Heather Ayala-Segovia
> CEO, Life Star EMS Inc.

Both blocks are stored in content files, not hardcoded in JSX: the About copy
in `src/v2/content/en.js` (`pages.about.leadership`), the Government
Contracting copy in `src/v2/content/government.js` (`gov.leadership`).

## Woman-owned safeguard

This exact sentence is rendered directly beneath the Woman-Owned Leadership
section on `/government-contracting`, sourced from
`gov.leadership.safeguard`:

> Woman-owned status is based on company-provided information. Certification
> requirements should be verified for each solicitation.

No certification badges, seals, or claims of WOSB / EDWOSB / SBA / 8(a) /
HUBZone / SDVOSB / VOSB status were added anywhere. The existing DSHS wording
("Current, Ground Only, BLS") and the pre-existing ownership qualifier in the
Company Identifiers section were left completely unchanged.

## Structured data

A `Person` node (`@id`: `https://www.lifestaremsrgv.com/about#heather-ayala-segovia`,
`name`, `jobTitle: "CEO"`, `worksFor` referencing the existing `#organization`
entity) was added to the page-scoped JSON-LD on both `/about` and
`/government-contracting`. No awards, credentials, education, certifications,
or social profiles were added, per the mission's safeguards. The sitewide
`index.html` JSON-LD and `SITE.ogImage` (social-share image) were left
unchanged; Heather's portrait was **not** made the sitewide social image.

## How to replace the portraits later

1. Drop the new file(s) into `public/images/company/` (or wherever the
   existing file lives) with the same filename, or a new one if you update
   the reference in `src/pages/About.jsx` / `src/pages/GovernmentContracting.jsx`.
2. Regenerate the `optimized/` derivatives: resize to 1100px wide (maintain
   aspect ratio) and export both `.jpg` (quality ~82) and `.webp`
   (quality ~80) into `public/images/company/optimized/` with the same base
   filename. Any standard image tool or a short Pillow script works; see the
   sizes above for reference.
3. Leave the original, full-resolution file untouched in `public/images/company/`
   — it is the archival source, never linked from a page.

## How to add future company photography

1. Add the source JPG to `public/images/company/` (or a topically-named
   sibling folder if the collection grows).
2. Generate `optimized/<name>.jpg` and `optimized/<name>.webp` siblings
   (resize only if the source exceeds roughly 1200px on the long edge for a
   prominent placement, or leave native size for small supporting images).
3. Reference both via the shared `<Picture>` component
   (`src/v2/Picture.jsx`), passing `src`/`webp` pointing at the `optimized/`
   files, explicit `width`/`height` matching the derivative's pixel
   dimensions (prevents layout shift), accurate `alt` text, and
   `loading="lazy"` unless it is the single above-the-fold hero image (use
   `loading="eager"` and `fetchPriority="high"` there only).
4. Keep alt text factual: describe only what is visibly in the photo, never
   claim a fleet count, unit status, contract, award, date, crowd size, or
   organizational relationship the photo alone doesn't establish.

## Placeholder logo assets that remain intentionally unused

Per the mission's explicit instruction, none of the following were used or
modified. All are generic placeholder wordmarks (colored rectangles with
text), not authentic licensed logos, and stay out of the live UI pending real
artwork and written permission (see `docs/V2-PHOTOGRAPHY-PLAN.md`):

- `public/images/*.svg` insurance/payer logos (aetna, ambetter, bcbs, cigna,
  driscoll, healthspring, humana, medicaid, medicare, molina, private,
  superior, uhc, wellcare)
- `public/images/*.svg` school district / university / community org logos
  (edinburg-cisd, mission-cisd, psja, sharyland, utrgv, boys-girls-club,
  special-olympics)
- The entire `public/images/logos/` subfolder (duplicates/older variants of
  the above, plus three genuinely broken files — `bcbs.png`, `molina.png`,
  `uhc.png` each contain the literal text "Host not in allowlist" instead of
  image data)

## Images considered for later cleanup (not touched in this mission)

Per instructions, no old assets were deleted, renamed, or moved. These remain
exactly as documented in the prior image-library audit and are candidates for
a dedicated cleanup pass:

- The 8-file `logo*.png` family in `public/images/` (`logo.png`,
  `logo-blue.png`, `logo-final.png`, `logo-new.png`, `logo-inverted.png`,
  `logo-white.png`, `logo-transparent.png`, `logo-icon-white.png`) — a
  different, older brand mark than the live `/icon-192.png` family, unused
  by any current page.
- `logo-icon.png` — referenced only by orphaned V1 components
  (`src/components/Hero.jsx`, `Navbar.jsx`, `Footer.jsx`) that are not
  imported by `App.jsx` or reachable from any route.
- The entire `public/images/logos/` subfolder (see above).
- `public/images/photo-3.jpg` — authentic and available, not yet placed on
  any page.
