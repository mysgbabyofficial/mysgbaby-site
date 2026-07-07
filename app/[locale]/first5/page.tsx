import FirstFiveYears from '@/components/FirstFiveYears';
import { getFirst5 } from '@/lib/content';

export const metadata = {
  title: 'The First 5 Years — MySGBaby',
  description:
    'A year-by-year, interactive guide to your Singapore child’s first five years — government cash gifts, grants and subsidies, plus preschool choices from infant care to the playgroup years before Primary 1. Informational only; cited sources.',
};

export default async function First5Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const { ui } = getFirst5(locale) as unknown as { ui: Record<string, string> };

  return (
    <div className="space-y-8">
      {/* Hopeful hero */}
      <section
        className="relative overflow-hidden rounded-3xl shadow-xl"
        style={{
          backgroundImage:
            "linear-gradient(100deg, rgba(255,255,255,.90) 0%, rgba(255,255,255,.66) 46%, rgba(255,255,255,.12) 80%, rgba(255,255,255,0) 100%), url('/illustrations/first5-hero.webp')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="max-w-2xl p-8 md:p-12">
          <p className="font-accent text-lg text-primary">{ui.eyebrow}</p>
          <h1 className="mt-2 font-heading text-3xl font-extrabold text-ink md:text-5xl">{ui.title}</h1>
          <p className="mt-4 max-w-xl text-lg text-ink/80">{ui.subtitle}</p>
        </div>
      </section>

      <FirstFiveYears />
    </div>
  );
}
