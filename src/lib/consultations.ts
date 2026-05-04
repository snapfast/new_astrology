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
    description: "Deep dive into Synastry and Kundli matching to find harmonious soul connections.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCP6ujc63yZ2oXlHfSJ0u41wP6UAO7YkEJxIQ9QUhBxxS9Wxqh3VOSt81QHPf9YyJ8ymNR5HfN2FajhMm3DkWLZSD5iQWMxyPVe2pJ-7G5ZfsWM5Ko3wpZ0cATaWxK7sqRqAqHrYQ1KeutVxRmzZSA-rrKhJgSZgPJ7E_oXO-aHIxioCzZ9pBfavbthjDMGLNSft7Piv_YrKXBwiee0wCWJYaiY6dYa7luUdZedd3smjiio7BMDcNyy08fEx32I5_tnOBfo3yMq5Q",
    alt: "high-contrast macro photography of a rose quartz gemstone representing venus and love",
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
    id: 'sacred-numerology',
    title: "Sacred Numerology",
    description: "Discover the vibrational power of your birth numbers and name frequencies.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDUhjeIbmldNNddsktUzE0jM-P54lEpChGUp4WeZJNFMNEwQaFVjkB4nYI5vYiqNsLJQ7gHJDKEB0OjGPNWV9cXoFFGH-CbGODaQqrPIFcdLnL3Ih9B8UHsUZ0f115g1isLY4xte3pYnxSDC7szzZdcUquqWZ0T8oqc7uM5TF0k_hIRM7lMniKEqm1FGOn_kAK9ZOd1n1j8Yq1BaOg1m8uiP6KSgjnC8aE1uPZHeTwZfRSYfB1Fi5-jMM9cLhoaT5S03hCzKYkVJw",
    alt: "high-contrast macro photography of a clear quartz crystal representing clarity and vibration",
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
        title: "Business Numerology",
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
    id: 'vedic-remedies',
    title: "Vedic Remedies",
    description: "Curated mantras, gemstones, and rituals to balance planetary influences.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA5_mhjudVJ4_VhkyR5sHeMXR0elddzF76LojtHRJmZZkmSK6R60rTCn5-1jC2N6ys74GbpPbMY5aA8FfaxFuoqlEiu9U_cGCJa1l__8jGs8xtSGB5h8MNbWat7SfgNC_xE6_08a9lS6uRwx3aLopH9B-FnzY33F6E_omGD1bABiw5YNJukphRfs7ej--h_K1-frarYqzZthel0NH0cq7qanUrjPHs1dACRpJ6AwaphBfAiQlcp62j52Vn2olYC65MbDzEwS0to-g",
    alt: "high-contrast macro photography of a deep blue sapphire gemstone representing saturn",
    portions: [
      {
        title: "Mantra Jaap",
        icon: "record_voice_over",
        expandedDetail: "Prescription of specific sound frequencies (mantras) to neutralize negative planetary effects and strengthen beneficial ones."
      },
      {
        title: "Ritual Guidance",
        icon: "temple_hindu",
        expandedDetail: "Personalized advice on performing specific Pujas, fasts, or homams at auspicious times to invoke divine assistance."
      },
      {
        title: "Charity & Dana",
        icon: "volunteer_activism",
        expandedDetail: "Guidance on specific acts of charity and donations that help balance karmic debts related to challenging planets."
      },
      {
        title: "Lifestyle Shifts",
        icon: "self_improvement",
        expandedDetail: "Practical changes in daily habits, colors, and directions that align your lifestyle with your cosmic signature."
      }
    ]
  },
  {
    id: 'vedic-knowledge',
    title: "Vedic Knowledge",
    description: "Personalized sessions to master your charts and understand karmic patterns.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBW-AeHtbkPIwv8CiKyrytUAJ0zXE_1gxVa-hsVVbqylWP0_pojki492R8NnWnzaFpZYd7rBO4ccrgCuOPnEh6MWt8e-KcLQ4YypBIYKBuCGb_pfRvuIRUef7U8NbZ-aYGjEa_nvD6Vma0b81nPGYisBNbaqetgpWWQLBpjDDu5F3dWLMGjEqBHosMIna1g5xabWdGtnDdw75LG8-FLinAm0cABHWGOXpAwaTT6Eo-ZZEoH6M6IRb-HzM1aLSgw4piiy-vlacwc8A",
    alt: "high-contrast macro photography of an emerald gemstone representing mercury and wisdom",
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
    id: 'rings-and-stones',
    title: "Rings & Stones",
    description: "Precision gemstone recommendation and ritual wearing protocols.",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=800",
    alt: "high-contrast macro photography of a golden ring with a brilliant yellow sapphire",
    portions: [
      {
        title: "Gem Selection",
        icon: "diamond",
        expandedDetail: "Scientific and astrological selection of gemstones based on planetary lordship, functional beneficence, and current dashas."
      },
      {
        title: "Metal Pairing",
        icon: "hardware",
        expandedDetail: "Guidance on the correct metal (Gold, Silver, Copper, or Panchdhatu) required to amplify the gemstone's vibration."
      },
      {
        title: "Wearing Rituals",
        icon: "celebration",
        expandedDetail: "Step-by-step instructions for the purification, energizing (Prana Pratishtha), and initial wearing on auspicious days."
      },
      {
        title: "Quality Audit",
        icon: "verified",
        expandedDetail: "Assistance in identifying natural, untreated gemstones and understanding the importance of clarity, cut, and weight."
      }
    ]
  },
  {
    id: 'vastu-shastra',
    title: "Vastu Shastra",
    description: "Aligning your living and working spaces with cosmic energy flows.",
    image: "https://images.unsplash.com/photo-1621252179027-94459d278660?auto=format&fit=crop&q=80&w=800",
    alt: "high-contrast macro photography of a brass compass on an architectural blueprint",
    portions: [
      {
        title: "Residential Vastu",
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
    id: 'namakaran',
    title: "Namakaran",
    description: "Choosing auspicious names based on sound vibrations and nakshatras.",
    image: "https://images.unsplash.com/photo-1512418490979-92798ccc13a0?auto=format&fit=crop&q=80&w=800",
    alt: "high-contrast macro photography of a vintage fountain pen nib and ink on parchment",
    portions: [
      {
        title: "Phonetic Analysis",
        icon: "record_voice_over",
        expandedDetail: "Selecting names whose starting sounds (Aksharas) align with the infant's birth Nakshatra and Pada."
      },
      {
        title: "Name Numerology",
        icon: "calculate",
        expandedDetail: "Ensuring the total numerical value of the name resonates positively with the date of birth for lifelong support."
      },
      {
        title: "Ancestral Honor",
        icon: "groups",
        expandedDetail: "Blending traditional family naming conventions with astrological precision for a name that honors lineage."
      },
      {
        title: "Meaning & Intent",
        icon: "psychology",
        expandedDetail: "Finding names with profound Sanskrit meanings that set a positive intention for the child's character and destiny."
      }
    ]
  },
  {
    id: 'muhurta',
    title: "Muhurta & Timing",
    description: "Selecting the precise cosmic windows for life's most important milestones.",
    image: "https://images.unsplash.com/photo-1508108712903-49b7ef9b1df8?auto=format&fit=crop&q=80&w=800",
    alt: "high-contrast macro photography of the intricate gears of a mechanical clock",
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
        title: "Griha Pravesh",
        icon: "key",
        expandedDetail: "Identifying the ideal window for entering a new home to invite prosperity and peace for the residents."
      },
      {
        title: "Surgical Timing",
        icon: "medical_services",
        expandedDetail: "Using astrology to select favorable times for medical procedures to support quick recovery and successful outcomes."
      }
    ]
  }
];
