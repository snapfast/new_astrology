'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { sendGAEvent } from '@next/third-parties/google';

const ALL_CARDS = [
  {
    id: 'kundli',
    href: '/free-horoscope',
    icon: 'auto_stories',
    title: {
      en: 'Free Kundli Online',
      hi: 'मुफ्त ऑनलाइन कुंडली'
    },
    desc: {
      en: 'Get accurate Janam Kundli charts and astrological calculations.',
      hi: 'सटीक जन्म कुंडली चार्ट और ज्योतिषीय गणना प्राप्त करें।'
    },
    action: {
      en: 'Generate Chart',
      hi: 'कुंडली बनाएं'
    },
    gaAction: 'explore_kundli',
    paths: ['/free-horoscope', '/horoscope', '/horoscope/compact']
  },
  {
    id: 'panchang',
    href: '/panchang',
    icon: 'wb_sunny',
    title: {
      en: 'Daily Panchang',
      hi: 'दैनिक पंचांग'
    },
    desc: {
      en: "View today's Tithi, Nakshatra, Yoga, and Auspicious Muhurtas.",
      hi: 'आज की तिथि, नक्षत्र, योग और शुभ मुहूर्त देखें।'
    },
    action: {
      en: 'Check Panchang',
      hi: 'पंचांग देखें'
    },
    gaAction: 'explore_panchang',
    paths: ['/panchang']
  },
  {
    id: 'panch-pakshi',
    href: '/panch-pakshi',
    icon: 'flight',
    title: {
      en: 'Panch Pakshi',
      hi: 'पंच पक्षी'
    },
    desc: {
      en: 'Find your birth bird and understand daily peak activity times.',
      hi: 'अपने जन्म पक्षी का पता लगाएं और दैनिक शिखर गतिविधि समय को समझें।'
    },
    action: {
      en: 'Find Birth Bird',
      hi: 'पक्षी खोजें'
    },
    gaAction: 'explore_pakshi',
    paths: ['/panch-pakshi']
  },
  {
    id: 'transits',
    href: '/transits',
    icon: 'sync_alt',
    title: {
      en: 'Planetary Transits',
      hi: 'ग्रह गोचर'
    },
    desc: {
      en: 'Track past and future planetary movements across signs and asterisms.',
      hi: 'राशियों और नक्षत्रों में ग्रहों के पिछले और भविष्य के गोचर को ट्रैक करें।'
    },
    action: {
      en: 'Track Transits',
      hi: 'गोचर देखें'
    },
    gaAction: 'explore_transits',
    paths: ['/transits']
  },
  {
    id: 'biorhythm',
    href: '/biorhythm',
    icon: 'insights',
    title: {
      en: 'Personal Biorhythms',
      hi: 'व्यक्तिगत बायोरिदम'
    },
    desc: {
      en: 'Understand your physical, emotional, and intellectual energy cycles.',
      hi: 'अपने शारीरिक, भावनात्मक और बौद्धिक चक्रों को समझें।'
    },
    action: {
      en: 'Check Biorhythm',
      hi: 'बायोरिदम देखें'
    },
    gaAction: 'explore_biorhythm',
    paths: ['/biorhythm']
  },
  {
    id: 'hora',
    href: '/hora',
    icon: 'hourglass_empty',
    title: {
      en: 'Planetary Hours (Hora)',
      hi: 'ग्रह होरा चक्र'
    },
    desc: {
      en: 'Vedic planetary hours for choosing auspicious timings (muhurtas).',
      hi: 'शुभ मुहूर्त और समय चुनने के लिए वैदिक ग्रह होरा चक्र।'
    },
    action: {
      en: 'View Hora',
      hi: 'होरा देखें'
    },
    gaAction: 'explore_hora',
    paths: ['/hora']
  },
  {
    id: 'transits-table',
    href: '/transits-table',
    icon: 'table_chart',
    title: {
      en: 'Transits Table',
      hi: 'गोचर तालिका'
    },
    desc: {
      en: 'View current live astrological positions of all Vedic planets in a compact table view.',
      hi: 'एक कॉम्पैक्ट टेबल दृश्य में सभी वैदिक ग्रहों की वर्तमान लाइव ज्योतिषीय स्थिति देखें।'
    },
    action: {
      en: 'View Table',
      hi: 'तालिका देखें'
    },
    gaAction: 'explore_transits_table',
    paths: ['/transits-table']
  },
  {
    id: 'booking',
    isButton: true,
    icon: 'chat_bubble',
    title: {
      en: 'Book 1-on-1 Session',
      hi: 'परामर्श सत्र बुक करें'
    },
    desc: {
      en: 'Get solutions for career, relationships, remedies & spiritual path.',
      hi: 'करियर, रिश्तों, उपायों और आध्यात्मिक मार्ग के लिए समाधान प्राप्त करें।'
    },
    action: {
      en: 'Connect Now',
      hi: 'जुड़ें'
    },
    gaAction: 'explore_booking',
    paths: []
  },
  {
    id: 'kp-prashna',
    href: '/kp-horary',
    icon: 'help_center',
    title: {
      en: 'KP Prashna Kundli',
      hi: 'के.पी. प्रश्न कुंडली'
    },
    desc: {
      en: 'Cast a KP Horary chart with a number between 1-249.',
      hi: '1 से 249 तक की संख्या से के.पी. प्रश्न कुंडली बनाएं।'
    },
    action: {
      en: 'Cast Chart',
      hi: 'चार्ट बनाएं'
    },
    gaAction: 'explore_kp_prashna',
    paths: ['/kp-horary', '/kp-horoscope']
  },
].map(card => ({
  ...card,
  lowerPaths: card.paths.map(p => p.toLowerCase())
}));

interface ExploreToolsProps {
  currentPath?: string;
  className?: string;
}

const ExploreTools: React.FC<ExploreToolsProps> = ({ currentPath = '', className = '' }) => {
  const { lang } = useLanguage();

  const filteredCards = useMemo(() => {
    const normalizedPath = currentPath.toLowerCase().trim();

    let bookingCard = null;
    const nonBookingCards = [];

    // Single pass to partition cards and exclude current page
    for (let i = 0; i < ALL_CARDS.length; i++) {
      const card = ALL_CARDS[i];

      // Skip if this card matches the current path
      let matchesPath = false;
      for (let j = 0; j < card.lowerPaths.length; j++) {
        if (normalizedPath.includes(card.lowerPaths[j])) {
          matchesPath = true;
          break;
        }
      }
      if (matchesPath) continue;

      if (card.isButton) {
        bookingCard = card;
      } else {
        nonBookingCards.push(card);
      }
    }

    const result = [];
    if (bookingCard) {
      result.push(bookingCard);
    }

    const limit = bookingCard ? 3 : 4;
    for (let i = 0; i < Math.min(nonBookingCards.length, limit); i++) {
      result.unshift(nonBookingCards[i]); // Put booking card at the end for consistent layout
    }

    return result;
  }, [currentPath]);

  const handleCardClick = (gaAction: string) => {
    sendGAEvent({ event: 'action_click', action_name: gaAction });
  };

  const handleBookingClick = () => {
    sendGAEvent({ event: 'action_click', action_name: 'explore_booking_click' });
    window.dispatchEvent(new CustomEvent('openBookingModal'));
  };

  const sectionTitle = lang === 'en' ? "Explore More Vedic Astrology Tools" : "अन्य वैदिक ज्योतिष उपकरण देखें";
  const sectionDesc = lang === 'en'
    ? "Align your lifestyle and cosmic energies further. Try our precise astronomical tools and personalized services."
    : "अपनी जीवनशैली और ब्रह्मांडीय ऊर्जाओं को और बेहतर बनाएं। हमारे सटीक खगोलीय उपकरणों और व्यक्तिगत सेवाओं का उपयोग करें।";

  return (
    <section className={`py-12 bg-surface-bright relative overflow-hidden border-t border-outline/20 rounded-3xl ${className}`}>
      <div className="max-w-5xl mx-auto px-4 md:px-8 text-center relative z-10">
        <h3 className="text-xl md:text-2xl font-normal mb-2 font-headline text-on-surface">
          {sectionTitle}
        </h3>
        <p className="text-xs md:text-sm text-on-surface/90 font-body mb-8 max-w-xl mx-auto">
          {sectionDesc}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
          {filteredCards.map((card) => {
            const cardTitle = lang === 'hi' && card.title.hi ? card.title.hi : card.title.en;
            const cardDesc = lang === 'hi' && card.desc.hi ? card.desc.hi : card.desc.en;
            const cardAction = lang === 'hi' && card.action.hi ? card.action.hi : card.action.en;

            if (card.isButton) {
              return (
                <button
                  key={card.id}
                  onClick={handleBookingClick}
                  className="bg-white border border-outline/20 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow text-left group flex flex-col justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 active:scale-95 duration-200"
                >
                  <div>
                    <span className="material-symbols-outlined text-accent text-3xl mb-3 block" aria-hidden="true">
                      {card.icon}
                    </span>
                    <h4 className={`text-sm font-headline text-on-surface mb-1 ${lang === 'hi' ? 'font-hindi font-bold' : ''}`}>
                      {cardTitle}
                    </h4>
                    <p className={`text-[11px] text-on-surface/70 leading-relaxed font-body ${lang === 'hi' ? 'font-hindi' : ''}`}>
                      {cardDesc}
                    </p>
                  </div>
                  <span className={`text-[10px] uppercase font-label font-bold text-accent tracking-widest mt-4 flex items-center gap-1 group-hover:translate-x-1 transition-transform ${lang === 'hi' ? 'font-hindi' : ''}`}>
                    {cardAction} &rarr;
                  </span>
                </button>
              );
            }

            return (
              <Link
                key={card.id}
                href={card.href || ''}
                onClick={() => handleCardClick(card.gaAction)}
                className="bg-white border border-outline/20 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow group flex flex-col justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 active:scale-95 duration-200"
              >
                <div>
                  <span className="material-symbols-outlined text-accent text-3xl mb-3 block" aria-hidden="true">
                    {card.icon}
                  </span>
                  <h4 className={`text-sm font-headline text-on-surface mb-1 ${lang === 'hi' ? 'font-hindi font-bold' : ''}`}>
                    {cardTitle}
                  </h4>
                  <p className={`text-[11px] text-on-surface/70 leading-relaxed font-body ${lang === 'hi' ? 'font-hindi' : ''}`}>
                    {cardDesc}
                  </p>
                </div>
                <span className={`text-[10px] uppercase font-label font-bold text-accent tracking-widest mt-4 flex items-center gap-1 group-hover:translate-x-1 transition-transform ${lang === 'hi' ? 'font-hindi' : ''}`}>
                  {cardAction} &rarr;
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ExploreTools;
