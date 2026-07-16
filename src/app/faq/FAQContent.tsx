'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';
import JsonLd from '@/components/JsonLd';
import { useLanguage } from '@/context/LanguageContext';
import { cn } from '@/lib/utils';

const TRANSLATIONS = {
  en: {
    title: "Frequently Asked Questions",
    subtitle: "Knowledge & Wisdom",
    description: "Explore detailed answers regarding Vedic Astrology, Shodashavarga (Divisional) Charts, the Panch Pakshi system, and personal Biorhythm tracking.",

    sectionVargaTitle: "1. All 17 Varga (Divisional) Charts Reference",
    sectionVargaDesc: "In Vedic Astrology, divisional charts (Vargas) offer deeper insight into specific facets of a native's life, showing planetary strengths not visible in the primary Lagna chart. Here is the comprehensive list of all 17 charts supported on our platform:",

    charts: [
      { id: "D1", name: "Rashi / Lagna Chart", hi: "लग्न कुंडली", translit: "Lagna Kundli", usage: "Acts as the physical foundation of existence. Maps personality, health, longevity, physical features, and the primary blueprint of life." },
      { id: "D2 (Parashara)", name: "Hora Chart", hi: "होरा कुंडली", translit: "Hora Kundli", usage: "Indicates wealth accumulation, liquid assets, resources, financial status, values, and family speech." },
      { id: "D2 (Uma Shambhu)", name: "Uma Shambhu Hora Chart", hi: "उमा शंभू होरा कुंडली", translit: "Uma Shambhu Hora Kundli", usage: "An advanced divisional chart used to analyze spiritual wealth, dual energies, harmony, and divine grace." },
      { id: "D3", name: "Drekkana Chart", hi: "द्रेष्काण कुंडली", translit: "Drekkana Kundli", usage: "Analyzes siblings, courage, determination, physical drive, short journeys, and overall vitality." },
      { id: "D4", name: "Chaturthamsa Chart", hi: "चतुर्थांश कुंडली", translit: "Chaturthamsa Kundli", usage: "Focuses on landed properties, home environment, overall happiness, wealth assets, and fixed properties." },
      { id: "D7", name: "Saptamsha Chart", hi: "सप्तमंश कुंडली", translit: "Saptamsha Kundli", usage: "Deals with progeny, children, grandchildren, their health, legacy, and your creative potential." },
      { id: "D9", name: "Navamsha Chart", hi: "नवांश कुंडली", translit: "Navamsha Kundli", usage: "The most vital divisional chart. Reveals spouse characteristics, marital life, partnerships, inner strength of planets, and spiritual growth after marriage." },
      { id: "D10", name: "Dashamsha Chart", hi: "दशमांश कुंडली", translit: "Dashamsha Kundli", usage: "Analyzes career, professional achievements, business prospects, public status, authority, and accomplishments." },
      { id: "D12", name: "Dwadashamsa Chart", hi: "द्वादशांश कुंडली", translit: "Dwadashamsa Kundli", usage: "Unlocks parent-child relationship, ancestral heritage, lineage karma, genetic patterns, and past karmas." },
      { id: "D16", name: "Shodashamsa Chart", hi: "षोडशांश कुंडली", translit: "Shodashamsa Kundli", usage: "Represents vehicles, transport luxuries, mental peace, happiness, and comforts of materialistic life." },
      { id: "D20", name: "Vimshamsa Chart", hi: "विंशांश कुंडली", translit: "Vimshamsa Kundli", usage: "Examines spiritual evolution, progress in meditation, deep devotion, religious accomplishments, and divine protection." },
      { id: "D24", name: "Siddhamsa / Chaturvimshamsa", hi: "सिद्धांश कुंडली", translit: "Siddhamsa Kundli", usage: "Maps intellectual capacity, academic successes, professional learning, skill mastery, and research." },
      { id: "D27", name: "Saptavimshamsa Chart", hi: "सप्तविंशांश कुंडली", translit: "Saptavimshamsa Kundli", usage: "Measures physical strength, subconscious blockages, vulnerabilities, physical stamina, and planetary energies." },
      { id: "D30", name: "Trimsamsa Chart", hi: "त्रिशांश कुंडली", translit: "Trimsamsa Kundli", usage: "Highlights miseries, accidents, health blockages, diseases, obstacles, and unresolved karma." },
      { id: "D40", name: "Khavedamsa / Swavedamsa", hi: "खवेदांश कुंडली", translit: "Khavedamsa Kundli", usage: "Tracks the overall auspicious and inauspicious fruits of karma and ancestral legacy on the mother's side." },
      { id: "D45", name: "Akshavedamsa Chart", hi: "अक्षवेदांश कुंडली", translit: "Akshavedamsa Kundli", usage: "Delineates deep character traits, integrity, ethics, and ancestral legacy on the father's side." },
      { id: "D60", name: "Shashtiamsha Chart", hi: "षष्ट्यंश कुंडली", translit: "Shashtiamsha Kundli", usage: "Past-life karma verification. It is the ultra-high precision chart used to verify every single area of life and confirm planetary strength." }
    ],

    faqs: [
      {
        q: "What are Varga charts and why are they important in Vedic Astrology?",
        a: "Varga charts are divisional charts. We divide a Rashi (30° zodiac sign) into smaller parts. Each part shows a different area of your life. For example, D9 Navamsha shows marriage and spouse characteristics, D10 Dashamsha shows career and public fame, and D30 Trimsamsa shows health and obstacles. While your main D1 Lagna Kundli shows your physical life, these Varga charts show the inner strength of the Grahas (planets) to give very deep and accurate predictions."
      },
      {
        q: "What is the Panch Pakshi (or Panch Oakshi) Astrology system?",
        a: "The Panch Pakshi (sometimes called Panch Oakshi) system is a very powerful five-bird astrology system from South India. It is based on the five main elements (Pancha Mahabhutas). Your birth Nakshatra (lunar mansion) and the Paksha (waxing or waning phase of the Moon) decide which of the 5 birds is your personal bird (Falcon/Vulture, Owl, Crow, Rooster, Peacock). Each bird goes through 5 activities every day: Ruling, Eating, Walking, Sleeping, and Dying. 'Ruling' is when you are strongest, and 'Dying' is when you should avoid starting new work. This is highly useful for picking the best time (Muhurta) for daily activities."
      },
      {
        q: "How does the Biorhythm (or Biothytm) tracker assist in self-awareness?",
        a: "The Biorhythm (often searched as Biothytm) tracker is a way to map your natural life cycles from birth. Just like the Moon has its waxing and waning phases (Shukla and Krishna Paksha), your body and mind also have cycles. The physical cycle is 23 days (good for stamina), the emotional cycle is 28 days (good for feelings and creativity), and the intellectual cycle is 33 days (good for mental focus). By tracking these rising and falling waves, you can plan your important work during peak days and rest when your energies are low."
      },
      {
        q: "How are the planet positions (Grahas) and charts calculated on this platform?",
        a: "We calculate the positions of all Grahas (Planets) using a highly precise astronomical library called 'astronomy-engine' from the open internet. This library uses advanced mathematical models to find the real physical positions of the celestial bodies in space (using Tropical or Sayana coordinates). To make this information useful for Vedic Astrology, we convert these coordinates into the Sidereal (Nirayana) system. We do this by applying the traditional Chitra Paksha Lahiri Ayanamsa, which corrects for the earth's natural wobble (precession of the equinoxes). This accurate math is what generates your correct Janam Kundli, all 17 Varga (divisional) charts, precise Vimshottari Dasha timings, and Daily Panchang elements (like Tithi, Nakshatra, Yoga, and Karana)."
      },
      {
        q: "How can I book a personal verified consultation?",
        a: "While automated digital charts provide an excellent starting reference, a direct consultation with Pandit Rahul Bali Ji is essential for personalized karmic remedies, precise time rectification, and life counseling. You can schedule a session via our 'Book Consultation' modals or explore options on the /services page."
      }
    ]
  },
  hi: {
    title: "अक्सर पूछे जाने वाले प्रश्न",
    subtitle: "ज्ञान और विवेक",
    description: "वैदिक ज्योतिष, षोडशवर्ग (विभागीय) कुंडली, पंच पक्षी प्रणाली और व्यक्तिगत बायोरिदम ट्रैकिंग के बारे में विस्तृत उत्तर खोजें।",

    sectionVargaTitle: "1. सभी 17 वर्ग (विभागीय) कुंडली संदर्भ",
    sectionVargaDesc: "वैदिक ज्योतिष में, विभागीय कुंडलियां (वर्ग) जातक के जीवन के विशिष्ट पहलुओं में गहरी अंतर्दृष्टि प्रदान करती हैं, जो मुख्य लग्न कुंडली में दिखाई नहीं देने वाले ग्रहों की शक्तियों को दर्शाती हैं। यहाँ हमारे मंच पर समर्थित सभी 17 कुंडलियों की विस्तृत सूची दी गई है:",

    charts: [
      { id: "D1", name: "Rashi / Lagna Chart", hi: "लग्न कुंडली", translit: "Lagna Kundli", usage: "अस्तित्व की भौतिक आधारशिला के रूप में कार्य करती है। व्यक्तित्व, स्वास्थ्य, दीर्घायु, शारीरिक विशेषताओं और जीवन के प्राथमिक खाके का मानचित्रण करती है।" },
      { id: "D2 (Parashara)", name: "Hora Chart", hi: "होरा कुंडली", translit: "Hora Kundli", usage: "धन संचय, तरल संपत्ति, संसाधनों, वित्तीय स्थिति, मूल्यों और पारिवारिक वाणी को दर्शाती है।" },
      { id: "D2 (Uma Shambhu)", name: "Uma Shambhu Hora Chart", hi: "उमा शंभू होरा कुंडली", translit: "Uma Shambhu Hora Kundli", usage: "आध्यात्मिक धन, दोहरी ऊर्जा, सद्भाव और दिव्य कृपा का विश्लेषण करने के लिए उपयोग की जाने वाली एक उन्नत कुंडली है।" },
      { id: "D3", name: "Drekkana Chart", hi: "द्रेष्काण कुंडली", translit: "Drekkana Kundli", usage: "भाई-बहनों, साहस, दृढ़ संकल्प, शारीरिक इच्छाशक्ति, छोटी यात्राओं और समग्र जीवन शक्ति का विश्लेषण करती है।" },
      { id: "D4", name: "Chaturthamsa Chart", hi: "चतुर्थांश कुंडली", translit: "Chaturthamsa Kundli", usage: "अचल संपत्ति, घरेलू वातावरण, समग्र सुख, धन संपत्ति और संचित सुखों पर ध्यान केंद्रित करती है।" },
      { id: "D7", name: "Saptamsha Chart", hi: "सप्तमंश कुंडली", translit: "Saptamsha Kundli", usage: "संतान, पुत्र-पुत्री, पोते-पोतियों, उनके स्वास्थ्य, वंश और आपकी रचनात्मक क्षमता से संबंधित है।" },
      { id: "D9", name: "Navamsha Chart", hi: "नवांश कुंडली", translit: "Navamsha Kundli", usage: "सबसे महत्वपूर्ण विभागीय कुंडली। जीवनसाथी के गुण, वैवाहिक जीवन, साझेदारी, ग्रहों की आंतरिक शक्ति और विवाह के बाद आध्यात्मिक विकास को प्रकट करती है।" },
      { id: "D10", name: "Dashamsha Chart", hi: "दशमांश कुंडली", translit: "Dashamsha Kundli", usage: "करियर, व्यावसायिक उपलब्धियों, व्यावसायिक संभावनाओं, सार्वजनिक स्थिति, अधिकार और उपलब्धियों का विश्लेषण करती है।" },
      { id: "D12", name: "Dwadashamsa Chart", hi: "द्वादशांश कुंडली", translit: "Dwadashamsa Kundli", usage: "माता-पिता के साथ संबंध, पैतृक विरासत, वंश कर्म, आनुवंशिक पैटर्न और पूर्व कर्मों को उजागर करती है।" },
      { id: "D16", name: "Shodashamsa Chart", hi: "षोडशांश कुंडली", translit: "Shodashamsa Kundli", usage: "वाहनों, परिवहन सुखों, मानसिक शांति, खुशी और भौतिकवादी जीवन के सुख-सुविधाओं का प्रतिनिधित्व करती है।" },
      { id: "D20", name: "Vimshamsa Chart", hi: "विंशांश कुंडली", translit: "Vimshamsa Kundli", usage: "आध्यात्मिक विकास, ध्यान में प्रगति, गहरी भक्ति, धार्मिक उपलब्धियों और दैवीय सुरक्षा की जांच करती है।" },
      { id: "D24", name: "Siddhamsa / Chaturvimshamsa", hi: "सिद्धांश कुंडली", translit: "Siddhamsa Kundli", usage: "बौद्धिक क्षमता, शैक्षणिक सफलताओं, व्यावसायिक शिक्षा, कौशल दक्षता और शोध का मानचित्रण करती है।" },
      { id: "D27", name: "Saptavimshamsa Chart", hi: "सप्तविंशांश कुंडली", translit: "Saptavimshamsa Kundli", usage: "शारीरिक शक्ति, अवचेतन बाधाओं, कमजोरियों, शारीरिक सहनशक्ति और ग्रहों की ऊर्जा को मापती है।" },
      { id: "D30", name: "Trimsamsa Chart", hi: "त्रिशांश कुंडली", translit: "Trimsamsa Kundli", usage: "दुखों, दुर्घटनाओं, स्वास्थ्य बाधाओं, बीमारियों, रुकावटों और अनसुलझे कर्मों पर प्रकाश डालती है।" },
      { id: "D40", name: "Khavedamsa / Swavedamsa", hi: "खवेदांश कुंडली", translit: "Khavedamsa Kundli", usage: "कर्मों के समग्र शुभ और अशुभ फलों और मातृ पक्ष की पैतृक विरासत को ट्रैक करती है।" },
      { id: "D45", name: "Akshavedamsa Chart", hi: "अक्षवेदांश कुंडली", translit: "Akshavedamsa Kundli", usage: "गहन चरित्र लक्षणों, सत्यनिष्ठा, नैतिकता और पितृ पक्ष की पैतृक विरासत को रेखांकित करती है।" },
      { id: "D60", name: "Shashtiamsha Chart", hi: "षष्ट्यंश कुंडली", translit: "Shashtiamsha Kundli", usage: "पिछले जीवन के कर्मों का सत्यापन। यह जीवन के प्रत्येक क्षेत्र को सत्यापित करने और ग्रहों की वास्तविक शक्ति की पुष्टि करने के लिए उपयोग की जाने वाली एक अति-उच्च परिशुद्धता वाली कुंडली है।" }
    ],

    faqs: [
      {
        q: "वर्ग कुंडली (विभागीय कुंडली) क्या हैं और वैदिक ज्योतिष में इनका क्या महत्व है?",
        a: "वर्ग कुंडलियां विभागीय कुंडलियां हैं। हम एक राशि (30° राशि चक्र) को छोटे भागों में विभाजित करते हैं। प्रत्येक भाग आपके जीवन के एक अलग क्षेत्र को दिखाता है। उदाहरण के लिए, D9 नवांश विवाह और जीवनसाथी के गुणों को दिखाता है, D10 दशमांश करियर और सार्वजनिक प्रसिद्धि को दिखाता है, और D30 त्रिषांश स्वास्थ्य और बाधाओं को दिखाता है। जबकि आपकी मुख्य D1 लग्न कुंडली आपके भौतिक जीवन को दर्शाती है, ये वर्ग कुंडलियां बहुत गहरी और सटीक भविष्यवाणियां देने के लिए ग्रहों की आंतरिक शक्ति को दिखाती हैं।"
      },
      {
        q: "पंच पक्षी (या पंच ओकशी) ज्योतिष प्रणाली क्या है?",
        a: "पंच पक्षी (जिसे कभी-कभी पंच ओकशी भी कहा जाता है) प्रणाली दक्षिण भारत की एक बहुत ही शक्तिशाली पांच-पक्षी ज्योतिष प्रणाली है। यह पांच मुख्य तत्वों (पंच महाभूतों) पर आधारित है। आपका जन्म नक्षत्र और पक्ष (शुक्ल या कृष्ण पक्ष) यह तय करते हैं कि 5 पक्षियों (गिद्ध, उल्लू, कौआ, मुर्गा, मोर) में से कौन सा आपका व्यक्तिगत पक्षी है। प्रत्येक पक्षी हर दिन 5 गतिविधियों से गुजरता है: शासन (Ruling), भोजन (Eating), गमन (Walking), शयन (Sleeping), और मरण (Dying)। 'शासन' वह समय है जब आप सबसे मजबूत होते हैं, और 'मरण' वह समय है जब आपको नया काम शुरू करने से बचना चाहिए। यह दैनिक गतिविधियों के लिए सबसे अच्छा समय (मुहूर्त) चुनने के लिए अत्यधिक उपयोगी है।"
      },
      {
        q: "बायोरिदम (या बायोथायम) ट्रैकर आत्म-जागरूकता में कैसे मदद करता है?",
        a: "बायोरिदम (जिसे अक्सर बायोथायम के रूप में खोजा जाता है) ट्रैकर जन्म से आपके प्राकृतिक जीवन चक्रों को मानचित्रित करने का एक तरीका है। जैसे चंद्रमा के शुक्ल और कृष्ण पक्ष होते हैं, वैसे ही आपके शरीर और मन के भी चक्र होते हैं। शारीरिक चक्र 23 दिनों का होता है (सहनशक्ति के लिए अच्छा), भावनात्मक चक्र 28 दिनों का होता है (भावनाओं और रचनात्मकता के लिए अच्छा), और बौद्धिक चक्र 33 दिनों का होता है (मानसिक ध्यान के लिए अच्छा)। इन उठती और गिरती लहरों को ट्रैक करके, आप शिखर के दिनों में अपने महत्वपूर्ण काम की योजना बना सकते हैं और ऊर्जा कम होने पर आराम कर सकते हैं।"
      },
      {
        q: "इस प्लेटफॉर्म पर ग्रहों (Grahas) की स्थिति और कुंडलियों की गणना कैसे की जाती है?",
        a: "हम खुले इंटरनेट (ओपन इंटरनेट) से 'astronomy-engine' नामक एक अत्यधिक सटीक लाइब्रेरी का उपयोग करके सभी ग्रहों (Grahas) की स्थिति की गणना करते हैं। यह लाइब्रेरी अंतरिक्ष में खगोलीय पिंडों की वास्तविक भौतिक स्थितियों (सायन या Tropical निर्देशांक) को खोजने के लिए उन्नत गणितीय मॉडल का उपयोग करती है। इस जानकारी को वैदिक ज्योतिष के लिए उपयोगी बनाने के लिए, हम इन निर्देशांकों को निरयण (Sidereal) प्रणाली में परिवर्तित करते हैं। हम ऐसा पारंपरिक चित्रा पक्ष लाहिड़ी अयनांश लागू करके करते हैं, जो पृथ्वी के प्राकृतिक डोलन (अयनांश/precession of equinoxes) को ठीक करता है। यही सटीक गणित आपकी सही जन्म कुंडली, सभी 17 वर्ग (विभागीय) कुंडलियां, सटीक विंशोत्तरी दशा समय और दैनिक पंचांग तत्व (जैसे तिथि, नक्षत्र, योग और करण) उत्पन्न करता है।"
      },
      {
        q: "मैं व्यक्तिगत सत्यापित परामर्श कैसे बुक कर सकता हूं?",
        a: "हालांकि स्वचालित डिजिटल कुंडलियां एक उत्कृष्ट प्रारंभिक संदर्भ प्रदान करती हैं, व्यक्तिगत कर्म उपायों, सटीक समय सुधार और जीवन परामर्श के लिए पंडित राहुल बाली जी के साथ सीधा परामर्श आवश्यक है। आप हमारे 'परामर्श बुक करें' मॉडल के माध्यम से एक सत्र निर्धारित कर सकते हैं या /services पृष्ठ पर विकल्पों का पता लगा सकते हैं।"
      }
    ]
  }
};

export default function FAQContent() {
  const { lang } = useLanguage();
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  const [activeTab, setActiveTab] = useState<'vargas' | 'general'>('vargas');

  // Prepare structured JSON-LD FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": t.faqs.map((f) => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.a
      }
    }))
  };

  return (
    <main className="min-h-screen bg-surface">
      <Navbar />
      <JsonLd data={faqSchema} />

      <PageHeader
        title={t.title}
        subtitle={t.subtitle}
        description={t.description}
      />

      <section className="py-12 bg-surface">
        <div className="max-w-6xl mx-auto px-8">

          {/* Navigation Tabs for density and micro-UX */}
          <div className="flex justify-center border-b border-outline/30 mb-12 gap-6">
            <button
              onClick={() => setActiveTab('vargas')}
              className={cn(
                "pb-4 text-sm font-medium uppercase tracking-wider font-label transition-all duration-300 relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                activeTab === 'vargas' ? "text-accent font-bold" : "text-on-surface/60 hover:text-on-surface"
              )}
            >
              {lang === 'en' ? "17 Varga Charts Directory" : "17 वर्ग कुंडली निर्देशिका"}
              {activeTab === 'vargas' && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent rounded-full" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('general')}
              className={cn(
                "pb-4 text-sm font-medium uppercase tracking-wider font-label transition-all duration-300 relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                activeTab === 'general' ? "text-accent font-bold" : "text-on-surface/60 hover:text-on-surface"
              )}
            >
              {lang === 'en' ? "General & Systems FAQ" : "सामान्य एवं प्रणालियाँ FAQ"}
              {activeTab === 'general' && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent rounded-full" />
              )}
            </button>
          </div>

          {activeTab === 'vargas' && (
            <div className="space-y-12 animate-in fade-in duration-300">
              <div className="bg-surface-container-low border border-outline/30 rounded-3xl p-6 md:p-8 text-left">
                <h2 className="text-xl md:text-2xl font-normal font-headline text-on-surface mb-3">{t.sectionVargaTitle}</h2>
                <p className="text-sm md:text-base text-on-surface/90 leading-relaxed font-body">{t.sectionVargaDesc}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {t.charts.map((chart, idx) => (
                  <div key={idx} className="bg-white border border-outline/50 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 text-left">
                    <div className="flex justify-between items-start gap-4 mb-3">
                      <span className="text-xs font-bold text-accent bg-accent/10 px-2.5 py-1 rounded-md uppercase font-label">
                        {chart.id}
                      </span>
                      <div className="text-right">
                        <span className="font-hindi text-sm text-primary block">{chart.hi}</span>
                        <span className="text-[10px] text-on-surface/60 font-medium block">({chart.translit})</span>
                      </div>
                    </div>
                    <h3 className="text-base font-semibold font-headline text-on-surface mb-2">{chart.name}</h3>
                    <p className="text-xs text-on-surface/80 font-body leading-relaxed">{chart.usage}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'general' && (
            <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in duration-300 text-left">
              {t.faqs.map((faq, idx) => (
                <div key={idx} className="bg-white border border-outline/30 rounded-2xl p-6 md:p-8 shadow-sm">
                  <h3 className="text-lg font-medium font-headline text-on-surface mb-3 flex gap-3 items-start">
                    <span className="text-accent shrink-0 select-none">Q.</span>
                    <span>{faq.q}</span>
                  </h3>
                  <div className="text-sm md:text-base text-on-surface/90 leading-relaxed font-body pl-7 border-l-2 border-accent/20">
                    {faq.a}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center pt-16">
            <p className="text-sm text-accent font-hindi">
              ॥ ॐ नमो भगवते वासुदेवाय नमः ॥
            </p>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
