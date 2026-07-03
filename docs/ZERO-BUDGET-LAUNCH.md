# Zero-Budget Launch Plan

You're launching with **only the domain paid for** — no lawyer, no clinical reviewer, no paid APIs. This document is the honest plan for doing that responsibly, plus what gets deferred to the roadmap and sponsorship.

## The posture that makes zero-budget viable: signpost, don't advise

The liability in the original prompt came from the site acting as an **authority** on medical and financial matters. We remove most of that by changing the posture:

- **Summarise + link to official Singapore sources** (HealthHub/MOH, KKH, HPB, MSF, MOM, CPF) instead of authoring original clinical or financial advice.
- **Prominent "informational only, not advice" disclaimers** on every medical/financial page (`components/MedicalDisclaimer.tsx`).
- **"Sources" + "Last checked" dates** instead of a "Medically reviewed" badge — we never claim a review that didn't happen.
- **Users enter their own numbers** in the cost calculator; we never invent hospital prices.
- **Verified government figures only**, each dated and cited (`data/benefits.json`).

This is how legitimate zero-budget health-info sites operate. It is **risk-reduction, not risk-elimination** — see "Residual risk" below.

## What goes live now, free of charge

| Included | How it's free |
|---|---|
| Hosting | Vercel Hobby / Cloudflare Pages free tier |
| Domain | The one thing you pay for |
| Illustrations + mascot | AI-generated (in `public/illustrations/`, optimised WebP) |
| Legal pages | AI-drafted templates (privacy, terms, disclaimer) + PDPA consent banner |
| Analytics | Plausible self-host or GA4 free (load only after consent) |
| Benefits Centre + calculator | Verified 2026 figures, no paid data |
| Onboarding, timeline, stage pages, hospitals, loss support | Built in this scaffold |
| Automation (safe subset) | GitHub Actions free tier |

**Launch scope:** English, "beta" labelled, signpost posture. That's a real, useful site at $0 + domain.

## Deferred to the roadmap / sponsorship

Park these until you have sponsorship, revenue, or volunteer help — do **not** block launch on them:

| Deferred item | Why | Possible funding |
|---|---|---|
| Lawyer review of legal pages | Templates carry residual risk | Free legal clinics; pro-bono; small one-off fee later |
| Clinical review of any original medical content | Needed only if you move beyond signposting | Volunteer SG doctor/midwife; hospital partnership |
| Professional ZH/MS/TA translation | Machine translation of health/finance is unreliable | Community volunteers; sponsor |
| Real hospital package prices | Must be curated, not scraped | Hospital partnerships; affiliate/sponsor |
| Autonomous data pipeline | Fragile + ToS issues | Build incrementally via affiliate APIs |
| PWA push, service worker, seasonal art | Nice-to-have | Later |

## Seeking sponsorship — who and how

- **Affiliate programs (start now, free):** Shopee, Lazada, Amazon Associates SG — small commissions from product links (disclosed).
- **Parenting/retail brands:** Mothercare, Pupsik, confinement & lactation services — sponsored content (clearly labelled) or display slots (already dormant behind an `adsEnabled` flag).
- **Insurers / banks:** maternity insurance, CDA-linked bank accounts — sponsorship or referral.
- **Hospitals & clinics:** listing partnerships (they supply verified prices in exchange for presence).
- **Grants:** explore Singapore digital/community grants for parenting or public-good content.
- **Community:** volunteer translators and a volunteer clinician reviewer via parenting groups.

Keep any sponsorship **firewalled from medical information** — money never changes what the health content says.

## Residual risk (be honest with yourself)

Launching without legal/clinical review is a **calculated risk you are choosing**, and this plan lowers it — it does not remove it:
- If a benefit figure is wrong and someone relies on it, the disclaimer helps but is not absolute protection.
- Publishing under a real name/entity with a contact address is safer than anonymous.
- Get the legal templates a review as soon as any budget or free option appears — it's the highest-value cheap upgrade.

**Minimum to launch responsibly today:** disclaimers live on every advice page ✓, consent banner ✓, legal templates with your real contact details filled in, "beta" framing, and no fabricated numbers. All are in this scaffold except your contact details.
