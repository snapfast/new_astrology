'use client';

import { FC } from 'react';
import BaseModal from './BaseModal';
import { useLanguage } from '@/context/LanguageContext';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

interface HoroscopeSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TRANSLATIONS = {
  en: {
    title: 'Chart Settings',
    nodeCalculation: 'Node Calculation (Rahu/Ketu)',
    meanNode: 'Mean Node',
    trueNode: 'True Node',
    meanNodeDesc: 'Standard average orbital calculation. Preferred in traditional interpretations.',
    trueNodeDesc: 'Exact astronomical position factoring in orbital perturbations.',
    applyBtn: 'Apply & Recalculate'
  },
  hi: {
    title: 'चार्ट सेटिंग्स',
    nodeCalculation: 'नोड गणना (राहु/केतु)',
    meanNode: 'मध्यम नोड (Mean Node)',
    trueNode: 'स्पष्ट नोड (True Node)',
    meanNodeDesc: 'मानक औसत कक्षीय गणना। पारंपरिक व्याख्याओं में पसंद किया जाता है।',
    trueNodeDesc: 'कक्षीय विक्षोभ को ध्यान में रखते हुए सटीक खगोलीय स्थिति।',
    applyBtn: 'लागू करें और पुनर्गणना करें'
  }
};

const HoroscopeSettingsModal: FC<HoroscopeSettingsModalProps> = ({ isOpen, onClose }) => {
  const { lang } = useLanguage();
  const t = TRANSLATIONS[lang];
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentNodeType = searchParams.get('nodeType') === 'true' ? 'true' : 'mean';

  const handleSelection = (type: 'mean' | 'true') => {
    if (type === currentNodeType) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set('nodeType', type);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    onClose();
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} maxWidth="max-w-md">
      <div className="p-6 md:p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-surface-container transition-colors"
          aria-label={lang === 'en' ? 'Close modal' : 'पॉप-अप बंद करें'}
        >
          <span className="material-symbols-outlined text-[20px] text-on-surface/70" aria-hidden="true">close</span>
        </button>

        <h2 className="text-2xl font-headline text-on-surface mb-8 pr-8">{t.title}</h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium text-on-surface/80 mb-4 font-label uppercase tracking-wider">
              {t.nodeCalculation}
            </h3>
            <div className="space-y-3">
              <label
                className={`flex items-start p-4 rounded-xl border cursor-pointer transition-colors ${currentNodeType === 'mean' ? 'border-primary bg-primary/5' : 'border-outline/30 hover:bg-surface-container-low'}`}
                onClick={() => handleSelection('mean')}
              >
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-on-surface">{t.meanNode}</span>
                    {currentNodeType === 'mean' && (
                      <span className="material-symbols-outlined text-primary text-[20px] font-variation-fill" aria-hidden="true">check_circle</span>
                    )}
                  </div>
                  <p className="text-xs text-on-surface/70">{t.meanNodeDesc}</p>
                </div>
              </label>

              <label
                className={`flex items-start p-4 rounded-xl border cursor-pointer transition-colors ${currentNodeType === 'true' ? 'border-primary bg-primary/5' : 'border-outline/30 hover:bg-surface-container-low'}`}
                onClick={() => handleSelection('true')}
              >
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-on-surface">{t.trueNode}</span>
                    {currentNodeType === 'true' && (
                      <span className="material-symbols-outlined text-primary text-[20px] font-variation-fill" aria-hidden="true">check_circle</span>
                    )}
                  </div>
                  <p className="text-xs text-on-surface/70">{t.trueNodeDesc}</p>
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </BaseModal>
  );
};

export default HoroscopeSettingsModal;
