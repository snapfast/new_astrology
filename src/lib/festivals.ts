import type { PanchangData } from './astrology.ts';

export interface Festival {
  id: string;
  nameEn: string;
  nameHi: string;
  category: 'major' | 'vrat' | 'jayanti';
  dateStr?: string; // YYYY-MM-DD if fixed solar date
  lunarMonth?: string; // Amanta or Purnimanta lunar month name
  paksha?: 'Shukla' | 'Krishna';
  tithi?: string;
  descriptionEn: string;
  descriptionHi: string;
}

export interface DateFestivalInfo {
  dateKey: string;
  festivals: Festival[];
}

// Major Annual Hindu Festivals defined by Lunar Month, Paksha, and Tithi (or special rules)
export const MAJOR_ANNUAL_FESTIVALS: Array<Omit<Festival, 'id'>> = [
  // Chaitra (March - April)
  {
    nameEn: "Chaitra Navratri / Ugadi / Gudi Padwa",
    nameHi: "चैत्र नवरात्रि / उगादि / गुड़ी पड़वा",
    category: "major",
    lunarMonth: "Chaitra",
    paksha: "Shukla",
    tithi: "Pratipada",
    descriptionEn: "Marks the beginning of the Hindu New Year (Vikram Samvat) and 9 days of Chaitra Navratri.",
    descriptionHi: "हिन्दू नववर्ष (विक्रम संवत) और ९ दिवसीय चैत्र नवरात्रि का शुभारंभ।"
  },
  {
    nameEn: "Gauri Puja / Gangaur",
    nameHi: "गौरी पूजा / गणगौर",
    category: "major",
    lunarMonth: "Chaitra",
    paksha: "Shukla",
    tithi: "Tritiya",
    descriptionEn: "Celebration of marital harmony and devotion to Goddess Parvati.",
    descriptionHi: "माता पार्वती और भगवान शिव की पूजा एवं अखंड सौभाग्य का पर्व।"
  },
  {
    nameEn: "Yamuna Chhath / Chaitra Chhath",
    nameHi: "यमुना छठ / चैत्र छठ",
    category: "vrat",
    lunarMonth: "Chaitra",
    paksha: "Shukla",
    tithi: "Shashti",
    descriptionEn: "Appearance day of River Yamuna and Chaitra Chhath Puja.",
    descriptionHi: "यमुना जयंती एवं चैत्र छठ पूजा।"
  },
  {
    nameEn: "Sri Rama Navami",
    nameHi: "श्री राम नवमी",
    category: "major",
    lunarMonth: "Chaitra",
    paksha: "Shukla",
    tithi: "Navami",
    descriptionEn: "Birth anniversary of Lord Rama, the seventh avatar of Lord Vishnu.",
    descriptionHi: "भगवान श्री राम का जन्मोत्सव।"
  },
  {
    nameEn: "Hanuman Jayanti",
    nameHi: "हनुमान जयंती",
    category: "jayanti",
    lunarMonth: "Chaitra",
    paksha: "Shukla",
    tithi: "Purnima",
    descriptionEn: "Birth anniversary of Lord Hanuman, symbol of supreme devotion and strength.",
    descriptionHi: "भगवान हनुमान जी का पावन जन्मोत्सव।"
  },

  // Vaishakha (April - May)
  {
    nameEn: "Akshaya Tritiya",
    nameHi: "अक्षय तृतीया",
    category: "major",
    lunarMonth: "Vaishakha",
    paksha: "Shukla",
    tithi: "Tritiya",
    descriptionEn: "Highly auspicious day for new beginnings, buying gold, and charity.",
    descriptionHi: "अक्षय फलदायी एवं अत्यंत शुभ दिन, स्वर्ण क्रय व दान हेतु सर्वोत्तम।"
  },
  {
    nameEn: "Narasimha Jayanti",
    nameHi: "नृसिंह जयंती",
    category: "jayanti",
    lunarMonth: "Vaishakha",
    paksha: "Shukla",
    tithi: "Chaturdashi",
    descriptionEn: "Appearance day of Lord Narasimha, the half-man, half-lion incarnation of Lord Vishnu.",
    descriptionHi: "भगवान विष्णु के नृसिंह अवतार का प्राकट्य दिवस।"
  },
  {
    nameEn: "Buddha Purnima / Vaishakha Purnima",
    nameHi: "बुद्ध पूर्णिमा / वैशाख पूर्णिमा",
    category: "major",
    lunarMonth: "Vaishakha",
    paksha: "Shukla",
    tithi: "Purnima",
    descriptionEn: "Birth, enlightenment, and Mahaparinirvana of Gautama Buddha.",
    descriptionHi: "भगवान बुद्ध की जयंती व वैशाख पूर्णिमा स्नान-दान।"
  },

  // Jyeshtha (May - June)
  {
    nameEn: "Vat Savitri Vrat",
    nameHi: "वट सावित्री व्रत",
    category: "vrat",
    lunarMonth: "Jyeshtha",
    paksha: "Krishna",
    tithi: "Amavasya",
    descriptionEn: "Fasting observed by married women for the longevity and health of husbands.",
    descriptionHi: "पति की दीर्घायु एवं सुख-समृद्धि हेतु सुहागिनों द्वारा रखा जाने वाला पावन व्रत।"
  },
  {
    nameEn: "Ganga Dussehra",
    nameHi: "गंगा दशहरा",
    category: "major",
    lunarMonth: "Jyeshtha",
    paksha: "Shukla",
    tithi: "Dashami",
    descriptionEn: "Commemorates the descent of Holy River Ganga to Earth.",
    descriptionHi: "मां गंगा के पृथ्वी पर अवतरण का पावन पर्व।"
  },
  {
    nameEn: "Nirjala Ekadashi",
    nameHi: "निर्जला एकादशी",
    category: "vrat",
    lunarMonth: "Jyeshtha",
    paksha: "Shukla",
    tithi: "Ekadashi",
    descriptionEn: "Most auspicious Ekadashi fast observed without taking a drop of water.",
    descriptionHi: "बिना जल ग्रहण किए रखा जाने वाला वर्ष का सबसे महापुण्यदायी एकादशी व्रत।"
  },

  // Ashadha (June - July)
  {
    nameEn: "Jagannath Rath Yatra",
    nameHi: "जगन्नाथ रथ यात्रा",
    category: "major",
    lunarMonth: "Ashadha",
    paksha: "Shukla",
    tithi: "Dwitiya",
    descriptionEn: "Grand chariot procession of Lord Jagannath, Balabhadra, and Subhadra in Puri.",
    descriptionHi: "श्री जगन्नाथ जी, बलभद्र एवं सुभद्रा जी की विश्वप्रसिद्ध रथ यात्रा।"
  },
  {
    nameEn: "Devshayani Ekadashi",
    nameHi: "देवशयनी एकादशी",
    category: "vrat",
    lunarMonth: "Ashadha",
    paksha: "Shukla",
    tithi: "Ekadashi",
    descriptionEn: "Marks the beginning of Chaturmas, when Lord Vishnu goes into cosmic sleep.",
    descriptionHi: "चातुर्मास का आरंभ, भगवान विष्णु का योगनिद्रा में प्रवेश।"
  },
  {
    nameEn: "Guru Purnima",
    nameHi: "गुरु पूर्णिमा",
    category: "major",
    lunarMonth: "Ashadha",
    paksha: "Shukla",
    tithi: "Purnima",
    descriptionEn: "Day dedicated to honoring spiritual gurus and Maharshi Ved Vyasa.",
    descriptionHi: "गुरुजनों के प्रति कृतज्ञता व्यक्त करने एवं महर्षि वेदव्यास जयंती का पावन पर्व।"
  },

  // Shravana (July - August)
  {
    nameEn: "Nag Panchami",
    nameHi: "नाग पंचमी",
    category: "major",
    lunarMonth: "Shravana",
    paksha: "Shukla",
    tithi: "Panchami",
    descriptionEn: "Worship of Serpent Deities (Nagas) for protection and removing Kaal Sarp Dosha.",
    descriptionHi: "नाग देवों की पूजा एवं सर्पदोष शांति का पवित्र पर्व।"
  },
  {
    nameEn: "Shravana Putrada Ekadashi",
    nameHi: "श्रावण पुत्रदा एकादशी",
    category: "vrat",
    lunarMonth: "Shravana",
    paksha: "Shukla",
    tithi: "Ekadashi",
    descriptionEn: "Fasting observed for progeny and happiness of offspring.",
    descriptionHi: "संतान प्राप्ति एवं संतान की सुख-समृद्धि हेतु एकादशी व्रत।"
  },
  {
    nameEn: "Raksha Bandhan / Shravana Purnima",
    nameHi: "रक्षाबंधन / श्रावणी पूर्णिमा",
    category: "major",
    lunarMonth: "Shravana",
    paksha: "Shukla",
    tithi: "Purnima",
    descriptionEn: "Sacred bond of protection between brothers and sisters; Upakarma day.",
    descriptionHi: "भाई-बहन के अटूट प्रेम और रक्षा का पवित्र त्यौहार।"
  },

  // Bhadrapada (August - September)
  {
    nameEn: "Kajari Teej",
    nameHi: "कजरी तीज",
    category: "vrat",
    lunarMonth: "Bhadrapada",
    paksha: "Krishna",
    tithi: "Tritiya",
    descriptionEn: "Fast observed by married women for domestic happiness.",
    descriptionHi: "सुहागिनों द्वारा दांपत्य जीवन के सुख हेतु कजरी तीज व्रत।"
  },
  {
    nameEn: "Sri Krishna Janmashtami",
    nameHi: "श्री कृष्ण जन्माष्टमी",
    category: "major",
    lunarMonth: "Bhadrapada",
    paksha: "Krishna",
    tithi: "Ashtami",
    descriptionEn: "Grand celebration of the birth of Lord Sri Krishna, the 8th avatar of Lord Vishnu.",
    descriptionHi: "भगवान श्री कृष्ण का भव्य जन्मोत्सव।"
  },
  {
    nameEn: "Hartalika Teej",
    nameHi: "हरतालिका तीज",
    category: "vrat",
    lunarMonth: "Bhadrapada",
    paksha: "Shukla",
    tithi: "Tritiya",
    descriptionEn: "Nirjala fast dedicated to Goddess Parvati and Lord Shiva.",
    descriptionHi: "मां पार्वती और भगवान शिव को समर्पित निर्जला तीज व्रत।"
  },
  {
    nameEn: "Ganesh Chaturthi",
    nameHi: "गणेश चतुर्थी",
    category: "major",
    lunarMonth: "Bhadrapada",
    paksha: "Shukla",
    tithi: "Chaturthi",
    descriptionEn: "Birth of Lord Ganesha, Lord of Wisdom and Remover of Obstacles.",
    descriptionHi: "विघ्नहर्ता भगवान श्री गणेश का जन्मोत्सव एवं १० दिवसीय गणेशोत्सव।"
  },
  {
    nameEn: "Anant Chaturdashi",
    nameHi: "अनंत चतुर्दशी",
    category: "major",
    lunarMonth: "Bhadrapada",
    paksha: "Shukla",
    tithi: "Chaturdashi",
    descriptionEn: "Worship of Lord Ananta (Vishnu) and Ganesha Visarjan.",
    descriptionHi: "भगवान अनंत (विष्णु) की पूजा एवं श्री गणेश विसर्जन।"
  },

  // Ashvina (September - October)
  {
    nameEn: "Sharad Navratri Ghatasthapana",
    nameHi: "शरद नवरात्रि घटस्थापना",
    category: "major",
    lunarMonth: "Ashvina",
    paksha: "Shukla",
    tithi: "Pratipada",
    descriptionEn: "Beginning of 9 sacred nights worshipping Navadurga.",
    descriptionHi: "९ दिवसीय माँ दुर्गा उपासना व घटस्थापना का शुभारंभ।"
  },
  {
    nameEn: "Maha Navami / Durga Navami",
    nameHi: "महानवमी / दुर्गा नवमी",
    category: "major",
    lunarMonth: "Ashvina",
    paksha: "Shukla",
    tithi: "Navami",
    descriptionEn: "Ninth day of Navratri, Ayudha Puja and Kanya Pujan.",
    descriptionHi: "माँ सिद्धिदात्री पूजा, आयुध पूजा एवं कन्या पूजन।"
  },
  {
    nameEn: "Dussehra / Vijayadashami",
    nameHi: "दशहरा / विजयादशमी",
    category: "major",
    lunarMonth: "Ashvina",
    paksha: "Shukla",
    tithi: "Dashami",
    descriptionEn: "Victory of Good over Evil: Lord Rama's victory over Ravana and Goddess Durga's over Mahishasura.",
    descriptionHi: "अधर्म पर धर्म की विजय का महान पर्व।"
  },
  {
    nameEn: "Sharad Purnima / Kojagari Vrat",
    nameHi: "शरद पूर्णिमा / कोजागरी व्रत",
    category: "major",
    lunarMonth: "Ashvina",
    paksha: "Shukla",
    tithi: "Purnima",
    descriptionEn: "Night when the Moon displays all 16 kalas; Goddess Lakshmi bestows prosperity.",
    descriptionHi: "१६ कलाओं से युक्त चंद्रमा की धवल चाँदनी एवं माँ लक्ष्मी की कृपा का पर्व।"
  },
  {
    nameEn: "Karwa Chauth",
    nameHi: "करवा चौथ",
    category: "vrat",
    lunarMonth: "Ashvina",
    paksha: "Krishna",
    tithi: "Chaturthi",
    descriptionEn: "Sacred fast observed by married women for the husband's long life and well-being.",
    descriptionHi: "सुहागिनों द्वारा पति की दीर्घायु हेतु अर्घ्य देकर रखा जाने वाला परम पवित्र व्रत।"
  },

  // Kartika (October - November)
  {
    nameEn: "Dhanteras / Dhanvantari Jayanti",
    nameHi: "धनतेरस / धन्वंतरि जयंती",
    category: "major",
    lunarMonth: "Kartika",
    paksha: "Krishna",
    tithi: "Trayodashi",
    descriptionEn: "Beginning of 5-day Diwali festivities; worship of Lord Dhanvantari and Goddess Lakshmi.",
    descriptionHi: "दीपावली का प्रथम दिन, भगवान धन्वंतरि पूजन व धातु क्रय का शुभ दिन।"
  },
  {
    nameEn: "Naraka Chaturdashi / Chhoti Diwali",
    nameHi: "नरक चतुर्दशी / छोटी दिवाली",
    category: "major",
    lunarMonth: "Kartika",
    paksha: "Krishna",
    tithi: "Chaturdashi",
    descriptionEn: "Celebration of victory over Narakasura; Abhyanga Snan.",
    descriptionHi: "अभ्यंग स्नान, यम दीपदान एवं छोटी दीपावली।"
  },
  {
    nameEn: "Diwali / Lakshmi Puja",
    nameHi: "दीपावली / लक्ष्मी पूजन",
    category: "major",
    lunarMonth: "Kartika",
    paksha: "Krishna",
    tithi: "Amavasya",
    descriptionEn: "Festival of Lights celebrating Lord Rama's return to Ayodhya and Goddess Lakshmi Puja.",
    descriptionHi: "रोशनी का महापर्व, श्री लक्ष्मी-गणेश पूजन व राम आगमन उत्सव।"
  },
  {
    nameEn: "Govardhan Puja / Annakut",
    nameHi: "गोवर्धन पूजा / अन्नकूट",
    category: "major",
    lunarMonth: "Kartika",
    paksha: "Shukla",
    tithi: "Pratipada",
    descriptionEn: "Lord Krishna's lifting of Govardhan Hill to protect the people of Vrindavan.",
    descriptionHi: "भगवान श्री कृष्ण द्वारा गोवर्धन पर्वत धारण करने की लीला का उत्सव।"
  },
  {
    nameEn: "Bhai Dooj / Yama Dwitiya",
    nameHi: "भैया दूज / यम द्वितीया",
    category: "major",
    lunarMonth: "Kartika",
    paksha: "Shukla",
    tithi: "Dwitiya",
    descriptionEn: "Celebration of sibling affection and Yama-Yamuna tradition.",
    descriptionHi: "भाई-बहन के स्नेह व यमराज-यमुना जी के पूजन का शुभ पर्व।"
  },
  {
    nameEn: "Chhath Puja (Surya Shashthi)",
    nameHi: "छठ पूजा (सूर्य षष्ठी)",
    category: "major",
    lunarMonth: "Kartika",
    paksha: "Shukla",
    tithi: "Shashti",
    descriptionEn: "Grand 4-day festival dedicated to Sun God (Surya Dev) and Chhathi Maiya.",
    descriptionHi: "भगवान सूर्य देव एवं छठी मइया का अति पावन ४ दिवसीय महापर्व।"
  },
  {
    nameEn: "Gopashtami",
    nameHi: "गोपाष्टमी",
    category: "vrat",
    lunarMonth: "Kartika",
    paksha: "Shukla",
    tithi: "Ashtami",
    descriptionEn: "Worship and honor of Cows (Gou Mata) and Lord Krishna.",
    descriptionHi: "गौ माता की सेवा, पूजन एवं संरक्षण का पवित्र दिन।"
  },
  {
    nameEn: "Devutthana Ekadashi / Tulsi Vivah",
    nameHi: "देवउठनी एकादशी / तुलसी विवाह",
    category: "major",
    lunarMonth: "Kartika",
    paksha: "Shukla",
    tithi: "Ekadashi",
    descriptionEn: "Lord Vishnu awakens from sleep; beginning of auspicious wedding season and Tulsi Vivah.",
    descriptionHi: "भगवान विष्णु का योगनिद्रा से जागरण, मांगलिक कार्यों का शुभारंभ व तुलसी विवाह।"
  },
  {
    nameEn: "Kartik Purnima / Dev Diwali",
    nameHi: "कार्तिक पूर्णिमा / देव दीपावली",
    category: "major",
    lunarMonth: "Kartika",
    paksha: "Shukla",
    tithi: "Purnima",
    descriptionEn: "Grand lighting of lamps on Varanasi ghats; Tripura Purnima.",
    descriptionHi: "काशी के घाटों पर देव दीपावली उत्सव एवं पवित्र नदी स्नान।"
  },

  // Margashirsha (November - December)
  {
    nameEn: "Gita Jayanti",
    nameHi: "गीता जयंती",
    category: "jayanti",
    lunarMonth: "Margashirsha",
    paksha: "Shukla",
    tithi: "Ekadashi",
    descriptionEn: "Commemorates the day Lord Krishna delivered Bhagavad Gita to Arjuna at Kurukshetra.",
    descriptionHi: "भगवान श्री कृष्ण द्वारा कुरुक्षेत्र में श्रीमद्भगवद्गीता ज्ञानोपदेश दिवस।"
  },

  // Pausha (December - January)
  {
    nameEn: "Pausha Putrada Ekadashi",
    nameHi: "पौष पुत्रदा एकादशी",
    category: "vrat",
    lunarMonth: "Pausha",
    paksha: "Shukla",
    tithi: "Ekadashi",
    descriptionEn: "Ekadashi fast for family prosperity and noble offspring.",
    descriptionHi: "संतान सुख व वंश वृद्धि हेतु पौष मास का एकादशी व्रत।"
  },

  // Magha (January - February)
  {
    nameEn: "Mauni Amavasya",
    nameHi: "मौनी अमावस्या",
    category: "major",
    lunarMonth: "Magha",
    paksha: "Krishna",
    tithi: "Amavasya",
    descriptionEn: "Holy dip at Triveni Sangam Prayagraj and silent contemplation (Mauna Vrat).",
    descriptionHi: "प्रयागराज संगम स्नान, मौन व्रत व दान-पुण्य का महायोग।"
  },
  {
    nameEn: "Vasant Panchami / Saraswati Puja",
    nameHi: "बसंत पंचमी / सरस्वती पूजा",
    category: "major",
    lunarMonth: "Magha",
    paksha: "Shukla",
    tithi: "Panchami",
    descriptionEn: "Arrival of spring and worship of Goddess Saraswati, deity of knowledge and arts.",
    descriptionHi: "ज्ञान, कला एवं संगीत की देवी माँ सरस्वती की उपासना व वसंत ऋतु का आगमन।"
  },
  {
    nameEn: "Jaya Ekadashi",
    nameHi: "जया एकादशी",
    category: "vrat",
    lunarMonth: "Magha",
    paksha: "Shukla",
    tithi: "Ekadashi",
    descriptionEn: "Fast observed to eradicate sins and achieve victory over challenges.",
    descriptionHi: "समस्त पापों का नाश कर विजय प्रदान करने वाला पावन एकादशी व्रत।"
  },

  // Phalguna (February - March)
  {
    nameEn: "Maha Shivaratri",
    nameHi: "महाशिवरात्रि",
    category: "major",
    lunarMonth: "Phalguna",
    paksha: "Krishna",
    tithi: "Chaturdashi",
    descriptionEn: "Great night of Lord Shiva celebrating the divine union of Shiva and Shakti.",
    descriptionHi: "भगवान शिव और माता पार्वती के दिव्य विवाह व शिव पूजन का महासंयोग।"
  },
  {
    nameEn: "Holika Dahan",
    nameHi: "होलिका दहन",
    category: "major",
    lunarMonth: "Phalguna",
    paksha: "Shukla",
    tithi: "Chaturdashi",
    descriptionEn: "Bonfire symbolizing the triumph of Prahlada's devotion over evil Holika.",
    descriptionHi: "भक्त प्रहलाद की भक्ति की विजय एवं असुरी शक्तियों का अंत।"
  },
  {
    nameEn: "Holi (Dhulandi)",
    nameHi: "होली (धुलंडी)",
    category: "major",
    lunarMonth: "Phalguna",
    paksha: "Shukla",
    tithi: "Purnima",
    descriptionEn: "Vibrant festival of colors celebrating love, spring, and joy.",
    descriptionHi: "रंगों, उल्लास और प्रेम का लोकपर्व।"
  }
];

// Determine recurring monthly Vrats & Observances based on daily Panchang elements
export function getRecurringVrats(p: PanchangData): Festival[] {
  const vrats: Festival[] = [];
  const tithi = p.tithi;
  const paksha = p.paksha;

  // 1. Ekadashi Vrat (11th Tithi)
  if (tithi === "Ekadashi") {
    vrats.push({
      id: `ekadashi-${paksha}`,
      nameEn: `${paksha} Ekadashi Vrat`,
      nameHi: `${p.pakshaSanskrit} एकादशी व्रत`,
      category: "vrat",
      descriptionEn: "Sacred fast dedicated to Lord Vishnu for spiritual purification and freedom from sins.",
      descriptionHi: "भगवान विष्णु को समर्पित समस्त पापों का शमन करने वाला पवित्र व्रत।"
    });
  }

  // 2. Pradosh Vrat (13th Tithi - Trayodashi)
  if (tithi === "Trayodashi") {
    vrats.push({
      id: `pradosh-${paksha}`,
      nameEn: `Pradosh Vrat (${paksha})`,
      nameHi: `प्रदोष व्रत (${p.pakshaSanskrit})`,
      category: "vrat",
      descriptionEn: "Twilight worship of Lord Shiva during Pradosh Kaal for fulfilling desires and peace.",
      descriptionHi: "संध्याकाल में भगवान शिव और माता पार्वती की उपासना का मंगलकारी व्रत।"
    });
  }

  // 3. Masa Shivaratri (14th Tithi Krishna Paksha)
  if (tithi === "Chaturdashi" && paksha === "Krishna") {
    vrats.push({
      id: "masik-shivaratri",
      nameEn: "Masik Shivaratri",
      nameHi: "मासिक शिवरात्रि",
      category: "vrat",
      descriptionEn: "Monthly night of Lord Shiva worship held on Krishna Paksha Chaturdashi.",
      descriptionHi: "प्रत्येक माह की कृष्ण पक्ष चतुर्दशी को शिव कृपा प्राप्ति हेतु रात्रि जागरण व पूजा।"
    });
  }

  // 4. Sankashti / Vinayaka Chaturthi
  if (tithi === "Chaturthi") {
    if (paksha === "Krishna") {
      vrats.push({
        id: "sankashti-chaturthi",
        nameEn: "Sankashti Chaturthi Vrat",
        nameHi: "संकष्टी चतुर्थी व्रत",
        category: "vrat",
        descriptionEn: "Moonrise worship of Lord Ganesha for removing obstacles and distress.",
        descriptionHi: "विघ्नहर्ता श्री गणेश जी का संकटनाशक व्रत एवं चंद्र दर्शन अर्घ्य।"
      });
    } else {
      vrats.push({
        id: "vinayaka-chaturthi",
        nameEn: "Vinayaka Chaturthi Vrat",
        nameHi: "विनायक चतुर्थी व्रत",
        category: "vrat",
        descriptionEn: "Midday worship of Lord Ganesha for wisdom and prosperity.",
        descriptionHi: "ज्ञान और बुद्धि के दाता श्री गणेश जी की मध्याह्न पूजा का पावन दिन।"
      });
    }
  }

  // 5. Purnima (Full Moon)
  if (tithi === "Purnima") {
    vrats.push({
      id: "purnima-vrat",
      nameEn: "Purnima Vrat / Satyanarayan Puja",
      nameHi: "पूर्णिमा व्रत / सत्यनारायण कथा",
      category: "vrat",
      descriptionEn: "Auspicious day for Lord Satyanarayan Katha, holy dip, and moon worship.",
      descriptionHi: "भगवान सत्यनारायण स्वामी की कथा, पूजन व पूर्णिमा स्नान-दान।"
    });
  }

  // 6. Amavasya (New Moon)
  if (tithi === "Amavasya") {
    vrats.push({
      id: "amavasya-tarpana",
      nameEn: "Amavasya Pitru Tarpana",
      nameHi: "अमावस्या पितृ तर्पण",
      category: "vrat",
      descriptionEn: "Sacred day for Ancestral Homage (Pitru Tarpan), charity, and spiritual reflection.",
      descriptionHi: "पितरों के निमित्त तर्पण, श्राद्ध एवं दान-पुण्य हेतु अति फलदायी तिथि।"
    });
  }

  // 7. Durgashtami (8th Tithi Shukla Paksha)
  if (tithi === "Ashtami" && paksha === "Shukla") {
    vrats.push({
      id: "masik-durgashtami",
      nameEn: "Masik Durgashtami",
      nameHi: "मासिक दुर्गाष्टमी",
      category: "vrat",
      descriptionEn: "Monthly worship of Goddess Durga for courage and protection from ill energies.",
      descriptionHi: "भगवती शक्ति की साधना एवं संकट निवारण हेतु मासिक दुर्गाष्टमी व्रत।"
    });
  }

  // 8. Rohini Vrat (When Moon Nakshatra is Rohini)
  if (p.nakshatra === "Rohini") {
    vrats.push({
      id: "rohini-vrat",
      nameEn: "Rohini Vrat",
      nameHi: "रोहिणी व्रत",
      category: "vrat",
      descriptionEn: "Fasting observed on Rohini Nakshatra day for harmony and peace.",
      descriptionHi: "रोहिणी नक्षत्र योग में रखा जाने वाला शांतिदायी पावन व्रत।"
    });
  }

  return vrats;
}

// Function to get all festivals/vrats active on a specific date given PanchangData
export function getFestivalsForDate(dateKey: string, p: PanchangData): Festival[] {
  const result: Festival[] = [];
  const pMonth = p.lunarMonth || "";
  const pPaksha = p.paksha || "";
  const pTithi = p.tithi || "";

  // 1. Check Major Annual Festivals matching month, paksha, tithi
  for (const f of MAJOR_ANNUAL_FESTIVALS) {
    if (f.dateStr && f.dateStr === dateKey) {
      result.push({
        id: `fest-${dateKey}-${f.nameEn.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
        ...f
      });
      continue;
    }

    if (f.lunarMonth && f.paksha && f.tithi) {
      // Normalize comparison (check if lunarMonth contains or matches)
      const monthMatch = pMonth.toLowerCase().includes(f.lunarMonth.toLowerCase()) ||
        f.lunarMonth.toLowerCase().includes(pMonth.toLowerCase());

      const pakshaMatch = pPaksha === f.paksha;
      const tithiMatch = pTithi === f.tithi;

      if (monthMatch && pakshaMatch && tithiMatch) {
        result.push({
          id: `fest-${f.lunarMonth.toLowerCase()}-${f.paksha.toLowerCase()}-${f.tithi.toLowerCase()}`,
          ...f
        });
      }
    }
  }

  // 2. Add recurring Vrats
  const vrats = getRecurringVrats(p);
  for (const v of vrats) {
    // Avoid duplication if major festival already covers it
    if (!result.some(r => r.nameEn.toLowerCase().includes(v.nameEn.toLowerCase()))) {
      result.push(v);
    }
  }

  return result;
}
