// TEMPLATE — AI-drafted starting point, NOT yet legally reviewed. See docs/ZERO-BUDGET-LAUNCH.md.
import { siteConfig } from '@/site.config';

export default function DisclaimerPage() {
  return (
    <article className="prose-sm max-w-3xl space-y-4">
      <div className="rounded-lg border border-amber-400/60 bg-amber-100/60 p-3 text-sm text-amber-900 dark:bg-amber-900/30 dark:text-amber-100">
        <strong>Template notice:</strong> This is an AI-drafted starting point, not legal advice
        and not yet reviewed by a lawyer. Get it reviewed before you rely on it.
      </div>

      <h1 className="text-3xl font-extrabold">Medical &amp; Financial Disclaimer</h1>
      <p className="text-sm text-ink/60">Last updated: {siteConfig.legalLastUpdated}</p>

      <p>
        MySGBaby (&quot;the Site&quot;) provides general information about pregnancy, parenthood,
        hospitals, costs and government benefits in Singapore. <strong>It is for information only
        and is not medical, clinical, legal, or financial advice.</strong>
      </p>

      <h2 className="text-xl font-bold">Not a substitute for professional care</h2>
      <p>
        Nothing on the Site creates a doctor–patient or adviser–client relationship. Always consult
        a qualified healthcare professional about your pregnancy, and confirm any financial or
        eligibility question with the relevant official body. In an emergency, call 995 or go to the
        nearest A&amp;E.
      </p>

      <h2 className="text-xl font-bold">Accuracy &amp; sources</h2>
      <p>
        We summarise and link to official Singapore sources (e.g. MOH/HealthHub, MSF, MOM, CPF, and
        individual hospitals). Figures, schemes and prices change; we show a &quot;last checked&quot;
        date where we can, but we do not guarantee that information is current or error-free. Always
        verify against the official source before acting.
      </p>

      <h2 className="text-xl font-bold">No liability</h2>
      <p>
        To the fullest extent permitted by law, MySGBaby and its operators accept no liability for any
        loss arising from reliance on the Site. Use of the Site is at your own risk.
      </p>

      <h2 className="text-xl font-bold">Affiliate links</h2>
      <p>
        Some product links may be affiliate links, meaning we could earn a small commission at no
        extra cost to you. This never influences our information. See our Terms for details.
      </p>
    </article>
  );
}
