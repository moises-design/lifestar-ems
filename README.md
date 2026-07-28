# Life Star EMS — Website
React + Vite website | lifestaremsrgv.com

## Stack
- **React + Vite** — frontend
- **Vercel serverless functions (`/api`)** — secure server-side form intake
- **Resend** — email delivery for form notifications
- **Supabase** — long-distance transport request storage
- **Vercel** — hosting
- **GitHub** — version control

---

## 🚀 Local Development

```bash
npm install
npm run dev    # → http://localhost:5173
```

---

## 📧 Resend Setup (Form Email Notifications)

The Request Transport, Contact, Event EMS Standby, and Government
Contracting forms submit to a shared Vercel serverless endpoint,
`POST /api/submit-form` (see `api/submit-form.js` and `api/_lib/`),
which validates the submission server-side and emails a staff
notification via [Resend](https://resend.com). The success screen the
visitor sees only appears once this endpoint confirms the email was
accepted — the `RESEND_API_KEY` is read only inside `api/_lib/resend-client.js`
and is never bundled into client-side JavaScript.

1. Create a [resend.com](https://resend.com) account and an API key
   (**API Keys** in the dashboard).
2. Until the `lifestaremsrgv.com` sending domain is verified in Resend,
   use the built-in test sender `onboarding@resend.dev` — this works
   immediately with no domain setup, but can only deliver to the email
   address on the Resend account itself, so verify the domain before
   relying on notifications reaching `lifestarems.rgv@gmail.com` in
   production.
3. Once the domain is verified (**Domains** → add `lifestaremsrgv.com` →
   add the shown DNS records), set `FORM_FROM_EMAIL` to an address at
   that domain, e.g. `Life Star EMS Website <notifications@lifestaremsrgv.com>`.
4. Add the three environment variables below in Vercel (see the
   Environment Variables step under **Vercel Deployment**).

Required environment variables (see `.env.example`):
```
RESEND_API_KEY=re_xxx                                              # server-side only, never exposed to the client
FORM_NOTIFICATION_EMAIL=lifestarems.rgv@gmail.com                  # where every form notification is sent
FORM_FROM_EMAIL=Life Star EMS Website <onboarding@resend.dev>      # swap to a verified-domain sender once available
```

If `RESEND_API_KEY` or `FORM_NOTIFICATION_EMAIL` is missing, the
endpoint returns a clear delivery error instead of a false success —
forms never silently discard a submission.

---

## 🗄️ Supabase Setup (Long-Distance Transport Requests)

Supabase now backs only the `/services/long-distance` request form
(`long_distance_requests` table) — every other public form (Request
Transport, Contact, Event EMS Standby, Government Contracting) is
handled entirely by the `/api/submit-form` + Resend flow above and no
longer writes to Supabase.

1. Go to [supabase.com](https://supabase.com) → New project → name it `lifestar-ems`
2. Go to **SQL Editor** → paste & run `supabase/migrations/001_contact_submissions.sql`
   and `supabase/migrations/002_long_distance_requests.sql`
3. Go to **Project Settings → API** → copy:
   - `Project URL`
   - `anon / public` key
4. Create a `.env` file:
```
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

To **view long-distance requests**: Supabase dashboard → Table Editor → long_distance_requests

---

## 🐙 GitHub Setup

```bash
git init
git add .
git commit -m "Initial commit — Life Star EMS website"
```
Then on github.com: New repository → `lifestar-ems` → follow push instructions

---

## ▲ Vercel Deployment (with auto-deploy on push)

1. Go to [vercel.com](https://vercel.com) → Import Git Repository
2. Select your `lifestar-ems` GitHub repo
3. Add Environment Variables — in the Vercel dashboard, go to your
   project → **Settings → Environment Variables**, and add each of the
   following (apply to Production, Preview, and Development):
   - `VITE_SUPABASE_URL` = your Supabase URL
   - `VITE_SUPABASE_ANON_KEY` = your Supabase key
   - `RESEND_API_KEY` = your Resend API key (**never** prefix this with
     `VITE_` — a `VITE_`-prefixed variable is bundled into the public
     client JavaScript, which would expose it)
   - `FORM_NOTIFICATION_EMAIL` = `lifestarems.rgv@gmail.com`
   - `FORM_FROM_EMAIL` = `Life Star EMS Website <onboarding@resend.dev>`
     (swap to a verified-domain sender once `lifestaremsrgv.com` is
     verified in Resend — see the Resend Setup section above)
4. Click **Deploy** — live in ~1 minute!
5. In Vercel: **Domains** → add `lifestaremsrgv.com`
6. In Squarespace: update nameservers to Vercel's

Redeploy (or trigger a new deployment) after adding or changing any
environment variable — Vercel serverless functions only pick up
env vars from the deployment they were built for.

**Every time you push to GitHub → Vercel auto-rebuilds your site ✨**

---

## 📸 Add More Photos

Drop photos in `public/images/` then update `src/components/Gallery.jsx`

## 📞 Contact Info

The verified dispatch number is **(956) 660-6543**. Page titles, meta
descriptions, and canonical URLs are managed centrally in
`src/seo/routeMeta.js`. The old template placeholder number (956) 648-9774
has been removed and must not be reintroduced.
