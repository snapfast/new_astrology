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
            <li><a className="text-slate-500 hover:text-[#0071E3] transition-colors" href="#">Daily Horoscope</a></li>
            <li><a className="text-slate-500 hover:text-[#0071E3] transition-colors" href="#">Kundli Matching</a></li>
            <li><a className="text-slate-500 hover:text-[#0071E3] transition-colors" href="#">Vedic Chart</a></li>
          </ul>
        </div>
        <div>
          <h6 className="text-slate-900 mb-6 font-semibold font-label">Company</h6>
          <ul className="space-y-4 font-label">
            <li><a className="text-slate-500 hover:text-[#0071E3] transition-colors" href="#">About Us</a></li>
            <li><a className="text-slate-500 hover:text-[#0071E3] transition-colors" href="#">Contact</a></li>
            <li><a className="text-slate-500 hover:text-[#0071E3] transition-colors" href="#">Privacy</a></li>
          </ul>
        </div>
        <div>
          <h6 className="text-slate-900 mb-6 font-semibold font-label">Newsletter</h6>
          <div className="flex gap-2">
            <input className="bg-surface-container-high border-none rounded-lg px-4 py-2 w-full text-[10px] font-label" placeholder="EMAIL" type="email"/>
            <button className="bg-[#0071E3] text-white px-4 py-2 rounded-lg material-symbols-outlined text-sm">send</button>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-8 mt-16 pt-8 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-400 font-label">
        <div>© 2024 Rahul Bali Astrology. All Rights Reserved.</div>
        <div className="flex gap-6">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
