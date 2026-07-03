# MySGBaby — Phased Build Roadmap

The prompt describes ~27 sections and 20+ automation scripts as one launch. That is a multi-year program for a team, not a first release. This roadmap sequences it so a **solo owner can ship something credible fast**, then grow it — and so the risky parts (autonomous medical scraping) never gate the useful parts.

**Guiding rule:** ship the accurate, low-liability features first. Defer anything that needs unverified scraped data or heavy ops.

> **Zero-budget path:** to launch with only the domain paid for (no lawyer/doctor, AI-generated assets, deferring the rest to sponsorship), see **`ZERO-BUDGET-LAUNCH.md`** — it defines the "signpost, don't advise" posture and the sponsorship list.

---

## Phase 0 — Foundations (before any feature)
*Goal: a deployable shell + the legal/data guardrails from the risk review.*

- Next.js 14 + TypeScript + Tailwind + shadcn/ui scaffold (this repo).
- i18n routing (next-intl) with EN complete; ZH/MS/TA structure in place (UI strings only).
- Design system: palette, fonts, mascot spec (`design/style-guide.json`).
- **Legal foundation (blocking):** human-reviewed disclaimer, privacy policy, PDPA consent banner, affiliate disclosure.
- `data/benefits.json` with **verified** 2026 figures (done).
- Deploy skeleton to Vercel; confirm SG edge, headers, Lighthouse baseline.

**Exit:** site deploys, one real page renders, legal pages live.

---

## Phase 1 — MVP: the trustworthy core (highest value, lowest risk)
*Ship this and it's already useful to Singapore parents.*

- **Interactive pregnancy timeline** (homepage hero) + stage pages (static, clinically reviewed content).
- **Onboarding quiz** → localStorage personalisation ("I'm at Week __").
- **Singapore Baby Benefits Centre + Benefits Calculator** — uses verified data; **this is the strongest feature and depends on no scraping.**
- **Prenatal visit & test schedule** per trimester (cited, reviewed).
- Honest trust layer: per-section `lastVerified` date, source citations, medical-review badges.
- English only. Mobile-first, dark mode, accessibility pass.

**Defer:** hospital prices, product scraping, multilingual content, all autonomous scripts.

**Exit:** a parent can understand their stage, see accurate benefits, and calculate government support.

---

## Phase 2 — Hospitals & costs (the data-hard phase)
*Only start once you have a sustainable data source.*

- **Hospital & clinic comparison** — all named hospitals, structure first, prices sourced from **hospital-published rates + MOH Bill Size benchmarks**, entered through a **human review queue** (not daily scraping).
- **Smart cost calculator** with Medisave / Baby Bonus / CDA offsets (logic ready; figures verified).
- **Natural birth vs C-section** decision helper.
- Quarterly (not daily) price refresh workflow with human sign-off.

**Exit:** accurate cost planning end-to-end, with a maintainable refresh cadence.

---

## Phase 3 — Breadth: audience & wellness
- **Father's guide** (verified leave figures: 4-week paternity, 10-week SPL).
- **Twins & multiples** section.
- **Prenatal exercise & music** (ACOG/HPB-cited, human-reviewed; class prices as curated data).
- **Miscarriage & loss support** (muted design, compassionate tone, SG resources) — treat as first-class, review carefully.
- **"Advise Me Now"** emotional/financial guidance at trigger stages.

**Exit:** the guide covers the whole journey and both parents.

---

## Phase 4 — Multilingual (ZH / MS / TA)
- Professional/human-reviewed translation of **medical + financial** content (machine translation only for UI chrome).
- Keep English medical terms in parentheses.
- Staleness workflow: when EN source changes, flag translations for re-review (human, not auto-publish).

**Exit:** four languages live, with a review discipline that keeps them honest.

---

## Phase 5 — Growth & automation (the *safe* subset of the prompt's scripts)
Adopt automation **incrementally**, and only where it doesn't publish medical/financial content unattended:

- ✅ `optimise-performance`, `link-checker`, `accessibility-audit`, `security-updates`, `dependency-lifecycle`, `seo-monitor`, `backup-and-restore`, `newsletter-generator` — genuinely automatable.
- ⚠️ `update-prices` / `discover-trends` — via **official affiliate APIs**, feeding a review queue.
- ⚠️ `content-freshness` (gov RSS) — detect + draft banner → **human approves**.
- ❌ Auto-publishing medical/benefit changes — never. Detect → queue → human.
- ➖ Right-click block, steganography, honeypots — dropped (see risk review §5).

**Exit:** the site stays fresh with monitoring + a review queue, not blind autonomy.

---

## Monetisation (dormant until traffic exists)
Keep ad slots and affiliate links behind an `adsEnabled` flag. Turn on only after Phase 2 with real traffic and PDPA-consented analytics. Revenue must never touch medical recommendations.

## Suggested first three sprints
1. Phase 0 + timeline + onboarding.
2. Benefits Centre + calculator (verified data).
3. Prenatal schedule + trust layer + Vercel launch (EN MVP).
