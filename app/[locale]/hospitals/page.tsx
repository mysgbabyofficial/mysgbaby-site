import { getTranslations } from 'next-intl/server';
import HospitalCard from '@/components/HospitalCard';
import PageHeader from '@/components/PageHeader';
import hospitals from '@/data/hospitals.json';

export default async function HospitalsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'nav' });

  const publicH = hospitals.hospitals.filter((h) => h.type === 'public');
  const privateH = hospitals.hospitals.filter((h) => h.type === 'private');

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Compare & choose"
        title={t('hospitals')}
        subtitle="Every Singapore maternity hospital. Delivery costs are 2026 reference figures from MOH Bill Benchmarks and published hospital rates (last reviewed June 2026) — guides, not quotes. Confirm with each hospital's bill estimator."
      />

      <section>
        <h2 className="mb-3 text-xl font-bold">Public</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {publicH.map((h) => (
            <HospitalCard key={h.id} hospital={h} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-xl font-bold">Private</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {privateH.map((h) => (
            <HospitalCard key={h.id} hospital={h} />
          ))}
        </div>
      </section>
    </div>
  );
}
