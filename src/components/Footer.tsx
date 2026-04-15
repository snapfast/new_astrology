import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-stone-100 dark:bg-stone-950 w-full py-12 border-t border-stone-200 dark:border-stone-800">
      <div className="flex flex-col md:flex-row justify-between items-center px-8 max-w-7xl mx-auto gap-4">
        <div className="font-headline text-xl font-semibold text-primary">
          Rahul Bali Astrology
        </div>
        <div className="flex flex-wrap justify-center gap-6 font-body text-sm tracking-wide">
          <a className="text-stone-500 hover:text-stone-800 transition-opacity" href="#">Privacy Policy</a>
          <a className="text-stone-500 hover:text-stone-800 transition-opacity" href="#">Terms of Service</a>
          <a className="text-stone-500 hover:text-stone-800 transition-opacity" href="#">Disclaimer</a>
          <a className="text-stone-500 hover:text-stone-800 transition-opacity" href="#">Contact</a>
        </div>
        <div className="font-body text-sm tracking-wide text-stone-500">
          © 2024 Rahul Bali Astrology. All Rights Reserved.
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-8 mt-12 text-center">
        <p className="text-[10px] text-stone-400 uppercase tracking-[0.4em] leading-relaxed max-w-2xl mx-auto">
          Vedic Astrology is a tool for self-understanding and guidance. It should not be used as a substitute for professional medical, legal, or financial advice.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
