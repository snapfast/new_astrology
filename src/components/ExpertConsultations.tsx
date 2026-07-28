'use client';

import { memo } from 'react';
import { useLanguage } from '@/context/LanguageContext';

interface ExpertConsultationsProps {
  showTitle?: boolean;
}

const TRANSLATIONS = {
  en: {
    prep: "Journey to Clarity",
    title: "How it Works",
    desc: "A seamless path to receiving personalized spiritual guidance and life-changing astrological insights.",
    bookNow: "Book Your Session Now",
    guidelines: [
      {
        id: "booking-process",
        title: "Instant Booking",
        description: "Secure your 30-minute private session instantly through our integrated calendar. Choose a time that works best for you."
      },
      {
        id: "required-details",
        title: "Birth Details",
        description: "To decode your karmic map accurately, we require your exact date, time, and place of birth during the scheduling process."
      },
      {
        id: "prepare-questions",
        title: "Focused Areas",
        description: "Think about the specific areas—career, relationships, or health—where you seek the most clarity to make our session deeply impactful."
      },
      {
        id: "open-mindset",
        title: "Transformative Insight",
        description: "Approach our session with an open heart. You will receive guidance that empowers you to navigate life's challenges with confidence."
      }
    ]
  },
  hi: {
    prep: "स्पष्टता की यात्रा",
    title: "यह कैसे काम करता है",
    desc: "व्यक्तिगत आध्यात्मिक मार्गदर्शन और जीवन बदलने वाली ज्योतिषीय अंतर्दृष्टि प्राप्त करने का एक सहज मार्ग।",
    bookNow: "अभी अपना सत्र बुक करें",
    guidelines: [
      {
        id: "booking-process",
        title: "तत्काल बुकिंग",
        description: "हमारे एकीकृत कैलेंडर के माध्यम से अपना 30 मिनट का निजी सत्र तुरंत सुरक्षित करें। वह समय चुनें जो आपके लिए सबसे अच्छा हो।"
      },
      {
        id: "required-details",
        title: "जन्म विवरण",
        description: "आपके कर्म मानचित्र को सटीक रूप से डिकोड करने के लिए, हमें शेड्यूलिंग प्रक्रिया के दौरान आपकी सटीक जन्म तिथि, समय और स्थान की आवश्यकता होती है।"
      },
      {
        id: "prepare-questions",
        title: "केंद्रित क्षेत्र",
        description: "उन विशिष्ट क्षेत्रों—करियर, रिश्ते या स्वास्थ्य—के बारे में सोचें जहां आप सबसे अधिक स्पष्टता चाहते हैं ताकि हमारे सत्र को गहरा प्रभावशाली बनाया जा सके।"
      },
      {
        id: "open-mindset",
        title: "परिवर्तनकारी अंतर्दृष्टि",
        description: "खुले दिल से हमारे सत्र में आएं। आपको वह मार्गदर्शन प्राप्त होगा जो आपको आत्मविश्वास के साथ जीवन की चुनौतियों का सामना करने के लिए सशक्त बनाएगा।"
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
