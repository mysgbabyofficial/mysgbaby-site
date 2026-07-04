'use client';

import { useEffect, useRef, useState } from 'react';

// Signature animated timeline: baby grows inside a glowing womb (pulsing heartbeat,
// filling progress ring, "size of a fruit" badge), transforming into a newborn at birth.
const FRAMES = [
  '/illustrations/dev1.webp',
  '/illustrations/dev4.webp',
  '/illustrations/dev5.webp',
  '/illustrations/dev6.webp',
];
const SIZES: [number, string, string][] = [
  [4, '🌱', 'a poppy seed'], [6, '🫛', 'a sweet pea'], [8, '🍓', 'a raspberry'], [10, '🍓', 'a strawberry'],
  [12, '🍋', 'a lime'], [14, '🍋', 'a lemon'], [16, '🥑', 'an avocado'], [18, '🫑', 'a bell pepper'],
  [20, '🍌', 'a banana'], [22, '🫐', 'a papaya'], [24, '🌽', 'a corn cob'], [26, '🥬', 'a head of lettuce'],
  [28, '🍆', 'an eggplant'], [30, '🥬', 'a cabbage'], [32, '🎃', 'a squash'], [34, '🍍', 'a pineapple'],
  [36, '🍈', 'a honeydew melon'], [38, '🍈', 'a winter melon'], [40, '🍉', 'a watermelon'],
];
function sizeFor(w: number) {
  let s = SIZES[0];
  for (const x of SIZES) if (w >= x[0]) s = x;
  return s;
}
function frameIndex(w: number, born: boolean) {
  if (born) return 3;
  if (w >= 27) return 2;
  if (w >= 14) return 1;
  return 0;
}

function fireConfetti() {
  if (typeof document === 'undefined') return;
  const colors = ['#ffd98a', '#f7a8c6', '#9a7be4', '#a9d6be', '#ef3340'];
  for (let i = 0; i < 40; i++) {
    const c = document.createElement('div');
    c.style.cssText = `position:fixed;top:-5%;left:${Math.random() * 100}%;width:10px;height:14px;z-index:60;pointer-events:none;background:${colors[i % colors.length]};animation:mysg-confetti ${2.4 + Math.random() * 2}s linear forwards;animation-delay:${Math.random() * 0.5}s`;
    document.body.appendChild(c);
    setTimeout(() => c.remove(), 5200);
  }
}

export default function BabyDevelopment() {
  const [week, setWeek] = useState(8);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const bornRef = useRef(false);

  const born = week > 40;

  useEffect(() => {
    if (born && !bornRef.current) fireConfetti();
    bornRef.current = born;
  }, [born]);
  const idx = frameIndex(week, born);
  const scale = born ? 1 : 0.8 + (0.2 * Math.min(week, 40)) / 40;
  const C = 2 * Math.PI * 160;
  const offset = C * (1 - Math.min(week, 40) / 40);
  const s = sizeFor(week);
  const stageLabel = born
    ? 'Your baby is here! 🍼'
    : '🌙 ' + (week <= 13 ? 'First Trimester' : week <= 27 ? 'Second Trimester' : 'Third Trimester');
  const fact = born
    ? 'Congratulations — the beginning of a whole new adventure.'
    : week >= 27
      ? 'Getting cozy and gaining weight, almost ready to meet you.'
      : week >= 14
        ? 'You might feel the first kicks — and baby can hear your voice.'
        : 'Tiny but busy — the heart is beating and little features are forming.';

  const play = () => {
    if (timer.current) clearInterval(timer.current);
    let w = 5;
    setWeek(w);
    timer.current = setInterval(() => {
      w += 1;
      if (w > 44) {
        if (timer.current) clearInterval(timer.current);
        return;
      }
      setWeek(w);
    }, 130);
  };

  return (
    <div className="rounded-3xl border border-primary/15 bg-surface/70 p-6 text-center shadow-xl backdrop-blur md:p-8">
      <div className="relative mx-auto aspect-square w-[min(320px,78vw)]">
        <svg viewBox="0 0 340 340" className="absolute inset-0 -rotate-90">
          <defs>
            <linearGradient id="bdring" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#ffd98a" />
              <stop offset="1" stopColor="#f7a8c6" />
            </linearGradient>
          </defs>
          <circle cx="170" cy="170" r="160" fill="none" strokeWidth="10" stroke="rgba(154,123,228,.18)" />
          <circle
            cx="170" cy="170" r="160" fill="none" strokeWidth="10" strokeLinecap="round"
            stroke="url(#bdring)" strokeDasharray={C} strokeDashoffset={offset}
            style={{ transition: 'stroke-dashoffset 1s ease' }}
          />
        </svg>
        <div
          className="absolute inset-[8%] animate-pulse rounded-full"
          style={{ background: 'radial-gradient(circle,rgba(255,216,138,.5),rgba(247,168,198,.12) 60%,transparent 72%)' }}
        />
        <div
          className="absolute inset-[6%] overflow-hidden rounded-full shadow-2xl"
          style={{ transform: `scale(${scale})`, transition: 'transform 1.1s cubic-bezier(.2,.7,.2,1)' }}
        >
          {FRAMES.map((src, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={i}
              src={src}
              alt=""
              className="absolute inset-0 h-full w-full object-cover transition-opacity duration-1000"
              style={{ opacity: i === idx ? 1 : 0 }}
            />
          ))}
        </div>
      </div>

      <p className="mt-4 font-accent text-lg text-primary">{stageLabel}</p>
      <h3 className="font-heading text-3xl font-extrabold">{born ? '🎉 Welcome to the world!' : `Week ${week}`}</h3>
      <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-surface px-4 py-2 font-bold shadow-sm">
        <span className="text-2xl">{born ? '🍼' : s[1]}</span>
        <span>{born ? 'Perfectly sized — your baby!' : `About the size of ${s[2]}`}</span>
      </div>
      <p className="mx-auto mt-3 max-w-md text-ink/60">{fact}</p>

      <div className="mx-auto mt-5 max-w-md">
        <input
          type="range" min={4} max={52} value={week}
          onChange={(e) => setWeek(+e.target.value)}
          className="w-full" style={{ accentColor: '#9a7be4' }} aria-label="Pregnancy week"
        />
        <div className="mt-1 flex justify-between text-xs text-ink/50">
          <span>Week 4</span><span>Birth</span><span>Baby!</span>
        </div>
        <button onClick={play} className="mt-3 rounded-xl bg-gradient-to-br from-primary to-[#6a49bd] px-5 py-2.5 font-semibold text-white shadow-lg">
          ▶ Watch baby grow
        </button>
      </div>
      <p className="mt-4 text-xs text-ink/45">
        Illustrative development &amp; fruit sizes are a friendly guide, not medical measurements.
      </p>
    </div>
  );
}
