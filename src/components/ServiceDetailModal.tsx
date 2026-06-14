'use client';

import { FC } from 'react';
import Image from 'next/image';
import { Consultation } from '@/lib/consultations';
import { sendGAEvent } from '@next/third-parties/google';
import BaseModal from './BaseModal';
import { useLanguage } from '@/context/LanguageContext';

interface ServiceDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: Consultation | null;
}

const ServiceDetailModal: FC<ServiceDetailModalProps> = ({
  isOpen,
  onClose,
  service
}) => {
  const { lang } = useLanguage();
  if (!service) return null;

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      zIndex={110}
      maxWidth="max-w-5xl"
      containerClassName="p-4 md:p-8"
      wrapperClassName="rounded-[2.5rem] md:rounded-[3.5rem] border-white/20 duration-500 overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
    >
      {/* Image Section */}
        <div className="relative w-full md:w-2/5 min-h-[300px] md:h-auto bg-surface-bright">
          <Image
            src={service.image}
            alt={service.alt}
            fill
            quality={90}
            className="object-cover"
            sizes="(max-width: 768px) calc(100vw - 32px), 400px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent md:hidden"></div>

          <button
            onClick={onClose}
            className="absolute top-6 left-6 w-10 h-10 flex items-center justify-center rounded-full bg-white/10  border border-white/20 text-white md:hidden"
            aria-label="Close"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Content Section */}
        <div className="flex-1 p-8 md:p-14 overflow-y-auto custom-scrollbar bg-white">
          <div className="flex justify-between items-start mb-8">
            <div>
              <span className={`font-medium text-accent mb-3 block font-label ${
                lang === 'hi' ? 'text-xs md:text-sm tracking-normal' : 'text-[10px] tracking-[0.3em] uppercase'
              }`}>{lang === 'hi' ? 'सेवा विवरण' : 'Service Detail'}</span>
              <h2 className={`font-normal text-on-surface font-headline tracking-tight ${
                lang === 'hi' ? 'text-3xl md:text-5xl' : 'text-4xl md:text-5xl'
              }`}>
                {service.title}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="hidden md:flex w-12 h-12 items-center justify-center rounded-full border border-outline/20 hover:bg-surface-bright transition-colors"
              aria-label="Close"
            >
              <span className="material-symbols-outlined text-on-surface">close</span>
            </button>
          </div>

          <p className={`text-on-surface leading-relaxed font-body mb-12 max-w-2xl ${
            lang === 'hi' ? 'text-xl' : 'text-lg'
          }`}>
            {service.description}
          </p>

          <div className="grid grid-cols-1 gap-4 mb-12">
            {service.portions.map((portion, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-6 bg-surface-bright border border-outline/10 rounded-[2rem] text-left"
              >
                <div className="w-10 h-10 shrink-0 rounded-xl bg-accent/5 flex items-center justify-center text-accent">
                  <span className="material-symbols-outlined text-xl font-variation-fill">{portion.icon}</span>
                </div>
                <div>
                  <h4 className="text-base font-medium text-on-surface font-headline mb-2">{portion.title}</h4>
                  <p className="text-sm text-on-surface font-body leading-relaxed">{portion.expandedDetail}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 pt-8 border-t border-outline/10">
            <a
              href="https://wa.me/919306057150"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sendGAEvent({ event: 'action_click', action_name: 'detail_modal_whatsapp' })}
              className={`w-full sm:w-auto px-8 py-4 bg-[#25D366] text-white rounded-full font-medium uppercase text-center shadow-lg shadow-[#25D366]/10 hover:bg-[#25D366]/90 transition-all ${
                lang === 'hi' ? 'text-[12px] md:text-[14px] tracking-normal' : 'text-[10px] tracking-[0.1em]'
              }`}
            >
              {lang === 'hi' ? 'व्हाट्सएप पर चैट करें' : 'Chat on WhatsApp'}
            </a>
            <a
              href="https://calendly.com/rahulbaliastrology/kundli/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sendGAEvent({ event: 'action_click', action_name: 'detail_modal_google_meet' })}
              className={`w-full sm:w-auto px-8 py-4 bg-primary text-white rounded-full font-medium uppercase text-center shadow-lg shadow-primary/10 hover:bg-primary/90 transition-all ${
                lang === 'hi' ? 'text-[12px] md:text-[14px] tracking-normal' : 'text-[10px] tracking-[0.1em]'
              }`}
            >
              {lang === 'hi' ? 'गूगल मीट शेड्यूल करें' : 'Schedule Google Meet'}
            </a>
            <p className={`hidden lg:block text-on-surface font-body flex-1 text-right transition-all ${
              lang === 'hi' ? 'text-xs tracking-normal' : 'text-[9px] tracking-normal'
            }`}>
              {lang === 'hi' ? <>सितारों द्वारा निर्देशित, <br /> सत्य में निहित</> : <>Guided by the stars, <br /> Grounded in Truth</>}
            </p>
          </div>
        </div>
    </BaseModal>
  );
};

export default ServiceDetailModal;
