'use client';

import { useEffect, useState } from 'react';

const MILESTONES = [
  { id: 'smile', emoji: '😊', name: 'Social smile', typical: '6–8 weeks' },
  { id: 'head', emoji: '🙆', name: 'Holds head up', typical: '3–4 months' },
  { id: 'roll', emoji: '🔄', name: 'Rolls over', typical: '4–6 months' },
  { id: 'sit', emoji: '🪑', name: 'Sits without support', typical: '6–8 months' },
  { id: 'name', emoji: '👂', name: 'Responds to name', typical: '6–9 months' },
  { id: 'crawl', emoji: '🐛', name: 'Crawls', typical: '7–10 months' },
  { id: 'stand', emoji: '🧍', name: 'Pulls to stand', typical: '9–12 months' },
  { id: 'words', emoji: '🗣️', name: 'First words', typical: '10–14 months' },
  { id: 'walk', emoji: '🚶', name: 'First steps', typical: '12–15 months' },
];
const KEY = 'mysgbaby_milestones';

export default function MilestoneTracker() {
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
        Tick each milestone as your little one reaches it. Ranges are typical — every baby is different.
      </p>
      <div className="my-3 h-2 rounded-full bg-primary/15">
        <div
          className="h-2 rounded-full bg-gradient-to-r from-primary to-accent transition-all"
          style={{ width: `${(count / MILESTONES.length) * 100}%` }}
        />
      </div>
      <p className="mb-3 text-center text-sm font-semibold text-primary">
        {count} of {MILESTONES.length} reached {count > 0 && '🎉'}
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
                <span className={`font-semibold ${done[m.id] ? 'line-through opacity-60' : ''}`}>{m.name}</span>
                <span className="block text-xs text-ink/50">Typically {m.typical}</span>
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
        Ranges are a general guide (HealthHub). If you&apos;re ever concerned about your baby&apos;s
        development, speak to your doctor. Saved to this device.
      </p>
    </section>
  );
}
