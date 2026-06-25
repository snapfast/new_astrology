'use client';

import { useState } from 'react';
import Link from 'next/link';
import BookConsultationModal from './BookConsultationModal';
import PaymentOptionsModal from './PaymentOptionsModal';
import Logo from './Logo';
import { sendGAEvent } from '@next/third-parties/google';
import { useLanguage } from '@/context/LanguageContext';

const TRANSLATIONS = {
  en: {
    desc: 'Guided by the stars, grounded in ancient wisdom. Professional Vedic astrology services for spiritual clarity and alignment.',
    services: 'Services',
    dailyPanchang: 'Daily Panchang',
    freeKundli: 'Free Kundli',
    consultation: 'Consultation',
    premium: 'Premium Appointment',
    followUs: 'Follow Us',
    company: 'Company',
    aboutUs: 'About Us',
    contact: 'Contact',
    rights: 'Rahul Bali Astrology Services © 2025. All rights reserved.',
    privacy: 'Privacy',
    terms: 'Terms'
  },
  hi: {
    desc: 'तारों द्वारा निर्देशित, प्राचीन ज्ञान में निहित। आध्यात्मिक स्पष्टता और संरेखण के लिए पेशेवर वैदिक ज्योतिष सेवाएं।',
    services: 'सेवाएं',
    dailyPanchang: 'दैनिक पंचांग',
    freeKundli: 'मुफ्त कुंडली',
    consultation: 'परामर्श',
    premium: 'प्रीमियम अपॉइंटमेंट',
    followUs: 'हमें फॉलो करें',
    company: 'कंपनी',
    aboutUs: 'मेरे बारे में',
    contact: 'संपर्क करें',
    rights: 'राहुल बाली ज्योतिष सेवाएं © 2025. सर्वाधिकार सुरक्षित।',
    privacy: 'गोपनीयता',
    terms: 'शर्तें'
  }
};

const Footer = () => {
  const { lang } = useLanguage();
  const t = TRANSLATIONS[lang];
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  return (
    <footer className="w-full pt-16 pb-12 bg-background border-t border-outline/50 font-body print:hidden">
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
          <h6 className={`text-on-surface mb-8 font-semibold uppercase font-label ${
            lang === 'hi' ? 'text-xs md:text-sm tracking-normal' : 'text-[10px] tracking-widest'
          }`}>{t.services}</h6>
          <ul className={`space-y-5 ${lang === 'hi' ? 'text-base' : 'text-sm'}`}>
            <li><Link href="/panchang" className="text-accent font-medium text-left">{t.dailyPanchang}</Link></li>
            <li><Link href="/free-horoscope" className="text-on-surface font-normal text-left">{t.freeKundli}</Link></li>
            <li><button onClick={() => { sendGAEvent({ event: 'action_click', action_name: 'footer_service_consultation' }); setIsBookingModalOpen(true); }} className="text-on-surface font-normal text-left">{t.consultation}</button></li>
            <li><button onClick={() => { sendGAEvent({ event: 'action_click', action_name: 'footer_service_premium' }); setIsBookingModalOpen(true); }} className="text-on-surface font-normal text-left">{t.premium}</button></li>
          </ul>
        </div>
        <div>
          <h6 className={`text-on-surface mb-8 font-semibold uppercase font-label ${
            lang === 'hi' ? 'text-xs md:text-sm tracking-normal' : 'text-[10px] tracking-widest'
          }`}>{t.followUs}</h6>
          <ul className={`space-y-5 ${lang === 'hi' ? 'text-base' : 'text-sm'}`}>
            <li><a onClick={() => sendGAEvent({ event: 'action_click', action_name: 'footer_social_instagram' })} className="text-on-surface font-normal" href="https://www.instagram.com/RahulBaliAstro" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            <li><a onClick={() => sendGAEvent({ event: 'action_click', action_name: 'footer_social_youtube' })} className="text-on-surface font-normal" href="https://www.youtube.com/@RahulBaliAstrology" target="_blank" rel="noopener noreferrer">YouTube</a></li>
            <li><a onClick={() => sendGAEvent({ event: 'action_click', action_name: 'footer_social_tumblr' })} className="text-on-surface font-normal" href="https://rahulbaliastrology.tumblr.com/" target="_blank" rel="noopener noreferrer">Tumblr</a></li>
          </ul>
        </div>
        <div>
          <h6 className={`text-on-surface mb-8 font-semibold uppercase font-label ${
            lang === 'hi' ? 'text-xs md:text-sm tracking-normal' : 'text-[10px] tracking-widest'
          }`}>{t.company}</h6>
          <ul className={`space-y-5 ${lang === 'hi' ? 'text-base' : 'text-sm'}`}>
            <li><a className="text-on-surface font-normal" href="/about">{t.aboutUs}</a></li>
            <li><a className="text-on-surface font-normal" href="/contact">{t.contact}</a></li>
          </ul>
        </div>
      </div>
      <div className={`max-w-7xl mx-auto px-8 mt-16 pt-10 border-t border-outline/30 flex flex-col md:flex-row justify-between items-center gap-6 uppercase font-medium text-on-surface font-label transition-all ${
        lang === 'hi' ? 'text-sm tracking-normal' : 'text-[10px] tracking-widest'
      }`}>
        <Link href="/" className="text-center md:text-left">{t.rights}</Link>
        <div className="flex gap-10">
          <a href="#">{t.privacy}</a>
          <a href="#">{t.terms}</a>
        </div>
      </div>

      <BookConsultationModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        onOpenPayment={() => {
          setIsBookingModalOpen(false);
          setIsPaymentModalOpen(true);
        }}
      />

      <PaymentOptionsModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
      />
    </footer>
  );
};

export default Footer;
