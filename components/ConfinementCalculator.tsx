'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

// Interactive confinement budget planner. 2026 reference ranges (indicative) —
// sources: bankingcredit.com.sg, newbubs.sg. MediSave does NOT cover confinement.
type Support = 'none' | 'nanny' | 'centre';
const R = {
  nanny: [3500, 5500], cny: [500, 1000], centre: [8000, 20000],
  meals: [1500, 3000], massage: [300, 800], lactation: [150, 400], essentials: [1000, 3000],
};
const fmt = (n: number) => `$${n.toLocaleString('en-SG')}`;
const KEY = 'mysgbaby_confinement';

export default function ConfinementCalculator() {
  const t = useTranslations('confinement');
  const [support, setSupport] = useState<Support>('nanny');
  const [cny, setCny] = useState(false);
  const [meals, setMeals] = useState(true);
  const [massage, setMassage] = useState(false);
  const [essentials, setEssentials] = useState(false);
  const [lactation, setLactation] = useState(0);

  useEffect(() => {
    try {
      const s = localStorage.getItem(KEY);
      if (s) {
        const p = JSON.parse(s);
        setSupport(p.support ?? 'nanny'); setCny(!!p.cny); setMeals(p.meals ?? true);
        setMassage(!!p.massage); setEssentials(!!p.essentials); setLactation(p.lactation ?? 0);
      }
    } catch {}
  }, []);
  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify({ support, cny, meals, massage, essentials, lactation })); } catch {}
  }, [support, cny, meals, massage, essentials, lactation]);

  const lines: { label: string; lo: number; hi: number }[] = [];
  if (support === 'nanny') {
    lines.push({ label: t('line_nanny'), lo: R.nanny[0], hi: R.nanny[1] });
    if (cny) lines.push({ label: t('line_cnySurcharge'), lo: R.cny[0], hi: R.cny[1] });
  }
  if (support === 'centre') lines.push({ label: t('line_centre'), lo: R.centre[0], hi: R.centre[1] });
  if (meals) lines.push({ label: t('line_meals'), lo: R.meals[0], hi: R.meals[1] });
  if (massage) lines.push({ label: t('line_massage'), lo: R.massage[0], hi: R.massage[1] });
  if (lactation > 0) lines.push({ label: t('line_lactation', { count: lactation }), lo: R.lactation[0] * lactation, hi: R.lactation[1] * lactation });
  if (essentials) lines.push({ label: t('line_essentials'), lo: R.essentials[0], hi: R.essentials[1] });
  const lo = lines.reduce((s, l) => s + l.lo, 0);
  const hi = lines.reduce((s, l) => s + l.hi, 0);

  const chip = (on: boolean) =>
    `rounded-xl border px-4 py-3 text-left text-sm transition ${on ? 'border-primary bg-primary/15 ring-1 ring-primary' : 'border-primary/30 bg-surface hover:border-primary/60'}`;

  return (
    <section className="rounded-2xl border border-primary/30 bg-surface p-6">
      <p className="mb-2 text-sm font-semibold text-ink/70">{t('supportQuestion')}</p>
      <div className="grid gap-3 sm:grid-cols-3">
        <button className={chip(support === 'none')} onClick={() => setSupport('none')}>
          <span className="block font-bold">{t('supportNone')}</span>
          <span className="text-ink/60">$0</span>
        </button>
        <button className={chip(support === 'nanny')} onClick={() => setSupport('nanny')}>
          <span className="block font-bold">{t('supportNanny')}</span>
          <span className="text-ink/60">$3,500–$5,500</span>
        </button>
        <button className={chip(support === 'centre')} onClick={() => setSupport('centre')}>
          <span className="block font-bold">{t('supportCentre')}</span>
          <span className="text-ink/60">$8,000–$20,000</span>
        </button>
      </div>

      {support === 'nanny' && (
        <label className="mt-3 flex items-center gap-2 text-sm">
          <input type="checkbox" checked={cny} onChange={(e) => setCny(e.target.checked)} />
          {t('cnyLabel')}
        </label>
      )}

      <p className="mb-2 mt-5 text-sm font-semibold text-ink/70">{t('addOns')}</p>
      <div className="grid gap-3 sm:grid-cols-3">
        <button className={chip(meals)} onClick={() => setMeals(!meals)}>
          <span className="block font-bold">{t('addonMeals')}</span><span className="text-ink/60">$1,500–$3,000</span>
        </button>
        <button className={chip(massage)} onClick={() => setMassage(!massage)}>
          <span className="block font-bold">{t('addonMassage')}</span><span className="text-ink/60">$300–$800</span>
        </button>
        <button className={chip(essentials)} onClick={() => setEssentials(!essentials)}>
          <span className="block font-bold">{t('addonEssentials')}</span><span className="text-ink/60">$1,000–$3,000</span>
        </button>
      </div>

      <div className="mt-4 flex items-center justify-between rounded-xl border border-primary/30 px-4 py-3 text-sm">
        <span className="font-semibold">{t('lactationLabel')}</span>
        <span className="flex items-center gap-3">
          <button onClick={() => setLactation(Math.max(0, lactation - 1))} className="h-7 w-7 rounded-full bg-primary/15 font-bold">−</button>
          <b>{lactation}</b>
          <button onClick={() => setLactation(Math.min(6, lactation + 1))} className="h-7 w-7 rounded-full bg-primary/15 font-bold">+</button>
        </span>
      </div>

      {lines.length > 0 && (
        <table className="mt-5 w-full text-sm">
          <tbody>
            {lines.map((l) => (
              <tr key={l.label} className="border-b border-primary/10">
                <td className="py-2">{l.label}</td>
                <td className="py-2 text-right font-medium">{fmt(l.lo)}–{fmt(l.hi)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 rounded-xl bg-primary/15 px-4 py-3">
        <span className="font-bold">{t('estimatedBudget')}</span>
        <span className="text-lg font-extrabold text-primary">{fmt(lo)} – {fmt(hi)}</span>
      </div>

      <div className="mt-3 rounded-lg border border-trust/40 bg-trust/10 p-3 text-xs text-ink/70">
        {t.rich('medisaveNote', { strong: (chunks) => <strong>{chunks}</strong> })}
      </div>
      <p className="mt-2 text-xs text-ink/50">
        {t('sources')}
      </p>
    </section>
  );
}
