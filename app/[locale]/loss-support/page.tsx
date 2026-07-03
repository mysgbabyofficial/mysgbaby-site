import { getTranslations } from 'next-intl/server';

/**
 * Pregnancy loss support (prompt §15). Uses the muted theme (theme-muted) and a
 * compassionate, non-celebratory tone. Kept accessible but off the main happy path.
 * Real content must be compassion-reviewed before publishing.
 */
export default async function LossSupportPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'nav' });

  return (
    <div className="theme-muted space-y-6 rounded-2xl bg-surface p-6">
      <header>
        <h1 className="text-2xl font-bold">{t('lossSupport')}</h1>
        <p className="mt-3 max-w-2xl text-ink/80">
          Every pregnancy journey is unique. There is no blame in loss. This site is here
          for you at every stage, including the difficult ones.
        </p>
      </header>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/illustrations/loss-comfort.webp"
        alt=""
        width={800}
        height={300}
        className="w-full rounded-2xl opacity-90"
      />

      <section className="space-y-2 text-sm text-ink/80">
        <h2 className="font-semibold">Singapore support resources</h2>
        <ul className="list-inside list-disc">
          <li>KKH Perinatal Loss support</li>
          <li>AWARE Helpline — 1800-774-5935</li>
          <li>Singapore Counselling Centre</li>
        </ul>
        <p className="text-xs text-ink/60">
          Contact details should be re-verified before publishing. If you are in crisis,
          please reach out to a healthcare professional or a helpline immediately.
        </p>
      </section>
    </div>
  );
}
