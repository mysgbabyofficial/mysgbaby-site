# MySGBaby — Singapore Pregnancy Guide (starter scaffold)

A GitHub-ready **starter** for a Singapore pregnancy guide: Next.js 14 (App Router) · TypeScript · Tailwind · next-intl (EN/ZH/MS/TA). This is a **skeleton to build on**, not a finished product — it favours honesty about what's real over the appearance of completeness.

## ⚠️ Read this first
This repo was generated from a build prompt that specified a *"fully autonomous, self-maintaining"* medical + financial site with no human review. **That operating model is not safe as specified.** Before building features, read:

- **`docs/RISK-AND-FEASIBILITY.md`** — legal/medical/PDPA/scraping risks and what to change (start here).
- **`docs/ROADMAP.md`** — MVP-first phasing so a solo owner can ship.
- **`docs/COST-AND-STACK.md`** — run-cost (~$0–$30/mo MVP) and the real maintenance cost.
- **`docs/DATA-VERIFICATION-2026.md`** — verified 2026 figures **and 5 errors found in the original prompt's data**.

## What's real vs stubbed
| Real & runnable | Stubbed / placeholder (clearly marked) |
|---|---|
| App shell, i18n routing, 4 language files (UI translated) | ZH/MS/TA **content** (needs professional review) |
| Homepage interactive timeline + onboarding CTA | Onboarding quiz flow |
| **Benefits Centre + calculator with VERIFIED 2026 figures** | Hospital **prices** (`null`, pending human verification) |
| Hospital comparison UI (all named SG hospitals) | Product/trending, wellness, multiples pages |
| Loss-support page (muted theme, compassionate tone) | Emotional-guidance copy (compassion-review needed) |
| Security headers, double-verification gate logic | The 20+ autonomous scrapers (see `scripts/README.md`) |

**No fabricated data.** Hospital prices, product prices, and unverified figures are left as explicit placeholders. Verified government figures carry a `lastVerified` date and sources.

## Deploy note
Generated in a Microsoft 365 workspace — **not deployed**. It runs in your own pipeline:
```bash
npm install
npm run dev        # http://localhost:3000
npm run build
```
Deploy to Vercel (SG edge). Set env vars from `.env.example` in Vercel/GitHub Secrets — never commit real secrets.

## Structure
```
app/[locale]/   pages (home, benefits, hospitals, loss-support) + i18n routing
components/      timeline, calculator, hospital card, language switcher, footer
data/            benefits.json (VERIFIED), hospitals.json (placeholders), timeline, sources
messages/        en / zh / ms / ta  (UI strings; content flagged for review)
scripts/         config.js + source-double-check.js (the human-in-loop gate) + roadmap
.github/         verify-and-update.yml (opens review issues, never auto-publishes) · security-scan.yml
design/          style-guide.json · prompts.json
docs/            risk review · roadmap · cost · data-verification  ← the analysis you asked for
```

## The one rule to keep
**Automation may detect and queue changes; a human approves anything medical or financial before it publishes.** Everything in `docs/` explains why.
