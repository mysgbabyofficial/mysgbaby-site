'use client';

import { useEffect, useState } from 'react';

type Entry = { t: number; type: string; emoji: string };
const KEY = 'mysgbaby_babylog';
const TYPES = [
  { type: 'Feed', emoji: '🍼' },
  { type: 'Sleep', emoji: '😴' },
  { type: 'Wet', emoji: '💧' },
  { type: 'Dirty', emoji: '💩' },
];

export default function BabyLog() {
  const [log, setLog] = useState<Entry[]>([]);
  const [now, setNow] = useState(0);

  useEffect(() => {
    try {
      const s = localStorage.getItem(KEY);
      if (s) setLog(JSON.parse(s));
    } catch {}
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 30000);
    return () => clearInterval(id);
  }, []);
  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(log.slice(-200))); } catch {}
  }, [log]);

  const add = (type: string, emoji: string) => setLog((l) => [...l, { t: Date.now(), type, emoji }]);
  const clear = () => setLog([]);

  const startOfDay = now ? new Date(now).setHours(0, 0, 0, 0) : 0;
  const count = (t: string) => log.filter((e) => e.type === t && e.t >= startOfDay).length;
  const lastFeed = [...log].reverse().find((e) => e.type === 'Feed');
  const since = (ms: number) => {
    if (!now) return '';
    const m = Math.max(0, Math.floor((now - ms) / 60000));
    return m < 60 ? `${m}m ago` : `${Math.floor(m / 60)}h ${m % 60}m ago`;
  };
  const fmtTime = (ms: number) => new Date(ms).toLocaleTimeString('en-SG', { hour: '2-digit', minute: '2-digit' });
  const recent = [...log].slice(-8).reverse();

  return (
    <section className="rounded-2xl border border-primary/30 bg-surface p-6">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {TYPES.map((x) => (
          <button
            key={x.type}
            onClick={() => add(x.type, x.emoji)}
            className="rounded-2xl bg-gradient-to-br from-primary/15 to-accent/20 py-4 text-center font-bold shadow-sm transition hover:-translate-y-0.5 active:scale-95"
          >
            <div className="text-3xl">{x.emoji}</div>
            <div className="mt-1 text-sm">{x.type}</div>
          </button>
        ))}
      </div>

      {now > 0 && (
        <>
          <div className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-1 text-sm text-ink/70">
            <span>Today: 🍼 {count('Feed')}</span>
            <span>😴 {count('Sleep')}</span>
            <span>💧 {count('Wet')}</span>
            <span>💩 {count('Dirty')}</span>
          </div>
          {lastFeed && <p className="mt-1 text-center text-sm font-semibold text-primary">Last feed: {since(lastFeed.t)}</p>}
        </>
      )}

      {recent.length > 0 && (
        <ul className="mt-4 divide-y divide-primary/10 text-sm">
          {recent.map((e, i) => (
            <li key={`${e.t}-${i}`} className="flex justify-between py-1.5">
              <span>{e.emoji} {e.type}</span>
              <span className="text-ink/50">{fmtTime(e.t)}</span>
            </li>
          ))}
        </ul>
      )}

      {log.length > 0 && (
        <button onClick={clear} className="mt-3 text-sm font-semibold text-primary underline">
          Clear log
        </button>
      )}
      <p className="mt-3 text-xs text-ink/50">Saved to this device only. A handy log, not medical monitoring.</p>
    </section>
  );
}
