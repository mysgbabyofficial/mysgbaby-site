import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import CostCalculator from '@/components/CostCalculator';
import ConfinementCalculator from '@/components/ConfinementCalculator';
import MedicalDisclaimer from '@/components/MedicalDisclaimer';
import PageHeader from '@/components/PageHeader';

// Content is English for the beta; translation is deferred (see docs/ZERO-BUDGET-LAUNCH.md).
export default async function CalculatorPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'calculatorPage' });
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow={t('eyebrow')}
        title={t('title')}
        subtitle={t('subtitle')}
      />

      <MedicalDisclaimer lastChecked="2026-07-01" />
      <CostCalculator />

      <div>
        <h2 className="mb-1 mt-4 text-2xl font-extrabold">{t('confinementTitle')}</h2>
        <p className="mb-3 text-ink/70">
          {t('confinementDesc')}
        </p>
        <ConfinementCalculator />
      </div>

      <p className="text-sm text-ink/70">
        {t('deliveryPrompt')}{' '}
        <Link href="/hospitals" className="underline">
          {t('hospitalsLink')}
        </Link>{' '}
        {t('supportPrompt')}{' '}
        <Link href="/benefits" className="underline">
          {t('benefitsLink')}
        </Link>
        .
      </p>
    </div>
  );
}
