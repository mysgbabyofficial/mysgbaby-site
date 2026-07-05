import { getTranslations } from 'next-intl/server';
import PageHeader from '@/components/PageHeader';
import StageExplorer from '@/components/StageExplorer';

export const metadata = {
  title: 'Interactive Pregnancy Guide — MySGBaby',
  description: 'A guided, step-by-step walk through every pregnancy stage for Singapore parents.',
};

export default async function ExplorePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'explorePage' });
  return (
    <div className="space-y-6">
      <PageHeader eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} />
      <StageExplorer />
    </div>
  );
}
