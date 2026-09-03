'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';

const TRANSLATIONS = {
  en: {
    title: "Terms of Service",
    subtitle: "Guidelines & Disclaimers",
    description: "Please read our Terms of Service and disclaimers before using our tools and booking consultations.",
    heading1: "1. Acceptance of Terms",
    para1: "By accessing and using the website astro.rahulbali.in ('Website') and any services, calculations, or tools provided by Rahul Bali Astrology, you agree to comply with and be bound by these Terms of Service. If you do not agree, please refrain from using our services.",
    heading2: "2. Nature of Astrological Guidance & Disclaimers",
    para2: "Vedic Astrology (Jyotish) is an ancient, interpretive science. All astrological analyses, horoscopes, divisional chart calculations, and consultations with Pandit Rahul Bali Ji:",
    list1: [
      "Are intended solely for self-awareness, spiritual guidance, and educational purposes.",
      "Do not constitute absolute or legally binding predictions.",
      "Must never be treated as a substitute for professional medical, psychiatric, financial, legal, or career advisory advice. Any life-altering decision you make is entirely your personal responsibility."
    ],
    heading3: "3. User Inputs & Calculations",
    para3: "Our tools, including Free Online Kundli, Daily Panchang, Biorhythm, and Panch Pakshi, rely on precise astronomical computations (Lahiri Ayanamsa). To ensure exact results:",
    list2: [
      "You are responsible for entering accurate birth details (Date, Time, and Place/coordinates).",
      "We validate and sanitize all form inputs to protect the database and ensure calculation reliability.",
      "Any discrepancies due to inaccurate user input are not the responsibility of this platform."
    ],
    heading4: "4. Consultations & Payments",
    para4: "Appointments and financial contributions are governed by clear, centralized rules:",
    list3: [
      "<strong>Duration:</strong> Live 1-on-1 consultations are exactly 30 minutes in duration, conducted via secure video sessions (Google Meet).",
      "<strong>Suggested Contributions:</strong> Astrological services operate on a voluntary donation model. No upfront payment is required. The suggested donation amounts are clearly outlined in Indian Rupees (INR).",
      "<strong>Booking Protocol:</strong> Bookings are handled via Calendly. No phone number or upfront payment is needed to schedule."
    ],
    heading5: "5. Intellectual Property",
    para5: "All original content, logos, custom SVG chart renderers, calculations, and visual designs featured on this website are the intellectual property of Rahul Bali Astrology. You may not reproduce, redistribute, or monetize any part of this website without explicit written permission.",
    heading6: "6. Support & Contact",
    para6: "If you have any questions, clarifications, or support requests regarding our terms, please reach out to us at:",
    emailLabel: "Email: "}};

export default function TermsContent() {
  const t = TRANSLATIONS.en;

  return (
    <main className="min-h-screen bg-surface">
      <Navbar />
      <PageHeader
        title={t.title}
        subtitle={t.subtitle}
        description={t.description}
      />

      <section className="py-20 bg-surface">
        <div className="max-w-4xl mx-auto px-8">
          <div className="prose prose-sm md:prose-base max-w-none text-on-surface font-body leading-relaxed space-y-10">

            <div className="space-y-4">
              <h2 className="text-xl md:text-2xl font-normal font-headline text-on-surface">{t.heading1}</h2>
              <p className="text-on-surface/90">{t.para1}</p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl md:text-2xl font-normal font-headline text-on-surface">{t.heading2}</h2>
              <p className="text-on-surface/90">{t.para2}</p>
              <ul className="list-disc pl-6 space-y-2 text-on-surface/90">
                {t.list1.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl md:text-2xl font-normal font-headline text-on-surface">{t.heading3}</h2>
              <p className="text-on-surface/90">{t.para3}</p>
              <ul className="list-disc pl-6 space-y-2 text-on-surface/90">
                {t.list2.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl md:text-2xl font-normal font-headline text-on-surface">{t.heading4}</h2>
              <p className="text-on-surface/90">{t.para4}</p>
              <ul className="list-disc pl-6 space-y-4 text-on-surface/90">
                {t.list3.map((item, idx) => (
                  <li key={idx} dangerouslySetInnerHTML={{ __html: item }} />
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl md:text-2xl font-normal font-headline text-on-surface">{t.heading5}</h2>
              <p className="text-on-surface/90">{t.para5}</p>
            </div>

            <div className="space-y-4 border-t border-outline/20 pt-8">
              <h2 className="text-xl md:text-2xl font-normal font-headline text-on-surface">{t.heading6}</h2>
              <p className="text-on-surface/90">{t.para6}</p>
              <p className="font-semibold text-accent">
                {t.emailLabel}
                <a href="mailto:rahulbaliastrology@gmail.com" className="underline hover:text-accent/80 transition-colors">
                  rahulbaliastrology@gmail.com
                </a>
              </p>
            </div>

            <p className="text-center pt-8 text-sm text-accent font-hindi">
              ॥ ॐ नमो भगवते वासुदेवाय नमः ॥
            </p>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
