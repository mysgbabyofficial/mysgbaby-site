import { getTranslations } from 'next-intl/server';
import OnboardingQuiz from '@/components/OnboardingQuiz';

export default async function OnboardingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'onboardingPage' });
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-extrabold">{t('title')}</h1>
        <p className="mt-2 max-w-2xl text-ink/80">
          {t('subtitle')}
        </p>
      </header>
      <OnboardingQuiz />
    </div>
  );
}
