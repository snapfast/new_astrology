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
  const containerRef = useRef<HTMLDivElement>(null);

  const now = useMemo(() => new Date(), []);

  const getStatus = (start: Date, end: Date) => {
    if (now >= start && now <= end) return 'Current';
    if (now > end) return 'Past';
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
  }, [selectedMd, selectedAd, selectedPd]);

  const handleMdClick = (item: Mahadasha | Antardasha | Pratyantardasha | SookshmaDasha) => {
    const md = item as Mahadasha;
    if (selectedMd?.lord === md.lord && selectedMd?.start.getTime() === md.start.getTime()) {
      setSelectedMd(null);
      setSelectedAd(null);
      setSelectedPd(null);
    } else {
      setSelectedMd(md);
      setSelectedAd(null);
      setSelectedPd(null);
    }
  };

  const handleAdClick = (item: Mahadasha | Antardasha | Pratyantardasha | SookshmaDasha) => {
    const ad = item as Antardasha;
    if (selectedAd?.lord === ad.lord && selectedAd?.start.getTime() === ad.start.getTime()) {
      setSelectedAd(null);
      setSelectedPd(null);
    } else {
      setSelectedAd(ad);
      setSelectedPd(null);
    }
  };

  const handlePdClick = (item: Mahadasha | Antardasha | Pratyantardasha | SookshmaDasha) => {
    const pd = item as Pratyantardasha;
    if (selectedPd?.lord === pd.lord && selectedPd?.start.getTime() === pd.start.getTime()) {
      setSelectedPd(null);
    } else {
      setSelectedPd(pd);
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
      <div className="flex-shrink-0 w-72 md:w-80 border-r border-outline flex flex-col h-[500px] bg-white last:border-r-0 first:rounded-l-3xl last:rounded-r-3xl overflow-hidden">
        <div className="bg-surface-container-low border-b border-outline px-6 py-3 shrink-0">
          <h3 className="text-[10px] font-bold text-on-surface uppercase tracking-widest font-label">
            {title}
          </h3>
        </div>
        <div className="overflow-y-auto flex-grow divide-y divide-outline scrollbar-hide">
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
                  px-6 py-4 cursor-pointer transition-all duration-200
                  ${isCurrent ? 'bg-accent/5' : ''}
                  ${isSelected ? 'bg-accent/10' : 'hover:bg-surface-container-lowest'}
                  ${isSelected ? 'border-l-4 border-accent -ml-[1px]' : ''}
                `}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className={`text-sm font-bold ${isSelected ? 'text-accent' : 'text-on-surface'}`}>
                    {item.lord}
                  </span>
                  {isCurrent && (
                    <span className="text-[8px] font-bold uppercase tracking-tighter bg-accent text-white px-1.5 py-0.5 rounded">
                      Current
                    </span>
                  )}
                </div>
                <div className="text-[10px] text-secondary font-medium">
                  {item.start.toLocaleDateString('en-GB', isSookshma ? { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' } : { day: '2-digit', month: '2-digit', year: 'numeric' })}
                </div>
                <div className="text-[10px] text-secondary/60">
                  to {item.end.toLocaleDateString('en-GB', isSookshma ? { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' } : { day: '2-digit', month: '2-digit', year: 'numeric' })}
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
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-medium text-secondary uppercase tracking-widest font-label">
          Explore Dasha Levels (Scroll horizontally)
        </p>
        <div className="flex gap-2">
           <div className="w-2 h-2 rounded-full bg-accent"></div>
           <span className="text-[9px] font-bold text-accent uppercase tracking-widest font-label">Active Path</span>
        </div>
      </div>

      <div
        ref={containerRef}
        className="miller-container flex overflow-x-auto bg-white rounded-3xl border border-outline shadow-sm scroll-smooth no-scrollbar"
      >
        {renderColumn('Mahadasha', mahadashas, selectedMd, handleMdClick)}
        {selectedMd && renderColumn('Antardasha', selectedMd.antardashas, selectedAd, handleAdClick)}
        {selectedAd && renderColumn('Pratyantardasha', selectedAd.pratyantardashas, selectedPd, handlePdClick)}
        {selectedPd && renderColumn('Sookshma Dasha', selectedPd.sookshmaDashas, null, undefined, true)}

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
      `}</style>
    </div>
  );
}
