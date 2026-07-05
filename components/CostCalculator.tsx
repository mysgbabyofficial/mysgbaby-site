'use client';

import { useEffect, useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import benefits from '@/data/benefits.json';

// Session-by-session cost builder (prompt §8), honest edition: the user enters
// their OWN quotes (we never invent hospital prices), we sum them, and show the
// government support available as a separate offset. Indicative hints only.
type Line = { id: string; amount: number };

const LINE_IDS = ['first-visit', 'dating-scan', 'oscar-nipt', 'anomaly-scan', 'gtt', 'growth-scans', 'delivery'];
const DEFAULT_LINES: Line[] = LINE_IDS.map((id) => ({ id, amount: 0 }));

const KEY = 'mysgbaby_cost';
const fmt = (n: number) => `$${n.toLocaleString('en-SG')}`;

export default function CostCalculator() {
  const t = useTranslations('cost');
  const [lines, setLines] = useState<Line[]>(DEFAULT_LINES);
  const [order, setOrder] = useState<'1' | '2' | '3plus'>('1');

  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Line[];
        // Keep only id + amount so translated labels always come from messages.
        setLines(LINE_IDS.map((id) => ({ id, amount: Number(parsed.find((p) => p.id === id)?.amount) || 0 })));
      }
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
            <th className="pb-2">{t('milestone')}</th>
            <th className="pb-2 text-right">{t('yourQuote')}</th>
          </tr>
        </thead>
        <tbody>
          {lines.map((l) => (
            <tr key={l.id} className="border-b border-primary/15">
              <td className="py-2">
                {t(`line_${l.id}_label`)}
                <span className="block text-xs text-ink/50">{t(`line_${l.id}_hint`)}</span>
              </td>
              <td className="py-2 text-right">
                <input
                  type="number"
                  min={0}
                  value={l.amount || ''}
                  onChange={(e) => update(l.id, Number(e.target.value))}
                  className="w-28 rounded-lg border border-primary/40 bg-surface px-2 py-1 text-right"
                  aria-label={t(`line_${l.id}_label`)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 flex items-center justify-between rounded-xl bg-primary/15 px-4 py-3">
        <span className="font-semibold">{t('total')}</span>
        <span className="text-lg font-extrabold">{fmt(total)}</span>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-sm">
        <label className="flex items-center gap-2">
          {t('birthOrder')}
          <select
            value={order}
            onChange={(e) => setOrder(e.target.value as any)}
            className="rounded-lg border border-primary/40 bg-surface px-2 py-1"
          >
            <option value="1">{t('o1')}</option>
            <option value="2">{t('o2')}</option>
            <option value="3plus">{t('o3')}</option>
          </select>
        </label>
        <span className="text-ink/70" dangerouslySetInnerHTML={{ __html: t('cashAvail', { amount: fmt(cashGift) }) }} />
      </div>

      <p className="mt-3 text-xs text-ink/60">{t('footnote')}</p>
    </section>
  );
}
