'use client';

import { useEffect } from 'react';
import Script from 'next/script';
import { SOCIAL_POSTS, SOCIAL_PROFILES } from '@/lib/social-data';
import { sendGAEvent } from '@next/third-parties/google';

const SocialGallery = () => {
  // Logic to refresh embeds when they are injected or when route changes
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const win = window as any;
    const processEmbeds = () => {
      if (win.instgrm) {
        win.instgrm.Embeds.process();
      }
      if (win.FB) {
        win.FB.XFBML.parse();
      }
    };

    // Process immediately
    processEmbeds();

    // Process again after a short delay to ensure scripts are fully loaded
    const timeoutId = setTimeout(processEmbeds, 1000);
    return () => clearTimeout(timeoutId);
  }, []);

  const handleProfileClick = (platform: string) => {
    sendGAEvent({
      event: 'action_click',
      action_name: `social_profile_click_${platform}`
    });
  };

  return (
    <section className="py-24 bg-background border-t border-outline/10">
      {/* Social Embed Scripts */}
      <Script
        src="https://www.instagram.com/embed.js"
        strategy="afterInteractive"
        onLoad={() => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const win = window as any;
          if (win.instgrm) win.instgrm.Embeds.process();
        }}
      />
      <Script
        src="https://www.threads.net/embed.js"
        strategy="afterInteractive"
      />
      <Script
        src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v19.0"
        strategy="afterInteractive"
        onLoad={() => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const win = window as any;
          if (win.FB) win.FB.XFBML.parse();
        }}
      />

      <div className="max-w-[1440px] mx-auto px-6 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <span className="text-[10px] font-medium tracking-[0.3em] uppercase text-accent mb-4 block font-label">
              Social Insights
            </span>
            <h2 className="text-4xl md:text-5xl font-normal font-headline text-on-surface tracking-tight leading-tight">
              Latest Findings & <br className="hidden md:block" /> Celestial Wisdom
            </h2>
          </div>
          <div className="flex gap-4">
            <a
              href={SOCIAL_PROFILES.threads}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleProfileClick('threads')}
              aria-label="Follow on Threads"
              className="w-12 h-12 rounded-full border border-outline/30 flex items-center justify-center hover:bg-accent hover:text-white transition-all duration-300"
            >
              <i className="fa-brands fa-threads text-xl"></i>
            </a>
            <a
              href={SOCIAL_PROFILES.instagram}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleProfileClick('instagram')}
              aria-label="Follow on Instagram"
              className="w-12 h-12 rounded-full border border-outline/30 flex items-center justify-center hover:bg-accent hover:text-white transition-all duration-300"
            >
              <i className="fa-brands fa-instagram text-xl"></i>
            </a>
            <a
              href={SOCIAL_PROFILES.facebook}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleProfileClick('facebook')}
              aria-label="Follow on Facebook"
              className="w-12 h-12 rounded-full border border-outline/30 flex items-center justify-center hover:bg-accent hover:text-white transition-all duration-300"
            >
              <i className="fa-brands fa-facebook-f text-lg"></i>
            </a>
          </div>
        </div>

        {/* Simplified Grid Gallery (Embeds) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {SOCIAL_POSTS.map((post) => (
            <div key={post.id} className="w-full flex justify-center">
              <div className="w-full max-w-sm bg-white rounded-2xl overflow-hidden shadow-sm border border-outline/10 p-1">
                {post.platform === 'instagram' && (
                  <blockquote
                    className="instagram-media"
                    data-instgrm-captioned
                    data-instgrm-permalink={post.url}
                    data-instgrm-version="14"
                    style={{ width: '100%', margin: '0 auto' }}
                  >
                  </blockquote>
                )}

                {post.platform === 'threads' && (
                  <blockquote
                    className="threads-embed"
                    data-threads-show-caption="true"
                    data-threads-post-url={post.url}
                    style={{ width: '100%', margin: '0 auto' }}
                  >
                  </blockquote>
                )}

                {post.platform === 'facebook' && (
                  <div
                    className="fb-post"
                    data-href={post.url}
                    data-show-text="true"
                    data-width="auto"
                    style={{ width: '100%', margin: '0 auto' }}
                  >
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-secondary text-sm font-body mb-6 italic">Stay connected for daily astrological updates.</p>
          <div className="flex flex-wrap justify-center gap-8">
            <a href={SOCIAL_PROFILES.threads} target="_blank" rel="noopener noreferrer" className="text-on-surface text-[10px] font-semibold tracking-widest uppercase border-b border-accent/30 pb-1 hover:text-accent transition-colors">Threads</a>
            <a href={SOCIAL_PROFILES.instagram} target="_blank" rel="noopener noreferrer" className="text-on-surface text-[10px] font-semibold tracking-widest uppercase border-b border-accent/30 pb-1 hover:text-accent transition-colors">Instagram</a>
            <a href={SOCIAL_PROFILES.facebook} target="_blank" rel="noopener noreferrer" className="text-on-surface text-[10px] font-semibold tracking-widest uppercase border-b border-accent/30 pb-1 hover:text-accent transition-colors">Facebook</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialGallery;
