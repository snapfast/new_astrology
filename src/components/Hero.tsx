import React from 'react';
import Image from 'next/image';

const Hero = () => {
  return (
    <section className="relative min-h-[850px] flex items-center justify-center overflow-hidden bg-[#020617]">
      <div className="absolute inset-0 z-0 spiritual-star-bg flex items-center justify-center">
        <div className="absolute w-[600px] h-[600px] bg-white/20 blur-[120px] rounded-full"></div>
        <div className="absolute w-[200px] h-[200px] bg-white/40 blur-[40px] rounded-full"></div>
        <Image
          alt="radiant spiritual star symbolizing divine energy glowing with golden-white light and subtle cosmic patterns"
          className="absolute inset-0 w-full h-full object-cover mix-blend-screen opacity-40"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhkK9ZtJbUpp2SyOB88kHinLt_VS-N443u4TEqFovuNKEZZoJwpEpVjg7yZRa3Ptt54_C3y2oHPHm_vuHD7KwN4rWTf5na5LwT54BDTkAy9zohzuDgQfTVzxlloCBqeZptxCDfmYLC6wWR0hNyAtW3y-qtzowNBKHlvO9G7rDeujCA9VdKceeUAY5yEk3VOP1-e98j0CKjw226-yJu4yzbtD4Ro8p7nGIdaKzy5lBsuux9m6CjBO6SBH0jksx5W9Ts_0grONbbnQ"
          fill
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent"></div>
      </div>
      <div className="relative z-10 max-w-5xl mx-auto px-8 text-center">
        <span className="inline-block px-4 py-1.5 text-[10px] font-semibold tracking-[0.3em] uppercase bg-white/10 backdrop-blur-md rounded-full text-white border border-white/20 mb-4 font-label">
          ।। ॐ नमो भगवते वासुदेवाय नम: ।।
        </span>
        <h1 className="text-5xl md:text-6xl font-normal tracking-tight text-white leading-[1.2] mb-14 font-headline">
          Align with <br/>
          <span className="text-white/80 italic">fortune and truth</span>
        </h1>
        <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto mb-12 leading-relaxed font-light font-body">
          Jyotish guidance of Pandit Rahul Bali Ji, providing personalized horoscopes, astrology readings, and spiritual consultations.
        </p>
        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          <button className="px-10 py-4 bg-primary text-white rounded-full font-medium text-xs tracking-widest uppercase shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all font-label">
            Book Appointment
          </button>
          <button className="px-10 py-4 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-full font-medium text-xs tracking-widest uppercase hover:bg-white/20 transition-all font-label">
            View Services
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
