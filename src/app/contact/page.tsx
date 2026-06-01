import React from 'react';
import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { SOCIAL_PROFILES } from '@/lib/social-data';

export const metadata: Metadata = {
  title: "Contact Pandit Rahul Bali Ji | Book Astrology Appointment",
  description: "Get in touch for personalized Vedic astrology consultations, spiritual guidance, and remedies. Reach out via our social media platforms for appointments and queries.",
  alternates: {
    canonical: "https://astro.rahulbali.in/contact",
  },
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-surface">
      <Navbar />
      <div className="pt-32 pb-24 max-w-4xl mx-auto px-8 flex flex-col items-center text-center">
        <h1 className="text-5xl font-normal mb-16 font-headline text-on-surface">Contact Us</h1>

        <div className="space-y-16">
          <div>
            <h2 className="text-[10px] font-medium tracking-[0.3em] uppercase text-accent mb-6 font-label">Location</h2>
            <p className="text-2xl font-body text-on-surface">Gurugram, Haryana, India</p>
          </div>

          <div>
            <h2 className="text-[10px] font-medium tracking-[0.3em] uppercase text-accent mb-6 font-label">Online Presence</h2>
            <div className="flex flex-wrap justify-center gap-6">
              <a
                href={SOCIAL_PROFILES.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-16 h-16 rounded-full border border-outline/30 flex items-center justify-center text-secondary hover:bg-on-surface hover:text-surface transition-all duration-300 text-2xl"
                aria-label="Instagram"
              >
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a
                href={SOCIAL_PROFILES.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-16 h-16 rounded-full border border-outline/30 flex items-center justify-center text-secondary hover:bg-on-surface hover:text-surface transition-all duration-300 text-2xl"
                aria-label="YouTube"
              >
                <i className="fa-brands fa-youtube"></i>
              </a>
              <a
                href={SOCIAL_PROFILES.threads}
                target="_blank"
                rel="noopener noreferrer"
                className="w-16 h-16 rounded-full border border-outline/30 flex items-center justify-center text-secondary hover:bg-on-surface hover:text-surface transition-all duration-300 text-2xl"
                aria-label="Threads"
              >
                <i className="fa-brands fa-threads"></i>
              </a>
              <a
                href={SOCIAL_PROFILES.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-16 h-16 rounded-full border border-outline/30 flex items-center justify-center text-secondary hover:bg-on-surface hover:text-surface transition-all duration-300 text-2xl"
                aria-label="Facebook"
              >
                <i className="fa-brands fa-facebook-f"></i>
              </a>
              <a
                href={SOCIAL_PROFILES.linkedin}
                rel="noopener noreferrer"
                target="_blank"
                className="w-16 h-16 rounded-full border border-outline/30 flex items-center justify-center text-secondary hover:bg-on-surface hover:text-surface transition-all duration-300 text-2xl"
                aria-label="LinkedIn"
              >
                <i className="fa-brands fa-linkedin-in"></i>
              </a>
              <a
                href={SOCIAL_PROFILES.tumblr}
                target="_blank"
                rel="noopener noreferrer"
                className="w-16 h-16 rounded-full border border-outline/30 flex items-center justify-center text-secondary hover:bg-on-surface hover:text-surface transition-all duration-300 text-2xl"
                aria-label="Tumblr"
              >
                <i className="fa-brands fa-tumblr"></i>
              </a>
              <a
                href={SOCIAL_PROFILES.reddit}
                target="_blank"
                rel="noopener noreferrer"
                className="w-16 h-16 rounded-full border border-outline/30 flex items-center justify-center text-secondary hover:bg-on-surface hover:text-surface transition-all duration-300 text-2xl"
                aria-label="Reddit"
              >
                <i className="fa-brands fa-reddit-alien"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
