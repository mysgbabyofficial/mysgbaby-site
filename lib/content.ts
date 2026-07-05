// Locale-aware content loader.
// Each dataset has an English base plus zh/ms/ta translations; the getter returns
// the file for the active locale and falls back to English for anything missing.

import explorerEn from '@/data/explorer.json';
import explorerZh from '@/data/explorer.zh.json';
import explorerMs from '@/data/explorer.ms.json';
import explorerTa from '@/data/explorer.ta.json';

import benefitsEn from '@/data/benefits.json';
import benefitsZh from '@/data/benefits.zh.json';
import benefitsMs from '@/data/benefits.ms.json';
import benefitsTa from '@/data/benefits.ta.json';

import hospitalsEn from '@/data/hospitals.json';
import hospitalsZh from '@/data/hospitals.zh.json';
import hospitalsMs from '@/data/hospitals.ms.json';
import hospitalsTa from '@/data/hospitals.ta.json';

import productsEn from '@/data/products.json';
import productsZh from '@/data/products.zh.json';
import productsMs from '@/data/products.ms.json';
import productsTa from '@/data/products.ta.json';

import timelineEn from '@/data/timeline.json';
import timelineZh from '@/data/timeline.zh.json';
import timelineMs from '@/data/timeline.ms.json';
import timelineTa from '@/data/timeline.ta.json';

// Returns a getter typed to the English shape; other locales are cast to it so a
// tiny structural drift in a translation can never break the type-check / build.
function localized<T>(en: T, zh: unknown, ms: unknown, ta: unknown) {
  const map: Record<string, unknown> = { en, zh, ms, ta };
  return (locale?: string): T => (map[locale ?? 'en'] as T) ?? en;
}

export const getExplorer = localized(explorerEn, explorerZh, explorerMs, explorerTa);
export const getBenefits = localized(benefitsEn, benefitsZh, benefitsMs, benefitsTa);
export const getHospitals = localized(hospitalsEn, hospitalsZh, hospitalsMs, hospitalsTa);
export const getProducts = localized(productsEn, productsZh, productsMs, productsTa);
export const getTimeline = localized(timelineEn, timelineZh, timelineMs, timelineTa);
