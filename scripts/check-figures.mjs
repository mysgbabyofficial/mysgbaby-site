#!/usr/bin/env node
/**
 * MySGBaby — monthly figures checker.
 *
 * Fetches each official source in scripts/figures-manifest.json and confirms the
 * known figure still appears on the page. Anything missing is flagged for review.
 * Writes scripts/figures-report.md + .json. Read-only unless --write is passed
 * (which stamps the manifest's lastChecked date so a PR carries a real diff).
 *
 * Intentionally does NOT silently overwrite figures: mis-parsing a government page
 * could publish a wrong benefit amount on a site parents rely on. It flags drift and
 * the GitHub Action opens a PR for a human to confirm + apply. No external deps.
 */
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const MANIFEST = path.join(ROOT, 'scripts', 'figures-manifest.json');
const REPORT_MD = path.join(ROOT, 'scripts', 'figures-report.md');
const REPORT_JSON = path.join(ROOT, 'scripts', 'figures-report.json');
const WRITE = process.argv.includes('--write');
const TIMEOUT = 20000;

const stripHtml = (html) =>
  html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ');

const norm = (s) => String(s).toLowerCase().replace(/\s+/g, ' ');

async function fetchText(url) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), TIMEOUT);
  try {
    const res = await fetch(url, {
      signal: ctrl.signal,
      headers: { 'user-agent': 'MySGBaby-FiguresBot/1.0 (+https://mysgbaby.com)' },
    });
    if (!res.ok) return { ok: false, status: res.status, text: '' };
    return { ok: true, status: res.status, text: stripHtml(await res.text()) };
  } catch (e) {
    return { ok: false, status: 0, text: '', error: String(e && e.name ? e.name : e) };
  } finally {
    clearTimeout(t);
  }
}

const manifest = JSON.parse(await readFile(MANIFEST, 'utf8'));
const results = [];

for (const fig of manifest.figures) {
  const r = await fetchText(fig.source);
  let status;
  if (!r.ok) {
    status = 'unreachable';
  } else {
    const hay = norm(r.text);
    const needles = Array.isArray(fig.expect) ? fig.expect : [fig.expect];
    status = needles.every((n) => hay.includes(norm(n))) ? 'ok' : 'review';
  }
  results.push({ id: fig.id, label: fig.label, area: fig.area, current: fig.current, source: fig.source, status, http: r.status, error: r.error });
  await new Promise((res) => setTimeout(res, 400)); // gentle pacing
}

const stamp = new Date().toISOString().slice(0, 10);
const ok = results.filter((r) => r.status === 'ok');
const review = results.filter((r) => r.status === 'review');
const unreachable = results.filter((r) => r.status === 'unreachable');
const flagged = [...review, ...unreachable];

const lines = [
  `# MySGBaby figures report — ${stamp}`,
  '',
  `Checked **${results.length}** figures against official sources.`,
  '',
  `- ✅ Confirmed current: **${ok.length}**`,
  `- ⚠️ Needs review (value not found on source): **${review.length}**`,
  `- 🔌 Source unreachable: **${unreachable.length}**`,
  '',
];
if (flagged.length) {
  lines.push('## Figures to review', '', '| Figure | Area | Current value | Status | Source |', '|---|---|---|---|---|');
  for (const r of flagged) {
    lines.push(`| ${r.label} | ${r.area} | ${r.current} | ${r.status === 'review' ? '⚠️ changed?' : '🔌 unreachable'} | ${r.source} |`);
  }
  lines.push('', '> ⚠️ = the current value was no longer found on the official page. Open the source, confirm the new figure, update the data file, then merge. 🔌 = the page could not be fetched this run (often temporary).');
} else {
  lines.push('All figures confirmed current. 🎉');
}
const md = lines.join('\n') + '\n';

await writeFile(REPORT_MD, md);
await writeFile(REPORT_JSON, JSON.stringify({ date: stamp, results }, null, 2) + '\n');

if (WRITE) {
  manifest._meta.lastChecked = stamp;
  await writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + '\n');
}

const anyChanged = flagged.length > 0;
if (process.env.GITHUB_OUTPUT) {
  await writeFile(process.env.GITHUB_OUTPUT, `changed=${anyChanged}\n`, { flag: 'a' });
}

console.log(md);
console.log(anyChanged ? `${flagged.length} figure(s) need review — see report.` : 'All figures current.');
process.exit(0);
