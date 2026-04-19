import React from 'react';

const ChartGeneration = () => {
  return (
    <section className="py-24 bg-surface -mt-24 relative z-20">
      <div className="max-w-4xl mx-auto px-8">
        <div className="bg-white p-10 md:p-16 rounded-[2.5rem] shadow-[0_40px_100px_rgba(0,0,0,0.06)] relative overflow-hidden">
          <div className="relative z-10">
            <div className="mb-12 text-center md:text-left">
              <h2 className="text-3xl font-normal mb-4 font-headline">Generate Your Chart</h2>
              <p className="text-secondary text-sm font-body">Enter your details to unlock a precise map of the stars at the moment of your birth.</p>
            </div>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-semibold text-secondary uppercase tracking-widest ml-1 font-label">Full Name</label>
                <input className="w-full px-6 py-4 bg-surface-container-low border-none rounded-xl focus:ring-1 focus:ring-primary/20 placeholder:text-outline text-on-surface text-sm" placeholder="John Doe" type="text"/>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-semibold text-secondary uppercase tracking-widest ml-1 font-label">Date of Birth</label>
                <input className="w-full px-6 py-4 bg-surface-container-low border-none rounded-xl focus:ring-1 focus:ring-primary/20 text-on-surface text-sm" type="date"/>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-semibold text-secondary uppercase tracking-widest ml-1 font-label">Time of Birth</label>
                <input className="w-full px-6 py-4 bg-surface-container-low border-none rounded-xl focus:ring-1 focus:ring-primary/20 text-on-surface text-sm" type="time"/>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-semibold text-secondary uppercase tracking-widest ml-1 font-label">Place of Birth</label>
                <input className="w-full px-6 py-4 bg-surface-container-low border-none rounded-xl focus:ring-1 focus:ring-primary/20 placeholder:text-outline text-on-surface text-sm" placeholder="City, Country" type="text"/>
              </div>
              <div className="md:col-span-2 pt-4">
                <button className="w-full py-5 bg-[#0071E3] text-white rounded-xl font-medium text-xs tracking-widest uppercase hover:bg-[#0077ED] transition-all font-label" type="submit">
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
