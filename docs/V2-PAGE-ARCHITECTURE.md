# Life Star EMS V2 — Page Architecture

Date: 2026-07-24
Companion: `docs/V2-CREATIVE-DIRECTION.md` (direction), `docs/V2-DESIGN-SYSTEM.md`
(tokens), `docs/V2-PHOTOGRAPHY-PLAN.md` (image IDs referenced below as `PH-xx`).

Rules: route paths are unchanged from V1.5. Every page keeps one `h1`, its
existing metadata from `src/seo/routeMeta.js`, and only verified facts. Copy
shown here is placeholder direction, not final; no em dashes in any final copy.

---

## 1. Homepage `/`

Refined section order (changes from the suggested starting point are noted):

| # | Section | Purpose | Notes vs. suggested order |
|---|---|---|---|
| 1 | Premium navigation | Orient + one action | as suggested |
| 2 | Editorial hero | One calm promise + dispatch path | as suggested |
| 3 | Numbered service index | Immediate service paths | as suggested |
| 4 | **How scheduling works** | 3 steps: call or request, we verify and coordinate, consistent rides | **added**; NEMT customers ask "how does this even work" before anything else; research showed process clarity is a trust signal (Amigo's chaptered index) |
| 5 | Human trust story | One dialysis rider narrative told with photography | as suggested |
| 6 | Service feature chapters | Dialysis / therapy / pediatric long-distance / events, alternating editorial rows | as suggested |
| 7 | Crew and operations (dark chapter) | Who shows up; vehicle and equipment care | as suggested; this is the single navy band |
| 8 | Coverage across the RGV | Light redrawn map + city list | as suggested |
| 9 | Event standby proof | Friday-lights photography + organizer path | kept, but framed as a second audience door, not more badges |
| 10 | Facility, school, and family paths | Three audience cards routing to request/contact | as suggested |
| 11 | Verified reviews placeholder | Superpower-style portrait quotes; **hidden until real reviews are verified** | as suggested, with an explicit ship-empty rule |
| 12 | FAQ | 6 real scheduling/insurance-process questions | as suggested |
| 13 | Large scheduling CTA band | Phone + request form link | as suggested |
| 14 | Footer | NAP, services, company, legal | as suggested |

### Homepage wireframe (Markdown)

```
┌────────────────────────────────────────────────────────────────────┐
│ NAV  [◆ Life Star EMS]   Services ▾  Service Area  For Events      │
│      Contact                     (956) 660-6543   [Request a Ride] │
├────────────────────────────────────────────────────────────────────┤
│ HERO (paper background)                                            │
│  SCHEDULED MEDICAL TRANSPORT · RIO GRANDE VALLEY   ← micro-caps    │
│  H1 (serif, 2 lines):                                              │
│  "Getting you to care,                                             │
│   calmly and on time."                                             │
│  │ One short paragraph (non-emergency positioning, RGV).           │
│  [Request a Ride]   [Call dispatch (956) 660-6543]                 │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │ PH-01 documentary photo: EMT + older rider at van door,      │  │
│  │ morning light, full-width media panel, rounded 16px          │  │
│  └──────────────────────────────────────────────────────────────┘  │
│  quiet line: "Locally owned and operated in Edinburg, Texas"       │
├────────────────────────────────────────────────────────────────────┤
│ SERVICE INDEX ("What we do", table-of-contents feel)               │
│  01  Dialysis transportation            → /services/dialysis       │
│  02  Pediatric therapy transportation   → /services/therapy        │
│  03  Pediatric and long-distance trips  → /services/pediatrics     │
│  04  Event EMS standby                  → /services/events         │
│  (rows with hairline dividers; hover reveals small photo PH-05..08)│
├────────────────────────────────────────────────────────────────────┤
│ HOW IT WORKS (3 quiet steps, numbered)                             │
│  1 Call or request online   2 We verify and coordinate             │
│  3 The same crew, every visit*         (*wording pending owner)    │
├────────────────────────────────────────────────────────────────────┤
│ HUMAN TRUST STORY (editorial split)                                │
│  Left: serif pull-statement about a typical dialysis morning       │
│  Right: PH-02 rider assisted to door (dignity framing)             │
│  [Placeholder slot: verified family quote when available]          │
├────────────────────────────────────────────────────────────────────┤
│ SERVICE CHAPTERS (4 alternating rows, photo/text, micro-caps label)│
│  01 DIALYSIS ... photo PH-05 ... 3 short facts ... link            │
│  02 THERAPY ... PH-06 ... link      (child + parent, respectful)   │
│  03 LONG-DISTANCE ... PH-07 ... link (statewide, coordinated)      │
│  04 EVENTS ... PH-08 ... link       (sideline crew, dusk)          │
├────────────────────────────────────────────────────────────────────┤
│ CREW & OPERATIONS (single DARK navy chapter)                       │
│  "Who shows up when you call"                                      │
│  Photo collage PH-03/PH-04/PH-09 with numbered caption chips       │
│  Facts only as verified: bilingual staff*, equipment checks,       │
│  scheduled maintenance  (*pending fact sheet)                      │
├────────────────────────────────────────────────────────────────────┤
│ COVERAGE (light)                                                   │
│  Redrawn quiet RGV map · city chips (Edinburg HQ ... Brownsville)  │
│  Long-distance note + link to /coverage                            │
├────────────────────────────────────────────────────────────────────┤
│ EVENT STANDBY DOOR (photo band PH-10, Friday lights)               │
│  For athletic directors and organizers → [Request event coverage]  │
├────────────────────────────────────────────────────────────────────┤
│ THREE AUDIENCE PATHS                                                │
│  [For families] [For facilities & case managers] [For schools]     │
├────────────────────────────────────────────────────────────────────┤
│ REVIEWS (placeholder, ships hidden until verified)                 │
├────────────────────────────────────────────────────────────────────┤
│ FAQ (6 items, accordion, schema-ready)                             │
├────────────────────────────────────────────────────────────────────┤
│ BIG CTA BAND (ink navy)                                            │
│  "Schedule a ride this week."  [Request a Ride]  (956) 660-6543    │
├────────────────────────────────────────────────────────────────────┤
│ FOOTER (full-bleed ink)                                            │
│  ◆ wordmark + one-line mission                                     │
│  SERVICES / COMPANY / CONTACT (NAP) / LEGAL columns, micro-caps    │
│  911 notice line (pending owner approval)                          │
└────────────────────────────────────────────────────────────────────┘
```

## 2. Dialysis transportation `/services/dialysis`

1. Chapter hero: micro-caps `01 DIALYSIS TRANSPORTATION`, serif h1, one
   paragraph, request + call buttons, PH-05 wide photo.
2. The rhythm section: three-times-a-week reality, how standing schedules
   work (the strongest verified differentiator).
3. What a pickup looks like: step photos (door, securement, arrival),
   dignity-first.
4. Insurance and eligibility explainer (process only until facts verified;
   no insurer logos).
5. Coordination with treatment centers (generic until named partners are
   verified).
6. FAQ (5 dialysis-specific questions).
7. CTA band + cross-links to therapy and coverage pages.

## 3. Therapy transportation `/services/therapy`

Same chapter skeleton with: parent-trust lead (ride-along policy pending
verification), therapy-cadence scheduling, child-safety section (seats,
securement, driver consistency; verified wording only), what parents receive
(communication), FAQ, CTA. Photography PH-06 family/child scenes replace all
space-theme visuals.

## 4. Pediatric transportation `/services/pediatrics`

Chapter skeleton with: statewide scope map moment (RGV to Houston, San
Antonio, Dallas, Corpus Christi as a quiet route diagram), long-trip
preparation and family coordination, who rides along, planning checklist,
FAQ, CTA. PH-07.

## 5. Event standby `/services/events`

Chapter skeleton with: organizer-first hero (PH-10), what a standby crew
brings (verified equipment list only), how quoting works (single day vs
season), venue types (schools, runs, concerts, community), a proof slot for
named events pending permission, FAQ, CTA into the event form.

## 6. Coverage `/coverage`

Becomes a real page instead of a re-wrapped section: intro paragraph, the
redrawn light map as the hero object, city list grouped by county, long-
distance panel, "not sure? call" CTA. Prepares slots for future city pages
(Mission 6 of the SEO plan) without creating them yet.

## 7. Contact `/contact`

Real page: NAP block with map link, hours (once verified), the existing
short form restyled with proper labels, dispatch phone as the dominant
object, and the 911 notice line (pending owner approval). No new facts.

## 8. Request transportation `/request`

The conversion page stays structurally what it is (it works): form left,
reassurance right. V2 restyles it, improves labels/focus/error states,
splits visually into "who / when / where / needs" groups, and keeps the
non-emergency note. Response-time promises removed until verified.

## 9. 404 page `*`

Keeps noindex + helpful links. V2 warms it: one small documentary photo,
plain-language line, link columns (services, coverage, contact, request),
dispatch phone. Hims's 404 is the tone reference, not the layout.

---

### Global architecture notes

- Header and footer are shared shells delivered in Mission 2; all pages
  inherit them.
- Every service page ends with the same CTA band component (one
  implementation, four uses).
- Breadcrumb line (`Home / Services / Dialysis`) appears on service pages
  in V2; schema for it arrives with Mission 10 verification.
- The persistent mobile call/request bar remains on all pages except the
  request page itself (where it duplicates the form CTA).
