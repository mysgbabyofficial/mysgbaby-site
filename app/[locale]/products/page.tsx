import { getTranslations } from 'next-intl/server';
import PageHeader from '@/components/PageHeader';
import { Link } from '@/i18n/routing';
import { getProducts } from '@/lib/content';

// Links open a marketplace search. Add your Shopee/Lazada/Amazon affiliate tag in
// site.config.ts to monetise — keep the disclosure banner below visible either way.
const shopUrl = (kw: string) => `https://shopee.sg/search?keyword=${encodeURIComponent(kw)}`;

export const metadata = {
  title: 'Baby Essentials — MySGBaby',
  description: 'A curated baby-essentials checklist by pregnancy stage, with indicative Singapore prices.',
};

export default async function ProductsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'productsPage' });
  const products = getProducts(locale);

  return (
    <div className="space-y-8">
      <PageHeader eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} />

      <div className="rounded-xl border border-gold bg-[#fff7e6] p-3 text-sm">
        💛 {t('affiliate')}{' '}
        <Link href="/terms" className="underline">
          {t('terms')}
        </Link>
        .
      </div>

      {products.categories.map((cat) => (
        <section key={cat.id}>
          <h2 className="mb-3 text-xl font-extrabold">
            {cat.emoji} {cat.title}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {cat.items.map((it) => (
              <a
                key={it.name}
                href={shopUrl(it.keyword)}
                target="_blank"
                rel="noopener sponsored"
                className="rounded-2xl border border-primary/15 bg-surface p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <h3 className="font-heading font-bold">{it.name}</h3>
                <p className="mt-1 font-semibold text-primary">{it.price}</p>
                <span className="mt-1 inline-block text-sm font-semibold text-primary">{t('shop')} →</span>
              </a>
            ))}
          </div>
        </section>
      ))}

      <p className="text-xs text-ink/50">{t('footnote')}</p>
    </div>
  );
}
