import React from 'react';

const Consultation = () => {
  return (
    <section className="py-24 bg-surface" id="consultation">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="font-headline text-5xl mb-8 text-primary leading-tight">The Path of <br/>Consultation</h2>
            <p className="font-body text-lg text-on-surface-variant leading-relaxed mb-12">
              Every consultation is treated as a sacred scholarly inquiry. We look beyond simple predictions to understand the intricate karmic patterns that shape your existence.
            </p>
            <div className="space-y-8">
              <div className="flex gap-6 group">
                <div className="w-12 h-12 shrink-0 rounded-full border border-outline-variant flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  <span className="material-symbols-outlined">event_note</span>
                </div>
                <div>
                  <h3 className="font-headline text-xl mb-2">Detailed Natal Mapping</h3>
                  <p className="text-sm text-on-surface-variant">Comprehensive analysis of D-Charts and planetary strengths to identify core life purpose.</p>
                </div>
              </div>
              <div className="flex gap-6 group">
                <div className="w-12 h-12 shrink-0 rounded-full border border-outline-variant flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  <span className="material-symbols-outlined">timeline</span>
                </div>
                <div>
                  <h3 className="font-headline text-xl mb-2">Predictive Dashas</h3>
                  <p className="text-sm text-on-surface-variant">Understanding the timing of events through Vimshottari Dasha and transit analysis.</p>
                </div>
              </div>
              <div className="flex gap-6 group">
                <div className="w-12 h-12 shrink-0 rounded-full border border-outline-variant flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  <span className="material-symbols-outlined">healing</span>
                </div>
                <div>
                  <h3 className="font-headline text-xl mb-2">Authentic Remedies</h3>
                  <p className="text-sm text-on-surface-variant">Practical and ritualistic interventions based on the classical Brihat Parashara Hora Shastra.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-surface-container-low p-10 rounded-xl editorial-shadow relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <span className="material-symbols-outlined text-9xl">auto_awesome</span>
            </div>
            <h3 className="font-headline text-3xl mb-6 text-primary">Schedule Your Reading</h3>
            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-label text-xs uppercase tracking-wider text-on-surface-variant">Full Name</label>
                  <input className="w-full bg-transparent border-0 border-b border-outline focus:ring-0 focus:border-secondary py-2" type="text"/>
                </div>
                <div className="space-y-1">
                  <label className="font-label text-xs uppercase tracking-wider text-on-surface-variant">Email Address</label>
                  <input className="w-full bg-transparent border-0 border-b border-outline focus:ring-0 focus:border-secondary py-2" type="email"/>
                </div>
              </div>
              <div className="space-y-1">
                <label className="font-label text-xs uppercase tracking-wider text-on-surface-variant">Place of Birth</label>
                <input className="w-full bg-transparent border-0 border-b border-outline focus:ring-0 focus:border-secondary py-2" placeholder="City, Country" type="text"/>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-label text-xs uppercase tracking-wider text-on-surface-variant">Date of Birth</label>
                  <input className="w-full bg-transparent border-0 border-b border-outline focus:ring-0 focus:border-secondary py-2" type="date"/>
                </div>
                <div className="space-y-1">
                  <label className="font-label text-xs uppercase tracking-wider text-on-surface-variant">Time of Birth</label>
                  <input className="w-full bg-transparent border-0 border-b border-outline focus:ring-0 focus:border-secondary py-2" type="time"/>
                </div>
              </div>
              <button className="w-full bg-primary text-on-primary py-4 rounded-md font-label uppercase tracking-widest text-sm hover:bg-primary-container transition-all mt-4">
                Request Consultation
              </button>
            </form>
            <p className="text-center mt-6 text-[10px] text-on-surface-variant uppercase tracking-widest leading-relaxed">
              Consultations are conducted via secure high-fidelity video conferencing. <br/>Your data is protected under absolute professional confidentiality.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Consultation;
