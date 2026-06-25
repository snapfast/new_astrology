'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';
import { useLanguage } from '@/context/LanguageContext';
import PaymentOptionsModal from '@/components/PaymentOptionsModal';

const TRANSLATIONS = {
  en: {
    heroTitle: "Book Your Consultation",
    heroSubtitle: "Direct Guidance",
    heroDesc: "Take the first step towards clarity. Schedule your private 1-on-1 Vedic session using the integrated calendar below.",
    priceTitle: "Consultation Fee",
    priceDesc: "Our consultations follow a tiered donation model. You can contribute based on your preference after the session.",
    suggestedPayments: "No upfront payment is needed; you can simply pay after our session is complete.",
    viewPayments: "View Payment Methods",
    urgency: "Join 200+ clients worldwide. Limited slots available this week for personalized guidance.",
    duration: "30 Mins Session",
    privacy: "Privacy Guaranteed",
    trustBadge: "Secure Booking via Calendly"
  },
  hi: {
    heroTitle: "अपना परामर्श बुक करें",
    heroSubtitle: "प्रत्यक्ष मार्गदर्शन",
    heroDesc: "स्पष्टता की ओर पहला कदम उठाएं। नीचे दिए गए एकीकृत कैलेंडर का उपयोग करके अपने निजी 1-ऑन-1 वैदिक सत्र को शेड्यूल करें।",
    priceTitle: "परामर्श शुल्क",
    priceDesc: "हमारे परामर्श एक स्तरीय दान मॉडल का पालन करते हैं। आप सत्र के बाद अपनी पसंद के आधार पर योगदान कर सकते हैं।",
    suggestedPayments: "किसी अग्रिम भुगतान की आवश्यकता नहीं है; आप हमारे सत्र के पूरा होने के बाद आसानी से भुगतान कर सकते हैं।",
    viewPayments: "भुगतान के तरीके देखें",
    urgency: "दुनिया भर में 200+ ग्राहकों से जुड़ें। व्यक्तिगत मार्गदर्शन के लिए इस सप्ताह सीमित स्लॉट उपलब्ध हैं।",
    duration: "30 मिनट का सत्र",
    privacy: "गोपनीयता की गारंटी",
    trustBadge: "Calendly के माध्यम से सुरक्षित बुकिंग"
  }
};

const BookClientPage = () => {
  const { lang } = useLanguage();
  const t = TRANSLATIONS[lang];
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  return (
    <main className="min-h-screen bg-surface">
      <Navbar />

      <PageHeader
        title={t.heroTitle}
        subtitle={t.heroSubtitle}
        description={t.heroDesc}
      />

      <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

          {/* Left: Calendly Embed */}
          <div className="lg:col-span-8">
            <div className="bg-white border border-outline/80 rounded-[2.5rem] overflow-hidden shadow-sm h-[700px] md:h-[800px] relative z-10">
              <iframe
                src="https://calendly.com/rahulbaliastrology/kundli?embed_domain=astro.rahulbali.in&embed_type=Inline&hide_landing_page_details=1&hide_gdpr_banner=1"
                width="100%"
                height="100%"
                frameBorder="0"
                title="Schedule Consultation"
                className="w-full h-full"
              ></iframe>
            </div>

            <div className="mt-8 flex items-center justify-center gap-3 text-on-surface/40 font-body uppercase text-[10px] tracking-widest">
              <span className="material-symbols-outlined text-lg">verified_user</span>
              <span>{t.trustBadge}</span>
            </div>
          </div>

          {/* Right: Persuasive Details */}
          <div className="lg:col-span-4 space-y-10">
            {/* Pricing Card */}
            <div className="bg-white border border-outline/80 rounded-[2.5rem] p-8 md:p-10 shadow-sm">
              <h3 className="text-xl font-headline text-on-surface mb-4">{t.priceTitle}</h3>
              <p className="text-sm text-on-surface/70 font-body leading-relaxed mb-8">
                {t.priceDesc}
              </p>

              <div className="flex flex-col gap-5 mb-10">
                <p className="text-2xl md:text-3xl text-on-surface font-headline font-semibold tabular-nums font-hindi">₹1,100 / $21</p>
                <p className="text-2xl md:text-3xl text-on-surface font-headline font-semibold tabular-nums font-hindi">₹5,100 / $71</p>
                <p className="text-2xl md:text-3xl text-on-surface font-headline font-semibold tabular-nums font-hindi">₹11,001 / $151</p>
              </div>

              <div className="bg-accent/10 p-4 rounded-2xl mb-8">
                <p className="text-xs text-on-surface/80 font-body leading-relaxed">
                  {t.suggestedPayments}
                </p>
              </div>

              <button
                onClick={() => setIsPaymentModalOpen(true)}
                className={`w-full py-4 bg-primary text-white rounded-full font-bold uppercase transition-all active:scale-95 shadow-lg shadow-primary/10 hover:bg-primary/90 ${
                   lang === 'hi' ? 'text-xs tracking-normal' : 'text-[10px] tracking-[0.2em]'
                }`}
              >
                {t.viewPayments}
              </button>
            </div>

            {/* Badges */}
            <div className="space-y-6">
              <div className="flex items-center gap-4 p-5 bg-white border border-outline/80 rounded-[2rem] shadow-sm">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                  <span className="material-symbols-outlined font-variation-fill">schedule</span>
                </div>
                <span className="font-headline text-on-surface">{t.duration}</span>
              </div>

              <div className="flex items-center gap-4 p-5 bg-white border border-outline/80 rounded-[2rem] shadow-sm">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                  <span className="material-symbols-outlined font-variation-fill">verified_user</span>
                </div>
                <span className="font-headline text-on-surface">{t.privacy}</span>
              </div>

              <div className="p-6 bg-accent/5 border border-accent/10 rounded-[2rem]">
                <p className="text-sm text-on-surface/80 font-body leading-relaxed">
                  {t.urgency}
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      <PaymentOptionsModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
      />

      <Footer />
    </main>
  );
};

export default BookClientPage;
