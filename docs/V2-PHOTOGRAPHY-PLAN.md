# Life Star EMS V2 — Photography Plan

Date: 2026-07-24

Photography carries the V2 direction. This plan defines every required image,
its temporary source (AI mock vs existing asset), and the future real shot it
must be replaced by. All AI mocks are placeholders and are tracked here until
retired.

Reference language (inspiration only, nothing copied): Waabi/Aurora
golden-hour working-vehicle photography; Superpower natural-light portraits;
Amigo numbered documentary collages; Ease warm interiors.

---

## 1. Image inventory

Aspect ratios: `21:9` cinematic band, `3:2` editorial, `4:5` portrait,
`1:1` square chip. Desktop crop describes the wide use; mobile crop is the
art-directed re-crop (never a naive center crop of faces).

| ID | Scene | Purpose / placement | Ratio | Desktop crop | Mobile crop | Temp source |
|---|---|---|---|---|---|---|
| PH-01 | EMT offering a steadying arm to an older rider at the van side door, soft morning light | Homepage hero | 3:2 | rider + EMT right-of-center, door frame context | tighten to hands/faces, 4:5 | AI mock |
| PH-02 | Rider walked to their front door after a ride, porch light, back three-quarter view | Human trust story | 4:5 | full figures + doorway | same, slightly tighter | AI mock |
| PH-03 | Two-person crew doing a morning equipment check at the open rear doors | Crew chapter collage `01` | 3:2 | both crew + shelving context | single crew member detail | AI mock |
| PH-04 | Dispatcher/scheduler at a desk with headset, warm office light | Crew chapter collage `02`; contact page | 1:1 | head-and-hands workspace | same | AI mock |
| PH-05 | Wheelchair rider secured in vehicle, EMT at eye level talking with them | Dialysis chapter + page hero | 3:2 | both faces visible, ramp context | 4:5 on the conversation | AI mock |
| PH-06 | Parent and child walking with an EMT toward the vehicle, child holding parent's hand | Therapy chapter + page hero | 3:2 | all three, generous sky | 4:5 parent+child | AI mock |
| PH-07 | Van on an open Texas highway at first light, wide landscape | Long-distance chapter + pediatrics page | 21:9 | vehicle small in landscape | 3:2 re-crop, vehicle larger | AI mock |
| PH-08 | EMS crew standing sideline at a stadium at dusk, field lights on, watching play | Events chapter | 3:2 | crew foreground, field bokeh | 4:5 crew pair | AI mock |
| PH-09 | Hands checking a strap/kit item, close detail, shallow depth | Crew collage `03`; texture uses | 1:1 | detail only | same | AI mock |
| PH-10 | Ambulance parked outside a medical facility entrance, early morning, no urgency | Events/facility band; coverage page | 21:9 | building + vehicle balance | 3:2 vehicle-led | AI mock |
| PH-11 | The Life Star vehicle photographed clean at sunrise, three-quarter front, Valley landscape | Brand band, social/OG refresh later | 3:2 | full vehicle, warm sky | 1:1 front detail | **Real only** (brand vehicle cannot be faked honestly; use no temp or a silhouette treatment until shot) |
| PH-12 | Team group portrait, relaxed, outside the Edinburg base | About/company use, footer moment | 3:2 | full team | 4:5 center group | **Real only** |

## 2. Existing repository assets: reuse or retire

| Asset | Verdict |
|---|---|
| `public/images/ambulance-1.jpg` (257 kB) | Review with owner: if it is a real Life Star vehicle, keep as interim PH-10/PH-11 stand-in after compression; if stock, retire |
| `public/images/photo-2.jpg`, `photo-3.jpg` | Same review; likely usable as interim crew/vehicle shots if genuinely Life Star; compress to WebP/AVIF regardless |
| `logo-*.png` family (9 variants) | Keep `logo-icon.png` + one white variant; archive the rest (duplicates already noted in the audit) |
| Insurer SVGs (`aetna.svg`, `bcbs.svg`, ...) | Not used in V2 until insurance facts are verified; keep in repo, out of UI |
| Org SVGs (`psja.svg`, `edinburg-cisd.svg`, ...) | Same: out of UI pending written permission |
| Space-theme visual system (CSS star fields, rockets, emoji) | Retire in V2 page missions |

## 3. AI mock generation rules (temporary placeholders)

Every AI mock must:

- look documentary (natural light, imperfect framing, no glamour retouching);
- contain **no readable text**: no logos, patches, badges, unit numbers,
  door lettering, or signage; uniforms are plain navy/gray;
- avoid medical inaccuracies: no procedures shown, no IVs/monitors in NEMT
  contexts, securement only in generic form, nothing depicting emergency care;
- show calm scheduled moments only: no lights-and-sirens, no distress, no
  crying patients, no stretcher urgency;
- depict no real or implied organizations, schools, or facilities;
- cast respectfully and locally plausibly (RGV is majority Hispanic; avoid
  tokenism and avoid identifiable-child close-ups in mocks);
- be stored under `public/images/mock/` with the `PH-xx` ID in the filename
  and listed in the table below when generated (none generated yet);
- carry an internal manifest note (`docs/` table update) marking it
  TEMPORARY, and be replaced by the real shot before any "final" milestone.

AI mocks are design scaffolding. They must never be presented to the public
as photos of Life Star staff, patients, or vehicles; if V2 ships to
production before the photo shoot, hero/crew mocks must be reviewed with the
owner and either accepted as clearly generic scene imagery or swapped for
real interim photos.

## 4. Future real shot list (one half-day + one event visit)

Morning session (approx. 3 hours, Edinburg base + one route):
1. PH-11 vehicle at sunrise (multiple angles, the money shot)
2. PH-03 crew equipment check
3. PH-09 detail hands/kit
4. PH-05 securement scene with a consenting rider or staff stand-in
5. PH-01 door-assist scene
6. PH-04 dispatcher at desk
7. PH-12 team portrait

Event visit (any covered evening event, approx. 1 hour):
8. PH-08 sideline crew at dusk
9. PH-10 vehicle staged at venue/facility

Requirements: signed releases for every recognizable face (staff and
riders/families), no PHI visible (no paperwork, screens, or door lists in
frame), school/venue permission before shooting on site, RAW + 3:2 minimum
resolution 4000px wide.

## 5. Safety and accuracy checklist (applies to every image, mock or real)

- [ ] No implied emergency response or speed
- [ ] No readable third-party names, logos, or campuses without permission
- [ ] No visible patient information anywhere in frame
- [ ] Securement/equipment shown correctly or generically, never wrongly
- [ ] Dignity check: would the person in the photo be proud of it?
- [ ] Release on file (real photos) / TEMPORARY flag on file (mocks)
- [ ] Compressed to AVIF/WebP with width variants before entering the repo
