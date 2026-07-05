'use client';

import { useState } from 'react';

const fmt = (d: Date) => d.toLocaleDateString('en-SG', { day: 'numeric', month: 'long', year: 'numeric' });

export default function DueDateCalculator() {
  const [lmp, setLmp] = useState('');

  let due = '';
  let week: number | null = null;
  let tri = '';
  if (lmp) {
    const d = new Date(lmp + 'T00:00:00');
    if (!Number.isNaN(d.getTime())) {
      due = fmt(new Date(d.getTime() + 280 * 86400000));
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const w = Math.floor((today.getTime() - d.getTime()) / (7 * 86400000));
      week = w >= 0 && w <= 45 ? w : null;
      tri = w <= 13 ? 'First trimester' : w <= 27 ? 'Second trimester' : w <= 42 ? 'Third trimester' : '—';
    }
  }

  return (
    <section className="rounded-2xl border border-primary/30 bg-surface p-6">
      <label className="block text-sm font-semibold text-ink/70">
        First day of your last period
        <input
          type="date"
          value={lmp}
          onChange={(e) => setLmp(e.target.value)}
          className="mt-1 block w-full rounded-lg border border-primary/40 bg-surface px-3 py-2"
        />
      </label>
      {due && (
        <div className="mt-4 grid grid-cols-1 gap-3 text-center sm:grid-cols-3">
          <div className="rounded-xl bg-primary/10 p-3">
            <div className="text-xs text-ink/60">Estimated due date</div>
            <div className="mt-1 font-heading font-extrabold text-primary">{due}</div>
          </div>
          <div className="rounded-xl bg-accent/20 p-3">
            <div className="text-xs text-ink/60">You&apos;re at</div>
            <div className="mt-1 font-heading text-2xl font-extrabold">{week !== null ? `Week ${week}` : '—'}</div>
          </div>
          <div className="rounded-xl bg-secondary/20 p-3">
            <div className="text-xs text-ink/60">Trimester</div>
            <div className="mt-1 font-heading font-extrabold">{tri}</div>
          </div>
        </div>
      )}
      <p className="mt-3 text-xs text-ink/50">
        Estimate based on a 40-week (280-day) pregnancy from your last period. Your doctor&apos;s
        dating scan gives a more accurate date.
      </p>
    </section>
  );
}
