'use client';

import Link from 'next/link';
import { BlogPost } from '@/lib/blog';

interface BlogArticleClientPageProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
}

export default function BlogArticleClientPage({ post, relatedPosts }: BlogArticleClientPageProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-surface pt-20 pb-16 font-body">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-on-surface/70 hover:text-accent transition-colors"
          >
            <span className="material-symbols-outlined text-base">arrow_back</span>
            <span>Back to Articles</span>
          </Link>
        </div>

        {/* Article Header */}
        <header className="mb-10 pb-8 border-b border-outline/20">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-medium px-3 py-1 rounded-full bg-surface-container-high text-on-surface/80"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-2xl md:text-4xl font-bold text-on-surface mb-4 leading-tight">
            {post.title}
          </h1>

          {/* Excerpt */}
          <p className="text-base md:text-lg text-on-surface/75 leading-relaxed mb-6 font-normal">
            {post.excerpt}
          </p>

          {/* Metadata */}
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs md:text-sm text-on-surface/70">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-surface-container-highest flex items-center justify-center font-bold text-accent">
                {post.author.name.charAt(0)}
              </div>
              <div>
                <div className="font-semibold text-on-surface">{post.author.name}</div>
                <div className="text-[11px] text-on-surface/60">{post.author.role}</div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs text-on-surface/60">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm">calendar_today</span>
                <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm">schedule</span>
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Article Body */}
        <article className="prose prose-slate max-w-none text-on-surface space-y-8 leading-relaxed">
          {post.sections.map((section, idx) => (
            <div key={idx} className="space-y-4">
              {section.heading && (
                <h2 className="text-xl md:text-2xl font-bold text-on-surface mt-8 mb-4">
                  {section.heading}
                </h2>
              )}

              {section.paragraphs.map((para, pIdx) => (
                <p key={pIdx} className="text-on-surface/85 text-base md:text-lg leading-relaxed">
                  {para}
                </p>
              ))}

              {section.bulletPoints && section.bulletPoints.length > 0 && (
                <ul className="list-disc pl-6 space-y-2 text-on-surface/85 text-base md:text-lg my-4">
                  {section.bulletPoints.map((bp, bpIdx) => (
                    <li key={bpIdx}>{bp}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </article>

        {/* Consultation CTA Banner */}
        <div className="mt-12 p-6 md:p-8 rounded-2xl bg-surface-container-lowest border border-outline/20 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-lg md:text-xl font-bold text-on-surface mb-2">
              Ready for Personal Guidance?
            </h3>
            <p className="text-sm text-on-surface/75">
              Get detailed birth chart insights tailored to your career, relationship, and timing questions.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/book-astrology-reading-online"
              className="bg-primary text-white px-5 py-2.5 rounded-full font-medium text-xs tracking-wider uppercase shadow-sm hover:opacity-95 transition-opacity"
            >
              Book Reading
            </Link>
            <Link
              href="/free-horoscope"
              className="bg-surface-container-high text-on-surface px-5 py-2.5 rounded-full font-medium text-xs tracking-wider uppercase hover:bg-surface-container-highest transition-colors"
            >
              Free Kundli
            </Link>
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-16 pt-12 border-t border-outline/20">
            <h2 className="text-xl font-bold text-on-surface mb-6">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((related) => (
                <div
                  key={related.slug}
                  className="bg-surface-container-lowest rounded-xl p-5 border border-outline/15 flex flex-col justify-between hover:border-outline/30 transition-all"
                >
                  <div>
                    <div className="text-[11px] text-on-surface/60 mb-2">
                      {formatDate(related.publishedAt)}
                    </div>
                    <h3 className="text-base font-bold text-on-surface hover:text-accent transition-colors mb-2 line-clamp-2">
                      <Link href={`/blog/${related.slug}`}>{related.title}</Link>
                    </h3>
                    <p className="text-xs text-on-surface/70 line-clamp-3 mb-4">
                      {related.excerpt}
                    </p>
                  </div>
                  <Link
                    href={`/blog/${related.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-accent"
                  >
                    <span>Read Article</span>
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
