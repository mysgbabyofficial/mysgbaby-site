'use client';

import { useEffect, useState } from 'react';
import explorer from '@/data/explorer.json';

type Option = { to: string; em: string; label: string; hint?: string; cta?: boolean };
type PriceRow = { item: string; where: string; price: string; notes: string };
type Node = {
  title: string;
  intro?: string;
  celebrate?: string;
  illustration?: string;
  body?: string[];
  tip?: string;
  priceTable?: { caption: string; rows: PriceRow[]; note?: string };
  sources?: { label: string; url: string }[];
  options?: Option[];
};

const NODES = explorer.nodes as Record<string, Node>;
const crumb = (id: string) => (NODES[id]?.title || id).replace(/\s*\(.*$/, '');

function weekToNode(week: number) {
  if (week >= 1 && week <= 12) return 'first-tri';
  if (week >= 13 && week <= 27) return 'second-tri';
  if (week >= 28 && week <= 40) return 'third-tri';
  if (week > 40) return 'labour';
  return 'preconception';
}

export default function StageExplorer() {
  const [stack, setStack] = useState<string[]>(['home']);
  const [week, setWeek] = useState<number | null>(null);

  // Personalise from the onboarding quiz (stored in localStorage), if available.
  useEffect(() => {
    try {
      const raw = localStorage.getItem('mysgbaby_profile');
      if (raw) {
        const w = Number(JSON.parse(raw)?.week);
        if (w > 0) setWeek(w);
      }
      // Deep-link: /explore?start=<node> opens straight to that stage.
      const start = new URLSearchParams(window.location.search).get('start');
      if (start && NODES[start]) setStack(['home', start]);
    } catch {}
  }, []);

  const id = stack[stack.length - 1];
  const n = NODES[id];
  if (!n) return null;

  const go = (to: string) => {
    setStack((s) => [...s, to]);
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      {stack.length === 1 && week && (
        <div className="mb-4 flex flex-wrap items-center gap-3 rounded-2xl bg-gradient-to-r from-accent/40 to-primary/30 p-4">
          <span className="font-heading font-bold">🎉 Congratulations on your week-{week} journey!</span>
          <button
            onClick={() => setStack(['home', weekToNode(week)])}
            className="rounded-lg bg-primary px-4 py-1.5 text-sm font-semibold text-ink"
          >
            Jump to my stage →
          </button>
        </div>
      )}

      <div className="mb-3 flex flex-wrap items-center gap-1.5 text-sm">
        {stack.map((sid, i) =>
          i === stack.length - 1 ? (
            <span key={i} className="text-ink/50">
              {crumb(sid)}
            </span>
          ) : (
            <span key={i} className="flex items-center gap-1.5">
              <button
                onClick={() => setStack((s) => s.slice(0, i + 1))}
                className="rounded-full bg-primary/15 px-3 py-1 font-semibold text-primary"
              >
                {crumb(sid)}
              </button>
              <span className="text-ink/40">›</span>
            </span>
          ),
        )}
      </div>

      <article className="overflow-hidden rounded-3xl border border-primary/15 bg-surface shadow-xl">
        {n.celebrate && (
          <div className="bg-gradient-to-r from-[#ffe6a8] to-[#ffc2d3] px-6 py-4 font-heading text-lg font-extrabold text-[#7a3b52]">
            {n.celebrate}
          </div>
        )}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {n.illustration && <img src={n.illustration} alt="" className="max-h-56 w-full object-cover" />}

        <div className="p-6 md:p-8">
          {stack.length > 1 && (
            <button onClick={() => setStack((s) => s.slice(0, -1))} className="mb-2 text-sm font-bold text-primary">
              ‹ Back
            </button>
          )}
          <h2 className="text-2xl font-extrabold md:text-3xl">{n.title}</h2>
          {n.intro && <p className="mt-1 text-ink/60">{n.intro}</p>}
          {n.body && (
            <div className="mt-3 space-y-2 text-ink/80">
              {n.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          )}

          {n.priceTable && (
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm">
                <caption className="mb-1 text-left font-heading font-bold">{n.priceTable.caption}</caption>
                <thead>
                  <tr className="bg-primary/10 text-xs uppercase text-primary">
                    <th className="p-2 text-left">Item</th>
                    <th className="p-2 text-left">Where</th>
                    <th className="p-2 text-left">Price</th>
                    <th className="p-2 text-left">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {n.priceTable.rows.map((r, i) => (
                    <tr key={i} className="border-b border-primary/10 align-top">
                      <td className="p-2 font-semibold">{r.item}</td>
                      <td className="p-2">{r.where}</td>
                      <td className="p-2 font-semibold text-primary">{r.price}</td>
                      <td className="p-2">{r.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {n.priceTable.note && <p className="mt-1 text-xs text-ink/50">{n.priceTable.note}</p>}
            </div>
          )}

          {n.tip && (
            <div
              className="mt-4 rounded-xl border border-gold bg-[#fff7e6] p-3 text-sm"
              dangerouslySetInnerHTML={{ __html: '💡 ' + n.tip }}
            />
          )}

          {n.sources && (
            <div className="mt-4 rounded-xl border border-secondary/40 bg-secondary/10 p-3 text-sm">
              <span className="font-semibold">Official sources: </span>
              {n.sources.map((s, i) => (
                <span key={i}>
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className="underline">
                    {s.label}
                  </a>
                  {i < n.sources!.length - 1 ? ' · ' : ''}
                </span>
              ))}
            </div>
          )}

          {n.options && (
            <div className="mt-5 grid gap-3">
              {n.options.map((o) => (
                <button
                  key={o.to}
                  onClick={() => go(o.to)}
                  className={`flex items-center gap-4 rounded-2xl border p-4 text-left transition hover:-translate-y-1 hover:shadow-lg ${
                    o.cta ? 'border-0 bg-gradient-to-br from-primary to-[#6a49bd]' : 'border-primary/30 bg-surface'
                  }`}
                >
                  <span className="text-2xl">{o.em}</span>
                  <span className="flex-1">
                    <span className={`block font-heading font-bold ${o.cta ? 'text-white' : ''}`}>{o.label}</span>
                    {o.hint && <span className={`text-sm ${o.cta ? 'text-white/80' : 'text-ink/50'}`}>{o.hint}</span>}
                  </span>
                  <span className={`text-xl ${o.cta ? 'text-white' : 'text-primary'}`}>›</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="border-t border-primary/10 px-6 py-3 text-xs text-ink/50">
          Informational only, not medical advice · prices are reference figures · confirm with your healthcare provider.
        </div>
      </article>
    </div>
  );
}
