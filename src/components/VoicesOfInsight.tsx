import React from 'react';
import Image from 'next/image';

const VoicesOfInsight = () => {
  return (
    <section className="py-24 bg-surface-container-high relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          <div className="lg:col-span-1">
            <h2 className="text-4xl font-normal mb-6 font-headline">Voices of Insight</h2>
            <p className="text-secondary text-sm mb-8 font-body">Hear from those who have transformed their lives through celestial alignment.</p>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="material-symbols-outlined text-amber-500 text-sm" style={{ fontVariationSettings: "'FILL' 1, 'wght' 200, 'GRAD' 0, 'opsz' 24" }}>star</span>
              ))}
              <span className="ml-2 font-semibold text-[10px] tracking-widest text-slate-600 uppercase font-label">4.9/5 RATING</span>
            </div>
          </div>
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-10 rounded-[2rem] shadow-sm">
                <p className="text-sm text-on-surface mb-8 italic leading-relaxed font-body">&quot;Rahul&apos;s reading was pinpoint accurate. He didn&apos;t just tell me what would happen, but why it was happening based on my past karma.&quot;</p>
                <div className="flex items-center gap-4">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden grayscale">
                    <Image
                      alt="portrait of Sarah Jenkins"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBSkWCKe2NASEczz2fWI4G6FjNDtrrN4PA2TzELxECYS672ZydwhNGK0xJ5dm2piPqjPYrzFhqScHiLe3u5cN1fdVezggn7N1WLPCP4Tn_QJ_c9c7hbQFwpDnUuDV7TOebTEG5Nb8wQbGgypyto79WlUM1Tj7_5Khkk1dSVolwjzd_g7JxQEBMQ9_FTGTbIjY9SB_f6MgHz4RFpQZZOcg-wyywun68w4klUJRNHr6zConNDy7z4jYP4aO5aGVxsoaW1KLQl1Wf7Xg"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h5 className="font-semibold text-[11px] tracking-widest uppercase font-label">Sarah Jenkins</h5>
                    <p className="text-[10px] text-secondary uppercase tracking-widest font-label">Tech Executive</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-10 rounded-[2rem] shadow-sm">
                <p className="text-sm text-on-surface mb-8 italic leading-relaxed font-body">&quot;The compatibility reading saved our relationship. We understood our energetic clashes and how to bridge them using the remedies suggested.&quot;</p>
                <div className="flex items-center gap-4">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden grayscale">
                    <Image
                      alt="portrait of David Chen"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAFlpbm5Rwg5uzqdAtaWgTvWnN0a0cRia2evvIvpgRwFoml-DvgvG3VbZBfBFw8OScrHJ399RCWPe0afLcB3GKPH5ceG2YdmgTZB4JhbrvRpZiOrePxXzEvNjCjE9BEX9eMsd6_i21MIS0nYfFnunZKwhWLYz_VlSCoQbRB_gaOPOdHB0MgRgzXNf4Hf5jb8nRPweWd9h4oAfDG1lYVfMe6sZZqo5_JNfpLzuT-OxQEMn8ydag-eua_2Lj-gm_mQ3VwRoL_I_DbPA"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h5 className="font-semibold text-[11px] tracking-widest uppercase font-label">David Chen</h5>
                    <p className="text-[10px] text-secondary uppercase tracking-widest font-label">Architect</p>
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
