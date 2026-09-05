"use client";

import { Suspense, useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import KundliChart from "@/components/KundliChart";
import { generateAstrologyData } from "@/lib/astrology";
import { generateKPAstrologyData } from "@/lib/kp";
import * as Ast from "astronomy-engine";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";
import { sendGAEvent } from "@next/third-parties/google";
import {
  sanitize,
  sanitizeCoord,
  sanitizeDate,
  sanitizeTime,
} from "@/lib/security";

const TRANSLATIONS = {
  en: {
    birthInfo: "Birth Information",
    name: "Name",
    date: "Date",
    time: "Time",
    place: "Place",
    panchang: "Vedic Panchang",
    tithi: "Tithi",
    paksha: "Paksha",
    vara: "Vara",
    nakshatra: "Nakshatra",
    yoga: "Yoga",
    karana: "Karana",
    sunSign: "Sun Sign",
    moonSign: "Moon Sign",
    ritu: "Ritu",
    ayana: "Ayana",
    timings: "Muhurtas & Kaal",
    abhijit: "Abhijit Muhurta",
    rahu: "Rahu Kaal",
    gulika: "Gulika Kaal",
    yamaganda: "Yamaganda Kaal",
    d1Chart: "Lagna Chart (D1)",
    d1Desc: "Physical body & life path",
    d2Chart: "Parashara Hora Chart (D2)",
    d2Desc: "Wealth accumulation & liquid assets",
    d2usChart: "Uma Shambhu Hora Chart (D2-US)",
    d2usDesc: "Spiritual wealth & divine grace",
    d3Chart: "Drekkana Chart (D3)",
    d3Desc: "Siblings, courage & vitality",
    d4Chart: "Chaturthamsa Chart (D4)",
    d4Desc: "Landed properties & home happiness",
    d7Chart: "Saptamsha Chart (D7)",
    d7Desc: "Progeny, children & creative potential",
    d9Chart: "Navamsha Chart (D9)",
    d9Desc: "Spouse, marriage & inner strength",
    d10Chart: "Dashamsha Chart (D10)",
    d10Desc: "Career, profession & public status",
    d12Chart: "Dwadashamsa Chart (D12)",
    d12Desc: "Parents, lineage & past karma",
    d16Chart: "Shodashamsa Chart (D16)",
    d16Desc: "Vehicles, luxuries & comforts",
    d20Chart: "Vimshamsa Chart (D20)",
    d20Desc: "Spiritual progress & devotion",
    d24Chart: "Siddhamsa Chart (D24)",
    d24Desc: "Intellect, learning & education",
    d27Chart: "Saptavimshamsa Chart (D27)",
    d27Desc: "Strength, stamina & subconscious blocks",
    d30Chart: "Trimsamsa Chart (D30)",
    d30Desc: "Miseries, health & obstacles",
    d40Chart: "Khavedamsa Chart (D40)",
    d40Desc: "Maternal legacy & karma fruits",
    d45Chart: "Akshavedamsa Chart (D45)",
    d45Desc: "Paternal legacy & character ethics",
    d60Chart: "Shashtiamsha Chart (D60)",
    d60Desc: "Past-life karma & planetary strength",
    moreVargas: "More Divisional Charts (Vargas)",
    planet: "Planet",
    house: "House",
    rasi: "Rasi",
    rasiLord: "Rasi Lord",
    degree: "Degree",
    nakLord: "Nak Lord",
    pada: "Pada",
    planetaryPositions: "Planetary Positions",
    vimshottariDasha: "Vimshottari Dasha",
    generateNew: "Generate New Chart",
    pageTitle: "Your Birth Chart",
    compactView: "Compact",
    ctaTitle: "Seeking Verified Information?",
    ctaDesc:
      "This digital chart provides a visualization based on standard algorithms. For high-precision verified information—including exact planetary degrees, specific Ayanamsa, and personalized karmic insights—a manual expert review is essential.",
    ctaBtn: "Book Verified Personal Consultation",
    linkCopied: "Link Copied!",
    switchLanguage: "Switch Language / भाषा बदलें",
    shareReport: "Share",
    northIndianStyle:
      "Traditional North Indian Style Representation of Divisional Charts",
    loading: "Loading your destiny...",
    ashtakvargaTitle: "Sarva Ashtakvarga (SAV)",
    ashtakvargaDesc: "Sarva Ashtakvarga is a composite strength map of the zodiac signs. Houses with 28+ points are highly auspicious, 25-27 are neutral, and under 25 are weaker zones.",
    rasiPoints: "SAV points"}};

const HoroscopeContent = () => {
  const { lang } = useLanguage();
  const [showCopied, setShowCopied] = useState(false);

  const goToCompact = () => {
    sendGAEvent({ event: "action_click", action_name: "horoscope_go_compact" });
    const params = new URLSearchParams(searchParams.toString());
    window.location.href = `/horoscope/compact?${params.toString()}`;
  };

  const t = TRANSLATIONS.en;
  const searchParams = useSearchParams();

  const name = sanitize(searchParams.get("name"), 100) || "Guest";
  const dob = sanitizeDate(searchParams.get("dob")) || "";
  const tob = sanitizeTime(searchParams.get("tob")) || "";
  const lat = sanitizeCoord(searchParams.get("lat")) || "";
  const lon = sanitizeCoord(searchParams.get("lon")) || "";
  const kpNumber = searchParams.get("kpNumber") || "";

  const standardChartData = useMemo(
    () => generateAstrologyData(dob, tob, lat, lon),
    [dob, tob, lat, lon],
  );

  const kpChartData = useMemo(
    () => {
      if (!dob || !tob) return null;
      const [y, m, d] = dob.split("-").map(Number);
      const [h, min] = tob.split(":").map(Number);
      if (!y || !m || !d || isNaN(h) || isNaN(min)) return null;
      const dateObj = new Date(Date.UTC(y, m - 1, d, h, min - 330));
      if (isNaN(dateObj.getTime())) return null;
      const time = Ast.MakeTime(dateObj);
      return generateKPAstrologyData(time, parseFloat(lat), parseFloat(lon), parseInt(kpNumber, 10));
    },
    [dob, tob, lat, lon, kpNumber],
  );



  const handleShare = async () => {
    sendGAEvent({
      event: "action_click",
      action_name: "horoscope_share_click",
    });
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Horoscope for ${name}`,
          text: `Check out my KP Horoscope birth chart!`,
          url: window.location.href,
        });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      try {
        await navigator.clipboard.writeText(window.location.href);
        setShowCopied(true);
        setTimeout(() => setShowCopied(false), 2000);
      } catch (err) {
        console.error("Error copying to clipboard:", err);
      }
    }
  };


  return (
    <>
      <PageHeader title={t.pageTitle}>
        <div className="flex flex-row flex-wrap items-center justify-center gap-3 relative w-full">
          {showCopied && (
            <div
              aria-live="polite"
              className={`absolute -top-12 left-1/2 -translate-x-1/2 bg-on-surface text-surface text-xs px-3 py-1.5 rounded-lg shadow-xl animate-in fade-in slide-in-from-bottom-2 duration-300 z-50 whitespace-nowrap font-medium font-label uppercase ${lang === "en" ? "tracking-widest" : ""}`}
            >
              {t.linkCopied}
            </div>
          )}

          <button
            onClick={goToCompact}
            className={`btn-secondary h-8 px-3 text-[10px] md:text-xs uppercase font-label flex items-center justify-center gap-1.5 ${lang === "en" ? "tracking-widest" : ""}`}
            title="Switch to High-Density Compact Dashboard"
          >
            <span
              className="material-symbols-outlined text-[16px]"
              aria-hidden="true"
            >
              dashboard
            </span>
            <span>{t.compactView}</span>
          </button>

          <button
            onClick={handleShare}
            className={`btn-secondary h-8 px-3 text-[10px] md:text-xs uppercase font-label flex items-center justify-center gap-1.5 ${lang === "en" ? "tracking-widest" : ""}`}
            title={t.shareReport}
            aria-label={t.shareReport}
          >
            <span
              className="material-symbols-outlined text-[16px]"
              aria-hidden="true"
            >
              share
            </span>
            <span>{t.shareReport}</span>
          </button>
        </div>
      </PageHeader>

      <div className="py-12 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 md:space-y-16">
        {/* Charts Section */}
        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Standard D1 */}
            <div className="space-y-6">
              <h2 className="text-2xl font-normal font-headline text-on-surface border-b border-outline pb-3 flex flex-col gap-1">
                <span>{t.d1Chart}</span>
                <span
                  className={cn(
                    "text-[11px] leading-normal text-on-surface/60 font-body font-normal normal-case",
                    lang === "hi" ? "font-hindi" : "",
                  )}
                >
                  Standard D1 Chart
                </span>
              </h2>
              <KundliChart data={standardChartData.d1} />
              <div
                className={`flex justify-center gap-x-6 gap-y-2 text-xs text-on-surface/60 mt-3 font-body ${lang === "hi" ? "font-hindi" : ""}`}
              >
                <span className="flex items-center gap-1">
                  <span className="text-black font-normal">*</span>
                  <span>
                    {lang === "hi" ? "वक्री (Retrograde)" : "Retrograde"}
                  </span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="text-black font-normal">^</span>
                  <span>{lang === "hi" ? "अस्त (Combust)" : "Combust"}</span>
                </span>
              </div>
            </div>

            {/* KP D1 */}
            <div className="space-y-6">
              <h2 className="text-2xl font-normal font-headline text-on-surface border-b border-outline pb-3 flex flex-col gap-1">
                <span>KP D1 Chart</span>
                <span
                  className={cn(
                    "text-[11px] leading-normal text-on-surface/60 font-body font-normal normal-case",
                    lang === "hi" ? "font-hindi" : "",
                  )}
                >
                  KP Horary Lagna
                </span>
              </h2>
              {kpChartData && <KundliChart data={kpChartData.d1} />}
            </div>
          </div>
        </div>

        {kpChartData && (
          <div className="space-y-12">
            {/* KP Planetary Positions Table */}
            <div className="space-y-6">
              <h2 className="text-2xl font-normal font-headline text-on-surface border-b border-outline pb-3 flex flex-col gap-1">
                <span>{lang === "hi" ? "केपी ग्रह स्थिति" : "KP Planetary Positions"}</span>
                <span className={cn("text-[11px] leading-normal text-on-surface/60 font-body font-normal normal-case", lang === "hi" ? "font-hindi" : "")}>
                  {lang === "hi" ? "ग्रहों के नक्षत्र और उप-नक्षत्र स्वामी" : "Planetary Star Lords and Sub-Lords"}
                </span>
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left font-body">
                  <thead className="text-xs uppercase bg-surface-container-low text-on-surface/70 border-b border-outline/20">
                    <tr>
                      <th className="px-4 py-3 font-medium">{t.planet}</th>
                      <th className="px-4 py-3 font-medium">{t.sign}</th>
                      <th className="px-4 py-3 font-medium">{t.degree}</th>
                      <th className="px-4 py-3 font-medium">{t.nakshatra}</th>
                      <th className="px-4 py-3 font-medium">{t.nakLord}</th>
                      <th className="px-4 py-3 font-medium">{lang === 'hi' ? 'उप-नक्षत्र' : 'Sub Lord'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline/10">
                    {kpChartData.planets.map((planet) => (
                      <tr key={planet.name} className="hover:bg-surface-container-lowest/50 transition-colors">
                        <td className="px-4 py-3 font-medium text-on-surface flex items-center gap-1.5">
                          {lang === "hi" ? planet.nameSanskrit : planet.name}
                          {planet.isRetrograde && <span className="text-on-surface/50 text-[10px]">*</span>}
                          {planet.isCombust && <span className="text-on-surface/50 text-[10px]">^</span>}
                        </td>
                        <td className="px-4 py-3 text-on-surface/80">{lang === "hi" ? planet.rasiSanskrit : planet.rasi}</td>
                        <td className="px-4 py-3 text-on-surface/80 font-mono text-xs">{planet.degree}</td>
                        <td className="px-4 py-3 text-on-surface/80">{lang === "hi" ? planet.nakshatraSanskrit : planet.nakshatra} - {planet.pada}</td>
                        <td className="px-4 py-3 text-on-surface/80">{lang === "hi" ? planet.nakshatraLordSanskrit : planet.nakshatraLord}</td>
                        <td className="px-4 py-3 text-on-surface/80">{lang === "hi" ? planet.subLordSanskrit : planet.subLord}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* KP House Cusps Table */}
            <div className="space-y-6">
              <h2 className="text-2xl font-normal font-headline text-on-surface border-b border-outline pb-3 flex flex-col gap-1">
                <span>{lang === "hi" ? "केपी भाव स्पष्ट" : "KP House Cusps (Placidus)"}</span>
                <span className={cn("text-[11px] leading-normal text-on-surface/60 font-body font-normal normal-case", lang === "hi" ? "font-hindi" : "")}>
                  {lang === "hi" ? "भावों के नक्षत्र और उप-नक्षत्र स्वामी" : "Cuspal Star Lords and Sub-Lords"}
                </span>
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left font-body">
                  <thead className="text-xs uppercase bg-surface-container-low text-on-surface/70 border-b border-outline/20">
                    <tr>
                      <th className="px-4 py-3 font-medium">{lang === 'hi' ? 'भाव' : 'Cusp'}</th>
                      <th className="px-4 py-3 font-medium">{t.sign}</th>
                      <th className="px-4 py-3 font-medium">{t.degree}</th>
                      <th className="px-4 py-3 font-medium">{t.nakshatra}</th>
                      <th className="px-4 py-3 font-medium">{t.nakLord}</th>
                      <th className="px-4 py-3 font-medium">{lang === 'hi' ? 'उप-नक्षत्र' : 'Sub Lord'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline/10">
                    {kpChartData.cuspsData?.map((cusp) => (
                      <tr key={cusp.name} className="hover:bg-surface-container-lowest/50 transition-colors">
                        <td className="px-4 py-3 font-medium text-on-surface">{cusp.name}</td>
                        <td className="px-4 py-3 text-on-surface/80">{lang === "hi" ? cusp.rasiSanskrit : cusp.rasi}</td>
                        <td className="px-4 py-3 text-on-surface/80 font-mono text-xs">{cusp.degree}</td>
                        <td className="px-4 py-3 text-on-surface/80">{lang === "hi" ? cusp.nakshatraSanskrit : cusp.nakshatra} - {cusp.pada}</td>
                        <td className="px-4 py-3 text-on-surface/80">{lang === "hi" ? cusp.nakshatraLordSanskrit : cusp.nakshatraLord}</td>
                        <td className="px-4 py-3 text-on-surface/80">{lang === "hi" ? cusp.subLordSanskrit : cusp.subLord}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* KP Astrology Information Section */}
        <div className="bg-surface-container-low rounded-3xl p-6 md:p-8 border border-outline mt-12 max-w-4xl mx-auto space-y-6 print:hidden">
          <div className="space-y-2">
            <h3 className="text-xl md:text-2xl font-normal font-headline text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-accent">menu_book</span>
              {lang === 'hi' ? 'केपी ज्योतिष और प्रश्न (KP Astrology & Prashna)' : 'KP Astrology & Prashna'}
            </h3>
            <p className="text-sm md:text-base text-on-surface/80 font-body leading-relaxed">
              {lang === 'hi'
                ? 'कृष्णमूर्ति पद्धति (KP) वैदिक ज्योतिष की एक उन्नत प्रणाली है। यह सटीक भविष्यवाणियों के लिए नक्षत्रों (Star Lords) और उप-नक्षत्रों (Sub-Lords) पर विशेष ध्यान केंद्रित करती है।'
                : 'Krishnamurti Paddhati (KP) is an advanced system of Vedic Astrology. It focuses specifically on Nakshatras (Star Lords) and Sub-Lords to offer highly precise timing and predictions.'}
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-medium font-headline text-on-surface border-b border-outline/20 pb-2">
              {lang === 'hi' ? 'केपी चार्ट का विश्लेषण कैसे करें?' : 'How to Read the KP Chart?'}
            </h4>
            <ul className="list-disc pl-5 space-y-3 text-sm text-on-surface/80 font-body">
              <li>
                <strong className="text-on-surface">{lang === 'hi' ? 'उप-नक्षत्र स्वामी (Sub-Lord):' : 'Cuspal Sub-Lord:'}</strong>
                {lang === 'hi'
                  ? ' केपी में, किसी भी भाव का फल मुख्य रूप से उस भाव के उप-नक्षत्र स्वामी द्वारा निर्धारित होता है।'
                  : ' In KP astrology, the result of any house is primarily determined by the Sub-Lord of that specific house cusp.'}
              </li>
              <li>
                <strong className="text-on-surface">{lang === 'hi' ? 'नक्षत्र स्वामी (Star Lord):' : 'Star Lord (Nakshatra Lord):'}</strong>
                {lang === 'hi'
                  ? ' ग्रह अपने नक्षत्र स्वामी के परिणाम देते हैं। उप-नक्षत्र स्वामी यह तय करता है कि वे परिणाम सकारात्मक होंगे या नकारात्मक।'
                  : ' Planets predominantly give the results of their Star Lord. The Sub-Lord of the planet decides whether those results will be positive or negative.'}
              </li>
              <li>
                <strong className="text-on-surface">{lang === 'hi' ? 'प्लासिडस भाव प्रणाली (Placidus House System):' : 'Placidus House System:'}</strong>
                {lang === 'hi'
                  ? ' केपी ज्योतिष में प्लासिडस भाव प्रणाली का उपयोग किया जाता है। यह एक गणितीय विधि है जो समय और भौगोलिक स्थान के आधार पर भावों को सटीक रूप से विभाजित करती है।'
                  : ' The KP system relies on the Placidus house system. Placidus uses a complex mathematical calculation based on the exact time and latitude/longitude to trisect the semi-diurnal and semi-nocturnal arcs of the ecliptic. This creates unequal house sizes, meaning a house can span across multiple signs, or a sign can be entirely intercepted within a house. This is why planetary placements in the KP chart often differ significantly from the standard whole-sign D1 chart.'}
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-medium font-headline text-on-surface border-b border-outline/20 pb-2">
              {lang === 'hi' ? 'प्रश्न कुंडली (Horary Astrology)' : 'Prashna (Horary) Astrology'}
            </h4>
            <p className="text-sm text-on-surface/80 font-body leading-relaxed">
              {lang === 'hi'
                ? 'प्रश्न ज्योतिष का उपयोग तब किया जाता है जब जन्म समय ज्ञात न हो, या किसी विशिष्ट प्रश्न का उत्तर चाहिए हो। केपी प्रणाली में, व्यक्ति को 1 से 249 के बीच एक संख्या चुनने के लिए कहा जाता है। यह संख्या उस विशिष्ट समय पर लग्न (Ascendant) की डिग्री और उप-नक्षत्र को निर्धारित करती है।'
                : 'Prashna is used when birth details are unknown, or to answer a highly specific question. In the KP Horary system, the querent is asked to provide a number between 1 and 249. This number maps to a specific Ascendant degree and Sub-Lord in the zodiac, completely overriding the time-based Ascendant.'}
            </p>
            <p className="text-sm text-on-surface/80 font-body leading-relaxed">
              {lang === 'hi'
                ? 'ऊपर दिया गया "KP D1 Chart" आपके द्वारा चुनी गई संख्या (1-249) के आधार पर लग्न को दर्शाता है, जबकि "Standard D1 Chart" सामान्य समय पर आधारित है।'
                : 'The "KP D1 Chart" above forces the Ascendant (Lagna) to match the exact degree of your chosen number (1-249), while the "Standard D1 Chart" uses the regular time-based calculation for comparison.'}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default function KPHoroscopeClientPage() {
  const t = TRANSLATIONS.en;
  return (
    <main className="min-h-screen bg-surface">
      <Navbar />
      <Suspense fallback={<div className="pt-32 text-center">{t.loading}</div>}>
        <HoroscopeContent />
      </Suspense>
      <Footer />
    </main>
  );
}
