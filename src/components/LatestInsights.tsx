import React from 'react';
import Image from 'next/image';

const LatestInsights = () => {
  const articles = [
    {
      category: "Astronomy",
      title: "The Mercury Retrograde: Navigating the Chaos",
      desc: "Learn how to use this period of technological and communication friction for deep internal reflection.",
      date: "Mar 12, 2024",
      readTime: "8 min read",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuASQp-u9jVv5jz0BN5Od-AQN6sLup3o3DyxHkHLGLB8t1TWinXedGPH-TPliyo1-yrOexa_cBMHpU9SXymxFk0rE_l3uzBXOULd5Ux_UrSMHf5FIJCmfUxue_tZhCDElEZ2sqqdxC2d7f6dsRMo8d2JxmfJGm-4Z5G6ezGWfCBcHQe8nN2Wnzt25FQHpw4TQyE7qb9uc_dRFpgN-dSShKJSvnR3cHxYAbVfqZo35SnItxEWrpKN6ij7QbeBHWM-a893BDd4Z8SZTw",
      alt: "macro photography of a citrine gemstone associated with mental clarity and mercury"
    },
    {
      category: "Ancient Wisdom",
      title: "Decoding Your Rising Sign: The Soul's Mask",
      desc: "Your Ascendant governs your physical appearance and first impressions. Discover its hidden power.",
      date: "Mar 08, 2024",
      readTime: "12 min read",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAmimnd4kR4HN9KkQOY76ov5uq_52HlBu1baByS3mc4iQCBckWC3uCz3HmkqgFPG-OsiIZ_iQ2_6in39ZgKF3Dv2xHvBgpy7SJi68CVez7KyODxm4XBVjSxSimyVNeYeOGc8qOFWJi2oSmrQxAY977wELQSFoC64-8nDRhHfvWJwnVvzwVp5lzggv6_ddsjTRP8vRkKOzlCoju9bxSRPfPItTdzps2wagNdq0iMRZws7-gQMGaNkjIoZyh8Wm6KcVKz3MJIkT6Mzg",
      alt: "macro photography of an amethyst gemstone associated with spiritual insight and the rising sun"
    },
    {
      category: "Healing",
      title: "Gemstones for Saturn: Balancing Energy",
      desc: "How Neelam and Blue Sapphire can help stabilize your career path during Shani transitions.",
      date: "Mar 01, 2024",
      readTime: "5 min read",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA1yZjYaM37iXRFmQBJ9_4P_8XDJKK3hkQGO5tIeC6wHxLWdQfQPV80g4ozsKi-ymtI7KUyuuCXebOAz6ptd6XoA8g4aqPkgXh0mqH1bHjnSXZoYq5cPC8Bec0yNWq4Gm68Y8GmJyzFxnYgGIgcVLMcImxyZInQv3gbdSMS11mIhXmwlnP7j6qud1Bf2ew5SxSogxr3xl834btP0h2AZk5nkfP1EHQFX-CJmVEWy33MjoXuZJ8pHGuRudyiDpRJ-khehfasxsDOmA",
      alt: "macro photography of a black tourmaline gemstone used as a remedy for saturn influences"
    }
  ];

  return (
    <section className="py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex justify-between items-end mb-16">
          <div>
            <h2 className="text-4xl font-normal mb-4 font-headline">Latest Insights</h2>
            <p className="text-secondary text-sm font-body">Wisdom from the stars for your modern lifestyle.</p>
          </div>
          <a className="px-6 py-2 border border-outline/20 rounded-full text-[10px] font-semibold tracking-widest uppercase hover:bg-surface-container-low transition-all font-label" href="#">View All</a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {articles.map((article, index) => (
            <article key={index} className="group">
              <div className="relative aspect-[16/10] overflow-hidden rounded-3xl mb-6">
                <Image
                  alt={article.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  src={article.img}
                  fill
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest text-primary font-label">{article.category}</span>
                </div>
              </div>
              <h3 className="text-2xl font-normal mb-3 group-hover:text-primary transition-colors tracking-tight font-headline">{article.title}</h3>
              <p className="text-secondary text-xs mb-4 line-clamp-2 leading-relaxed font-body">{article.desc}</p>
              <div className="flex items-center gap-2 text-[10px] font-semibold text-outline tracking-widest uppercase font-label">
                <span>{article.date}</span>
                <span>•</span>
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
