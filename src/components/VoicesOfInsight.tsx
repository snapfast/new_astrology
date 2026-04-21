'use client';

import React, { useState, useEffect, useCallback } from 'react';

const reviews = [
  { id: 1, name: "Aditi", date: "Oct 28, 2025", review: "There were so many things going on in life. I wanted to share with someone trustworthy fortunately I got answers today, I hope this person helps others too... thank youuu so much for answering about everything and advising me. Can't thank you enough!!!" },
  { id: 2, name: "Ishwar Goswami", date: "Oct 25, 2025", review: "Panditji provided a very good experience. The response was quick, the guidance was clear, and everything went smoothly. Highly recommend." },
  { id: 3, name: "Saurav Thapa", date: "Sep 14, 2025", review: "The consultation is really nice. Rahul sir provides astrology+practical life remedies for the client. He is really skilled in astrology and he is a really good person too. I would suggest everyone to take his consultation." },
  { id: 4, name: "Ansh", date: "Mar 16, 2025", review: "It was a wonderful session. Rahul-ji took immense care to make me understand what I was going through. Rahul-ji was patient, accurate in his readings, most considerate while giving suggestions & advice." },
  { id: 5, name: "Sanaa", date: "Jan 17, 2025", review: "I consulted Rahul Bali Ji for a birth chart reading, and I was pleasantly surprised by how empathetic and understanding he was. He provided an honest reading while patiently listening to my concerns." },
  { id: 6, name: "Luis", date: "Jan 26, 2025", review: "He's so accurate it's wild. It felt like he knew me and lived my events. Very insightful and explained things to the depth." },
  { id: 7, name: "Gomathi", date: "Nov 11, 2024", review: "My first time consulting an astrologer, and you made me feel extremely comfortable. I am extremely grateful that I got to consult you and got my doubts cleared. Thank you so much!" },
];

const VoicesOfInsight = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  return (
    <section className="py-24 md:py-40 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-24 items-center">
          <div className="lg:col-span-1">
            <span className="text-[10px] font-medium tracking-[0.3em] uppercase text-accent mb-4 block font-label">Reviews</span>
            <h2 className="text-5xl font-normal mb-8 font-headline text-on-surface tracking-tight">Voices of Insight</h2>
            <p className="text-secondary text-base mb-12 font-body leading-relaxed max-w-xs">
              Hear from those who have transformed their lives through celestial alignment and expert guidance.
            </p>
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-0.5 mr-2">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-accent text-lg" style={{ fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>star</span>
                  ))}
                </div>
                <span className="font-semibold text-[11px] tracking-[0.15em] text-secondary uppercase font-label">4.9/5 RATING</span>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => { prevSlide(); setIsAutoPlaying(false); }}
                  className="w-12 h-12 rounded-full border border-outline/30 flex items-center justify-center text-on-surface hover:bg-surface-container-low transition-colors"
                  aria-label="Previous review"
                >
                  <span className="material-symbols-outlined">chevron_left</span>
                </button>
                <button
                  onClick={() => { nextSlide(); setIsAutoPlaying(false); }}
                  className="w-12 h-12 rounded-full border border-outline/30 flex items-center justify-center text-on-surface hover:bg-surface-container-low transition-colors"
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
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {reviews.map((item) => (
                  <div key={item.id} className="min-w-full px-2">
                    <div className="bg-surface p-10 md:p-14 rounded-[3.5rem] border border-outline/50 h-full flex flex-col justify-between">
                      <p className="text-xl md:text-2xl text-on-surface mb-12 italic leading-relaxed font-body font-light">
                        &quot;{item.review}&quot;
                      </p>
                      <div className="flex items-center gap-5 mt-auto">
                        <div className="w-14 h-14 rounded-full bg-surface-container-low border border-outline/50 flex items-center justify-center text-accent font-semibold text-xl">
                          {item.name[0]}
                        </div>
                        <div>
                          <h5 className="font-medium text-[13px] tracking-[0.05em] uppercase font-label text-on-surface">{item.name}</h5>
                          <p className="text-[11px] text-secondary/60 uppercase tracking-[0.1em] font-label">{item.date}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center mt-10 gap-2">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setCurrentIndex(i); setIsAutoPlaying(false); }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${i === currentIndex ? 'bg-accent w-8' : 'bg-outline/30 hover:bg-outline/50'}`}
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
