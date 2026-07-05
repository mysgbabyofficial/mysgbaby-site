import { Link } from '@/i18n/routing';

const FEATURES = [
  { href: '/explore', emoji: '🗺️', title: 'Interactive guide', desc: 'Drill into every stage — what happens, what it costs, what’s next.' },
  { href: '/benefits', emoji: '💰', title: 'Benefits Centre', desc: 'Every grant, subsidy & tax relief — from birth to age 7.' },
  { href: '/hospitals', emoji: '🏥', title: 'Compare hospitals', desc: 'All 10 SG maternity hospitals with 2026 reference costs.' },
  { href: '/calculator', emoji: '🧮', title: 'Cost & confinement', desc: 'Plan delivery and confinement budgets, with offsets.' },
  { href: '/tools', emoji: '🦶', title: 'Parent tools', desc: 'Due date, kick counter, contraction timer, logs & more.' },
  { href: '/products', emoji: '🛍️', title: 'Baby essentials', desc: 'A curated checklist by stage, with indicative prices.' },
  { href: '/community', emoji: '🤝', title: 'Community & support', desc: 'Trusted SG parent groups, helplines and common questions.' },
  { href: '/loss-support', emoji: '💜', title: 'Loss support', desc: 'Compassionate resources, whenever you need them.' },
];

export default function FeatureHub() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {FEATURES.map((f) => (
        <Link
          key={f.href}
          href={f.href}
          className="group rounded-2xl border border-primary/15 bg-surface/70 p-5 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:shadow-xl"
        >
          <div className="text-3xl">{f.emoji}</div>
          <h3 className="mt-2 font-heading text-lg font-bold">{f.title}</h3>
          <p className="mt-1 text-sm text-ink/60">{f.desc}</p>
          <span className="mt-2 inline-block text-sm font-semibold text-primary transition group-hover:translate-x-1">
            Open →
          </span>
        </Link>
      ))}
    </div>
  );
}
