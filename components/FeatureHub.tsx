import { Link } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';

const FEATURES = [
  { href: '/explore', emoji: '🗺️', id: 'explore' },
  { href: '/first5', emoji: '🌱', id: 'first5' },
  { href: '/benefits', emoji: '💰', id: 'benefits' },
  { href: '/hospitals', emoji: '🏥', id: 'hospitals' },
  { href: '/calculator', emoji: '🧮', id: 'calculator' },
  { href: '/tools', emoji: '🦶', id: 'tools' },
  { href: '/products', emoji: '🛍️', id: 'products' },
  { href: '/community', emoji: '🤝', id: 'community' },
  { href: '/loss-support', emoji: '💜', id: 'loss' },
];

export default async function FeatureHub() {
  const t = await getTranslations('featureHub');
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {FEATURES.map((f) => (
        <Link
          key={f.href}
          href={f.href}
          className="group rounded-2xl border border-primary/15 bg-surface/70 p-5 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:shadow-xl"
        >
          <div className="text-3xl">{f.emoji}</div>
          <h3 className="mt-2 font-heading text-lg font-bold">{t(`${f.id}Title`)}</h3>
          <p className="mt-1 text-sm text-ink/60">{t(`${f.id}Desc`)}</p>
          <span className="mt-2 inline-block text-sm font-semibold text-primary transition group-hover:translate-x-1">
            {t('open')} →
          </span>
        </Link>
      ))}
    </div>
  );
}
