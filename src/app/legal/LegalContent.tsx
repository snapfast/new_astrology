'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';

const TERMS_TRANSLATIONS = {
  en: {
    heading1: "1. Astrological Disclaimers",
    para1: "All insights, predictions, and planetary calculations provided by Rahul Bali Astrology are strictly for spiritual guidance and entertainment purposes. Astrology is not an exact science and should never serve as a substitute for professional medical, legal, psychological, or financial advice. We do not guarantee specific outcomes, and we cannot be held liable for any decisions you make based on a consultation.",
    heading2: "2. Input Accuracy",
    para2: "The precision of your Vedic birth chart (Kundli) and subsequent predictions relies entirely on the exactness of the birth details you provide. You agree that it is your responsibility to supply the correct:",
    list1: [
      "Date of Birth (DD-MM-YYYY format)",
      "Time of Birth (Exact hours and minutes)",
      "Place of Birth (City and Country/Coordinates)"
    ],
    heading3: "3. Service Limitations",
    para3: "We strictly reserve the right to decline or terminate consultation services for any of the following reasons:",
    list2: [
      "Inappropriate, disrespectful, or abusive behavior toward the astrologer.",
      "Requests for predictions regarding illegal activities, exact lifespans (death predictions), or speculative gambling outcomes.",
      "Cases where psychological or medical intervention is clearly required."
    ],
    heading4: "4. Consultations & Monetary Guidelines",
    para4: "We operate entirely on a spiritual and ethical basis:",
    list3: [
      "<strong>Duration:</strong> Live 1-on-1 consultations are exactly 30 minutes in duration, conducted via secure video sessions (Google Meet).",
      "<strong>Suggested Contributions:</strong> Astrological services operate on a voluntary donation model. No upfront payment is required. The suggested donation amounts are clearly outlined in Indian Rupees (INR).",
      "<strong>Booking Protocol:</strong> Bookings are handled via Calendly. No phone number or upfront payment is needed to schedule."
    ],
    heading5: "5. Intellectual Property",
    para5: "All original content, logos, custom SVG chart renderers, calculations, and visual designs featured on this website are the intellectual property of Rahul Bali Astrology. You may not reproduce, redistribute, or monetize any part of this website without explicit written permission.",
    heading6: "6. Support & Contact",
    para6: "If you have any questions, clarifications, or support requests regarding our terms, please reach out to us at:",
    emailLabel: "Email: "
  }
};

const PRIVACY_TRANSLATIONS = {
  en: {
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
      "<strong>Calendly:</strong> Used exclusively for secure appointment bookings.",
      "<strong>Google Analytics:</strong> Collects anonymous usage trends to optimize the speed and reach of our services.",
      "<strong>Donations:</strong> UPI QR Codes and PayPal integrations are processed directly by the respective financial gateways; no payment credentials or card details are ever stored on our servers."
    ],
    heading6: "6. Contact Us",
    para6: "If you have any questions or concerns regarding this Privacy Policy or your data, please contact us at:",
    emailLabel: "Email: "
  }
};

export default function LegalContent() {
  const [activeTab, setActiveTab] = useState<'terms' | 'privacy'>('terms');

  const tTerms = TERMS_TRANSLATIONS.en;
  const tPrivacy = PRIVACY_TRANSLATIONS.en;

  return (
    <main className="min-h-screen bg-surface">
      <Navbar />
      <PageHeader
        title={activeTab === 'terms' ? "Terms of Service" : "Privacy Policy"}
        subtitle="Legal"
        description={activeTab === 'terms' ? "Read our Terms of Service. Learn about astrological disclaimers, birth inputs, and voluntary contributions." : "Learn how your birth details and personal information are handled securely."}
      />

      <section className="py-10 bg-surface">
        <div className="max-w-4xl mx-auto px-8">

          <div className="flex gap-4 mb-12 border-b border-outline/20 pb-4">
             <button
                onClick={() => setActiveTab('terms')}
                className={`pb-2 px-2 transition-all ${activeTab === 'terms' ? 'border-b-2 border-accent text-accent font-semibold' : 'text-on-surface/70 hover:text-on-surface'}`}
             >
                Terms of Service
             </button>
             <button
                onClick={() => setActiveTab('privacy')}
                 className={`pb-2 px-2 transition-all ${activeTab === 'privacy' ? 'border-b-2 border-accent text-accent font-semibold' : 'text-on-surface/70 hover:text-on-surface'}`}
             >
                Privacy Policy
             </button>
          </div>

          <div className="prose prose-sm md:prose-base max-w-none text-on-surface font-body leading-relaxed space-y-10">
            {activeTab === 'terms' && (
              <>
                <div className="space-y-4">
                  <h2 className="text-xl md:text-2xl font-normal font-headline text-on-surface">{tTerms.heading1}</h2>
                  <p className="text-on-surface/90">{tTerms.para1}</p>
                </div>

                <div className="space-y-4">
                  <h2 className="text-xl md:text-2xl font-normal font-headline text-on-surface">{tTerms.heading2}</h2>
                  <p className="text-on-surface/90">{tTerms.para2}</p>
                  <ul className="list-disc pl-6 space-y-2 text-on-surface/90">
                    {tTerms.list1.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-4">
                  <h2 className="text-xl md:text-2xl font-normal font-headline text-on-surface">{tTerms.heading3}</h2>
                  <p className="text-on-surface/90">{tTerms.para3}</p>
                  <ul className="list-disc pl-6 space-y-2 text-on-surface/90">
                    {tTerms.list2.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-4">
                  <h2 className="text-xl md:text-2xl font-normal font-headline text-on-surface">{tTerms.heading4}</h2>
                  <p className="text-on-surface/90">{tTerms.para4}</p>
                  <ul className="list-disc pl-6 space-y-4 text-on-surface/90">
                    {tTerms.list3.map((item, idx) => (
                      <li key={idx} dangerouslySetInnerHTML={{ __html: item }} />
                    ))}
                  </ul>
                </div>

                <div className="space-y-4">
                  <h2 className="text-xl md:text-2xl font-normal font-headline text-on-surface">{tTerms.heading5}</h2>
                  <p className="text-on-surface/90">{tTerms.para5}</p>
                </div>

                <div className="space-y-4 border-t border-outline/20 pt-8">
                  <h2 className="text-xl md:text-2xl font-normal font-headline text-on-surface">{tTerms.heading6}</h2>
                  <p className="text-on-surface/90">{tTerms.para6}</p>
                  <p className="font-semibold text-accent">
                    {tTerms.emailLabel}
                    <a href="mailto:rahulbaliastrology@gmail.com" className="underline hover:text-accent/80 transition-colors">
                      rahulbaliastrology@gmail.com
                    </a>
                  </p>
                </div>
              </>
            )}

            {activeTab === 'privacy' && (
              <>
                <div className="space-y-4">
                  <h2 className="text-xl md:text-2xl font-normal font-headline text-on-surface">{tPrivacy.heading1}</h2>
                  <p className="text-on-surface/90">{tPrivacy.para1}</p>
                </div>

                <div className="space-y-4">
                  <h2 className="text-xl md:text-2xl font-normal font-headline text-on-surface">{tPrivacy.heading2}</h2>
                  <p className="text-on-surface/90">{tPrivacy.para2}</p>
                  <ul className="list-disc pl-6 space-y-2 text-on-surface/90">
                    {tPrivacy.list1.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-4">
                  <h2 className="text-xl md:text-2xl font-normal font-headline text-on-surface">{tPrivacy.heading3}</h2>
                  <p className="text-on-surface/90">{tPrivacy.para3}</p>
                  <ul className="list-disc pl-6 space-y-2 text-on-surface/90">
                    {tPrivacy.list2.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-4">
                  <h2 className="text-xl md:text-2xl font-normal font-headline text-on-surface">{tPrivacy.heading4}</h2>
                  <p className="text-on-surface/90">{tPrivacy.para4}</p>
                </div>

                <div className="space-y-4">
                  <h2 className="text-xl md:text-2xl font-normal font-headline text-on-surface">{tPrivacy.heading5}</h2>
                  <p className="text-on-surface/90">{tPrivacy.para5}</p>
                  <ul className="list-disc pl-6 space-y-4 text-on-surface/90">
                    {tPrivacy.list3.map((item, idx) => (
                      <li key={idx} dangerouslySetInnerHTML={{ __html: item }} />
                    ))}
                  </ul>
                </div>

                <div className="space-y-4 border-t border-outline/20 pt-8">
                  <h2 className="text-xl md:text-2xl font-normal font-headline text-on-surface">{tPrivacy.heading6}</h2>
                  <p className="text-on-surface/90">{tPrivacy.para6}</p>
                  <p className="font-semibold text-accent">
                    {tPrivacy.emailLabel}
                    <a href="mailto:rahulbaliastrology@gmail.com" className="underline hover:text-accent/80 transition-colors">
                      rahulbaliastrology@gmail.com
                    </a>
                  </p>
                </div>
              </>
            )}

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
