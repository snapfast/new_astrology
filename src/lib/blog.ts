export interface BlogSection {
  heading?: string;
  paragraphs: string[];
  bulletPoints?: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string; // ISO format: YYYY-MM-DD
  updatedAt?: string;
  author: {
    name: string;
    role: string;
  };
  readTime: string;
  tags: string[];
  sections: BlogSection[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'understanding-vedic-astrology-guide',
    title: "Understanding Vedic Astrology: A Beginner's Comprehensive Guide",
    excerpt: "Discover the ancient wisdom of Jyotish (Vedic Astrology), how it differs from Western astrology, and how birth charts reveal your life's cosmic map.",
    publishedAt: '2025-01-15',
    author: {
      name: 'Pandit Rahul Bali',
      role: 'Vedic Astrologer',
    },
    readTime: '6 min read',
    tags: ['Vedic Astrology', 'Beginners', 'Kundli', 'Jyotish'],
    sections: [
      {
        heading: 'What is Vedic Astrology (Jyotish)?',
        paragraphs: [
          'Vedic Astrology, known as Jyotish in Sanskrit ("the light of heavenly bodies"), is an ancient Indian science documented in sacred texts over thousands of years. It provides profound insights into human consciousness, life purpose, career paths, relationships, and health.',
          'Unlike Western astrology which primarily uses the tropical zodiac based on seasons, Vedic astrology uses the sidereal zodiac (Nirayana system), which aligns directly with the actual observable positions of fixed stars in the night sky.',
        ],
      },
      {
        heading: 'Key Differences Between Vedic and Western Astrology',
        paragraphs: [
          'Understanding these core distinctions helps clarify why predictions and planetary placements often differ between the two systems:',
        ],
        bulletPoints: [
          'Zodiac System: Sidereal (fixed stars) vs. Tropical (seasonal solar movement).',
          'Ayanamsha: Vedic astrology accounts for the precession of the equinoxes (~24 degree difference).',
          'Moon Sign Focus: Vedic astrology gives prime importance to the Moon Sign (Rashi) and Nakshatra (Lunar Mansion), rather than just the Sun Sign.',
          'Dasha Systems: Vedic astrology utilizes planetary period systems like Vimshottari Dasha to pinpoint precise timing of life events.',
        ],
      },
      {
        heading: 'The Core Elements of a Vedic Birth Chart (Kundli)',
        paragraphs: [
          'A Janam Kundli (birth chart) is a cosmic snapshot of the universe calculated for the exact moment, date, and geographic location of your birth.',
          'The chart consists of 12 Houses (Bhavas), 12 Signs (Rashis), and 9 Primary Planets (Navagrahas) including Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn, Rahu (North Node), and Ketu (South Node). Each house governs specific facets of human experience, from health and wealth to career and spirituality.',
        ],
      },
      {
        heading: 'How to Get Started',
        paragraphs: [
          'To unlock the secrets of your birth chart, ensure you have accurate birth details: your exact date of birth, precise birth time, and birth city. Having precise time is crucial because house boundaries shift approximately every 2 hours.',
          'You can generate your accurate free birth chart directly on our platform using high-precision astronomical engine calculations.',
        ],
      },
    ],
  },
  {
    slug: 'planetary-transits-gochar-guide',
    title: 'Understanding Planetary Transits (Gochar) and Their Impact',
    excerpt: 'Learn how the ongoing motion of planets through zodiac signs interacts with your birth chart to trigger major events and shift life dynamics.',
    publishedAt: '2025-02-01',
    author: {
      name: 'Pandit Rahul Bali',
      role: 'Vedic Astrologer',
    },
    readTime: '5 min read',
    tags: ['Transits', 'Gochar', 'Saturn', 'Jupiter', 'Predictive Astrology'],
    sections: [
      {
        heading: 'What Are Planetary Transits (Gochar)?',
        paragraphs: [
          'In Vedic astrology, "Gochar" refers to the continuous movement of celestial bodies through the zodiac signs relative to your natal birth chart.',
          'While your birth chart represents your fixed potential and lifelong blueprint, transits represent the changing weather patterns of time. As planets move, they activate different houses and planets in your birth chart, catalyzing events and psychological shifts.',
        ],
      },
      {
        heading: 'Fast-Moving vs. Slow-Moving Planets',
        paragraphs: [
          'Not all planetary transits carry equal weight. The speed of a planet determines how long its influence persists in a particular zodiac sign:',
        ],
        bulletPoints: [
          'Slow-Moving Planets (Jupiter, Saturn, Rahu, Ketu): These planets produce major, transformation-defining life events. Saturn spends ~2.5 years in a sign, Jupiter ~1 year, and Rahu/Ketu ~1.5 years.',
          'Fast-Moving Planets (Moon, Sun, Mercury, Venus, Mars): These planets act as daily or monthly triggers. The Moon changes signs every ~2.5 days, bringing short-term shifts in mood and focus.',
        ],
      },
      {
        heading: 'How Transits Interact with Vimshottari Dasha',
        paragraphs: [
          'A fundamental principle of Vedic predictive astrology is that a transit cannot deliver an event unless the ruling Dasha period permits it.',
          'Think of the Dasha as the underlying season and the Transit as the daily trigger. When a favorable transit aligns with a supportive Dasha period, tangible success and breakthroughs occur naturally.',
        ],
      },
      {
        heading: 'Tracking Transits in Real Time',
        paragraphs: [
          'Using accurate ephemeris tools allows you to observe upcoming planetary shifts—such as retrograde periods, sign changes, and combustions—so you can plan important decisions with clarity and cosmic foresight.',
        ],
      },
    ],
  },
  {
    slug: 'kp-astrology-explained-precision-timing',
    title: 'KP Astrology Explained: Precision and Timing in Horoscope Analysis',
    excerpt: 'Explore Krishnamurti Padhdhati (KP System), the revolutionary branch of astrology that uses Sub-Lords to deliver exact, pinpoint predictions.',
    publishedAt: '2025-02-18',
    author: {
      name: 'Pandit Rahul Bali',
      role: 'Vedic Astrologer',
    },
    readTime: '7 min read',
    tags: ['KP Astrology', 'Sub Lord', 'Horary', 'Prashna', 'Timing Events'],
    sections: [
      {
        heading: 'Introduction to Krishnamurti Padhdhati (KP System)',
        paragraphs: [
          'Developed by the legendary astrologer Prof. K.S. Krishnamurti, KP Astrology is a refined, scientific adaptation of classical Vedic astrology.',
          'KP Astrology resolves ambiguities in traditional Vedic methods by introducing the concept of "Sub-Lords", dividing each Nakshatra into smaller fractional segments to yield uncompromised predictive accuracy.',
        ],
      },
      {
        heading: 'The Power of the Sub-Lord',
        paragraphs: [
          'In classical astrology, planets are evaluated primarily by sign and Nakshatra (Star Lord). KP system takes this further with a three-tier hierarchy:',
        ],
        bulletPoints: [
          'Planet: Represents the entity involved.',
          'Star Lord (Nakshatra): Determines the result or outcome of the event.',
          'Sub-Lord: Decides whether the outcome will be favorable or unfavorable.',
        ],
      },
      {
        heading: 'Placidus House Cusp System in KP',
        paragraphs: [
          'Unlike traditional equal house or sign-based house systems, KP uses unequal Placidus house cusps based on exact latitude and longitude. This ensures that house boundaries reflect precise astronomical horizons at the birth location.',
        ],
      },
      {
        heading: 'KP Prashna (Horary) Astrology',
        paragraphs: [
          'One of KP Astrology’s greatest strengths is Prashna (Horary) astrology. When a birth chart is unavailable or uncertain, a question is asked along with a number from 1 to 249. A chart is cast for that precise moment, giving rapid, pinpoint answers for urgent queries regarding career, marriage, health, or finance.',
        ],
      },
    ],
  },
  {
    slug: 'demystifying-sade-sati-saturn-transit',
    title: "Demystifying Sade Sati: Navigating Saturn's 7.5-Year Transit with Wisdom",
    excerpt: "Discover the real truth behind Saturn's Sade Sati phase, common myths, practical remedies, and how to harness this period for self-discipline and growth.",
    publishedAt: '2025-03-01',
    author: {
      name: 'Pandit Rahul Bali',
      role: 'Vedic Astrologer',
    },
    readTime: '6 min read',
    tags: ['Saturn', 'Sade Sati', 'Remedies', 'Gochar', 'Rashi'],
    sections: [
      {
        heading: 'What is Sade Sati?',
        paragraphs: [
          'Sade Sati is a 7.5-year period during which Saturn (Shani) transits through the 12th house before your natal Moon, your natal Moon sign (1st house), and the 2nd house after your natal Moon.',
          'Since Saturn takes approximately 2.5 years to cross each sign, the total duration across these three consecutive signs equals seven and a half years ("Sade Sati" in Hindi).',
        ],
      },
      {
        heading: 'Debunking the Fear Around Sade Sati',
        paragraphs: [
          'Popular culture often paints Sade Sati as purely traumatic, but this is a misconception. Saturn is the planet of justice, discipline, perseverance, and truth. Sade Sati acts as a period of profound cleansing and personal growth.',
          'Many individuals achieve major career milestones, financial stability, and spiritual realization during Sade Sati, provided they cultivate discipline, humility, and honest hard work.',
        ],
      },
      {
        heading: 'The Three Phases of Sade Sati',
        paragraphs: [
          'Sade Sati unfolds in three distinct 2.5-year phases:',
        ],
        bulletPoints: [
          'Phase 1 (12th House from Moon): Focuses on financial expenditures, subtle anxiety, foreign travel, and inner restructuring.',
          'Phase 2 (1st House / Natal Moon): The peak phase impacting personal mindset, health, identity, and major life responsibilities.',
          'Phase 3 (2nd House from Moon): Focuses on family dynamics, speech, financial consolidation, and long-term security.',
        ],
      },
      {
        heading: 'Constructive Remedies for Saturn',
        paragraphs: [
          'Rather than relying on superstitious rituals, practical Vedic remedies for Saturn focus on service, selflessness, and ethical conduct:',
        ],
        bulletPoints: [
          'Practice charity and serve elderly, sick, or underprivileged individuals.',
          'Maintain clean, honest financial habits and refrain from deceit or shortcut pursuits.',
          'Chant Hanuman Chalisa or Saturn mantras (such as "Om Sham Shanaishcharaya Namah").',
          'Practice daily meditation and disciplined routine to stay grounded.',
        ],
      },
    ],
  },
];

export function getAllPosts(): BlogPost[] {
  return [...BLOG_POSTS].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

export function getRelatedPosts(currentSlug: string, limit: number = 3): BlogPost[] {
  const currentPost = getPostBySlug(currentSlug);
  const otherPosts = BLOG_POSTS.filter((post) => post.slug !== currentSlug);

  if (!currentPost) {
    return otherPosts.slice(0, limit);
  }

  // Rank by overlapping tags
  const ranked = otherPosts.map((post) => {
    const commonTags = post.tags.filter((tag) => currentPost.tags.includes(tag)).length;
    return { post, commonTags };
  });

  ranked.sort((a, b) => b.commonTags - a.commonTags);
  return ranked.map((item) => item.post).slice(0, limit);
}
