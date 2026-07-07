'use client';

/**
 * NotAloneBanner — a gentle, in-theme banner for the loss-support page.
 * Soft floating hearts and a calm glow (never celebratory), a reassuring message,
 * and a quiet call to reach out. Honours the muted grief palette and reduced-motion.
 */

import { useTranslations } from 'next-intl';

// A few softly rising hearts — positions/timings fixed (no randomness) for calm.
const HEARTS = [
  { left: 8, delay: 0, dur: 9, size: 16 },
  { left: 26, delay: 2.5, dur: 11, size: 12 },
  { left: 48, delay: 1.2, dur: 10, size: 20 },
  { left: 68, delay: 3.4, dur: 12, size: 14 },
  { left: 86, delay: 0.8, dur: 10.5, size: 12 },
];

export default function NotAloneBanner() {
  const t = useTranslations('lossPage');

  const scrollToHelp = () => {
    document.getElementById('loss-resources')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section
      className="relative overflow-hidden rounded-3xl border border-primary/20 shadow-lg"
      aria-label={t('bannerTitle')}
      style={{
        backgroundImage:
          "linear-gradient(105deg, rgba(58,52,78,.86) 0%, rgba(58,52,78,.62) 48%, rgba(58,52,78,.18) 82%, rgba(58,52,78,.05) 100%), url('/illustrations/loss-banner.webp')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Floating hearts */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {HEARTS.map((h, i) => (
          <span
            key={i}
            className="absolute bottom-0 select-none"
            style={{
              left: `${h.left}%`,
              fontSize: h.size,
              opacity: 0.5,
              animation: `loss-heart ${h.dur}s ease-in ${h.delay}s infinite`,
            }}
          >
            🤍
          </span>
        ))}
      </div>

      {/* Soft breathing glow */}
      <div
        className="pointer-events-none absolute -right-16 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full"
        aria-hidden="true"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,.28) 0%, transparent 65%)',
          animation: 'loss-glow 6s ease-in-out infinite',
        }}
      />

      <div className="relative z-10 max-w-2xl p-8 md:p-12">
        <p className="font-accent text-lg text-white/80">{t('eyebrow')}</p>
        <h1 className="mt-1 font-heading text-3xl font-extrabold text-white md:text-5xl">{t('bannerTitle')}</h1>
        <p className="mt-4 text-lg text-white/90">{t('bannerBody')}</p>
        <button
          onClick={scrollToHelp}
          className="mt-6 rounded-xl bg-white/90 px-6 py-3 font-semibold text-[#3a344e] shadow-md transition hover:-translate-y-0.5 hover:bg-white"
        >
          {t('bannerCta')} →
        </button>
      </div>
    </section>
  );
}
