'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { REVIEWS } from '@/lib/reviews';
import { useLanguage } from '@/context/LanguageContext';
import StarRating from './StarRating';

const TRANSLATIONS = {
  en: {
    subtitle: "Reviews",
    title: "Testimonials",
    desc: "Hear from those who have transformed their lives through celestial alignment and expert guidance.",
    rating: "5/5 RATING",
    prev: "Previous review",
    next: "Next review",
    goToSlide: "Go to slide"
  },
  hi: {
    subtitle: "समीक्षाएं",
    title: "प्रशंसापत्र",
    desc: "उन लोगों से सुनें जिन्होंने खगोलीय संरेखण और विशेषज्ञ मार्गदर्शन के माध्यम से अपने जीवन को बदल दिया है।",
    rating: "5/5 रेटिंग",
    prev: "पिछली समीक्षा",
    next: "अगली समीक्षा",
    goToSlide: "स्लाइड पर जाएं"
  }
};

const Testimonials = () => {
  const { lang } = useLanguage();
  const t = TRANSLATIONS[lang];
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
            <h2 className="text-4xl md:text-5xl font-normal mb-6 font-headline text-on-surface tracking-tight">{t.title}</h2>
            <p className="text-on-surface text-base mb-10 font-body leading-relaxed max-w-xs">
              {t.desc}
            </p>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-1.5">
                <span className="font-semibold text-[11px] tracking-[0.15em] text-on-surface uppercase font-label">5.0 GOOGLE RATING</span>
                <StarRating starClassName="text-base" />
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => { prevSlide(); setIsAutoPlaying(false); }}
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-outline/30 flex items-center justify-center text-on-surface"
                  aria-label={t.prev}
                >
                  <span className="material-symbols-outlined">chevron_left</span>
                </button>
                <button
                  onClick={() => { nextSlide(); setIsAutoPlaying(false); }}
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-outline/30 flex items-center justify-center text-on-surface"
                  aria-label={t.next}
                >
                  <span className="material-symbols-outlined">chevron_right</span>
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
                        <div className="w-12 h-12 rounded-full bg-surface-container-low border border-outline/50 flex items-center justify-center text-accent font-semibold text-lg">
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
                  className={`w-1.5 h-1.5 rounded-full ${i === currentIndex ? 'bg-accent w-6' : 'bg-outline/30'}`}
                  aria-label={`${t.goToSlide} ${i + 1}`}
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
