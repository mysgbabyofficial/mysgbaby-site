import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

type Dict = Record<string, any>;

// Deep-merge locale messages over English so every key always resolves:
// translated strings win, and anything not yet translated falls back to English
// (with correct ICU interpolation) instead of throwing a missing-message error.
function deepMerge(base: Dict, override: Dict): Dict {
  const out: Dict = { ...base };
  for (const k of Object.keys(override || {})) {
    const b = out[k];
    const o = override[k];
    out[k] =
      b && o && typeof b === 'object' && typeof o === 'object' && !Array.isArray(b) && !Array.isArray(o)
        ? deepMerge(b, o)
        : o;
  }
  return out;
}

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  const en = (await import('../messages/en.json')).default as Dict;
  const messages =
    locale === 'en' ? en : deepMerge(en, (await import(`../messages/${locale}.json`)).default as Dict);

  return {
    locale,
    messages,
    // Belt-and-braces: even if a key is somehow missing, degrade gracefully
    // rather than crash the page.
    onError(error) {
      if ((error as any)?.code === 'MISSING_MESSAGE') return;
      console.error(error);
    },
    getMessageFallback({ key }) {
      return String(key).split('.').pop() || String(key);
    },
  };
});
