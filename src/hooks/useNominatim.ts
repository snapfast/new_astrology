import { useState, useRef, useEffect, useCallback } from 'react';
import { type Suggestion } from '@/lib/types';

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

const SUGGESTIONS_CACHE = new Map<string, Suggestion[]>();
const MAX_CACHE_SIZE = 100;

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

export function useNominatim() {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchSuggestions = useCallback((query: string) => {
    const cacheKey = query.trim().toLowerCase();

    if (cacheKey.length < 2) {
      setSuggestions([]);
      return;
    }

    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    if (abortControllerRef.current) abortControllerRef.current.abort();

    searchTimeoutRef.current = setTimeout(async () => {
      if (SUGGESTIONS_CACHE.has(cacheKey)) {
        setSuggestions(SUGGESTIONS_CACHE.get(cacheKey) || []);
        return;
      }

      setIsSearching(true);
      const controller = new AbortController();
      abortControllerRef.current = controller;

      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&addressdetails=1&limit=5&featuretype=city`,
          { signal: controller.signal }
        );
        const data = await response.json();

        const uniqueCitiesMap = data.reduce((map: Map<string, Suggestion>, item: NominatimItem) => {
          const { address, lat, lon, display_name } = item;
          const city = address.city || address.town || address.village || address.suburb || address.hamlet;
          const { state, country } = address;
          const name = city ? `${city}${state ? `, ${state}` : ''}, ${country}` : display_name;

          map.set(name, { name, lat, lon });
          return map;
        }, new Map<string, Suggestion>());

        const uniqueCities: Suggestion[] = Array.from(uniqueCitiesMap.values());

        if (SUGGESTIONS_CACHE.size >= MAX_CACHE_SIZE) {
          const firstKey = SUGGESTIONS_CACHE.keys().next().value;
          if (firstKey !== undefined) SUGGESTIONS_CACHE.delete(firstKey);
        }
        SUGGESTIONS_CACHE.set(cacheKey, uniqueCities);

        if (typeof window !== 'undefined') {
          try {
            const cacheObj = Object.fromEntries(SUGGESTIONS_CACHE.entries());
            sessionStorage.setItem('NOMINATIM_CACHE', JSON.stringify(cacheObj));
          } catch {
            // Silently fail on quota errors
          }
        }

        if (!controller.signal.aborted) {
          setSuggestions(uniqueCities);
        }
      } catch (error: unknown) {
        if (error instanceof Error && error.name !== 'AbortError') {
          console.error('Error fetching cities:', error);
          if (!controller.signal.aborted) {
            setSuggestions([]);
          }
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsSearching(false);
        }
      }
    }, 500);
  }, []);

  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
      if (abortControllerRef.current) abortControllerRef.current.abort();
    };
  }, []);

  return { suggestions, isSearching, fetchSuggestions, setSuggestions };
}
