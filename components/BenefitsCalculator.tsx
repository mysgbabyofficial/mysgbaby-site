'use client';

import { useState } from 'react';
import benefits from '@/data/benefits.json';

// Reads VERIFIED figures from data/benefits.json (2026). Estimates one-time
// government support around birth by child birth order. Transparent line items —
// no hidden assumptions.
type Order = '1' | '2' | '3plus';

function estimate(order: Order) {
  const cash =
    order === '3plus' ? benefits.babyBonusCashGift.byBirthOrder['3plus'] : benefits.babyBonusCashGift.byBirthOrder['1'];
  const cdaFirstStep = benefits.cdaFirstStepGrant.byBirthOrder[order === '3plus' ? '3plus' : '1'];
  const cdaMatchCap =
    order === '3plus' ? benefits.cdaCoMatchingCap.byBirthOrder['3-4'] : benefits.cdaCoMatchingCap.byBirthOrder['1'];
  const newbornGrant = benefits.medisaveGrantForNewborns.amount;
  const lfs = order === '3plus' ? benefits.largeFamiliesScheme.totalUpTo : 0;

  const lines = [
    { label: 'Baby Bonus Cash Gift', value: cash },
    { label: 'CDA First Step Grant', value: cdaFirstStep },
    { label: 'CDA co-matching (max, if you save the cap)', value: cdaMatchCap },
    { label: 'MediSave Grant for Newborns', value: newbornGrant },
  ];
  if (lfs) lines.push({ label: 'Large Families Scheme (3rd+ child, total)', value: lfs });

  const total = lines.reduce((s, l) => s + l.value, 0);
  return { lines, total };
}

const fmt = (n: number) => `$${n.toLocaleString('en-SG')}`;

export default function BenefitsCalculator({ ctaLabel, disclaimer }: { ctaLabel: string; disclaimer: string }) {
  const [order, setOrder] = useState<Order>('1');
  const { lines, total } = estimate(order);

  return (
    <section className="rounded-2xl border border-primary/30 bg-surface p-6">
      <div className="flex flex-wrap items-center gap-3">
        <label className="text-sm font-medium" htmlFor="order">
          This is my
        </label>
        <select
          id="order"
          value={order}
          onChange={(e) => setOrder(e.target.value as Order)}
          className="rounded-lg border border-primary/40 bg-surface px-3 py-1.5"
        >
          <option value="1">1st child</option>
          <option value="2">2nd child</option>
          <option value="3plus">3rd or later child</option>
        </select>
      </div>

      <table className="mt-5 w-full text-sm">
        <tbody>
          {lines.map((l) => (
            <tr key={l.label} className="border-b border-primary/15">
              <td className="py-2">{l.label}</td>
              <td className="py-2 text-right font-medium">{fmt(l.value)}</td>
            </tr>
          ))}
          <tr>
            <td className="py-3 font-bold">{ctaLabel}</td>
            <td className="py-3 text-right text-lg font-extrabold text-primary">up to {fmt(total)}</td>
          </tr>
        </tbody>
      </table>

      <p className="mt-3 text-xs text-ink/60">
        Indicative one-time support around birth; excludes ongoing subsidies, tax reliefs and
        annual credits. {disclaimer}
      </p>
    </section>
  );
}
