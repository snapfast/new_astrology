import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-surface">
      <Navbar />
      <div className="pt-32 pb-24 max-w-4xl mx-auto px-8">
        <h1 className="text-5xl font-normal mb-8 font-headline text-on-surface text-center">Contact Us</h1>
        <div className="bg-white p-12 rounded-[3rem] shadow-sm border border-surface-container-high grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-normal mb-6 font-headline">Location</h3>
            <p className="text-secondary font-body mb-8">
              Gurugram, Haryana, India
            </p>
            <h3 className="text-2xl font-normal mb-6 font-headline">Online Presence</h3>
            <div className="space-y-4 font-label text-[11px] tracking-widest uppercase font-bold">
              <a href="https://www.instagram.com/RahulBaliAstro" className="block text-primary">Instagram</a>
              <a href="https://www.youtube.com/@RahulBaliAstrology" className="block text-primary">YouTube</a>
              <a href="https://www.linkedin.com/in/rahulbaliastrology/" className="block text-primary">LinkedIn</a>
            </div>
          </div>
          <div>
            <form className="space-y-6">
              <div>
                <label className="block text-[10px] font-semibold text-secondary uppercase tracking-widest mb-2 font-label">Name</label>
                <input type="text" className="w-full px-6 py-4 bg-surface-container-low border-none rounded-xl text-sm font-body" />
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-secondary uppercase tracking-widest mb-2 font-label">Email</label>
                <input type="email" className="w-full px-6 py-4 bg-surface-container-low border-none rounded-xl text-sm font-body" />
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-secondary uppercase tracking-widest mb-2 font-label">Message</label>
                <textarea className="w-full px-6 py-4 bg-surface-container-low border-none rounded-xl text-sm font-body h-32"></textarea>
              </div>
              <button className="w-full py-4 bg-primary text-white rounded-xl font-medium text-xs tracking-widest uppercase font-label">Send Message</button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
