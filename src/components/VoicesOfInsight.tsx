import React from 'react';

const VoicesOfInsight = () => {
  return (
    <section className="py-40 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-24 items-center">
          <div className="lg:col-span-1">
            <span className="text-[10px] font-medium tracking-[0.3em] uppercase text-accent mb-4 block font-label">Reviews</span>
            <h2 className="text-5xl font-normal mb-8 font-headline text-on-surface tracking-tight">Voices of Insight</h2>
            <p className="text-secondary text-base mb-12 font-body leading-relaxed max-w-xs">
              Hear from those who have transformed their lives through celestial alignment.
            </p>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5 mr-2">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="material-symbols-outlined text-accent text-lg" style={{ fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>star</span>
                ))}
              </div>
              <span className="font-semibold text-[11px] tracking-[0.15em] text-secondary uppercase font-label">4.9/5 RATING</span>
            </div>
          </div>
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-surface p-12 rounded-[3.5rem] border border-outline/50 hover:shadow-xl hover:shadow-black/[0.01] transition-all">
                <p className="text-lg text-on-surface mb-12 italic leading-relaxed font-body font-light">
                  &quot;There were so many things going on in life. I wanted to share with someone trustworthy fortunately I got answers today... thank youuu so much for answering about everything.&quot;
                </p>
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-full bg-surface-container-low border border-outline/50 flex items-center justify-center text-accent font-semibold text-xl">A</div>
                  <div>
                    <h5 className="font-medium text-[13px] tracking-[0.05em] uppercase font-label text-on-surface">Aditi</h5>
                    <p className="text-[11px] text-secondary/60 uppercase tracking-[0.1em] font-label">Oct 28, 2025</p>
                  </div>
                </div>
              </div>
              <div className="bg-surface p-12 rounded-[3.5rem] border border-outline/50 hover:shadow-xl hover:shadow-black/[0.01] transition-all">
                <p className="text-lg text-on-surface mb-12 italic leading-relaxed font-body font-light">
                  &quot;Panditji provided a very good experience. The response was quick, the guidance was clear, and everything went smoothly. Highly recommend.&quot;
                </p>
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-full bg-surface-container-low border border-outline/50 flex items-center justify-center text-accent font-semibold text-xl">I</div>
                  <div>
                    <h5 className="font-medium text-[13px] tracking-[0.05em] uppercase font-label text-on-surface">Ishwar Goswami</h5>
                    <p className="text-[11px] text-secondary/60 uppercase tracking-[0.1em] font-label">Oct 25, 2025</p>
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

export default VoicesOfInsight;
