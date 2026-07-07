import { getTranslations } from 'next-intl/server';
import NotAloneBanner from '@/components/NotAloneBanner';
import LossSupport from '@/components/LossSupport';

export const metadata = {
  title: 'You are not alone — Loss Support — MySGBaby',
  description:
    'Gentle, compassionate support after pregnancy loss in Singapore — you are not alone, help is always here, and hope remains whenever you are ready.',
};

/**
 * Pregnancy-loss support. Uses the muted, gentle palette (theme-muted) and a
 * compassionate, non-celebratory tone. Content should be compassion-reviewed and
 * helpline numbers re-verified before publishing.
 */
export default async function LossSupportPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'lossPage' });

  return (
    <div className="theme-muted space-y-8">
      <NotAloneBanner />

      <p className="mx-auto max-w-3xl text-center text-ink/80">{t('intro')}</p>

      <LossSupport />
    </div>
  );
}
