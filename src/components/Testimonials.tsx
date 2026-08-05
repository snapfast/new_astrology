'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { REVIEWS } from '@/lib/reviews';
import { useLanguage } from '@/context/LanguageContext';
import StarRating from './StarRating';

const TRANSLATIONS = {
  en: {
    subtitle: "Reviews",
    title: "Testimonials",
    rating: "5/5 RATING",
    viewOnGoogle: "View on Google",
    prev: "Previous review",
    next: "Next review",
    goToSlide: "Go to slide"
  }};

const GoogleIcon = () => (
  <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1 .67-2.26 1.07-3.71 1.07-2.87 0-5.3-1.94-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.11c-.22-.67-.35-1.39-.35-2.11s.13-1.44.35-2.11V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.83z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.83c.86-2.59 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
  </svg>
);

const Testimonials = () => {
  const { lang } = useLanguage();
  const t = TRANSLATIONS.en;
  // Use a curated subset of reviews for the home page testimonials
  const featuredReviews = useMemo(() => {
    const featuredIds = [1, 2, 3, 4, 10, 8, 14]; // Aditi, Ishwar Goswami, Saurav Thapa, Ansh, Sanaa, Luis, Gomathi
    return REVIEWS.filter(r => featuredIds.includes(r.id));
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [itemsPerView, setItemsPerView] = useState(1);

  // Responsive items per view - Streamlined resize logic for better maintainability
  useEffect(() => {
    const handleResize = () => {
      setItemsPerView(window.innerWidth >= 1024 ? 2 : 1);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = featuredReviews.length - itemsPerView;

  // Ensure currentIndex is valid when itemsPerView changes
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(Math.max(0, maxIndex));
    }
  }, [itemsPerView, currentIndex, maxIndex]);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => {
        if (prevIndex >= maxIndex) return 0;
        return prevIndex + 1;
    });
  }, [maxIndex]);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => {
        if (prevIndex <= 0) return maxIndex;
        return prevIndex - 1;
    });
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  const paginationDots = useMemo(() =>
    Array.from({ length: featuredReviews.length - itemsPerView + 1 }),
    [featuredReviews.length, itemsPerView]
  );

  return (
    <section className="py-12 md:py-20 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-1 lg:sticky lg:top-24">
            <span className={`text-[10px] font-medium uppercase text-accent mb-4 block font-label ${lang === 'en' ? 'tracking-[0.3em]' : ''}`}>{t.subtitle}</span>
            <h2 className="text-4xl md:text-5xl font-normal mb-8 font-headline text-on-surface tracking-tight">{t.title}</h2>

            <div className="flex flex-col gap-8">
              <a
                href="https://maps.app.goo.gl/siGBPsmRpAU6mbYJ7"
                target="_blank"
                rel="noopener noreferrer"
                className={`btn-secondary inline-flex items-center justify-center gap-2.5 px-6 py-3.5 font-medium text-[10px] uppercase font-label self-start ${lang === 'en' ? 'tracking-[0.1em]' : ''}`}
              >
                <GoogleIcon />
                {t.viewOnGoogle}
                <span className="material-symbols-outlined text-sm" aria-hidden="true">open_in_new</span>
              </a>

              <div className="flex flex-col gap-1.5">
                <span className="font-semibold text-[11px] tracking-[0.15em] text-on-surface uppercase font-label">5.0 GOOGLE RATING</span>
                <StarRating starClassName="text-base" />
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => { prevSlide(); setIsAutoPlaying(false); }}
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-outline/30 flex items-center justify-center text-on-surface hover:bg-on-surface/5 active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                  aria-label={t.prev}
                >
                  <span className="material-symbols-outlined" aria-hidden="true">chevron_left</span>
                </button>
                <button
                  onClick={() => { nextSlide(); setIsAutoPlaying(false); }}
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-outline/30 flex items-center justify-center text-on-surface hover:bg-on-surface/5 active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                  aria-label={t.next}
                >
                  <span className="material-symbols-outlined" aria-hidden="true">chevron_right</span>
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 relative">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
              >
                {featuredReviews.map((item) => (
                  <div key={item.id} className={`${itemsPerView === 2 ? 'min-w-[50%]' : 'min-w-full'} px-2`}>
                    <div className="bg-surface p-6 md:p-8 rounded-[2.5rem] md:rounded-[3rem] border border-outline h-full flex flex-col">
                      <StarRating className="mb-4" starClassName="text-sm md:text-base" />
                      <p className="text-sm md:text-base text-on-surface mb-6 leading-relaxed font-body font-normal">
                        &quot;{item.review}&quot;
                      </p>
                      <div className="flex items-center gap-4 mt-auto">
                        <div className="w-12 h-12 rounded-full bg-white border border-outline/50 flex items-center justify-center text-accent font-semibold text-lg">
                          {item.name[0]}
                        </div>
                        <div>
                          <h5 className="font-medium text-[12px] tracking-[0.05em] uppercase font-label text-on-surface">{item.name}</h5>
                          <p className="text-[10px] text-on-surface uppercase tracking-[0.1em] font-label">{item.date}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center mt-8 gap-2">
              {paginationDots.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setCurrentIndex(i); setIsAutoPlaying(false); }}
                  className={`h-1.5 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${i === currentIndex ? 'bg-accent w-6' : 'bg-outline/30 w-1.5 hover:bg-outline/50'}`}
                  aria-label={`${t.goToSlide} ${i + 1}`}
                  aria-current={i === currentIndex ? "true" : undefined}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
