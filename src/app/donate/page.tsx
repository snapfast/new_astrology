import React from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function DonatePage() {
  return (
    <main className="min-h-screen bg-surface">
      <Navbar />
      <div className="pt-32 pb-24 max-w-4xl mx-auto px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-normal mb-8 font-headline text-on-surface">Support Our Work</h1>
          <p className="text-lg font-body text-secondary leading-relaxed max-w-2xl mx-auto">
            If our guidance has helped you and you wish to support the research and spiritual services provided by Pandit Rahul Bali Ji, your donations are gratefully accepted.
          </p>
        </div>

        <div className="bg-white p-12 rounded-[3rem] border border-outline/50 shadow-sm text-center">
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
            />
          </div>

          <button className="bg-primary text-white px-12 py-4 rounded-full font-medium text-sm tracking-wider">
            Donate Now
          </button>
        </div>
      </div>
      <Footer />
    </main>
  );
}
