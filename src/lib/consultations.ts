export interface SpecializedService {
  id: string;
  title: { en: string; hi: string };
  description: { en: string; hi: string };
}

export const SPECIALIZED_SERVICES: SpecializedService[] = [
  {
    id: "career",
    title: { en: "Career", hi: "करियर" },
    description: {
      en: "Identify suitable professional paths and timing for career advancements or transitions.",
      hi: "करियर की प्रगति या परिवर्तन के लिए उपयुक्त पेशेवर रास्तों और समय की पहचान करें।"
    }
  },
  {
    id: "business",
    title: { en: "Business", hi: "व्यापार" },
    description: {
      en: "Identify growth opportunities and risk factors within your business journey.",
      hi: "अपनी व्यावसायिक यात्रा में विकास के अवसरों और जोखिम कारकों की पहचान करें।"
    }
  },
  {
    id: "financial",
    title: { en: "Finances", hi: "वित्त" },
    description: {
      en: "Analyze financial growth potential and guidance on wealth management.",
      hi: "वित्तीय विकास की क्षमता का विश्लेषण और धन प्रबंधन पर मार्गदर्शन।"
    }
  },
  {
    id: "property",
    title: { en: "Property", hi: "संपत्ति" },
    description: {
      en: "Auspicious timings for real estate transactions and property clarity.",
      hi: "अचल संपत्ति के लेनदेन और संपत्ति संबंधी मामलों में स्पष्टता के लिए शुभ समय।"
    }
  },
  {
    id: "legal",
    title: { en: "Legal Matters", hi: "कानूनी मामले" },
    description: {
      en: "Astrological indicators for legal proceedings and strategic foresight.",
      hi: "कानूनी कार्यवाही के लिए ज्योतिषीय संकेत और रणनीतिक मार्गदर्शन।"
    }
  },
  {
    id: "relationships",
    title: { en: "Relationships", hi: "संबंध" },
    description: {
      en: "Examine personal connection dynamics and foster harmony.",
      hi: "व्यक्तिगत संबंधों की गतिशीलता को समझें और सद्भाव बढ़ाएं।"
    }
  },
  {
    id: "marriage",
    title: { en: "Marriage", hi: "विवाह" },
    description: {
      en: "Guidance for marital timing, compatibility, and partnership stability.",
      hi: "वैवाहिक समय, अनुकूलता और साझेदारी की स्थिरता के लिए मार्गदर्शन।"
    }
  },
  {
    id: "family",
    title: { en: "Family", hi: "परिवार" },
    description: {
      en: "Understand domestic dynamics and strengthen family bonds.",
      hi: "पारिवारिक गतिशीलता को समझें और पारिवारिक बंधनों को मजबूत करें।"
    }
  },
  {
    id: "children",
    title: { en: "Children", hi: "संतान" },
    description: {
      en: "Insights regarding progeny, parenting, and child well-being.",
      hi: "संतान, पालन-पोषण और बच्चों के कल्याण से संबंधित अंतर्दृष्टि।"
    }
  },
  {
    id: "education",
    title: { en: "Education", hi: "शिक्षा" },
    description: {
      en: "Clarity in choosing educational paths and overcoming learning hurdles.",
      hi: "शैक्षणिक पथ चुनने में स्पष्टता और पढ़ाई में आ रही बाधाओं का समाधान।"
    }
  },
  {
    id: "health",
    title: { en: "Health", hi: "स्वास्थ्य" },
    description: {
      en: "Perspectives on physical well-being through planetary cycles.",
      hi: "ग्रहों के चक्रों के माध्यम से शारीरिक स्वास्थ्य पर दृष्टिकोण।"
    }
  },
  {
    id: "mental-health",
    title: { en: "Mental Health", hi: "मानसिक स्वास्थ्य" },
    description: {
      en: "Identify planetary patterns associated with stress for inner resilience.",
      hi: "आंतरिक संतुलन और मानसिक लचीलेपन के लिए तनाव से जुड़े ग्रहों के पैटर्न की पहचान करें।"
    }
  },
  {
    id: "emotional-wellbeing",
    title: { en: "Emotional Well-being", hi: "भावनात्मक कल्याण" },
    description: {
      en: "Navigate emotional turmoil and find peace of mind with Vedic insights.",
      hi: "भावनात्मक उथल-पुथल को समझें और वैदिक अंतर्दृष्टि से मन की शांति प्राप्त करें।"
    }
  },
  {
    id: "spirituality",
    title: { en: "Spirituality", hi: "आध्यात्मिकता" },
    description: {
      en: "Clarity on life purpose and spiritual path through Atmakaraka analysis.",
      hi: "आत्मक़ारक विश्लेषण के माध्यम से जीवन के उद्देश्य और आध्यात्मिक पथ पर स्पष्टता।"
    }
  }
];
