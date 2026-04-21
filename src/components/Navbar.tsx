import React from 'react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/10 backdrop-blur-md antialiased">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between px-8 py-6 w-full">
        <div className="text-xl font-normal tracking-tight font-headline flex items-center gap-1">
          <span className="text-on-surface">Rahul Bali</span>
          <span className="text-accent italic">Jyotishi</span>
        </div>

        <div className="hidden md:flex items-center gap-10 font-normal text-xs text-secondary font-body">
          <Link className="hover:text-on-surface transition-colors" href="/about">About</Link>
          <Link className="hover:text-on-surface transition-colors" href="/services">Services</Link>
          <Link className="hover:text-on-surface transition-colors" href="/reviews">Reviews</Link>
          <Link className="hover:text-on-surface transition-colors" href="/insights">Insights</Link>
          <Link className="hover:text-on-surface transition-colors" href="/contact">Contact</Link>
        </div>

        <div className="flex items-center">
          <a
            href="https://calendly.com/rahulbaliastrology/kundli/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary text-white px-8 py-2.5 rounded-full font-medium text-xs tracking-wider transition-all hover:bg-primary/90"
          >
            Book Now
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
