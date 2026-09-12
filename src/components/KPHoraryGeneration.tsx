'use client';

import { useState, useEffect, useRef, FormEvent, KeyboardEvent } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { sendGAEvent } from '@next/third-parties/google';
import { useNominatim } from '@/hooks/useNominatim';
import { useProfileHistory, formatDobDisplay } from '@/hooks/useProfileHistory';
import { type StoredChartData } from '@/lib/types';

const TRANSLATIONS = {
  en: {
    title: "KP Prashna Kundli",
    desc: "Enter your details and a Horary number between 1 to 249 to cast a KP Prashna chart.",
    labelName: "Full Name",
    labelDob: "Date of Birth",
    labelTob: "Time of Birth",
    labelPob: "Place of Birth",
    placeholderPob: "City, Country",
    placeholderName: "The earthly name of the soul...",
    recentProfiles: "Recent Profiles",
    searching: "Searching cities...",
    submitBtn: "Generate KP Prashna Chart",
    updateBtn: "Update Prashna",
    loading: "Generating KP Prashna chart...",
    errorName: "Please enter a valid name (min 2 characters)",
    errorHistory: "This name already exists in your history. Please use a unique name.",
    errorDob: "Please select a date of birth",
    errorTob: "Please select a time of birth",
    errorPob: "Please select a location from the suggestions",
    kpTooltip: "Use 1-249 when the exact birth time is unknown or for a specific Horary (Prashna) question. Leave blank to cast a standard time-based chart."
  }};

interface KPHoraryGenerationProps {
  className?: string;
  initialValues?: {
    name: string;
    dob: string;
    tob: string;
    pob: string;
    lat: string;
    lon: string;
    kpNumber?: string;
  };
  isUpdate?: boolean;
  onClose?: () => void;
}

const KPHoraryGeneration = ({ className = "", initialValues, isUpdate = false, onClose }: KPHoraryGenerationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { lang } = useLanguage();
  const t = TRANSLATIONS.en;
  const [name, setName] = useState(initialValues?.name || '');
  const [kpNumber, setKpNumber] = useState(initialValues?.kpNumber || '');
  const [dob, setDob] = useState(initialValues?.dob || '');
  const [tob, setTob] = useState(initialValues?.tob || '');
  const [pob, setPob] = useState(initialValues?.pob || 'New Delhi, Delhi, India');
  const [coords, setCoords] = useState<{ lat: string; lon: string } | null>(
    initialValues?.lat && initialValues?.lon
      ? { lat: initialValues.lat, lon: initialValues.lon }
      : { lat: '28.6139', lon: '77.2090' }
  );
  const { suggestions, isSearching: isLoading, fetchSuggestions } = useNominatim();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);

  const {
    filteredHistory,
    historyMap,
    showHistory,
    setShowHistory,
    activeHistoryIndex,
    setActiveHistoryIndex,
    historyRef,
    saveProfile,
    handleSelectHistory,
    handleHistoryKeyDown
  } = useProfileHistory(name);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const suggestionRef = useRef<HTMLDivElement>(null);

  // Reset submitting state if the URL parameters change (e.g. after soft navigation)
  useEffect(() => {
    setIsSubmitting(false);
  }, [searchParams]);

  useEffect(() => {
    if (initialValues) return;
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    setDob(`${year}-${month}-${day}`);

    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    setTob(`${hours}:${minutes}`);
  }, [initialValues]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionRef.current && !suggestionRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
        setActiveSuggestionIndex(-1);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    fetchSuggestions(pob);
  }, [pob, fetchSuggestions]);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    const trimmedName = name.trim();

    if (!trimmedName || trimmedName.length < 2) {
      newErrors.name = t.errorName;
    } else if (dob && tob) {
      // dob is YYYY-MM-DD, tob is HH:mm
      const [year, month, day] = dob.split('-');
      const dobString = `${day}-${month}-${year}`;
      const tobString = tob;

      const duplicateName = historyMap.get(trimmedName.toLowerCase());
      if (duplicateName) {
        const isExactMatch = duplicateName.dob === dobString &&
          duplicateName.tob === tobString &&
          duplicateName.pob === pob;

        if (!isExactMatch) {
          newErrors.name = t.errorHistory;
        }
      }
    }

    if (!dob) newErrors.dob = t.errorDob;
    if (!tob) newErrors.tob = t.errorTob;
    if (!coords) newErrors.pob = t.errorPob;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onProfileSelect = (item: StoredChartData) => {
    setName(item.name);
    if (item.dob) {
      const parts = item.dob.split('-');
      if (parts.length === 3) {
        if (parts[0].length === 4) {
          setDob(item.dob);
        } else {
          setDob(`${parts[2]}-${parts[1]}-${parts[0]}`);
        }
      }
    }
    if (item.tob) {
      setTob(item.tob);
    }
    setPob(item.pob);
    setCoords(item.coords);
    if (item.kpNumber) {
      setKpNumber(item.kpNumber);
    }
    sendGAEvent({ event: 'action_click', action_name: 'horoscope_history_select' });
  };

  const handleSuggestionKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions || suggestions.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveSuggestionIndex(prev => (prev < suggestions.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveSuggestionIndex(prev => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === 'Enter' && activeSuggestionIndex >= 0) {
      e.preventDefault();
      const suggestion = suggestions[activeSuggestionIndex];
      setPob(suggestion.name);
      setCoords({ lat: suggestion.lat, lon: suggestion.lon });
      setShowSuggestions(false);
      setActiveSuggestionIndex(-1);
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
      setActiveSuggestionIndex(-1);
    }
  };

  const submitForm = () => {
    if (!validateForm()) return;

    setIsSubmitting(true);

    // dob is YYYY-MM-DD, tob is HH:mm
    const [year, month, day] = dob.split('-');
    const dobString = `${day}-${month}-${year}`; // For history display (DD-MM-YYYY)
    const tobString = tob;

    // Save to history (stored as DD-MM-YYYY format)
    const dobFormatted = `${day}-${month}-${year}`;
    saveProfile({ name, dob: dobFormatted, tob: tobString, pob, coords, kpNumber });

    sendGAEvent({ event: 'action_click', action_name: 'generate_horoscope_submit' });

    const isoDob = `${year}-${month}-${day}`;

    const params = new URLSearchParams({
      name: name,
      dob: isoDob,
      tob: tobString,
      pob: pob,
      lat: coords?.lat || '',
      lon: coords?.lon || '',
      kpNumber: kpNumber
    });

    router.push(`/kp-horoscope?${params.toString()}`);

    if (onClose) {
      onClose();
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitForm();
  };

  const handleFormBlur = (e: React.FocusEvent<HTMLFormElement>) => {
    if (!isUpdate) return;

    // Check if the new focused element is outside the form
    const currentTarget = e.currentTarget;

    // e.relatedTarget is the element that received focus
    if (!e.relatedTarget || !currentTarget.contains(e.relatedTarget as Node)) {
      if (name && dob && tob && pob && coords) {
        let hasChanged = false;
        if (initialValues) {
           const initialIsoDob = initialValues.dob;

           if (name !== initialValues.name ||
               dob !== initialIsoDob ||
               tob !== initialValues.tob ||
               pob !== initialValues.pob ||
               coords.lat !== initialValues.lat ||
               coords.lon !== initialValues.lon) {
               hasChanged = true;
           }
        } else {
           hasChanged = true;
        }

        if (hasChanged) {
           submitForm();
        }
      }
    }
  };

  return (
    <section className={`py-8 md:py-12 bg-background relative z-20 ${className}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="bg-surface p-5 md:p-8 rounded-2xl md:rounded-3xl shadow-sm border border-outline/20 relative overflow-hidden">
          <div className="relative z-10">
            <div className="mb-6 md:mb-8 text-center">
              <h2 className="text-xl md:text-3xl font-normal mb-2 md:mb-3 font-headline text-on-surface">{t.title}</h2>
              <p className="text-xs md:text-sm text-on-surface/80 font-body max-w-md mx-auto">{t.desc}</p>
            </div>
            <form onSubmit={handleSubmit} onBlur={handleFormBlur} action="/kp-horoscope"
              method="GET"
              className="grid grid-cols-1 md:grid-cols-2 gap-3.5 md:gap-5"
            >
              <div
                className="space-y-1.5 relative"
                ref={historyRef}
              >
                <label htmlFor="full-name" className={`text-[9px] md:text-[10px] font-medium text-on-surface uppercase ml-1 font-label ${lang === 'en' ? 'tracking-wider' : ''}`}>{t.labelName}</label>
                <div role="combobox" aria-expanded={showHistory && filteredHistory.length > 0} aria-haspopup="listbox" aria-controls="history-listbox">
                  <input
                    id="full-name"
                    name="name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (!showHistory) setShowHistory(true);
                      setActiveHistoryIndex(-1);
                    }}
                    onFocus={() => setShowHistory(true)}
                    onKeyDown={(e) => handleHistoryKeyDown(e, onProfileSelect)}
                    className={`w-full px-4 py-2.5 md:py-3 bg-white border ${errors.name ? 'border-red-500' : 'border-outline'} rounded-full focus:ring-1 focus:ring-accent/20 placeholder:text-secondary text-on-surface text-xs md:text-sm font-body`}
                    placeholder={t.placeholderName}
                    type="text"
                    autoComplete="off"
                    maxLength={100}
                    required
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    aria-autocomplete="list"
                    aria-activedescendant={activeHistoryIndex >= 0 ? `history-option-${activeHistoryIndex}` : undefined}
                  />
                </div>
                {errors.name && <p id="name-error" className="text-[9px] text-red-500 ml-3 font-body" role="alert">{errors.name}</p>}

                {showHistory && filteredHistory.length > 0 && (
                  <div className="absolute z-[60] left-0 right-0 top-full mt-1.5 bg-accent border border-white/10 rounded-2xl shadow-lg overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="px-4 py-2 bg-white/10 border-b border-white/5">
                      <span className="text-[9px] md:text-[10px] font-medium text-white uppercase font-label tracking-wider">{t.recentProfiles}</span>
                    </div>
                    <ul id="history-listbox" role="listbox" className="max-h-52 overflow-y-auto">
                      {filteredHistory.map((item, index) => (
                        <li key={index} id={`history-option-${index}`} role="option" aria-selected={index === activeHistoryIndex}>
                          <button
                            type="button"
                            onClick={() => handleSelectHistory(item, onProfileSelect)}
                            onMouseEnter={() => setActiveHistoryIndex(index)}
                            className={`w-full text-left px-4 py-2.5 transition-colors group ${index === activeHistoryIndex ? 'bg-white/20' : 'hover:bg-white/10'}`}
                          >
                            <div className="flex flex-col gap-0.5">
                              <span className="text-xs text-white font-body font-medium transition-colors">{item.name}</span>
                              <div className="flex items-center gap-2 text-[9px] md:text-[10px] text-white/80 font-body">
                                <span>{formatDobDisplay(item.dob)}</span>
                                <span>•</span>
                                <span className="truncate">{item.pob}</span>
                              </div>
                            </div>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="space-y-1.5 relative group/tooltip">
                <label htmlFor="kpNumber" className="flex items-center gap-1.5 text-[9px] md:text-[10px] font-medium text-on-surface uppercase ml-1 font-label tracking-wider">
                  KP Horary Number (1-249)
                  <span className="material-symbols-outlined text-[14px] text-on-surface/50 cursor-help" aria-label="info">info</span>
                </label>
                <div className="relative">
                  <input
                    id="kpNumber"
                    type="number"
                    min="1"
                    max="249"
                    value={kpNumber}
                    onChange={(e) => { setKpNumber(e.target.value); }}
                    placeholder="e.g. 108"
                    className="w-full pl-4 pr-10 py-2.5 md:py-3 bg-white border border-outline rounded-full focus:ring-1 focus:ring-accent/20 text-on-surface text-xs md:text-sm font-body"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface/60 pointer-events-none text-base z-20" aria-hidden="true">format_list_numbered</span>
                </div>
                <div className="absolute left-0 top-full mt-2 w-[240px] p-2.5 bg-surface text-on-surface text-[10px] md:text-xs rounded-xl shadow-lg border border-outline/20 opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all z-30 font-body leading-relaxed">
                  {t.kpTooltip}
                  <div className="absolute bottom-full left-6 -mb-px border-4 border-transparent border-b-surface"></div>
                </div>
              </div>
              <div className="space-y-1.5">
                <label htmlFor="dob-input" className="text-[9px] md:text-[10px] font-medium text-on-surface uppercase ml-1 font-label tracking-wider">{t.labelDob}</label>
                <div className="relative">
                  <input
                    id="dob-input"
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className={`w-full pl-4 pr-10 py-2.5 md:py-3 bg-white border ${errors.dob ? 'border-red-500' : 'border-outline'} rounded-full focus:ring-1 focus:ring-accent/20 text-transparent text-xs md:text-sm font-body cursor-pointer relative z-10`}
                    required
                    aria-invalid={!!errors.dob}
                    aria-describedby={errors.dob ? "dob-error" : undefined}
                  />
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-on-surface text-xs md:text-sm font-body z-20">
                    {(() => {
                      if (!dob) return '';
                      const [y, m, d] = dob.split('-');
                      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                      const monthIdx = parseInt(m, 10) - 1;
                      if (monthIdx >= 0 && monthIdx < 12) {
                        return `${parseInt(d, 10)} ${months[monthIdx]} ${y}`;
                      }
                      return dob;
                    })()}
                  </div>
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface/60 pointer-events-none text-base z-20" aria-hidden="true">calendar_month</span>
                </div>
                {errors.dob && <p id="dob-error" className="text-[9px] text-red-500 ml-3 font-body" role="alert">{errors.dob}</p>}
              </div>
              <div className="space-y-1.5">
                <label htmlFor="tob-input" className="text-[9px] md:text-[10px] font-medium text-on-surface uppercase ml-1 font-label tracking-wider">{t.labelTob}</label>
                <div className="relative">
                  <input
                    id="tob-input"
                    type="time"
                    value={tob}
                    onChange={(e) => setTob(e.target.value)}
                    className={`w-full pl-4 pr-10 py-2.5 md:py-3 bg-white border ${errors.tob ? 'border-red-500' : 'border-outline'} rounded-full focus:ring-1 focus:ring-accent/20 text-on-surface text-xs md:text-sm font-body cursor-pointer`}
                    required
                    aria-invalid={!!errors.tob}
                    aria-describedby={errors.tob ? "tob-error" : undefined}
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface/60 pointer-events-none text-base" aria-hidden="true">schedule</span>
                </div>
                {errors.tob && <p id="tob-error" className="text-[9px] text-red-500 ml-3 font-body" role="alert">{errors.tob}</p>}
              </div>
              <div className="space-y-1.5 relative" ref={suggestionRef}>
                <label htmlFor="pob-input" className="text-[9px] md:text-[10px] font-medium text-on-surface uppercase ml-1 font-label tracking-wider">{t.labelPob}</label>
                <div role="combobox" aria-expanded={showSuggestions && (suggestions.length > 0 || isLoading)} aria-haspopup="listbox" aria-controls="suggestions-listbox">
                  <input
                    id="pob-input"
                    name="pob"
                    value={pob}
                    onChange={(e) => {
                      setPob(e.target.value);
                      setCoords(null);
                      setShowSuggestions(true);
                      setActiveSuggestionIndex(-1);
                    }}
                    onFocus={() => setShowSuggestions(true)}
                    onKeyDown={handleSuggestionKeyDown}
                    className={`w-full px-4 py-2.5 md:py-3 bg-white border ${errors.pob ? 'border-red-500' : 'border-outline'} rounded-full focus:ring-1 focus:ring-accent/20 placeholder:text-secondary text-on-surface text-xs md:text-sm font-body`}
                    placeholder={t.placeholderPob}
                    type="text"
                    autoComplete="off"
                    maxLength={100}
                    required
                    aria-invalid={!!errors.pob}
                    aria-describedby={errors.pob ? "pob-error" : undefined}
                    aria-autocomplete="list"
                    aria-activedescendant={activeSuggestionIndex >= 0 ? `suggestion-option-${activeSuggestionIndex}` : undefined}
                  />
                </div>
                {errors.pob && <p id="pob-error" className="text-[9px] text-red-500 ml-3 font-body" role="alert">{errors.pob}</p>}

                {showSuggestions && (suggestions.length > 0 || isLoading) && (
                  <div className="absolute z-50 left-0 right-0 top-full mt-1.5 bg-surface border border-outline/20 rounded-2xl shadow-lg overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    {isLoading ? (
                      <div className="px-4 py-3 text-xs text-on-surface font-body">{t.searching}</div>
                    ) : (
                      <ul id="suggestions-listbox" role="listbox" className="max-h-52 overflow-y-auto">
                        {suggestions.map((suggestion, index) => (
                          <li key={index} id={`suggestion-option-${index}`} role="option" aria-selected={index === activeSuggestionIndex}>
                            <button
                              type="button"
                              onClick={() => {
                                setPob(suggestion.name);
                                setCoords({ lat: suggestion.lat, lon: suggestion.lon });
                                setShowSuggestions(false);
                                setActiveSuggestionIndex(-1);
                              }}
                              onMouseEnter={() => setActiveSuggestionIndex(index)}
                              className={`w-full text-left px-4 py-2.5 text-xs md:text-sm text-on-surface font-body transition-colors ${index === activeSuggestionIndex ? 'bg-accent/20' : 'active:bg-accent/5'}`}
                            >
                              {suggestion.name}
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
              {!isUpdate && (
                <div className="md:col-span-2 pt-2 md:pt-3">
                  <button
                    className="w-full py-3 md:py-3.5 bg-primary text-white rounded-full font-medium text-[11px] md:text-xs uppercase font-label flex items-center justify-center disabled:cursor-not-allowed active:scale-[0.98] transition-transform tracking-wider"
                    type="submit"
                    disabled={isSubmitting}
                    aria-busy={isSubmitting}
                    aria-label={isSubmitting ? t.loading : t.submitBtn}
                  >
                    {isSubmitting ? (
                      <div className="loading-spinner text-accent"></div>
                    ) : (
                      t.submitBtn
                    )}
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KPHoraryGeneration;
