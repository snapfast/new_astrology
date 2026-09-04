'use client';

import { memo } from 'react';
import { useLanguage } from '@/context/LanguageContext';

interface ExpertConsultationsProps {
  showTitle?: boolean;
}

const TRANSLATIONS = {
  en: {
    prep: "Step-by-Step Guide",
    title: "How it Works",
    desc: "A simple process to get clear astrological guidance and remedies for your life.",
    bookNow: "Book Your Session Now",
    guidelines: [
      {
        id: "booking-process",
        title: "Book a Session",
        description: "Book your 30-minute online consultation easily. Choose a date and time that suits you."
      },
      {
        id: "required-details",
        title: "Provide Birth Details",
        description: "To read your Kundli accurately, we need your exact date, time, and place of birth when you book."
      },
      {
        id: "prepare-questions",
        title: "Prepare Your Questions",
        description: "Note down specific questions about your career, marriage, health, or personal life that you want to ask during the call."
      },
      {
        id: "open-mindset",
        title: "Get Clear Guidance",
        description: "Join the call with an open mind. You will receive clear answers and practical remedies for your problems."
      }
    ]
  }};

const ExpertConsultationsComponent = ({ showTitle = true }: ExpertConsultationsProps) => {
  const { lang } = useLanguage();
  const t = TRANSLATIONS.en;

  return (
    <section className={`${showTitle ? 'py-16' : 'pb-16'} bg-white`}>
      <div className="max-w-5xl mx-auto px-8">
        {showTitle && (
          <div className="text-center mb-16">
            <span className={`text-[10px] font-medium uppercase text-accent mb-4 block font-label ${lang === 'en' ? 'tracking-[0.3em]' : ''}`}>{t.prep}</span>
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
            className={`inline-flex items-center justify-center px-10 py-5 bg-primary text-white rounded-full font-medium uppercase font-label transition-all active:scale-95 hover:bg-primary/90 shadow-lg shadow-primary/10 ${
              lang === 'hi' ? 'text-[15px] tracking-normal' : 'text-xs tracking-[0.2em]'
            }`}
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
