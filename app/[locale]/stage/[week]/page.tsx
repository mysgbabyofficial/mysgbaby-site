import { Link } from '@/i18n/routing';
import timeline from '@/data/timeline.json';
import MedicalDisclaimer from '@/components/MedicalDisclaimer';
import AdviseMeButton from '@/components/AdviseMeButton';

// Official Singapore sources the site signposts to (see docs/ZERO-BUDGET-LAUNCH.md).
const OFFICIAL = [
  { label: 'HealthHub (MOH) — Pregnancy & parenthood', url: 'https://www.healthhub.sg' },
  { label: 'KK Women’s and Children’s Hospital', url: 'https://www.kkh.com.sg' },
  { label: 'Health Promotion Board', url: 'https://www.hpb.gov.sg' },
  { label: 'Made for Families (MSF)', url: 'https://www.madeforfamilies.gov.sg' },
];

export default async function StagePage({ params }: { params: Promise<{ locale: string; week: string }> }) {
  const { week: weekParam } = await params;
  const week = Number(weekParam);
  const stages = timeline.stages;
  const idx = stages.findIndex((s) => s.weekRange && week >= s.weekRange[0] && week <= s.weekRange[1]);
  const stage = idx >= 0 ? stages[idx] : null;
  const next = idx >= 0 && idx < stages.length - 1 ? stages[idx + 1] : null;

  return (
    <div className="space-y-6">
      <header>
        <p className="font-accent text-lg text-trust">
          {Number.isFinite(week) ? `Week ${week}` : 'Your stage'}
        </p>
        <h1 className="text-3xl font-extrabold">{stage ? stage.title : 'Pregnancy stages'}</h1>
      </header>

      <MedicalDisclaimer lastChecked="2026-07-01" />

      {stage ? (
        <section className="rounded-2xl border border-primary/30 bg-surface p-6">
          <h2 className="font-heading text-lg font-bold">What typically happens now</h2>
          <ul className="mt-3 list-inside list-disc text-ink/80">
            {stage.milestones.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
          <p className="mt-3 text-sm text-ink/70">
            Timings are typical, not prescriptive — your gynae will guide what applies to you.
          </p>
          <div className="mt-4">
            <AdviseMeButton stageTitle={stage.title} />
          </div>
        </section>
      ) : (
        <p className="text-ink/80">
          Enter a week between 1 and 42 to see that stage, or start with the{' '}
          <Link href="/onboarding" className="underline">
            quick setup
          </Link>
          .
        </p>
      )}

      <section className="rounded-xl border border-trust/30 bg-trust/5 p-4 text-sm">
        <h2 className="font-semibold">Official sources</h2>
        <ul className="mt-2 space-y-1">
          {OFFICIAL.map((s) => (
            <li key={s.url}>
              <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-trust underline">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </section>

      {next && (
        <Link
          href={next.weekRange ? `/stage/${next.weekRange[0]}` : '/benefits'}
          className="inline-block rounded-xl bg-accent px-5 py-2.5 font-semibold text-ink"
        >
          What&apos;s next? {next.title} →
        </Link>
      )}
    </div>
  );
}
