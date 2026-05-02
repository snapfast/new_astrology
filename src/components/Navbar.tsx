'use client';

import { useState } from 'react';
import Link from 'next/link';
import BookConsultationModal from './BookConsultationModal';
import { sendGAEvent } from '@next/third-parties/google';

const Navbar = () => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const handleBookNow = () => {
    sendGAEvent({ event: 'action_click', action_name: 'navbar_book_now' });
    setIsBookingModalOpen(true);
  };

  return (
    <>
    <nav className="fixed top-0 w-full z-50 bg-white/10 backdrop-blur-md antialiased print:hidden">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between px-4 py-4 md:px-8 md:py-6 w-full">
        <Link href="/" className="text-base sm:text-lg md:text-xl font-normal tracking-tight font-headline flex items-center gap-1">
          <span className="text-on-surface whitespace-nowrap">Rahul Bali</span>
          <span className="text-accent italic whitespace-nowrap">Astrology</span>
        </Link>

        <div className="hidden md:flex items-center gap-10 font-normal text-xs text-secondary font-body">
          <Link href="/free-horoscope" className="text-accent font-medium">Free Horoscope</Link>
          <Link href="/about">About</Link>
          <Link href="/services">Services</Link>
          <Link href="/reviews">Reviews</Link>
          <Link href="/contact">Contact</Link>
        </div>

        <div className="flex items-center shrink-0">
          <button
            onClick={handleBookNow}
            className="bg-primary text-white px-4 md:px-8 py-2.5 rounded-full font-medium text-[10px] md:text-xs tracking-[0.1em] uppercase"
          >
            Book Now
          </button>
        </div>
      </div>

    </nav>
    <BookConsultationModal
      isOpen={isBookingModalOpen}
      onClose={() => setIsBookingModalOpen(false)}
    />
  </>
  );
};

export default Navbar;
