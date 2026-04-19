import React from 'react';

const CelestialForecasts = () => {
  return (
    <section className="py-24 bg-surface-container-low">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <h2 className="text-4xl font-normal mb-4 tracking-tight font-headline">Celestial Forecasts</h2>
            <p className="text-secondary max-w-xl text-sm font-body">Your alignment with the planetary transits, updated for the cosmic cycles of today.</p>
          </div>
          <div className="flex gap-4">
            <button className="bg-white p-3 rounded-full shadow-sm hover:shadow-md transition-all">
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button className="bg-white p-3 rounded-full shadow-sm hover:shadow-md transition-all">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-10 rounded-[2rem] group hover:-translate-y-1 transition-all duration-500 border border-slate-100">
            <div className="w-12 h-12 bg-primary/5 rounded-full flex items-center justify-center mb-8">
              <span className="material-symbols-outlined text-primary text-2xl">light_mode</span>
            </div>
            <h3 className="text-xl font-normal mb-4 uppercase tracking-[0.1em] font-headline">Daily Preview</h3>
            <p className="text-secondary text-sm leading-relaxed mb-8 font-body">Quick insights for your immediate journey. Focus on communication and inner clarity as Mercury transitions.</p>
            <a className="text-primary text-[11px] font-semibold tracking-widest uppercase flex items-center gap-2 group-hover:gap-4 transition-all font-label" href="#">
              Read Daily <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </a>
          </div>
          <div className="bg-white p-10 rounded-[2rem] group hover:-translate-y-1 transition-all duration-500 shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-slate-100">
            <div className="w-12 h-12 bg-primary/5 rounded-full flex items-center justify-center mb-8">
              <span className="material-symbols-outlined text-primary text-2xl">calendar_view_week</span>
            </div>
            <h3 className="text-xl font-normal mb-4 uppercase tracking-[0.1em] font-headline">Weekly Cycles</h3>
            <p className="text-secondary text-sm leading-relaxed mb-8 font-body">The lunar phase suggests a period of intense creative output. Align your goals with the energy.</p>
            <a className="text-primary text-[11px] font-semibold tracking-widest uppercase flex items-center gap-2 group-hover:gap-4 transition-all font-label" href="#">
              Explore Weekly <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </a>
          </div>
          <div className="bg-white p-10 rounded-[2rem] group hover:-translate-y-1 transition-all duration-500 border border-slate-100">
            <div className="w-12 h-12 bg-primary/5 rounded-full flex items-center justify-center mb-8">
              <span className="material-symbols-outlined text-primary text-2xl">auto_awesome</span>
            </div>
            <h3 className="text-xl font-normal mb-4 uppercase tracking-[0.1em] font-headline">Yearly Manifest</h3>
            <p className="text-secondary text-sm leading-relaxed mb-8 font-body">A comprehensive 2024 overview of your spiritual growth and significant karmic shifts.</p>
            <a className="text-primary text-[11px] font-semibold tracking-widest uppercase flex items-center gap-2 group-hover:gap-4 transition-all font-label" href="#">
              Unlock Full Year <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CelestialForecasts;
