'use client';

import { useEffect, useState } from 'react';

/**
 * Living, stage-aware background. Reads the onboarding profile (localStorage) and
 * fades the whole site between a dreamy in-the-womb world (pregnancy) and a joyful
 * newborn world (after birth). Kept subtle (low opacity + scrim) so content stays
 * readable. Sits behind everything.
 */
export default function DynamicBackground() {
  const [phase, setPhase] = useState<'pregnant' | 'born'>('pregnant');

  useEffect(() => {
    try {
      const raw = localStorage.getItem('mysgbaby_profile');
      if (raw) {
        const p = JSON.parse(raw);
        const w = Number(p?.week);
        if (p?.stage === 'postpartum' || (Number.isFinite(w) && w > 40)) setPhase('born');
      }
    } catch {}
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      <div
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-[1400ms]"
        style={{ backgroundImage: "url('/illustrations/bg-womb.webp')", opacity: phase === 'born' ? 0 : 0.22 }}
      />
      <div
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-[1400ms]"
        style={{ backgroundImage: "url('/illustrations/bg-newborn.webp')", opacity: phase === 'born' ? 0.22 : 0 }}
      />
      {/* legibility scrim */}
      <div className="absolute inset-0 bg-gradient-to-b from-surface/40 via-surface/55 to-surface/75" />
    </div>
  );
}
