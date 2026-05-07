import React from 'react';
import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChartGeneration from '@/components/ChartGeneration';

export const metadata: Metadata = {
  title: "Free Kundli Online - Accurate Vedic Horoscope & Janam Kundali",
  description: "Generate your Free Kundli online with Pandit Rahul Bali. Get accurate Janam Kundali, detailed Vedic horoscope charts (D1, D3, D9), and planetary positions using precise Lahiri Ayanamsa.",
  keywords: [
    "Free Kundli", "Online Kundli", "Janam Kundali", "Vedic Horoscope", "Birth Chart",
    "Free Astrology Report", "Kundali Matching", "Laguna Chart", "Navamsha Chart",
    "Vedic Astrology Online", "Accurate Kundli", "Pandit Rahul Bali", "Astrology Chart"
  ],
  openGraph: {
    title: "Free Kundli Online - Accurate Vedic Horoscope & Janam Kundali",
    description: "Get your detailed Janam Kundali instantly. Accurate Vedic calculations and divisional charts by Pandit Rahul Bali.",
    url: "https://astro.rahulbali.in/free-horoscope",
    type: "website",
  },
  alternates: {
    canonical: "https://astro.rahulbali.in/free-horoscope",
  },
};

export default function FreeHoroscopePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Rahul Bali Astrology Free Kundli Generator",
    "operatingSystem": "Web",
    "applicationCategory": "LifestyleApplication",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "1250"
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "INR"
    },
    "description": "Professional Vedic Kundli generator using high-precision astronomical algorithms for accurate planetary positions and divisional charts."
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How accurate is this online Kundli?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our free online Kundli generator uses precise astronomical algorithms and the traditional Chitra Paksha Lahiri Ayanamsa to ensure the highest level of accuracy for planetary positions and Lagna calculations."
        }
      },
      {
        "@type": "Question",
        "name": "What details are needed for Janam Kundali?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "To generate an accurate Janam Kundali, you need your exact Date of Birth, Time of Birth, and Place of Birth (City/Country)."
        }
      },
      {
        "@type": "Question",
        "name": "Can I download my free horoscope as a PDF?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, once your horoscope chart is generated, you can use the 'Download PDF' button to save a professional copy of your birth chart for your records."
        }
      }
    ]
  };

  return (
    <main className="min-h-screen bg-surface">
      <Navbar />

      {/* JSON-LD for extreme SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd)
            .replace(/</g, "\\u003c")
            .replace(/>/g, "\\u003e")
            .replace(/\u2028/g, "\\u2028")
            .replace(/\u2029/g, "\\u2029"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd)
            .replace(/</g, "\\u003c")
            .replace(/>/g, "\\u003e")
            .replace(/\u2028/g, "\\u2028")
            .replace(/\u2029/g, "\\u2029"),
        }}
      />

      {/* Hero Section */}
      <section className="pt-40 pb-20 md:pt-48 md:pb-32 bg-background relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-accent/5 rounded-full blur-[120px] -z-0"></div>

        <div className="max-w-4xl mx-auto px-8 text-center relative z-10">
          <span className="text-[10px] md:text-xs font-medium tracking-[0.3em] uppercase text-accent mb-6 block font-label">
            Instant Vedic Insights
          </span>
          <h1 className="text-5xl md:text-7xl font-normal mb-8 font-headline text-on-surface tracking-tight leading-tight">
            Free Online <br />
            Janam Kundali
          </h1>
          <p className="text-base md:text-lg font-body text-secondary leading-relaxed max-w-2xl mx-auto mb-10">
            Generate your precise Vedic Birth Chart instantly. Our tool provides detailed planetary positions using the authoritative Lahiri Ayanamsa for the most accurate astrological mapping.
          </p>
        </div>
      </section>

      <ChartGeneration />

      {/* SEO Content Section: Why Kundli Matters */}
      <section className="py-24 bg-surface border-t border-outline/30">
        <div className="max-w-4xl mx-auto px-8">
          <h2 className="text-3xl md:text-4xl font-normal mb-12 font-headline text-on-surface text-center">The Significance of Your Birth Chart</h2>
          <div className="prose prose-sm md:prose-base max-w-none text-secondary font-body leading-relaxed space-y-6">
            <p>
              In <strong>Vedic Astrology</strong> (Jyotish), the <strong>Janam Kundali</strong> or birth chart is a celestial map of the heavens at the exact moment of your birth. This chart serves as a cosmic blueprint, revealing the karmic patterns, strengths, challenges, and life purpose of an individual.
            </p>
            <p>
              An <strong>accurate Kundli</strong> is essential for understanding the influence of the nine planets (Navagrahas) across the twelve houses of the zodiac. Whether you are looking for guidance on career, relationships, health, or spiritual growth, your <strong>Free Janam Kundali</strong> provides the fundamental data needed for deep astrological analysis.
            </p>
            <h3 className="text-xl md:text-2xl font-normal font-headline text-on-surface mt-10">What You Get in Your Free Report</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Lagna Chart (D1):</strong> The primary chart representing your physical existence and general life path.</li>
              <li><strong>Navamsha Chart (D9):</strong> The most important divisional chart for understanding the strength of planets and marriage prospects.</li>
              <li><strong>Drekkana Chart (D3):</strong> Used to analyze siblings, energy levels, and overall achievements.</li>
              <li><strong>Planetary Positions:</strong> Detailed degrees, Nakshatras, and Padas for all major celestial bodies.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Features/Info Section */}
      <section className="py-24 bg-surface-container-low border-y border-outline/30">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-accent">
                <span className="material-symbols-outlined">auto_awesome</span>
              </div>
              <h3 className="text-xl font-normal font-headline text-on-surface">Scientific Precision</h3>
              <p className="text-sm text-secondary font-body leading-relaxed">
                Utilizing high-precision NASA-level astronomical algorithms to determine exact planetary coordinates and Lagna.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-accent">
                <span className="material-symbols-outlined">grid_view</span>
              </div>
              <h3 className="text-xl font-normal font-headline text-on-surface">Divisional Analysis</h3>
              <p className="text-sm text-secondary font-body leading-relaxed">
                Explore beyond the basics with D1, D3, and D9 charts for a multidimensional view of your destiny.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-accent">
                <span className="material-symbols-outlined">download</span>
              </div>
              <h3 className="text-xl font-normal font-headline text-on-surface">Instant PDF Export</h3>
              <p className="text-sm text-secondary font-body leading-relaxed">
                Download your generated <strong>online Kundali</strong> as a professional PDF document for lifelong reference.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section for SEO */}
      <section className="py-24 bg-surface">
        <div className="max-w-4xl mx-auto px-8">
          <h2 className="text-3xl font-normal mb-12 font-headline text-on-surface text-center">Frequently Asked Questions</h2>
          <div className="space-y-8">
            <div>
              <h4 className="text-lg font-medium font-headline text-on-surface mb-2">How accurate is this free online Kundli?</h4>
              <p className="text-sm text-secondary font-body">Our generator uses advanced astronomical libraries to ensure that planetary longitudes and house cusps are calculated with scientific accuracy based on your specific birth details.</p>
            </div>
            <div>
              <h4 className="text-lg font-medium font-headline text-on-surface mb-2">Can I use this birth chart for matching?</h4>
              <p className="text-sm text-secondary font-body">Yes, the planetary positions and Nakshatra details provided in this chart are perfect for Gun Milan and general compatibility analysis.</p>
            </div>
            <div>
              <h4 className="text-lg font-medium font-headline text-on-surface mb-2">Why are divisional charts (Varga) important?</h4>
              <p className="text-sm text-secondary font-body">Divisional charts like Navamsha (D9) reveal the internal strength of planets that might not be visible in the main D1 chart, providing a more granular understanding of your life.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="pb-32 pt-12 bg-surface">
        <div className="max-w-4xl mx-auto px-8">
          <div className="bg-surface-container-low border border-outline/50 rounded-[3rem] p-10 md:p-16 text-center">
            <h2 className="text-2xl md:text-3xl font-normal mb-6 font-headline text-on-surface">Unlock Your Cosmic Potential</h2>
            <p className="text-sm md:text-base text-secondary font-body mb-10 leading-relaxed">
              While a digital chart is a valuable tool, a <strong>Verified Personal Consultation</strong> with Pandit Rahul Bali Ji offers the depth and nuance needed for life-altering decisions.
            </p>
            <a
              href="/services"
              className="inline-block px-10 py-4 bg-primary text-white rounded-full font-medium text-[10px] md:text-xs tracking-[0.1em] uppercase font-label"
            >
              Book Professional Reading
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
