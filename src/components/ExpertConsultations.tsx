'use client';

import { memo } from 'react';
import { SPECIALIZED_SERVICES, SpecializedService } from '@/lib/consultations';
import { sendGAEvent } from '@next/third-parties/google';

interface ExpertConsultationsProps {
  showTitle?: boolean;
}

const ExpertConsultationsComponent = ({ showTitle = true }: ExpertConsultationsProps) => {
  const handleServiceClick = (service: SpecializedService) => {
    sendGAEvent({ event: 'action_click', action_name: `service_click_${service.id}` });
    // Open WhatsApp directly for now as there's no detail modal for these
    window.open('https://wa.me/919306057150', '_blank');
  };

  return (
    <section className={`${showTitle ? 'py-20' : 'pb-20'} bg-white`}>
      <div className="max-w-7xl mx-auto px-8">
        {showTitle && (
          <div className="text-center mb-20">
            <span className="text-[10px] font-medium tracking-[0.3em] uppercase text-accent mb-4 block font-label">Services</span>
            <h2 className="text-5xl font-normal mb-6 font-headline text-on-surface">Expert Consultations</h2>
            <p className="text-on-surface max-w-2xl mx-auto text-base font-body leading-relaxed">Personalized Vedic guidance for life&apos;s most pressing challenges.</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10">
          {SPECIALIZED_SERVICES.slice(0, 6).map((item) => (
            <button
              key={item.id}
              onClick={() => handleServiceClick(item)}
              className="group text-left p-8 bg-surface-bright rounded-[2rem] border border-outline/30 hover:border-accent/40 transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-4">
                <h4 className="text-xl font-normal font-headline text-on-surface group-hover:text-accent transition-colors leading-tight">{item.title}</h4>
                <span className="material-symbols-outlined text-accent transition-opacity">arrow_outward</span>
              </div>
              <p className="text-on-surface text-sm leading-relaxed font-body">{item.description}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

const ExpertConsultations = memo(ExpertConsultationsComponent);
ExpertConsultations.displayName = 'ExpertConsultations';

export default ExpertConsultations;
