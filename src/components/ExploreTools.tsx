'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { sendGAEvent } from '@next/third-parties/google';

const ALL_CARDS = [
  {
    id: 'kundli',
    href: '/free-horoscope',
    icon: 'auto_stories',
    title: 'Free Kundli Online',
    desc: 'Get accurate Janam Kundli charts and astrological calculations.',
    action: 'Generate Chart',
    gaAction: 'explore_kundli',
    paths: ['/free-horoscope', '/horoscope', '/horoscope/compact']
  },
  {
    id: 'panchang',
    href: '/panchang',
    icon: 'wb_sunny',
    title: 'Daily Panchang',
    desc: "View today's Tithi, Nakshatra, Yoga, and Auspicious Muhurtas.",
    action: 'Check Panchang',
    gaAction: 'explore_panchang',
    paths: ['/panchang']
  },
  {
    id: 'panch-pakshi',
    href: '/panch-pakshi',
    icon: 'flight',
    title: 'Panch Pakshi',
    desc: 'Find your birth bird and understand daily peak activity times.',
    action: 'Find Birth Bird',
    gaAction: 'explore_pakshi',
    paths: ['/panch-pakshi']
  },
  {
    id: 'transits',
    href: '/transits',
    icon: 'sync_alt',
    title: 'Planetary Transits',
    desc: 'Track past and future planetary movements across signs and asterisms.',
    action: 'Track Transits',
    gaAction: 'explore_transits',
    paths: ['/transits']
  },
  {
    id: 'biorhythm',
    href: '/biorhythm',
    icon: 'insights',
    title: 'Personal Biorhythms',
    desc: 'Understand your physical, emotional, and intellectual energy cycles.',
    action: 'Check Biorhythm',
    gaAction: 'explore_biorhythm',
    paths: ['/biorhythm']
  },
  {
    id: 'hora',
    href: '/hora',
    icon: 'hourglass_empty',
    title: 'Planetary Hours (Hora)',
    desc: 'Vedic planetary hours for choosing auspicious timings (muhurtas).',
    action: 'View Hora',
    gaAction: 'explore_hora',
    paths: ['/hora']
  },
  {
    id: 'transits-table',
    href: '/transits-table',
    icon: 'table_chart',
    title: 'Transits Table',
    desc: 'View current live astrological positions of all Vedic planets in a compact table view.',
    action: 'View Table',
    gaAction: 'explore_transits_table',
    paths: ['/transits-table']
  },
  {
    id: 'booking',
    isButton: true,
    icon: 'chat_bubble',
    title: 'Book 1-on-1 Session',
    desc: 'Get solutions for career, relationships, remedies & spiritual path.',
    action: 'Connect Now',
    gaAction: 'explore_booking',
    paths: []
  },
  {
    id: 'kp-prashna',
    href: '/kp-horary',
    icon: 'help_center',
    title: 'KP Prashna Kundli',
    desc: 'Cast a KP Horary chart with a number between 1-249.',
    action: 'Cast Chart',
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

  const sectionTitle = "Explore More Vedic Astrology Tools";
  const sectionDesc = "Align your lifestyle and cosmic energies further. Try our precise astronomical tools and personalized services.";

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
                    <h4 className="text-sm font-headline text-on-surface mb-1">
                      {card.title}
                    </h4>
                    <p className="text-[11px] text-on-surface/70 leading-relaxed font-body">
                      {card.desc}
                    </p>
                  </div>
                  <span className="text-[10px] uppercase font-label font-bold text-accent tracking-widest mt-4 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    {card.action} &rarr;
                  </span>
                </button>
              );
            }

            return (
              <Link prefetch={true}
                key={card.id}
                href={card.href || ''}
                onClick={() => handleCardClick(card.gaAction)}
                className="bg-white border border-outline/20 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow group flex flex-col justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 active:scale-95 duration-200"
              >
                <div>
                  <span className="material-symbols-outlined text-accent text-3xl mb-3 block" aria-hidden="true">
                    {card.icon}
                  </span>
                  <h4 className="text-sm font-headline text-on-surface mb-1">
                    {card.title}
                  </h4>
                  <p className="text-[11px] text-on-surface/70 leading-relaxed font-body">
                    {card.desc}
                  </p>
                </div>
                <span className="text-[10px] uppercase font-label font-bold text-accent tracking-widest mt-4 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  {card.action} &rarr;
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
