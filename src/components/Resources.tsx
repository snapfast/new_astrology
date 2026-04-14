import React from 'react';
import Image from 'next/image';

const Resources = () => {
  const books = [
    {
      title: "Light on Life",
      author: "Hart Defouw & Robert Svoboda",
      desc: "The definitive introductory guide to the complex system of Indian Astrology.",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA434uwkZ7KUNZY6YZC36h5Y6-LbMz6dsDd_lfAXuMDCQ4Bzf8PZTpLbbeav3c2yLxzDgOQJmoDG4HNqjLQRhp2Au_bdXfzNC8D8tGTnFqGLLavlaj69PbiMK2fFOG9WgAXOJEjRhhhoLDbD-y2czor43TUwT0rmlwIeIiyStDwk2-bs1WxsZtiLb1zLqyd4cdEh_TJJIx_aXF46sI09rtvebonLgDriMHTiE3uHh94R3uAZwbetqE0U0JftGL6N6G_cJ4P20TQHjNJ"
    },
    {
      title: "Autobiography of a Yogi",
      author: "Paramahansa Yogananda",
      desc: "Essential reading for understanding the spiritual framework of the cosmic laws.",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA3SL7Cw0U3TUfGQ5_MZhWxc85rtRZBDFmjNBYO4z73kEEeC-HeTrE9R8yv721CV4WWcwJuGUOaWDu1bGgMuxxlGC4ulgSOzBgyxj4sRDjyK3bzhDbIRZAq-ulMM9L8fbtWO7gFtjiZt5k_8GpPYcjmjQ-Rp2nHDnoTNC27FnnPOHaUqSwcd6Kav-aJh0ZoE7j-bq32nkmW3HcugAtzeCHDBpp-wCLk4UnTrg_LCGREi265pSatRn5uYcgzQBxbR4FADD29gZ9xKjRt"
    },
    {
      title: "Fundamentals of Astrology",
      author: "M. Ramakrishna Bhat",
      desc: "A technical masterpiece covering the foundational principles of prediction.",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAjbzIfu69qHq8REaFlStl9EAuD8VcUvf3HLRu83bs338M61FzHbpv9B4iGRolnrRU6udr_tXw9IarIH9g9XrfiXjeJIquCtsk54FcXzIShBd_DwWUqMopspkFRTfywrLX5om7ShX-v1u4pRWCMugjBDE08JC8E6p93q0XjfXhQo_7gyOFyPCHrRZNBz_klSjrJVjYdrYfJgoMGdxEmx6v6JMsGt4zsQfcvEfaExc1IVhpOl1Ctxgt8BmB08iZuY4TgSRP4fV65Ldkf"
    },
    {
      title: "Vedic Remedies in Astrology",
      author: "Sanjay Rath",
      desc: "The specialized study of remedial measures for planetary afflictions.",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCJULGzx8oD5iEg469aAH4luYqFZV5oa6gIQPPV512_AEbxP5x6EuYAT6Ogx9iFWyz74tIqeybbuBOexGqJGpcfWP0arPhCL4sBpGPiJ7SbyigoHNZdU7XOTNOKZp8rwhba2vSEDykiYOnSb8Ex_DJ1SeMpZMpLn3flypkSWuyLnVh78YLo9OO8GO0a5gV8K4MfA52_OCmxpu5EjFzKjBOeCwk0K84kFakNsdgFcDsM95BjPBTSmJTbUjE2C1UovsCMN3Pta88jSa9n"
    }
  ];

  return (
    <section className="py-24 bg-white" id="resources">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl">
            <h2 className="font-headline text-5xl text-tertiary mb-6">Student &amp; Seeker Resources</h2>
            <p className="font-body text-on-surface-variant leading-relaxed">Recommended literature for those who wish to walk the path of self-realization through astrological scholarship.</p>
          </div>
          <button className="flex items-center gap-3 font-label text-sm uppercase tracking-widest text-primary border-b border-primary pb-2 hover:gap-5 transition-all">
            Full Bibliography <span className="material-symbols-outlined">arrow_right_alt</span>
          </button>
        </div>
        <div className="grid md:grid-cols-4 gap-8">
          {books.map((book, i) => (
            <div key={i} className="group">
              <div className="aspect-[3/4] bg-surface-container mb-6 overflow-hidden relative">
                <Image className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={book.title} src={book.img} fill/>
              </div>
              <h4 className="font-headline text-xl mb-1">{book.title}</h4>
              <p className="text-xs text-on-surface-variant font-label uppercase tracking-wider mb-3">{book.author}</p>
              <p className="text-sm text-on-surface-variant leading-snug">{book.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Resources;
