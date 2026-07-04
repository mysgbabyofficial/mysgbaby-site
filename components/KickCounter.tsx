'use client';

import { useEffect, useRef, useState } from 'react';

const fmt = (ms: number) => {
  const s = Math.max(0, Math.floor(ms / 1000));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
};

export default function KickCounter() {
  const startRef = useRef<number | null>(null);
  const [kicks, setKicks] = useState(0);
  const [end, setEnd] = useState<number | null>(null);
  const [now, setNow] = useState(0);
  const [last, setLast] = useState<string | null>(null);

  useEffect(() => {
    try {
      const s = localStorage.getItem('mysgbaby_kick_last');
      if (s) setLast(s);
    } catch {}
  }, []);

  useEffect(() => {
    if (kicks === 0 || end !== null) return;
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [kicks, end]);

  const felt = () => {
    const t = Date.now();
    if (kicks === 0) startRef.current = t;
    const nk = kicks + 1;
    if (nk >= 10 && startRef.current) {
      setEnd(t);
      const min = Math.max(1, Math.round((t - startRef.current) / 60000));
      const msg = `10 movements in ~${min} min`;
      setLast(msg);
      try { localStorage.setItem('mysgbaby_kick_last', msg); } catch {}
    }
    setKicks(nk);
  };
  const reset = () => { startRef.current = null; setKicks(0); setEnd(null); };

  const elapsed = startRef.current ? (end ?? now) - startRef.current : 0;
  const done = kicks >= 10;

  return (
    <section className="rounded-2xl border border-primary/30 bg-surface p-6 text-center">
      <p className="text-sm text-ink/70">
        Tap each time you feel a movement. Aim for <b>10 in 2 hours</b>.
      </p>
      <div className="my-4">
        <div className="font-heading text-5xl font-extrabold text-primary">
          {kicks}
          <span className="text-2xl text-ink/40">/10</span>
        </div>
        {startRef.current !== null && <div className="mt-1 text-sm text-ink/60">Elapsed {fmt(elapsed)}</div>}
      </div>
      {done ? (
        <div className="rounded-xl bg-secondary/25 p-3 text-sm font-semibold">🎉 {last} — nice!</div>
      ) : (
        <button
          onClick={felt}
          className="w-full rounded-2xl bg-gradient-to-br from-primary to-[#6a49bd] py-5 text-lg font-extrabold text-white shadow-lg transition active:scale-95"
        >
          👣 I felt a kick
        </button>
      )}
      <button onClick={reset} className="mt-3 text-sm font-semibold text-primary underline">
        Reset
      </button>
      {!done && last && <p className="mt-2 text-xs text-ink/50">Last session: {last}</p>}
      <p className="mt-3 text-xs text-ink/50">
        If you notice a clear reduction in your baby&apos;s movements, contact your provider straight
        away. This is a helper, not a medical device.
      </p>
    </section>
  );
}
