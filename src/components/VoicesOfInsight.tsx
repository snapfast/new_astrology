import React from 'react';

const VoicesOfInsight = () => {
  return (
    <section className="py-32 bg-surface-container-low relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-center">
          <div className="lg:col-span-1">
            <h2 className="text-5xl font-normal mb-8 font-headline text-on-surface">Voices of Insight</h2>
            <p className="text-secondary text-base mb-10 font-body leading-relaxed max-w-xs">
              Hear from those who have transformed their lives through celestial alignment.
            </p>
            <div className="flex items-center gap-1.5">
              <div className="flex items-center gap-0.5 mr-2">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="material-symbols-outlined text-outline text-lg" style={{ fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>star</span>
                ))}
              </div>
              <span className="font-bold text-[11px] tracking-[0.15em] text-secondary uppercase font-label">4.9/5 RATING</span>
            </div>
          </div>
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-12 rounded-[3rem] shadow-sm">
                <p className="text-lg text-on-surface mb-10 italic leading-relaxed font-body">
                  &quot;There were so many things going on in life. I wanted to share with someone trustworthy fortunately I got answers today... thank youuu so much for answering about everything.&quot;
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-secondary font-bold">A</div>
                  <div>
                    <h5 className="font-bold text-[12px] tracking-[0.1em] uppercase font-label text-on-surface">Aditi</h5>
                    <p className="text-[11px] text-secondary uppercase tracking-[0.1em] font-label">Oct 28, 2025</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-12 rounded-[3rem] shadow-sm">
                <p className="text-lg text-on-surface mb-10 italic leading-relaxed font-body">
                  &quot;Panditji provided a very good experience. The response was quick, the guidance was clear, and everything went smoothly. Highly recommend.&quot;
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-secondary font-bold">I</div>
                  <div>
                    <h5 className="font-bold text-[12px] tracking-[0.1em] uppercase font-label text-on-surface">Ishwar Goswami</h5>
                    <p className="text-[11px] text-secondary uppercase tracking-[0.1em] font-label">Oct 25, 2025</p>
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
