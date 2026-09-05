'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';

const TRANSLATIONS = {
  en: {
    title: "Privacy Policy",
    subtitle: "Information Security",
    description: "Learn how your birth details and personal information are handled securely.",
    heading1: "1. Introduction",
    para1: "Welcome to Rahul Bali Astrology. We are committed to protecting your privacy and ensuring that your personal and astrological data is handled securely and transparently. This Privacy Policy describes how we collect, use, and safeguard your information when you visit our website and use our services.",
    heading2: "2. Information We Collect",
    para2: "To provide accurate Vedic astrological calculations, we collect the following details when you generate a birth chart or book a consultation:",
    list1: [
      "Personal details (Name, Email address)",
      "Astrological data (Exact Date of Birth, Time of Birth, and Place/Coordinates of Birth)",
      "Anonymized usage statistics and navigation data via Google Analytics (if permitted)"
    ],
    heading3: "3. How We Use Your Information",
    para3: "Your data is strictly processed to deliver precise, personalized astrological insights:",
    list2: [
      "To calculate planetary degrees, divisional charts (D1, D3, D9, D10, D7, D60), Vimshottari Dasha, Panchang, and Panch Pakshi bird activity.",
      "To schedule and coordinate live 1-on-1 consultations (securely via Calendly).",
      "To improve our website performance, layout stability, and user experience."
    ],
    heading4: "4. Confidentiality & Security",
    para4: "We adhere to a strict confidentiality protocol. Your birth details are used solely for calculations and are never shared, sold, or rented to any third parties. All input forms use secure protocols, and localized inputs like birth place coordinates are validated and sanitized to prevent unauthorized access.",
    heading5: "5. Third-Party Integrations",
    para5: "Our platform integrates with trusted external service providers:",
    list3: [
      { strong: "Calendly:", text: " Used exclusively for secure appointment bookings." },
      { strong: "Google Analytics:", text: " Collects anonymous usage trends to optimize the speed and reach of our services." },
      { strong: "Donations:", text: " UPI QR Codes and PayPal integrations are processed directly by the respective financial gateways; no payment credentials or card details are ever stored on our servers." }
    ],
    heading6: "6. Contact Us",
    para6: "If you have any questions or concerns regarding this Privacy Policy or your data, please contact us at:",
    emailLabel: "Email: "}};

export default function PrivacyContent() {
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
            </div>

            <div className="space-y-4">
              <h2 className="text-xl md:text-2xl font-normal font-headline text-on-surface">{t.heading5}</h2>
              <p className="text-on-surface/90">{t.para5}</p>
              <ul className="list-disc pl-6 space-y-4 text-on-surface/90">
                {t.list3.map((item, idx) => (
                  <li key={idx}>
                    <strong>{item.strong}</strong>{item.text}
                  </li>
                ))}
              </ul>
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
