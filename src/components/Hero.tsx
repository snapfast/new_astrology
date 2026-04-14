import React from 'react';
import Image from 'next/image';

const Hero = () => {
  return (
    <header className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          className="w-full h-full object-cover filter brightness-[0.4] contrast-[1.1]"
          alt="Cinematic close-up of planet Jupiter"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAfnPnNYYXdzyxzmEHNoEnnuVm1zzfUuwf8wNWsHDTJRWgTV0fIkvWYFUl02cQATsYXS2-8TIZ7sy1oUAwmNC6FZlOAc8rLnKmnSvLslvPI_0gTyXHI7Vkovi5MpBZlFbJRZ4G9WAXjIOBZ4QmS1tDIO2NKOCh5XqNTaGTfbnC9ruJOy_r4aiDg17ByTMhV_eiN7Dja5xVqlcxyZ5rKXyTqTllpaDhH8Y5_-UqU_ZGmr_3kffpRup7jt38iDcWaUhMOw_2DSG--HIvJ"
          fill
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-surface"></div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-8 w-full">
        <div className="max-w-2xl">
          <span className="inline-block px-4 py-1 mb-6 rounded-full bg-secondary-container text-on-secondary-container font-label text-xs tracking-[0.2em] uppercase">
            Authentic Vedic Insights
          </span>
          <h1 className="font-headline text-7xl md:text-8xl text-white mb-8 leading-[0.9] tracking-tighter">
            Unveiling <br/><span className="italic text-secondary-fixed">Cosmic</span> <br/>Destinies
          </h1>
          <p className="font-headline italic text-2xl text-white/80 mb-12 max-w-lg leading-relaxed">
            A scholarly approach to the celestial dance, mapping your journey through the lens of ancient wisdom and mathematical precision.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a className="bg-secondary-container text-on-secondary-container px-10 py-4 rounded-md font-label font-bold text-center hover:shadow-lg transition-all" href="#consultation">
              Begin Your Session
            </a>
            <a className="border border-white/30 text-white backdrop-blur-md px-10 py-4 rounded-md font-label text-center hover:bg-white/10 transition-all" href="#mystical-arts">
              Explore Mystical Arts
            </a>
          </div>
        </div>
      </div>
      <div className="absolute bottom-12 right-8 hidden lg:flex items-center gap-6 text-white/40 font-label text-xs tracking-widest">
        <span className="w-12 h-[1px] bg-white/20"></span>
        SCROLL TO EXPLORE THE VEDIC TRADITION
      </div>
    </header>
  );
};

export default Hero;
