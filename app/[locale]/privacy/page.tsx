// TEMPLATE — AI-drafted starting point, NOT yet legally reviewed. See docs/ZERO-BUDGET-LAUNCH.md.
import { siteConfig, contactEmailOrPlaceholder as contact } from '@/site.config';

export default function PrivacyPage() {
  return (
    <article className="prose-sm max-w-3xl space-y-4">
      <div className="rounded-lg border border-amber-400/60 bg-amber-100/60 p-3 text-sm text-amber-900 dark:bg-amber-900/30 dark:text-amber-100">
        <strong>Template notice:</strong> AI-drafted starting point aligned to Singapore&apos;s PDPA.
        Not legal advice and not yet reviewed. Set your contact email in <code>site.config.ts</code>,
        and get this reviewed when you can.
      </div>

      <h1 className="text-3xl font-extrabold">Privacy Policy</h1>
      <p className="text-sm text-ink/60">
        Last updated: {siteConfig.legalLastUpdated} · Operator: {siteConfig.operatorName} · Contact: {contact}
      </p>

      <p>
        This policy explains how MySGBaby handles personal data, in line with Singapore&apos;s
        Personal Data Protection Act 2012 (PDPA).
      </p>

      <h2 className="text-xl font-bold">What we collect</h2>
      <ul className="list-inside list-disc">
        <li><strong>On-device preferences.</strong> Your onboarding answers (stage, week, preferences) and calculator entries are stored in your browser&apos;s local storage. They stay on your device and are not sent to us.</li>
        <li><strong>Usage analytics (with consent).</strong> If you accept analytics cookies, we collect aggregated, non-identifying usage data to improve the Site.</li>
        <li><strong>Messages you send us.</strong> If you email us, we receive your email address and message.</li>
      </ul>

      <h2 className="text-xl font-bold">How we use it</h2>
      <p>To personalise your experience, understand aggregate usage, and respond to enquiries. We do not sell personal data.</p>

      <h2 className="text-xl font-bold">Cookies &amp; consent</h2>
      <p>
        Essential storage is used to run the Site and remember your consent choice. Analytics load
        only after you choose &quot;Accept all.&quot; You can withdraw consent by clearing your
        browser storage.
      </p>

      <h2 className="text-xl font-bold">Third parties</h2>
      <p>
        We use {siteConfig.hostingProvider} (hosting) and {siteConfig.analyticsProvider} (analytics).
        Affiliate links may set their own cookies when clicked. Please review their policies.
      </p>

      <h2 className="text-xl font-bold">Retention</h2>
      <p>On-device data persists until you clear it. Analytics data is retained in aggregate by our provider.</p>

      <h2 className="text-xl font-bold">Your rights</h2>
      <p>
        Under the PDPA you may request access to, or correction of, personal data we hold, and
        withdraw consent. Contact our data-protection contact at {contact}.
      </p>

      <h2 className="text-xl font-bold">Changes</h2>
      <p>We may update this policy; the &quot;last updated&quot; date will change accordingly.</p>
    </article>
  );
}
