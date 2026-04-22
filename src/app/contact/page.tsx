import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-surface">
      <Navbar />
      <div className="pt-32 pb-24 max-w-6xl mx-auto px-8">
        <h1 className="text-5xl font-normal mb-16 font-headline text-on-surface text-center">Contact Us</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <div className="mb-12">
              <h2 className="text-[10px] font-medium tracking-[0.3em] uppercase text-accent mb-6 font-label">Location</h2>
              <p className="text-xl font-body text-on-surface">Gurugram, Haryana, India</p>
            </div>

            <div>
              <h2 className="text-[10px] font-medium tracking-[0.3em] uppercase text-accent mb-6 font-label">Online Presence</h2>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://www.instagram.com/RahulBaliAstro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-full border border-outline/30 text-secondary hover:border-accent hover:text-accent transition-all text-sm font-label uppercase tracking-widest"
                >
                  Instagram
                </a>
                <a
                  href="https://www.youtube.com/@RahulBaliAstrology"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-full border border-outline/30 text-secondary hover:border-accent hover:text-accent transition-all text-sm font-label uppercase tracking-widest"
                >
                  YouTube
                </a>
                <a
                  href="https://www.linkedin.com/in/rahulbaliastrology/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-full border border-outline/30 text-secondary hover:border-accent hover:text-accent transition-all text-sm font-label uppercase tracking-widest"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>

          <div className="bg-white p-10 md:p-12 rounded-[3rem] border border-outline/50 shadow-sm">
            <form className="space-y-8">
              <div className="space-y-2">
                <label className="text-[10px] font-medium tracking-[0.3em] uppercase text-secondary/60 font-label ml-4">Name</label>
                <input type="text" className="w-full bg-surface border-none rounded-2xl px-6 py-4 focus:ring-1 focus:ring-accent outline-none font-body" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-medium tracking-[0.3em] uppercase text-secondary/60 font-label ml-4">Email</label>
                <input type="email" className="w-full bg-surface border-none rounded-2xl px-6 py-4 focus:ring-1 focus:ring-accent outline-none font-body" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-medium tracking-[0.3em] uppercase text-secondary/60 font-label ml-4">Message</label>
                <textarea rows={4} className="w-full bg-surface border-none rounded-2xl px-6 py-4 focus:ring-1 focus:ring-accent outline-none font-body resize-none"></textarea>
              </div>
              <button className="w-full bg-on-surface text-surface py-5 rounded-full font-medium text-sm tracking-widest uppercase transition-all hover:opacity-90">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
