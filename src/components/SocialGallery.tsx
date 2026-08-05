'use client';

import { useEffect } from 'react';
import Script from 'next/script';
import { SOCIAL_POSTS, SOCIAL_PROFILES } from '@/lib/social-data';
import { sendGAEvent } from '@next/third-parties/google';
import { useLanguage } from '@/context/LanguageContext';

const TRANSLATIONS = {
  en: {
    subtitle: "Social Insights",
    title: <>Latest Findings & <br className="hidden md:block" /> Celestial Wisdom</>,
    stayConnected: "Stay connected for daily astrological updates."
  }};

const SocialGallery = () => {
  const { lang } = useLanguage();
  const t = TRANSLATIONS.en;
  // Logic to refresh embeds when they are injected or when route changes
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const win = window as any;

    let attempts = 0;
    const maxAttempts = 10; // Try for up to 5 seconds

    const processEmbeds = () => {
      let allProcessed = true;

      if (win.instgrm) {
        win.instgrm.Embeds.process();
      } else {
        allProcessed = false;
      }

      if (win.FB) {
        win.FB.XFBML.parse();
      } else {
        allProcessed = false;
      }

      return allProcessed;
    };

    // Process immediately
    if (!processEmbeds()) {
      // If not all scripts are loaded, poll until they are or we hit max attempts
      const intervalId = setInterval(() => {
        attempts++;
        if (processEmbeds() || attempts >= maxAttempts) {
          clearInterval(intervalId);
        }
      }, 500);

      return () => clearInterval(intervalId);
    }
  }, []);

  const handleProfileClick = (platform: string) => {
    sendGAEvent({
      event: 'action_click',
      action_name: `social_profile_click_${platform}`
    });
  };

  return (
    <section className="py-16 bg-background border-t border-outline/10">
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
            <span className={`text-[10px] font-medium uppercase text-accent mb-4 block font-label ${lang === 'en' ? 'tracking-[0.3em]' : ''}`}>
              {t.subtitle}
            </span>
            <h2 className="text-4xl md:text-5xl font-normal font-headline text-on-surface tracking-tight leading-tight">
              {t.title}
            </h2>
          </div>
          <div className="flex gap-4">
            <a
              href={SOCIAL_PROFILES.threads}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleProfileClick('threads')}
              aria-label="Follow on Threads"
              className="w-12 h-12 rounded-full border border-outline/30 flex items-center justify-center hover:bg-accent hover:text-white transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 active:scale-95"
            >
              <i className="fa-brands fa-threads text-xl"></i>
            </a>
            <a
              href={SOCIAL_PROFILES.instagram}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleProfileClick('instagram')}
              aria-label="Follow on Instagram"
              className="w-12 h-12 rounded-full border border-outline/30 flex items-center justify-center hover:bg-accent hover:text-white transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 active:scale-95"
            >
              <i className="fa-brands fa-instagram text-xl"></i>
            </a>
            <a
              href={SOCIAL_PROFILES.facebook}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleProfileClick('facebook')}
              aria-label="Follow on Facebook"
              className="w-12 h-12 rounded-full border border-outline/30 flex items-center justify-center hover:bg-accent hover:text-white transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 active:scale-95"
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

        <div className="mt-12 text-center">
          <p className="text-on-surface text-sm font-body mb-6">{t.stayConnected}</p>
          <div className="flex flex-wrap justify-center gap-8">
            <a href={SOCIAL_PROFILES.threads} target="_blank" rel="noopener noreferrer" className="text-on-surface text-[10px] font-semibold tracking-widest uppercase border-b border-accent/30 pb-1 hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4">Threads</a>
            <a href={SOCIAL_PROFILES.instagram} target="_blank" rel="noopener noreferrer" className="text-on-surface text-[10px] font-semibold tracking-widest uppercase border-b border-accent/30 pb-1 hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4">Instagram</a>
            <a href={SOCIAL_PROFILES.facebook} target="_blank" rel="noopener noreferrer" className="text-on-surface text-[10px] font-semibold tracking-widest uppercase border-b border-accent/30 pb-1 hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4">Facebook</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialGallery;
