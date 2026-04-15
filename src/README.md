# Life Star EMS — Website
React + Vite website | lifestaremsrgv.com

## Stack
- **React + Vite** — frontend
- **Supabase** — contact form database
- **Vercel** — hosting
- **GitHub** — version control

---

## 🚀 Local Development

```bash
npm install
npm run dev    # → http://localhost:5173
```

---

## 🗄️ Supabase Setup (Contact Form)

1. Go to [supabase.com](https://supabase.com) → New project → name it `lifestar-ems`
2. Go to **SQL Editor** → paste & run `supabase/migrations/001_contact_submissions.sql`
3. Go to **Project Settings → API** → copy:
   - `Project URL`
   - `anon / public` key
4. Create a `.env` file:
```
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

To **view submissions**: Supabase dashboard → Table Editor → contact_submissions

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
3. Add Environment Variables:
   - `VITE_SUPABASE_URL` = your Supabase URL
   - `VITE_SUPABASE_ANON_KEY` = your Supabase key
4. Click **Deploy** — live in ~1 minute!
5. In Vercel: **Domains** → add `lifestaremsrgv.com`
6. In Squarespace: update nameservers to Vercel's

**Every time you push to GitHub → Vercel auto-rebuilds your site ✨**

---

## 📸 Add More Photos

Drop photos in `public/images/` then update `src/components/Gallery.jsx`

## 📞 Update Your Info

Search for these and replace with your real details:
- `9566489774` → your phone
- `info@lifestaremsrgv.com` → your email
