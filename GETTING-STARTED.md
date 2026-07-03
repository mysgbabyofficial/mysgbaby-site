# MySGBaby — Getting Started

Everything this build gives you, the accounts you'll need, and the exact steps to go live. Companion to `DEPLOY.md` (deploy detail) and `docs/` (planning + brand).

---

## 1. What this build includes

### Pages & features
- **Interactive pregnancy timeline** (homepage) — 5 stages, "I'm at week ___", expandable cards
- **Onboarding quiz** — 6 questions, personalises via the browser (no account needed)
- **Stage pages** (`/stage/[week]`) — what happens each stage, links to official SG sources
- **Singapore Baby Benefits Centre** + **benefits calculator** — verified 2026 figures
- **Hospital comparison** — all 10 SG maternity hospitals (prices are placeholders to fill)
- **Pregnancy cost calculator** — you enter your quotes; shows government offsets
- **Loss-support page** — muted, compassionate, official resources
- **Legal pages** — Privacy, Terms, Disclaimer (templates, auto-filled with your contact)
- **4 languages** — English (complete) + 中文 / Bahasa Melayu / தமிழ் (UI translated; body content flagged for professional translation)

### Brand & design
- Moon-emblem **logo**, Singapore-red **mysgbaby** wordmark, favicon + app icons, social OG image
- **Anime Singapore hero** (Marina Bay Sands, Supertrees, Flyer, Merlion) + matching section art
- Animated gradient background, glassy header, immersive hero, rich stage journey, benefit points, feature grid, testimonial + CTA bands, hover/scroll micro-interactions
- Language switcher, contact block, "coming soon" social icons
- Brand guide (`docs/BRAND.md`) + an openable design preview (`index.html`)

### Technical (2026 essentials)
- **Next.js 14** (App Router) · TypeScript · Tailwind · next-intl
- **Security**: headers + Content-Security-Policy
- **Privacy**: PDPA consent banner + **consent-gated analytics** (GA4 Consent Mode v2 or Plausible)
- **SEO/AI**: `sitemap.ts`, `robots.txt`, Open Graph/Twitter cards, Schema.org JSON-LD, `llms.txt`
- **Performance**: WebP/AVIF images, optimised assets
- **Data integrity**: verified 2026 benefit figures with sources + dates; human-in-the-loop verification gate; GitHub Actions (verify + security scan)

### Reference docs (in `docs/`)
Risk & feasibility · Roadmap · Cost · Data verification · Zero-budget launch · Brand guide · Essential scripts 2026.

### Honest status (what's beta / to finish)
- Hospital **prices** are placeholders (enter real ones)
- **ZH/MS/TA content** needs professional translation
- **Legal pages** are templates (get a review when you can)
- **Automation scripts** are working stubs, not full scrapers
- Not compile-tested in the tool that built it — **run a local build first**

---

## 2. Accounts you'll need

### Required (free, except the domain)
| Account | Why | Cost |
|---|---|---|
| **GitHub** | Store the code | Free |
| **Vercel** | Deploy & host the site (sign in with GitHub) | Free (Hobby) |
| **Domain registrar** (Namecheap, Cloudflare, GoDaddy…) | Buy `mysgbaby.com` | ~SGD 15–25/yr — the one real cost |
| **Google account / Gmail** | You already set `mysgbabyofficial@gmail.com` — make sure it exists and is monitored (it's your contact + needed for the tools below) | Free |

### Recommended (free tiers)
| Account | Why |
|---|---|
| **Google Search Console** | Submit your sitemap, monitor search traffic |
| **Google Analytics (GA4)** *or* **Plausible** | Site analytics — pick one; already wired, just add the ID |
| **Sentry** | Error monitoring (Tier-2) |
| **Cloudflare** | Free CDN + Turnstile (spam protection for future forms) |

### Later / optional
- **Affiliate accounts** — Shopee, Lazada, Amazon Associates SG (future product links/revenue)
- **Social accounts** — Facebook, Instagram, TikTok, X (currently "coming soon")

### On your computer (tools, not accounts)
- **Node.js 18.18+** (includes npm) — the runtime to build the site
- **Git** — to push code to GitHub
- **VS Code** (or any editor) — optional, to make edits

---

## 3. Install & go live — step by step

### A. Run it locally first
1. Install **Node.js 18.18+** from nodejs.org.
2. Unzip `mysgbaby.zip`, open a terminal in the `mysgbaby` folder.
3. `npm install`
4. `npm run dev` → open **http://localhost:3000** and click around.
5. `npm run build` → this **must pass** before deploying. Fix anything it flags (likely small: a next-intl version note, a type error).

### B. Put it on GitHub
6. Create a GitHub account + a new empty repo called `mysgbaby`.
7. In the folder:
   ```
   git init
   git add .
   git commit -m "MySGBaby initial build"
   git remote add origin https://github.com/<you>/mysgbaby.git
   git branch -M main
   git push -u origin main
   ```

### C. Deploy on Vercel
8. Sign in to **vercel.com** with GitHub → **Add New → Project** → import `mysgbaby`.
9. Vercel auto-detects Next.js — leave defaults. Add env vars from `.env.example` (analytics optional; see below). **Deploy.** You get a live `*.vercel.app` URL in ~2 minutes.

### D. Connect your domain
10. Buy `mysgbaby.com` at your registrar.
11. Vercel → Project → Settings → **Domains** → add `mysgbaby.com`. Add the exact DNS records Vercel shows you at your registrar. SSL is automatic. Live in minutes–hours.

### E. Turn on analytics (optional)
- Add **one** env var in Vercel:
  - `NEXT_PUBLIC_PLAUSIBLE_DOMAIN=mysgbaby.com` (privacy-first), **or**
  - `NEXT_PUBLIC_GA4_ID=G-XXXXXXX` (GA4, Consent Mode v2).
- Nothing tracks until a visitor clicks **Accept all**.

### F. Post-launch
12. Add the site to **Google Search Console**, submit `https://mysgbaby.com/sitemap.xml`.
13. Fill the `[bracketed]` gaps: hospital prices, and confirm your contact email in `site.config.ts`.
14. Grow per `docs/ROADMAP.md`.

---

## The only things that cost money
1. **The domain** (~SGD 15–25/year).
2. Everything else runs on **free tiers**. The real "cost" is your time — especially reviewing the medical/financial content and the legal templates.
