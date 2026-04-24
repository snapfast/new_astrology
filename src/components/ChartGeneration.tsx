import React from 'react';

const ChartGeneration = () => {
  return (
    <section className="py-24 bg-background -mt-32 relative z-20">
      <div className="max-w-4xl mx-auto px-8">
        <div className="bg-surface p-10 md:p-16 rounded-[3rem] shadow-[0_40px_100px_rgba(0,0,0,0.04)] border border-outline/50 relative overflow-hidden">
          <div className="relative z-10">
            <div className="mb-12 text-center">
              <h2 className="text-4xl font-normal mb-4 font-headline text-on-surface">Generate Your Chart</h2>
              <p className="text-secondary text-sm font-body max-w-sm mx-auto">Enter your details to unlock a precise map of the stars at the moment of your birth.</p>
            </div>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-medium text-secondary uppercase tracking-widest ml-1 font-label">Full Name</label>
                <input className="w-full px-6 py-4 bg-surface-container-low border border-outline rounded-2xl focus:ring-1 focus:ring-accent/20 placeholder:text-secondary/30 text-on-surface text-sm transition-all" placeholder="John Doe" type="text"/>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-medium text-secondary uppercase tracking-widest ml-1 font-label">Date of Birth</label>
                <input className="w-full px-6 py-4 bg-surface-container-low border border-outline rounded-2xl focus:ring-1 focus:ring-accent/20 text-on-surface text-sm transition-all" type="date"/>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-medium text-secondary uppercase tracking-widest ml-1 font-label">Time of Birth</label>
                <input className="w-full px-6 py-4 bg-surface-container-low border border-outline rounded-2xl focus:ring-1 focus:ring-accent/20 text-on-surface text-sm transition-all" type="time"/>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-medium text-secondary uppercase tracking-widest ml-1 font-label">Place of Birth</label>
                <input className="w-full px-6 py-4 bg-surface-container-low border border-outline rounded-2xl focus:ring-1 focus:ring-accent/20 placeholder:text-secondary/30 text-on-surface text-sm transition-all" placeholder="City, Country" type="text"/>
              </div>
              <div className="md:col-span-2 pt-4">
                <button className="w-full py-5 bg-primary text-white rounded-2xl font-medium text-xs tracking-widest uppercase font-label" type="submit">
                  Generate Horoscope Chart
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChartGeneration;
