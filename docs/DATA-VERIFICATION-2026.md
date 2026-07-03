# Data Verification Log — 2026-07-01

This log records what was checked against **official Singapore government sources** while building the scaffold, and the corrections made to the figures in the original build prompt. It exists to make one point concrete: **the data in the prompt was already stale at authoring time.** Any system that publishes this content to parents without a human reviewer will propagate financial errors.

## Verified figures (as of 1 July 2026)

| Item | Verified value | Source |
|---|---|---|
| Baby Bonus Cash Gift | $11,000 (1st & 2nd), $13,000 (3rd+) | MSF Baby Bonus |
| CDA First Step Grant | $5,000 (1st & 2nd); $10,000 (3rd+, born ≥ 18 Feb 2025) | Made for Families, LifeSG |
| CDA co-matching cap | $6,000 (1st–2nd), $12,000 (3rd–4th), $18,000 (5th+) | Secondary — confirm on MSF |
| MediSave Grant for Newborns | **$5,000** (births ≥ 1 Apr 2025); $4,000 (2015–Mar 2025) | HealthHub (MOH) |
| Large Families Scheme | up to $16,000 per 3rd+ child = +$5k CDA + $5k LFMG + $6k LifeSG credits | Made for Families, CNA Budget 2025 |
| Maternity Leave (GPML) | 16 weeks | MOM |
| Paternity Leave (GPPL) | **4 weeks** | MOM |
| Shared Parental Leave (SPL) | 6 wks (births Apr 2025–Mar 2026); **10 wks (births ≥ 1 Apr 2026)**; gov pays ≤ $2,500/wk | MOM + MSF |
| MediSave Maternity Package (≥ 1 Apr 2025) | pre-delivery ≤ $900; hospitalisation $1,130/day (days 1–2), $400/day (day 3+); delivery surgical limit $1,120–$2,770 | HealthHub, CPFB |
| — normal vaginal | $750 | CPFB |
| — assisted vaginal | $1,250 | CPFB |
| — C-section (standard) | $2,150 | CPFB |
| — C-section w/ hysterectomy | $3,950 | CPFB |

## Corrections to the build prompt (5 errors found)

1. **Paternity leave** — prompt said 2 weeks; **actual 4 weeks**.
2. **Shared Parental Leave** — prompt said "6 weeks (2025)"; **now 10 weeks** for children born on/after 1 Apr 2026.
3. **MediSave Grant for Newborns** — prompt said $4,000; **now $5,000** (since 1 Apr 2025).
4. **CDA co-matching** — prompt said $4K/$7K/$9K/$15K; **actual $6K/$12K/$18K**.
5. **MediSave delivery limits** — prompt labelled $2,150 as "assisted" and $3,950 as plain "C-section". Correct: $2,150 = **C-section (standard)**, $3,950 = **C-section with hysterectomy**, assisted vaginal = **$1,250**.

## Not verified in this pass (left as placeholders in the scaffold)

- **Hospital delivery package prices** (KKH, NUH, SGH, Thomson, Mount Elizabeth, Gleneagles, Raffles, Mount Alvernia, Parkway East). These change frequently, sit behind hospital-specific pages, and must be sourced from each hospital's published rates + MOH Bill Size benchmarks. `data/hospitals.json` carries the structure with `price: null` and `verificationStatus: "unverified"`. **Do not ship guessed prices.**
- **Parenthood Tax Rebate / WMCR** — WMCR moved to a fixed-dollar basis for children born on/after 1 Jan 2024; confirm on IRAS.
- **Class pricing for prenatal exercise/music, product prices** — all placeholders.

## Sources
MOM · MSF (profamilyleave.msf.gov.sg) · MOH/HealthHub · Made for Families · LifeSG · CPFB · CNA (Budget 2025 report). Full URLs in `data/benefits.json` → `_meta.authoritativeSources`.
