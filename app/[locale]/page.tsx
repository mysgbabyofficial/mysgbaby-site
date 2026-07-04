import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import PregnancyTimeline from '@/components/PregnancyTimeline';
import timeline from '@/data/timeline.json';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home' });
  const tSite = await getTranslations({ locale, namespace: 'site' });

  return (
    <div className="space-y-10">
      <section
        className="relative overflow-hidden rounded-3xl shadow-xl"
        style={{
          backgroundImage:
            "linear-gradient(100deg, rgba(45,28,78,.82) 0%, rgba(45,28,78,.5) 42%, rgba(45,28,78,.08) 72%, rgba(45,28,78,0) 100%), url('/illustrations/hero-anime.webp')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="flex max-w-2xl flex-col justify-center p-8 md:p-14" style={{ minHeight: '70vh' }}>
          <p className="font-accent text-lg text-[#ffd98a]">{tSite('tagline')}</p>
          <h1 className="mt-2 text-4xl font-extrabold text-white md:text-6xl">{t('heroTitle')}</h1>
          <p className="mt-4 max-w-xl text-lg text-white/90">{t('heroTagline')}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/onboarding"
              className="rounded-xl bg-gradient-to-br from-[#ffd98a] to-gold px-6 py-3 font-semibold text-[#5a3b12] shadow-lg transition hover:-translate-y-0.5"
            >
              {t('heroCta')} →
            </Link>
            <Link
              href="/benefits"
              className="rounded-xl border border-white/50 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur transition hover:bg-white/20"
            >
              See your benefits
            </Link>
          </div>
        </div>
      </section>

      <section>
        <p className="mb-4 text-ink/70">{t('stageIntro')}</p>
        <Link
          href="/explore"
          className="mb-6 inline-block rounded-xl bg-primary px-6 py-3 font-semibold text-ink shadow transition hover:brightness-105"
        >
          Open the interactive guide →
        </Link>
        <PregnancyTimeline stages={timeline.stages} weekPromptLabel={t('weekPrompt')} />
      </section>
    </div>
  );
}
