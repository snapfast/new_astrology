import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://baliastrology.com';

  const staticRoutes = [
    '',
    '/about',
    '/reviews',
    '/horoscope',
    '/kp-horary',
    '/free-horoscope',
    '/panchang',
    '/hora',
    '/transits',
    '/transits-table',
    '/biorhythm',
    '/numerology',
    '/panch-pakshi',
    '/btr',
    '/faq',
    '/privacy',
    '/terms',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  return staticRoutes;
}
