'use client';

import { useEffect, useState } from 'react';
import { useLocale } from 'next-intl';
import { getFirst5 } from '@/lib/content';

type Support = { icon: string; name: string; amount: string; note: string };
type Care = { type: string; tag: string; fee: string; note: string };
type Stage = {
  id: string;
  avatar: string;
  accent: string;
  yearTitle: string;
  ageLabel: string;
  ageRange: string;
  growth: string;
  support: Support[];
  care: Care[];
  tip: string;
};
type UI = Record<string, string>;

// Static class maps — Tailwind can't JIT dynamic strings from data.
const ACCENT: Record<string, { bar: string; glow: string; ring: string; dot: string; soft: string }> = {
  primary: { bar: 'from-primary to-accent', glow: 'bg-primary/25', ring: 'ring-primary', dot: 'bg-primary', soft: 'bg-primary/10' },
  accent: { bar: 'from-accent to-gold', glow: 'bg-accent/30', ring: 'ring-accent', dot: 'bg-accent', soft: 'bg-accent/15' },
  gold: { bar: 'from-gold to-accent', glow: 'bg-gold/30', ring: 'ring-gold', dot: 'bg-gold', soft: 'bg-gold/15' },
  secondary: { bar: 'from-secondary to-primary', glow: 'bg-secondary/25', ring: 'ring-secondary', dot: 'bg-secondary', soft: 'bg-secondary/15' },
  trust: { bar: 'from-trust to-secondary', glow: 'bg-trust/25', ring: 'ring-trust', dot: 'bg-trust', soft: 'bg-trust/10' },
};

const TAG: Record<string, string> = {
  public: 'bg-secondary/20 text-ink border border-secondary/40',
  private: 'bg-gold/20 border border-gold',
  common: 'bg-primary/15 text-primary',
  optional: 'bg-ink/5 text-ink/60',
};

export default function FirstFiveYears() {
  const locale = useLocale();
  const data = getFirst5(locale) as unknown as { ui: UI; stages: Stage[]; sources: { label: string; url: string }[] };
  const { ui, stages, sources } = data;

  const [active, setActive] = useState(0);
  const [reached, setReached] = useState(0); // furthest year the child has "grown" to

  useEffect(() => {
    setReached((r) => Math.max(r, active));
  }, [active]);

  const s = stages[active];
  const a = ACCENT[s.accent] ?? ACCENT.primary;
  const last = stages.length - 1;
  const tagLabel = (tag: string) =>
    ({ public: ui.publicTag, private: ui.privateTag, common: ui.commonTag, optional: ui.optionalTag }[tag] ?? tag);

  const select = (i: number) => {
    setActive(i);
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-6">
      {/* Intro */}
      <p className="mx-auto max-w-2xl text-center text-ink/70">{ui.intro}</p>

      {/* ── Growth timeline rail: watch them grow from birth → selected year ── */}
      <div className="rounded-3xl border border-primary/15 bg-gradient-to-b from-surface to-primary/5 p-4 shadow-sm sm:p-6">
        <div className="relative overflow-x-auto pb-2">
          {/* progress track */}
          <div className="pointer-events-none absolute left-6 right-6 top-[38px] h-1.5 rounded-full bg-primary/10" />
          <div
            className={`pointer-events-none absolute left-6 top-[38px] h-1.5 rounded-full bg-gradient-to-r ${a.bar} transition-all duration-700 ease-out`}
            style={{ width: `calc((100% - 3rem) * ${active / last})` }}
          />
          <ul className="relative flex min-w-[520px] justify-between gap-1">
            {stages.map((st, i) => {
              const grown = i <= reached;
              const isActive = i === active;
              return (
                <li key={st.id} className="flex flex-1 flex-col items-center">
                  <button
                    onClick={() => select(i)}
                    aria-label={st.ageLabel}
                    className="group flex flex-col items-center focus:outline-none"
                  >
                    <span
                      className={`relative flex items-center justify-center rounded-full bg-surface ring-2 transition-all duration-500 ${
                        isActive ? `h-[76px] w-[76px] ${a.ring} shadow-lg` : grown ? 'h-14 w-14 ring-primary/30' : 'h-12 w-12 ring-primary/10'
                      }`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`/illustrations/${st.avatar}.webp`}
                        alt=""
                        className={`h-full w-full rounded-full object-contain p-1 transition-all duration-500 ${
                          grown ? 'opacity-100 saturate-100' : 'opacity-40 saturate-0'
                        } ${isActive ? 'animate-[floaty_3s_ease-in-out_infinite]' : ''}`}
                      />
                    </span>
                    <span className={`mt-2 text-center text-[11px] font-bold leading-tight ${isActive ? 'text-primary' : 'text-ink/50'}`}>
                      {st.ageLabel}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* ── Selected year card ── */}
      <article key={active} className="animate-[growIn_0.5s_ease-out] overflow-hidden rounded-3xl border border-primary/15 bg-surface shadow-xl">
        <div className="grid gap-0 md:grid-cols-[300px_1fr]">
          {/* Hero avatar */}
          <div className={`relative flex flex-col items-center justify-center overflow-hidden p-8 ${a.soft}`}>
            <div className={`absolute -z-0 h-52 w-52 rounded-full blur-2xl ${a.glow}`} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/illustrations/${s.avatar}.webp`}
              alt={s.ageLabel}
              className="relative z-10 h-52 w-52 object-contain drop-shadow-xl animate-[floaty_4s_ease-in-out_infinite]"
            />
            <span className="relative z-10 mt-2 rounded-full bg-surface/80 px-4 py-1 text-sm font-bold text-ink shadow-sm backdrop-blur">
              {ui.yourChildAt} {s.ageRange}
            </span>
          </div>

          {/* Details */}
          <div className="p-6 md:p-8">
            <h2 className="font-heading text-2xl font-extrabold md:text-3xl">{s.yearTitle}</h2>
            <p className="mt-2 text-ink/70">{s.growth}</p>

            {/* Government support */}
            <h3 className="mt-6 flex items-center gap-2 font-heading text-lg font-bold">💰 {ui.supportHeading}</h3>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {s.support.map((it) => (
                <div key={it.name} className="rounded-2xl border border-primary/15 bg-gradient-to-br from-surface to-primary/5 p-4">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-2xl">{it.icon}</span>
                    <span className="rounded-lg bg-primary/10 px-2 py-0.5 text-right text-sm font-extrabold text-primary">{it.amount}</span>
                  </div>
                  <p className="mt-2 font-heading font-bold leading-tight">{it.name}</p>
                  <p className="mt-1 text-sm text-ink/60">{it.note}</p>
                </div>
              ))}
            </div>

            {/* Care & preschool */}
            <h3 className="mt-6 flex items-center gap-2 font-heading text-lg font-bold">🏫 {ui.careHeading}</h3>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {s.care.map((c) => (
                <div key={c.type} className="rounded-2xl border border-primary/15 bg-surface p-4 shadow-sm">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${TAG[c.tag] ?? TAG.optional}`}>{tagLabel(c.tag)}</span>
                  </div>
                  <p className="mt-2 font-heading font-bold leading-tight">{c.type}</p>
                  <p className="mt-1 font-heading text-xl font-extrabold text-primary">
                    {c.fee}
                    {c.fee !== '$0' && <span className="text-sm font-semibold text-ink/50"> {ui.perMonth}</span>}
                  </p>
                  <p className="mt-1 text-sm text-ink/60">{c.note}</p>
                </div>
              ))}
            </div>

            {/* Tip */}
            <div className="mt-6 rounded-2xl border border-gold bg-[#fff7e6] p-4 text-sm">
              <span className="font-bold">💡 {ui.tipHeading}: </span>
              {s.tip}
            </div>

            {/* Nav */}
            <div className="mt-6 flex items-center justify-between gap-3">
              <button
                onClick={() => select(Math.max(0, active - 1))}
                disabled={active === 0}
                className="rounded-full border border-primary/30 px-5 py-2 text-sm font-bold text-primary transition enabled:hover:bg-primary/10 disabled:opacity-30"
              >
                ‹ {ui.back}
              </button>
              <div className="flex gap-1.5">
                {stages.map((_, i) => (
                  <span key={i} className={`h-2 rounded-full transition-all ${i === active ? `w-6 ${a.dot}` : 'w-2 bg-primary/20'}`} />
                ))}
              </div>
              {active < last ? (
                <button
                  onClick={() => select(active + 1)}
                  className={`rounded-full bg-gradient-to-r ${a.bar} px-5 py-2 text-sm font-extrabold text-ink shadow-md transition hover:-translate-y-0.5 hover:shadow-lg`}
                >
                  {ui.keepExploring} ›
                </button>
              ) : (
                <span className="rounded-full bg-secondary/20 px-5 py-2 text-sm font-extrabold text-ink">🎓</span>
              )}
            </div>
          </div>
        </div>
      </article>

      {/* ── Finale: appears once the child reaches the last year ── */}
      {reached >= last && (
        <div className="animate-[growIn_0.6s_ease-out] space-y-6">
          {/* Ready for P1 */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#ffe6a8] via-surface to-[#e9defb] p-6 text-center shadow-lg md:p-8">
            <div className="pointer-events-none absolute inset-0 opacity-60">
              <span className="absolute left-[8%] top-4 animate-[floaty_5s_ease-in-out_infinite] text-2xl">✨</span>
              <span className="absolute right-[10%] top-8 animate-[floaty_4s_ease-in-out_infinite] text-xl">🎈</span>
              <span className="absolute left-[20%] bottom-4 animate-[floaty_6s_ease-in-out_infinite] text-xl">⭐</span>
              <span className="absolute right-[22%] bottom-6 animate-[floaty_5s_ease-in-out_infinite] text-2xl">🎉</span>
            </div>
            <h2 className="relative font-heading text-2xl font-extrabold text-[#7a3b52] md:text-3xl">{ui.readyHeading}</h2>
            <p className="relative mx-auto mt-2 max-w-2xl text-ink/70">{ui.readyBody}</p>
          </div>

          {/* Big-picture tally */}
          <div className="grid items-center gap-5 rounded-3xl border border-primary/15 bg-surface p-6 shadow-sm md:grid-cols-[1fr_auto] md:p-8">
            <div>
              <p className="font-accent text-lg text-primary">{ui.financeEyebrow}</p>
              <h3 className="font-heading text-2xl font-extrabold">{ui.financeHeading}</h3>
              <p className="mt-2 text-ink/70">{ui.financeBody}</p>
            </div>
            <div className="rounded-2xl bg-gradient-to-br from-primary to-[#6a49bd] p-6 text-center text-white shadow-md">
              <div className="text-xs uppercase tracking-wide text-white/70">{ui.tallyLabel}</div>
              <div className="mt-1 font-heading text-3xl font-extrabold">{ui.tallyValue}</div>
            </div>
          </div>
          <p className="-mt-2 text-center text-xs text-ink/50">{ui.tallyNote}</p>

          {/* Public vs private */}
          <div>
            <h3 className="mb-3 text-center font-heading text-xl font-extrabold">{ui.publicVsPrivateHeading}</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-secondary/40 bg-secondary/10 p-5">
                <span className="rounded-full bg-secondary/25 px-3 py-1 text-xs font-bold text-ink">{ui.publicTag}</span>
                <p className="mt-3 text-sm text-ink/75">{ui.publicVsPrivatePublic}</p>
              </div>
              <div className="rounded-2xl border border-gold bg-gold/10 p-5">
                <span className="rounded-full bg-gold/30 px-3 py-1 text-xs font-bold">{ui.privateTag}</span>
                <p className="mt-3 text-sm text-ink/75">{ui.publicVsPrivatePrivate}</p>
              </div>
            </div>
          </div>

          {/* Sources */}
          <div className="rounded-2xl border border-secondary/40 bg-secondary/10 p-4 text-sm">
            <span className="font-semibold">{ui.sourcesLabel} </span>
            {sources.map((src, i) => (
              <span key={i}>
                <a href={src.url} target="_blank" rel="noopener noreferrer" className="underline">
                  {src.label}
                </a>
                {i < sources.length - 1 ? ' · ' : ''}
              </span>
            ))}
            <p className="mt-2 text-xs text-ink/50">{ui.verifyNote}</p>
          </div>
        </div>
      )}
    </div>
  );
}
