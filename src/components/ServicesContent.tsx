'use client';

import React from 'react';
import ExpertConsultations from '@/components/ExpertConsultations';

const PROCESS_STEPS = [
  {
    title: "Secure Booking",
    description: "Select your preferred service and schedule a session through our secure portal.",
    icon: "event_available"
  },
  {
    title: "Birth Data Analysis",
    description: "Provide your birth details for precise astronomical calculations using Lahiri Ayanamsa.",
    icon: "analytics"
  },
  {
    title: "Expert Synthesis",
    description: "Pandit Ji performs a deep analysis of your D1, D9, and relevant divisional charts.",
    icon: "psychology"
  },
  {
    title: "Live Consultation",
    description: "Join a private session to receive insights, clarity, and personalized remedies.",
    icon: "forum"
  }
];

const FAQS = [
  {
    question: "What information is required for a consultation?",
    answer: "You will need to provide your exact date, time, and place of birth. If you don't have the exact time, we can perform a partial analysis based on the moon sign, but for precise predictions, the exact time is highly recommended."
  },
  {
    question: "How long does a typical session last?",
    answer: "Standard consultations usually last between 30 to 45 minutes, allowing enough time for a detailed walkthrough of your chart and answering your specific questions."
  },
  {
    question: "Can I record the consultation session?",
    answer: "Yes, you are encouraged to record the audio or take notes during the session for your future reference."
  },
  {
    question: "Are the remedies provided complex or expensive?",
    answer: "Pandit Rahul Bali Ji focuses on simple, effective, and sattvic remedies such as specific mantras, charity, and lifestyle adjustments that align with your karmic path without requiring elaborate rituals."
  }
];

export default function ServicesContent() {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-40 pb-24 bg-background relative overflow-hidden border-b border-outline/20">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-accent/5 rounded-full blur-[140px] -z-0"></div>
        <div className="max-w-4xl mx-auto px-8 relative z-10 text-center">
          <span className="text-[10px] font-medium tracking-[0.3em] uppercase text-accent mb-6 block font-label">Spiritual Guidance</span>
          <h1 className="text-5xl md:text-7xl font-normal mb-8 font-headline text-on-surface tracking-tight">Vedic Astrology Services</h1>
          <p className="text-xl font-body text-secondary leading-relaxed mb-8 max-w-2xl mx-auto">
            Explore professional <strong>astrology consultations</strong> and spiritual services grounded in the ancient principles of <strong>Jyotish Shastra</strong>.
          </p>
          <p className="text-sm text-secondary/60 font-body max-w-xl mx-auto">
            From detailed birth chart readings to Vastu audits, each service is designed to provide clarity on your life&apos;s unique karmic path.
          </p>
        </div>
      </section>

      {/* Consultation Process */}
      <section className="py-32 bg-white border-b border-outline/20">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-normal font-headline text-on-surface">The Consultation Journey</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {PROCESS_STEPS.map((step, idx) => (
              <div key={idx} className="relative">
                <div className="w-14 h-14 bg-surface-container-low rounded-2xl flex items-center justify-center mb-8 text-accent border border-outline/30">
                  <span className="material-symbols-outlined text-3xl">{step.icon}</span>
                </div>
                <h3 className="text-xl font-normal font-headline text-on-surface mb-4">
                  <span className="text-accent/30 mr-2">0{idx + 1}.</span>
                  {step.title}
                </h3>
                <p className="text-sm text-secondary font-body leading-relaxed">{step.description}</p>
                {idx < 3 && (
                   <div className="hidden lg:block absolute top-7 left-[70px] w-[calc(100%-40px)] h-px bg-outline/20 -z-10"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <ExpertConsultations showTitle={false} />

      {/* Why Vedic Astrology Section */}
      <section className="py-32 bg-surface-container-low border-y border-outline/20">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <h2 className="text-4xl font-normal mb-12 font-headline text-on-surface">Illuminating the Path</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
            <div>
              <h4 className="text-lg font-headline text-on-surface mb-4 flex items-center gap-3">
                <span className="material-symbols-outlined text-accent">verified</span>
                Ancient Authenticity
              </h4>
              <p className="text-sm text-secondary font-body leading-relaxed">
                Our services are strictly rooted in the Parashara and Jaimini systems, ensuring that the wisdom shared is consistent with thousands of years of Vedic tradition.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-headline text-on-surface mb-4 flex items-center gap-3">
                <span className="material-symbols-outlined text-accent">biotech</span>
                Scientific Precision
              </h4>
              <p className="text-sm text-secondary font-body leading-relaxed">
                By utilizing high-precision astronomical data and the Lahiri Ayanamsa, we eliminate calculation errors to provide the most accurate planetary mappings.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 bg-white">
        <div className="max-w-4xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-normal font-headline text-on-surface">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-10">
            {FAQS.map((faq, idx) => (
              <div key={idx} className="border-b border-outline/30 pb-8">
                <h4 className="text-lg font-headline text-on-surface mb-3">{faq.question}</h4>
                <p className="text-sm text-secondary font-body leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="pb-32 bg-white">
        <div className="max-w-4xl mx-auto px-8">
           <div className="bg-on-surface p-12 md:p-16 rounded-[3rem] text-center text-surface shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-[80px] -mr-32 -mt-32"></div>
              <h2 className="text-3xl md:text-5xl font-normal mb-8 font-headline tracking-tight relative z-10">Ready to find clarity?</h2>
              <p className="text-lg font-body text-surface/70 mb-12 max-w-xl mx-auto relative z-10">
                Book your personalized session today and begin your journey towards cosmic alignment.
              </p>
              <button
                className="bg-accent text-on-surface px-12 py-5 rounded-full font-medium text-xs tracking-widest uppercase relative z-10 hover:bg-white transition-colors"
                onClick={() => {
                   const event = new CustomEvent('openBookingModal');
                   window.dispatchEvent(event);
                }}
              >
                Schedule Now
              </button>
           </div>
        </div>
      </section>
    </>
  );
}
