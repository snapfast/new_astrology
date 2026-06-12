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

  // Listen for custom openBookingModal event
  useEffect(() => {
    const handleOpenModal = () => setIsBookingModalOpen(true);
    window.addEventListener('openBookingModal', handleOpenModal);
    return () => window.removeEventListener('openBookingModal', handleOpenModal);
  }, []);

  // Lock scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      return () => {
        document.body.style.overflow = originalOverflow || '';
      };
    }
  }, [isMenuOpen]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Free Horoscope', href: '/free-horoscope', highlight: true },
    { name: 'Panchang', href: '/panchang' },
    { name: 'Biorhythm', href: '/biorhythm' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Reviews', href: '/reviews' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <>
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-outline/20 antialiased print:hidden">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between px-4 py-2 md:px-8 md:py-4 w-full">
        <div className="flex items-center shrink-0">
          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="md:hidden p-2 -ml-2 mr-2 text-on-surface flex items-center justify-center hover:bg-black/5 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            aria-label="Open Menu"
          >
            <span className="material-symbols-outlined !text-2xl">menu</span>
          </button>

          {/* Logo */}
          <Link href="/" className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 rounded-lg">
            <Logo />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8 font-medium text-sm text-on-surface font-body">
          {navLinks.filter(link => link.href !== '/').map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? 'page' : undefined}
                className={`transition-all duration-300 hover:text-on-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-sm ${
                  isActive
                    ? 'text-on-surface font-semibold underline underline-offset-8 decoration-accent/40'
                    : link.highlight
                      ? 'text-accent font-medium'
                      : 'text-on-surface'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 md:gap-4 shrink-0">
          <button
            onClick={handleBookNow}
            className="bg-primary text-white px-4 md:px-8 py-2.5 rounded-full font-medium text-[11px] md:text-sm tracking-[0.1em] uppercase shadow-sm active:scale-95 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
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
          <Link href="/" onClick={closeMenu} className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-lg">
            <Logo />
          </Link>
          <button
            onClick={closeMenu}
            className="p-2 -mr-2 text-on-surface hover:bg-black/5 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            aria-label="Close Menu"
          >
            <span className="material-symbols-outlined !text-2xl">close</span>
          </button>
        </div>

        <div className="flex flex-col gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <div key={link.href} className="px-1">
                <Link
                  href={link.href}
                  onClick={closeMenu}
                  aria-current={isActive ? 'page' : undefined}
                  className={`text-3xl font-headline tracking-tight py-1 block transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-8 rounded-lg ${
                    isActive ? 'text-accent font-semibold' : link.highlight ? 'text-accent' : 'text-on-surface'
                  }`}
                >
                  {link.name}
                </Link>
              </div>
            );
          })}
        </div>

        <div className="mt-auto pt-10 pb-8 border-t border-outline/50 shrink-0">
          <button
            onClick={handleBookNow}
            className="w-full bg-primary text-white py-4 rounded-full font-medium text-xs tracking-[0.1em] uppercase text-center shadow-lg active:scale-[0.98] transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            Book a Consultation Now
          </button>
          <div className="flex flex-col items-center mt-8 gap-2">
            <p className="text-[11px] text-on-surface font-body tracking-wider uppercase">
              Gurugram, India
            </p>
            <p className="text-lg text-accent font-body">
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
