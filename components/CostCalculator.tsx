'use client';

import { useEffect, useMemo, useState } from 'react';
import benefits from '@/data/benefits.json';

// Session-by-session cost builder (prompt §8), honest edition: the user enters
// their OWN quotes (we never invent hospital prices), we sum them, and show the
// government support available as a separate offset. Indicative hints only.
type Line = { id: string; label: string; hint: string; amount: number };

const DEFAULT_LINES: Line[] = [
  { id: 'first-visit', label: 'First gynae visit', hint: 'e.g. $150–$350', amount: 0 },
  { id: 'dating-scan', label: 'Dating scan', hint: 'e.g. $80–$200', amount: 0 },
  { id: 'oscar-nipt', label: 'OSCAR / NIPT screening', hint: 'e.g. $400–$1,200', amount: 0 },
  { id: 'anomaly-scan', label: 'Anomaly scan', hint: 'e.g. $150–$350', amount: 0 },
  { id: 'gtt', label: 'Glucose tolerance test', hint: 'e.g. $50–$120', amount: 0 },
  { id: 'growth-scans', label: 'Growth scans (T3)', hint: 'e.g. $80–$200 each', amount: 0 },
  { id: 'delivery', label: 'Delivery package', hint: 'see Hospitals page', amount: 0 },
];

const KEY = 'mysgbaby_cost';
const fmt = (n: number) => `$${n.toLocaleString('en-SG')}`;

export default function CostCalculator() {
  const [lines, setLines] = useState<Line[]>(DEFAULT_LINES);
  const [order, setOrder] = useState<'1' | '2' | '3plus'>('1');

  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY);
      if (saved) setLines(JSON.parse(saved));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(lines));
    } catch {}
  }, [lines]);

  const total = useMemo(() => lines.reduce((s, l) => s + (Number(l.amount) || 0), 0), [lines]);

  const cashGift =
    order === '3plus'
      ? benefits.babyBonusCashGift.byBirthOrder['3plus']
      : benefits.babyBonusCashGift.byBirthOrder['1'];

  const update = (id: string, amount: number) =>
    setLines((prev) => prev.map((l) => (l.id === id ? { ...l, amount } : l)));

  return (
    <section className="rounded-2xl border border-primary/30 bg-surface p-6">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-ink/60">
            <th className="pb-2">Milestone</th>
            <th className="pb-2 text-right">Your quote (SGD)</th>
          </tr>
        </thead>
        <tbody>
          {lines.map((l) => (
            <tr key={l.id} className="border-b border-primary/15">
              <td className="py-2">
                {l.label}
                <span className="block text-xs text-ink/50">{l.hint}</span>
              </td>
              <td className="py-2 text-right">
                <input
                  type="number"
                  min={0}
                  value={l.amount || ''}
                  onChange={(e) => update(l.id, Number(e.target.value))}
                  className="w-28 rounded-lg border border-primary/40 bg-surface px-2 py-1 text-right"
                  aria-label={`${l.label} cost`}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 flex items-center justify-between rounded-xl bg-primary/15 px-4 py-3">
        <span className="font-semibold">Your estimated total</span>
        <span className="text-lg font-extrabold">{fmt(total)}</span>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-sm">
        <label className="flex items-center gap-2">
          Birth order:
          <select
            value={order}
            onChange={(e) => setOrder(e.target.value as any)}
            className="rounded-lg border border-primary/40 bg-surface px-2 py-1"
          >
            <option value="1">1st</option>
            <option value="2">2nd</option>
            <option value="3plus">3rd+</option>
          </select>
        </label>
        <span className="text-ink/70">
          Baby Bonus Cash Gift available: <strong>{fmt(cashGift)}</strong> (plus MediSave &amp;
          CDA — see Benefits)
        </span>
      </div>

      <p className="mt-3 text-xs text-ink/60">
        You enter your own quotes; we never invent hospital prices. Hints are indicative ranges,
        not official figures. Saved to this device only.
      </p>
    </section>
  );
}
