import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/private/', '/api/', '/horoscope/compact', '/donate'],
    },
    sitemap: 'https://baliastrology.com/sitemap.xml',
  }
}
