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

export interface SpecializedService {
  id: string;
  title: string;
  description: string;
}

export const CONSULTATIONS: Consultation[] = [];

export const SPECIALIZED_SERVICES: SpecializedService[] = [
  {
    id: "emotional-distress",
    title: "Emotional Distress",
    description: "Navigate through periods of inner turmoil and emotional instability with Vedic insights. Understand the planetary influences affecting your peace of mind and find clarity through spiritual guidance."
  },
  {
    id: "health-concerns",
    title: "Health Concerns",
    description: "Gain perspective on your physical well-being through the lens of medical astrology and planetary cycles. Identify potential vulnerabilities in your birth chart and explore holistic remedial measures for vitality."
  },
  {
    id: "financial-challenges",
    title: "Financial Challenges",
    description: "Analyze the wealth-generating potential in your horoscope and identify periods of financial growth or restriction. Receive guidance on wealth management and traditional remedies to overcome monetary obstacles."
  },
  {
    id: "relationship-struggles",
    title: "Relationship Struggles",
    description: "Deeply examine the dynamics of your personal connections and the karmic lessons they bring. Discover ways to improve communication and harmony within your relationships through astrological understanding."
  },
  {
    id: "career-hurdles",
    title: "Career Hurdles",
    description: "Identify the most suitable professional paths and timing for career advancements or transitions. Overcome workplace challenges and stagnation by aligning your efforts with favorable planetary periods."
  },
  {
    id: "family-conflicts",
    title: "Family Conflicts",
    description: "Address domestic discord and misunderstandings within the family unit through an analysis of ancestral karma. Find peaceful resolutions and strengthen family bonds by understanding individual chart influences."
  },
  {
    id: "legal-disputes",
    title: "Legal Disputes",
    description: "Evaluate the astrological indicators for success in legal matters and the timing of judicial proceedings. Navigate complex litigations with strategic foresight based on your planetary transits and strengths."
  },
  {
    id: "property-issues",
    title: "Property Issues",
    description: "Determine auspicious timings for real estate transactions and resolve disputes related to land or inheritance. Understand the planetary configurations governing your property luck and residential stability."
  },
  {
    id: "business-obstacles",
    title: "Business Obstacles",
    description: "Identify growth opportunities and risk factors within your entrepreneurial journey through Vedic analysis. Optimize your business strategy by timing major decisions according to your professional dasha cycles."
  },
  {
    id: "marriage-concerns",
    title: "Marriage Concerns",
    description: "Address delays or difficulties in marital life by analyzing your seventh house and planetary placements. Receive practical guidance and traditional remedies to foster a fulfilling and stable partnership."
  },
  {
    id: "education-setbacks",
    title: "Education Setbacks",
    description: "Understand the factors affecting academic performance and clarity in choosing educational paths. Overcome learning obstacles and examination anxiety by strengthening the relevant planetary influences."
  },
  {
    id: "child-related-challenges",
    title: "Child-related Challenges",
    description: "Explore astrological insights regarding progeny, child-rearing, and the well-being of your children. Navigate parenting hurdles and support your child's growth through a deeper understanding of their chart."
  },
  {
    id: "mental-health-struggles",
    title: "Mental Health Struggles",
    description: "Find support for psychological well-being by identifying planetary patterns associated with mental stress. Complement traditional care with Vedic wisdom to achieve inner balance and mental resilience."
  },
  {
    id: "spiritual-dilemmas",
    title: "Spiritual Dilemmas",
    description: "Resolve inner conflicts regarding your life's purpose and spiritual path through Atmakaraka analysis. Gain clarity on your evolutionary journey and connect with your higher self through Vedic teachings."
  }
];
