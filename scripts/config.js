// Central configuration for MySGBaby data automation.
// Design principle (see docs/RISK-AND-FEASIBILITY.md): automation may DETECT and
// QUEUE changes, but medical and financial content is NEVER auto-published.

'use strict';

module.exports = {
  // Content classes and how a detected change is handled.
  publishPolicy: {
    // 'auto' allowed ONLY for low-stakes, non-advice data (e.g. trending product names).
    medical: 'human-review',    // benefits, timeline, vaccinations, exercise, loss
    financial: 'human-review',  // hospital prices, calculator figures, gov benefits
    product: 'review-queue',    // prices/trends via official affiliate APIs
    editorial: 'human-review',
  },

  doubleVerification: {
    waitHours: 24,               // re-check the primary source after this delay
    requireSecondarySource: true,
    anomalyGuard: {
      maxDropPct: 50,            // abort if a value drops >50%
      maxRisePct: 100,           // abort if a value rises >100%
    },
    maxUpdatesPerSectionPer24h: 1,
  },

  // Prefer official/affiliate APIs over scraping. Scraping hospital/marketplace
  // sites likely breaches ToS and is fragile — see risk review §3.
  dataSources: {
    government: [
      'https://www.mom.gov.sg',
      'https://www.profamilyleave.msf.gov.sg',
      'https://www.madeforfamilies.gov.sg',
      'https://www.healthhub.sg',
      'https://www.cpf.gov.sg',
    ],
    // Populate with official affiliate feeds, NOT scrapers, before enabling.
    products: { shopeeAffiliateApi: null, lazadaAffiliateApi: null, amazonAssociatesSg: null },
  },

  reviewQueue: {
    // How queued changes reach a human. Opens a GitHub Issue by default.
    mode: 'github-issue',
    repo: process.env.GITHUB_REPOSITORY || 'owner/mysgbaby',
  },

  rateLimitPerSecond: 1,
  logDir: 'logs',
};
