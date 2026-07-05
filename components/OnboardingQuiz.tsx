'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

// First-visit quiz (prompt §2). Stores a profile in localStorage to personalise
// the experience. No account, no server — device-local only (PDPA-light).
type Profile = {
  stage: 'trying' | 'pregnant' | 'postpartum';
  week: number | '';
  birth: 'natural' | 'csection' | 'undecided';
  hospital: 'public' | 'private' | 'undecided';
  budget: number | '';
  firstTime: 'yes' | 'no';
  multiples: 'single' | 'multiples' | 'unsure';
  language: 'en' | 'zh' | 'ms' | 'ta';
};

const KEY = 'mysgbaby_profile';

const field = 'mt-1 w-full rounded-lg border border-primary/40 bg-surface px-3 py-2';

export default function OnboardingQuiz() {
  const t = useTranslations('onboardingQuiz');
  const [p, setP] = useState<Profile>({
    stage: 'pregnant',
    week: '',
    birth: 'undecided',
    hospital: 'undecided',
    budget: '',
    firstTime: 'yes',
    multiples: 'single',
    language: 'en',
  });
  const [done, setDone] = useState(false);

  const set = <K extends keyof Profile>(k: K, v: Profile[K]) => setP((prev) => ({ ...prev, [k]: v }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      localStorage.setItem(KEY, JSON.stringify(p));
    } catch {}
    setDone(true);
  };

  if (done) {
    const goStage = p.stage === 'pregnant' && p.week !== '';
    return (
      <div className="rounded-2xl border border-secondary/40 bg-secondary/15 p-6">
        <h2 className="text-xl font-bold">{t('allSet')} 🎉</h2>
        <p className="mt-2 text-ink/80">{t('tailorNote')}</p>
        <Link
          href={goStage ? `/stage/${p.week}` : '/benefits'}
          className="mt-4 inline-block rounded-xl bg-primary px-5 py-2.5 font-semibold text-ink"
        >
          {goStage ? t('goToWeek', { week: p.week }) : t('seeBenefits')}
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="grid gap-5 rounded-2xl border border-primary/30 bg-surface p-6 md:grid-cols-2">
      <label className="text-sm font-medium">
        {t('stageLabel')}
        <select className={field} value={p.stage} onChange={(e) => set('stage', e.target.value as Profile['stage'])}>
          <option value="trying">{t('stageTrying')}</option>
          <option value="pregnant">{t('stagePregnant')}</option>
          <option value="postpartum">{t('stagePostpartum')}</option>
        </select>
      </label>

      <label className="text-sm font-medium">
        {t('weekLabel')}
        <input
          type="number"
          min={1}
          max={42}
          className={field}
          value={p.week}
          onChange={(e) => set('week', e.target.value === '' ? '' : Number(e.target.value))}
          placeholder={t('weekPlaceholder')}
        />
      </label>

      <label className="text-sm font-medium">
        {t('birthLabel')}
        <select className={field} value={p.birth} onChange={(e) => set('birth', e.target.value as Profile['birth'])}>
          <option value="natural">{t('birthNatural')}</option>
          <option value="csection">{t('birthCsection')}</option>
          <option value="undecided">{t('undecided')}</option>
        </select>
      </label>

      <label className="text-sm font-medium">
        {t('hospitalLabel')}
        <select className={field} value={p.hospital} onChange={(e) => set('hospital', e.target.value as Profile['hospital'])}>
          <option value="public">{t('hospitalPublic')}</option>
          <option value="private">{t('hospitalPrivate')}</option>
          <option value="undecided">{t('undecided')}</option>
        </select>
      </label>

      <label className="text-sm font-medium">
        {t('budgetLabel')}
        <input
          type="number"
          min={0}
          className={field}
          value={p.budget}
          onChange={(e) => set('budget', e.target.value === '' ? '' : Number(e.target.value))}
          placeholder={t('budgetPlaceholder')}
        />
      </label>

      <label className="text-sm font-medium">
        {t('firstTimeLabel')}
        <select className={field} value={p.firstTime} onChange={(e) => set('firstTime', e.target.value as Profile['firstTime'])}>
          <option value="yes">{t('yes')}</option>
          <option value="no">{t('no')}</option>
        </select>
      </label>

      <label className="text-sm font-medium">
        {t('multiplesLabel')}
        <select className={field} value={p.multiples} onChange={(e) => set('multiples', e.target.value as Profile['multiples'])}>
          <option value="single">{t('multiplesSingle')}</option>
          <option value="multiples">{t('multiplesMultiples')}</option>
          <option value="unsure">{t('multiplesUnsure')}</option>
        </select>
      </label>

      <label className="text-sm font-medium">
        {t('languageLabel')}
        <select className={field} value={p.language} onChange={(e) => set('language', e.target.value as Profile['language'])}>
          <option value="en">English</option>
          <option value="zh">简体中文</option>
          <option value="ms">Bahasa Melayu</option>
          <option value="ta">தமிழ்</option>
        </select>
      </label>

      <div className="md:col-span-2">
        <button type="submit" className="rounded-xl bg-primary px-6 py-3 font-semibold text-ink shadow">
          {t('save')}
        </button>
        <p className="mt-2 text-xs text-ink/60">{t('footnote')}</p>
      </div>
    </form>
  );
}
