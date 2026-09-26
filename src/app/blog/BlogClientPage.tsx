'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import { BlogPost } from '@/lib/blog';

interface BlogClientPageProps {
  initialPosts: BlogPost[];
  allTags: string[];
}

export default function BlogClientPage({ initialPosts, allTags }: BlogClientPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filteredPosts = useMemo(() => {
    return initialPosts.filter((post) => {
      const matchesSearch =
        searchQuery.trim() === '' ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesTag = selectedTag === null || post.tags.includes(selectedTag);

      return matchesSearch && matchesTag;
    });
  }, [initialPosts, searchQuery, selectedTag]);

  return (
    <div className="min-h-screen bg-surface text-on-surface pb-16">
      <PageHeader
        title="Vedic Astrology Blog"
        subtitle="Insights, planetary transits, Panchang wisdom, and spiritual guidance by Pandit Rahul Bali Ji"
      />

      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-8">
        {/* Search & Tag Filter Controls */}
        <div className="bg-surface-bright rounded-2xl p-6 border border-outline/20 shadow-sm mb-10 flex flex-col gap-6">
          <div className="relative w-full">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface/50 !text-xl pointer-events-none">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles by topic, keyword, or tag..."
              className="w-full pl-12 pr-10 py-3 rounded-xl bg-surface border border-outline/30 text-on-surface placeholder-on-surface/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface/50 hover:text-on-surface p-1 rounded-full"
                aria-label="Clear search"
              >
                <span className="material-symbols-outlined !text-lg">close</span>
              </button>
            )}
          </div>

          {/* Tags */}
          {allTags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-outline/10">
              <span className="text-xs font-semibold uppercase tracking-wider text-on-surface/60 mr-2">
                Filter by Tag:
              </span>
              <button
                onClick={() => setSelectedTag(null)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  selectedTag === null
                    ? 'bg-primary text-white shadow-xs'
                    : 'bg-surface text-on-surface/80 hover:bg-surface-container-high border border-outline/20'
                }`}
              >
                All Articles
              </button>
              {allTags.map((tag) => {
                const isSelected = selectedTag === tag;
                return (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(isSelected ? null : tag)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                      isSelected
                        ? 'bg-primary text-white shadow-xs'
                        : 'bg-surface text-on-surface/80 hover:bg-surface-container-high border border-outline/20'
                    }`}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Results Counter */}
        {(searchQuery || selectedTag) && (
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-on-surface/70">
              Found <span className="font-semibold text-on-surface">{filteredPosts.length}</span> article
              {filteredPosts.length === 1 ? '' : 's'}
              {selectedTag && (
                <>
                  {' '}
                  tagged with <span className="font-semibold text-accent">&quot;{selectedTag}&quot;</span>
                </>
              )}
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedTag(null);
              }}
              className="text-xs font-medium text-accent hover:underline flex items-center gap-1"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Articles Grid */}
        {filteredPosts.length === 0 ? (
          <div className="bg-surface-bright rounded-2xl p-12 text-center border border-outline/20">
            <span className="material-symbols-outlined text-on-surface/30 !text-5xl mb-3">
              search_off
            </span>
            <h3 className="text-lg font-bold text-on-surface mb-2">No Articles Found</h3>
            <p className="text-sm text-on-surface/60 max-w-md mx-auto mb-6">
              We couldn&apos;t find any articles matching your query. Try searching with different keywords or clear your active filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedTag(null);
              }}
              className="bg-primary text-white px-6 py-2.5 rounded-full text-xs font-medium uppercase tracking-wider hover:opacity-90 transition-opacity"
            >
              Clear Search
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article
                key={post.slug}
                className="bg-surface-bright border border-outline/20 rounded-2xl overflow-hidden hover:shadow-md transition-all duration-200 flex flex-col group"
              >
                <div className="p-6 flex flex-col flex-1">
                  {/* Tags */}
                  {post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] font-medium bg-surface text-on-surface/70 px-2.5 py-0.5 rounded-md border border-outline/10"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Title */}
                  <h2 className="text-xl font-bold text-on-surface mb-3 group-hover:text-accent transition-colors line-clamp-2">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>

                  {/* Excerpt */}
                  <p className="text-sm text-on-surface/70 mb-6 line-clamp-3 leading-relaxed flex-1">
                    {post.excerpt}
                  </p>

                  {/* Post Footer Metadata */}
                  <div className="pt-4 border-t border-outline/10 flex items-center justify-between text-xs text-on-surface/60 mt-auto">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined !text-base text-accent">person</span>
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span>{post.publishedAt}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </div>

                <Link
                  href={`/blog/${post.slug}`}
                  className="bg-surface hover:bg-surface-container-high px-6 py-3 border-t border-outline/10 text-xs font-medium text-accent flex items-center justify-between transition-colors"
                >
                  <span>Read Article</span>
                  <span className="material-symbols-outlined !text-base group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
