'use client';

import { memo } from 'react';
import { useLanguage } from '@/context/LanguageContext';

interface ExpertConsultationsProps {
  showTitle?: boolean;
}

const TRANSLATIONS = {
  en: {
    prep: "Preparation",
    title: "Consultation Guide",
    desc: "How to prepare and what to expect during your Vedic astrology session.",
    guidelines: [
      {
        id: "booking-process",
        title: "Booking Process",
        description: "Consultations can be booked in advance to ensure dedicated time. Please use our contact channels to schedule your appointment."
      },
      {
        id: "required-details",
        title: "Required Details",
        description: "For an accurate reading, please provide your exact date, time, and place of birth at the time of booking."
      },
      {
        id: "prepare-questions",
        title: "Prepare Your Questions",
        description: "Take some time to note down your most pressing questions or areas of life you wish to focus on during the session."
      },
      {
        id: "open-mindset",
        title: "Open Mindset",
        description: "Approach the consultation with an open mind. Astrology provides guidance and clarity, empowering you to make informed decisions."
      }
    ]
  },
  hi: {
    prep: "तैयारी",
    title: "परामर्श मार्गदर्शिका",
    desc: "आपके वैदिक ज्योतिष सत्र के दौरान क्या उम्मीद करें और कैसे तैयारी करें।",
    guidelines: [
      {
        id: "booking-process",
        title: "बुकिंग प्रक्रिया",
        description: "समर्पित समय सुनिश्चित करने के लिए परामर्श पहले से बुक किया जा सकता है। अपनी अपॉइंटमेंट शेड्यूल करने के लिए कृपया हमारे संपर्क चैनलों का उपयोग करें।"
      },
      {
        id: "required-details",
        title: "आवश्यक विवरण",
        description: "सटीक रीडिंग के लिए, कृपया बुकिंग के समय अपनी जन्म तिथि, समय और स्थान का सटीक विवरण प्रदान करें।"
      },
      {
        id: "prepare-questions",
        title: "अपने प्रश्न तैयार करें",
        description: "अपने सबसे महत्वपूर्ण प्रश्नों या जीवन के उन क्षेत्रों को नोट करने के लिए कुछ समय निकालें जिन पर आप सत्र के दौरान ध्यान केंद्रित करना चाहते हैं।"
      },
      {
        id: "open-mindset",
        title: "खुला नजरिया",
        description: "खुले दिमाग के साथ परामर्श के लिए आएं। ज्योतिष मार्गदर्शन और स्पष्टता प्रदान करता है, जो आपको सूचित निर्णय लेने के लिए सशक्त बनाता है।"
      }
    ]
  }
};

const ExpertConsultationsComponent = ({ showTitle = true }: ExpertConsultationsProps) => {
  const { lang } = useLanguage();
  const t = TRANSLATIONS[lang];

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
              <p className="text-sm font-body text-on-surface leading-relaxed pl-4.5 border-l border-outline/30">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ExpertConsultations = memo(ExpertConsultationsComponent);
ExpertConsultations.displayName = 'ExpertConsultations';

export default ExpertConsultations;
