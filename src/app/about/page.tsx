import React from 'react';
import { Metadata } from 'next';
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
          <p className="text-5xl md:text-6xl italic text-center pt-8">
            ।। ॐ नमो भगवते वासुदेवाय नम: ।।
          </p>
        </div>
      </div>
      <Footer />
    </main>
  );
}
