import React from 'react';
import Image from 'next/image';

const MysticalArts = () => {
  return (
    <section className="py-32 bg-stone-100 relative" id="mystical-arts">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-20">
          <h2 className="font-headline text-5xl text-primary mb-4">Mystical Arts</h2>
          <div className="h-[1px] w-24 bg-outline-variant mx-auto mb-6"></div>
          <p className="font-headline italic text-2xl text-on-surface-variant max-w-2xl mx-auto">
            The intersection of sacred vibration, physical alignment, and ancient manuscript wisdom.
          </p>
        </div>
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Mantras */}
          <div className="bg-white p-12 border border-stone-200 relative">
            <span className="font-label text-[10px] text-secondary tracking-[0.3em] uppercase block mb-8">Part I: Sonic Vibration</span>
            <h3 className="font-headline text-3xl mb-6">The Power of Mantra</h3>
            <div className="space-y-8 italic font-headline text-lg text-on-surface-variant">
              <div className="bg-surface p-6 border-l-4 border-secondary">
                &quot;Om Shram Shreem Shroum Sah Chandramase Namah&quot;
                <span className="block mt-2 font-body text-xs not-italic uppercase tracking-wider opacity-60">— The Seed Mantra for the Moon</span>
              </div>
              <p className="leading-relaxed">
                Vedic sounds are not merely symbolic; they are vibrational keys that unlock specific energetic gateways within the subconscious mind.
              </p>
            </div>
          </div>
          {/* Asana */}
          <div className="bg-white p-12 border border-stone-200 relative">
            <span className="font-label text-[10px] text-secondary tracking-[0.3em] uppercase block mb-8">Part II: Planetary Alignment</span>
            <h3 className="font-headline text-3xl mb-6">Asana for Grahas</h3>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <span className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center font-label text-xs">01</span>
                <span className="font-headline text-xl">Surya Namaskar</span>
              </div>
              <p className="text-sm text-on-surface-variant leading-relaxed">Honoring the Sun as the Atmakaraka, the soul of the universe, through 12 rigorous postures.</p>
              <div className="flex items-center gap-4">
                <span className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center font-label text-xs">02</span>
                <span className="font-headline text-xl">Vrikshasana</span>
              </div>
              <p className="text-sm text-on-surface-variant leading-relaxed">Stabilizing the influence of Saturn (Shani) through grounding and focus.</p>
              <div className="flex items-center gap-4">
                <span className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center font-label text-xs">03</span>
                <span className="font-headline text-xl">Padmasana</span>
              </div>
              <p className="text-sm text-on-surface-variant leading-relaxed">Invoking Jupiter (Guru) for wisdom and expansion of consciousness.</p>
            </div>
          </div>
          {/* Scholarly Excerpts */}
          <div className="bg-white p-12 border border-stone-200 relative">
            <span className="font-label text-[10px] text-secondary tracking-[0.3em] uppercase block mb-8">Part III: Manuscript Wisdom</span>
            <h3 className="font-headline text-3xl mb-6">Ancient Excerpts</h3>
            <div className="italic text-on-surface-variant leading-loose font-headline text-md">
              &quot;The celestial bodies are the reflection of the Karma of the individual. As a mirror reflects the face, the planets reflect the destiny inscribed by past actions...&quot;
              <br/><br/>
              <span className="not-italic font-body text-xs uppercase tracking-widest text-primary">— Brihat Jataka, Chapter 1</span>
            </div>
            <div className="mt-8 pt-8 border-t border-stone-100 relative h-40">
              <Image
                className="w-full h-full object-cover grayscale opacity-50"
                alt="Close-up of ancient hand-written Sanskrit manuscript"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDGcYVcir7J3Z-UKUzan_Su6jL5lSc6fDq9anYrvqvLwjC2NSGGCEUUuadk08C7bwGJQ_zuJAEkv8xrHDWYOqpz-LdEeBPABdOQeVaW1iuE0UzvPuoswYX39lgsLKARtZJhpL9O0qyXoC_NawTo0Rt0bFNk5MYJaqRDo4E0EAYgkbgM2ZZzP3iMlv6zu0IUukFk59QkRFXXh93kHFH1ScAbywpHZx-eAoqc6IitRkUsAA0sT2j7O_0ZVQfn1KiFZRpoi0zhHdGIPlnu"
                fill
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MysticalArts;
