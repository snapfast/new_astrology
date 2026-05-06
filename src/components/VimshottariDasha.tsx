'use client';

import { useState, useMemo } from 'react';
import { Mahadasha, Antardasha, Pratyantardasha } from '@/lib/astrology';

interface VimshottariDashaProps {
  mahadashas: Mahadasha[];
}

type DashaLevel = 'mahadasha' | 'antardasha' | 'pratyantardasha' | 'sookshma';

export default function VimshottariDasha({ mahadashas }: VimshottariDashaProps) {
  const [level, setLevel] = useState<DashaLevel>('mahadasha');
  const [selectedMd, setSelectedMd] = useState<Mahadasha | null>(null);
  const [selectedAd, setSelectedAd] = useState<Antardasha | null>(null);
  const [selectedPd, setSelectedPd] = useState<Pratyantardasha | null>(null);

  const now = useMemo(() => new Date(), []);

  const currentData = useMemo(() => {
    if (level === 'mahadasha') return mahadashas;
    if (level === 'antardasha' && selectedMd) return selectedMd.antardashas;
    if (level === 'pratyantardasha' && selectedAd) return selectedAd.pratyantardashas;
    if (level === 'sookshma' && selectedPd) return selectedPd.sookshmaDashas;
    return [];
  }, [level, mahadashas, selectedMd, selectedAd, selectedPd]);

  const handleRowClick = (item: Mahadasha | Antardasha | Pratyantardasha) => {
    if (level === 'mahadasha') {
      setSelectedMd(item as Mahadasha);
      setLevel('antardasha');
    } else if (level === 'antardasha') {
      setSelectedAd(item as Antardasha);
      setLevel('pratyantardasha');
    } else if (level === 'pratyantardasha') {
      setSelectedPd(item as Pratyantardasha);
      setLevel('sookshma');
    }
  };

  const navigateBack = (targetLevel: DashaLevel) => {
    setLevel(targetLevel);
    if (targetLevel === 'mahadasha') {
      setSelectedMd(null);
      setSelectedAd(null);
      setSelectedPd(null);
    } else if (targetLevel === 'antardasha') {
      setSelectedAd(null);
      setSelectedPd(null);
    } else if (targetLevel === 'pratyantardasha') {
      setSelectedPd(null);
    }
  };

  const getStatus = (start: Date, end: Date) => {
    if (now >= start && now <= end) return 'Current';
    if (now > end) return 'Past';
    return 'Upcoming';
  };

  const getLevelLabel = () => {
    switch (level) {
      case 'mahadasha': return 'Mahadasha';
      case 'antardasha': return 'Antardasha';
      case 'pratyantardasha': return 'Pratyantardasha';
      case 'sookshma': return 'Sookshma Dasha';
    }
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumbs / Navigation */}
      <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm font-medium">
        <button
          onClick={() => navigateBack('mahadasha')}
          className={`hover:text-accent transition-colors ${level === 'mahadasha' ? 'text-accent font-bold' : 'text-secondary'}`}
        >
          All Mahadashas
        </button>

        {selectedMd && (
          <>
            <span className="text-outline">/</span>
            <button
              onClick={() => navigateBack('antardasha')}
              className={`hover:text-accent transition-colors ${level === 'antardasha' ? 'text-accent font-bold' : 'text-secondary'}`}
            >
              {selectedMd.lord} MD
            </button>
          </>
        )}

        {selectedAd && (
          <>
            <span className="text-outline">/</span>
            <button
              onClick={() => navigateBack('pratyantardasha')}
              className={`hover:text-accent transition-colors ${level === 'pratyantardasha' ? 'text-accent font-bold' : 'text-secondary'}`}
            >
              {selectedAd.lord} AD
            </button>
          </>
        )}

        {selectedPd && (
          <>
            <span className="text-outline">/</span>
            <span className="text-accent font-bold">
              {selectedPd.lord} PD
            </span>
          </>
        )}
      </div>

      <div className="overflow-x-auto bg-white rounded-3xl border border-outline shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container-low border-b border-outline">
              <th className="px-6 py-4 text-xs font-bold text-on-surface uppercase tracking-widest font-label">
                {getLevelLabel()} Lord
              </th>
              <th className="px-6 py-4 text-xs font-bold text-on-surface uppercase tracking-widest font-label">Start Date</th>
              <th className="px-6 py-4 text-xs font-bold text-on-surface uppercase tracking-widest font-label">End Date</th>
              <th className="px-6 py-4 text-xs font-bold text-on-surface uppercase tracking-widest font-label">Status</th>
              {level !== 'sookshma' && (
                <th className="px-6 py-4 text-xs font-bold text-on-surface uppercase tracking-widest font-label text-right pdf-hide">Action</th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-outline">
            {currentData.map((item, idx: number) => {
              const status = getStatus(item.start, item.end);
              const isCurrent = status === 'Current';
              const isPast = status === 'Past';

              return (
                <tr
                  key={idx}
                  onClick={() => level !== 'sookshma' && handleRowClick(item)}
                  className={`
                    ${isCurrent ? 'bg-accent/5' : ''}
                    ${level !== 'sookshma' ? 'cursor-pointer hover:bg-surface-container-lowest' : ''}
                    transition-colors
                  `}
                >
                  <td className="px-6 py-4 text-sm font-medium text-on-surface">{item.lord}</td>
                  <td className="px-6 py-4 text-sm text-on-surface">
                    {item.start.toLocaleDateString('en-GB', level === 'sookshma' ? { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' } : { day: '2-digit', month: '2-digit', year: 'numeric' })}
                  </td>
                  <td className="px-6 py-4 text-sm text-on-surface">
                    {item.end.toLocaleDateString('en-GB', level === 'sookshma' ? { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' } : { day: '2-digit', month: '2-digit', year: 'numeric' })}
                  </td>
                  <td className="px-6 py-4">
                    {isCurrent ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent/20 text-accent">
                        Current
                      </span>
                    ) : isPast ? (
                      <span className="text-xs text-secondary/50">Past</span>
                    ) : (
                      <span className="text-xs text-secondary/50">Upcoming</span>
                    )}
                  </td>
                  {level !== 'sookshma' && (
                    <td className="px-6 py-4 text-right pdf-hide">
                      <span className="material-symbols-outlined text-outline text-sm">chevron_right</span>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {level !== 'sookshma' && (
        <p className="text-[10px] text-secondary text-center italic pdf-hide">Click on a row to explore sub-periods</p>
      )}
    </div>
  );
}
