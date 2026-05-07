import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://astro.rahulbali.in'

  const routes = [
    '',
    '/about',
    '/services',
    '/contact',
    '/reviews',
    '/donate',
    '/horoscope',
    '/free-horoscope',
    '/consultation',
    '/premium',
    '/research',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  return routes
}
