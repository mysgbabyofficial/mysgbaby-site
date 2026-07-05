import { getTranslations } from 'next-intl/server';
import PageHeader from '@/components/PageHeader';
import KickCounter from '@/components/KickCounter';
import ContractionTimer from '@/components/ContractionTimer';
import BabyLog from '@/components/BabyLog';
import MilestoneTracker from '@/components/MilestoneTracker';
import DueDateCalculator from '@/components/DueDateCalculator';
import MedicalDisclaimer from '@/components/MedicalDisclaimer';

export const metadata = {
  title: 'Parent Tools — MySGBaby',
  description: 'A kick counter and contraction timer for expecting parents in Singapore.',
};

export default async function ToolsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'toolsPage' });
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow={t('eyebrow')}
        title={t('title')}
        subtitle={t('subtitle')}
      />
      <MedicalDisclaimer lastChecked="2026-07-01" />
      <div>
        <h2 className="mb-2 text-xl font-extrabold">{t('dueDateHeading')}</h2>
        <DueDateCalculator />
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          <h2 className="mb-2 text-xl font-extrabold">{t('kickCounterHeading')}</h2>
          <KickCounter />
        </div>
        <div>
          <h2 className="mb-2 text-xl font-extrabold">{t('contractionTimerHeading')}</h2>
          <ContractionTimer />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          <h2 className="mb-2 text-xl font-extrabold">{t('babyLogHeading')}</h2>
          <BabyLog />
        </div>
        <div>
          <h2 className="mb-2 text-xl font-extrabold">{t('milestoneHeading')}</h2>
          <MilestoneTracker />
        </div>
      </div>
    </div>
  );
}
