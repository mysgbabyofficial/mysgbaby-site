'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

const fmt = (d: Date) => d.toLocaleDateString('en-SG', { day: 'numeric', month: 'long', year: 'numeric' });

export default function DueDateCalculator() {
  const t = useTranslations('dueDate');
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
      tri = w <= 13 ? t('firstTrimester') : w <= 27 ? t('secondTrimester') : w <= 42 ? t('thirdTrimester') : '—';
    }
  }

  return (
    <section className="rounded-2xl border border-primary/30 bg-surface p-6">
      <label className="block text-sm font-semibold text-ink/70">
        {t('lmpLabel')}
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
            <div className="text-xs text-ink/60">{t('dueLabel')}</div>
            <div className="mt-1 font-heading font-extrabold text-primary">{due}</div>
          </div>
          <div className="rounded-xl bg-accent/20 p-3">
            <div className="text-xs text-ink/60">{t('youreAt')}</div>
            <div className="mt-1 font-heading text-2xl font-extrabold">{week !== null ? t('week', { week }) : '—'}</div>
          </div>
          <div className="rounded-xl bg-secondary/20 p-3">
            <div className="text-xs text-ink/60">{t('trimesterLabel')}</div>
            <div className="mt-1 font-heading font-extrabold">{tri}</div>
          </div>
        </div>
      )}
      <p className="mt-3 text-xs text-ink/50">
        {t('footnote')}
      </p>
    </section>
  );
}
