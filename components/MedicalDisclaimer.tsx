/**
 * Prominent, reusable "not advice" banner. Core of the zero-budget compliance
 * posture (see docs/ZERO-BUDGET-LAUNCH.md): the site signposts to official
 * sources instead of authoring original medical/financial advice.
 */
import { getTranslations } from 'next-intl/server';

export default async function MedicalDisclaimer({ lastChecked }: { lastChecked?: string }) {
  const t = await getTranslations('disclaimer');
  return (
    <div className="rounded-xl border border-trust/40 bg-trust/10 p-3 text-sm" role="note">
      <p dangerouslySetInnerHTML={{ __html: t('body') }} />
      {lastChecked && <p className="mt-1 text-xs text-ink/60">{t('checked', { date: lastChecked })}</p>}
    </div>
  );
}
