'use client';

import { useMemo } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { generateAstrologyData } from '@/lib/astrology';
import JsonLd from '@/components/JsonLd';

const PanchangPage = () => {
  const panchang = useMemo(() => {
    const now = new Date();
    // Convert to IST (UTC+5:30) for calculation
    const istOffset = 5.5 * 60 * 60 * 1000;
    const istTime = new Date(now.getTime() + istOffset);

    const dob = istTime.toISOString().split('T')[0];
    const tob = istTime.toISOString().split('T')[1].substring(0, 5);

    // Default to New Delhi coordinates
    const data = generateAstrologyData(dob, tob, "28.6139", "77.2090");
    return data.panchang;
  }, []);

  const panchangSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Daily Panchang - Today's Vedic Tithi, Nakshatra & Muhurta",
    "description": `Detailed Vedic Panchang for today. Tithi: ${panchang.tithi}, Nakshatra: ${panchang.nakshatra}, Yoga: ${panchang.yoga}, Rahu Kaal: ${panchang.rahuKaal}.`,
    "author": {
      "@type": "Person",
      "name": "Pandit Rahul Bali"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Rahul Bali Astrology"
    }
  };

  return (
    <main className="min-h-screen bg-surface">
      <Navbar />
      <JsonLd data={panchangSchema} />

      {/* Hero Section */}
      <section className="pt-32 pb-12 md:pt-40 md:pb-20 bg-background relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-8 relative z-10 text-center">
          <span className="text-[10px] font-bold text-accent uppercase tracking-[0.3em] font-label block mb-4">Vedic Timekeeping</span>
          <h1 className="text-4xl md:text-6xl font-normal font-headline text-on-surface mb-6">Daily Panchang</h1>
          <p className="text-secondary font-body leading-relaxed max-w-2xl mx-auto">
            Align your daily activities with the cosmic rhythm. Accurate Vedic Panchang details for New Delhi, India.
          </p>
        </div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-accent/5 rounded-full blur-[120px] -z-0"></div>
      </section>

      {/* Panchang Details */}
      <section className="pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Panchang Card */}
          <div className="lg:col-span-2 bg-white border border-outline/80 rounded-[2.5rem] p-8 md:p-12 shadow-sm">
            <h2 className="text-xl font-bold text-accent uppercase tracking-[0.2em] font-label mb-8">Panchang Elements</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div className="space-y-1">
                <p className="text-[9px] font-bold text-secondary uppercase tracking-widest font-label">Tithi (Lunar Day)</p>
                <p className="text-xl font-headline text-on-surface">{panchang.tithi}</p>
                <p className="text-xs text-accent font-medium">{panchang.tithiSanskrit}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[9px] font-bold text-secondary uppercase tracking-widest font-label">Nakshatra</p>
                <p className="text-xl font-headline text-on-surface">{panchang.nakshatra}</p>
                <p className="text-xs text-accent font-medium">{panchang.nakshatraSanskrit}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[9px] font-bold text-secondary uppercase tracking-widest font-label">Yoga</p>
                <p className="text-xl font-headline text-on-surface">{panchang.yoga}</p>
                <p className="text-xs text-accent font-medium">{panchang.yogaSanskrit}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[9px] font-bold text-secondary uppercase tracking-widest font-label">Karana</p>
                <p className="text-xl font-headline text-on-surface">{panchang.karana}</p>
                <p className="text-xs text-accent font-medium">{panchang.karanaSanskrit}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[9px] font-bold text-secondary uppercase tracking-widest font-label">Vara (Day)</p>
                <p className="text-xl font-headline text-on-surface">{panchang.vara}</p>
                <p className="text-xs text-accent font-medium">{panchang.varaSanskrit}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[9px] font-bold text-secondary uppercase tracking-widest font-label">Paksha</p>
                <p className="text-xl font-headline text-on-surface">{panchang.paksha}</p>
                <p className="text-xs text-accent font-medium">{panchang.pakshaSanskrit}</p>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-outline/20 grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="space-y-1">
                <p className="text-[9px] font-bold text-secondary uppercase tracking-widest font-label">Sun Sign</p>
                <p className="text-base font-headline text-on-surface">{panchang.sunSign}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[9px] font-bold text-secondary uppercase tracking-widest font-label">Moon Sign</p>
                <p className="text-base font-headline text-on-surface">{panchang.moonSign}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[9px] font-bold text-secondary uppercase tracking-widest font-label">Ritu (Season)</p>
                <p className="text-base font-headline text-on-surface">{panchang.ritu}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[9px] font-bold text-secondary uppercase tracking-widest font-label">Ayana</p>
                <p className="text-base font-headline text-on-surface">{panchang.ayana}</p>
              </div>
            </div>
          </div>

          {/* Timings Card */}
          <div className="bg-white border border-outline/80 rounded-[2.5rem] p-8 md:p-12 shadow-sm h-full">
            <h2 className="text-xl font-bold text-accent uppercase tracking-[0.2em] font-label mb-8">Muhurtas & Kaal</h2>
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center text-accent shrink-0">
                  <span className="material-symbols-outlined text-xl">sunny</span>
                </div>
                <div>
                  <p className="text-[9px] font-bold text-secondary uppercase tracking-widest font-label">Abhijit Muhurta</p>
                  <p className="text-lg font-headline text-on-surface">{panchang.abhijitMuhurta}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-error/10 rounded-full flex items-center justify-center text-error shrink-0">
                  <span className="material-symbols-outlined text-xl">block</span>
                </div>
                <div>
                  <p className="text-[9px] font-bold text-secondary uppercase tracking-widest font-label">Rahu Kaal</p>
                  <p className="text-lg font-headline text-on-surface">{panchang.rahuKaal}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center text-secondary shrink-0">
                  <span className="material-symbols-outlined text-xl">schedule</span>
                </div>
                <div>
                  <p className="text-[9px] font-bold text-secondary uppercase tracking-widest font-label">Gulika Kaal</p>
                  <p className="text-lg font-headline text-on-surface">{panchang.gulikaKaal}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center text-secondary shrink-0">
                  <span className="material-symbols-outlined text-xl">history</span>
                </div>
                <div>
                  <p className="text-[9px] font-bold text-secondary uppercase tracking-widest font-label">Yamaganda Kaal</p>
                  <p className="text-lg font-headline text-on-surface">{panchang.yamagandaKaal}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Educational Content Section */}
      <section className="py-24 bg-surface-container-low border-y border-outline/30">
        <div className="max-w-4xl mx-auto px-8">
          <h2 className="text-3xl md:text-4xl font-normal mb-12 font-headline text-on-surface text-center">Understanding Panchang</h2>
          <div className="prose prose-sm md:prose-base max-w-none text-secondary font-body leading-relaxed space-y-8">
            <p>
              The <strong>Panchang</strong> is a traditional Vedic calendar that serves as an essential guide for daily life in Indian culture. Derived from the Sanskrit words <em>&apos;Pancha&apos;</em> (five) and <em>&apos;Anga&apos;</em> (limbs), it consists of five key astronomical elements: Tithi, Vara, Nakshatra, Yoga, and Karana.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 not-prose">
              <div className="bg-white p-6 rounded-2xl border border-outline/20">
                <h3 className="text-lg font-headline text-on-surface mb-2">1. Tithi</h3>
                <p className="text-sm">The lunar day based on the angular distance between the Sun and the Moon. It is crucial for determining festivals and rituals.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-outline/20">
                <h3 className="text-lg font-headline text-on-surface mb-2">2. Vara</h3>
                <p className="text-sm">The solar day of the week. Each day is ruled by a specific planet, influencing the energy of the activities performed.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-outline/20">
                <h3 className="text-lg font-headline text-on-surface mb-2">3. Nakshatra</h3>
                <p className="text-sm">The lunar mansion where the Moon is positioned. Nakshatras define the psychological and emotional temperament of the time.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-outline/20">
                <h3 className="text-lg font-headline text-on-surface mb-2">4. Yoga</h3>
                <p className="text-sm">A specific relationship between the Sun and Moon positions that indicates the general prevailing energy or &apos;joining&apos;.</p>
              </div>
            </div>

            <p>
              Beyond these five limbs, the Panchang also provides information on <strong>Auspicious Timings (Muhurtas)</strong> like Abhijit Muhurta, which is ideal for starting new ventures, and <strong>Inauspicious Periods</strong> like Rahu Kaal, during which significant new actions are traditionally avoided.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-surface">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <div className="bg-surface-container-low border border-outline/50 rounded-[3rem] p-10 md:p-16">
            <h2 className="text-2xl md:text-3xl font-normal mb-6 font-headline text-on-surface">Plan Your Day with Expert Guidance</h2>
            <p className="text-sm md:text-base text-secondary font-body mb-10 leading-relaxed max-w-2xl mx-auto">
              While the daily Panchang provides general guidance, a <strong>Personalized Muhurta</strong> based on your individual birth chart (Kundli) ensures the highest level of success for your specific endeavors.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/free-horoscope"
                className="px-8 py-4 bg-accent text-white rounded-full font-medium text-[10px] md:text-xs tracking-[0.1em] uppercase font-label"
              >
                Generate Free Kundli
              </a>
              <a
                href="/services"
                className="px-8 py-4 bg-primary text-white rounded-full font-medium text-[10px] md:text-xs tracking-[0.1em] uppercase font-label"
              >
                Book Consultation
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default PanchangPage;
