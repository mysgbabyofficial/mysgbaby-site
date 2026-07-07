'use client';

/**
 * LossSupport — the interactive, compassionate body of the loss-support page.
 * Gentle tap-through affirmations, Singapore support resources (tap-to-call), and
 * a tender "whenever you're ready" section that offers hope without any pressure.
 * Deliberately calm: no confetti, no celebration, muted palette (page sets it).
 */

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

const AFFIRMATION_COUNT = 6;

// Resource names/notes come from i18n; phone numbers are canonical. Numbers should
// be re-verified before publishing (see verifyNote on the page).
const RESOURCES = [
  { key: 'sos', tel: '1767', display: '1767' },
  { key: 'aware', tel: '1800-777-5555', display: '1800-777-5555' },
  { key: 'hospital', tel: '', display: '' },
];

export default function LossSupport() {
  const t = useTranslations('lossPage');
  const [idx, setIdx] = useState(0);

  return (
    <div className="space-y-8">
      {/* Gentle affirmations, one at a time */}
      <section className="rounded-3xl border border-primary/20 bg-surface/70 p-6 text-center md:p-8">
        <p className="font-accent text-lg text-primary/80">{t('affirmationsHeading')}</p>
        <p
          key={idx}
          className="mx-auto mt-3 max-w-xl font-heading text-xl font-bold text-ink/85 md:text-2xl"
          style={{ animation: 'loss-affirm .5s ease both' }}
          aria-live="polite"
        >
          {t(`affirm${idx}`)}
        </p>
        <div className="mt-5 flex items-center justify-center gap-3">
          <button
            onClick={() => setIdx((i) => (i - 1 + AFFIRMATION_COUNT) % AFFIRMATION_COUNT)}
            className="grid h-9 w-9 place-items-center rounded-full border border-primary/30 text-primary transition hover:bg-primary/10"
            aria-label={t('prevAffirm')}
          >
            ‹
          </button>
          <div className="flex gap-1.5" aria-hidden="true">
            {Array.from({ length: AFFIRMATION_COUNT }).map((_, i) => (
              <span
                key={i}
                className={`h-2 w-2 rounded-full transition ${i === idx ? 'bg-primary' : 'bg-primary/25'}`}
              />
            ))}
          </div>
          <button
            onClick={() => setIdx((i) => (i + 1) % AFFIRMATION_COUNT)}
            className="grid h-9 w-9 place-items-center rounded-full border border-primary/30 text-primary transition hover:bg-primary/10"
            aria-label={t('nextAffirm')}
          >
            ›
          </button>
        </div>
      </section>

      {/* Support resources */}
      <section id="loss-resources" className="scroll-mt-24">
        <h2 className="mb-1 font-heading text-xl font-extrabold">{t('resourcesHeading')}</h2>
        <p className="mb-4 text-sm text-ink/70">{t('resourcesIntro')}</p>
        <div className="grid gap-4 sm:grid-cols-3">
          {RESOURCES.map((r) => {
            const inner = (
              <>
                <h3 className="font-heading font-bold">{t(`res_${r.key}_name`)}</h3>
                <p className="mt-1 text-sm text-ink/60">{t(`res_${r.key}_note`)}</p>
                {r.display && <p className="mt-2 font-semibold text-primary">{r.display}</p>}
              </>
            );
            return r.tel ? (
              <a
                key={r.key}
                href={`tel:${r.tel}`}
                className="rounded-2xl border border-primary/15 bg-surface p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                {inner}
              </a>
            ) : (
              <div key={r.key} className="rounded-2xl border border-primary/15 bg-surface p-4 shadow-sm">
                {inner}
              </div>
            );
          })}
        </div>
        <p className="mt-3 rounded-xl border border-trust/30 bg-trust/5 p-3 text-sm text-ink/75">
          🕊️ {t('crisisNote')}
        </p>
        <p className="mt-2 text-xs text-ink/50">{t('verifyNote')}</p>
      </section>

      {/* Whenever you're ready — hope, no pressure */}
      <section className="overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 p-6 md:p-8">
        <p className="font-accent text-lg text-primary/80">{t('readyEyebrow')}</p>
        <h2 className="mt-1 font-heading text-2xl font-extrabold">{t('readyHeading')}</h2>
        <p className="mt-3 max-w-2xl text-ink/80">{t('readyBody')}</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/ivf"
            className="rounded-xl bg-gradient-to-br from-primary to-[#6a49bd] px-5 py-2.5 font-semibold text-white shadow-md transition hover:-translate-y-0.5"
          >
            {t('readyCtaIvf')} →
          </Link>
          <Link
            href="/community"
            className="rounded-xl border border-primary/40 px-5 py-2.5 font-semibold text-primary transition hover:bg-primary/10"
          >
            {t('readyCtaCommunity')}
          </Link>
        </div>
        <p className="mt-5 font-heading text-lg font-bold text-ink/85">{t('closing')}</p>
      </section>
    </div>
  );
}
