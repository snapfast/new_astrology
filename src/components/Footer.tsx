'use client';

import { useState } from 'react';
import Link from 'next/link';
import BookConsultationModal from './BookConsultationModal';
import Logo from './Logo';
import { sendGAEvent } from '@next/third-parties/google';

const TRANSLATIONS = {
  desc: 'Guided by the stars, grounded in ancient wisdom. Professional Vedic astrology services for spiritual clarity and alignment.',
  services: 'Services',
  dailyPanchang: 'Daily Panchang',
  hora: 'Planetary Hours (Hora)',
  freeKundli: 'Free Kundli',
  consultation: 'Consultation',
  premium: 'Premium Appointment',
  followUs: 'Follow Us',
  company: 'Company',
  aboutUs: 'About Us',
  rights: 'Rahul Bali Astrology Services © 2025. All rights reserved.',
  privacy: 'Privacy',
  terms: 'Terms',
  faq: 'FAQ'
};

const Footer = () => {
  const t = TRANSLATIONS;
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  return (
    <footer className="w-full pt-16 pb-12 bg-background border-t border-outline/20 font-body print:hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 px-8">
        <div className="col-span-1 lg:col-span-1">
          <Link href="/" className="mb-8 block">
            <Logo />
          </Link>
          <p className="text-on-surface text-sm leading-relaxed mb-10 max-w-xs font-normal">
            {t.desc}
          </p>
        </div>
        <div>
          <h6 className="text-on-surface mb-8 font-semibold uppercase font-label text-[10px] tracking-widest">{t.services}</h6>
          <ul className="space-y-5 text-sm">
            <li><Link href="/panchang" className="text-accent font-medium text-left">{t.dailyPanchang}</Link></li>
            <li><Link href="/hora" className="text-on-surface font-normal text-left">{t.hora}</Link></li>
            <li><Link href="/free-horoscope" className="text-on-surface font-normal text-left">{t.freeKundli}</Link></li>
            <li><button onClick={() => { sendGAEvent({ event: 'action_click', action_name: 'footer_service_consultation' }); setIsBookingModalOpen(true); }} className="text-on-surface font-normal text-left">{t.consultation}</button></li>
            <li><button onClick={() => { sendGAEvent({ event: 'action_click', action_name: 'footer_service_premium' }); setIsBookingModalOpen(true); }} className="text-on-surface font-normal text-left">{t.premium}</button></li>
          </ul>
        </div>
        <div>
          <h6 className="text-on-surface mb-8 font-semibold uppercase font-label text-[10px] tracking-widest">{t.followUs}</h6>
          <ul className="space-y-5 text-sm">
            <li><a onClick={() => sendGAEvent({ event: 'action_click', action_name: 'footer_social_instagram' })} className="text-on-surface font-normal" href="https://www.instagram.com/RahulBaliAstro" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            <li><a onClick={() => sendGAEvent({ event: 'action_click', action_name: 'footer_social_youtube' })} className="text-on-surface font-normal" href="https://www.youtube.com/@RahulBaliAstrology" target="_blank" rel="noopener noreferrer">YouTube</a></li>
            <li><a onClick={() => sendGAEvent({ event: 'action_click', action_name: 'footer_social_tumblr' })} className="text-on-surface font-normal" href="https://rahulbaliastrology.tumblr.com/" target="_blank" rel="noopener noreferrer">Tumblr</a></li>
          </ul>
        </div>
        <div>
          <h6 className="text-on-surface mb-8 font-semibold uppercase font-label text-[10px] tracking-widest">{t.company}</h6>
          <ul className="space-y-5 text-sm">
            <li><Link className="text-on-surface font-normal" href="/about">{t.aboutUs}</Link></li>
            <li><Link className="text-on-surface font-normal" href="/faq">{t.faq}</Link></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-8 mt-16 pt-10 border-t border-outline/20 flex flex-col md:flex-row justify-between items-center gap-6 uppercase font-medium text-on-surface font-label transition-all text-[10px] tracking-widest">
        <Link href="/" className="text-center md:text-left">{t.rights}</Link>
        <div className="flex gap-10">
          <Link href="/privacy">{t.privacy}</Link>
          <Link href="/terms">{t.terms}</Link>
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
