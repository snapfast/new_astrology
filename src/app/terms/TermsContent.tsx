'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';
import { useLanguage } from '@/context/LanguageContext';

const TRANSLATIONS = {
  en: {
    title: "Terms of Service",
    subtitle: "Guidelines & Disclaimers",
    description: "Please read our Terms of Service and Astrological Disclaimers carefully before using our digital tools and booking consultations.",
    heading1: "1. Acceptance of Terms",
    para1: "By accessing and using the website astro.rahulbali.in ('Website') and any services, calculations, or tools provided by Rahul Bali Astrology, you agree to comply with and be bound by these Terms of Service. If you do not agree, please refrain from using our services.",
    heading2: "2. Nature of Astrological Guidance & Disclaimers",
    para2: "Vedic Astrology (Jyotish) is an ancient, interpretive science. All astrological analyses, horoscopes, divisional chart calculations, and consultations with Pandit Rahul Bali Ji:",
    list1: [
      "Are intended solely for self-awareness, spiritual guidance, and educational purposes.",
      "Do not constitute absolute or legally binding predictions.",
      "Must never be treated as a substitute for professional medical, psychiatric, financial, legal, or career advisory advice. Any life-altering decision you make is entirely your personal responsibility."
    ],
    heading3: "3. User Inputs & Calculations",
    para3: "Our tools, including Free Online Kundli, Daily Panchang, Biorhythm, and Panch Pakshi, rely on precise astronomical computations (Lahiri Ayanamsa). To ensure exact results:",
    list2: [
      "You are responsible for entering accurate birth details (Date, Time, and Place/coordinates).",
      "We validate and sanitize all form inputs to protect the database and ensure calculation reliability.",
      "Any discrepancies due to inaccurate user input are not the responsibility of this platform."
    ],
    heading4: "4. Consultations & Payments",
    para4: "Appointments and financial contributions are governed by clear, centralized rules:",
    list3: [
      "<strong>Duration:</strong> Live 1-on-1 consultations are exactly 30 minutes in duration, conducted via secure video sessions (Google Meet).",
      "<strong>Suggested Contributions:</strong> Astrological services operate on a voluntary donation model, centralized on our `/donate` page. No upfront payment is required. The suggested donation amounts are clearly outlined in Indian Rupees (INR).",
      "<strong>Booking Protocol:</strong> Bookings are handled via Calendly. No phone number or upfront payment is needed to schedule."
    ],
    heading5: "5. Intellectual Property",
    para5: "All original content, logos, custom SVG chart renderers, calculations, and visual designs featured on this website are the intellectual property of Rahul Bali Astrology. You may not reproduce, redistribute, or monetize any part of this website without explicit written permission.",
    heading6: "6. Support & Contact",
    para6: "If you have any questions, clarifications, or support requests regarding our terms, please reach out to us at:",
    emailLabel: "Email: ",
  },
  hi: {
    title: "सेवा की शर्तें",
    subtitle: "दिशानिर्देश और अस्वीकरण",
    description: "हमारे डिजिटल टूल का उपयोग करने और परामर्श बुक करने से पहले कृपया हमारी सेवा की शर्तों और ज्योतिषीय अस्वीकरणों को ध्यान से पढ़ें।",
    heading1: "1. शर्तों की स्वीकृति",
    para1: "वेबसाइट astro.rahulbali.in ('वेबसाइट') और राहुल बाली ज्योतिष द्वारा प्रदान की जाने वाली किसी भी सेवा, गणना या टूल का उपयोग करके, आप इन सेवा की शर्तों का पालन करने और उनसे बंधे होने के लिए सहमत हैं। यदि आप सहमत नहीं हैं, तो कृपया हमारी सेवाओं का उपयोग न करें।",
    heading2: "2. ज्योतिषीय मार्गदर्शन की प्रकृति और अस्वीकरण",
    para2: "वैदिक ज्योतिष (ज्योतिष) एक प्राचीन, व्याख्यात्मक विज्ञान है। पंडित राहुल बाली जी के साथ सभी ज्योतिषीय विश्लेषण, कुंडली, विभागीय चार्ट गणना और परामर्श:",
    list1: [
      "केवल आत्म-जागरूकता, आध्यात्मिक मार्गदर्शन और शैक्षिक उद्देश्यों के लिए हैं।",
      "पूर्ण या कानूनी रूप से बाध्यकारी भविष्यवाणियों का गठन नहीं करते हैं।",
      "इन्हें कभी भी पेशेवर चिकित्सा, मनोरोग, वित्तीय, कानूनी या करियर सलाहकार सलाह के विकल्प के रूप में नहीं माना जाना चाहिए। आपके द्वारा लिया गया कोई भी निर्णय पूरी तरह से आपकी व्यक्तिगत जिम्मेदारी है।"
    ],
    heading3: "3. उपयोगकर्ता इनपुट और गणना",
    para3: "हमारे उपकरण, जिनमें मुफ्त ऑनलाइन कुंडली, दैनिक पंचांग, जैव-लय और पंच पक्षी शामिल हैं, सटीक खगोलीय गणना (लाहिड़ी अयनांश) पर भरोसा करते हैं। सटीक परिणाम सुनिश्चित करने के लिए:",
    list2: [
      "आप सटीक जन्म विवरण (तारीख, समय और स्थान/निर्देशांक) दर्ज करने के लिए जिम्मेदार हैं।",
      "डेटाबेस की सुरक्षा और गणना की विश्वसनीयता सुनिश्चित करने के लिए हम सभी इनपुट फ़ॉर्म को सैनिटाइज और वैलिडेट करते हैं।",
      "गलत उपयोगकर्ता इनपुट के कारण होने वाली किसी भी विसंगति के लिए यह प्लेटफ़ॉर्म जिम्मेदार नहीं है।"
    ],
    heading4: "4. परामर्श और भुगतान",
    para4: "नियुक्ति और वित्तीय योगदान स्पष्ट, केंद्रीकृत नियमों द्वारा शासित होते हैं:",
    list3: [
      "<strong>अवधि:</strong> लाइव 1-ऑन-1 परामर्श ठीक 30 मिनट की अवधि का होता है, जो सुरक्षित वीडियो सत्र (Google Meet) के माध्यम से आयोजित किया जाता है।",
      "<strong>सुझाए गए योगदान:</strong> ज्योतिषीय सेवाएं स्वैच्छिक दान मॉडल पर काम करती हैं, जो हमारे `/donate` पृष्ठ पर केंद्रीकृत है। कोई अग्रिम भुगतान की आवश्यकता नहीं है। सुझाए गए दान की राशि भारतीय रुपये (INR) में स्पष्ट रूप से बताई गई है।",
      "<strong>बुकिंग प्रोटोकॉल:</strong> बुकिंग कैलेंडर के माध्यम से संभाली जाती है। शेड्यूल करने के लिए किसी फ़ोन नंबर या अग्रिम भुगतान की आवश्यकता नहीं है।"
    ],
    heading5: "5. बौद्धिक संपदा",
    para5: "इस वेबसाइट पर प्रदर्शित सभी मूल सामग्री, लोगो, कस्टम एसवीजी चार्ट रेंडरर्स, गणना और दृश्य डिजाइन राहुल बाली ज्योतिष की बौद्धिक संपदा हैं। आप स्पष्ट लिखित अनुमति के बिना इस वेबसाइट के किसी भी हिस्से को पुन: पेश, पुनर्वितरित या मुद्रीकृत नहीं कर सकते हैं।",
    heading6: "6. सहायता और संपर्क",
    para6: "यदि आपके पास हमारी शर्तों के संबंध में कोई प्रश्न, स्पष्टीकरण या सहायता अनुरोध हैं, तो कृपया हमसे यहां संपर्क करें:",
    emailLabel: "ईमेल: ",
  }
};

export default function TermsContent() {
  const { lang } = useLanguage();
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  return (
    <main className="min-h-screen bg-surface">
      <Navbar />
      <PageHeader
        title={t.title}
        subtitle={t.subtitle}
        description={t.description}
      />

      <section className="py-20 bg-surface">
        <div className="max-w-4xl mx-auto px-8">
          <div className="prose prose-sm md:prose-base max-w-none text-on-surface font-body leading-relaxed space-y-10">

            <div className="space-y-4">
              <h2 className="text-xl md:text-2xl font-normal font-headline text-on-surface">{t.heading1}</h2>
              <p className="text-on-surface/90">{t.para1}</p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl md:text-2xl font-normal font-headline text-on-surface">{t.heading2}</h2>
              <p className="text-on-surface/90">{t.para2}</p>
              <ul className="list-disc pl-6 space-y-2 text-on-surface/90">
                {t.list1.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl md:text-2xl font-normal font-headline text-on-surface">{t.heading3}</h2>
              <p className="text-on-surface/90">{t.para3}</p>
              <ul className="list-disc pl-6 space-y-2 text-on-surface/90">
                {t.list2.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl md:text-2xl font-normal font-headline text-on-surface">{t.heading4}</h2>
              <p className="text-on-surface/90">{t.para4}</p>
              <ul className="list-disc pl-6 space-y-4 text-on-surface/90">
                {t.list3.map((item, idx) => (
                  <li key={idx} dangerouslySetInnerHTML={{ __html: item }} />
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl md:text-2xl font-normal font-headline text-on-surface">{t.heading5}</h2>
              <p className="text-on-surface/90">{t.para5}</p>
            </div>

            <div className="space-y-4 border-t border-outline/20 pt-8">
              <h2 className="text-xl md:text-2xl font-normal font-headline text-on-surface">{t.heading6}</h2>
              <p className="text-on-surface/90">{t.para6}</p>
              <p className="font-semibold text-accent">
                {t.emailLabel}
                <a href="mailto:rahulbaliastrology@gmail.com" className="underline hover:text-accent/80 transition-colors">
                  rahulbaliastrology@gmail.com
                </a>
              </p>
            </div>

            <p className="text-center pt-8 text-sm text-on-surface/60 font-hindi">
              ।। ॐ नमो भगवते वासुदेवाय नम: ।।
            </p>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
