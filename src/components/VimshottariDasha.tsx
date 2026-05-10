'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import { Mahadasha, Antardasha, Pratyantardasha, SookshmaDasha } from '@/lib/astrology';

interface VimshottariDashaProps {
  mahadashas: Mahadasha[];
}

export default function VimshottariDasha({ mahadashas }: VimshottariDashaProps) {
  const [selectedMd, setSelectedMd] = useState<Mahadasha | null>(null);
  const [selectedAd, setSelectedAd] = useState<Antardasha | null>(null);
  const [selectedPd, setSelectedPd] = useState<Pratyantardasha | null>(null);
  const [selectedSd, setSelectedSd] = useState<SookshmaDasha | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const now = useMemo(() => new Date(), []);

  const getStatus = (start: Date, end: Date) => {
    if (now >= start && now <= end) return 'Current';
    if (now > end) return 'Past';
    return 'Upcoming';
  };

  // Auto-select current dasha hierarchy on load
  useEffect(() => {
    if (mahadashas.length > 0) {
      const currentMd = mahadashas.find(md => now >= md.start && now <= md.end);
      if (currentMd) {
        setSelectedMd(currentMd);
        const currentAd = currentMd.antardashas.find(ad => now >= ad.start && now <= ad.end);
        if (currentAd) {
          setSelectedAd(currentAd);
          const currentPd = currentAd.pratyantardashas.find(pd => now >= pd.start && now <= pd.end);
          if (currentPd) {
            setSelectedPd(currentPd);
            const currentSd = currentPd.sookshmaDashas.find(sd => now >= sd.start && now <= sd.end);
            if (currentSd) {
              setSelectedSd(currentSd);
            }
          }
        }
      }
    }
  }, [mahadashas, now]);

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
    if (selectedMd?.lord === md.lord && selectedMd?.start.getTime() === md.start.getTime()) {
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
    if (selectedAd?.lord === ad.lord && selectedAd?.start.getTime() === ad.start.getTime()) {
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
    if (selectedPd?.lord === pd.lord && selectedPd?.start.getTime() === pd.start.getTime()) {
      setSelectedPd(null);
      setSelectedSd(null);
    } else {
      setSelectedPd(pd);
      setSelectedSd(null);
    }
  };

  const handleSdClick = (item: Mahadasha | Antardasha | Pratyantardasha | SookshmaDasha) => {
    const sd = item as SookshmaDasha;
    if (selectedSd?.lord === sd.lord && selectedSd?.start.getTime() === sd.start.getTime()) {
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
        <div className="bg-surface-container-low border-b border-outline px-4 py-2 shrink-0">
          <h3 className="text-[10px] font-bold text-secondary uppercase tracking-[0.2em] font-label">
            {title}
          </h3>
        </div>
        <div className="flex-grow divide-y divide-outline/50 scrollbar-hide">
          {items.map((item, idx) => {
            const status = getStatus(item.start, item.end);
            const isCurrent = status === 'Current';
            const isSelected = selectedItem &&
                             selectedItem.lord === item.lord &&
                             selectedItem.start.getTime() === item.start.getTime();

            return (
              <div
                key={idx}
                onClick={() => onItemClick?.(item)}
                className={`
                  relative px-4 py-3 cursor-pointer transition-colors duration-150 group/item
                  ${isSelected ? 'bg-accent text-on-surface' : 'hover:bg-surface-container-lowest text-on-surface'}
                `}
              >
                {/* Black arrow head for selected dasha box */}
                {isSelected && !isSookshma && (
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-l-[6px] border-l-on-surface border-y-[5px] border-y-transparent z-20"></div>
                )}

                <div className="flex justify-between items-center relative z-10">
                  <div className="flex items-center gap-2">
                    <span className="text-base font-bold">
                      {item.lord}
                    </span>
                    {isCurrent && !isSelected && (
                      <span className="animate-pulse flex h-1.5 w-1.5 rounded-full bg-accent" />
                    )}
                    {isCurrent && isSelected && (
                      <span className="animate-pulse flex h-1.5 w-1.5 rounded-full bg-on-surface/40" />
                    )}
                  </div>
                </div>
                <div className={`text-xs font-medium mt-0.5 ${isSelected ? 'text-on-surface/70' : 'text-secondary'}`}>
                  {item.start.toLocaleDateString('en-GB', isSookshma ? { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' } : { day: '2-digit', month: 'short', year: 'numeric' })}
                  {' to '}
                  {item.end.toLocaleDateString('en-GB', isSookshma ? { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' } : { day: '2-digit', month: 'short', year: 'numeric' })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-end">
        <div className="flex gap-2">
           <div className="w-2 h-2 rounded-full bg-accent"></div>
           <span className="text-[9px] font-bold text-accent uppercase tracking-widest font-label">Active Dasha</span>
        </div>
      </div>

      <div
        ref={containerRef}
        className="miller-container flex overflow-x-auto bg-white rounded-3xl border border-outline shadow-sm scroll-smooth no-scrollbar"
      >
        {renderColumn('Mahadasha', mahadashas, selectedMd, handleMdClick)}
        {selectedMd && renderColumn('Antardasha', selectedMd.antardashas, selectedAd, handleAdClick)}
        {selectedAd && renderColumn('Pratyantardasha', selectedAd.pratyantardashas, selectedPd, handlePdClick)}
        {selectedPd && renderColumn('Sookshma Dasha', selectedPd.sookshmaDashas, selectedSd, handleSdClick, true)}

        {/* Placeholder for empty state when no MD is selected */}
        {!selectedMd && (
          <div className="flex-grow flex items-center justify-center p-12 text-center border-l border-outline bg-surface-container-lowest/30">
            <div className="max-w-xs">
              <span className="material-symbols-outlined text-4xl text-outline mb-4">account_tree</span>
              <p className="text-xs text-secondary font-medium uppercase tracking-widest">Select a Mahadasha to drill down</p>
            </div>
          </div>
        )}
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
}
