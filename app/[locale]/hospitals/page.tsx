import { getTranslations } from 'next-intl/server';
import HospitalCard from '@/components/HospitalCard';
import PageHeader from '@/components/PageHeader';
import { getHospitals } from '@/lib/content';

export default async function HospitalsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'nav' });
  const th = await getTranslations({ locale, namespace: 'hospitalsPage' });

  const hospitals = getHospitals(locale);
  const publicH = hospitals.hospitals.filter((h) => h.type === 'public');
  const privateH = hospitals.hospitals.filter((h) => h.type === 'private');
  const cardLabels = { normal: th('normalDelivery'), c: th('cSection'), refNote: th('refNote'), wards: th('wards') };

  return (
    <div className="space-y-8">
      <PageHeader eyebrow={th('eyebrow')} title={t('hospitals')} subtitle={th('subtitle')} />

      <section>
        <h2 className="mb-3 text-xl font-bold">{th('publicHeading')}</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {publicH.map((h) => (
            <HospitalCard key={h.id} hospital={h} labels={cardLabels} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-xl font-bold">{th('privateHeading')}</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {privateH.map((h) => (
            <HospitalCard key={h.id} hospital={h} labels={cardLabels} />
          ))}
        </div>
      </section>
    </div>
  );
}
