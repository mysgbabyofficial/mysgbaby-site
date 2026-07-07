'use client';

/**
 * IvfJourney — an interactive, animated walk through the IVF process, in the same
 * tap-to-progress spirit as StageExplorer. The visitor advances step by step; each
 * step animates in with an encouraging note. Reaching the end gently reveals the
 * cost-estimate section.
 *
 * All display strings come from the `ivf` message namespace so they translate.
 * The cost FIGURES are kept canonical in this file (currency, not translated) —
 * same principle the calculators use. They are clearly labelled indicative and
 * cited; confirm against MOH and your clinic before relying on them.
 */

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';

const STEPS = [
  { emoji: '🩺', accent: 'var(--color-primary)' },
  { emoji: '💉', accent: 'var(--color-trust)' },
  { emoji: '🥚', accent: 'var(--color-gold)' },
  { emoji: '🔬', accent: 'var(--color-secondary)' },
  { emoji: '🌱', accent: 'var(--color-accent)' },
  { emoji: '🤍', accent: 'var(--color-primary)' },
  { emoji: '✨', accent: 'var(--color-gold)' },
];

// Canonical, indicative Singapore figures (2026). Labels are translated; the money
// ranges are not. Every figure is flagged indicative + cited in the UI below.
const COSTS = [
  { key: 'public', figure: 'S$10,000–$15,000' },
  { key: 'private', figure: 'S$15,000–$20,000+' },
  { key: 'fet', figure: 'S$3,000–$6,000' },
];
const SUPPORT = [
  { key: 'cofund', figure: 'up to ~S$7,700' },
  { key: 'medisave', figure: 'MediSave' },
];

const SOURCES = [
  { label: 'MOH — Co-funding for ART', url: 'https://www.moh.gov.sg' },
  { label: 'KKH Fertility Centre', url: 'https://www.kkh.com.sg' },
  { label: 'NUH Fertility Centre', url: 'https://www.nuh.com.sg' },
];

export default function IvfJourney() {
  const t = useTranslations('ivf');
  const [step, setStep] = useState(0);
  const [furthest, setFurthest] = useState(0);
  const [showCost, setShowCost] = useState(false);
  const costRef = useRef<HTMLDivElement>(null);

  const last = STEPS.length - 1;
  const atEnd = step === last;

  useEffect(() => {
    setFurthest((f) => Math.max(f, step));
  }, [step]);

  const go = (next: number) => {
    const clamped = Math.max(0, Math.min(last, next));
    setStep(clamped);
  };

  const revealCost = () => {
    setShowCost(true);
    setTimeout(() => costRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60);
  };

  const s = STEPS[step];
  const pct = (step / last) * 100;

  return (
    <div>
      {/* Encouraging intro band */}
      <div className="mb-6 flex flex-wrap items-center gap-3 rounded-2xl bg-gradient-to-r from-primary/20 via-accent/20 to-gold/20 p-4">
        <span className="text-2xl">🌟</span>
        <p className="flex-1 text-sm font-medium text-ink/80">{t('reassure')}</p>
      </div>

      {/* Progress timeline track */}
      <div className="mb-6">
        <div className="relative mx-1 h-2 rounded-full bg-primary/15">
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-primary via-accent to-gold transition-all duration-700 ease-out"
            style={{ width: `${pct}%` }}
          />
          {/* traveling spark */}
          <div
            className="absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-md transition-all duration-700 ease-out"
            style={{ left: `${pct}%`, background: s.accent, animation: 'ivf-pulse 1.8s ease-in-out infinite' }}
          />
        </div>
        <div className="mt-3 flex justify-between">
          {STEPS.map((st, i) => {
            const done = i <= furthest;
            const active = i === step;
            return (
              <button
                key={i}
                onClick={() => go(i)}
                aria-label={t(`step${i}_title`)}
                aria-current={active ? 'step' : undefined}
                className={`flex h-9 w-9 items-center justify-center rounded-full text-lg transition ${
                  active ? 'scale-125 shadow-lg' : done ? 'opacity-100' : 'opacity-40'
                }`}
                style={{ background: active ? st.accent : done ? 'color-mix(in oklch, var(--color-primary) 18%, white)' : 'var(--color-surface)' }}
              >
                {st.emoji}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active step card (re-keys to replay the entrance animation) */}
      <article
        key={step}
        className="overflow-hidden rounded-3xl border border-primary/15 bg-surface shadow-xl"
        style={{ animation: 'ivf-step-in .5s ease both' }}
      >
        <div className="flex items-center gap-4 px-6 py-5" style={{ background: `linear-gradient(100deg, ${s.accent}22, transparent)` }}>
          <span className="grid h-14 w-14 place-items-center rounded-2xl text-3xl shadow-inner" style={{ background: `${s.accent}33` }}>
            {s.emoji}
          </span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-primary">
              {t('stepLabel', { n: step + 1, total: STEPS.length })} · {t(`step${step}_time`)}
            </p>
            <h2 className="font-heading text-2xl font-extrabold">{t(`step${step}_title`)}</h2>
          </div>
        </div>

        <div className="space-y-4 p-6 md:p-8">
          <p className="text-ink/80">{t(`step${step}_what`)}</p>
          <div className="rounded-2xl border border-gold/60 bg-[#fff7e6] p-4">
            <p className="text-sm font-medium text-[#7a5b12]">💛 {t(`step${step}_note`)}</p>
          </div>

          {/* Navigation */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <button
              onClick={() => go(step - 1)}
              disabled={step === 0}
              className="rounded-xl border border-primary/30 px-4 py-2 text-sm font-semibold text-primary transition enabled:hover:bg-primary/10 disabled:opacity-30"
            >
              ‹ {t('prev')}
            </button>

            {!atEnd ? (
              <button
                onClick={() => go(step + 1)}
                className="rounded-xl bg-gradient-to-br from-primary to-[#6a49bd] px-6 py-2.5 font-semibold text-white shadow-lg transition hover:-translate-y-0.5"
              >
                {t('next')} →
              </button>
            ) : (
              <button
                onClick={revealCost}
                className="rounded-xl bg-gradient-to-br from-gold to-accent px-6 py-2.5 font-semibold text-[#5a3b12] shadow-lg transition hover:-translate-y-0.5"
                style={{ animation: 'ivf-cta-glow 2s ease-in-out infinite' }}
              >
                {t('seeCost')} 💰
              </button>
            )}
          </div>
        </div>

        <div className="border-t border-primary/10 px-6 py-3 text-xs text-ink/50">{t('stepDisclaimer')}</div>
      </article>

      {/* Cost estimates — revealed after the journey */}
      {showCost && (
        <div ref={costRef} className="mt-10" style={{ animation: 'ivf-step-in .6s ease both' }}>
          <div className="mb-4">
            <p className="font-accent text-lg text-primary">{t('costEyebrow')}</p>
            <h2 className="font-heading text-2xl font-extrabold md:text-3xl">{t('costTitle')}</h2>
            <p className="mt-2 max-w-2xl text-ink/70">{t('costIntro')}</p>
          </div>

          <span className="inline-block rounded-full bg-trust/15 px-3 py-1 text-xs font-semibold text-trust">
            {t('indicativeBadge')}
          </span>

          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {COSTS.map((c) => (
              <div key={c.key} className="rounded-2xl border border-primary/15 bg-surface p-5 shadow-sm">
                <p className="text-sm font-semibold text-ink/70">{t(`cost_${c.key}_label`)}</p>
                <p className="mt-1 font-heading text-2xl font-extrabold text-primary">{c.figure}</p>
                <p className="mt-1 text-xs text-ink/50">{t(`cost_${c.key}_note`)}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 rounded-2xl border border-secondary/40 bg-secondary/10 p-5">
            <p className="font-heading font-bold">{t('supportHeading')}</p>
            <ul className="mt-2 space-y-2 text-sm text-ink/80">
              {SUPPORT.map((sp) => (
                <li key={sp.key} className="flex gap-2">
                  <span className="font-semibold text-secondary">✓</span>
                  <span>
                    <b>{t(`support_${sp.key}_label`)}</b> — {t(`support_${sp.key}_note`)}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4 rounded-xl border border-primary/15 bg-primary/5 p-4 text-sm">
            <span className="font-semibold">{t('sourcesLabel')} </span>
            {SOURCES.map((src, i) => (
              <span key={src.url}>
                <a href={src.url} target="_blank" rel="noopener noreferrer" className="underline">
                  {src.label}
                </a>
                {i < SOURCES.length - 1 ? ' · ' : ''}
              </span>
            ))}
            <p className="mt-2 text-xs text-ink/50">{t('verifyNote')}</p>
          </div>

          {/* Warm closing */}
          <div className="mt-6 rounded-3xl bg-gradient-to-br from-primary/15 via-accent/15 to-gold/15 p-6 text-center">
            <p className="mx-auto max-w-2xl font-heading text-lg font-bold text-ink/85">{t('closing')}</p>
            <p className="mt-2 text-sm text-ink/60">{t('closingSub')}</p>
          </div>
        </div>
      )}
    </div>
  );
}
