// TEMPLATE — AI-drafted starting point, NOT yet legally reviewed. See docs/ZERO-BUDGET-LAUNCH.md.
import { siteConfig, contactEmailOrPlaceholder as contact } from '@/site.config';

export default function TermsPage() {
  return (
    <article className="prose-sm max-w-3xl space-y-4">
      <div className="rounded-lg border border-amber-400/60 bg-amber-100/60 p-3 text-sm text-amber-900 dark:bg-amber-900/30 dark:text-amber-100">
        <strong>Template notice:</strong> AI-drafted starting point, not legal advice and not yet
        reviewed. Details come from <code>site.config.ts</code>; get this reviewed when you can.
      </div>

      <h1 className="text-3xl font-extrabold">Terms of Use</h1>
      <p className="text-sm text-ink/60">Last updated: {siteConfig.legalLastUpdated}</p>

      <h2 className="text-xl font-bold">1. Informational service</h2>
      <p>
        MySGBaby provides general information for parents in Singapore. It is not medical, legal, or
        financial advice. See our Disclaimer.
      </p>

      <h2 className="text-xl font-bold">2. No warranty</h2>
      <p>
        The Site is provided &quot;as is&quot; without warranties of any kind. We do not guarantee
        accuracy, completeness, or that information is current.
      </p>

      <h2 className="text-xl font-bold">3. Affiliate disclosure</h2>
      <p>
        Some outbound product links are affiliate links; we may earn a commission at no extra cost to
        you. Commercial relationships never influence our information or recommendations.
      </p>

      <h2 className="text-xl font-bold">4. External links</h2>
      <p>We link to official and third-party sites we do not control and are not responsible for their content.</p>

      <h2 className="text-xl font-bold">5. Intellectual property</h2>
      <p>Original content and illustrations are owned by {siteConfig.operatorName}. Government figures are cited to their sources.</p>

      <h2 className="text-xl font-bold">6. Limitation of liability</h2>
      <p>To the extent permitted by law, we are not liable for any loss arising from use of the Site.</p>

      <h2 className="text-xl font-bold">7. Governing law</h2>
      <p>These terms are governed by the laws of Singapore.</p>

      <h2 className="text-xl font-bold">8. Contact</h2>
      <p>{contact}</p>
    </article>
  );
}
