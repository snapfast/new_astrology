import React from 'react';

const Testimonials = () => {
  return (
    <section className="py-32 bg-surface-container-low overflow-hidden" id="testimonials">
      <div className="max-w-7xl mx-auto px-8 relative">
        <div className="absolute -top-12 left-0 text-[12rem] font-headline text-stone-200 leading-none opacity-30 select-none z-0">“</div>
        <div className="relative z-10">
          <h2 className="font-headline text-5xl text-primary mb-16">Voices of Insight</h2>
          <div className="grid md:grid-cols-2 gap-8 items-stretch">
            <div className="bg-white p-12 editorial-shadow rounded-lg">
              <div className="flex flex-col h-full">
                <div className="flex text-secondary mb-6">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                  ))}
                </div>
                <blockquote className="font-headline italic text-2xl mb-8 text-tertiary leading-relaxed flex-grow">
                  &quot;Rahul&apos;s approach is unlike any astrologer I&apos;ve consulted. There&apos;s a technical rigor and profound historical context that makes the reading feel incredibly grounded and accurate.&quot;
                </blockquote>
                <div className="flex items-center gap-4 mt-auto pt-6 border-t border-stone-100">
                  <div className="w-10 h-10 rounded-full bg-stone-100 border border-stone-200 flex items-center justify-center font-label text-sm text-primary">A.K</div>
                  <div>
                    <p className="font-label text-sm font-bold">Anand Kapoor</p>
                    <p className="font-label text-[10px] text-on-surface-variant uppercase tracking-widest">Business Strategy Consultant</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white p-12 editorial-shadow rounded-lg">
              <div className="flex flex-col h-full">
                <div className="flex text-secondary mb-6">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                  ))}
                </div>
                <blockquote className="font-headline italic text-2xl mb-8 text-tertiary leading-relaxed flex-grow">
                  &quot;The consultation provided me with a roadmap that was both spiritual and practical. His knowledge of the dashas explained transitions in my life I couldn&apos;t understand before.&quot;
                </blockquote>
                <div className="flex items-center gap-4 mt-auto pt-6 border-t border-stone-100">
                  <div className="w-10 h-10 rounded-full bg-stone-100 border border-stone-200 flex items-center justify-center font-label text-sm text-primary">M.S</div>
                  <div>
                    <p className="font-label text-sm font-bold">Meera Sharma</p>
                    <p className="font-label text-[10px] text-on-surface-variant uppercase tracking-widest">Wellness Center Founder</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
