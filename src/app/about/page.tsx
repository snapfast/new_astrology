import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: "About Pandit Rahul Bali Ji | Vedic Astrologer in Gurugram",
  description: "Learn about Pandit Rahul Bali Ji, a renowned expert in Vedic Astrology based in Gurugram. With years of experience in Jyotish Shastra, he provides spiritual insights and practical life remedies.",
  alternates: {
    canonical: "https://astro.rahulbali.in/about",
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-surface">
      <Navbar />
      <div className="pt-32 pb-24 max-w-4xl mx-auto px-8">
        <h1 className="text-5xl font-normal mb-8 font-headline text-on-surface text-center">About Pandit Rahul Bali Ji</h1>
        <div className="prose prose-lg max-w-none font-body text-secondary leading-relaxed space-y-6">
          <p>
            Pandit Rahul Bali Ji is a renowned expert in <strong>Vedic Astrology</strong> based in Gurugram, Haryana.
            As a dedicated practitioner of Jyotish Shastra, he specializes in providing deep spiritual insights and practical life remedies through precise <strong>birth chart analysis</strong>.
          </p>
          <p>
            With years of experience in <strong>Indian Astrology</strong>, his approach combines ancient Vedic wisdom with a compassionate understanding of modern challenges.
            He is recognized as one of the <strong>best astrologers in Gurugram</strong>, known for his accurate readings, patient listening, and simple yet effective remedies that do not involve complex rituals.
          </p>

          <h2 className="text-3xl font-normal mt-12 mb-6 font-headline text-on-surface">Expertise in Vedic Jyotish</h2>
          <p>
            His expertise spans various branches of astrology, including <strong>Parashara system</strong>, <strong>Jaimini Astrology</strong>, and <strong>Vastu Shastra</strong>. Whether you are seeking guidance on career growth, relationship harmony, health concerns, or spiritual evolution, Pandit Rahul Bali Ji offers personalized sessions tailored to your unique cosmic blueprint.
          </p>

          <h2 className="text-3xl font-normal mt-12 mb-6 font-headline text-on-surface">Consultation Philosophy</h2>
          <p>
            Authenticity and scientific precision are the cornerstones of his practice. By utilizing high-precision astronomical calculations (Lahiri Ayanamsa), he ensures that every <strong>horoscope reading</strong> is grounded in celestial truth. His goal is to empower individuals with the knowledge of their <strong>karmic patterns</strong>, helping them navigate life&apos;s transitions with clarity and confidence.
          </p>
          <p className="text-2xl md:text-3xl italic text-center pt-8 text-accent">
            ।। ॐ नमो भगवते वासुदेवाय नम: ।।
          </p>
        </div>

        {/* Support Section */}
        <div id="support" className="mt-24 pt-24 border-t border-outline/30">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-normal mb-8 font-headline text-on-surface">Support Our Work</h2>
            <p className="text-lg font-body text-secondary leading-relaxed max-w-2xl mx-auto">
              If our guidance has helped you and you wish to support the research and spiritual services provided by Pandit Rahul Bali Ji, your donations are gratefully accepted.
            </p>
          </div>

          <div className="bg-white p-12 rounded-[3rem] border border-outline/50 shadow-sm text-center max-w-2xl mx-auto">
            <div className="mb-10">
              <span className="text-[10px] font-medium tracking-[0.3em] uppercase text-accent mb-4 block font-label">।। जय हिंद ।।</span>
              <p className="text-secondary font-body">Scan or use details for contribution.</p>
            </div>

            <div className="relative w-full max-w-[320px] aspect-[495/640] mx-auto mb-10 overflow-hidden rounded-2xl shadow-sm border border-outline/10 bg-white">
              <Image
                src="/donate-qr.png"
                alt="UPI QR Code for Donation"
                fill
                className="object-contain"
                priority
                sizes="(max-width: 768px) 320px, 320px"
              />
            </div>

            <p className="text-xs text-secondary/50 font-label uppercase tracking-widest">
              rahul.bali@ybl
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
