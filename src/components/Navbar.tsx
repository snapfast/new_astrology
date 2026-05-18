'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import BookConsultationModal from './BookConsultationModal';
import Logo from './Logo';
import { sendGAEvent } from '@next/third-parties/google';

const Navbar = () => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const handleBookNow = () => {
    sendGAEvent({ event: 'action_click', action_name: 'navbar_book_now' });
    setIsBookingModalOpen(true);
    setIsMenuOpen(false);
  };

  const closeMenu = () => setIsMenuOpen(false);

  // Close menu on route change
  useEffect(() => {
    closeMenu();
  }, [pathname]);

  // Lock scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Free Horoscope', href: '/free-horoscope', highlight: true },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Reviews', href: '/reviews' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <>
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-outline/20 antialiased print:hidden">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between px-4 py-3 md:px-8 md:py-6 w-full">
        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMenuOpen(true)}
          className="md:hidden p-2 -ml-2 text-on-surface flex items-center justify-center hover:bg-black/5 rounded-full transition-colors"
          aria-label="Open Menu"
        >
          <span className="material-symbols-outlined !text-2xl">menu</span>
        </button>

        {/* Mobile Logo */}
        <Link href="/" className="md:hidden flex items-center ml-2">
          <Logo />
        </Link>

        <div className="flex-grow md:hidden"></div>

        {/* Desktop Logo */}
        <div className="hidden md:flex items-center shrink-0">
          <Link href="/">
            <Logo />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-10 font-normal text-xs text-secondary font-body">
          <Link href="/free-horoscope" className="text-accent font-medium">Free Horoscope</Link>
          <Link href="/about">About</Link>
          <Link href="/services">Services</Link>
          <Link href="/reviews">Reviews</Link>
          <Link href="/contact">Contact</Link>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 md:gap-4 shrink-0">
          <Link
            href="/free-horoscope"
            className="md:hidden bg-accent text-white px-4 py-2.5 rounded-full font-medium text-[10px] tracking-[0.1em] uppercase text-center min-w-[110px] shadow-sm active:scale-95 transition-transform"
          >
            Free Horoscope
          </Link>
          <button
            onClick={handleBookNow}
            className="bg-primary text-white px-4 md:px-8 py-2.5 rounded-full font-medium text-[10px] md:text-xs tracking-[0.1em] uppercase shadow-sm active:scale-95 transition-transform"
          >
            Book Now
          </button>
        </div>
      </div>
    </nav>

    {/* Mobile Menu Overlay - Moved outside nav for better stacking and background control */}
    <div
      className={`fixed inset-0 bg-surface z-[100] transition-transform duration-300 ease-in-out md:hidden ${
        isMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="flex flex-col h-full p-6 overflow-y-auto">
        <div className="flex items-center justify-between mb-12 shrink-0">
          <Link href="/" onClick={closeMenu}>
            <Logo />
          </Link>
          <button
            onClick={closeMenu}
            className="p-2 -mr-2 text-on-surface hover:bg-black/5 rounded-full transition-colors"
            aria-label="Close Menu"
          >
            <span className="material-symbols-outlined !text-2xl">close</span>
          </button>
        </div>

        <div className="flex flex-col gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              className={`text-3xl font-headline tracking-tight py-1 ${
                link.highlight ? 'text-accent' : 'text-on-surface'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="mt-auto pt-10 pb-8 border-t border-outline/50 shrink-0">
          <button
            onClick={handleBookNow}
            className="w-full bg-primary text-white py-4 rounded-full font-medium text-xs tracking-[0.1em] uppercase text-center shadow-lg active:scale-[0.98] transition-transform"
          >
            Book a Consultation Now
          </button>
          <div className="flex flex-col items-center mt-8 gap-2">
            <p className="text-[10px] text-secondary font-body tracking-wider uppercase">
              Gurugram, India
            </p>
            <p className="text-2xl text-accent italic font-body">
              ।। ॐ नमो भगवते वासुदेवाय नम: ।।
            </p>
          </div>
        </div>
      </div>
    </div>

    <BookConsultationModal
      isOpen={isBookingModalOpen}
      onClose={() => setIsBookingModalOpen(false)}
    />
  </>
  );
};

export default Navbar;
