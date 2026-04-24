'use client';

import React, { useState, useEffect, useCallback } from 'react';

const reviews = [
  { id: 1, name: "Aditi", date: "Oct 28, 2025", review: "I wanted to share with someone trustworthy and fortunately got the answers I needed. Thank you for the guidance and advice. Can't thank you enough!" },
  { id: 2, name: "Ishwar Goswami", date: "Oct 25, 2025", review: "A very good experience with quick responses and clear guidance. Highly recommend." },
  { id: 3, name: "Saurav Thapa", date: "Sep 14, 2025", review: "Rahul sir provides skilled astrology with practical remedies. A wonderful experience; I highly suggest his consultation to everyone." },
  { id: 4, name: "Ansh", date: "Mar 16, 2025", review: "A wonderful session. Rahul-ji was patient, accurate, and took great care to explain everything clearly with considerate advice." },
  { id: 5, name: "Sanaa", date: "Jan 17, 2025", review: "Rahul Bali Ji is empathetic and understanding. He provided an honest reading while patiently addressing all my concerns." },
  { id: 6, name: "Luis", date: "Jan 26, 2025", review: "Wildly accurate. It felt like he lived my events. Very insightful and explained everything in depth." },
  { id: 7, name: "Gomathi", date: "Nov 11, 2024", review: "My first consultation, and I felt extremely comfortable. Grateful for the clarity and cleared doubts. Thank you!" },
];

const VoicesOfInsight = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [itemsPerView, setItemsPerView] = useState(1);

  // Responsive items per view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(1);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = reviews.length - itemsPerView;

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

  return (
    <section className="py-20 md:py-32 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-1 lg:sticky lg:top-24">
            <span className="text-[10px] font-medium tracking-[0.3em] uppercase text-accent mb-4 block font-label">Reviews</span>
            <h2 className="text-4xl md:text-5xl font-normal mb-6 font-headline text-on-surface tracking-tight">Voices of Insight</h2>
            <p className="text-secondary text-base mb-10 font-body leading-relaxed max-w-xs">
              Hear from those who have transformed their lives through celestial alignment and expert guidance.
            </p>
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-[11px] tracking-[0.15em] text-secondary uppercase font-label">4.9/5 RATING</span>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => { prevSlide(); setIsAutoPlaying(false); }}
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-outline/30 flex items-center justify-center text-on-surface"
                  aria-label="Previous review"
                >
                  <span className="material-symbols-outlined">chevron_left</span>
                </button>
                <button
                  onClick={() => { nextSlide(); setIsAutoPlaying(false); }}
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-outline/30 flex items-center justify-center text-on-surface"
                  aria-label="Next review"
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
                {reviews.map((item) => (
                  <div key={item.id} className={`${itemsPerView === 2 ? 'min-w-[50%]' : 'min-w-full'} px-2`}>
                    <div className="bg-surface p-6 md:p-8 rounded-[2.5rem] md:rounded-[3rem] border border-outline/50 h-full flex flex-col">
                      <p className="text-sm md:text-base text-on-surface mb-6 italic leading-relaxed font-body font-light">
                        &quot;{item.review}&quot;
                      </p>
                      <div className="flex items-center gap-4 mt-auto">
                        <div className="w-12 h-12 rounded-full bg-surface-container-low border border-outline/50 flex items-center justify-center text-accent font-semibold text-lg">
                          {item.name[0]}
                        </div>
                        <div>
                          <h5 className="font-medium text-[12px] tracking-[0.05em] uppercase font-label text-on-surface">{item.name}</h5>
                          <p className="text-[10px] text-secondary/60 uppercase tracking-[0.1em] font-label">{item.date}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center mt-8 gap-2">
              {Array.from({ length: reviews.length - itemsPerView + 1 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setCurrentIndex(i); setIsAutoPlaying(false); }}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === currentIndex ? 'bg-accent w-6' : 'bg-outline/30'}`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VoicesOfInsight;
