'use client';

import { useState, useEffect, useRef, FormEvent, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';

const TRANSLATIONS = {
  en: {
    title: "Generate Your Free Chart",
    desc: "Enter your details to unlock a precise map of the stars at the moment of your birth.",
    labelName: "Full Name",
    labelDob: "Date of Birth",
    labelTob: "Time of Birth",
    labelPob: "Place of Birth",
    placeholderPob: "City, Country",
    recentProfiles: "Recent Profiles",
    searching: "Searching cities...",
    submitBtn: "Generate Horoscope Chart",
    loading: "Generating horoscope chart...",
    errorName: "Please enter a valid name (min 2 characters)",
    errorHistory: "This name already exists in your history. Please use a unique name.",
    errorDob: "Please select a date of birth",
    errorTob: "Please select a time of birth",
    errorPob: "Please select a location from the suggestions"
  },
  hi: {
    title: "अपनी मुफ्त कुंडली बनाएं",
    desc: "अपने जन्म के क्षण में सितारों के सटीक मानचित्र को अनलॉक करने के लिए अपना विवरण दर्ज करें।",
    labelName: "पूरा नाम",
    labelDob: "जन्म तिथि",
    labelTob: "जन्म समय",
    labelPob: "जन्म स्थान",
    placeholderPob: "शहर, देश",
    recentProfiles: "हाल के प्रोफाइल",
    searching: "शहर खोजे जा रहे हैं...",
    submitBtn: "कुंडली बनाएं",
    loading: "कुंडली बनाई जा रही है...",
    errorName: "कृपया एक वैध नाम दर्ज करें (न्यूनतम 2 वर्ण)",
    errorHistory: "यह नाम आपकी हिस्ट्री में पहले से मौजूद है। कृपया एक अनूठा नाम उपयोग करें।",
    errorDob: "कृपया जन्म तिथि चुनें",
    errorTob: "कृपया जन्म का समय चुनें",
    errorPob: "कृपया सुझावों में से एक स्थान चुनें"
  }
};

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
}

const HOROSCOPE_HISTORY_KEY = 'HOROSCOPE_FORM_HISTORY';

interface ChartGenerationProps {
  className?: string;
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

const ChartGeneration = ({ className = "-mt-32" }: ChartGenerationProps) => {
  const router = useRouter();
  const { lang } = useLanguage();
  const t = TRANSLATIONS[lang];
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [tob, setTob] = useState('');
  const [pob, setPob] = useState('New Delhi, Delhi, India');
  const [coords, setCoords] = useState<{ lat: string; lon: string } | null>({ lat: '28.6139', lon: '77.2090' });
  const [suggestions, setSuggestions] = useState<{ name: string; lat: string; lon: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [history, setHistory] = useState<StoredChartData[]>([]);
  const [showHistory, setShowHistory] = useState(false);

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
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    setDob(`${year}-${month}-${day}`);

    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    setTob(`${hours}:${minutes}`);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionRef.current && !suggestionRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
      if (historyRef.current && !historyRef.current.contains(event.target as Node)) {
        setShowHistory(false);
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
        const uniqueCitiesMap = new Map<string, Suggestion>();
        for (let i = 0; i < data.length; i++) {
          const item: NominatimItem = data[i];
          const address = item.address;
          const city = address.city || address.town || address.village || address.suburb || address.hamlet;
          const state = address.state;
          const country = address.country;
          const name = city ? `${city}${state ? `, ${state}` : ''}, ${country}` : item.display_name;

          uniqueCitiesMap.set(name, {
            name,
            lat: item.lat,
            lon: item.lon
          });
        }
        const uniqueCities = Array.from(uniqueCitiesMap.values());

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
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    // dob is YYYY-MM-DD, tob is HH:mm
    const [year, month, day] = dob.split('-');
    const dobString = `${day}-${month}-${year}`; // For history display (DD-MM-YYYY)
    const tobString = tob;

    // Save to history
    const newData: StoredChartData = { name, dob: dobString, tob: tobString, pob, coords };
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

    const isoDob = `${year}-${month}-${day}`;

    const params = new URLSearchParams({
      name: name,
      dob: isoDob,
      tob: tobString,
      pob: pob,
      lat: coords?.lat || '',
      lon: coords?.lon || '',
    });

    router.push(`/horoscope?${params.toString()}`);
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
            <form
              onSubmit={handleSubmit}
              action="/horoscope"
              method="GET"
              className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8"
            >
              <div
                className="space-y-2 relative"
                ref={historyRef}
              >
                <label htmlFor="full-name" className={`text-[7px] md:text-[10px] font-medium text-on-surface uppercase ml-1 font-label ${lang === 'en' ? 'tracking-widest' : ''}`}>{t.labelName}</label>
                <input
                  id="full-name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onFocus={() => setShowHistory(true)}
                  className={`w-full px-6 py-3 md:py-4 bg-surface-container-low border ${errors.name ? 'border-red-500' : 'border-outline'} rounded-full focus:ring-1 focus:ring-accent/20 placeholder:text-on-surface text-on-surface text-xs md:text-sm font-body`}
                  placeholder="Kamini Bali"
                  type="text"
                  autoComplete="off"
                  maxLength={100}
                  required
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                />
                {errors.name && <p id="name-error" className="text-[9px] text-red-500 ml-4 font-body" role="alert">{errors.name}</p>}

                {showHistory && history.length > 0 && (
                  <div className="absolute z-[60] left-0 right-0 top-full mt-2 bg-accent border border-white/10 rounded-3xl shadow-lg overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="px-6 py-3 bg-white/10 border-b border-white/5">
                      <span className={`text-[8px] md:text-[10px] font-medium text-white uppercase font-label ${lang === 'en' ? 'tracking-widest' : ''}`}>{t.recentProfiles}</span>
                    </div>
                    <ul className="max-h-60 overflow-y-auto">
                      {history.map((item, index) => (
                        <li key={index}>
                          <button
                            type="button"
                            onClick={() => handleSelectHistory(item)}
                            className="w-full text-left px-6 py-4 transition-colors hover:bg-white/10 group"
                          >
                            <div className="flex flex-col gap-0.5">
                              <span className="text-xs md:text-sm text-white font-body font-medium transition-colors">{item.name}</span>
                              <div className="flex items-center gap-2 text-[9px] md:text-[10px] text-white font-body">
                                <span>{item.dob}</span>
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
                <label htmlFor="dob-input" className={`text-[7px] md:text-[10px] font-medium text-on-surface uppercase ml-1 font-label ${lang === 'en' ? 'tracking-widest' : ''}`}>{t.labelDob}</label>
                <input
                  id="dob-input"
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className={`w-full px-6 py-3 md:py-4 bg-surface-container-low border ${errors.dob ? 'border-red-500' : 'border-outline'} rounded-full focus:ring-1 focus:ring-accent/20 text-on-surface text-xs md:text-sm font-body cursor-pointer`}
                  required
                  aria-invalid={!!errors.dob}
                  aria-describedby={errors.dob ? "dob-error" : undefined}
                />
                {errors.dob && <p id="dob-error" className="text-[9px] text-red-500 ml-4 font-body" role="alert">{errors.dob}</p>}
              </div>
              <div className="space-y-2">
                <label htmlFor="tob-input" className={`text-[7px] md:text-[10px] font-medium text-on-surface uppercase ml-1 font-label ${lang === 'en' ? 'tracking-widest' : ''}`}>{t.labelTob}</label>
                <input
                  id="tob-input"
                  type="time"
                  value={tob}
                  onChange={(e) => setTob(e.target.value)}
                  className={`w-full px-6 py-3 md:py-4 bg-surface-container-low border ${errors.tob ? 'border-red-500' : 'border-outline'} rounded-full focus:ring-1 focus:ring-accent/20 text-on-surface text-xs md:text-sm font-body cursor-pointer`}
                  required
                  aria-invalid={!!errors.tob}
                  aria-describedby={errors.tob ? "tob-error" : undefined}
                />
                {errors.tob && <p id="tob-error" className="text-[9px] text-red-500 ml-4 font-body" role="alert">{errors.tob}</p>}
              </div>
              <div className="space-y-2 relative" ref={suggestionRef}>
                <label htmlFor="pob-input" className={`text-[7px] md:text-[10px] font-medium text-on-surface uppercase ml-1 font-label ${lang === 'en' ? 'tracking-widest' : ''}`}>{t.labelPob}</label>
                <input
                  id="pob-input"
                  name="pob"
                  value={pob}
                  onChange={(e) => {
                    setPob(e.target.value);
                    setCoords(null);
                    setShowSuggestions(true);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  className={`w-full px-6 py-3 md:py-4 bg-surface-container-low border ${errors.pob ? 'border-red-500' : 'border-outline'} rounded-full focus:ring-1 focus:ring-accent/20 placeholder:text-on-surface text-on-surface text-xs md:text-sm font-body`}
                  placeholder={t.placeholderPob}
                  type="text"
                  autoComplete="off"
                  maxLength={100}
                  required
                  aria-invalid={!!errors.pob}
                  aria-describedby={errors.pob ? "pob-error" : undefined}
                />
                {errors.pob && <p id="pob-error" className="text-[9px] text-red-500 ml-4 font-body" role="alert">{errors.pob}</p>}

                {showSuggestions && (suggestions.length > 0 || isLoading) && (
                  <div className="absolute z-50 left-0 right-0 top-full mt-2 bg-surface border border-outline/30 rounded-3xl shadow-lg overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    {isLoading ? (
                      <div className="px-6 py-4 text-xs text-on-surface font-body">{t.searching}</div>
                    ) : (
                      <ul className="max-h-60 overflow-y-auto">
                        {suggestions.map((suggestion, index) => (
                          <li key={index}>
                            <button
                              type="button"
                              onClick={() => {
                                setPob(suggestion.name);
                                setCoords({ lat: suggestion.lat, lon: suggestion.lon });
                                setShowSuggestions(false);
                              }}
                              className="w-full text-left px-6 py-3 text-xs md:text-sm text-on-surface font-body active:bg-accent/5 transition-colors"
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
              <div className="md:col-span-2 pt-2 md:pt-4">
                <button
                  className={`w-full py-4 md:py-5 bg-primary text-white rounded-full font-medium text-[10px] md:text-xs uppercase font-label flex items-center justify-center disabled:cursor-not-allowed ${lang === 'en' ? 'tracking-[0.1em]' : ''}`}
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
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChartGeneration;
