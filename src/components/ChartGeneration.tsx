'use client';

import { useState, useEffect, useRef, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

interface Suggestion {
  name: string;
  lat: string;
  lon: string;
}

const SUGGESTIONS_CACHE = new Map<string, Suggestion[]>();
const MAX_CACHE_SIZE = 100;

const isValidDate = (dateString: string) => {
  const regex = /^(\d{2})-(\d{2})-(\d{4})$/;
  if (!regex.test(dateString)) return false;

  const [day, month, year] = dateString.split('-').map(Number);
  const date = new Date(year, month - 1, day);

  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day &&
    year >= 1800 &&
    year <= 2100
  );
};

const formatToIndianDate = (value: string) => {
  const digits = value.replace(/\D/g, '');
  let formatted = '';

  if (digits.length > 0) {
    formatted += digits.substring(0, 2);
    if (digits.length > 2) {
      formatted += '-' + digits.substring(2, 4);
      if (digits.length > 4) {
        formatted += '-' + digits.substring(4, 8);
      }
    }
  }
  return formatted;
};

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

const ChartGeneration = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [tob, setTob] = useState('');
  const [pob, setPob] = useState('New Delhi, Delhi, India');
  const [coords, setCoords] = useState<{ lat: string; lon: string } | null>({ lat: '28.6139', lon: '77.2090' });
  const [suggestions, setSuggestions] = useState<{ name: string; lat: string; lon: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const suggestionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    setDob(`${day}-${month}-${year}`);
    setTob(`${hours}:${minutes}`);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionRef.current && !suggestionRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const query = pob.trim();
    const cacheKey = query.toLowerCase();

    if (query.length < 3) {
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
        const cityData = data.map((item: NominatimItem) => {
          const address = item.address;
          const city = address.city || address.town || address.village || address.suburb || address.hamlet;
          const state = address.state;
          const country = address.country;
          const name = city ? `${city}${state ? `, ${state}` : ''}, ${country}` : item.display_name;

          return {
            name,
            lat: item.lat,
            lon: item.lon
          };
        });
        // Filter unique names by display name
        const uniqueCities = Array.from(new Map(cityData.map((item: Suggestion) => [item.name, item])).values()) as Suggestion[];

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
    if (!name.trim() || name.length < 2) newErrors.name = 'Please enter a valid name (min 2 characters)';
    if (!isValidDate(dob)) newErrors.dob = 'Please enter a valid date (DD-MM-YYYY)';
    if (!tob) newErrors.tob = 'Please enter time of birth';
    if (!coords) newErrors.pob = 'Please select a location from the suggestions';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    const [day, month, year] = dob.split('-');
    const isoDob = `${year}-${month}-${day}`;

    const params = new URLSearchParams({
      name: name,
      dob: isoDob,
      tob: tob,
      pob: pob,
      lat: coords?.lat || '',
      lon: coords?.lon || '',
    });

    router.push(`/horoscope?${params.toString()}`);
  };

  return (
    <section className="py-24 bg-background -mt-32 relative z-20">
      <div className="max-w-4xl mx-auto px-8">
        <div className="bg-surface p-10 md:p-16 rounded-[3rem] shadow-[0_40px_100px_rgba(0,0,0,0.04)] border border-outline/50 relative overflow-hidden">
          <div className="relative z-10">
            <div className="mb-8 md:mb-12 text-center">
              <h2 className="text-2xl md:text-4xl font-normal mb-4 font-headline text-on-surface">Generate Your Free Chart</h2>
              <p className="text-xs md:text-sm text-secondary font-body max-w-sm mx-auto">Enter your details to unlock a precise map of the stars at the moment of your birth.</p>
            </div>
            <form
              onSubmit={handleSubmit}
              action="/horoscope"
              method="GET"
              className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8"
            >
              <div className="space-y-2">
                <label className="text-[7px] md:text-[10px] font-medium text-secondary uppercase tracking-widest ml-1 font-label">Full Name</label>
                <input
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`w-full px-6 py-3 md:py-4 bg-surface-container-low border ${errors.name ? 'border-red-500' : 'border-outline'} rounded-full focus:ring-1 focus:ring-accent/20 placeholder:text-secondary/30 text-on-surface text-xs md:text-sm font-body`}
                  placeholder="John Doe"
                  type="text"
                  required
                />
                {errors.name && <p className="text-[9px] text-red-500 ml-4 font-body">{errors.name}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-[7px] md:text-[10px] font-medium text-secondary uppercase tracking-widest ml-1 font-label">Date of Birth (DD-MM-YYYY)</label>
                <input
                  name="dob"
                  value={dob}
                  onChange={(e) => setDob(formatToIndianDate(e.target.value))}
                  placeholder="DD-MM-YYYY"
                  inputMode="numeric"
                  maxLength={10}
                  className={`w-full px-6 py-3 md:py-4 bg-surface-container-low border ${errors.dob ? 'border-red-500' : 'border-outline'} rounded-full focus:ring-1 focus:ring-accent/20 text-on-surface text-xs md:text-sm font-body`}
                  type="text"
                  required
                />
                {errors.dob && <p className="text-[9px] text-red-500 ml-4 font-body">{errors.dob}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-[7px] md:text-[10px] font-medium text-secondary uppercase tracking-widest ml-1 font-label">Time of Birth</label>
                <input
                  name="tob"
                  value={tob}
                  onChange={(e) => setTob(e.target.value)}
                  className={`w-full px-6 py-3 md:py-4 bg-surface-container-low border ${errors.tob ? 'border-red-500' : 'border-outline'} rounded-full focus:ring-1 focus:ring-accent/20 text-on-surface text-xs md:text-sm font-body`}
                  type="time"
                  required
                />
                {errors.tob && <p className="text-[9px] text-red-500 ml-4 font-body">{errors.tob}</p>}
              </div>
              <div className="space-y-2 relative" ref={suggestionRef}>
                <label className="text-[7px] md:text-[10px] font-medium text-secondary uppercase tracking-widest ml-1 font-label">Place of Birth</label>
                <input
                  name="pob"
                  value={pob}
                  onChange={(e) => {
                    setPob(e.target.value);
                    setCoords(null);
                    setShowSuggestions(true);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  className={`w-full px-6 py-3 md:py-4 bg-surface-container-low border ${errors.pob ? 'border-red-500' : 'border-outline'} rounded-full focus:ring-1 focus:ring-accent/20 placeholder:text-secondary/30 text-on-surface text-xs md:text-sm font-body`}
                  placeholder="City, Country"
                  type="text"
                  autoComplete="off"
                  required
                />
                {errors.pob && <p className="text-[9px] text-red-500 ml-4 font-body">{errors.pob}</p>}

                {showSuggestions && (suggestions.length > 0 || isLoading) && (
                  <div className="absolute z-50 left-0 right-0 top-full mt-2 bg-surface border border-outline/30 rounded-3xl shadow-lg overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    {isLoading ? (
                      <div className="px-6 py-4 text-xs text-secondary/50 font-body italic">Searching cities...</div>
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
                  className="w-full py-4 md:py-5 bg-primary text-white rounded-full font-medium text-[10px] md:text-xs tracking-[0.1em] uppercase font-label flex items-center justify-center disabled:opacity-80 disabled:cursor-not-allowed"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <svg className="animate-spin h-5 w-5 text-accent" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <path
                        className="opacity-25"
                        stroke="currentColor"
                        strokeWidth="3"
                        d="M12 2.5L19.8 7V17L12 21.5L4.2 17V7L12 2.5Z"
                      />
                      <path
                        className="opacity-75"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeDasharray="20 40"
                        d="M12 2.5L19.8 7V17L12 21.5L4.2 17V7L12 2.5Z"
                      />
                    </svg>
                  ) : (
                    "Generate Horoscope Chart"
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
