export interface SpecializedService {
  id: string;
  title: { en: string; hi: string };
  description: { en: string; hi: string };
}

export const SPECIALIZED_SERVICES: SpecializedService[] = [
  {
    id: "emotional-distress",
    title: { en: "Emotional Distress", hi: "भावनात्मक संकट" },
    description: {
      en: "Navigate through periods of inner turmoil and emotional instability with Vedic insights. Understand the planetary influences affecting your peace of mind and find clarity through spiritual guidance.",
      hi: "वैदिक अंतर्दृष्टि के साथ आंतरिक उथल-पुथल और भावनात्मक अस्थिरता के दौर से गुजरें। अपने मन की शांति को प्रभावित करने वाले ग्रहों के प्रभावों को समझें और आध्यात्मिक मार्गदर्शन के माध्यम से स्पष्टता प्राप्त करें।"
    }
  },
  {
    id: "health-concerns",
    title: { en: "Health Concerns", hi: "स्वास्थ्य संबंधी चिंताएं" },
    description: {
      en: "Gain perspective on your physical well-being through the lens of medical astrology and planetary cycles. Identify potential vulnerabilities in your birth chart and explore holistic remedial measures for vitality.",
      hi: "चिकित्सा ज्योतिष और ग्रहों के चक्रों के माध्यम से अपने शारीरिक कल्याण पर दृष्टिकोण प्राप्त करें। अपनी जन्म कुंडली में संभावित कमजोरियों की पहचान करें और जीवन शक्ति के लिए समग्र उपचारात्मक उपायों का पता लगाएं।"
    }
  },
  {
    id: "financial-challenges",
    title: { en: "Financial Challenges", hi: "वित्तीय चुनौतियां" },
    description: {
      en: "Analyze the wealth-generating potential in your horoscope and identify periods of financial growth or restriction. Receive guidance on wealth management and traditional remedies to overcome monetary obstacles.",
      hi: "अपनी कुंडली में धन-पैदा करने की क्षमता का विश्लेषण करें और वित्तीय विकास या प्रतिबंध की अवधि की पहचान करें। धन प्रबंधन और मौद्रिक बाधाओं को दूर करने के लिए पारंपरिक उपायों पर मार्गदर्शन प्राप्त करें।"
    }
  },
  {
    id: "relationship-struggles",
    title: { en: "Relationship Struggles", hi: "रिश्तों में संघर्ष" },
    description: {
      en: "Deeply examine the dynamics of your personal connections and the karmic lessons they bring. Discover ways to improve communication and harmony within your relationships through astrological understanding.",
      hi: "अपने व्यक्तिगत संबंधों की गतिशीलता और उनके द्वारा लाए गए कर्म पाठों की गहराई से जांच करें। ज्योतिषीय समझ के माध्यम से अपने रिश्तों के भीतर संवाद और सद्भाव सुधारने के तरीके खोजें।"
    }
  },
  {
    id: "career-hurdles",
    title: { en: "Career Hurdles", hi: "करियर की बाधाएं" },
    description: {
      en: "Identify the most suitable professional paths and timing for career advancements or transitions. Overcome workplace challenges and stagnation by aligning your efforts with favorable planetary periods.",
      hi: "करियर की प्रगति या संक्रमण के लिए सबसे उपयुक्त पेशेवर रास्तों और समय की पहचान करें। अनुकूल ग्रहों की अवधि के साथ अपने प्रयासों को संरेखित करके कार्यस्थल की चुनौतियों और ठहराव को दूर करें।"
    }
  },
  {
    id: "family-conflicts",
    title: { en: "Family Conflicts", hi: "पारिवारिक विवाद" },
    description: {
      en: "Address domestic discord and misunderstandings within the family unit through an analysis of ancestral karma. Find peaceful resolutions and strengthen family bonds by understanding individual chart influences.",
      hi: "पैतृक कर्म के विश्लेषण के माध्यम से परिवार इकाई के भीतर घरेलू कलह और गलतफहमियों को दूर करें। व्यक्तिगत कुंडली के प्रभावों को समझकर शांतिपूर्ण समाधान खोजें और पारिवारिक बंधनों को मजबूत करें।"
    }
  },
  {
    id: "legal-disputes",
    title: { en: "Legal Disputes", hi: "कानूनी विवाद" },
    description: {
      en: "Evaluate the astrological indicators for success in legal matters and the timing of judicial proceedings. Navigate complex litigations with strategic foresight based on your planetary transits and strengths.",
      hi: "कानूनी मामलों में सफलता के ज्योतिषीय संकेतकों और न्यायिक कार्यवाही के समय का मूल्यांकन करें। अपने ग्रहों के गोचर और शक्तियों के आधार पर रणनीतिक दूरदर्शिता के साथ जटिल मुकदमों का सामना करें।"
    }
  },
  {
    id: "property-issues",
    title: { en: "Property Issues", hi: "संपत्ति के मुद्दे" },
    description: {
      en: "Determine auspicious timings for real estate transactions and resolve disputes related to land or inheritance. Understand the planetary configurations governing your property luck and residential stability.",
      hi: "अचल संपत्ति के लेनदेन के लिए शुभ समय निर्धारित करें और भूमि या विरासत से संबंधित विवादों को हल करें। अपने संपत्ति भाग्य और आवासीय स्थिरता को नियंत्रित करने वाले ग्रहों के विन्यास को समझें।"
    }
  },
  {
    id: "business-obstacles",
    title: { en: "Business Obstacles", hi: "व्यावसायिक बाधाएं" },
    description: {
      en: "Identify growth opportunities and risk factors within your entrepreneurial journey through Vedic analysis. Optimize your business strategy by timing major decisions according to your professional dasha cycles.",
      hi: "वैदिक विश्लेषण के माध्यम से अपनी उद्यमशीलता यात्रा के भीतर विकास के अवसरों और जोखिम कारकों की पहचान करें। अपने पेशेवर दशा चक्रों के अनुसार प्रमुख निर्णयों का समय तय करके अपनी व्यावसायिक रणनीति को अनुकूलित करें।"
    }
  },
  {
    id: "marriage-concerns",
    title: { en: "Marriage Concerns", hi: "विवाह संबंधी चिंताएं" },
    description: {
      en: "Address delays or difficulties in marital life by analyzing your seventh house and planetary placements. Receive practical guidance and traditional remedies to foster a fulfilling and stable partnership.",
      hi: "अपने सातवें घर और ग्रहों की स्थिति का विश्लेषण करके वैवाहिक जीवन में देरी या कठिनाइयों को दूर करें। एक संतोषजनक और स्थिर साझेदारी को बढ़ावा देने के लिए व्यावहारिक मार्गदर्शन और पारंपरिक उपाय प्राप्त करें।"
    }
  },
  {
    id: "education-setbacks",
    title: { en: "Education Setbacks", hi: "शिक्षा में बाधाएं" },
    description: {
      en: "Understand the factors affecting academic performance and clarity in choosing educational paths. Overcome learning obstacles and examination anxiety by strengthening the relevant planetary influences.",
      hi: "शैक्षणिक प्रदर्शन को प्रभावित करने वाले कारकों और शैक्षिक पथ चुनने में स्पष्टता को समझें। प्रासंगिक ग्रहों के प्रभावों को मजबूत करके सीखने की बाधाओं और परीक्षा की चिंता को दूर करें।"
    }
  },
  {
    id: "child-related-challenges",
    title: { en: "Child-related Challenges", hi: "बच्चों से संबंधित चुनौतियां" },
    description: {
      en: "Explore astrological insights regarding progeny, child-rearing, and the well-being of your children. Navigate parenting hurdles and support your child's growth through a deeper understanding of their chart.",
      hi: "संतान, बच्चों के पालन-पोषण और आपके बच्चों के कल्याण के संबंध में ज्योतिषीय अंतर्दृष्टि का पता लगाएं। माता-पिता की बाधाओं को पार करें और अपने बच्चे की कुंडली की गहरी समझ के माध्यम से उनके विकास का समर्थन करें।"
    }
  },
  {
    id: "mental-health-struggles",
    title: { en: "Mental Health Struggles", hi: "मानसिक स्वास्थ्य संघर्ष" },
    description: {
      en: "Find support for psychological well-being by identifying planetary patterns associated with mental stress. Complement traditional care with Vedic wisdom to achieve inner balance and mental resilience.",
      hi: "मानसिक तनाव से जुड़े ग्रहों के पैटर्न की पहचान करके मनोवैज्ञानिक कल्याण के लिए सहायता प्राप्त करें। आंतरिक संतुलन और मानसिक लचीलापन प्राप्त करने के लिए वैदिक ज्ञान के साथ पारंपरिक देखभाल का पूरक बनें।"
    }
  },
  {
    id: "spiritual-dilemmas",
    title: { en: "Spiritual Dilemmas", hi: "आध्यात्मिक दुविधाएं" },
    description: {
      en: "Resolve inner conflicts regarding your life's purpose and spiritual path through Atmakaraka analysis. Gain clarity on your evolutionary journey and connect with your higher self through Vedic teachings.",
      hi: "आत्मक़ारक विश्लेषण के माध्यम से अपने जीवन के उद्देश्य और आध्यात्मिक पथ के संबंध में आंतरिक संघर्षों को हल करें। अपनी विकासवादी यात्रा पर स्पष्टता प्राप्त करें और वैदिक शिक्षाओं के माध्यम से अपने उच्च स्व से जुड़ें।"
    }
  }
];
