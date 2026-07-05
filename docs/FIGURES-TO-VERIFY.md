# Figures to verify — MySGBaby data freshness manifest

This is the single source of truth for every dated figure on the site: its current value,
the official source to check it against, where it lives on the site, and how often to check.

**Automation:** a scheduled task checks these automatically —
- **Hospital delivery costs → monthly**
- **Everything else → quarterly** (January, April, July, October)

When a figure changes, update the relevant data and note the source + date checked below.

---

## 🏥 Hospital delivery costs — check MONTHLY
Where on site: **Hospitals** page + **Calculator**. Values are 2026 reference ranges (vary by ward, doctor, complications).

| Hospital | Type | Source to check |
|---|---|---|
| KK Women's & Children's (KKH) | Public | kkh.com.sg bill estimator + MOH bill-size portal |
| National University Hospital (NUH) | Public | nuh.com.sg + MOH bill-size portal |
| Singapore General Hospital (SGH) | Public | sgh.com.sg + MOH bill-size portal |
| Mount Elizabeth (Orchard) | Private | mountelizabeth.com.sg cost estimator |
| Mount Elizabeth Novena | Private | mountelizabeth.com.sg cost estimator |
| Gleneagles | Private | gleneagles.com.sg cost estimator |
| Thomson Medical | Private | thomsonmedical.com package pages |
| Raffles Hospital | Private | rafflesmedicalgroup.com |
| Mount Alvernia | Private | mtalvernia.sg |
| Parkway East | Private | parkwayeast.com.sg |

> MOH publishes typical **bill sizes** by procedure/ward at a national portal — the most authoritative cross-check for public hospitals.

---

## 💰 Benefits & grants — check QUARTERLY
Where on site: **Benefits Centre** (`benefits.json`). Sources: MSF / Made for Families / LifeSG / MOH / CPFB.

| Figure | Current value (2026) | Source |
|---|---|---|
| Baby Bonus Cash Gift | $11,000 (1st–2nd), $13,000 (3rd+) | Made for Families / LifeSG |
| CDA First Step Grant | $5,000 (1st–2nd), $10,000 (3rd+) | MSF / LifeSG |
| CDA govt co-matching cap | $4,000–$15,000 by child order | MSF / LifeSG |
| MediSave Grant for Newborns | $4,000 | MOH / CPFB |
| Large Families Scheme | up to $16,000 (child born ≥ 18 Feb 2025) | MSF / Made for Families |

## 👶 Leave entitlements — check QUARTERLY
Where on site: **Benefits Centre**, **explorer**. Source: MOM.

| Figure | Current value (2026) | Source |
|---|---|---|
| Government-Paid Maternity Leave | 16 weeks | MOM |
| Government-Paid Paternity Leave | 4 weeks | MOM |
| Shared Parental Leave | 2026 phased expansion — CONFIRM current weeks | MOM |
| Childcare / infant care leave | per MOM | MOM |

## 🧾 Tax reliefs & rebates — check QUARTERLY
Where on site: **Benefits Centre → first years** (`benefits.json` → `firstYearsSupport`). Source: IRAS / Made for Families.

| Figure | Current value (YA 2026) | Source |
|---|---|---|
| Working Mother's Child Relief (WMCR) | $8,000 / $10,000 / $12,000 (child born ≥ 1 Jan 2024) | IRAS |
| Qualifying Child Relief (QCR) | $4,000 ($7,500 if disability) | IRAS |
| Parenthood Tax Rebate (PTR) | $5,000 / $10,000 / $20,000 | Made for Families / IRAS |
| Grandparent Caregiver Relief (GCR) | $3,000 | IRAS |
| Foreign Domestic Worker Levy Relief | ~$7,200 (2× levy) | IRAS |
| Combined & total caps | $50,000 per child; $80,000 total reliefs | IRAS |

## 🍲 Confinement costs — check QUARTERLY
Where on site: **Confinement Budget Planner** (`confinement.json`). Market reference ranges.

| Figure | Current value (2026) | Source |
|---|---|---|
| Confinement nanny (live-in, monthly) | ~$3,000–$4,500 | Agency listings |
| Confinement food catering | ~$25–$40 / day (28-day packages) | Caterer listings |
| Post-natal massage package | ~$400–$900 | Provider listings |

---

## Update cadence notes
- **1 Apr** — MOM leave changes typically take effect (watch Shared Parental Leave rollout).
- **Feb (Budget)** — new/enhanced family schemes are usually announced.
- Always cite the source URL and the date checked when you change a figure.
