'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

interface Suggestion {
  name: string;
  lat: string;
  lon: string;
}

const SUGGESTIONS_CACHE: Record<string, Suggestion[]> = {};

const ChartGeneration = () => {
  const router = useRouter();
  const [pob, setPob] = useState('');
  const [coords, setCoords] = useState<{ lat: string; lon: string } | null>(null);
  const [suggestions, setSuggestions] = useState<{ name: string; lat: string; lon: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionRef = useRef<HTMLDivElement>(null);

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
    if (query.length < 3) {
      setSuggestions([]);
      return;
    }

    // Performance Optimization: Check in-memory cache before initiating request
    if (SUGGESTIONS_CACHE[query]) {
      setSuggestions(SUGGESTIONS_CACHE[query]);
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
        SUGGESTIONS_CACHE[query] = uniqueCities;
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name');
    const dob = formData.get('dob');
    const tob = formData.get('tob');
    const finalPob = pob;

    const params = new URLSearchParams({
      name: name as string,
      dob: dob as string,
      tob: tob as string,
      pob: finalPob,
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
              <h2 className="text-2xl md:text-4xl font-normal mb-4 font-headline text-on-surface">Generate Your Chart</h2>
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
                  className="w-full px-6 py-3 md:py-4 bg-surface-container-low border border-outline rounded-full focus:ring-1 focus:ring-accent/20 placeholder:text-secondary/30 text-on-surface text-xs md:text-sm font-body"
                  placeholder="John Doe"
                  type="text"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-[7px] md:text-[10px] font-medium text-secondary uppercase tracking-widest ml-1 font-label">Date of Birth</label>
                <input
                  name="dob"
                  className="w-full px-6 py-3 md:py-4 bg-surface-container-low border border-outline rounded-full focus:ring-1 focus:ring-accent/20 text-on-surface text-xs md:text-sm font-body"
                  type="date"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-[7px] md:text-[10px] font-medium text-secondary uppercase tracking-widest ml-1 font-label">Time of Birth</label>
                <input
                  name="tob"
                  className="w-full px-6 py-3 md:py-4 bg-surface-container-low border border-outline rounded-full focus:ring-1 focus:ring-accent/20 text-on-surface text-xs md:text-sm font-body"
                  type="time"
                  required
                />
              </div>
              <div className="space-y-2 relative" ref={suggestionRef}>
                <label className="text-[7px] md:text-[10px] font-medium text-secondary uppercase tracking-widest ml-1 font-label">Place of Birth</label>
                <input
                  name="pob"
                  value={pob}
                  onChange={(e) => {
                    setPob(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  className="w-full px-6 py-3 md:py-4 bg-surface-container-low border border-outline rounded-full focus:ring-1 focus:ring-accent/20 placeholder:text-secondary/30 text-on-surface text-xs md:text-sm font-body"
                  placeholder="City, Country"
                  type="text"
                  autoComplete="off"
                  required
                />

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
                    <div className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4 text-accent" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Generating...</span>
                    </div>
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
