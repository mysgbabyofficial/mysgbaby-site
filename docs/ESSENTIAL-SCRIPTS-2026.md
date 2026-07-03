# Essential Website Scripts & Tech for 2026

Researched (Jul 2026) recommendations for what any serious site — especially a content/health site like MySGBaby — should run in 2026. Ordered by priority, with what the scaffold **already has** vs what to **add**. Most are free or free-tier.

## Already in the scaffold ✅
- Security headers (X-Content-Type-Options, X-Frame-Options, Referrer-Policy, HSTS, Permissions-Policy) — `next.config.mjs`
- Open Graph + Twitter cards, `robots.txt`, i18n (4 languages), Zod validation
- A basic PDPA consent banner

---

## Tier 1 — Vital (add these first)

### 1. Real cookie-consent + Google Consent Mode v2
Non-essential cookies/trackers legally require **prior consent** (GDPR/ePrivacy, CCPA/CPRA; PDPA in Singapore). In 2026, **Google Consent Mode v2 mandates a certified CMP** for advertisers serving the EEA, and analytics/ad platforms now expect structured consent signals. Upgrade the basic banner to a real consent state that **gates GA4/ads until the user opts in**.
> Source: CookieHub, "Cookie Consent Management: Complete 2026 Guide" (cookiehub.com, Feb 2026).

### 2. Content-Security-Policy (CSP)
You have most security headers **except the big one**. CSP tells the browser exactly which sources may load scripts/styles/etc. — the primary defence against XSS. Add a strict, nonce-based CSP (Next.js supports this via middleware). ~30 min, high impact.
> Source: Kritano, "Security Headers Every Website Needs in 2026" (kritano.com, Apr 2026).

### 3. Privacy-first analytics (consent-gated)
GA4 or **Plausible** (lighter, PDPA-friendlier). Load **only after consent**. You can't improve what you don't measure.

### 4. Core Web Vitals monitoring (LCP · INP · CLS)
In 2026, **INP has replaced FID**, CLS thresholds tightened, and a "Smoothness" metric is emerging (Long Animation Frames API). Only ~62–63% of mobile sites pass at the 75th percentile — and passing all three correlates with **~24% lower bounce**. Track real-user vitals via the `web-vitals` library → your analytics, or Vercel Speed Insights. Watch INP specifically inside the Next.js App Router.
> Source: Social Animal, "Core Web Vitals Optimization: The Complete 2026 Guide" (socialanimal.dev, Jun 2026).

### 5. Structured data (Schema.org JSON-LD)
Add `Organization`, `WebSite` (+ `SearchAction`), `MedicalWebPage`/`Article`, `FAQPage`, and `BreadcrumbList`. Drives Google rich results **and** helps AI engines understand and cite you.

### 6. Dynamic sitemap
You have `robots.txt`; add Next's `app/sitemap.ts` so every stage/hospital/benefit page is indexed. Submit in Google Search Console.

---

## Tier 2 — Strongly recommended

### 7. AI discoverability (GEO) — `llms.txt`
People increasingly arrive via **ChatGPT, Perplexity, and Gemini**, not just Google. Add an **`llms.txt`** (a plain-text map of your key pages/answers for LLM crawlers) and decide how to treat AI bots in `robots.txt`. Cheap, and increasingly where health queries start.

### 8. Error & performance monitoring
**Sentry** (free tier) for JavaScript errors + real-user monitoring — so you find breakages before users report them.

### 9. Accessibility (WCAG 2.2 AA)
Automated `axe`/Lighthouse checks + manual pass. It's a legal expectation, a ranking factor, and simply the right thing for tired parents on phones.

### 10. Spam/bot protection
**Cloudflare Turnstile** (free, privacy-friendly, no puzzles) instead of reCAPTCHA — on any form (newsletter, contact).

### 11. PWA / offline
Web app manifest + service worker (stale-while-revalidate). A pregnancy guide gets revisited constantly; installable + offline is a real win.

---

## Tier 3 — Modern polish
- **Speculation Rules API** — prefetch/prerender the likely next page for near-instant navigation.
- **View Transitions API** — smooth animated page transitions.
- **Newsletter capture** (Resend/Mailchimp free tier) with double opt-in + Turnstile.
- **Image pipeline** — keep `next/image` + AVIF/WebP (already configured).

---

## How this maps to your original build prompt
Your prompt already imagined many of these as automation scripts (`seo-monitor`, `accessibility-audit`, `security-updates`, `legal-compliance`). The above is the **2026-current, prioritised** version — do Tier 1 before launch, Tier 2 shortly after, Tier 3 as polish. Everything here is free or free-tier, in line with the zero-budget plan.
