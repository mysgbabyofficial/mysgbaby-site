// source-double-check.js — the final gate before ANY data change (prompt §21).
//
// This module implements the DECISION LOGIC honestly. The actual page fetching
// and field extraction are left as clearly-marked TODOs, because reliable
// selectors must be written per-source and validated by a human — pretending they
// work would be worse than a visible stub.
//
// Run: node scripts/source-double-check.js
'use strict';

const config = require('./config');

/**
 * Decide what to do with a detected candidate change.
 * @param {object} change  { section, class: 'medical'|'financial'|'product'|'editorial',
 *                           oldValue:number, newValue:number, primaryUrl, secondaryUrl }
 * @param {object} deps    injectable fetchers for testing:
 *                           { fetchValue(url):Promise<number>, hoursSince(ts):number, openIssue(payload) }
 * @returns {Promise<{action:'publish'|'queue'|'abort', reason:string}>}
 */
async function evaluateChange(change, deps) {
  const policy = config.publishPolicy[change.class] || 'human-review';
  const guard = config.doubleVerification.anomalyGuard;

  // 1. Anomaly guard — never act on implausible swings.
  const pct = change.oldValue ? ((change.newValue - change.oldValue) / change.oldValue) * 100 : 0;
  if (pct <= -guard.maxDropPct || pct >= guard.maxRisePct) {
    return { action: 'abort', reason: `Anomalous change (${pct.toFixed(0)}%) — needs human eyes.` };
  }

  // 2. Re-check the PRIMARY source after the wait window (guards against reverts).
  // TODO(per-source): implement fetchValue(url) with tested selectors.
  const primaryNow = await deps.fetchValue(change.primaryUrl);
  if (primaryNow !== change.newValue) {
    return { action: 'abort', reason: 'Primary source no longer shows the change (reverted or flaky).' };
  }

  // 3. Require a SECONDARY source to confirm.
  if (config.doubleVerification.requireSecondarySource) {
    const secondary = await deps.fetchValue(change.secondaryUrl);
    if (secondary !== change.newValue) {
      await deps.openIssue({
        title: `Conflict: ${change.section} sources disagree`,
        body: `Primary=${change.newValue}, Secondary=${secondary}. Do NOT auto-update.`,
      });
      return { action: 'abort', reason: 'Sources conflict — opened review issue.' };
    }
  }

  // 4. Route by content class. Medical & financial ALWAYS go to a human.
  if (policy !== 'auto') {
    await deps.openIssue({
      title: `Review needed: ${change.section} (${change.class})`,
      body: `Proposed: ${change.oldValue} → ${change.newValue}\nPrimary: ${change.primaryUrl}\nConfirmed by secondary. Approve to publish.`,
    });
    return { action: 'queue', reason: `Class '${change.class}' requires human review before publish.` };
  }

  return { action: 'publish', reason: 'Low-stakes change, double-verified.' };
}

module.exports = { evaluateChange };

// Demo when run directly (uses stub deps so it never touches the network).
if (require.main === module) {
  const stub = {
    fetchValue: async () => 5000,
    hoursSince: () => 25,
    openIssue: async (p) => console.log('[review-queue] would open issue:', p.title),
  };
  evaluateChange(
    { section: 'medisaveGrantForNewborns', class: 'financial', oldValue: 4000, newValue: 5000,
      primaryUrl: 'https://www.healthhub.sg/...', secondaryUrl: 'https://www.madeforfamilies.gov.sg/...' },
    stub,
  ).then((r) => console.log('Decision:', r));
}
