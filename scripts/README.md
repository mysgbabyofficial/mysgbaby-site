# Figures checker

Keeps the site's dated figures (grants, leave, tax reliefs, hospital costs) honest by
checking them against official government sources **every month**.

## What runs
- **`figures-manifest.json`** — the list of figures: current value, the official source URL, and a distinctive string that should still appear on that page.
- **`check-figures.mjs`** — fetches each source, confirms the value is still there, and writes `figures-report.md` / `figures-report.json`.
- **`.github/workflows/check-figures.yml`** — runs the script on the 1st of each month and, if anything drifted, **opens a pull request** with the report.

## How updates happen
1. On the 1st of each month the Action checks every figure.
2. If a value is no longer found on its official page (or a source is unreachable), it opens a PR titled *“Monthly figures check — review needed”* with a table of what to check.
3. You open the source link, confirm the new number, update the data file in the PR, and **merge** → Vercel redeploys with the fresh data.
4. If everything is still current, no PR is opened — nothing to do.

> **Why a PR, not an automatic overwrite?** These figures sit on a site parents trust. Government pages change layout, and a mis-parsed number could publish a wrong benefit amount. The script therefore *flags* drift for a 1-click human review rather than silently rewriting values. (If you ever want fully-automatic edits for a specific simple figure, that can be added per-figure.)

## Run it yourself
```bash
node scripts/check-figures.mjs          # check + write report (read-only on data)
node scripts/check-figures.mjs --write  # also stamp lastChecked in the manifest
npm run check:figures                   # same as the first command
```
Requires Node 20+ (uses built-in `fetch`). No dependencies to install.

## Adding a figure
Add an entry to `figures-manifest.json`:
```json
{ "id": "my-figure", "label": "Human name", "current": "$1,234",
  "expect": ["1,234"], "source": "https://official.gov.sg/page", "area": "Benefits Centre",
  "file": "data/benefits.json" }
```
`expect` can be a string or a list of strings that must all appear on the page.
