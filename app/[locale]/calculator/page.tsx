import { Link } from '@/i18n/routing';
import CostCalculator from '@/components/CostCalculator';
import ConfinementCalculator from '@/components/ConfinementCalculator';
import MedicalDisclaimer from '@/components/MedicalDisclaimer';
import PageHeader from '@/components/PageHeader';

// Content is English for the beta; translation is deferred (see docs/ZERO-BUDGET-LAUNCH.md).
export default function CalculatorPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Plan your costs"
        title="Pregnancy Cost Calculator"
        subtitle="Build your own estimate. Enter the quotes you receive from your clinic and hospital — we total them and show the government support available to offset them."
      />

      <MedicalDisclaimer lastChecked="2026-07-01" />
      <CostCalculator />

      <div>
        <h2 className="mb-1 mt-4 text-2xl font-extrabold">Confinement budget planner</h2>
        <p className="mb-3 text-ink/70">
          The biggest post-birth cost — and MediSave doesn&apos;t cover it. Pick your options to
          estimate a realistic budget.
        </p>
        <ConfinementCalculator />
      </div>

      <p className="text-sm text-ink/70">
        Looking for delivery-package prices? See the{' '}
        <Link href="/hospitals" className="underline">
          Hospitals
        </Link>{' '}
        page. Government support is detailed in{' '}
        <Link href="/benefits" className="underline">
          Benefits
        </Link>
        .
      </p>
    </div>
  );
}
