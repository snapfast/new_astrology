import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-surface">
      <Navbar />
      <div className="pt-32 pb-24 max-w-4xl mx-auto px-8">
        <h1 className="text-5xl font-normal mb-8 font-headline text-on-surface text-center">About Pandit Rahul Bali Ji</h1>
        <div className="prose prose-lg max-w-none font-body text-secondary leading-relaxed space-y-6">
          <p>
            Pandit Rahul Bali Ji is a renowned Jyotishi (Vedic Astrologer) based in Gurugram, Haryana.
            He specializes in Jyotish (Vedic / Sidereal Astrology), providing deep spiritual insights and practical life remedies.
          </p>
          <p>
            His approach combines ancient Vedic wisdom with a compassionate understanding of modern challenges.
            He is known for his accurate readings, patient listening, and simple yet effective remedies that do not involve complex rituals.
          </p>
          <p className="italic text-center pt-8">
            ।। ॐ नमो भगवते वासुदेवाय नम: ।।
          </p>
        </div>
      </div>
      <Footer />
    </main>
  );
}
