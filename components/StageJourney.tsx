import { Link } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';

// Visual, illustrated stage journey — replaces the old "type a week number" timeline.
// Each card opens the interactive explorer at that stage (/explore?start=<node>).
const STAGES = [
  { node: 'preconception', key: 'preconception', img: '/illustrations/n-preconception.webp' },
  { node: 'first-tri', key: 'firstTri', img: '/illustrations/n-first-tri.webp' },
  { node: 'second-tri', key: 'secondTri', img: '/illustrations/n-second-tri.webp' },
  { node: 'third-tri', key: 'thirdTri', img: '/illustrations/n-third-tri.webp' },
  { node: 'labour', key: 'labour', img: '/illustrations/n-labour.webp' },
  { node: 'first-year', key: 'firstYear', img: '/illustrations/n-first-year.webp' },
];

export default async function StageJourney() {
  const t = await getTranslations('stageJourney');
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {STAGES.map((s, i) => (
        <Link
          key={s.node}
          href={`/explore?start=${s.node}`}
          className="group overflow-hidden rounded-3xl border border-primary/15 bg-surface shadow-sm transition hover:-translate-y-2 hover:shadow-xl"
        >
          <div className="relative h-36 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={s.img} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
            <span className="absolute left-3 top-3 rounded-full bg-white/85 px-2.5 py-1 text-xs font-bold text-primary shadow">
              {t('stage', { num: i + 1 })}
            </span>
          </div>
          <div className="p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-primary">{t(`${s.key}Weeks`)}</p>
            <h3 className="mt-1 font-heading text-lg font-bold">{t(`${s.key}Title`)}</h3>
            <span className="mt-2 inline-block text-sm font-semibold text-primary transition group-hover:translate-x-1">
              {t('explore')} →
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
