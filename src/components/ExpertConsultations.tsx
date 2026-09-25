'use client';

import { memo } from 'react';

interface ExpertConsultationsProps {
  showTitle?: boolean;
}

const TRANSLATIONS = {
  en: {
    prep: "Vedic Astrology Consultation Process",
    title: "Book Your Vedic Astrology Consultation",
    desc: "A simple process to book a Vedic astrology consultation with Pandit Rahul Bali Ji for clear guidance and practical remedies.",
    bookNow: "Book Your Consultation Now",
    guidelines: [
      {
        id: "booking-process",
        title: "Book a Consultation Session",
        description: "Book your 1-hour online Vedic astrology consultation easily. Choose a date and time that suits you."
      },
      {
        id: "required-details",
        title: "Provide Birth Details",
        description: "To read your Janam Kundli accurately, provide your exact date, time, and place of birth when you book your consultation."
      },
      {
        id: "prepare-questions",
        title: "Prepare Your Questions",
        description: "Note down specific questions about career, marriage, health, or life decisions for your Vedic astrology consultation."
      },
      {
        id: "open-mindset",
        title: "Get Clear Guidance & Practical Remedies",
        description: "Join the call with Pandit Rahul Bali Ji. Receive clear guidance and practical remedies tailored to your horoscopes."
      }
    ]
  }};

const ExpertConsultationsComponent = ({ showTitle = true }: ExpertConsultationsProps) => {
  const t = TRANSLATIONS.en;

  return (
    <section className={`${showTitle ? 'py-16' : 'pb-16'} bg-white`}>
      <div className="max-w-7xl mx-auto px-8">
        {showTitle && (
          <div className="text-center mb-16">
            <span className="text-[10px] font-medium uppercase text-accent mb-4 block font-label tracking-[0.3em]">{t.prep}</span>
            <h2 className="text-5xl font-normal mb-6 font-headline text-on-surface">{t.title}</h2>
            <p className="text-on-surface max-w-2xl mx-auto text-base font-body leading-relaxed">{t.desc}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-16">
          {t.guidelines.map((item) => (
            <div key={item.id} className="space-y-4">
              <h3 className="text-xl font-normal font-headline text-on-surface tracking-tight flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                {item.title}
              </h3>
              <p className="text-sm font-body text-on-surface leading-relaxed pl-4.5 border-l border-outline/20">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-20 text-center">
          <button
            onClick={() => {
              window.dispatchEvent(new CustomEvent('openBookingModal'));
            }}
            className="inline-flex items-center justify-center px-10 py-5 bg-primary text-white rounded-full font-medium uppercase font-label transition-all active:scale-95 hover:bg-primary/90 shadow-lg shadow-primary/10 text-xs tracking-[0.2em]"
          >
            {t.bookNow}
          </button>
        </div>
      </div>
    </section>
  );
};

const ExpertConsultations = memo(ExpertConsultationsComponent);
ExpertConsultations.displayName = 'ExpertConsultations';

export default ExpertConsultations;
