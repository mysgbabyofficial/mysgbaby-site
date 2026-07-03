# MySGBaby — Cost & Stack Estimate

Rough, honest monthly run-cost for the stack in the prompt, plus the "self-maintaining" reality. All figures **SGD, indicative** — they scale with traffic and usage, and are meant for go/no-go budgeting, not accounting.

## Recommended stack
- **Framework:** Next.js 14 (App Router) + TypeScript + Tailwind + shadcn/ui — as specified, sensible.
- **Hosting:** Vercel (SG edge) or Cloudflare Pages.
- **i18n:** next-intl.
- **Validation:** Zod. **Analytics:** Plausible (PDPA-friendlier than GA4) + optional GA4.
- **Data:** flat JSON in-repo for MVP (fine); move to a lightweight DB (e.g. Vercel Postgres / Turso) only when the review queue needs it.
- **Images:** generate offline, store as WebP/AVIF in the repo/CDN — **not** generated at runtime.

## Monthly cost — by phase

| Item | MVP (Phase 1) | Growth (Phase 2–3) | Notes |
|---|---|---|---|
| Hosting (Vercel) | $0 (Hobby) → **$20** (Pro) | $20–$50 | Pro needed once commercial/ads or team |
| Domain (mysgbaby.com) | ~$1–$4/mo (annual) | same | |
| Analytics (Plausible) | $0 self-host → ~$9 | $9–$19 | GA4 is free but heavier on consent |
| Translation API (DeepL/Google) | $0 (Phase 1 EN only) | **one-off**, not monthly | ~$25 per 1M chars; content is finite. Human review is the real cost |
| AI image generation | **one-off** ~$20–$60 total | occasional | ~$0.02–$0.19/image (DALL·E/SD); a few hundred images once, then seasonal variants |
| Email/newsletter (Resend/Mailchimp) | $0 | $0–$20 | Free tiers cover early lists |
| Error monitoring (Sentry) | $0 | $0–$26 | Free tier fine early |
| Scraping infra (if pursued) | — | **$20–$100+** | Proxies/anti-bot to scrape Shopee/Lazada/hospitals; **avoid — use affiliate APIs instead** |
| **Typical total** | **~$0–$30/mo** | **~$60–$150/mo** | Excludes scraping infra and human review time |

**Headline:** the *software* is cheap to run — **~$0–$30/mo for the MVP**, ~$60–$150/mo at growth. Translation and images are **one-off**, not recurring. The scraping stack is the only line item that balloons, which is another reason to replace it with affiliate APIs + human curation.

## The real cost isn't infrastructure — it's maintenance

The prompt's premise is "owner will not manually update… runs autonomously indefinitely." That premise is what makes the numbers look free. In reality:

- **Medical + benefit content needs a human reviewer.** Even if rare, this is recurring human time (or a paid clinical reviewer at launch and on policy changes — Budget every Feb, leave changes 1 Apr).
- **Scrapers break** (§3 of the risk review). "Self-heal" scripts reduce babysitting but don't eliminate it; someone fixes selectors when a source redesigns.
- **Translations drift** when English updates; re-review is human.

**Budget a few hours/month of owner time + a clinical review at launch and on each Budget/policy change.** That, not the hosting bill, is the true cost.

## Can affiliate revenue cover it?
- At MVP scale, **hosting is essentially free**, so break-even is trivial — a handful of affiliate conversions/month covers ~$30.
- Meaningful revenue needs **traffic** (Phase 2+ with SEO), and affiliate rates on baby products are low single-digit %. Realistic early affiliate income: small. **Treat revenue as offset, not salary**, until traffic is proven.
- Ads (dormant slots) only make sense at scale and must stay firewalled from medical content.

## Bottom line
Financially low-risk to start: **stand up the EN MVP for ~$0–$30/mo**, spend a one-off ~$50–$120 on images/translation later, and keep the expensive/fragile scraping out. The binding constraint is **owner review time on medical/financial content**, not money.
