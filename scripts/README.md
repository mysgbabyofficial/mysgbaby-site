# Automation scripts

The build prompt (§19, §21, §24) lists 20+ autonomous scripts. This scaffold ships **two working reference implementations** plus a central config, and documents the rest with their honest status. The guiding rule (see `../docs/RISK-AND-FEASIBILITY.md`): **automation may detect and queue changes; it never auto-publishes medical or financial content.**

## Shipped in this scaffold
| File | Status | Purpose |
|---|---|---|
| `config.js` | ✅ working | Central policy: publish rules, double-verification thresholds, sources, review queue |
| `source-double-check.js` | ✅ logic working, fetch TODO | The gate: anomaly guard → re-check primary → confirm secondary → route by class (medical/financial → human) |

## Planned (from the prompt) — status & guidance
| Script | Verdict | Note |
|---|---|---|
| `verify-data.js`, `update-prices.js`, `cross-verify.js` | ⚠️ rework | Use **official affiliate APIs**, not daily scraping of Shopee/Lazada/hospitals (ToS + fragility). Feed the review queue. |
| `content-freshness.js` | ⚠️ detect-only | Watch gov RSS → draft banner → **human approves**. |
| `find-alternatives.js`, `discover-trends.js` | ⚠️ API-based | Product data via affiliate feeds. |
| `store-and-archive.js`, `backup-and-restore.js` | ✅ safe to build | Snapshots, releases, retention. |
| `search-intelligence.js`, `knowledge-verify.js` | ⚠️ | Re-index safe; fact-verify must not auto-publish. |
| `wellness-verify.js` | ⚠️ | CrossRef retraction check is fine; recommendations reviewed by human. |
| `tone-checker.js` | ✅ safe | Flags clinical/insensitive copy for review. |
| `optimise-performance.js`, `link-checker.js`, `accessibility-audit.js`, `seo-monitor.js`, `security-updates.js`, `dependency-lifecycle.js`, `newsletter-generator.js` | ✅ safe to build | Genuinely automatable; no advice content published. |
| `self-heal.js`, `ai-personalisation.js`, `community-pulse.js`, `legal-compliance.js` | ➖ scope carefully | "Auto-update privacy policy / self-maintain indefinitely" is not a compliance strategy — keep a human accountable. |
| Right-click block, steganographic watermark, honeypots | ❌ cut | Security theatre — see risk review §5. |

## Cron (GitHub Actions)
See `../.github/workflows/verify-and-update.yml`. All scheduled jobs open a **review issue** on change; none commit medical/financial content directly.
