'use client';

import { useState, useEffect, useMemo, useRef, KeyboardEvent } from 'react';
import PageHeader from '@/components/PageHeader';
import ExploreTools from '@/components/ExploreTools';
import { calculateBTRData } from '@/lib/btr';
import KundliChart from '@/components/KundliChart';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from '@/context/LanguageContext';

interface Suggestion {
  name: string;
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

export default function BtrClientPage() {
  const [isClient, setIsClient] = useState(false);
  const { lang } = useLanguage();

  // State for initial details
  const [name, setName] = useState("Jane Doe");
  const [dob, setDob] = useState("1990-01-01");
  const [tob, setTob] = useState("12:00:00");
  const [pob, setPob] = useState("New Delhi, Delhi, India");
  const [lat, setLat] = useState("28.6139");
  const [lon, setLon] = useState("77.2090");
  const [gender, setGender] = useState<"Male"|"Female">("Male");

  // State for dynamic BTR details
  const [currentTob, setCurrentTob] = useState(tob);

  // Suggestions state
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
  const suggestionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

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
    const query = pob.trim();
    const cacheKey = query.toLowerCase();

    if (query.length < 3 || query.length > 100) {
      setSuggestions([]);
      return;
    }

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

        if (SUGGESTIONS_CACHE.size >= MAX_CACHE_SIZE) {
          const firstKey = SUGGESTIONS_CACHE.keys().next().value;
          if (firstKey !== undefined) SUGGESTIONS_CACHE.delete(firstKey);
        }
        SUGGESTIONS_CACHE.set(cacheKey, uniqueCities);

        if (typeof window !== 'undefined') {
          try {
            const cacheObj = Object.fromEntries(SUGGESTIONS_CACHE.entries());
            sessionStorage.setItem('NOMINATIM_CACHE', JSON.stringify(cacheObj));
          } catch {}
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
      controller.abort();
    };
  }, [pob]);

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
      setLat(suggestion.lat);
      setLon(suggestion.lon);
      setShowSuggestions(false);
      setActiveSuggestionIndex(-1);
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
      setActiveSuggestionIndex(-1);
    }
  };

  const btrData = useMemo(() => {
    if (!dob || !currentTob || !lat || !lon) return null;
    try {
        return calculateBTRData(dob, currentTob, lat, lon, gender);
    } catch {
        return null;
    }
  }, [dob, currentTob, lat, lon, gender]);

  const adjustTime = (secondsDelta: number) => {
    const [year, month, day] = dob.split('-').map(Number);
    const [h, m, s] = currentTob.split(':').map(Number);
    const date = new Date(year, month - 1, day, h || 0, m || 0, s || 0);
    date.setSeconds(date.getSeconds() + secondsDelta);

    const newY = date.getFullYear();
    const newMo = String(date.getMonth() + 1).padStart(2, '0');
    const newD = String(date.getDate()).padStart(2, '0');
    const newH = String(date.getHours()).padStart(2, '0');
    const newM = String(date.getMinutes()).padStart(2, '0');
    const newS = String(date.getSeconds()).padStart(2, '0');

    setDob(`${newY}-${newMo}-${newD}`);
    setCurrentTob(`${newH}:${newM}:${newS}`);
    setTob(`${newH}:${newM}:${newS}`);
  };

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-surface pb-16 flex flex-col">
      <Navbar />

      <PageHeader
        title="Birth Time Rectification (BTR)"
        subtitle="Vedic Tool"
        description="Interactive tool to adjust and rectify your exact birth time. - Beta tool, not fully tested."
      />

      <main className="flex-grow container mx-auto px-4 mt-8 space-y-8 relative">

        {/* Styled Form Section matching Horoscope Page */}
        <section className="bg-background relative z-20 pt-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-surface p-6 md:p-10 rounded-3xl shadow-sm border border-outline/20 relative overflow-hidden">
              <div className="relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                  {/* Name Input */}
                  <div className="space-y-2">
                    <label htmlFor="full-name" className={`text-[7px] md:text-[10px] font-medium text-on-surface uppercase ml-1 font-label ${lang === 'en' ? 'tracking-widest' : ''}`}>Full Name</label>
                    <input
                      id="full-name"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-6 py-3 md:py-4 bg-white border border-outline rounded-full focus:ring-1 focus:ring-accent/20 placeholder:text-secondary text-on-surface text-xs md:text-sm font-body"
                      placeholder="The earthly name of the soul..."
                      type="text"
                      autoComplete="off"
                      maxLength={100}
                    />
                  </div>

                  {/* Date Input */}
                  <div className="space-y-2">
                    <label htmlFor="dob-input" className={`text-[7px] md:text-[10px] font-medium text-on-surface uppercase ml-1 font-label ${lang === 'en' ? 'tracking-widest' : ''}`}>Date of Birth</label>
                    <div className="relative">
                      <input
                        id="dob-input"
                        type="date"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        className="w-full pl-6 pr-12 py-3 md:py-4 bg-white border border-outline rounded-full focus:ring-1 focus:ring-accent/20 text-transparent text-xs md:text-sm font-body cursor-pointer relative z-10"
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
                  </div>

                  {/* Time Input */}
                  <div className="space-y-2">
                    <label htmlFor="tob-input" className={`text-[7px] md:text-[10px] font-medium text-on-surface uppercase ml-1 font-label ${lang === 'en' ? 'tracking-widest' : ''}`}>Time of Birth</label>
                    <div className="relative">
                      <input
                        id="tob-input"
                        type="time"
                        step="1"
                        value={tob}
                        onChange={(e) => { setTob(e.target.value); setCurrentTob(e.target.value); }}
                        className="w-full pl-6 pr-12 py-3 md:py-4 bg-white border border-outline rounded-full focus:ring-1 focus:ring-accent/20 text-on-surface text-xs md:text-sm font-body cursor-pointer"
                      />
                      <span className="absolute right-5 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface/40 pointer-events-none text-lg" aria-hidden="true">schedule</span>
                    </div>
                  </div>

                  {/* Place Input with Autocomplete */}
                  <div className="space-y-2 relative" ref={suggestionRef}>
                    <label htmlFor="pob-input" className={`text-[7px] md:text-[10px] font-medium text-on-surface uppercase ml-1 font-label ${lang === 'en' ? 'tracking-widest' : ''}`}>Place of Birth</label>
                    <div role="combobox" aria-expanded={showSuggestions && (suggestions.length > 0 || isLoading)} aria-haspopup="listbox" aria-controls="suggestions-listbox">
                      <input
                        id="pob-input"
                        name="pob"
                        value={pob}
                        onChange={(e) => {
                          setPob(e.target.value);
                          setShowSuggestions(true);
                          setActiveSuggestionIndex(-1);
                        }}
                        onFocus={() => setShowSuggestions(true)}
                        onKeyDown={handleSuggestionKeyDown}
                        className="w-full px-6 py-3 md:py-4 bg-white border border-outline rounded-full focus:ring-1 focus:ring-accent/20 placeholder:text-secondary text-on-surface text-xs md:text-sm font-body"
                        placeholder="City, Country"
                        type="text"
                        autoComplete="off"
                      />
                    </div>
                    {showSuggestions && (suggestions.length > 0 || isLoading) && (
                      <div className="absolute z-50 left-0 right-0 top-full mt-2 bg-surface border border-outline/20 rounded-3xl shadow-lg overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                        {isLoading ? (
                          <div className="px-6 py-4 text-xs text-on-surface font-body">Searching cities...</div>
                        ) : (
                          <ul id="suggestions-listbox" role="listbox" className="max-h-60 overflow-y-auto">
                            {suggestions.map((suggestion, index) => (
                              <li key={index} role="option" aria-selected={index === activeSuggestionIndex}>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setPob(suggestion.name);
                                    setLat(suggestion.lat);
                                    setLon(suggestion.lon);
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

                  {/* Gender Input */}
                  <div className="space-y-2">
                    <label htmlFor="gender-input" className={`text-[7px] md:text-[10px] font-medium text-on-surface uppercase ml-1 font-label ${lang === 'en' ? 'tracking-widest' : ''}`}>Gender</label>
                    <div className="relative">
                      <select
                        id="gender-input"
                        value={gender}
                        onChange={e => setGender(e.target.value as "Male"|"Female")}
                        className="w-full pl-6 pr-12 py-3 md:py-4 bg-white border border-outline rounded-full focus:ring-1 focus:ring-accent/20 text-on-surface text-xs md:text-sm font-body cursor-pointer appearance-none"
                      >
                         <option value="Male">Male</option>
                         <option value="Female">Female</option>
                      </select>
                      <span className="absolute right-5 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface/40 pointer-events-none text-lg" aria-hidden="true">wc</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sticky Time Adjustment Bar */}
        <div className="sticky top-4 z-40 max-w-4xl mx-auto flex items-center justify-center p-2">
            <div className="flex items-center space-x-1 border border-outline/20 rounded-full p-2 bg-white/90 backdrop-blur shadow-sm">
                <button onClick={() => adjustTime(-3600)} className="px-3 py-1.5 text-xs font-medium text-on-surface bg-surface-container-low rounded-full hover:bg-surface-container transition">-1 hour</button>
                <button onClick={() => adjustTime(-60)} className="px-3 py-1.5 text-xs font-medium text-on-surface bg-surface-container-low rounded-full hover:bg-surface-container transition">-1 min</button>
                <button onClick={() => adjustTime(-1)} className="px-3 py-1.5 text-xs font-medium text-on-surface bg-surface-container-low rounded-full hover:bg-surface-container transition">-1 sec</button>

                <span className="px-5 font-mono font-bold text-lg tracking-wider text-primary">{currentTob}</span>

                <button onClick={() => adjustTime(1)} className="px-3 py-1.5 text-xs font-medium text-on-surface bg-surface-container-low rounded-full hover:bg-surface-container transition">+1 sec</button>
                <button onClick={() => adjustTime(60)} className="px-3 py-1.5 text-xs font-medium text-on-surface bg-surface-container-low rounded-full hover:bg-surface-container transition">+1 min</button>
                <button onClick={() => adjustTime(3600)} className="px-3 py-1.5 text-xs font-medium text-on-surface bg-surface-container-low rounded-full hover:bg-surface-container transition">+1 hour</button>
            </div>
        </div>

        {btrData ? (
          <div className="flex flex-col gap-6 max-w-6xl mx-auto mt-4">
             {/* Charts Grid */}
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center">
                    <h3 className="font-bold text-center mb-2">D1 - Lagna Chart</h3>
                    <div className="w-full max-w-[300px] aspect-square">
                        <KundliChart data={btrData.chartData.d1} />
                    </div>
                 </div>
                 <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center">
                    <h3 className="font-bold text-center mb-2">D9 - Navamsa</h3>
                    <div className="w-full max-w-[300px] aspect-square">
                        <KundliChart data={btrData.chartData.d9} />
                    </div>
                 </div>
                 <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center">
                    <h3 className="font-bold text-center mb-2">D24 - Chaturvimshamsha</h3>
                    <div className="w-full max-w-[300px] aspect-square">
                        <KundliChart data={btrData.chartData.d24} />
                    </div>
                 </div>
                 <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center">
                    <h3 className="font-bold text-center mb-2">D60 - Shashtiamsha</h3>
                    <div className="w-full max-w-[300px] aspect-square">
                        <KundliChart data={btrData.chartData.d60} />
                    </div>
                 </div>
             </div>

             {/* BTR Techniques Section */}
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Tattva Siddhanta */}
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                   <h3 className="text-lg font-bold border-b pb-2 mb-3">Tattva Siddhanta (Gender Rule)</h3>
                   <div className="flex justify-between items-center mb-2">
                      <span className="text-text-muted">Ascendant Element:</span>
                      <span className="font-medium">{btrData.tattva.rulingElement}</span>
                   </div>
                   <div className="flex justify-between items-center mb-2">
                      <span className="text-text-muted">Expected Gender:</span>
                      <span className="font-medium">{btrData.tattva.expectedGender}</span>
                   </div>
                   <div className="flex justify-between items-center mt-4 p-3 bg-gray-50 rounded-lg">
                      <span className="font-semibold">Match Status:</span>
                      {btrData.tattva.genderMatches ? (
                         <span className="text-green-600 font-bold flex items-center gap-1"><span className="material-symbols-outlined text-sm">check_circle</span> Matched</span>
                      ) : (
                         <span className="text-red-600 font-bold flex items-center gap-1"><span className="material-symbols-outlined text-sm">cancel</span> Mismatched</span>
                      )}
                   </div>
                </div>

                {/* Kunda */}
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                   <h3 className="text-lg font-bold border-b pb-2 mb-3">Kunda (Lagna x 81)</h3>
                   <div className="flex justify-between items-center mb-2">
                      <span className="text-text-muted">Kunda Longitude:</span>
                      <span className="font-medium">{btrData.kunda.longitude.toFixed(2)}°</span>
                   </div>
                   <div className="flex justify-between items-center mb-2">
                      <span className="text-text-muted">Kunda Rasi:</span>
                      <span className="font-medium">{btrData.kunda.rasi}</span>
                   </div>
                   <div className="flex justify-between items-center mt-4 p-3 bg-gray-50 rounded-lg">
                      <span className="font-semibold">Lagna Trine Match:</span>
                      {btrData.kunda.matchesLagna ? (
                         <span className="text-green-600 font-bold flex items-center gap-1"><span className="material-symbols-outlined text-sm">check_circle</span> Matched</span>
                      ) : (
                         <span className="text-yellow-600 font-bold flex items-center gap-1"><span className="material-symbols-outlined text-sm">warning</span> Adjust Time</span>
                      )}
                   </div>
                </div>

                {/* Pranapada */}
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                   <h3 className="text-lg font-bold border-b pb-2 mb-3">Pranapada Lagna</h3>
                   <div className="flex justify-between items-center mb-2">
                      <span className="text-text-muted">Pranapada Longitude:</span>
                      <span className="font-medium">{btrData.pranapada.longitude.toFixed(2)}°</span>
                   </div>
                   <div className="flex justify-between items-center mb-2">
                      <span className="text-text-muted">Pranapada Rasi:</span>
                      <span className="font-medium">{btrData.pranapada.rasi}</span>
                   </div>
                   <p className="text-sm text-text-muted mt-3">
                     * Pranapada should ideally align with the Lagna, Navamsa Lagna, or their trines depending on the specific tradition followed by the astrologer.
                   </p>
                </div>

                {/* Gulika */}
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                   <h3 className="text-lg font-bold border-b pb-2 mb-3">Gulika Alignment</h3>
                   <div className="flex justify-between items-center mb-2">
                      <span className="text-text-muted">Gulika Longitude (Lagna point):</span>
                      <span className="font-medium">{btrData.gulika.longitude.toFixed(2)}°</span>
                   </div>
                   <div className="flex justify-between items-center mb-2">
                      <span className="text-text-muted">Gulika Rasi:</span>
                      <span className="font-medium">{btrData.gulika.rasi}</span>
                   </div>
                   <p className="text-sm text-text-muted mt-3">
                     * Traditional texts suggest examining Gulika&apos;s relationship with the natal Ascendant for rectification.
                   </p>
                </div>

                {/* D24 Chaturvimshamsha */}
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                   <h3 className="text-lg font-bold border-b pb-2 mb-3">D24 (Chaturvimshamsha) - Educational Rectification</h3>
                   <p className="text-sm text-text-muted mb-3">
                     The D24 chart is heavily utilized in Vedic Astrology to scrutinize educational milestones, intellect, and higher learning.
                   </p>
                   <ul className="text-sm text-on-surface list-disc pl-5 space-y-1">
                      <li><strong>Key Houses:</strong> The 4th (Primary), 5th (Intelligence), and 9th (Higher Education) houses and their lords are matched against real-world educational events.</li>
                      <li><strong>Event Verification:</strong> Astrologers verify if periods (Dashas) corresponding to major exams, college graduation, or educational breaks align with the planets placed in or ruling these key D24 houses.</li>
                      <li><strong>Rectification Action:</strong> If a known educational achievement occurred but the operative planetary periods do not reflect it in the D24 chart, the birth time is shifted slightly until the chart aligns with the reality of the native&apos;s educational history.</li>
                   </ul>
                </div>

                {/* D60 Shashtiamsha */}
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                   <h3 className="text-lg font-bold border-b pb-2 mb-3">D60 (Shashtiamsha) - Micro-Tuning & Karma</h3>
                   <p className="text-sm text-text-muted mb-3">
                     The D60 chart is the most sensitive divisional chart, changing its Ascendant approximately every 2 minutes (0.5 degrees). It represents past-life karma and the finest grain of destiny.
                   </p>
                   <ul className="text-sm text-on-surface list-disc pl-5 space-y-1">
                      <li><strong>Ultimate Verification:</strong> Often used as the final step in rectification to fine-tune a birth time to the exact minute or second.</li>
                      <li><strong>Shashtiamsha Deities:</strong> Each of the 60 divisions is assigned a specific deity (e.g., Ghora, Amrita, Kala). The nature of the deity ruling the D60 Ascendant must resonate deeply with the native&apos;s core life path and inherent nature.</li>
                      <li><strong>Event Granularity:</strong> It is used to differentiate between twins or to validate extremely specific, unique life events that are not fully explained by the D1 or D9 charts.</li>
                   </ul>
                </div>

             </div>
          </div>
        ) : (
           <div className="text-center p-10 font-bold text-text-muted">Loading chart data...</div>
        )}
      </main>

      <ExploreTools currentPath="/btr" />
      <Footer />
    </div>
  );
}
