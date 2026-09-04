import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://astro.rahulbali.in'

  const routes = [
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
    '/panch-pakshi',
    '/btr',
    '/faq',
    '/legal',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  return routes
}
