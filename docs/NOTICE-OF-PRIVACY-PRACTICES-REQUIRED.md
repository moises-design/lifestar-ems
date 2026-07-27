# Notice of Privacy Practices — status

Mission: Complete Life Star EMS Website Experience Transformation, Phase 21.

## Search performed

Searched the entire repository (`docs/`, `public/`, `src/`, root) for any
existing, owner-approved Notice of Privacy Practices (NPP) or HIPAA privacy
policy: `grep -rli "notice of privacy practices\|privacy practices\|NPP"`
across markdown, PDF, and text files, plus a filename search for
`*privacy*`. **No existing NPP was found anywhere in this repository.**
`docs/source/Life_Star_EMS_Capability_Statement.pdf` does not contain one
either (it is a capabilities/contracting document, not a privacy policy).

Per this mission's explicit instruction, **no NPP has been invented or
fabricated.** `/privacy` (`src/pages/Privacy.jsx`) is built only from the
site's actual, verifiable data flows: what the live forms collect, where
that data is stored, who can access it, and what third-party services the
site actually loads. It does not claim HIPAA compliance, because no HIPAA
compliance determination, Business Associate Agreement, or NPP could be
verified to exist.

## Supabase HIPAA / BAA configuration status — could not be inspected

This sandbox has no production Supabase credentials (`.env.example`
contains only placeholder values; no `.env` file exists in the working
tree or anywhere on disk). Without a live project reference, the Supabase
organization's HIPAA/BAA add-on status cannot be checked from this
session. **This is an owner-actionable follow-up**, not something this
mission can determine or claim either way:

- Log into the Supabase dashboard for the project backing
  `contact_submissions` / `long_distance_requests`.
- Check **Organization settings → HIPAA/BAA** (a paid Supabase add-on) for
  whether a Business Associate Agreement is in place.
- If Life Star EMS intends to collect any protected health information
  through this site in the future, a signed BAA with Supabase (or a
  migration to a HIPAA-eligible backend) is a prerequisite — not something
  the current RLS policies alone provide.

Until this is confirmed, `/privacy` and every form on the site correctly
make **no HIPAA-compliance claim**, and `PrivacyNotice` copy asks users not
to submit sensitive medical details through free-text fields.

## What Life Star EMS needs to do to close this gap

1. Have the business owner (or counsel) draft or adopt a real Notice of
   Privacy Practices, if the company determines one is legally required for
   its operations.
2. Confirm the Supabase BAA/HIPAA status directly in the Supabase
   dashboard, and decide whether the current data flows (name, phone,
   email, free-text message, and — for long-distance requests — pickup/
   destination city, travel date, and a free-text "patient needs" field)
   are appropriate to collect through a public web form without a BAA in
   place.
3. Once an approved NPP exists, replace or extend `/privacy` with its real
   content — this mission's version should not be treated as a permanent
   substitute for a properly reviewed privacy policy.
