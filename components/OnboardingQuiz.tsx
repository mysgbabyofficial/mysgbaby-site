'use client';

import { useState } from 'react';
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
        <h2 className="text-xl font-bold">You&apos;re all set 🎉</h2>
        <p className="mt-2 text-ink/80">We&apos;ll tailor what you see to your journey.</p>
        <Link
          href={goStage ? `/stage/${p.week}` : '/benefits'}
          className="mt-4 inline-block rounded-xl bg-primary px-5 py-2.5 font-semibold text-ink"
        >
          {goStage ? `Go to Week ${p.week}` : 'See your benefits'}
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="grid gap-5 rounded-2xl border border-primary/30 bg-surface p-6 md:grid-cols-2">
      <label className="text-sm font-medium">
        Where are you now?
        <select className={field} value={p.stage} onChange={(e) => set('stage', e.target.value as Profile['stage'])}>
          <option value="trying">Trying to conceive</option>
          <option value="pregnant">Pregnant</option>
          <option value="postpartum">Postpartum</option>
        </select>
      </label>

      <label className="text-sm font-medium">
        If pregnant, which week?
        <input
          type="number"
          min={1}
          max={42}
          className={field}
          value={p.week}
          onChange={(e) => set('week', e.target.value === '' ? '' : Number(e.target.value))}
          placeholder="e.g. 12"
        />
      </label>

      <label className="text-sm font-medium">
        Birth preference
        <select className={field} value={p.birth} onChange={(e) => set('birth', e.target.value as Profile['birth'])}>
          <option value="natural">Natural</option>
          <option value="csection">C-section</option>
          <option value="undecided">Undecided</option>
        </select>
      </label>

      <label className="text-sm font-medium">
        Hospital preference
        <select className={field} value={p.hospital} onChange={(e) => set('hospital', e.target.value as Profile['hospital'])}>
          <option value="public">Public</option>
          <option value="private">Private</option>
          <option value="undecided">Undecided</option>
        </select>
      </label>

      <label className="text-sm font-medium">
        Budget (optional, SGD)
        <input
          type="number"
          min={0}
          className={field}
          value={p.budget}
          onChange={(e) => set('budget', e.target.value === '' ? '' : Number(e.target.value))}
          placeholder="e.g. 8000"
        />
      </label>

      <label className="text-sm font-medium">
        First-time parent?
        <select className={field} value={p.firstTime} onChange={(e) => set('firstTime', e.target.value as Profile['firstTime'])}>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </label>

      <label className="text-sm font-medium">
        Single or multiples?
        <select className={field} value={p.multiples} onChange={(e) => set('multiples', e.target.value as Profile['multiples'])}>
          <option value="single">Single baby</option>
          <option value="multiples">Twins / multiples</option>
          <option value="unsure">Not sure yet</option>
        </select>
      </label>

      <label className="text-sm font-medium">
        Preferred language
        <select className={field} value={p.language} onChange={(e) => set('language', e.target.value as Profile['language'])}>
          <option value="en">English</option>
          <option value="zh">简体中文</option>
          <option value="ms">Bahasa Melayu</option>
          <option value="ta">தமிழ்</option>
        </select>
      </label>

      <div className="md:col-span-2">
        <button type="submit" className="rounded-xl bg-primary px-6 py-3 font-semibold text-ink shadow">
          Save &amp; personalise
        </button>
        <p className="mt-2 text-xs text-ink/60">Saved to this device only. No account needed.</p>
      </div>
    </form>
  );
}
