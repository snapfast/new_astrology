'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';
import { useLanguage } from '@/context/LanguageContext';

const TRANSLATIONS = {
  en: {
    title: "Privacy Policy",
    subtitle: "Trust & Transparency",
    description: "We value your trust. Learn how your birth details and personal information are handled with absolute confidentiality.",
    heading1: "1. Introduction",
    para1: "Welcome to Rahul Bali Astrology. We are committed to protecting your privacy and ensuring that your personal and astrological data is handled securely and transparently. This Privacy Policy describes how we collect, use, and safeguard your information when you visit our website and use our services.",
    heading2: "2. Information We Collect",
    para2: "To provide accurate Vedic astrological calculations, we collect the following details when you generate a birth chart or book a consultation:",
    list1: [
      "Personal details (Name, Email address)",
      "Astrological data (Exact Date of Birth, Time of Birth, and Place/Coordinates of Birth)",
      "Anonymized usage statistics and navigation data via Google Analytics (if permitted)"
    ],
    heading3: "3. How We Use Your Information",
    para3: "Your data is strictly processed to deliver precise, personalized astrological insights:",
    list2: [
      "To calculate planetary degrees, divisional charts (D1, D3, D9, D10, D7, D60), Vimshottari Dasha, Panchang, and Panch Pakshi bird activity.",
      "To schedule and coordinate live 1-on-1 consultations (securely via Calendly).",
      "To improve our website performance, layout stability, and user experience."
    ],
    heading4: "4. Confidentiality & Security",
    para4: "We adhere to a strict confidentiality protocol. Your birth details are used solely for calculations and are never shared, sold, or rented to any third parties. All input forms use secure protocols, and localized inputs like birth place coordinates are validated and sanitized to prevent unauthorized access.",
    heading5: "5. Third-Party Integrations",
    para5: "Our platform integrates with trusted external service providers:",
    list3: [
      "<strong>Calendly:</strong> Used exclusively for secure appointment bookings.",
      "<strong>Google Analytics:</strong> Collects anonymous usage trends to optimize the speed and reach of our services.",
      "<strong>Donations:</strong> UPI QR Codes and PayPal integrations are processed directly by the respective financial gateways; no payment credentials or card details are ever stored on our servers."
    ],
    heading6: "6. Contact Us",
    para6: "If you have any questions or concerns regarding this Privacy Policy or your data, please contact us at:",
    emailLabel: "Email: ",
  },
  hi: {
    title: "गोपनीयता नीति",
    subtitle: "विश्वास और पारदर्शिता",
    description: "हम आपके विश्वास का सम्मान करते हैं। जानें कि आपके जन्म विवरण और व्यक्तिगत जानकारी को पूर्ण गोपनीयता के साथ कैसे संभाला जाता है।",
    heading1: "1. परिचय",
    para1: "राहुल बाली ज्योतिष में आपका स्वागत है। हम आपकी गोपनीयता की रक्षा करने और यह सुनिश्चित करने के लिए प्रतिबद्ध हैं कि आपका व्यक्तिगत और ज्योतिषीय डेटा सुरक्षित और पारदर्शी रूप से संभाला जाए। यह गोपनीयता नीति बताती है कि जब आप हमारी वेबसाइट पर आते हैं और हमारी सेवाओं का उपयोग करते हैं तो हम आपकी जानकारी को कैसे एकत्र, उपयोग और सुरक्षित करते हैं।",
    heading2: "2. जानकारी जो हम एकत्र करते हैं",
    para2: "सटीक वैदिक ज्योतिषीय गणना प्रदान करने के लिए, जब आप जन्म कुंडली बनाते हैं या परामर्श बुक करते हैं तो हम निम्नलिखित विवरण एकत्र करते हैं:",
    list1: [
      "व्यक्तिगत विवरण (नाम, ईमेल पता)",
      "ज्योतिषीय डेटा (सटीक जन्म तिथि, जन्म समय, और जन्म स्थान/निर्देशांक)",
      "गूगल एनालिटिक्स के माध्यम से अनाम उपयोग के आंकड़े और नेविगेशन डेटा"
    ],
    heading3: "3. हम आपकी जानकारी का उपयोग कैसे करते हैं",
    para3: "सटीक, व्यक्तिगत ज्योतिषीय अंतर्दृष्टि प्रदान करने के लिए आपके डेटा को कड़ाई से संसाधित किया जाता है:",
    list2: [
      "ग्रहों की डिग्री, विभागीय कुंडली (D1, D3, D9, D10, D7, D60), विंशोत्तरी दशा, पंचांग, और पंच पक्षी गतिविधि की गणना करने के लिए।",
      "लाइव 1-ऑन-1 परामर्श (कैलेंडली के माध्यम से सुरक्षित रूप से) को निर्धारित और समन्वयित करने के लिए।",
      "हमारी वेबसाइट के प्रदर्शन, लेआउट स्थिरता और उपयोगकर्ता अनुभव को बेहतर बनाने के लिए।"
    ],
    heading4: "4. गोपनीयता और सुरक्षा",
    para4: "हम एक सख्त गोपनीयता प्रोटोकॉल का पालन करते हैं। आपके जन्म विवरण का उपयोग केवल गणना के लिए किया जाता है और इसे कभी भी किसी तीसरे पक्ष के साथ साझा, बेचा या किराए पर नहीं दिया जाता है। सभी इनपुट फ़ॉर्म सुरक्षित प्रोटोकॉल का उपयोग करते हैं, और जन्म स्थान के निर्देशांक को अनधिकृत पहुंच को रोकने के लिए सैनिटाइज किया जाता है।",
    heading5: "5. तृतीय-पक्ष एकीकरण",
    para5: "हमारा प्लेटफ़ॉर्म विश्वसनीय बाहरी सेवा प्रदाताओं के साथ एकीकृत है:",
    list3: [
      "<strong>Calendly:</strong> विशेष रूप से सुरक्षित अपॉइंटमेंट बुकिंग के लिए उपयोग किया जाता है।",
      "<strong>Google Analytics:</strong> हमारी सेवाओं की गति और पहुंच को अनुकूलित करने के लिए अनाम उपयोग प्रवृत्तियों को एकत्र करता है।",
      "<strong>Donations:</strong> यूपीआई क्यूआर कोड और पेपाल भुगतान संबंधित वित्तीय गेटवे द्वारा सीधे संसाधित किए जाते हैं; कोई भी कार्ड विवरण हमारे सर्वर पर संग्रहीत नहीं किया जाता है।"
    ],
    heading6: "6. हमसे संपर्क करें",
    para6: "यदि इस गोपनीयता नीति या आपके डेटा के संबंध में आपके कोई प्रश्न या चिंताएं हैं, तो कृपया हमसे संपर्क करें:",
    emailLabel: "ईमेल: ",
  }
};

export default function PrivacyContent() {
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
            </div>

            <div className="space-y-4">
              <h2 className="text-xl md:text-2xl font-normal font-headline text-on-surface">{t.heading5}</h2>
              <p className="text-on-surface/90">{t.para5}</p>
              <ul className="list-disc pl-6 space-y-4 text-on-surface/90">
                {t.list3.map((item, idx) => (
                  <li key={idx} dangerouslySetInnerHTML={{ __html: item }} />
                ))}
              </ul>
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
