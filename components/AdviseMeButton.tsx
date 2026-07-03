'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

/**
 * "Advise Me Now" (prompt §10). Surfaces emotional + financial guidance at
 * high-impact stages. Copy here is placeholder scaffolding — real emotional and
 * loss-related content must be compassion-reviewed (see docs/RISK-AND-FEASIBILITY.md §1a).
 */
export default function AdviseMeButton({ stageTitle }: { stageTitle: string }) {
  const [open, setOpen] = useState(false);
  const t = useTranslations('common');

  return (
    <div>
      <button
        onClick={() => setOpen((o) => !o)}
        className="mt-2 rounded-lg bg-accent px-3 py-1.5 text-sm font-semibold text-ink"
      >
        {t('adviseMeNow')}
      </button>
      {open && (
        <div className="mt-2 rounded-lg border border-trust/40 bg-trust/10 p-3 text-sm">
          <p className="font-medium">{stageTitle}</p>
          <p className="mt-1 text-ink/80">
            {/* TODO: stage-specific emotional guidance (reviewed) */}
            [Emotional guidance placeholder — what&apos;s normal, when to seek help.]
          </p>
          <p className="mt-1 text-ink/80">
            {/* TODO: pull next-4-weeks costs from the calculator */}
            [Financial guidance placeholder — upcoming costs + government support reminders.]
          </p>
          <p className="mt-2 text-xs text-ink/60">{t('notMedicalAdvice')}</p>
        </div>
      )}
    </div>
  );
}
