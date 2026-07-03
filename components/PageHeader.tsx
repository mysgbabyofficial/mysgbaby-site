/**
 * Shared page header — a soft brand-gradient panel used across sub-pages so the
 * whole site shares one visual language (matches the homepage hero direction).
 */
export default function PageHeader({
  eyebrow,
  title,
  subtitle,
  badge,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  badge?: string;
}) {
  return (
    <header className="mb-8 overflow-hidden rounded-3xl border border-primary/15 bg-gradient-to-br from-primary/25 via-accent/15 to-secondary/20 p-8 shadow-sm md:p-10">
      {eyebrow && <p className="font-accent text-lg text-primary">{eyebrow}</p>}
      <h1 className="mt-1 text-3xl font-extrabold md:text-4xl">{title}</h1>
      {subtitle && <p className="mt-2 max-w-2xl text-ink/75">{subtitle}</p>}
      {badge && (
        <span className="mt-4 inline-block rounded-full bg-secondary/30 px-3 py-1 text-sm font-medium">
          {badge}
        </span>
      )}
    </header>
  );
}
