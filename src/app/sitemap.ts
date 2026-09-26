import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/blog'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://baliastrology.com'

  const blogPosts = getAllPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt || post.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const routes = [
    '',
    '/about',
    '/blog',
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
    '/privacy',
    '/terms',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  return [...routes, ...blogPosts]
}
