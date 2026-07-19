'use client';

import { useState, useMemo, useEffect, useRef, memo } from 'react';
import { Mahadasha, Antardasha, Pratyantardasha, SookshmaDasha, PLANET_NAMES, DashaBalance } from '@/lib/astrology';

interface VimshottariDashaProps {
  mahadashas: Mahadasha[];
  lang?: 'en' | 'hi';
  dashaBalance?: DashaBalance;
}

const TRANSLATIONS = {
  en: {
    mahadasha: "Mahadasha",
    antardasha: "Antardasha",
    pratyantardasha: "Pratyantardasha",
    sookshmaDasha: "Sookshma Dasha",
    activeDasha: "Active Dasha",
    selectMd: "Select a Mahadasha to drill down",
    to: " to ",
    dashaBalance: "Remaining Dasha Balance at Birth",
    years: "Years",
    months: "Months",
    days: "Days"
  },
  hi: {
    mahadasha: "महादशा",
    antardasha: "अंतर्दशा",
    pratyantardasha: "प्रत्यंतर्दशा",
    sookshmaDasha: "सूक्ष्म दशा",
    activeDasha: "सक्रिय दशा",
    selectMd: "विस्तृत विवरण के लिए महादशा चुनें",
    to: " से ",
    dashaBalance: "जन्म के समय शेष दशा",
    years: "वर्ष",
    months: "महीने",
    days: "दिन"
  }
};

// Helper to perform binary search for the active dasha period
function findCurrentDasha<T extends { start: number; end: number }>(items: T[], targetTime: number): T | undefined {
  let low = 0;
  let high = items.length - 1;

  while (low <= high) {
    const mid = (low + high) >>> 1;
    const item = items[mid];
    const startTime = item.start;
    const endTime = item.end;

    if (targetTime >= startTime && targetTime <= endTime) {
      return item;
    } else if (targetTime < startTime) {
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }

  return undefined;
}

const VimshottariDasha = memo(function VimshottariDasha({ mahadashas, lang = 'en', dashaBalance }: VimshottariDashaProps) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  // Performance Optimization: Pre-instantiate formatters to avoid the overhead of repeatedly calling toLocaleDateString
  const DATE_FORMATTER = useMemo(() => new Intl.DateTimeFormat(lang === 'hi' ? 'hi-IN' : 'en-GB', { day: '2-digit', month: 'short', year: 'numeric' }), [lang]);
  const DATE_TIME_FORMATTER = useMemo(() => new Intl.DateTimeFormat(lang === 'hi' ? 'hi-IN' : 'en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }), [lang]);
  const now = useMemo(() => new Date(), []);
  const nowTime = useMemo(() => now.getTime(), [now]);

  // Pre-calculate current dasha path to avoid linear scans during render and in useEffect
  const currentPath = useMemo(() => {
    const path = {
      md: null as Mahadasha | null,
      ad: null as Antardasha | null,
      pd: null as Pratyantardasha | null,
      sd: null as SookshmaDasha | null
    };

    if (mahadashas.length === 0) return path;

    const md = findCurrentDasha(mahadashas, nowTime);
    if (md) {
      path.md = md;
      const ad = findCurrentDasha(md.antardashas, nowTime);
      if (ad) {
        path.ad = ad;
        const pd = findCurrentDasha(ad.pratyantardashas, nowTime);
        if (pd) {
          path.pd = pd;
          const sd = findCurrentDasha(pd.sookshmaDashas, nowTime);
          if (sd) {
            path.sd = sd;
          }
        }
      }
    }
    return path;
  }, [mahadashas, nowTime]);

  const [selectedMd, setSelectedMd] = useState<Mahadasha | null>(currentPath.md);
  const [selectedAd, setSelectedAd] = useState<Antardasha | null>(currentPath.ad);
  const [selectedPd, setSelectedPd] = useState<Pratyantardasha | null>(currentPath.pd);
  const [selectedSd, setSelectedSd] = useState<SookshmaDasha | null>(currentPath.sd);
  const containerRef = useRef<HTMLDivElement>(null);

  // Sync selection if mahadashas change (e.g. new chart generation)
  useEffect(() => {
    setSelectedMd(currentPath.md);
    setSelectedAd(currentPath.ad);
    setSelectedPd(currentPath.pd);
    setSelectedSd(currentPath.sd);
  }, [currentPath]);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScrollLimits = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      setCanScrollLeft(scrollLeft > 1);
      // Use 2px tolerance for float subpixel rendering
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 2);
    }
  };

  const scrollContainer = (direction: 'left' | 'right') => {
    if (containerRef.current) {
      const container = containerRef.current;
      const scrollAmount = direction === 'left' ? -200 : 200;
      container.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollLimits);

      checkScrollLimits();

      const observer = new MutationObserver(checkScrollLimits);
      observer.observe(container, { childList: true, subtree: true });

      window.addEventListener('resize', checkScrollLimits);

      const timeoutId = setTimeout(checkScrollLimits, 300);

      return () => {
        container.removeEventListener('scroll', checkScrollLimits);
        observer.disconnect();
        window.removeEventListener('resize', checkScrollLimits);
        clearTimeout(timeoutId);
      };
    }
  }, [selectedMd, selectedAd, selectedPd, selectedSd]);

  const getStatus = (start: number, end: number) => {
    if (nowTime >= start && nowTime <= end) return 'Current';
    if (nowTime > end) return 'Past';
    return 'Upcoming';
  };

  // Automatically scroll to the right when a new column is opened
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        left: containerRef.current.scrollWidth,
        behavior: 'smooth'
      });
    }
  }, [selectedMd, selectedAd, selectedPd, selectedSd]);

  const handleMdClick = (item: Mahadasha | Antardasha | Pratyantardasha | SookshmaDasha) => {
    const md = item as Mahadasha;
    if (selectedMd?.lord === md.lord && selectedMd?.start === md.start) {
      setSelectedMd(null);
      setSelectedAd(null);
      setSelectedPd(null);
      setSelectedSd(null);
    } else {
      setSelectedMd(md);
      setSelectedAd(null);
      setSelectedPd(null);
      setSelectedSd(null);
    }
  };

  const handleAdClick = (item: Mahadasha | Antardasha | Pratyantardasha | SookshmaDasha) => {
    const ad = item as Antardasha;
    if (selectedAd?.lord === ad.lord && selectedAd?.start === ad.start) {
      setSelectedAd(null);
      setSelectedPd(null);
      setSelectedSd(null);
    } else {
      setSelectedAd(ad);
      setSelectedPd(null);
      setSelectedSd(null);
    }
  };

  const handlePdClick = (item: Mahadasha | Antardasha | Pratyantardasha | SookshmaDasha) => {
    const pd = item as Pratyantardasha;
    if (selectedPd?.lord === pd.lord && selectedPd?.start === pd.start) {
      setSelectedPd(null);
      setSelectedSd(null);
    } else {
      setSelectedPd(pd);
      setSelectedSd(null);
    }
  };

  const handleSdClick = (item: Mahadasha | Antardasha | Pratyantardasha | SookshmaDasha) => {
    const sd = item as SookshmaDasha;
    if (selectedSd?.lord === sd.lord && selectedSd?.start === sd.start) {
      setSelectedSd(null);
    } else {
      setSelectedSd(sd);
    }
  };

  const renderColumn = (
    title: string,
    items: (Mahadasha | Antardasha | Pratyantardasha | SookshmaDasha)[],
    selectedItem: Mahadasha | Antardasha | Pratyantardasha | SookshmaDasha | null,
    onItemClick?: (item: Mahadasha | Antardasha | Pratyantardasha | SookshmaDasha) => void,
    isSookshma: boolean = false
  ) => {
    return (
      <div className="flex-shrink-0 w-64 md:w-72 border-r border-outline flex flex-col bg-white last:border-r-0 first:rounded-l-3xl last:rounded-r-3xl">
        <div className="bg-white border-b border-outline px-4 py-3 shrink-0">
          <h3 className="text-xs font-bold text-on-surface uppercase tracking-[0.15em] font-label">
            {title}
          </h3>
        </div>
        <div className="flex-grow divide-y divide-outline/50 scrollbar-hide">
          {items.map((item, idx) => {
            const itemStartTime = item.start;
            const itemEndTime = item.end;
            const status = getStatus(itemStartTime, itemEndTime);
            const isCurrent = status === 'Current';
            const isSelected = selectedItem &&
                             selectedItem.lord === item.lord &&
                             selectedItem.start === itemStartTime;

            return (
              <button
                type="button"
                key={idx}
                onClick={() => onItemClick?.(item)}
                className={`
                  relative w-full text-left block px-4 py-3.5 transition-colors duration-150 group/item border-none
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset
                  ${isSelected ? 'bg-accent text-on-surface' : 'bg-transparent hover:bg-surface-container-lowest text-on-surface'}
                `}
                aria-current={isCurrent ? 'true' : undefined}
                aria-pressed={isSelected ? 'true' : 'false'}
              >
                {/* Black arrow head for selected dasha box */}
                {isSelected && !isSookshma && (
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-l-[6px] border-l-on-surface border-y-[5px] border-y-transparent z-20"></div>
                )}

                <div className="flex justify-between items-center relative z-10">
                  <div className="flex items-center gap-2">
                    <span className={`text-base font-bold ${lang === 'hi' ? 'font-hindi' : ''}`}>
                      {lang === 'hi' ? PLANET_NAMES[item.lord]?.sanskrit || item.lord : item.lord}
                    </span>
                    {isCurrent && !isSelected && (
                      <span className="animate-pulse flex h-1.5 w-1.5 rounded-full bg-accent" />
                    )}
                    {isCurrent && isSelected && (
                      <span className="animate-pulse flex h-1.5 w-1.5 rounded-full bg-on-surface" />
                    )}
                  </div>
                </div>
                <div className={`text-xs font-medium mt-1 tabular-nums ${isSelected ? 'text-on-surface' : 'text-on-surface/70'}`}>
                  {isSookshma ? DATE_TIME_FORMATTER.format(item.start) : DATE_FORMATTER.format(item.start)}
                  {t.to}
                  {isSookshma ? DATE_TIME_FORMATTER.format(item.end) : DATE_FORMATTER.format(item.end)}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {dashaBalance && (
        <div className="bg-surface-container-low border border-outline/50 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-accent text-2xl" aria-hidden="true">history</span>
            <div>
              <p className="text-[10px] font-bold text-on-surface/60 uppercase tracking-wider font-label">
                {t.dashaBalance}
              </p>
              <h4 className="text-sm font-bold text-on-surface leading-tight font-headline">
                <span className={lang === 'hi' ? 'font-hindi' : ''}>
                  {lang === 'hi' ? PLANET_NAMES[dashaBalance.lord]?.sanskrit || dashaBalance.lord : dashaBalance.lord}
                </span>
              </h4>
            </div>
          </div>
          <div className="flex gap-4 font-body text-sm font-medium text-on-surface">
            <div className="text-center">
              <span className="block text-lg font-bold text-accent font-hindi tabular-nums">{dashaBalance.years}</span>
              <span className="text-[9px] uppercase tracking-wider font-label text-on-surface/60">{t.years}</span>
            </div>
            <div className="text-center border-l border-outline/50 pl-4">
              <span className="block text-lg font-bold text-accent font-hindi tabular-nums">{dashaBalance.months}</span>
              <span className="text-[9px] uppercase tracking-wider font-label text-on-surface/60">{t.months}</span>
            </div>
            <div className="text-center border-l border-outline/50 pl-4">
              <span className="block text-lg font-bold text-accent font-hindi tabular-nums">{dashaBalance.days}</span>
              <span className="text-[9px] uppercase tracking-wider font-label text-on-surface/60">{t.days}</span>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between items-end mb-4">
        <div className="flex items-center justify-end dasha-active-indicator w-full">
          <span className="text-[10px] text-on-surface/40 uppercase tracking-widest font-sans italic ml-auto mr-4 select-none" title="Vimshottari lengths calculated using exact Sidereal Year (365.25636 days) to align with standard classical/JHora expectations.">Sidereal Year</span>
          <div className="flex gap-2">
             <div className="w-2 h-2 rounded-full bg-accent"></div>
             <span className={`text-xs font-bold text-accent uppercase font-label ${lang === 'en' ? 'tracking-widest' : ''}`}>{t.activeDasha}</span>
          </div>
        </div>
      </div>

      <div className="relative group/miller">
        {canScrollLeft && (
          <button
            type="button"
            onClick={() => scrollContainer('left')}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-30 flex items-center justify-center w-8 h-8 rounded-full bg-white border border-on-surface shadow-md hover:bg-surface-container-lowest active:scale-95 transition-all text-on-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            aria-label={lang === 'hi' ? 'बाएँ स्क्रॉल करें' : 'Scroll left'}
          >
            <span className="material-symbols-outlined text-[18px]" aria-hidden="true">chevron_left</span>
          </button>
        )}
        {canScrollRight && (
          <button
            type="button"
            onClick={() => scrollContainer('right')}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-30 flex items-center justify-center w-8 h-8 rounded-full bg-white border border-on-surface shadow-md hover:bg-surface-container-lowest active:scale-95 transition-all text-on-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            aria-label={lang === 'hi' ? 'दाएँ स्क्रॉल करें' : 'Scroll right'}
          >
            <span className="material-symbols-outlined text-[18px]" aria-hidden="true">chevron_right</span>
          </button>
        )}
        <div
          ref={containerRef}
          className="miller-container flex overflow-x-auto bg-white rounded-3xl border border-outline shadow-sm scroll-smooth no-scrollbar"
        >
          {renderColumn(t.mahadasha, mahadashas, selectedMd, handleMdClick)}
          {selectedMd && renderColumn(t.antardasha, selectedMd.antardashas, selectedAd, handleAdClick)}
          {selectedAd && renderColumn(t.pratyantardasha, selectedAd.pratyantardashas, selectedPd, handlePdClick)}
          {selectedPd && renderColumn(t.sookshmaDasha, selectedPd.sookshmaDashas, selectedSd, handleSdClick, true)}

          {/* Placeholder for empty state when no MD is selected */}
          {!selectedMd && (
            <div className="flex-grow flex items-center justify-center p-12 text-center border-l border-outline bg-white">
              <div className="max-w-xs">
                <span className="material-symbols-outlined text-4xl text-outline mb-4">account_tree</span>
                <p className={`text-xs text-on-surface font-medium uppercase tracking-widest ${lang === 'hi' ? 'font-hindi' : ''}`}>{t.selectMd}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  );
});

export default VimshottariDasha;
