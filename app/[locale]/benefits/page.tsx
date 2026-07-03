import { getTranslations } from 'next-intl/server';
import BenefitsCalculator from '@/components/BenefitsCalculator';
import MedicalDisclaimer from '@/components/MedicalDisclaimer';
import PageHeader from '@/components/PageHeader';
import benefits from '@/data/benefits.json';

export default async function BenefitsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'benefits' });
  const tc = await getTranslations({ locale, namespace: 'common' });
  const asOf = benefits._meta.lastVerified;

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Government support"
        title={t('title')}
        subtitle={t('intro')}
        badge={`✓ ${t('asOf', { date: asOf })}`}
      />

      <MedicalDisclaimer lastChecked={asOf} />

      <BenefitsCalculator ctaLabel={t('calculatorCta')} disclaimer={tc('notMedicalAdvice')} />

      <section className="rounded-xl border border-trust/30 bg-trust/5 p-4 text-sm text-ink/70">
        <p className="font-medium">{tc('sourceLabel')}</p>
        <p className="mt-1">
          Figures verified against MOM, MSF, MOH/HealthHub and CPFB. Full list in the
          repository at <code>data/benefits.json</code>. Confirm co-matching and tax-relief
          figures against official pages before publishing.
        </p>
      </section>
    </div>
  );
}
