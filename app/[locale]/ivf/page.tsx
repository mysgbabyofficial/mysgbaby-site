import { getTranslations } from 'next-intl/server';
import IvfJourney from '@/components/IvfJourney';

export const metadata = {
  title: 'The IVF Journey — MySGBaby',
  description:
    'A calm, encouraging, step-by-step guide to IVF in Singapore — what happens at each stage, and what it may cost. Informational only; cited sources.',
};

export default async function IvfPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'ivf' });

  return (
    <div className="space-y-8">
      {/* Hopeful hero */}
      <section
        className="relative overflow-hidden rounded-3xl shadow-xl"
        style={{
          backgroundImage:
            "linear-gradient(100deg, rgba(45,28,78,.78) 0%, rgba(45,28,78,.45) 46%, rgba(45,28,78,.05) 78%, rgba(45,28,78,0) 100%), url('/illustrations/ivf-hero.webp')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="max-w-2xl p-8 md:p-12">
          <p className="font-accent text-lg text-[#ffd98a]">{t('eyebrow')}</p>
          <h1 className="mt-2 font-heading text-3xl font-extrabold text-white md:text-5xl">{t('title')}</h1>
          <p className="mt-4 max-w-xl text-lg text-white/90">{t('subtitle')}</p>
        </div>
      </section>

      {/* Warm framing line */}
      <p className="max-w-3xl text-ink/75">{t('intro')}</p>

      <IvfJourney />
    </div>
  );
}
