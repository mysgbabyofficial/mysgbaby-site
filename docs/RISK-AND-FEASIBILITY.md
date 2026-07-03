# MySGBaby — Risk & Feasibility Review

**Prepared:** 2026-07-01 · **Scope:** the "Complete Build Prompt v2" · **For:** project owner

## Verdict

The **website** is very buildable. The **operating model described in the prompt — "fully autonomous, self-maintaining… owner will not manually update"** for a site giving **medical and financial guidance to pregnant families — is not safe to ship as specified.** The two problems that dominate everything else:

1. **Auto-publishing medical + government-money figures with no human reviewer.** The prompt's own data was already wrong in 5 places on the day it was written (see `DATA-VERIFICATION-2026.md`). A pipeline that scrapes and publishes automatically will keep making errors exactly like these, on a site where a wrong number changes a family's financial decision.
2. **Daily scraping of MOH, hospitals, Shopee, Lazada** is legally and technically fragile, and is the load-bearing assumption behind "always updated."

**Recommendation:** build the site, but change the operating model to **human-in-the-loop for anything medical or financial**, and cut the scope that can't be maintained (see `ROADMAP.md`). Everything below is ordered by severity.

---

## 1. Legal & liability (highest severity)

### 1a. Medical content
- A pregnancy guide that recommends **supplements, vaccinations, "what's normal vs seek help," miscarriage signs, and exercise limits** is health advice. A disclaimer ("informational only") **reduces but does not remove** liability, and does nothing if the content is wrong.
- **Mitigation:** every medical claim carries a cited source (already in the design) **and** a dated human "medically reviewed" sign-off. No medical page auto-updates. Route clinical content past a Singapore-registered doctor before launch; keep a review date on each page.

### 1b. Financial content
- Benefit amounts, MediSave limits, and the cost calculator are **financial guidance**. Wrong figures → real harm + reputational/legal exposure. The 5 verified errors prove this is not hypothetical.
- **Mitigation:** figures live in `data/benefits.json` with `lastVerified` + source; **changes require human approval** before publish (not a 24-hour auto-gate).

### 1c. PDPA (Singapore)
- Onboarding quiz (due date, first-time parent, budget), localStorage personalisation, PWA push, and analytics all touch personal data. PDPA requires **consent, purpose limitation, a privacy policy, and a data-protection contact**.
- The prompt's `legal-compliance.js` "auto-update privacy policy / detect PII" is **not a compliance strategy** — you cannot automate away accountability. Get a human-reviewed privacy policy and consent banner before collecting anything.

### 1d. Affiliate + health = disclosure duty
- Mixing affiliate revenue (Shopee/Lazada/Amazon/Mothercare) with health advice requires **clear "we may earn a commission" disclosure** and a firewall so revenue never influences medical recommendations. Product placement next to medical content is a reputational landmine if not labelled.

### 1e. Copyright of scraped content
- **Scraping hospital sites and reproducing their package details/prices, then reselling access ("Pricing via API tokens")** may infringe the source's rights and breach their **Terms of Service**. Facts (a price) aren't copyrightable; **compilations, descriptions, and images are.** Do not copy hospital marketing copy or images.

---

## 2. Data accuracy & the autonomy problem (highest severity)

- **The prompt's "self-maintaining, no manual updates" premise is the core risk, not a feature.** Government schemes change on policy cycles (Budget every Feb, leave changes 1 Apr), not on a scrape schedule, and the changes are often announced in prose the scraper won't parse into the right field.
- The prompt's `source-double-check.js` (24h wait → re-check → secondary source → auto-commit) is a **good pattern for prices**, but **must not be the gate for medical or benefit content.** For those, the gate is a person.
- **What actually works:** scrape → detect *candidate* change → open a GitHub Issue / review queue → **human approves** → publish. This keeps "fresh" without "unattended."

**Evidence:** see the 5 corrections in `DATA-VERIFICATION-2026.md`. Every one would have been published wrong by an auto-pipeline.

---

## 3. Scraping legality & fragility (high severity)

- **ToS / robots.txt:** Shopee, Lazada, and most hospital sites **prohibit automated scraping** in their terms. Daily scraping risks IP bans, legal notices, and breakage. The prompt's own "block scrapers via robots.txt" section is ironic given the site's core is scraping others.
- **Fragility:** these are JS-heavy, anti-bot (Cloudflare, login walls) sites. Cheerio+Axios will miss most of it; Puppeteer is heavier, slower, and still gets blocked. Prices sit behind enquiry forms, not static pages. **Expect this to break constantly and silently.**
- **Better path:** use **official/affiliate APIs where they exist** (Shopee/Lazada/Amazon affiliate feeds are legitimate and structured). For hospital and MOH data, **manually curate on a schedule** (quarterly is realistic for package prices) rather than scraping daily. "Verified daily" is a promise you can't keep for hospital prices — soften the claim.

---

## 4. Over-promising in the UI (medium-high)

- **"Trusted by Singapore parents. Updated daily. Verified always."** and **"X,XXX prices verified this month"** are claims you must be able to substantiate. If the scraper is down (see §3) the counter lies. False "verified" badges on medical content compound §1.
- **Mitigation:** show a real, honest `lastVerified` per section (already designed). Drop "Verified always."

---

## 5. Security theatre (medium — cut these)

The prompt lists protections that **don't work and cost UX/accessibility/SEO**:
- **Right-click disable, CSS selection prevention** — trivially bypassed, hurt legitimate users, and are an accessibility regression.
- **Steganographic watermarking of illustrations** — meaningless against a determined scraper; adds build complexity.
- **"Honeypot data fields," "pricing via API tokens not static JSON"** — over-engineered for a content site; the data is public anyway (it's scraped from public sources).
- **Keep instead:** real HTTP security headers (CSP, HSTS, X-Content-Type-Options, Referrer-Policy), rate limiting, Zod validation on API routes, `npm audit` in CI, GPG-signed commits. These are genuine and cheap.

---

## 6. Feature-by-feature feasibility

| Area | Feasibility | Note |
|---|---|---|
| Interactive timeline, onboarding quiz, stage pages | ✅ Straightforward | Core Next.js + localStorage |
| Benefits centre + calculator | ✅ With verified data | Highest-value, lowest-risk feature |
| Hospital comparison | ⚠️ Data problem | Structure is easy; **getting/maintaining accurate prices is the hard part** |
| Cost calculator w/ Medisave/Baby Bonus offsets | ✅ Logic is clear | Numbers must be human-verified |
| Multi-language (EN/ZH/MS/TA) | ⚠️ Feasible, not free | Machine translation of **medical/financial** content needs human review; the prompt's own language labels were mojibake-corrupted |
| AI illustrations + mascot | ✅ | Real per-image cost; see `COST-AND-STACK.md` |
| Daily autonomous scraping pipeline | ❌ As specified | Rework to human-in-the-loop + APIs |
| "Self-heal / self-maintain indefinitely" | ❌ Aspirational | Cron + monitoring is real; "runs forever with zero owner input" for medical/legal content is not |
| Right-click block / steganography / honeypots | ➖ Cut | Theatre |

---

## 7. What to do before writing feature code

1. **Change the operating model** to human-approved publishing for medical + financial content. This is the single most important decision.
2. **Get the disclaimer, privacy policy, consent banner, and affiliate disclosure human-reviewed.** Non-negotiable before collecting data or giving advice.
3. **Replace daily scraping with official/affiliate APIs + scheduled human curation** for hospital and government data.
4. **Cut the security theatre**; keep real headers + audit.
5. **Soften the marketing claims** ("Verified always" → honest per-section dates).
6. Then build MVP per `ROADMAP.md`, starting with the Benefits Centre (accurate data already in hand).

None of this kills the project. It turns a liability-heavy "autonomous medical site" into a **credible, maintainable Singapore parenthood guide** — which is the actually-valuable version of the idea.
