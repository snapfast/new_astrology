export interface Portion {
  title: string;
  icon: string;
  expandedDetail: string;
}

export interface Consultation {
  id: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  portions: Portion[];
}

export const CONSULTATIONS: Consultation[] = [
  {
    id: 'soul-compatibility',
    title: "Soul Compatibility",
    description: "Deep dive into Synastry and Kundli matching to find harmonious soul connections and karmic ties.",
    image: "https://images.unsplash.com/photo-1630713815150-2c847025c1d9?auto=format&fit=crop&q=80&w=800",
    alt: "high-contrast macro photography of two interlocking crystalline structures representing union",
    portions: [
      {
        title: "Synastry Analysis",
        icon: "favorite",
        expandedDetail: "We analyze the planetary alignments between two individuals to understand the underlying energy flow, mutual attractions, and potential friction points."
      },
      {
        title: "Karmic Connections",
        icon: "auto_stories",
        expandedDetail: "Explore past-life ties and soul contracts that bring you together, identifying the lessons and growth opportunities within the relationship."
      },
      {
        title: "Marital Harmony",
        icon: "home",
        expandedDetail: "Assessment of long-term stability, family growth, and emotional resonance using the Ashta Kuta matching system and beyond."
      },
      {
        title: "Dosha Mitigation",
        icon: "shield_with_heart",
        expandedDetail: "Identifying and providing remedies for matching challenges like Manglik Dosha or Bhakoot Dosha to ensure a peaceful union."
      }
    ]
  },
  {
    id: 'vedic-wisdom',
    title: "Vedic Wisdom",
    description: "Personalized sessions to master your charts, understand karmic patterns, and spiritual evolution.",
    image: "https://images.unsplash.com/photo-1506466010722-395aa2bef877?auto=format&fit=crop&q=80&w=800",
    alt: "high-contrast photography of ancient vedic manuscripts on weathered parchment",
    portions: [
      {
        title: "Chart Mastery",
        icon: "analytics",
        expandedDetail: "In-depth training on reading birth charts, understanding house placements, and identifying planetary strengths (Shadbala)."
      },
      {
        title: "Nakshatra Wisdom",
        icon: "auto_awesome",
        expandedDetail: "Exploring the deeper layers of the 27 lunar mansions to reveal subtle character traits and destiny patterns."
      },
      {
        title: "Dasha Systems",
        icon: "history",
        expandedDetail: "Learn to navigate the complex time-cycles (Vimshottari Dasha) to predict and prepare for different life phases."
      },
      {
        title: "Spiritual Path",
        icon: "spa",
        expandedDetail: "Identifying your Atmakaraka (soul planet) and Ishta Devata to find clarity on your spiritual evolution."
      }
    ]
  },
  {
    id: 'sacred-numerology',
    title: "Sacred Numerology",
    description: "Discover the vibrational power of your birth numbers, name frequencies, and business resonance.",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=800",
    alt: "high-contrast abstract digital art representing numerical vibrations and sacred geometry",
    portions: [
      {
        title: "Life Path Numbers",
        icon: "pin",
        expandedDetail: "Calculate your core destiny numbers to reveal your innate talents, life purpose, and the major themes of your journey."
      },
      {
        title: "Name Frequency",
        icon: "text_fields",
        expandedDetail: "Analyze the energetic resonance of your name and explore potential adjustments to align with your birth numbers for greater success."
      },
      {
        title: "Business Resonance",
        icon: "business_center",
        expandedDetail: "Select auspicious names for companies, brands, or products that vibrate with prosperity and market relevance."
      },
      {
        title: "Yearly Forecast",
        icon: "event",
        expandedDetail: "Understand the personal year cycle you are in and how to best utilize the prevailing numerical vibrations for growth."
      }
    ]
  },
  {
    id: 'remedial-measures',
    title: "Remedial Measures",
    description: "Curated mantras, gemstones, and rituals to balance planetary influences and enhance fortune.",
    image: "https://images.unsplash.com/photo-1596450514735-111a2fe02935?auto=format&fit=crop&q=80&w=800",
    alt: "high-contrast photography of rare high-vibration gemstones and ceremonial elements",
    portions: [
      {
        title: "Gem Therapy",
        icon: "diamond",
        expandedDetail: "Scientific and astrological selection of gemstones based on planetary lordship, functional beneficence, and current dashas."
      },
      {
        title: "Mantra Jaap",
        icon: "record_voice_over",
        expandedDetail: "Prescription of specific sound frequencies (mantras) to neutralize negative planetary effects and strengthen beneficial ones."
      },
      {
        title: "Wearing Rituals",
        icon: "celebration",
        expandedDetail: "Step-by-step instructions for the purification, energizing (Prana Pratishtha), and initial wearing on auspicious days."
      },
      {
        title: "Charity & Dana",
        icon: "volunteer_activism",
        expandedDetail: "Guidance on specific acts of charity and donations that help balance karmic debts related to challenging planets."
      }
    ]
  },
  {
    id: 'vastu-shastra',
    title: "Vastu Shastra",
    description: "Aligning your living and working spaces with cosmic energy flows for peace and prosperity.",
    image: "https://images.unsplash.com/photo-1585938389612-a552a28d6914?auto=format&fit=crop&q=80&w=800",
    alt: "high-contrast photography of a geometric architectural detail representing spatial harmony",
    portions: [
      {
        title: "Energy Audit",
        icon: "bungalow",
        expandedDetail: "Optimizing the energy of your home by analyzing directions, room placements, and the flow of 'Prana'."
      },
      {
        title: "Commercial Vastu",
        icon: "domain",
        expandedDetail: "Designing workspaces that foster productivity, financial growth, and harmonious relationships between employees."
      },
      {
        title: "Remedial Vastu",
        icon: "build",
        expandedDetail: "Correcting existing architectural defects using non-destructive remedies like colors, mirrors, pyramids, and yantras."
      },
      {
        title: "Plot Selection",
        icon: "map",
        expandedDetail: "Astrological guidance on choosing the right land based on its shape, slope, soil quality, and surrounding environment."
      }
    ]
  },
  {
    id: 'auspicious-timing',
    title: "Auspicious Timing",
    description: "Selecting precise cosmic windows for life's milestones and naming ceremonies.",
    image: "https://images.unsplash.com/photo-1508921340878-ba53e1f016ec?auto=format&fit=crop&q=80&w=800",
    alt: "high-contrast photography of a star-filled sky representing the movement of time and destiny",
    portions: [
      {
        title: "Marriage Muhurta",
        icon: "favorite_border",
        expandedDetail: "Calculating the most auspicious date and time for wedding rituals to ensure long-term stability and happiness."
      },
      {
        title: "Business Launch",
        icon: "rocket_launch",
        expandedDetail: "Timing the inauguration of offices or the signing of major contracts to maximize success and minimize obstacles."
      },
      {
        title: "Namakaran",
        icon: "child_care",
        expandedDetail: "Selecting names whose starting sounds (Aksharas) align with the infant's birth Nakshatra and Pada for a fortunate life."
      },
      {
        title: "Griha Pravesh",
        icon: "key",
        expandedDetail: "Identifying the ideal window for entering a new home to invite prosperity and peace for the residents."
      }
    ]
  }
];
