'use client';

/**
 * LanguageGate — the first-visit welcome experience.
 *
 * On a visitor's very first arrival (no stored choice) we show a full-screen,
 * on-theme language picker over a lavender night sky. Choosing a language plays
 * an "epic" moon-launch: the moon-cradle emblem (baby on the golden crescent)
 * dips, then soars off-screen with a glow and a burst of stars while the chosen
 * language's greeting rises — then the veil lifts onto the home hero.
 *
 * The choice is saved to the NEXT_LOCALE cookie (so next-intl's middleware keeps
 * it on future visits) and to localStorage (so the gate never shows twice).
 * Reduced-motion users get the same outcome, near-instant.
 */

import { useEffect, useRef, useState } from 'react';
import { useRouter } from '@/i18n/routing';

type Code = 'en' | 'zh' | 'ms' | 'ta';

type Lang = {
  code: Code;
  native: string; // language name in its own script
  greet: string; // warm greeting in that language
  sub: string; // "continue in …" in that language
  accent: string; // on-theme accent (lavender / gold / sage / peach)
  glow: string; // matching glow colour for the launch
};

// Greetings are hard-coded (not from the message catalogs) because this screen is
// shown BEFORE a language is chosen — it must speak to everyone at once.
const LANGS: Lang[] = [
  { code: 'en', native: 'English', greet: 'Welcome', sub: 'Continue in English', accent: 'var(--color-primary)', glow: 'rgba(179,160,220,.9)' },
  { code: 'zh', native: '简体中文', greet: '欢迎', sub: '以简体中文继续', accent: 'var(--color-gold)', glow: 'rgba(231,198,124,.95)' },
  { code: 'ms', native: 'Bahasa Melayu', greet: 'Selamat datang', sub: 'Teruskan dalam Bahasa Melayu', accent: 'var(--color-secondary)', glow: 'rgba(169,214,190,.9)' },
  { code: 'ta', native: 'தமிழ்', greet: 'வணக்கம்', sub: 'தமிழில் தொடரவும்', accent: 'var(--color-accent)', glow: 'rgba(246,203,161,.95)' },
];

const STORAGE_KEY = 'mysgbaby_lang_chosen';

// Deterministic-ish star field (generated client-side after mount, so no SSR flash).
const STARS = Array.from({ length: 34 }, (_, i) => ({
  top: (i * 79) % 100,
  left: (i * 53 + 7) % 100,
  size: 1 + (i % 3),
  delay: (i % 9) * 0.4,
  dur: 2.4 + (i % 5) * 0.5,
}));

export default function LanguageGate() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [phase, setPhase] = useState<'pick' | 'launch'>('pick');
  const [chosen, setChosen] = useState<Lang | null>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    setMounted(true);
    // Only our own explicit-choice flag counts. We intentionally do NOT treat the
    // NEXT_LOCALE cookie as "chosen" — next-intl's middleware can set that via
    // language detection on the very first request, which would wrongly hide the gate.
    let already = false;
    try {
      already = !!localStorage.getItem(STORAGE_KEY);
    } catch {}
    if (!already) {
      setVisible(true);
      document.documentElement.style.overflow = 'hidden'; // lock scroll while the gate is up
    }
    return () => {
      timers.current.forEach(clearTimeout);
      document.documentElement.style.overflow = '';
    };
  }, []);

  if (!mounted || !visible) return null;

  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  const choose = (lang: Lang) => {
    if (phase === 'launch') return;
    setChosen(lang);
    setPhase('launch');
    try {
      localStorage.setItem(STORAGE_KEY, lang.code);
      // 1-year cookie; next-intl reads NEXT_LOCALE to honour the choice server-side.
      document.cookie = `NEXT_LOCALE=${lang.code}; path=/; max-age=31536000; samesite=lax`;
    } catch {}

    const navDelay = prefersReduced ? 250 : 1650; // start loading home mid-launch
    const doneDelay = prefersReduced ? 400 : 2450; // then lift the veil onto the hero

    timers.current.push(
      setTimeout(() => router.replace('/', { locale: lang.code }), navDelay),
    );
    timers.current.push(
      setTimeout(() => {
        document.documentElement.style.overflow = '';
        setVisible(false);
      }, doneDelay),
    );
  };

  const launching = phase === 'launch';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Choose your language"
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden text-white"
      style={{
        background:
          'radial-gradient(120% 95% at 50% 8%, #3a2470 0%, #241247 55%, #140a2c 100%)',
        animation: launching ? 'gate-out .6s ease forwards .5s' : 'gate-in .5s ease both',
      }}
    >
      {/* Star field */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {STARS.map((s, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              top: `${s.top}%`,
              left: `${s.left}%`,
              width: s.size,
              height: s.size,
              opacity: 0.6,
              animation: `gate-twinkle ${s.dur}s ease-in-out ${s.delay}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Launch halo burst behind the moon */}
      {launching && (
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          aria-hidden="true"
          style={{
            width: 320,
            height: 320,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${chosen?.glow ?? 'rgba(231,198,124,.9)'} 0%, transparent 65%)`,
            animation: 'gate-halo 1.4s ease-out forwards .15s',
          }}
        />
      )}

      <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center px-6 text-center">
        {/* The baby-on-the-moon emblem — the hero of the moment */}
        <div className="relative mb-2 h-28 w-28 md:h-32 md:w-32">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/illustrations/emblem.webp"
            alt="MySGBaby — a baby cradled on a crescent moon"
            width={128}
            height={128}
            className="h-full w-full object-contain drop-shadow-[0_0_30px_rgba(231,198,124,.55)]"
            style={{
              animation: launching
                ? 'gate-moon-launch 2.2s cubic-bezier(.5,-0.2,.3,1) forwards'
                : 'gate-moon-float 5s ease-in-out infinite',
            }}
          />
        </div>

        {/* PICK phase — the welcome + language cards */}
        {!launching && (
          <>
            <p
              className="font-accent text-2xl text-[#ffd98a]"
              style={{ animation: 'gate-card-in .6s ease both .1s' }}
            >
              Welcome · 欢迎 · Selamat datang · வணக்கம்
            </p>
            <h1
              className="mt-1 font-heading text-3xl font-extrabold md:text-4xl"
              style={{ animation: 'gate-card-in .6s ease both .2s' }}
            >
              Choose your language
            </h1>
            <p
              className="mt-2 text-sm text-white/70"
              style={{ animation: 'gate-card-in .6s ease both .3s' }}
            >
              Your calm, cited pregnancy guide for Singapore — pick a language to begin.
            </p>

            <div className="mt-8 grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
              {LANGS.map((lang, i) => (
                <button
                  key={lang.code}
                  onClick={() => choose(lang)}
                  autoFocus={i === 0}
                  className="group relative overflow-hidden rounded-2xl border border-white/15 bg-white/5 p-5 text-left backdrop-blur transition hover:-translate-y-1 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ffd98a]"
                  style={{ animation: `gate-card-in .55s ease both ${0.35 + i * 0.09}s` }}
                >
                  <span
                    className="absolute inset-y-0 left-0 w-1.5 transition-all group-hover:w-2.5"
                    style={{ background: lang.accent }}
                    aria-hidden="true"
                  />
                  <span className="block font-accent text-xl" style={{ color: lang.accent }}>
                    {lang.greet}
                  </span>
                  <span className="mt-0.5 block font-heading text-2xl font-extrabold">
                    {lang.native}
                  </span>
                  <span className="mt-1 block text-sm text-white/60">{lang.sub}</span>
                  <span
                    className="mt-3 inline-flex items-center gap-1 text-sm font-semibold opacity-0 transition group-hover:opacity-100"
                    style={{ color: lang.accent }}
                  >
                    Enter →
                  </span>
                </button>
              ))}
            </div>

            <p className="mt-6 text-xs text-white/45">
              You can change this anytime from the top bar.
            </p>
          </>
        )}

        {/* LAUNCH phase — the chosen greeting rises as the moon soars */}
        {launching && chosen && (
          <div className="pointer-events-none mt-4" aria-live="polite">
            <p
              className="font-accent text-3xl md:text-5xl"
              style={{ color: chosen.accent, animation: 'gate-greet-rise 2s ease-out forwards .1s' }}
            >
              {chosen.greet}
            </p>
            <p
              className="mt-2 font-heading text-lg font-bold text-white/90 md:text-xl"
              style={{ animation: 'gate-greet-rise 2s ease-out forwards .25s' }}
            >
              {chosen.native}
            </p>
          </div>
        )}
      </div>

      {/* A couple of shooting-star streaks during launch, for drama */}
      {launching &&
        !prefersReduced &&
        [0, 1, 2].map((i) => (
          <span
            key={i}
            aria-hidden="true"
            className="absolute h-16 w-px bg-gradient-to-b from-white to-transparent"
            style={{
              left: `${20 + i * 28}%`,
              top: '-10%',
              opacity: 0,
              animation: `gate-streak 1.1s ease-in ${0.3 + i * 0.18}s forwards`,
            }}
          />
        ))}
    </div>
  );
}
