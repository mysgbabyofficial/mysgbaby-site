'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

// PDPA-style cookie/consent banner. Stores the choice in localStorage; analytics
// should only load when consent === 'all'. See docs/ZERO-BUDGET-LAUNCH.md.
const KEY = 'mysgbaby_consent';

export default function ConsentBanner() {
  const t = useTranslations('consent');
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setShow(true);
    } catch {
      /* localStorage unavailable — do not block the page */
    }
  }, []);

  const choose = (value: 'all' | 'essential') => {
    try {
      localStorage.setItem(KEY, value);
      // Notify the Analytics component immediately (no reload needed).
      window.dispatchEvent(new CustomEvent('mysgbaby-consent', { detail: value }));
    } catch {}
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-primary/40 bg-surface/95 p-4 backdrop-blur">
      <div className="mx-auto flex max-w-4xl flex-col items-start gap-3 text-sm md:flex-row md:items-center md:justify-between">
        <p className="text-ink/80">
          {t.rich('body', {
            privacy: (chunks) => (
              <Link href="/privacy" className="underline">
                {chunks}
              </Link>
            ),
          })}
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            onClick={() => choose('essential')}
            className="rounded-lg border border-primary/40 px-3 py-1.5"
          >
            {t('essentialOnly')}
          </button>
          <button
            onClick={() => choose('all')}
            className="rounded-lg bg-primary px-3 py-1.5 font-semibold text-ink"
          >
            {t('acceptAll')}
          </button>
        </div>
      </div>
    </div>
  );
}
