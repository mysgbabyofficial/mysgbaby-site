'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

/**
 * "Advise Me Now" — real emotional + financial guidance with citations, not placeholders.
 * Content is general, informational, and signposts to official help and the site's tools.
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
        <div className="mt-2 space-y-3 rounded-lg border border-trust/40 bg-trust/10 p-3 text-sm">
          <p className="font-semibold">{stageTitle}</p>

          <div>
            <p className="font-semibold">💛 How you might be feeling</p>
            <p className="text-ink/80">
              A mix of excitement and worry is completely normal. If you feel persistently low,
              anxious, or unable to cope, please reach out — these lines are free and confidential:{' '}
              <b>AWARE 1800-777-5555</b>, <b>IMH 6389&nbsp;2222</b>, <b>SOS 1767</b>.
            </p>
          </div>

          <div>
            <p className="font-semibold">💰 Money to plan for</p>
            <p className="text-ink/80">
              Check the government support you&apos;re entitled to — Baby Bonus, the CDA, and the
              $5,000 MediSave Grant for Newborns — and estimate your costs so there are no surprises.
            </p>
            <div className="mt-1 flex flex-wrap gap-4">
              <Link href="/benefits" className="font-semibold text-trust underline">
                See your benefits
              </Link>
              <Link href="/calculator" className="font-semibold text-trust underline">
                Cost calculator
              </Link>
            </div>
          </div>

          <p className="text-xs text-ink/50">
            Sources: AWARE, IMH, Samaritans of Singapore, MOH/HealthHub. {t('notMedicalAdvice')}
          </p>
        </div>
      )}
    </div>
  );
}
