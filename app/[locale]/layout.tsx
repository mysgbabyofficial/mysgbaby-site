import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { Nunito, Inter, Caveat } from 'next/font/google';
import { routing, Link } from '@/i18n/routing';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import LanguageGate from '@/components/LanguageGate';
import SiteFooter from '@/components/SiteFooter';
import ConsentBanner from '@/components/ConsentBanner';
import Analytics from '@/components/Analytics';
import DynamicBackground from '@/components/DynamicBackground';
import '../globals.css';

const nunito = Nunito({ subsets: ['latin'], variable: '--font-heading', display: 'swap' });
const inter = Inter({ subsets: ['latin'], variable: '--font-body', display: 'swap' });
const caveat = Caveat({ subsets: ['latin'], variable: '--font-accent', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL('https://mysgbaby.com'),
  title: 'MySGBaby — Singapore Pregnancy Guide',
  description: 'A calm, cited pregnancy guide for Singapore parents, from conception to delivery.',
  openGraph: {
    title: 'MySGBaby — Singapore Pregnancy Guide',
    description: 'A calm, cited pregnancy guide for Singapore parents, from conception to delivery.',
    url: 'https://mysgbaby.com',
    siteName: 'mysgbaby',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    locale: 'en_SG',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MySGBaby — Singapore Pregnancy Guide',
    description: 'A calm, cited pregnancy guide for Singapore parents.',
    images: ['/og-image.png'],
  },
};

// Schema.org structured data — helps search engines and AI systems understand the site.
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'MySGBaby',
  url: 'https://mysgbaby.com',
  description: "Singapore's calm, cited pregnancy guide, from conception to delivery.",
  inLanguage: ['en', 'zh', 'ms', 'ta'],
  publisher: {
    '@type': 'Organization',
    name: 'MySGBaby',
    logo: { '@type': 'ImageObject', url: 'https://mysgbaby.com/icon.png' },
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as any)) notFound();

  const messages = await getMessages();
  const t = await getTranslations({ locale, namespace: 'nav' });

  const navItems: Array<[string, string]> = [
    ['/', t('home')],
    ['/explore', t('guide')],
    ['/benefits', t('benefits')],
    ['/hospitals', t('hospitals')],
    ['/calculator', t('calculator')],
    ['/tools', t('tools')],
    ['/loss-support', t('lossSupport')],
  ];

  return (
    <html lang={locale} className={`${nunito.variable} ${inter.variable} ${caveat.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <DynamicBackground />
        <Analytics />
        <NextIntlClientProvider messages={messages}>
          <LanguageGate />
          <header className="sticky top-0 z-20 border-b border-primary/30 bg-surface/80 backdrop-blur">
            <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
              <Link href="/" className="flex items-center gap-2 font-heading text-2xl font-extrabold">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/illustrations/emblem.webp" alt="mysgbaby logo" width={40} height={40} className="h-10 w-10" />
                <span className="text-brand">mysgbaby</span>
              </Link>
              <nav className="hidden items-center gap-5 md:flex" aria-label="Primary">
                {navItems.map(([href, label]) => (
                  <Link key={href} href={href} className="text-sm hover:text-primary">
                    {label}
                  </Link>
                ))}
              </nav>
              <LanguageSwitcher />
            </div>
          </header>
          <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
          <ConsentBanner />
          <SiteFooter />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
