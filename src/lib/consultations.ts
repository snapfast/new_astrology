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
  }
];
