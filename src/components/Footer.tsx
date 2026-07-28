import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full py-16 bg-white border-t border-slate-100 font-body text-[10px] tracking-widest uppercase font-medium">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 px-8">
        <div className="col-span-1 lg:col-span-1">
          <div className="text-lg font-normal tracking-tight text-slate-900 mb-6 font-headline capitalize">Rahul Bali Astrology</div>
          <p className="text-slate-500 normal-case tracking-normal font-light mb-8 max-w-xs leading-relaxed font-body">
            Guided by the stars, grounded in ancient wisdom. Professional Vedic astrology services for spiritual clarity.
          </p>
        </div>
        <div>
          <h6 className="text-slate-900 mb-6 font-semibold font-label">Services</h6>
          <ul className="space-y-4 font-label">
            <li><a className="text-slate-500 hover:text-primary transition-colors" href="/consultation">Consultation</a></li>
            <li><a className="text-slate-500 hover:text-primary transition-colors" href="/premium">Premium Appointment</a></li>
            <li><a className="text-slate-500 hover:text-primary transition-colors" href="/research">Research</a></li>
          </ul>
        </div>
        <div>
          <h6 className="text-slate-900 mb-6 font-semibold font-label">Follow Us</h6>
          <ul className="space-y-4 font-label">
            <li><a className="text-slate-500 hover:text-primary transition-colors" href="https://www.instagram.com/RahulBaliAstro" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            <li><a className="text-slate-500 hover:text-primary transition-colors" href="https://www.youtube.com/@RahulBaliAstrology" target="_blank" rel="noopener noreferrer">YouTube</a></li>
            <li><a className="text-slate-500 hover:text-primary transition-colors" href="https://rahulbaliastrology.tumblr.com/" target="_blank" rel="noopener noreferrer">Tumblr</a></li>
          </ul>
        </div>
        <div>
          <h6 className="text-slate-900 mb-6 font-semibold font-label">Company</h6>
          <ul className="space-y-4 font-label">
            <li><a className="text-slate-500 hover:text-primary transition-colors" href="/about">About Us</a></li>
            <li><a className="text-slate-500 hover:text-primary transition-colors" href="/contact">Contact</a></li>
            <li><a className="text-slate-500 hover:text-primary transition-colors" href="/donate">Donate</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-8 mt-16 pt-8 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-400 font-label">
        <div>Rahul Bali Jyotish Services © 2025. All rights reserved.</div>
        <div className="flex gap-6">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
