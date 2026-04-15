import React from 'react';

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/30">
      <div className="flex justify-between items-center px-8 py-4 max-w-7xl mx-auto">
        <div className="font-headline text-2xl font-bold tracking-tight text-primary">
          Rahul Bali Astrology
        </div>
        <div className="hidden md:flex items-center gap-8">
          <a className="font-headline italic text-lg text-on-surface-variant hover:text-primary transition-colors" href="#consultation">Consultation</a>
          <a className="font-headline italic text-lg text-on-surface-variant hover:text-primary transition-colors" href="#mystical-arts">Mystical Arts</a>
          <a className="font-headline italic text-lg text-on-surface-variant hover:text-primary transition-colors" href="#about">About</a>
          <a className="font-headline italic text-lg text-on-surface-variant hover:text-primary transition-colors" href="#testimonials">Testimonials</a>
        </div>
        <button className="bg-primary text-on-primary px-6 py-2 rounded-lg font-label text-sm uppercase tracking-widest hover:bg-primary-container transition-all active:scale-95 duration-200 ease-in-out">
          Book Now
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
