import React from 'react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-2xl shadow-[0_4px_30px_rgba(0,0,0,0.03)] antialiased tracking-tight">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4 w-full">
        <div className="text-xl font-normal tracking-tight text-slate-900 font-headline">
          Rahul Bali Astrology
        </div>
        <div className="hidden md:flex items-center gap-8 font-medium text-[11px] uppercase tracking-[0.15em] font-label">
          <Link className="text-slate-600 hover:text-slate-900 transition-colors" href="/">Home</Link>
          <Link className="text-slate-600 hover:text-slate-900 transition-colors" href="/reviews">Reviews</Link>
          <Link className="text-slate-600 hover:text-slate-900 transition-colors" href="/donate">Donate</Link>
          <Link className="text-slate-600 hover:text-slate-900 transition-colors" href="/about">About</Link>
        </div>
        <div className="flex items-center gap-4">
          <button className="material-symbols-outlined text-slate-600 hover:bg-slate-50/50 p-2 rounded-lg transition-all">
            search
          </button>
          <button className="bg-primary text-white px-6 py-2.5 rounded-full font-semibold hover:opacity-90 active:scale-95 transition-all text-[11px] tracking-wider uppercase font-label">
            Consult Now
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
