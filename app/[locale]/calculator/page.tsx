import { Link } from '@/i18n/routing';
import CostCalculator from '@/components/CostCalculator';
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
