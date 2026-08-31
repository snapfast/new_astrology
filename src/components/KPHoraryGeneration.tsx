'use client';

import { useState, useEffect, useRef, FormEvent, useMemo, KeyboardEvent } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { sendGAEvent } from '@next/third-parties/google';

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
    errorPob: "Please select a location from the suggestions"
  }};

interface Suggestion {
  name: string;
  lat: string;
  lon: string;
}

interface StoredChartData {
  name: string;
  dob: string;
  tob: string;
  pob: string;
  coords: { lat: string; lon: string } | null;
  kpNumber?: string;
}

const HOROSCOPE_HISTORY_KEY = 'KP_HORARY_FORM_HISTORY';

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

const isValidHistoryItem = (item: unknown): item is StoredChartData => {
  if (!item || typeof item !== 'object') return false;
  const candidate = item as Record<string, unknown>;
  return (
    typeof candidate.name === 'string' &&
    typeof candidate.dob === 'string' &&
    typeof candidate.tob === 'string' &&
    typeof candidate.pob === 'string' &&
    (candidate.coords === null || (
      typeof candidate.coords === 'object' &&
      candidate.coords !== null &&
      typeof (candidate.coords as Record<string, unknown>).lat === 'string' &&
      typeof (candidate.coords as Record<string, unknown>).lon === 'string'
    ))
  );
};

const SUGGESTIONS_CACHE = new Map<string, Suggestion[]>();
const MAX_CACHE_SIZE = 100;

// Initialize cache from sessionStorage for persistence across page refreshes
if (typeof window !== 'undefined') {
  try {
    const stored = sessionStorage.getItem('NOMINATIM_CACHE');
    if (stored) {
      const parsed = JSON.parse(stored);
      Object.entries(parsed).forEach(([key, value]) => {
        SUGGESTIONS_CACHE.set(key, value as Suggestion[]);
      });
    }
  } catch (error) {
    console.error('Error loading Nominatim cache:', error);
  }
}

// formatDobDisplay formats the DOB string from history storage (which is in DD-MM-YYYY format)
// to DD MMM YYYY (e.g., "24 Jul 1995" or "24 जुलाई 1995") for user display.
const formatDobDisplay = (dobStr: string, lang: 'en' | 'hi') => {
  if (!dobStr) return '';
  const parts = dobStr.split('-'); // dobStr is DD-MM-YYYY
  if (parts.length !== 3) return dobStr;
  const [d, m, y] = parts;
  const monthIdx = parseInt(m, 10) - 1;
  if (monthIdx < 0 || monthIdx > 11) return dobStr;

  const monthsEn = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const monthsHi = ["जनवरी", "फरवरी", "मार्च", "अप्रैल", "मई", "जून", "जुलाई", "अगस्त", "सितंबर", "अक्टूबर", "नवंबर", "दिसंबर"];
  const months = lang === 'hi' ? monthsHi : monthsEn;

  return `${d} ${months[monthIdx]} ${y}`;
};

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
  const [suggestions, setSuggestions] = useState<{ name: string; lat: string; lon: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [history, setHistory] = useState<StoredChartData[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [activeHistoryIndex, setActiveHistoryIndex] = useState(-1);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);

  // Performance Optimization: Memoized Map for O(1) duplicate name validation
  const historyMap = useMemo(() => {
    const map = new Map<string, StoredChartData>();
    for (let i = 0; i < history.length; i++) {
      const item = history[i];
      const nameKey = item.name.toLowerCase();
      if (!map.has(nameKey)) {
        map.set(nameKey, item);
      }
    }
    return map;
  }, [history]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const suggestionRef = useRef<HTMLDivElement>(null);
  const historyRef = useRef<HTMLDivElement>(null);

  // Reset submitting state if the URL parameters change (e.g. after soft navigation)
  useEffect(() => {
    setIsSubmitting(false);
  }, [searchParams]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(HOROSCOPE_HISTORY_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) {
            const validHistory = parsed.filter(isValidHistoryItem);
            setHistory(validHistory);
          }
        }
      } catch (error) {
        console.error('Error loading horoscope history:', error);
      }
    }
  }, []);

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
      if (historyRef.current && !historyRef.current.contains(event.target as Node)) {
        setShowHistory(false);
        setActiveHistoryIndex(-1);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const query = pob.trim();
    const cacheKey = query.toLowerCase();

    if (query.length < 3 || query.length > 100) {
      setSuggestions([]);
      return;
    }

    // Performance Optimization: Check in-memory cache before initiating request
    const cached = SUGGESTIONS_CACHE.get(cacheKey);
    if (cached) {
      setSuggestions(cached);
      return;
    }

    const controller = new AbortController();

    const fetchCities = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&addressdetails=1&limit=5&featuretype=city`,
          { signal: controller.signal }
        );
        const data = await response.json();
        interface NominatimAddress {
          city?: string;
          town?: string;
          village?: string;
          suburb?: string;
          hamlet?: string;
          state?: string;
          country?: string;
        }
        interface NominatimItem {
          address: NominatimAddress;
          display_name: string;
          lat: string;
          lon: string;
        }
        const uniqueCitiesMap = data.reduce((map: Map<string, Suggestion>, item: NominatimItem) => {
          const { address, lat, lon, display_name } = item;
          const city = address.city || address.town || address.village || address.suburb || address.hamlet;
          const { state, country } = address;
          const name = city ? `${city}${state ? `, ${state}` : ''}, ${country}` : display_name;

          map.set(name, { name, lat, lon });
          return map;
        }, new Map<string, Suggestion>());
        const uniqueCities: Suggestion[] = Array.from(uniqueCitiesMap.values());

        // Cache the result to prevent redundant network calls for the same query
        if (SUGGESTIONS_CACHE.size >= MAX_CACHE_SIZE) {
          const firstKey = SUGGESTIONS_CACHE.keys().next().value;
          if (firstKey !== undefined) SUGGESTIONS_CACHE.delete(firstKey);
        }
        SUGGESTIONS_CACHE.set(cacheKey, uniqueCities);

        // Persist to sessionStorage
        if (typeof window !== 'undefined') {
          try {
            const cacheObj = Object.fromEntries(SUGGESTIONS_CACHE.entries());
            sessionStorage.setItem('NOMINATIM_CACHE', JSON.stringify(cacheObj));
          } catch {
            // Silently fail on quota errors
          }
        }

        setSuggestions(uniqueCities);
      } catch (error) {
        if (error instanceof Error && error.name !== 'AbortError') {
          console.error('Error fetching cities:', error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(fetchCities, 500);
    return () => {
      clearTimeout(debounceTimer);
      controller.abort(); // Cancel pending request if component re-renders or unmounts
    };
  }, [pob]);

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

  const handleSelectHistory = (item: StoredChartData) => {
    setName(item.name);

    // History stores DD-MM-YYYY, native input needs YYYY-MM-DD
    if (item.dob) {
      const [d, m, y] = item.dob.split('-');
      setDob(`${y}-${m}-${d}`);
    }

    // History stores HH:mm, which native time input also uses
    if (item.tob) {
      setTob(item.tob);
    }

    setPob(item.pob);
    setCoords(item.coords);
    setShowHistory(false);
    setActiveHistoryIndex(-1);

    sendGAEvent({ event: 'action_click', action_name: 'horoscope_history_select' });
  };

  const handleHistoryKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!showHistory || history.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveHistoryIndex(prev => (prev < history.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveHistoryIndex(prev => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === 'Enter' && activeHistoryIndex >= 0) {
      e.preventDefault();
      handleSelectHistory(history[activeHistoryIndex]);
    } else if (e.key === 'Escape') {
      setShowHistory(false);
      setActiveHistoryIndex(-1);
    }
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

    // Save to history
    const newData: StoredChartData = { name, dob: dobString, tob: tobString, pob, coords, kpNumber };
    const updatedHistory = [
      newData,
      ...history.filter(item =>
        item.name !== name || item.dob !== dobString || item.pob !== pob
      )
    ].slice(0, 5);

    setHistory(updatedHistory);
    if (typeof window !== 'undefined') {
      localStorage.setItem(HOROSCOPE_HISTORY_KEY, JSON.stringify(updatedHistory));
    }

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
    <section className={`py-16 bg-background relative z-20 ${className}`}>
      <div className="max-w-4xl mx-auto px-8">
        <div className="bg-surface p-10 md:p-16 rounded-[3rem] shadow-[0_40px_100px_rgba(0,0,0,0.04)] border border-outline/50 relative overflow-hidden">
          <div className="relative z-10">
            <div className="mb-8 md:mb-12 text-center">
              <h2 className="text-2xl md:text-4xl font-normal mb-4 font-headline text-on-surface">{t.title}</h2>
              <p className="text-xs md:text-sm text-on-surface font-body max-w-sm mx-auto">{t.desc}</p>
            </div>
            <form onSubmit={handleSubmit} onBlur={handleFormBlur} action="/kp-horoscope"
              method="GET"
              className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8"
            >
              <div
                className="space-y-2 relative"
                ref={historyRef}
              >
                <label htmlFor="full-name" className={`text-[7px] md:text-[10px] font-medium text-on-surface uppercase ml-1 font-label ${lang === 'en' ? 'tracking-widest' : ''}`}>{t.labelName}</label>
                <div role="combobox" aria-expanded={showHistory && history.length > 0} aria-haspopup="listbox" aria-controls="history-listbox">
                  <input
                    id="full-name"
                    name="name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (!showHistory) setShowHistory(true);
                    }}
                    onFocus={() => setShowHistory(true)}
                    onKeyDown={handleHistoryKeyDown}
                    className={`w-full px-6 py-3 md:py-4 bg-white border ${errors.name ? 'border-red-500' : 'border-outline'} rounded-full focus:ring-1 focus:ring-accent/20 placeholder:text-secondary text-on-surface text-xs md:text-sm font-body`}
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
                {errors.name && <p id="name-error" className="text-[9px] text-red-500 ml-4 font-body" role="alert">{errors.name}</p>}

                {showHistory && history.length > 0 && (
                  <div className="absolute z-[60] left-0 right-0 top-full mt-2 bg-accent border border-white/10 rounded-3xl shadow-lg overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="px-6 py-3 bg-white/10 border-b border-white/5">
                      <span className={`text-[8px] md:text-[10px] font-medium text-white uppercase font-label ${lang === 'en' ? 'tracking-widest' : ''}`}>{t.recentProfiles}</span>
                    </div>
                    <ul id="history-listbox" role="listbox" className="max-h-60 overflow-y-auto">
                      {history.map((item, index) => (
                        <li key={index} id={`history-option-${index}`} role="option" aria-selected={index === activeHistoryIndex}>
                          <button
                            type="button"
                            onClick={() => handleSelectHistory(item)}
                            onMouseEnter={() => setActiveHistoryIndex(index)}
                            className={`w-full text-left px-6 py-4 transition-colors group ${index === activeHistoryIndex ? 'bg-white/20' : 'hover:bg-white/10'}`}
                          >
                            <div className="flex flex-col gap-0.5">
                              <span className="text-xs md:text-sm text-white font-body font-medium transition-colors">{item.name}</span>
                              <div className="flex items-center gap-2 text-[9px] md:text-[10px] text-white font-body">
                                <span>{formatDobDisplay(item.dob, lang)}</span>
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

              <div className="space-y-2">
                <label htmlFor="kpNumber" className={`text-[7px] md:text-[10px] font-medium text-on-surface uppercase ml-1 font-label ${lang === 'en' ? 'tracking-widest' : ''}`}>
                  KP Horary Number (1-249) <span className="text-red-500">*</span>
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
                    className="w-full pl-6 pr-12 py-3 md:py-4 bg-white border border-outline rounded-full focus:ring-1 focus:ring-accent/20 text-on-surface text-xs md:text-sm font-body"
                    required
                  />
                  <span className="absolute right-5 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface/40 pointer-events-none text-lg z-20" aria-hidden="true">format_list_numbered</span>
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="dob-input" className={`text-[7px] md:text-[10px] font-medium text-on-surface uppercase ml-1 font-label ${lang === 'en' ? 'tracking-widest' : ''}`}>{t.labelDob}</label>
                <div className="relative">
                  <input
                    id="dob-input"
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className={`w-full pl-6 pr-12 py-3 md:py-4 bg-white border ${errors.dob ? 'border-red-500' : 'border-outline'} rounded-full focus:ring-1 focus:ring-accent/20 text-transparent text-xs md:text-sm font-body cursor-pointer relative z-10`}
                    required
                    aria-invalid={!!errors.dob}
                    aria-describedby={errors.dob ? "dob-error" : undefined}
                  />
                  <div className="absolute inset-y-0 left-0 flex items-center pl-6 pointer-events-none text-on-surface text-xs md:text-sm font-body z-20">
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
                  <span className="absolute right-5 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface/40 pointer-events-none text-lg z-20" aria-hidden="true">calendar_month</span>
                </div>
                {errors.dob && <p id="dob-error" className="text-[9px] text-red-500 ml-4 font-body" role="alert">{errors.dob}</p>}
              </div>
              <div className="space-y-2">
                <label htmlFor="tob-input" className={`text-[7px] md:text-[10px] font-medium text-on-surface uppercase ml-1 font-label ${lang === 'en' ? 'tracking-widest' : ''}`}>{t.labelTob}</label>
                <div className="relative">
                  <input
                    id="tob-input"
                    type="time"
                    value={tob}
                    onChange={(e) => setTob(e.target.value)}
                    className={`w-full pl-6 pr-12 py-3 md:py-4 bg-white border ${errors.tob ? 'border-red-500' : 'border-outline'} rounded-full focus:ring-1 focus:ring-accent/20 text-on-surface text-xs md:text-sm font-body cursor-pointer`}
                    required
                    aria-invalid={!!errors.tob}
                    aria-describedby={errors.tob ? "tob-error" : undefined}
                  />
                  <span className="absolute right-5 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface/40 pointer-events-none text-lg" aria-hidden="true">schedule</span>
                </div>
                {errors.tob && <p id="tob-error" className="text-[9px] text-red-500 ml-4 font-body" role="alert">{errors.tob}</p>}
              </div>
              <div className="space-y-2 relative" ref={suggestionRef}>
                <label htmlFor="pob-input" className={`text-[7px] md:text-[10px] font-medium text-on-surface uppercase ml-1 font-label ${lang === 'en' ? 'tracking-widest' : ''}`}>{t.labelPob}</label>
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
                    className={`w-full px-6 py-3 md:py-4 bg-white border ${errors.pob ? 'border-red-500' : 'border-outline'} rounded-full focus:ring-1 focus:ring-accent/20 placeholder:text-secondary text-on-surface text-xs md:text-sm font-body`}
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
                {errors.pob && <p id="pob-error" className="text-[9px] text-red-500 ml-4 font-body" role="alert">{errors.pob}</p>}

                {showSuggestions && (suggestions.length > 0 || isLoading) && (
                  <div className="absolute z-50 left-0 right-0 top-full mt-2 bg-surface border border-outline/30 rounded-3xl shadow-lg overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    {isLoading ? (
                      <div className="px-6 py-4 text-xs text-on-surface font-body">{t.searching}</div>
                    ) : (
                      <ul id="suggestions-listbox" role="listbox" className="max-h-60 overflow-y-auto">
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
                              className={`w-full text-left px-6 py-3 text-xs md:text-sm text-on-surface font-body transition-colors ${index === activeSuggestionIndex ? 'bg-accent/20' : 'active:bg-accent/5'}`}
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
                <div className="md:col-span-2 pt-2 md:pt-4">
                  <button
                    className={`w-full py-4 md:py-5 bg-primary text-white rounded-full font-medium text-[10px] md:text-xs uppercase font-label flex items-center justify-center disabled:cursor-not-allowed active:scale-[0.98] transition-transform ${lang === 'en' ? 'tracking-[0.1em]' : ''}`}
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
