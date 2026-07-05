import { getTranslations } from 'next-intl/server';
import PageHeader from '@/components/PageHeader';
import { Link } from '@/i18n/routing';

export const metadata = {
  title: 'Community & Support — MySGBaby',
  description: 'Trusted Singapore parenting communities, helplines and common questions for new parents.',
};

export default async function CommunityPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'communityPage' });

  const COMMUNITIES = [
    { name: t('community0Name'), desc: t('community0Desc'), url: 'https://www.kiasuparents.com' },
    { name: t('community1Name'), desc: t('community1Desc'), url: 'https://www.reddit.com/r/singaporeparents/' },
    { name: t('community2Name'), desc: t('community2Desc'), url: 'https://www.facebook.com/' },
    { name: t('community3Name'), desc: t('community3Desc'), url: 'https://www.pregnantandpopped.com/' },
    { name: t('community4Name'), desc: t('community4Desc'), url: 'https://www.kkh.com.sg/' },
  ];

  const HELPLINES = [
    { name: t('helpline0Name'), num: '1800-777-5555', note: t('helpline0Note') },
    { name: t('helpline1Name'), num: '6389 2222', note: t('helpline1Note') },
    { name: t('helpline2Name'), num: '1767', note: t('helpline2Note') },
  ];

  const FAQ = [
    { q: t('faq0Q'), a: t('faq0A') },
    { q: t('faq1Q'), a: t('faq1A') },
    { q: t('faq2Q'), a: t('faq2A') },
    { q: t('faq3Q'), a: t('faq3A') },
  ];

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow={t('eyebrow')}
        title={t('title')}
        subtitle={t('subtitle')}
      />

      <section>
        <h2 className="mb-3 text-xl font-extrabold">{t('communitiesHeading')}</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {COMMUNITIES.map((c) => (
            <a
              key={c.name}
              href={c.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl border border-primary/15 bg-surface p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <h3 className="font-heading font-bold">{c.name}</h3>
              <p className="mt-1 text-sm text-ink/60">{c.desc}</p>
              <span className="mt-1 inline-block text-sm font-semibold text-primary">{t('visit')}</span>
            </a>
          ))}
        </div>
        <p className="mt-2 text-xs text-ink/50">
          {t('communitiesNote')}
        </p>
      </section>

      <section>
        <h2 className="mb-3 text-xl font-extrabold">{t('helplinesHeading')}</h2>
        <div className="overflow-hidden rounded-2xl border border-primary/15 bg-surface shadow-sm">
          <table className="w-full text-sm">
            <tbody>
              {HELPLINES.map((h) => (
                <tr key={h.name} className="border-t border-primary/10 first:border-t-0">
                  <td className="p-3">
                    <b>{h.name}</b>
                    <span className="block text-xs text-ink/50">{h.note}</span>
                  </td>
                  <td className="whitespace-nowrap p-3 text-right font-semibold text-primary">{h.num}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-xs text-ink/50">
          {t('breastfeedingNote')}{' '}
          <a href="https://www.healthhub.sg" target="_blank" rel="noopener noreferrer" className="underline">
            {t('healthHubLink')}
          </a>
          .
        </p>
      </section>

      <section>
        <h2 className="mb-3 text-xl font-extrabold">{t('faqHeading')}</h2>
        <div className="space-y-3">
          {FAQ.map((f) => (
            <div key={f.q} className="rounded-2xl border border-primary/15 bg-surface p-4 shadow-sm">
              <p className="font-heading font-bold">{f.q}</p>
              <p className="mt-1 text-sm text-ink/70">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      <p className="text-sm text-ink/70">
        {t('journeyPrompt')}{' '}
        <Link href="/explore" className="font-semibold text-primary underline">{t('journeyLink')}</Link>
      </p>
    </div>
  );
}
