import React from 'react';

const CelestialForecasts = () => {
  return (
    <section className="py-32 bg-background">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <span className="text-[10px] font-medium tracking-[0.3em] uppercase text-accent mb-4 block font-label">Insights</span>
            <h2 className="text-5xl font-normal mb-6 tracking-tight font-headline text-on-surface">Celestial Forecasts</h2>
            <p className="text-secondary max-w-xl text-base font-body leading-relaxed">Your alignment with the planetary transits, updated for the cosmic cycles of today.</p>
          </div>
          <div className="flex gap-4">
            <button className="bg-surface p-4 rounded-full border border-outline">
              <span className="material-symbols-outlined text-secondary">chevron_left</span>
            </button>
            <button className="bg-surface p-4 rounded-full border border-outline">
              <span className="material-symbols-outlined text-secondary">chevron_right</span>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="bg-surface p-12 rounded-[3rem] group border border-outline/50">
            <div className="w-14 h-14 bg-background rounded-full flex items-center justify-center mb-10 border border-outline/30">
              <span className="material-symbols-outlined text-accent text-2xl">light_mode</span>
            </div>
            <h3 className="text-2xl font-normal mb-5 tracking-tight font-headline text-on-surface">Daily Preview</h3>
            <p className="text-secondary text-sm leading-relaxed mb-10 font-body">Quick insights for your immediate journey. Focus on communication and inner clarity as Mercury transitions.</p>
            <a className="text-on-surface text-[10px] font-medium tracking-[0.2em] uppercase flex items-center gap-3 font-label" href="#">
              Read Daily
            </a>
          </div>
          <div className="bg-surface p-12 rounded-[3rem] group border border-outline/50">
            <div className="w-14 h-14 bg-background rounded-full flex items-center justify-center mb-10 border border-outline/30">
              <span className="material-symbols-outlined text-accent text-2xl">calendar_view_week</span>
            </div>
            <h3 className="text-2xl font-normal mb-5 tracking-tight font-headline text-on-surface">Weekly Cycles</h3>
            <p className="text-secondary text-sm leading-relaxed mb-10 font-body">The lunar phase suggests a period of intense creative output. Align your goals with the energy.</p>
            <a className="text-on-surface text-[10px] font-medium tracking-[0.2em] uppercase flex items-center gap-3 font-label" href="#">
              Explore Weekly
            </a>
          </div>
          <div className="bg-surface p-12 rounded-[3rem] group border border-outline/50">
            <div className="w-14 h-14 bg-background rounded-full flex items-center justify-center mb-10 border border-outline/30">
              <span className="material-symbols-outlined text-accent text-2xl">auto_awesome</span>
            </div>
            <h3 className="text-2xl font-normal mb-5 tracking-tight font-headline text-on-surface">Yearly Manifest</h3>
            <p className="text-secondary text-sm leading-relaxed mb-10 font-body">A comprehensive 2024 overview of your spiritual growth and significant karmic shifts.</p>
            <a className="text-on-surface text-[10px] font-medium tracking-[0.2em] uppercase flex items-center gap-3 font-label" href="#">
              Unlock Full Year
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CelestialForecasts;
