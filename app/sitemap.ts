import type { MetadataRoute } from 'next';

const base = 'https://mysgbaby.com';
const routes = [
  '',
  '/onboarding',
  '/explore',
  '/benefits',
  '/hospitals',
  '/calculator',
  '/tools',
  '/community',
  '/loss-support',
  '/privacy',
  '/terms',
  '/disclaimer',
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((path) => ({
    url: `${base}${path}`,
    changeFrequency: 'weekly',
    priority: path === '' ? 1 : 0.7,
  }));
}
