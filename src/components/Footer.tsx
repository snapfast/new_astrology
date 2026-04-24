'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import BookConsultationModal from './BookConsultationModal';

const Footer = () => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  return (
    <footer className="w-full pt-32 pb-20 bg-background border-t border-outline/50 font-body">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 px-8">
        <div className="col-span-1 lg:col-span-1">
          <Link href="/" className="text-2xl font-normal tracking-tight text-on-surface mb-8 font-headline flex items-center gap-1">
            <span>Rahul Bali</span>
            <span className="text-accent italic">Jyotishi</span>
          </Link>
          <p className="text-secondary text-sm leading-relaxed mb-10 max-w-xs font-light">
            Guided by the stars, grounded in ancient wisdom. Professional Vedic astrology services for spiritual clarity and alignment.
          </p>
        </div>
        <div>
          <h6 className="text-on-surface mb-8 text-[10px] font-semibold tracking-widest uppercase font-label">Services</h6>
          <ul className="space-y-5 text-sm">
            <li><button onClick={() => setIsBookingModalOpen(true)} className="text-secondary font-light text-left">Consultation</button></li>
            <li><button onClick={() => setIsBookingModalOpen(true)} className="text-secondary font-light text-left">Premium Appointment</button></li>
            <li><button onClick={() => setIsBookingModalOpen(true)} className="text-secondary font-light text-left">Research</button></li>
          </ul>
        </div>
        <div>
          <h6 className="text-on-surface mb-8 text-[10px] font-semibold tracking-widest uppercase font-label">Follow Us</h6>
          <ul className="space-y-5 text-sm">
            <li><a className="text-secondary font-light" href="https://www.instagram.com/RahulBaliAstro" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            <li><a className="text-secondary font-light" href="https://www.youtube.com/@RahulBaliAstrology" target="_blank" rel="noopener noreferrer">YouTube</a></li>
            <li><a className="text-secondary font-light" href="https://rahulbaliastrology.tumblr.com/" target="_blank" rel="noopener noreferrer">Tumblr</a></li>
          </ul>
        </div>
        <div>
          <h6 className="text-on-surface mb-8 text-[10px] font-semibold tracking-widest uppercase font-label">Company</h6>
          <ul className="space-y-5 text-sm">
            <li><a className="text-secondary font-light" href="/about">About Us</a></li>
            <li><a className="text-secondary font-light" href="/contact">Contact</a></li>
            <li><a className="text-secondary font-light" href="/donate">Donate</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-8 mt-32 pt-10 border-t border-outline/30 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] tracking-widest uppercase font-medium text-secondary/40 font-label">
        <Link href="/" className="">Rahul Bali Jyotishi Services © 2025. All rights reserved.</Link>
        <div className="flex gap-10">
          <a className="" href="#">Privacy</a>
          <a className="" href="#">Terms</a>
        </div>
      </div>

      <BookConsultationModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </footer>
  );
};

export default Footer;
