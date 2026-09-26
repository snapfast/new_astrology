'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import { BlogPost } from '@/lib/blog';

interface BlogClientPageProps {
  posts: BlogPost[];
}

export default function BlogClientPage({ posts }: BlogClientPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Extract all unique tags
  const allTags = useMemo(() => {
    const tagsSet = new Set<string>();
    posts.forEach((post) => {
      post.tags.forEach((tag) => tagsSet.add(tag));
    });
    return Array.from(tagsSet).sort();
  }, [posts]);

  // Filter posts based on search query and selected tag
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch =
        searchQuery.trim() === '' ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesTag = !selectedTag || post.tags.includes(selectedTag);

      return matchesSearch && matchesTag;
    });
  }, [posts, searchQuery, selectedTag]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-surface pt-20 pb-16 font-body">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <PageHeader
          title="Astrology Blog & Articles"
          description="In-depth articles, Vedic astrology guides, planetary transits, and wisdom from Pandit Rahul Bali"
        />

        {/* Search & Tag Filter Bar */}
        <div className="mt-8 mb-12 flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface/50 text-xl pointer-events-none">
              search
            </span>
            <input
              type="text"
              placeholder="Search articles or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-full border border-outline/30 bg-surface-container-lowest text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface/50 hover:text-on-surface text-sm"
                aria-label="Clear search"
              >
                <span className="material-symbols-outlined text-base">close</span>
              </button>
            )}
          </div>

          {/* Tags Pills */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <button
              onClick={() => setSelectedTag(null)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                selectedTag === null
                  ? 'bg-on-surface text-surface'
                  : 'bg-surface-container-high text-on-surface hover:bg-surface-container-highest'
              }`}
            >
              All Articles
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                  selectedTag === tag
                    ? 'bg-on-surface text-surface'
                    : 'bg-surface-container-high text-on-surface hover:bg-surface-container-highest'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Articles Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {filteredPosts.map((post) => (
              <article
                key={post.slug}
                className="bg-surface-container-lowest rounded-2xl p-6 md:p-8 border border-outline/20 flex flex-col justify-between hover:border-outline/40 hover:shadow-md transition-all group"
              >
                <div>
                  {/* Meta Info */}
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-on-surface/60 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-sm">calendar_today</span>
                      <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                    </div>
                    <div className="flex items-center gap-1.5 bg-surface-container-high px-2.5 py-1 rounded-full text-[11px] font-medium text-on-surface/80">
                      <span className="material-symbols-outlined text-xs">schedule</span>
                      {post.readTime}
                    </div>
                  </div>

                  {/* Title */}
                  <h2 className="text-xl md:text-2xl font-bold text-on-surface group-hover:text-accent transition-colors mb-3 leading-snug">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h2>

                  {/* Excerpt */}
                  <p className="text-on-surface/75 text-sm md:text-base leading-relaxed mb-6">
                    {post.excerpt}
                  </p>
                </div>

                <div>
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-medium px-2.5 py-0.5 rounded-md bg-surface-container text-on-surface/70"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Footer & Read Link */}
                  <div className="flex items-center justify-between pt-4 border-t border-outline/10">
                    <div className="text-xs font-medium text-on-surface/80">
                      By {post.author.name}
                    </div>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-accent group-hover:translate-x-1 transition-transform"
                    >
                      <span>Read Article</span>
                      <span className="material-symbols-outlined text-base">arrow_forward</span>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-surface-container-lowest rounded-2xl border border-outline/20">
            <span className="material-symbols-outlined text-4xl text-on-surface/40 mb-2">
              find_in_page
            </span>
            <h3 className="text-lg font-semibold text-on-surface mb-1">No articles found</h3>
            <p className="text-sm text-on-surface/60 mb-4">
              Try adjusting your search terms or clearing the selected tag.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedTag(null);
              }}
              className="px-4 py-2 rounded-full text-xs font-medium bg-on-surface text-surface hover:opacity-90 transition-opacity"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
