import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://rahulbaliastrology.com'

  const routes = [
    '',
    '/about',
    '/services',
    '/contact',
    '/insights',
    '/reviews',
    '/donate',
    '/horoscope',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  return routes
}
