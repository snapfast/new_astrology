import React from 'react';
import Image from 'next/image';

const LatestInsights = () => {
  const articles = [
    {
      category: "Sun",
      title: "Sun in Vedic Astrology (Jyotish Shastra)",
      desc: "Explores the Sun's significance in Vedic astrology across multiple life domains including soul, health and family.",
      date: "Oct 29, 2024",
      readTime: "Tumblr",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuASQp-u9jVv5jz0BN5Od-AQN6sLup3o3DyxHkHLGLB8t1TWinXedGPH-TPliyo1-yrOexa_cBMHpU9SXymxFk0rE_l3uzBXOULd5Ux_UrSMHf5FIJCmfUxue_tZhCDElEZ2sqqdxC2d7f6dsRMo8d2JxmfJGm-4Z5G6ezGWfCBcHQe8nN2Wnzt25FQHpw4TQyE7qb9uc_dRFpgN-dSShKJSvnR3cHxYAbVfqZo35SnItxEWrpKN6ij7QbeBHWM-a893BDd4Z8SZTw",
      alt: "Sun symbolism in Vedic astrology"
    },
    {
      category: "Venus",
      title: "Venus and Rahu (Shukra + Ascending Node)",
      desc: "Describes the Venus-Rahu planetary combination and its intense effects on relationships and desire.",
      date: "Oct 13, 2024",
      readTime: "Tumblr",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAmimnd4kR4HN9KkQOY76ov5uq_52HlBu1baByS3mc4iQCBckWC3uCz3HmkqgFPG-OsiIZ_iQ2_6in39ZgKF3Dv2xHvBgpy7SJi68CVez7KyODxm4XBVjSxSimyVNeYeOGc8qOFWJi2oSmrQxAY977wELQSFoC64-8nDRhHfvWJwnVvzwVp5lzggv6_ddsjTRP8vRkKOzlCoju9bxSRPfPItTdzps2wagNdq0iMRZws7-gQMGaNkjIoZyh8Wm6KcVKz3MJIkT6Mzg",
      alt: "Venus and Rahu combination"
    }
  ];

  return (
    <section className="py-40 bg-white">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
          <div>
            <span className="text-[10px] font-medium tracking-[0.3em] uppercase text-accent mb-4 block font-label">Knowledge</span>
            <h2 className="text-5xl font-normal mb-6 font-headline text-on-surface tracking-tight">Latest Insights</h2>
            <p className="text-secondary text-base font-body leading-relaxed max-w-sm">Wisdom from the stars for your modern lifestyle.</p>
          </div>
          <a className="px-10 py-3.5 border border-outline rounded-full text-[10px] font-medium tracking-widest uppercase hover:bg-surface-container-low transition-all font-label text-on-surface" href="#">View All</a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {articles.map((article, index) => (
            <article key={index} className="group">
              <div className="relative aspect-[16/10] overflow-hidden rounded-[2rem] mb-8 border border-outline/30">
                <Image
                  alt={article.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 grayscale-[0.2] group-hover:grayscale-0"
                  src={article.img}
                  fill
                />
                <div className="absolute top-6 left-6">
                  <span className="bg-white/95 backdrop-blur-sm border border-outline/50 px-4 py-1.5 rounded-full text-[8px] font-semibold uppercase tracking-widest text-on-surface font-label">{article.category}</span>
                </div>
              </div>
              <h3 className="text-2xl font-normal mb-5 group-hover:text-accent transition-colors tracking-tight font-headline text-on-surface leading-snug">{article.title}</h3>
              <p className="text-secondary text-sm mb-6 line-clamp-2 leading-relaxed font-body">{article.desc}</p>
              <div className="flex items-center gap-3 text-[10px] font-medium text-secondary/60 tracking-[0.15em] uppercase font-label">
                <span>{article.date}</span>
                <span className="w-1 h-1 bg-outline rounded-full"></span>
                <span>{article.readTime}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestInsights;
