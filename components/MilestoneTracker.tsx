'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

const MILESTONES = [
  { id: 'smile', emoji: '😊' },
  { id: 'head', emoji: '🙆' },
  { id: 'roll', emoji: '🔄' },
  { id: 'sit', emoji: '🪑' },
  { id: 'name', emoji: '👂' },
  { id: 'crawl', emoji: '🐛' },
  { id: 'stand', emoji: '🧍' },
  { id: 'words', emoji: '🗣️' },
  { id: 'walk', emoji: '🚶' },
];
const KEY = 'mysgbaby_milestones';

export default function MilestoneTracker() {
  const t = useTranslations('milestone');
  const [done, setDone] = useState<Record<string, boolean>>({});
  useEffect(() => {
    try {
      const s = localStorage.getItem(KEY);
      if (s) setDone(JSON.parse(s));
    } catch {}
  }, []);
  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(done)); } catch {}
  }, [done]);

  const toggle = (id: string) => setDone((d) => ({ ...d, [id]: !d[id] }));
  const count = Object.values(done).filter(Boolean).length;

  return (
    <section className="rounded-2xl border border-primary/30 bg-surface p-6">
      <p className="text-sm text-ink/70">
        {t('intro')}
      </p>
      <div className="my-3 h-2 rounded-full bg-primary/15">
        <div
          className="h-2 rounded-full bg-gradient-to-r from-primary to-accent transition-all"
          style={{ width: `${(count / MILESTONES.length) * 100}%` }}
        />
      </div>
      <p className="mb-3 text-center text-sm font-semibold text-primary">
        {t('progress', { count, total: MILESTONES.length })} {count > 0 && '🎉'}
      </p>
      <ul className="space-y-2">
        {MILESTONES.map((m) => (
          <li key={m.id}>
            <button
              onClick={() => toggle(m.id)}
              className={`flex w-full items-center gap-3 rounded-xl border p-3 text-left transition ${
                done[m.id] ? 'border-secondary bg-secondary/15' : 'border-primary/20 bg-surface hover:border-primary/40'
              }`}
            >
              <span className="text-2xl">{m.emoji}</span>
              <span className="flex-1">
                <span className={`font-semibold ${done[m.id] ? 'line-through opacity-60' : ''}`}>{t(`${m.id}_name`)}</span>
                <span className="block text-xs text-ink/50">{t('typically', { range: t(`${m.id}_typical`) })}</span>
              </span>
              <span
                className={`flex h-6 w-6 items-center justify-center rounded-full border-2 text-sm ${
                  done[m.id] ? 'border-secondary bg-secondary text-white' : 'border-primary/30'
                }`}
              >
                {done[m.id] ? '✓' : ''}
              </span>
            </button>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-xs text-ink/50">
        {t('footnote')}
      </p>
    </section>
  );
}
