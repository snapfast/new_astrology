'use client';

import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import JsonLd from '@/components/JsonLd';
import { BlogPost } from '@/lib/blog';

interface BlogArticleClientPageProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
}

export default function BlogArticleClientPage({ post, relatedPosts }: BlogArticleClientPageProps) {
  const jsonLdData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Bali Astrology',
      url: 'https://baliastrology.com',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://baliastrology.com/blog/${post.slug}`,
    },
    keywords: post.tags.join(', '),
  };

  return (
    <div className="min-h-screen bg-surface text-on-surface pb-16">
      <JsonLd data={jsonLdData} />

      <PageHeader title={post.title} subtitle={post.excerpt} />

      <div className="max-w-4xl mx-auto px-4 md:px-8 mt-8">
        {/* Back Link & Article Meta Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-outline/20">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-accent hover:underline"
          >
            <span className="material-symbols-outlined !text-base">arrow_back</span>
            Back to All Articles
          </Link>

          <div className="flex flex-wrap items-center gap-3 text-xs text-on-surface/70">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined !text-base text-accent">person</span>
              {post.author}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined !text-base">calendar_today</span>
              {post.publishedAt}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined !text-base">schedule</span>
              {post.readTime}
            </span>
          </div>
        </div>

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-medium bg-surface-bright text-on-surface/80 px-3 py-1 rounded-full border border-outline/20"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Article Body Content */}
        <article className="bg-surface-bright rounded-2xl p-6 md:p-10 border border-outline/20 shadow-sm mb-12">
          <div
            className="prose max-w-none text-on-surface leading-relaxed font-body
              [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-on-surface [&_h2]:mt-8 [&_h2]:mb-4 [&_h2]:border-b [&_h2]:border-outline/10 [&_h2]:pb-2
              [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-on-surface [&_h3]:mt-6 [&_h3]:mb-3
              [&_p]:mb-4 [&_p]:text-on-surface/90 [&_p]:leading-7
              [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_ul]:space-y-1.5
              [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4 [&_ol]:space-y-1.5
              [&_li]:text-on-surface/90
              [&_strong]:font-semibold [&_strong]:text-on-surface
              [&_blockquote]:border-l-4 [&_blockquote]:border-accent [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:my-6 [&_blockquote]:text-on-surface/80
              [&_a]:text-accent [&_a]:underline hover:[&_a]:opacity-80
              [&_table]:w-full [&_table]:my-6 [&_table]:border-collapse
              [&_th]:bg-surface [&_th]:p-3 [&_th]:text-left [&_th]:font-semibold [&_th]:border [&_th]:border-outline/20
              [&_td]:p-3 [&_td]:border [&_td]:border-outline/20"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>

        {/* Author Bio Box */}
        <div className="bg-surface-bright rounded-2xl p-6 border border-outline/20 shadow-sm mb-12 flex flex-col sm:flex-row items-center sm:items-start gap-4">
          <div className="w-16 h-16 rounded-full bg-surface-container-high border border-outline/30 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-accent !text-3xl">psychology</span>
          </div>
          <div>
            <h3 className="text-base font-bold text-on-surface mb-1 text-center sm:text-left">
              About {post.author}
            </h3>
            <p className="text-xs text-on-surface/70 leading-relaxed text-center sm:text-left">
              Practicing Vedic Astrologer trained in classical Brahmin wisdom, offering authentic insights, chart rectifications, and astrological guidance.
            </p>
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div>
            <h3 className="text-xl font-bold text-on-surface mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-accent">auto_awesome</span>
              Related Articles
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedPosts.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/blog/${rel.slug}`}
                  className="bg-surface-bright rounded-xl p-5 border border-outline/20 hover:shadow-md transition-all group block"
                >
                  <h4 className="font-bold text-on-surface group-hover:text-accent transition-colors line-clamp-2 mb-2 text-sm">
                    {rel.title}
                  </h4>
                  <p className="text-xs text-on-surface/60 line-clamp-2 mb-4 leading-relaxed">
                    {rel.excerpt}
                  </p>
                  <span className="text-xs font-medium text-accent flex items-center gap-1">
                    Read article
                    <span className="material-symbols-outlined !text-sm group-hover:translate-x-1 transition-transform">
                      arrow_forward
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
