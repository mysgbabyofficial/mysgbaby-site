# Deploy MySGBaby — step by step

Goal: from these files to a live site at your domain, at $0 (domain aside). Assumes you have a **GitHub account** and will use **Vercel** (free Hobby tier). Total time: ~30–60 min, most of it the first build.

---

## 0. (Optional, 30 sec) Set your contact email
Open `site.config.ts` and set:
```ts
contactEmail: 'you@example.com',
```
Everything else (date, operator name, hosting/analytics) is pre-filled.

## 1. Build it locally first (catch issues before deploying)
You need **Node 18.18+**. In the project folder:
```bash
npm install
npm run dev        # open http://localhost:3000 — click around
npm run build      # MUST pass before you deploy
```
If `npm run build` errors, fix and re-run. Most likely first-build fixes:
- **next-intl API mismatch** — if it complains about `createNavigation`/`getRequestConfig`, run `npm i next-intl@latest` and re-build.
- **Fonts** — `next/font/google` fetches fonts at build time; needs internet (Vercel has it).
- **`<img>` lint warnings** — warnings, not errors; they won't fail the build.
- **TypeScript strict** — fix any type error it names.

## 2. Push to GitHub
```bash
git init
git add .
git commit -m "MySGBaby initial scaffold"
```
Create an empty repo on github.com (e.g. `mysgbaby`), then:
```bash
git remote add origin https://github.com/<you>/mysgbaby.git
git branch -M main
git push -u origin main
```

## 3. Deploy on Vercel
1. Go to **vercel.com** → sign in with GitHub → **Add New… → Project**.
2. Import your `mysgbaby` repo. Vercel auto-detects **Next.js** — leave build settings default.
3. **Environment Variables** — add the ones you use from `.env.example` (at minimum `NEXT_PUBLIC_SITE_URL`). Leave affiliate/API keys blank for now.
4. Click **Deploy**. You'll get a live `*.vercel.app` URL in ~2 min.

## 4. Point your domain
1. Buy `mysgbaby.com` (Namecheap, Cloudflare, etc.).
2. In Vercel: **Project → Settings → Domains → Add** `mysgbaby.com`.
3. Vercel shows you the exact DNS records to add (typically an `A` record for the root and a `CNAME` for `www`). Add **the values Vercel shows you** at your registrar.
4. Wait for DNS + automatic SSL (minutes to a couple of hours). Done — it's live.

## 5. After it's live — quick checks
- Visit `/`, `/onboarding`, `/benefits`, `/calculator`, `/hospitals`, `/stage/12`, `/loss-support`, `/privacy` — no 404s.
- Confirm the **consent banner** appears and the **disclaimer** shows on advice pages.
- Switch languages (top-right) — UI should translate.
- Run Lighthouse (Chrome DevTools) for a performance baseline.

---

## What you're launching (set expectations)
This is an **English "beta"** with the signpost posture: verified benefits, timeline, calculator, hospital UI (prices pending), legal templates, and loss support. Hospital prices, full multilingual content, and the automation scripts are **deferred to the roadmap / sponsorship** (see `docs/ROADMAP.md` and `docs/ZERO-BUDGET-LAUNCH.md`). Label it "beta" and grow from there.

## The two things not covered by "free"
1. **Domain** — the one cost.
2. **Legal/clinical review** — deferred, not done. The disclaimers + signpost posture lower the risk; they don't remove it. Get the legal templates a review whenever a free/low-cost option appears.
