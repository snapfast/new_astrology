"use client";

import { Suspense, useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import KundliChart from "@/components/KundliChart";
import VimshottariDasha from "@/components/VimshottariDasha";
import AshtakvargaChart from "@/components/AshtakvargaChart";
import { generateAstrologyData } from "@/lib/astrology";
import ExploreTools from "@/components/ExploreTools";
import ChartGeneration from "@/components/ChartGeneration";
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
  const [moreVargasExpanded, setMoreVargasExpanded] = useState(false);
  const [birthDetailsExpanded, setBirthDetailsExpanded] = useState(false);

  const goToCompact = () => {
    sendGAEvent({ event: "action_click", action_name: "horoscope_go_compact" });
    const params = new URLSearchParams(searchParams.toString());
    window.location.href = `/horoscope/compact?${params.toString()}`;
  };

  const t = TRANSLATIONS.en;
  const searchParams = useSearchParams();

  // Close the edit section automatically when navigation completes and params change
  useEffect(() => {
    setBirthDetailsExpanded(false);
  }, [searchParams]);

  const name = sanitize(searchParams.get("name"), 100) || "Guest";
  const dob = sanitizeDate(searchParams.get("dob")) || "";
  const formattedDob = useMemo(() => {
    if (!dob) return "";
    const parts = dob.split("-");
    if (parts.length !== 3) return "";
    const [year, month, day] = parts;
    const monthIdx = parseInt(month, 10) - 1;
    if (monthIdx < 0 || monthIdx > 11) return "";

    const monthsEn = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const monthsHi = [
      "जनवरी",
      "फरवरी",
      "मार्च",
      "अप्रैल",
      "मई",
      "जून",
      "जुलाई",
      "अगस्त",
      "सितंबर",
      "अक्टूबर",
      "नवंबर",
      "दिसंबर",
    ];
    const months = lang === "hi" ? monthsHi : monthsEn;

    return `${day} ${months[monthIdx]} ${year}`;
  }, [dob, lang]);
  const tob = sanitizeTime(searchParams.get("tob")) || "";
  const pob = sanitize(searchParams.get("pob"), 100) || "";
  const lat = sanitizeCoord(searchParams.get("lat")) || "";
  const lon = sanitizeCoord(searchParams.get("lon")) || "";

  const chartData = useMemo(
    () => generateAstrologyData(dob, tob, lat, lon),
    [dob, tob, lat, lon],
  );

  const sunSign = chartData.panchang.sunSign;
  const moonSign = chartData.panchang.moonSign;

  const handleShare = async () => {
    sendGAEvent({
      event: "action_click",
      action_name: "horoscope_share_click",
    });
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Horoscope for ${name}`,
          text: `Check out my Vedic birth chart! Sun Sign: ${sunSign}, Moon Sign: ${moonSign}.`,
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

  const handleBookNow = () => {
    sendGAEvent({
      event: "action_click",
      action_name: "horoscope_page_book_now",
    });
    window.dispatchEvent(new CustomEvent("openBookingModal"));
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
        <div className="space-y-3 text-left">
          {/* Section: Birth Information */}
          <div
            className="bg-white border border-outline/80 rounded-3xl p-4 md:p-5 relative shadow-sm cursor-pointer hover:bg-surface-container-lowest transition-colors"
            onClick={() => setBirthDetailsExpanded(!birthDetailsExpanded)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setBirthDetailsExpanded(!birthDetailsExpanded);
              }
            }}
            aria-expanded={birthDetailsExpanded}
          >
            <div className="flex justify-between items-center">
              <h2
                className={cn(
                  "font-bold text-accent uppercase font-label text-xs md:text-sm",
                  lang === "hi" ? "tracking-normal" : "tracking-[0.15em]",
                )}
              >
                {t.birthInfo}
              </h2>
              <span className="material-symbols-outlined text-on-surface/60 transition-colors">
                {birthDetailsExpanded ? 'close' : 'edit'}
              </span>
            </div>

            {!birthDetailsExpanded ? (
              <div className="mt-2 text-sm text-on-surface/80 font-body flex flex-wrap items-center gap-2">
                <span className="font-medium">{name}</span>
                <span className="text-on-surface/40 text-[10px]">•</span>
                <span className="tabular-nums">{formattedDob}</span>
                <span className="text-on-surface/40 text-[10px]">•</span>
                <span className="tabular-nums">{tob}</span>
                <span className="text-on-surface/40 text-[10px]">•</span>
                <span>{pob}</span>
              </div>
            ) : (
              <div className="mt-4 pt-4 border-t border-outline/50 animate-in slide-in-from-top-2 fade-in duration-300">
                <div onClick={(e) => e.stopPropagation()} onKeyDown={(e) => e.stopPropagation()}>
                  <ChartGeneration isUpdate={true} initialValues={{ name, dob, tob, pob, lat, lon }} onClose={() => setBirthDetailsExpanded(false)} className="py-4 bg-transparent p-0 m-0 [&>div]:p-0 [&>div]:border-none [&>div]:shadow-none [&_.text-center]:hidden" />
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
            {/* Section: Vedic Panchang */}
            <div className="lg:col-span-2 bg-white border border-outline/80 rounded-3xl p-4 md:p-5 shadow-sm">
              <h2
                className={cn(
                  "font-bold text-accent uppercase font-label mb-3 text-xs md:text-sm",
                  lang === "hi" ? "tracking-normal" : "tracking-[0.15em]",
                )}
              >
                {t.panchang}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-y-4 gap-x-3">
                <div className="space-y-1">
                  <p
                    className={cn(
                      "text-on-surface/70 uppercase font-label font-bold text-xs flex items-center mb-1",
                      lang === "hi" ? "tracking-normal" : "tracking-wider",
                    )}
                  >
                    {t.tithi}
                  </p>
                  <p
                    className={cn(
                      "text-sm md:text-base text-on-surface font-medium leading-tight flex items-center min-h-[1.5rem]",
                      lang === "hi" ? "font-hindi font-bold" : "",
                    )}
                  >
                    {lang === "en"
                      ? chartData.panchang.tithi
                      : chartData.panchang.tithiSanskrit}
                  </p>
                </div>
                <div className="space-y-1">
                  <p
                    className={cn(
                      "text-on-surface/70 uppercase font-label font-bold text-xs flex items-center mb-1",
                      lang === "hi" ? "tracking-normal" : "tracking-wider",
                    )}
                  >
                    {t.paksha}
                  </p>
                  <p
                    className={cn(
                      "text-sm md:text-base text-on-surface font-medium leading-tight flex items-center min-h-[1.5rem]",
                      lang === "hi" ? "font-hindi font-bold" : "",
                    )}
                  >
                    {lang === "en"
                      ? chartData.panchang.paksha
                      : chartData.panchang.pakshaSanskrit}
                  </p>
                </div>
                <div className="space-y-1">
                  <p
                    className={cn(
                      "text-on-surface/70 uppercase font-label font-bold text-xs flex items-center mb-1",
                      lang === "hi" ? "tracking-normal" : "tracking-wider",
                    )}
                  >
                    {t.vara}
                  </p>
                  <p
                    className={cn(
                      "text-sm md:text-base text-on-surface font-medium leading-tight flex items-center min-h-[1.5rem]",
                      lang === "hi" ? "font-hindi font-bold" : "",
                    )}
                  >
                    {lang === "en"
                      ? chartData.panchang.vara
                      : chartData.panchang.varaSanskrit}
                  </p>
                </div>
                <div className="space-y-1">
                  <p
                    className={cn(
                      "text-on-surface/70 uppercase font-label font-bold text-xs flex items-center mb-1",
                      lang === "hi" ? "tracking-normal" : "tracking-wider",
                    )}
                  >
                    {t.nakshatra}
                  </p>
                  <p
                    className={cn(
                      "text-sm md:text-base text-on-surface font-medium leading-tight flex items-center min-h-[1.5rem]",
                      lang === "hi" ? "font-hindi font-bold" : "",
                    )}
                  >
                    {lang === "en"
                      ? chartData.panchang.nakshatra
                      : chartData.panchang.nakshatraSanskrit}
                  </p>
                </div>
                <div className="space-y-1">
                  <p
                    className={cn(
                      "text-on-surface/70 uppercase font-label font-bold text-xs flex items-center mb-1",
                      lang === "hi" ? "tracking-normal" : "tracking-wider",
                    )}
                  >
                    {t.yoga}
                  </p>
                  <p
                    className={cn(
                      "text-sm md:text-base text-on-surface font-medium leading-tight flex items-center min-h-[1.5rem]",
                      lang === "hi" ? "font-hindi font-bold" : "",
                    )}
                  >
                    {lang === "en"
                      ? chartData.panchang.yoga
                      : chartData.panchang.yogaSanskrit}
                  </p>
                </div>
                <div className="space-y-1">
                  <p
                    className={cn(
                      "text-on-surface/70 uppercase font-label font-bold text-xs flex items-center mb-1",
                      lang === "hi" ? "tracking-normal" : "tracking-wider",
                    )}
                  >
                    {t.karana}
                  </p>
                  <p
                    className={cn(
                      "text-sm md:text-base text-on-surface font-medium leading-tight flex items-center min-h-[1.5rem]",
                      lang === "hi" ? "font-hindi font-bold" : "",
                    )}
                  >
                    {lang === "en"
                      ? chartData.panchang.karana
                      : chartData.panchang.karanaSanskrit}
                  </p>
                </div>
                <div className="space-y-1">
                  <p
                    className={cn(
                      "text-on-surface/70 uppercase font-label font-bold text-xs flex items-center mb-1",
                      lang === "hi" ? "tracking-normal" : "tracking-wider",
                    )}
                  >
                    {t.sunSign}
                  </p>
                  <p
                    className={cn(
                      "text-sm md:text-base text-on-surface font-medium leading-tight flex items-center min-h-[1.5rem]",
                      lang === "hi" ? "font-hindi font-bold" : "",
                    )}
                  >
                    {lang === "en"
                      ? chartData.panchang.sunSign
                      : chartData.panchang.sunSignSanskrit}
                  </p>
                </div>
                <div className="space-y-1">
                  <p
                    className={cn(
                      "text-on-surface/70 uppercase font-label font-bold text-xs flex items-center mb-1",
                      lang === "hi" ? "tracking-normal" : "tracking-wider",
                    )}
                  >
                    {t.moonSign}
                  </p>
                  <p
                    className={cn(
                      "text-sm md:text-base text-on-surface font-medium leading-tight flex items-center min-h-[1.5rem]",
                      lang === "hi" ? "font-hindi font-bold" : "",
                    )}
                  >
                    {lang === "en"
                      ? chartData.panchang.moonSign
                      : chartData.panchang.moonSignSanskrit}
                  </p>
                </div>
                <div className="space-y-1">
                  <p
                    className={cn(
                      "text-on-surface/70 uppercase font-label font-bold text-xs flex items-center mb-1",
                      lang === "hi" ? "tracking-normal" : "tracking-wider",
                    )}
                  >
                    {t.ritu}
                  </p>
                  <p
                    className={cn(
                      "text-sm md:text-base text-on-surface font-medium leading-tight flex items-center min-h-[1.5rem]",
                      lang === "hi" ? "font-hindi font-bold" : "",
                    )}
                  >
                    {lang === "en"
                      ? chartData.panchang.ritu
                      : chartData.panchang.rituSanskrit}
                  </p>
                </div>
                <div className="space-y-1">
                  <p
                    className={cn(
                      "text-on-surface/70 uppercase font-label font-bold text-xs flex items-center mb-1",
                      lang === "hi" ? "tracking-normal" : "tracking-wider",
                    )}
                  >
                    {t.ayana}
                  </p>
                  <p
                    className={cn(
                      "text-sm md:text-base text-on-surface font-medium leading-tight flex items-center min-h-[1.5rem]",
                      lang === "hi" ? "font-hindi font-bold" : "",
                    )}
                  >
                    {lang === "en"
                      ? chartData.panchang.ayana
                      : chartData.panchang.ayanaSanskrit}
                  </p>
                </div>
              </div>
            </div>

            {/* Section: Time Divisions */}
            <div className="bg-white border border-outline/80 rounded-3xl p-4 md:p-5 shadow-sm">
              <h2
                className={cn(
                  "font-bold text-accent uppercase font-label mb-3 text-xs md:text-sm",
                  lang === "hi" ? "tracking-normal" : "tracking-[0.15em]",
                )}
              >
                {t.timings}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-3">
                <div className="space-y-1">
                  <p
                    className={cn(
                      "text-on-surface/70 uppercase font-label font-bold text-xs flex items-center mb-1",
                      lang === "hi" ? "tracking-normal" : "tracking-wider",
                    )}
                  >
                    {t.abhijit}
                  </p>
                  <p
                    className={cn(
                      "text-sm md:text-base text-on-surface font-medium leading-tight flex items-center min-h-[1.5rem] tabular-nums",
                      lang === "hi" ? "font-hindi font-bold" : "",
                    )}
                  >
                    {chartData.panchang.abhijitMuhurta}
                  </p>
                </div>
                <div className="space-y-1">
                  <p
                    className={cn(
                      "text-on-surface/70 uppercase font-label font-bold text-xs flex items-center mb-1",
                      lang === "hi" ? "tracking-normal" : "tracking-wider",
                    )}
                  >
                    {t.rahu}
                  </p>
                  <p
                    className={cn(
                      "text-sm md:text-base text-on-surface font-medium leading-tight flex items-center min-h-[1.5rem] tabular-nums",
                      lang === "hi" ? "font-hindi font-bold" : "",
                    )}
                  >
                    {chartData.panchang.rahuKaal}
                  </p>
                </div>
                <div className="space-y-1">
                  <p
                    className={cn(
                      "text-on-surface/70 uppercase font-label font-bold text-xs flex items-center mb-1",
                      lang === "hi" ? "tracking-normal" : "tracking-wider",
                    )}
                  >
                    {t.gulika}
                  </p>
                  <p
                    className={cn(
                      "text-sm md:text-base text-on-surface font-medium leading-tight flex items-center min-h-[1.5rem] tabular-nums",
                      lang === "hi" ? "font-hindi font-bold" : "",
                    )}
                  >
                    {chartData.panchang.gulikaKaal}
                  </p>
                </div>
                <div className="space-y-1">
                  <p
                    className={cn(
                      "text-on-surface/70 uppercase font-label font-bold text-xs flex items-center mb-1",
                      lang === "hi" ? "tracking-normal" : "tracking-wider",
                    )}
                  >
                    {t.yamaganda}
                  </p>
                  <p
                    className={cn(
                      "text-sm md:text-base text-on-surface font-medium leading-tight flex items-center min-h-[1.5rem] tabular-nums",
                      lang === "hi" ? "font-hindi font-bold" : "",
                    )}
                  >
                    {chartData.panchang.yamagandaKaal}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="space-y-8">
          {/* Row 1: D1 & D9 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <h2 className="text-2xl font-normal font-headline text-on-surface border-b border-outline pb-3 flex flex-col gap-1">
                <span>{t.d1Chart}</span>
                <span
                  className={cn(
                    "text-[11px] leading-normal text-on-surface/60 font-body font-normal normal-case",
                    lang === "hi" ? "font-hindi" : "",
                  )}
                >
                  {t.d1Desc}
                </span>
              </h2>
              <KundliChart data={chartData.d1} />
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
            <div className="space-y-6">
              <h2 className="text-2xl font-normal font-headline text-on-surface border-b border-outline pb-3 flex flex-col gap-1">
                <span>{t.d9Chart}</span>
                <span
                  className={cn(
                    "text-[11px] leading-normal text-on-surface/60 font-body font-normal normal-case",
                    lang === "hi" ? "font-hindi" : "",
                  )}
                >
                  {t.d9Desc}
                </span>
              </h2>
              <KundliChart data={chartData.d9} />
            </div>
          </div>

          {/* Row 2: D3 & D10 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <h2 className="text-2xl font-normal font-headline text-on-surface border-b border-outline pb-3 flex flex-col gap-1">
                <span>{t.d3Chart}</span>
                <span
                  className={cn(
                    "text-[11px] leading-normal text-on-surface/60 font-body font-normal normal-case",
                    lang === "hi" ? "font-hindi" : "",
                  )}
                >
                  {t.d3Desc}
                </span>
              </h2>
              <KundliChart data={chartData.d3} />
            </div>
            <div className="space-y-6">
              <h2 className="text-2xl font-normal font-headline text-on-surface border-b border-outline pb-3 flex flex-col gap-1">
                <span>{t.d10Chart}</span>
                <span
                  className={cn(
                    "text-[11px] leading-normal text-on-surface/60 font-body font-normal normal-case",
                    lang === "hi" ? "font-hindi" : "",
                  )}
                >
                  {t.d10Desc}
                </span>
              </h2>
              <KundliChart data={chartData.d10} />
            </div>
          </div>

          {/* Row 3: D7 & D60 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <h2 className="text-2xl font-normal font-headline text-on-surface border-b border-outline pb-3 flex flex-col gap-1">
                <span>{t.d7Chart}</span>
                <span
                  className={cn(
                    "text-[11px] leading-normal text-on-surface/60 font-body font-normal normal-case",
                    lang === "hi" ? "font-hindi" : "",
                  )}
                >
                  {t.d7Desc}
                </span>
              </h2>
              <KundliChart data={chartData.d7} />
            </div>
            <div className="space-y-6">
              <h2 className="text-2xl font-normal font-headline text-on-surface border-b border-outline pb-3 flex flex-col gap-1">
                <span>{t.d60Chart}</span>
                <span
                  className={cn(
                    "text-[11px] leading-normal text-on-surface/60 font-body font-normal normal-case",
                    lang === "hi" ? "font-hindi" : "",
                  )}
                >
                  {t.d60Desc}
                </span>
              </h2>
              <KundliChart data={chartData.d60} />
            </div>
          </div>

          {/* Collapsible: More Divisional Charts (Vargas) */}
          <div className="w-full mt-8 print:hidden">
            <button
              onClick={() => {
                sendGAEvent({
                  event: "action_click",
                  action_name: "horoscope_toggle_more_vargas",
                });
                setMoreVargasExpanded(!moreVargasExpanded);
              }}
              aria-expanded={moreVargasExpanded}
              aria-controls="more-vargas-container"
              className="w-full flex items-center justify-between py-3 px-0 text-on-surface/70 hover:text-on-surface border-b border-outline pb-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 transition-colors duration-200"
            >
              <h3 className="text-lg md:text-xl font-medium font-headline text-on-surface/70 flex items-center gap-2">
                <span className="material-symbols-outlined text-on-surface/60">
                  view_quilt
                </span>
                {t.moreVargas}
              </h3>
              <span
                className={cn(
                  "material-symbols-outlined text-2xl text-on-surface/60 transition-transform duration-300",
                  moreVargasExpanded ? "rotate-180" : "",
                )}
              >
                expand_more
              </span>
            </button>

            <div
              id="more-vargas-container"
              className={cn(
                "transition-all duration-500 ease-in-out",
                moreVargasExpanded
                  ? "max-h-[8000px] pt-6 pb-0 px-0"
                  : "max-h-0 overflow-hidden",
              )}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                <div className="space-y-6">
                  <h2 className="text-2xl font-normal font-headline text-on-surface border-b border-outline pb-3 flex flex-col gap-1">
                    <span>{t.d2Chart}</span>
                    <span
                      className={cn(
                        "text-[11px] leading-normal text-on-surface/60 font-body font-normal normal-case",
                        lang === "hi" ? "font-hindi" : "",
                      )}
                    >
                      {t.d2Desc}
                    </span>
                  </h2>
                  <KundliChart data={chartData.d2} />
                </div>
                <div className="space-y-6">
                  <h2 className="text-2xl font-normal font-headline text-on-surface border-b border-outline pb-3 flex flex-col gap-1">
                    <span>{t.d2usChart}</span>
                    <span
                      className={cn(
                        "text-[11px] leading-normal text-on-surface/60 font-body font-normal normal-case",
                        lang === "hi" ? "font-hindi" : "",
                      )}
                    >
                      {t.d2usDesc}
                    </span>
                  </h2>
                  <KundliChart data={chartData.d2us} />
                </div>
                <div className="space-y-6">
                  <h2 className="text-2xl font-normal font-headline text-on-surface border-b border-outline pb-3 flex flex-col gap-1">
                    <span>{t.d4Chart}</span>
                    <span
                      className={cn(
                        "text-[11px] leading-normal text-on-surface/60 font-body font-normal normal-case",
                        lang === "hi" ? "font-hindi" : "",
                      )}
                    >
                      {t.d4Desc}
                    </span>
                  </h2>
                  <KundliChart data={chartData.d4} />
                </div>
                <div className="space-y-6">
                  <h2 className="text-2xl font-normal font-headline text-on-surface border-b border-outline pb-3 flex flex-col gap-1">
                    <span>{t.d12Chart}</span>
                    <span
                      className={cn(
                        "text-[11px] leading-normal text-on-surface/60 font-body font-normal normal-case",
                        lang === "hi" ? "font-hindi" : "",
                      )}
                    >
                      {t.d12Desc}
                    </span>
                  </h2>
                  <KundliChart data={chartData.d12} />
                </div>
                <div className="space-y-6">
                  <h2 className="text-2xl font-normal font-headline text-on-surface border-b border-outline pb-3 flex flex-col gap-1">
                    <span>{t.d16Chart}</span>
                    <span
                      className={cn(
                        "text-[11px] leading-normal text-on-surface/60 font-body font-normal normal-case",
                        lang === "hi" ? "font-hindi" : "",
                      )}
                    >
                      {t.d16Desc}
                    </span>
                  </h2>
                  <KundliChart data={chartData.d16} />
                </div>
                <div className="space-y-6">
                  <h2 className="text-2xl font-normal font-headline text-on-surface border-b border-outline pb-3 flex flex-col gap-1">
                    <span>{t.d20Chart}</span>
                    <span
                      className={cn(
                        "text-[11px] leading-normal text-on-surface/60 font-body font-normal normal-case",
                        lang === "hi" ? "font-hindi" : "",
                      )}
                    >
                      {t.d20Desc}
                    </span>
                  </h2>
                  <KundliChart data={chartData.d20} />
                </div>
                <div className="space-y-6">
                  <h2 className="text-2xl font-normal font-headline text-on-surface border-b border-outline pb-3 flex flex-col gap-1">
                    <span>{t.d24Chart}</span>
                    <span
                      className={cn(
                        "text-[11px] leading-normal text-on-surface/60 font-body font-normal normal-case",
                        lang === "hi" ? "font-hindi" : "",
                      )}
                    >
                      {t.d24Desc}
                    </span>
                  </h2>
                  <KundliChart data={chartData.d24} />
                </div>
                <div className="space-y-6">
                  <h2 className="text-2xl font-normal font-headline text-on-surface border-b border-outline pb-3 flex flex-col gap-1">
                    <span>{t.d27Chart}</span>
                    <span
                      className={cn(
                        "text-[11px] leading-normal text-on-surface/60 font-body font-normal normal-case",
                        lang === "hi" ? "font-hindi" : "",
                      )}
                    >
                      {t.d27Desc}
                    </span>
                  </h2>
                  <KundliChart data={chartData.d27} />
                </div>
                <div className="space-y-6">
                  <h2 className="text-2xl font-normal font-headline text-on-surface border-b border-outline pb-3 flex flex-col gap-1">
                    <span>{t.d30Chart}</span>
                    <span
                      className={cn(
                        "text-[11px] leading-normal text-on-surface/60 font-body font-normal normal-case",
                        lang === "hi" ? "font-hindi" : "",
                      )}
                    >
                      {t.d30Desc}
                    </span>
                  </h2>
                  <KundliChart data={chartData.d30} />
                </div>
                <div className="space-y-6">
                  <h2 className="text-2xl font-normal font-headline text-on-surface border-b border-outline pb-3 flex flex-col gap-1">
                    <span>{t.d40Chart}</span>
                    <span
                      className={cn(
                        "text-[11px] leading-normal text-on-surface/60 font-body font-normal normal-case",
                        lang === "hi" ? "font-hindi" : "",
                      )}
                    >
                      {t.d40Desc}
                    </span>
                  </h2>
                  <KundliChart data={chartData.d40} />
                </div>
                <div className="space-y-6 lg:col-span-2 lg:max-w-2xl lg:mx-auto lg:w-full">
                  <h2 className="text-2xl font-normal font-headline text-on-surface border-b border-outline pb-3 flex flex-col gap-1">
                    <span>{t.d45Chart}</span>
                    <span
                      className={cn(
                        "text-[11px] leading-normal text-on-surface/60 font-body font-normal normal-case",
                        lang === "hi" ? "font-hindi" : "",
                      )}
                    >
                      {t.d45Desc}
                    </span>
                  </h2>
                  <KundliChart data={chartData.d45} />
                </div>
              </div>
            </div>
          </div>

          <p
            className={`text-xs text-on-surface text-center pt-4 ${lang === "hi" ? "font-hindi" : ""}`}
          >
            {t.northIndianStyle}
          </p>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-normal font-headline text-on-surface border-b border-outline pb-3">
            {t.planetaryPositions}
          </h2>
          <div className="overflow-x-auto bg-white rounded-3xl border border-outline shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white border-b border-outline">
                  <th
                    className={cn(
                      "px-4 py-2.5 text-xs font-bold text-on-surface uppercase font-label",
                      lang === "hi" ? "tracking-normal" : "tracking-widest",
                    )}
                  >
                    {t.planet}
                  </th>
                  <th
                    className={cn(
                      "px-4 py-2.5 text-xs font-bold text-on-surface uppercase font-label text-center",
                      lang === "hi" ? "tracking-normal" : "tracking-widest",
                    )}
                  >
                    {t.house}
                  </th>
                  <th
                    className={cn(
                      "px-4 py-2.5 text-xs font-bold text-on-surface uppercase font-label",
                      lang === "hi" ? "tracking-normal" : "tracking-widest",
                    )}
                  >
                    {t.rasi}
                  </th>
                  <th
                    className={cn(
                      "px-4 py-2.5 text-xs font-bold text-on-surface uppercase font-label",
                      lang === "hi" ? "tracking-normal" : "tracking-widest",
                    )}
                  >
                    {t.rasiLord}
                  </th>
                  <th
                    className={cn(
                      "px-4 py-2.5 text-xs font-bold text-on-surface uppercase font-label",
                      lang === "hi" ? "tracking-normal" : "tracking-widest",
                    )}
                  >
                    {t.degree}
                  </th>
                  <th
                    className={cn(
                      "px-4 py-2.5 text-xs font-bold text-on-surface uppercase font-label",
                      lang === "hi" ? "tracking-normal" : "tracking-widest",
                    )}
                  >
                    {t.nakshatra}
                  </th>
                  <th
                    className={cn(
                      "px-4 py-2.5 text-xs font-bold text-on-surface uppercase font-label",
                      lang === "hi" ? "tracking-normal" : "tracking-widest",
                    )}
                  >
                    {t.nakLord}
                  </th>
                  <th
                    className={cn(
                      "px-4 py-2.5 text-xs font-bold text-on-surface uppercase font-label text-center",
                      lang === "hi" ? "tracking-normal" : "tracking-widest",
                    )}
                  >
                    {t.pada}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline">
                {chartData.planets.map((p, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-surface-container-lowest transition-colors font-body"
                  >
                    <td
                      className={`px-4 py-2.5 text-sm font-medium text-on-surface ${lang === "hi" ? "font-hindi" : ""}`}
                    >
                      {lang === "hi" ? p.nameSanskrit : p.name}
                      {p.isRetrograde && (
                        <span className="ml-1 text-black font-normal">*</span>
                      )}
                      {p.isCombust && (
                        <span className="ml-0.5 text-xs text-black font-normal">
                          ^
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-2.5 text-sm text-on-surface text-center tabular-nums">
                      {p.house}
                    </td>
                    <td
                      className={`px-4 py-2.5 text-sm text-on-surface ${lang === "hi" ? "font-hindi" : ""}`}
                    >
                      {lang === "hi" ? p.rasiSanskrit : p.rasi}
                    </td>
                    <td
                      className={`px-4 py-2.5 text-sm text-on-surface ${lang === "hi" ? "font-hindi" : ""}`}
                    >
                      {lang === "hi" ? p.rasiLordSanskrit : p.rasiLord}
                    </td>
                    <td className="px-4 py-2.5 text-sm text-on-surface whitespace-nowrap tabular-nums">
                      {p.degree}
                    </td>
                    <td
                      className={`px-4 py-2.5 text-sm text-on-surface ${lang === "hi" ? "font-hindi" : ""}`}
                    >
                      {lang === "hi" ? p.nakshatraSanskrit : p.nakshatra}
                    </td>
                    <td
                      className={`px-4 py-2.5 text-sm text-on-surface ${lang === "hi" ? "font-hindi" : ""}`}
                    >
                      {lang === "hi"
                        ? p.nakshatraLordSanskrit
                        : p.nakshatraLord}
                    </td>
                    <td className="px-4 py-2.5 text-sm text-on-surface text-center font-bold tabular-nums">
                      {p.pada}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div
            className={`flex flex-wrap gap-x-6 gap-y-2 text-xs text-on-surface/60 px-4 mt-3 font-body ${lang === "hi" ? "font-hindi" : ""}`}
          >
            <span className="flex items-center gap-1">
              <span className="text-black font-normal">*</span>
              <span>{lang === "hi" ? "वक्री (Retrograde)" : "Retrograde"}</span>
            </span>
            <span className="flex items-center gap-1">
              <span className="text-black font-normal">^</span>
              <span>{lang === "hi" ? "अस्त (Combust)" : "Combust"}</span>
            </span>
          </div>
        </div>

        {/* Vimshottari Dasha Section */}
        <div className="space-y-8">
          <h2 className="text-2xl font-normal font-headline text-on-surface border-b border-outline pb-3">
            {t.vimshottariDasha}
          </h2>

          {/* Interactive Vimshottari Dasha System */}
          <VimshottariDasha
            mahadashas={chartData.mahadashas}
            dashaBalance={chartData.dashaBalance}
            lang={lang}
          />
        </div>

        {/* Sarva Ashtakvarga Section */}
        <div className="space-y-6 pt-4">
          <div className="border-b border-outline pb-3">
            <h2 className="text-2xl font-normal font-headline text-on-surface">
              {t.ashtakvargaTitle}
            </h2>
            <p className="text-sm text-on-surface/70 font-body mt-1 leading-relaxed">
              {t.ashtakvargaDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* SAV North Indian Chart */}
            <div className="bg-white border border-outline rounded-3xl p-6 shadow-sm flex flex-col items-center">
              <h3 className="text-lg font-bold text-accent uppercase font-label mb-4 text-center">
                {lang === "hi" ? "सर्वाष्टकवर्ग चक्र" : "Sarva Ashtakvarga Kundli"}
              </h3>
              <AshtakvargaChart ashtakvarga={chartData.ashtakvarga || []} houseRasis={chartData.d1.houseRasis} />
              <p className="text-[11px] text-on-surface/60 font-body mt-4 text-center max-w-sm">
                {lang === "hi"
                  ? "चक्र में दिए गए बिंदु प्रत्येक भाव/राशि की कुल क्षमता दर्शाते हैं। केंद्र स्थान में उच्च बिंदु शुभ फलदायक होते हैं।"
                  : "The points in each house represent the total composite energy of that sign. High points in key houses yield powerful results."}
              </p>
            </div>

            {/* SAV Points Table */}
            <div className="bg-white border border-outline rounded-3xl p-6 shadow-sm overflow-hidden flex flex-col">
              <h3 className="text-lg font-bold text-accent uppercase font-label mb-4">
                {lang === "hi" ? "राशि अनुसार अष्टकवर्ग बिंदु" : "Ashtakvarga Points per Sign"}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[
                  { en: "Aries", hi: "मेष" },
                  { en: "Taurus", hi: "वृषभ" },
                  { en: "Gemini", hi: "मिथुन" },
                  { en: "Cancer", hi: "कर्क" },
                  { en: "Leo", hi: "सिंह" },
                  { en: "Virgo", hi: "कन्या" },
                  { en: "Libra", hi: "तुला" },
                  { en: "Scorpio", hi: "वृश्चिक" },
                  { en: "Sagittarius", hi: "धनु" },
                  { en: "Capricorn", hi: "मकर" },
                  { en: "Aquarius", hi: "कुम्भ" },
                  { en: "Pisces", hi: "मीन" }
                ].map((sign, idx) => {
                  const pts = chartData.ashtakvarga ? chartData.ashtakvarga[idx] : 0;
                  let bgClass = "bg-surface-container-low";
                  let borderClass = "border-outline/50";
                  if (pts >= 30) {
                    bgClass = "bg-green-50/50";
                    borderClass = "border-green-200";
                  } else if (pts < 25) {
                    bgClass = "bg-amber-50/50";
                    borderClass = "border-amber-200";
                  }

                  return (
                    <div key={idx} className={cn("p-3 rounded-2xl border flex flex-col justify-between transition-colors", bgClass, borderClass)}>
                      <span className={cn("text-xs font-bold text-on-surface uppercase tracking-wider font-label", lang === "hi" ? "font-hindi" : "")}>
                        {lang === "hi" ? sign.hi : sign.en}
                      </span>
                      <div className="flex justify-between items-baseline mt-2">
                        <span className="text-[10px] text-on-surface/60 font-body">{t.rasiPoints}</span>
                        <span className="text-xl font-extrabold text-on-surface font-headline tabular-nums">{pts}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Verification CTA Section */}
        <div className="bg-surface-container-low rounded-[2.5rem] md:rounded-[4rem] border border-outline/50 p-8 md:p-16 text-center relative overflow-hidden max-w-5xl mx-auto print:hidden">
          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-normal mb-6 font-headline text-on-surface">
              {t.ctaTitle}
            </h3>
            <p className="text-sm md:text-base text-on-surface font-body mb-10 max-w-2xl mx-auto leading-relaxed">
              {t.ctaDesc}
            </p>
            <button
              onClick={handleBookNow}
              className={cn(
                "inline-block bg-primary text-white px-12 py-5 rounded-full font-medium text-xs md:text-sm uppercase font-label",
                lang === "hi"
                  ? "tracking-normal text-base"
                  : "tracking-[0.1em]",
              )}
            >
              {t.ctaBtn}
            </button>
          </div>
          {/* Subtle Decorative Element */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[radial-gradient(circle,rgba(255,174,66,0.05)_0%,transparent_70%)] rounded-full -z-0"></div>
        </div>

        <ExploreTools currentPath="/horoscope" className="mt-12 print:hidden" />
      </div>
    </>
  );
};

export default function HoroscopeClientPage() {
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
