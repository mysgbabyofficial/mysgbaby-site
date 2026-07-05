'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

type C = { s: number; e: number };
const KEY = 'mysgbaby_contractions';
const dur = (ms: number) => {
  const s = Math.max(0, Math.floor(ms / 1000));
  return `${Math.floor(s / 60)}m ${String(s % 60).padStart(2, '0')}s`;
};

export default function ContractionTimer() {
  const t = useTranslations('contraction');
  const [list, setList] = useState<C[]>([]);
  const [current, setCurrent] = useState<number | null>(null);
  const [now, setNow] = useState(0);

  useEffect(() => {
    try {
      const s = localStorage.getItem(KEY);
      if (s) setList(JSON.parse(s));
    } catch {}
  }, []);
  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(list.slice(-30))); } catch {}
  }, [list]);
  useEffect(() => {
    if (current === null) return;
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 500);
    return () => clearInterval(id);
  }, [current]);

  const toggle = () => {
    if (current === null) setCurrent(Date.now());
    else {
      const c = { s: current, e: Date.now() };
      setList((l) => [...l, c]);
      setCurrent(null);
    }
  };
  const clear = () => { setList([]); setCurrent(null); };

  const recent = [...list].slice(-6).reverse();

  return (
    <section className="rounded-2xl border border-primary/30 bg-surface p-6 text-center">
      <p className="text-sm text-ink/70">
        {t.rich('intro', { b: (chunks) => <b>{chunks}</b> })}
      </p>
      <div className="my-3 font-heading text-3xl font-extrabold text-primary">
        {current !== null ? dur(now - current) : list.length ? t('ready') : '—'}
      </div>
      <button
        onClick={toggle}
        className={`w-full rounded-2xl py-5 text-lg font-extrabold text-white shadow-lg transition active:scale-95 ${
          current !== null ? 'bg-brand' : 'bg-gradient-to-br from-primary to-[#6a49bd]'
        }`}
      >
        {current !== null ? `■ ${t('stop')}` : `▶ ${t('startContraction')}`}
      </button>

      {recent.length > 0 && (
        <table className="mt-4 w-full text-sm">
          <thead>
            <tr className="text-xs uppercase text-ink/50">
              <th className="text-left">{t('thLength')}</th>
              <th className="text-right">{t('thApart')}</th>
            </tr>
          </thead>
          <tbody>
            {recent.map((c, i) => {
              const idxInList = list.length - 1 - i;
              const prev = list[idxInList - 1];
              const apart = prev ? c.s - prev.s : null;
              return (
                <tr key={c.s} className="border-t border-primary/10">
                  <td className="py-1.5 text-left">{dur(c.e - c.s)}</td>
                  <td className="py-1.5 text-right">{apart ? dur(apart) : '—'}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      {list.length > 0 && (
        <button onClick={clear} className="mt-3 text-sm font-semibold text-primary underline">
          {t('clear')}
        </button>
      )}
      <p className="mt-3 rounded-lg bg-trust/10 p-2 text-xs text-ink/70">
        {t.rich('guide', { b: (chunks) => <b>{chunks}</b> })}
      </p>
    </section>
  );
}
