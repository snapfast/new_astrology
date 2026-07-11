"use client";

import React, { useState, useEffect, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import BiorhythmChart from "@/components/BiorhythmChart";
import MiniBiorhythmChart from "@/components/MiniBiorhythmChart";
import { calculateBiorhythms, calculateBiorhythmSeries } from "@/lib/biorhythm";
import { sendGAEvent } from "@next/third-parties/google";
import { useLanguage } from "@/context/LanguageContext";

const TRANSLATIONS = {
  en: {
    heroTitle: "Personal Biorhythms",
    heroSubtitle: "Energy Cycles",
    heroDesc: "Understand your natural cycles. Physical, emotional, and intellectual rhythms influence your daily life from the moment of birth.",
    cycleDay: "Day Cycle",
    interpretation: "Interpretation",
    interpretationDesc: "Values above the center line are <strong>High Phases</strong> (energetic), below are <strong>Low Phases</strong> (rest). Crossing the line indicates transition or instability.",
    calculating: "Calculating your rhythms...",
    enterDob: "Please enter your birth date to see your personal biorhythm cycles.",
    dobLabel: "Date of Birth",
    analysisDate: "Analysis Date",
    today: "Today",
    historyTitle: "History & Origins",
    history1: "The theory of biorhythms originated in the late 19th century with Wilhelm Fliess, a Berlin physician who observed recurring 23-day physical and 28-day emotional cycles. He believed these rhythms were present from birth and influenced human behavior throughout life.",
    history2: "In the early 20th century, Alfred Teltscher added the 33-day intellectual cycle after observing rhythmic patterns in students' academic performance, suggesting that mental alertness also followed a cyclic nature.",
    history3: "Popularized in the 1970s, biorhythm charting became a global phenomenon. While modern science views these as a historical curiosity, they remain a popular tool for self-reflection and understanding the natural ebb and flow of human energy.",
    cycles: {
      Physical: { name: "Physical", desc: "Coordination, strength, and well-being." },
      Emotional: { name: "Emotional", desc: "Creativity, sensitivity, and mood." },
      Intellectual: { name: "Intellectual", desc: "Logic, memory, and concentration." },
      Spiritual: { name: "Spiritual", desc: "Peace, harmony, and inner stability." },
      Intuitional: { name: "Intuitional", desc: "Unconscious perception and instincts." },
      Aesthetic: { name: "Aesthetic", desc: "Appreciation for art, culture, and beauty." },
      Awareness: { name: "Awareness", desc: "Conscious perception and alertness." }
    }
  },
  hi: {
    heroTitle: "व्यक्तिगत बायोरिदम",
    heroSubtitle: "ऊर्जा चक्र",
    heroDesc: "अपने प्राकृतिक चक्रों को समझें। शारीरिक, भावनात्मक और बौद्धिक लय जन्म के समय से ही आपके दैनिक जीवन को प्रभावित करती है।",
    cycleDay: "दिवसीय चक्र",
    interpretation: "व्याख्या",
    interpretationDesc: "केंद्र रेखा के ऊपर के मान <strong>उच्च चरण</strong> (ऊर्जावान) हैं, नीचे के मान <strong>निम्न चरण</strong> (विश्राम) हैं। रेखा को पार करना संक्रमण या अस्थिरता को दर्शाता है।",
    calculating: "आपकी लय की गणना की जा रही है...",
    enterDob: "कृपया अपने व्यक्तिगत बायोरिदम चक्रों को देखने के लिए अपनी जन्म तिथि दर्ज करें।",
    dobLabel: "जन्म तिथि",
    analysisDate: "विश्लेषण तिथि",
    today: "आज",
    historyTitle: "इतिहास और उत्पत्ति",
    history1: "बायोरिदम का सिद्धांत 19वीं शताब्दी के अंत में बर्लिन के एक चिकित्सक विल्हेम फ्लिस के साथ शुरू हुआ, जिन्होंने 23-दिवसीय शारीरिक और 28-दिवसीय भावनात्मक चक्रों को दोहराते हुए देखा। उनका मानना ​​था कि ये लय जन्म से ही मौजूद होती हैं और जीवन भर मानवीय व्यवहार को प्रभावित करती हैं।",
    history2: "20वीं शताब्दी की शुरुआत में, अल्फ्रेड टेल्त्शर ने छात्रों के शैक्षणिक प्रदर्शन में लयबद्ध पैटर्न देखने के बाद 33-दिवसीय बौद्धिक चक्र जोड़ा, जिससे पता चला कि मानसिक सतर्कता भी एक चक्रीय प्रकृति का पालन करती है।",
    history3: "1970 के दशक में लोकप्रिय हुआ, बायोरिदम चार्टिंग एक वैश्विक घटना बन गई। जबकि आधुनिक विज्ञान इन्हें एक ऐतिहासिक जिज्ञासा के रूप में देखता है, वे आत्म-चिंतन और मानव ऊर्जा के प्राकृतिक उतार-चढ़ाव को समझने के लिए एक लोकप्रिय उपकरण बने हुए हैं।",
    cycles: {
      Physical: { name: "शारीरिक", desc: "समन्वय, शक्ति और कल्याण।" },
      Emotional: { name: "भावनात्मक", desc: "रचनात्मकता, संवेदनशीलता और मनोदशा।" },
      Intellectual: { name: "बौद्धिक", desc: "तर्क, स्मृति और एकाग्रता।" },
      Spiritual: { name: "आध्यात्मिक", desc: "शांति, सद्भाव और आंतरिक स्थिरता।" },
      Intuitional: { name: "सहज ज्ञान युक्त", desc: "अचेतन धारणा और वृत्ति।" },
      Aesthetic: { name: "सौंदर्यबोध", desc: "कला, संस्कृति और सुंदरता के लिए प्रशंसा।" },
      Awareness: { name: "जागरूकता", desc: "सचेत धारणा और सतर्कता।" }
    }
  }
};

const BiorhythmContent = () => {
  const { lang } = useLanguage();
  const t = TRANSLATIONS[lang];
  const [dob, setDob] = useState<string>("2000-01-01");
  const [targetDate, setTargetDate] = useState<Date>(() => {
    const now = new Date();
    // Initialize with UTC midnight of today
    return new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
  });

  useEffect(() => {
    const savedDob = localStorage.getItem("biorhythm_dob");
    if (savedDob) {
      setDob(savedDob);
    }
  }, []);

  const handleDobChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDob = e.target.value;
    setDob(newDob);
    localStorage.setItem("biorhythm_dob", newDob);
    sendGAEvent({ event: "action_click", action_name: "biorhythm_dob_change" });
  };

  const handleTargetDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      // Input returns YYYY-MM-DD, new Date("YYYY-MM-DD") creates UTC midnight
      setTargetDate(new Date(e.target.value));
    }
  };

  const adjustDate = (days: number) => {
    const newDate = new Date(targetDate);
    newDate.setUTCDate(newDate.getUTCDate() + days);
    setTargetDate(newDate);
    sendGAEvent({
      event: "action_click",
      action_name: `biorhythm_date_adjust_${days}`,
    });
  };

  const resetToday = () => {
    const now = new Date();
    setTargetDate(
      new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate())),
    );
    sendGAEvent({
      event: "action_click",
      action_name: "biorhythm_reset_today",
    });
  };

  const biorhythmData = useMemo(() => {
    if (!dob) return null;
    try {
      // dob string is YYYY-MM-DD, new Date(dob) is UTC midnight
      return calculateBiorhythms(new Date(dob), targetDate);
    } catch {
      return null;
    }
  }, [dob, targetDate]);

  const seriesData = useMemo(() => {
    if (!dob) return null;
    try {
      // Range 30 means -30 to +30, total 61 days (Fulfils 60-day cycle requirement)
      return calculateBiorhythmSeries(new Date(dob), targetDate, 30);
    } catch {
      return null;
    }
  }, [dob, targetDate]);

  const miniSeriesData = useMemo(() => {
    if (!seriesData) return null;
    // Performance Optimization: Slice the already calculated seriesData instead of recalculating.
    // seriesData has 61 points (-30 to +30). We need 7 points (-3 to +3).
    // The starting index for -3 is 27 (30 - 3), and we want 7 elements.
    return seriesData.slice(27, 34);
  }, [seriesData]);

  const formattedTargetDate = useMemo(() => targetDate.toLocaleDateString(lang === 'hi' ? 'hi-IN' : 'en-US', {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }), [targetDate, lang]);

  return (
    <>
      <PageHeader
        title={t.heroTitle}
        subtitle={t.heroSubtitle}
        description={t.heroDesc}
      />

      <div className="py-8 md:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 md:space-y-12">
        {/* Unified Control Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6 bg-white border border-outline/80 rounded-[2rem] p-5 shadow-sm">
          {/* DOB Input */}
          <div className="flex-1 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="shrink-0">
              <label
                htmlFor="dob"
                className={`block text-[10px] font-bold text-accent uppercase font-label mb-1 sm:mb-0 ${lang === 'en' ? 'tracking-widest' : ''}`}
              >
                {t.dobLabel}
              </label>
            </div>
            <div className="relative w-full sm:max-w-[200px]">
              <input
                type="date"
                id="dob"
                value={dob}
                onChange={handleDobChange}
                className="w-full bg-white border border-outline/50 rounded-xl px-4 py-2 text-on-surface font-body focus:ring-2 focus:ring-accent transition-all text-sm appearance-none"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-accent pointer-events-none text-lg">
                calendar_today
              </span>
            </div>
          </div>

          {/* Target Date Navigation (Only shown when DOB is present) */}
          {dob && (
            <div className="flex flex-col md:flex-row items-center gap-6 border-t md:border-t-0 md:border-l border-outline/20 pt-6 md:pt-0 md:pl-8">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => adjustDate(-1)}
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-white text-accent hover:bg-surface-container-high transition-colors border border-outline/30"
                  title="Previous Day"
                  aria-label="Previous Day"
                >
                  <span className="material-symbols-outlined text-xl">
                    chevron_left
                  </span>
                </button>

                <button
                  onClick={resetToday}
                  className={`px-6 py-2 rounded-full bg-accent text-white hover:bg-accent/90 transition-colors text-[10px] font-label uppercase ${lang === 'en' ? 'tracking-wider' : ''}`}
                >
                  {t.today}
                </button>

                <button
                  onClick={() => adjustDate(1)}
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-white text-accent hover:bg-surface-container-high transition-colors border border-outline/30"
                  title="Next Day"
                  aria-label="Next Day"
                >
                  <span className="material-symbols-outlined text-xl">
                    chevron_right
                  </span>
                </button>
              </div>

              <div className="flex items-center gap-4 w-full md:w-auto">
                <div className="relative flex-1 md:flex-none">
                  <input
                    type="date"
                    value={targetDate.toISOString().split("T")[0]}
                    onChange={handleTargetDateChange}
                    className="w-full md:w-44 px-4 py-2 rounded-xl bg-white border border-outline/50 focus:ring-2 focus:ring-accent font-body text-sm text-on-surface outline-none transition-all appearance-none"
                    aria-label="Select Target Date"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-accent pointer-events-none text-lg">
                    event
                  </span>
                </div>
                <div className="hidden sm:block sm:w-40 shrink-0">
                  <p className={`text-[10px] font-label text-accent uppercase mb-0.5 ${lang === 'en' ? 'tracking-widest' : ''}`}>
                    {t.analysisDate}
                  </p>
                  <p className={`text-xs font-body tabular-nums text-on-surface whitespace-nowrap ${lang === 'hi' ? 'font-hindi' : ''}`}>
                    {formattedTargetDate}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {biorhythmData && (
          <div className="space-y-8 md:space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Chart Section */}
            {seriesData && (
              <div className="animate-in fade-in duration-1000 delay-300">
                <BiorhythmChart series={seriesData} lang={lang} />
              </div>
            )}

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {biorhythmData.cycles.map((cycle) => (
                <div
                  key={cycle.name}
                  className="bg-white border border-outline/80 rounded-[2rem] p-5 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
                >
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-lg font-headline text-on-surface">
                          {t.cycles[cycle.name as keyof typeof t.cycles]?.name || cycle.name}
                        </h3>
                        <p className={`text-[9px] text-on-surface font-label uppercase mt-0.5 ${lang === 'en' ? 'tracking-widest' : ''}`}>
                          {cycle.period} {t.cycleDay}
                        </p>
                      </div>
                      <span
                        className="material-symbols-outlined text-xl"
                        style={{ color: cycle.color }}
                      >
                        {cycle.name === "Physical"
                          ? "fitness_center"
                          : cycle.name === "Emotional"
                            ? "favorite"
                            : cycle.name === "Intellectual"
                              ? "psychology"
                              : cycle.name === "Spiritual"
                                ? "self_improvement"
                                : cycle.name === "Intuitional"
                                  ? "auto_awesome"
                                  : cycle.name === "Aesthetic"
                                    ? "palette"
                                    : "visibility"}
                      </span>
                    </div>

                    <div className="mb-4 bg-surface-container-low/30 rounded-xl p-3">
                      {miniSeriesData && (
                        <MiniBiorhythmChart
                          series={miniSeriesData}
                          cycleName={cycle.name}
                          color={cycle.color}
                        />
                      )}
                    </div>

                    <p className="text-xs text-on-surface font-body leading-relaxed">
                      {t.cycles[cycle.name as keyof typeof t.cycles]?.desc || cycle.description}
                    </p>
                  </div>
                </div>
              ))}

              {/* Integrated Interpretation Box */}
              <div className="bg-accent/5 border border-accent/20 rounded-[2rem] p-4 md:p-5 flex flex-col justify-center">
                <h4 className="text-base font-headline text-on-surface mb-2">
                  {t.interpretation}
                </h4>
                <p className="text-[11px] text-on-surface font-body leading-tight" dangerouslySetInnerHTML={{ __html: t.interpretationDesc }} />
              </div>
            </div>
          </div>
        )}

        {!biorhythmData && dob && (
          <div className="text-center py-12">
            <p className="text-on-surface font-body">
              {t.calculating}
            </p>
          </div>
        )}

        {!dob && (
          <div className="text-center py-12 animate-pulse">
            <p className="text-on-surface font-body text-base">
              {t.enterDob}
            </p>
            <span className="material-symbols-outlined text-accent text-5xl mt-6">
              calendar_today
            </span>
          </div>
        )}

        <div className="bg-white border border-outline/80 rounded-[2.5rem] p-5 md:p-8 shadow-sm">
          <h4 className="text-xl font-headline text-on-surface mb-4">
            {t.historyTitle}
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-on-surface font-body leading-relaxed">
            <p>
              {t.history1}
            </p>
            <p>
              {t.history2}
            </p>
            <p>
              {t.history3}
            </p>
          </div>
        </div>

        {/* Explore More Vedic Tools Section to Reduce Bounce Rate */}
        <section className="py-8 bg-surface-bright relative overflow-hidden border-t border-outline/30 rounded-[3rem] mt-8">
          <div className="max-w-5xl mx-auto px-4 md:px-8 text-center relative z-10">
            <h3 className="text-xl md:text-2xl font-normal mb-2 font-headline text-on-surface">
              {lang === 'en' ? "Explore More Vedic Astrology Tools" : "अन्य वैदिक ज्योतिष उपकरण देखें"}
            </h3>
            <p className="text-xs md:text-sm text-on-surface/90 font-body mb-8 max-w-xl mx-auto">
              {lang === 'en'
                ? "Align your lifestyle and cosmic energies further. Try our precise astronomical tools and personalized services."
                : "अपनी जीवनशैली और ब्रह्मांडीय ऊर्जाओं को और बेहतर बनाएं। हमारे सटीक खगोलीय उपकरणों और व्यक्तिगत सेवाओं का उपयोग करें।"}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
              {/* Card 1: Free Kundli */}
              <a
                href="/free-horoscope"
                onClick={() => sendGAEvent({ event: 'action_click', action_name: 'biorhythm_page_explore_kundli' })}
                className="bg-white border border-outline/80 rounded-[2rem] p-5 shadow-sm hover:shadow-md transition-shadow group flex flex-col justify-between"
              >
                <div>
                  <span className="material-symbols-outlined text-accent text-3xl mb-3 block">auto_stories</span>
                  <h4 className="text-sm font-headline text-on-surface mb-1">{lang === 'en' ? "Free Kundli Online" : "मुफ्त ऑनलाइन कुंडली"}</h4>
                  <p className="text-[11px] text-on-surface/70 leading-relaxed font-body">
                    {lang === 'en' ? "Get accurate Janam Kundli charts and astrological calculations." : "सटीक जन्म कुंडली चार्ट और ज्योतिषीय गणना प्राप्त करें।"}
                  </p>
                </div>
                <span className="text-[10px] uppercase font-label font-bold text-accent tracking-widest mt-4 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  {lang === 'en' ? "Generate Chart" : "कुंडली बनाएं"} →
                </span>
              </a>

              {/* Card 2: Daily Panchang */}
              <a
                href="/panchang"
                onClick={() => sendGAEvent({ event: 'action_click', action_name: 'biorhythm_page_explore_panchang' })}
                className="bg-white border border-outline/80 rounded-[2rem] p-5 shadow-sm hover:shadow-md transition-shadow group flex flex-col justify-between"
              >
                <div>
                  <span className="material-symbols-outlined text-accent text-3xl mb-3 block">wb_sunny</span>
                  <h4 className="text-sm font-headline text-on-surface mb-1">{lang === 'en' ? "Daily Panchang" : "दैनिक पंचांग"}</h4>
                  <p className="text-[11px] text-on-surface/70 leading-relaxed font-body">
                    {lang === 'en' ? "View today's Tithi, Nakshatra, Yoga, and Auspicious Muhurtas." : "आज की तिथि, नक्षत्र, योग और शुभ मुहूर्त देखें।"}
                  </p>
                </div>
                <span className="text-[10px] uppercase font-label font-bold text-accent tracking-widest mt-4 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  {lang === 'en' ? "Check Panchang" : "पंचांग देखें"} →
                </span>
              </a>

              {/* Card 3: Panch Pakshi */}
              <a
                href="/panch-pakshi"
                onClick={() => sendGAEvent({ event: 'action_click', action_name: 'biorhythm_page_explore_pakshi' })}
                className="bg-white border border-outline/80 rounded-[2rem] p-5 shadow-sm hover:shadow-md transition-shadow group flex flex-col justify-between"
              >
                <div>
                  <span className="material-symbols-outlined text-accent text-3xl mb-3 block">flight</span>
                  <h4 className="text-sm font-headline text-on-surface mb-1">{lang === 'en' ? "Panch Pakshi" : "पंच पक्षी"}</h4>
                  <p className="text-[11px] text-on-surface/70 leading-relaxed font-body">
                    {lang === 'en' ? "Find your birth bird and understand daily peak activity times." : "अपने जन्म पक्षी का पता लगाएं और दैनिक शिखर गतिविधि समय को समझें।"}
                  </p>
                </div>
                <span className="text-[10px] uppercase font-label font-bold text-accent tracking-widest mt-4 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  {lang === 'en' ? "Find Birth Bird" : "पक्षी खोजें"} →
                </span>
              </a>

              {/* Card 4: Book Consultation */}
              <button
                onClick={() => {
                  sendGAEvent({ event: 'action_click', action_name: 'biorhythm_page_explore_booking' });
                  window.dispatchEvent(new CustomEvent('openBookingModal'));
                }}
                className="bg-white border border-outline/80 rounded-[2rem] p-5 shadow-sm hover:shadow-md transition-shadow text-left group flex flex-col justify-between"
              >
                <div>
                  <span className="material-symbols-outlined text-accent text-3xl mb-3 block">chat_bubble</span>
                  <h4 className="text-sm font-headline text-on-surface mb-1">{lang === 'en' ? "Book 1-on-1 Session" : "परामर्श सत्र बुक करें"}</h4>
                  <p className="text-[11px] text-on-surface/70 leading-relaxed font-body">
                    {lang === 'en' ? "Get solutions for career, relationships, remedies & spiritual path." : "करियर, रिश्तों, उपायों और आध्यात्मिक मार्ग के लिए समाधान प्राप्त करें।"}
                  </p>
                </div>
                <span className="text-[10px] uppercase font-label font-bold text-accent tracking-widest mt-4 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  {lang === 'en' ? "Connect Now" : "जुड़ें"} →
                </span>
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default function BiorhythmPage() {
  return (
    <main className="min-h-screen bg-surface">
      <Navbar />
      <BiorhythmContent />
      <Footer />
    </main>
  );
}
