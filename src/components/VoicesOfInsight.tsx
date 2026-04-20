import React from 'react';
import Image from 'next/image';

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
                  <span key={i} className="material-symbols-outlined text-[#F9A825] text-lg" style={{ fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>star</span>
                ))}
              </div>
              <span className="font-bold text-[11px] tracking-[0.15em] text-secondary uppercase font-label">4.9/5 RATING</span>
            </div>
          </div>
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-12 rounded-[3rem] shadow-sm">
                <p className="text-lg text-on-surface mb-10 italic leading-relaxed font-body">
                  &quot;Rahul&apos;s reading was pinpoint accurate. He didn&apos;t just tell me what would happen, but why it was happening based on my past karma.&quot;
                </p>
                <div className="flex items-center gap-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden grayscale border border-slate-100">
                    <Image
                      alt="portrait of Sarah Jenkins"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBSkWCKe2NASEczz2fWI4G6FjNDtrrN4PA2TzELxECYS672ZydwhNGK0xJ5dm2piPqjPYrzFhqScHiLe3u5cN1fdVezggn7N1WLPCP4Tn_QJ_c9c7hbQFwpDnUuDV7TOebTEG5Nb8wQbGgypyto79WlUM1Tj7_5Khkk1dSVolwjzd_g7JxQEBMQ9_FTGTbIjY9SB_f6MgHz4RFpQZZOcg-wyywun68w4klUJRNHr6zConNDy7z4jYP4aO5aGVxsoaW1KLQl1Wf7Xg"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h5 className="font-bold text-[12px] tracking-[0.1em] uppercase font-label text-on-surface">Sarah Jenkins</h5>
                    <p className="text-[11px] text-secondary uppercase tracking-[0.1em] font-label">Tech Executive</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-12 rounded-[3rem] shadow-sm">
                <p className="text-lg text-on-surface mb-10 italic leading-relaxed font-body">
                  &quot;The compatibility reading saved our relationship. We understood our energetic clashes and how to bridge them using the remedies suggested.&quot;
                </p>
                <div className="flex items-center gap-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden grayscale border border-slate-100">
                    <Image
                      alt="portrait of David Chen"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAFlpbm5Rwg5uzqdAtaWgTvWnN0a0cRia2evvIvpgRwFoml-DvgvG3VbZBfBFw8OScrHJ399RCWPe0afLcB3GKPH5ceG2YdmgTZB4JhbrvRpZiOrePxXzEvNjCjE9BEX9eMsd6_i21MIS0nYfFnunZKwhWLYz_VlSCoQbRB_gaOPOdHB0MgRgzXNf4Hf5jb8nRPweWd9h4oAfDG1lYVfMe6sZZqo5_JNfpLzuT-OxQEMn8ydag-eua_2Lj-gm_mQ3VwRoL_I_DbPA"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h5 className="font-bold text-[12px] tracking-[0.1em] uppercase font-label text-on-surface">David Chen</h5>
                    <p className="text-[11px] text-secondary uppercase tracking-[0.1em] font-label">Architect</p>
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
