/**
 * Prominent, reusable "not advice" banner. Core of the zero-budget compliance
 * posture (see docs/ZERO-BUDGET-LAUNCH.md): the site signposts to official
 * sources instead of authoring original medical/financial advice.
 */
export default function MedicalDisclaimer({ lastChecked }: { lastChecked?: string }) {
  return (
    <div className="rounded-xl border border-trust/40 bg-trust/10 p-3 text-sm" role="note">
      <p>
        <strong>Informational only — not medical or financial advice.</strong> This page
        summarises publicly available information and links to official Singapore sources.
        Always confirm with your doctor and the official websites before making decisions.
      </p>
      {lastChecked && (
        <p className="mt-1 text-xs text-ink/60">Sources last checked: {lastChecked}</p>
      )}
    </div>
  );
}
