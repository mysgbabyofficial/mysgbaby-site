'use client';

import { usePathname, useRouter, routing } from '@/i18n/routing';
import { useLocale } from 'next-intl';

const LABELS: Record<string, string> = {
  en: 'EN',
  zh: '简体中文',
  ms: 'Bahasa Melayu',
  ta: 'தமிழ்',
};

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <label className="text-sm">
      <span className="sr-only">Language</span>
      <select
        value={locale}
        onChange={(e) => router.replace(pathname, { locale: e.target.value })}
        className="rounded-lg border border-primary/40 bg-surface px-2 py-1"
      >
        {routing.locales.map((l) => (
          <option key={l} value={l}>
            {LABELS[l] ?? l}
          </option>
        ))}
      </select>
    </label>
  );
}
