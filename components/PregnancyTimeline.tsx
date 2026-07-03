'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import AdviseMeButton from './AdviseMeButton';

type Stage = {
  id: string;
  title: string;
  weekRange: [number, number] | null;
  milestones: string[];
  adviseMe?: boolean;
  adviseMeWeeks?: number[];
};

export default function PregnancyTimeline({
  stages,
  weekPromptLabel,
}: {
  stages: Stage[];
  weekPromptLabel: string;
}) {
  const [week, setWeek] = useState<number | ''>('');
  const [openId, setOpenId] = useState<string | null>(null);

  const EMOJI = ['🌱', '🌙', '🎧', '🧸', '🍼'];

  const activeStageId = useMemo(() => {
    if (week === '') return null;
    const w = Number(week);
    return stages.find((s) => s.weekRange && w >= s.weekRange[0] && w <= s.weekRange[1])?.id ?? null;
  }, [week, stages]);

  return (
    <div>
      <label className="mb-6 inline-flex items-center gap-2 rounded-xl bg-primary/15 px-4 py-2">
        <span className="text-sm font-medium">{weekPromptLabel}</span>
        <input
          type="number"
          min={1}
          max={42}
          value={week}
          onChange={(e) => setWeek(e.target.value === '' ? '' : Number(e.target.value))}
          className="w-20 rounded-lg border border-primary/40 bg-surface px-2 py-1"
          aria-label={weekPromptLabel}
        />
      </label>

      <ol className="grid gap-4 md:grid-cols-5">
        {stages.map((stage, i) => {
          const isActive = stage.id === activeStageId;
          const open = openId === stage.id;
          return (
            <motion.li
              key={stage.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -6 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className={`cursor-pointer rounded-2xl border p-4 shadow-sm transition hover:shadow-xl ${
                isActive ? 'border-primary bg-primary/15 ring-2 ring-primary' : 'border-primary/30 bg-surface'
              }`}
            >
              <button
                onClick={() => setOpenId(open ? null : stage.id)}
                className="w-full text-left"
                aria-expanded={open}
              >
                <div className="mb-1 text-2xl">{EMOJI[i % EMOJI.length]}</div>
                <h3 className="font-heading text-base font-bold">{stage.title}</h3>
                {!open && <span className="mt-1 block text-xs font-semibold text-primary">Explore →</span>}
              </button>
              {open && (
                <div className="mt-3 space-y-2 text-sm">
                  <ul className="list-inside list-disc text-ink/80">
                    {stage.milestones.map((m) => (
                      <li key={m}>{m}</li>
                    ))}
                  </ul>
                  {(stage.adviseMe || (stage.adviseMeWeeks?.length ?? 0) > 0) && (
                    <AdviseMeButton stageTitle={stage.title} />
                  )}
                </div>
              )}
            </motion.li>
          );
        })}
      </ol>
    </div>
  );
}
