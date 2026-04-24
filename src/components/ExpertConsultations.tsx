import React from 'react';
import Image from 'next/image';

const ExpertConsultations = () => {
  const consultations = [
    {
      title: "Soul Compatibility",
      desc: "Deep dive into Synastry and Kundli matching to find harmonious soul connections.",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCP6ujc63yZ2oXlHfSJ0u41wP6UAO7YkEJxIQ9QUhBxxS9Wxqh3VOSt81QHPf9YyJ8ymNR5HfN2FajhMm3DkWLZSD5iQWMxyPVe2pJ-7G5ZfsWM5Ko3wpZ0cATaWxK7sqRqAqHrYQ1KeutVxRmzZSA-rrKhJgSZgPJ7E_oXO-aHIxioCzZ9pBfavbthjDMGLNSft7Piv_YrKXBwiee0wCWJYaiY6dYa7luUdZedd3smjiio7BMDcNyy08fEx32I5_tnOBfo3yMq5Q",
      alt: "high-contrast macro photography of a rose quartz gemstone representing venus and love"
    },
    {
      title: "Sacred Numerology",
      desc: "Discover the vibrational power of your birth numbers and name frequencies.",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDUhjeIbmldNNddsktUzE0jM-P54lEpChGUp4WeZJNFMNEwQaFVjkB4nYI5vYiqNsLJQ7gHJDKEB0OjGPNWV9cXoFFGH-CbGODaQqrPIFcdLnL3Ih9B8UHsUZ0f115g1isLY4xte3pYnxSDC7szzZdcUquqWZ0T8oqc7uM5TF0k_hIRM7lMniKEqm1FGOn_kAK9ZOd1n1j8Yq1BaOg1m8uiP6KSgjnC8aE1uPZHeTwZfRSYfB1Fi5-jMM9cLhoaT5S03hCzKYkVJw",
      alt: "high-contrast macro photography of a clear quartz crystal representing clarity and vibration"
    },
    {
      title: "Vedic Remedies",
      desc: "Curated mantras, gemstones, and rituals to balance planetary influences.",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA5_mhjudVJ4_VhkyR5sHeMXR0elddzF76LojtHRJmZZkmSK6R60rTCn5-1jC2N6ys74GbpPbMY5aA8FfaxFuoqlEiu9U_cGCJa1l__8jGs8xtSGB5h8MNbWat7SfgNC_xE6_08a9lS6uRwx3aLopH9B-FnzY33F6E_omGD1bABiw5YNJukphRfs7ej--h_K1-frarYqzZthel0NH0cq7qanUrjPHs1dACRpJ6AwaphBfAiQlcp62j52Vn2olYC65MbDzEwS0to-g",
      alt: "high-contrast macro photography of a deep blue sapphire gemstone representing saturn"
    },
    {
      title: "Vedic Knowledge",
      desc: "Personalized sessions to master your charts and understand karmic patterns.",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBW-AeHtbkPIwv8CiKyrytUAJ0zXE_1gxVa-hsVVbqylWP0_pojki492R8NnWnzaFpZYd7rBO4ccrgCuOPnEh6MWt8e-KcLQ4YypBIYKBuCGb_pfRvuIRUef7U8NbZ-aYGjEa_nvD6Vma0b81nPGYisBNbaqetgpWWQLBpjDDu5F3dWLMGjEqBHosMIna1g5xabWdGtnDdw75LG8-FLinAm0cABHWGOXpAwaTT6Eo-ZZEoH6M6IRb-HzM1aLSgw4piiy-vlacwc8A",
      alt: "high-contrast macro photography of an emerald gemstone representing mercury and wisdom"
    }
  ];

  return (
    <section className="py-40 bg-white">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-24">
          <span className="text-[10px] font-medium tracking-[0.3em] uppercase text-accent mb-4 block font-label">Services</span>
          <h2 className="text-5xl font-normal mb-6 font-headline text-on-surface">Expert Consultations</h2>
          <p className="text-secondary max-w-2xl mx-auto text-base font-body leading-relaxed">Bespoke services merging ancient Vedic scriptures with precision analysis.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {consultations.map((item, index) => (
            <div key={index} className="group bg-transparent transition-all duration-500">
              <div className="aspect-[4/5] overflow-hidden rounded-[2.5rem] mb-10 border border-outline/30 group-hover:border-accent/30 transition-colors duration-500 relative bg-surface-bright">
                <Image
                  alt={item.alt}
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000"
                  src={item.img}
                  fill
                />
              </div>
              <div className="px-1">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-2xl font-normal tracking-tight font-headline text-on-surface">{item.title}</h4>
                  <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-[9px] font-bold tracking-widest uppercase font-label">
                    ₹701
                  </span>
                </div>
                <p className="text-secondary text-sm leading-relaxed font-body">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExpertConsultations;
