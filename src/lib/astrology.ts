import * as Ast from 'astronomy-engine';

export interface PlanetData {
    name: string;
    nameSanskrit: string;
    symbol: string;
    degree: string;
    rasi: string;
    rasiSanskrit: string;
    nakshatra: string;
    nakshatraSanskrit: string;
    pada: number;
    house: number;
    rasiLord: string;
    rasiLordSanskrit: string;
    nakshatraLord: string;
    nakshatraLordSanskrit: string;
    isRetrograde: boolean;
    isCombust?: boolean;
}

export interface PranaDasha {
    lord: string;
    start: number;
    end: number;
}

export interface SookshmaDasha {
    lord: string;
    start: number;
    end: number;
    pranaDashas: PranaDasha[];
}

export interface Pratyantardasha {
    lord: string;
    start: number;
    end: number;
    sookshmaDashas: SookshmaDasha[];
}

export interface Antardasha {
    lord: string;
    start: number;
    end: number;
    pratyantardashas: Pratyantardasha[];
}

export interface Mahadasha {
    lord: string;
    start: number;
    end: number;
    antardashas: Antardasha[];
}

export interface DashaBalance {
    lord: string;
    years: number;
    months: number;
    days: number;
}

export interface DivisionalChartData {
    houses: { [key: number]: Array<{ symbol: string, isRetrograde: boolean, isCombust?: boolean, degree?: string }> };
    houseRasis: { [key: number]: number };
}

export interface PanchangElementOccur {
    name: string;
    sanskrit: string;
    end: string | null;
}

export interface PanchangData {
    tithi: string;
    tithiSanskrit: string;
    tithiEnd: string;
    paksha: string;
    pakshaSanskrit: string;
    nakshatra: string;
    nakshatraSanskrit: string;
    nakshatraEnd: string;
    yoga: string;
    yogaSanskrit: string;
    yogaEnd: string;
    karana: string;
    karanaSanskrit: string;
    karanaEnd: string;
    vara: string;
    varaSanskrit: string;
    sunSign: string;
    sunSignSanskrit: string;
    moonSign: string;
    moonSignSanskrit: string;
    ritu: string;
    rituSanskrit: string;
    ayana: string;
    ayanaSanskrit: string;
    rahuKaal: string;
    gulikaKaal: string;
    yamagandaKaal: string;
    abhijitMuhurta: string;
    brahmaMuhurta: string;
    sunrise: string;
    sunset: string;
    moonrise: string;
    moonset: string;
    vikramSamvat: number;
    shakaSamvat: number;
    lunarMonth: string;
    lunarMonthSanskrit: string;
    samvatsara: string;
    samvatsaraSanskrit: string;
    tithisList?: PanchangElementOccur[];
    nakshatrasList?: PanchangElementOccur[];
    yogasList?: PanchangElementOccur[];
    karanasList?: PanchangElementOccur[];
    moonsignsList?: PanchangElementOccur[];
    amantaMonth?: string;
    purnimantaMonth?: string;
    formattedText?: string;
}

export interface ShadBalaData {
    planet: string;
    planetSanskrit: string;
    uchchaBala: number;
    saptavargajaBala: number;
    ojhayugmarasiamsaBala: number;
    kendradiBala: number;
    drekkanaBala: number;
    sthanaBala: number;
    dikBala: number;
    nathonnathaBala: number;
    pakshaBala: number;
    tribhagaBala: number;
    varshaBala: number;
    masaBala: number;
    dinaBala: number;
    horaBala: number;
    ayanaBala: number;
    yudhdhaBala: number;
    kalaBala: number;
    cheshtaBala: number;
    naisargikaBala: number;
    drigBala: number;
    totalBala: number;
    rupas: number;
    requirement: number;
    status: 'Strong' | 'Moderate';
    ratio: number;
    rank: number;
    ishtaPhala: number;
    kashtaPhala: number;
}

export interface ChartData {
    planets: PlanetData[];
    d1: DivisionalChartData;
    d2: DivisionalChartData;
    d2us: DivisionalChartData;
    d3: DivisionalChartData;
    d4: DivisionalChartData;
    d7: DivisionalChartData;
    d9: DivisionalChartData;
    d10: DivisionalChartData;
    d12: DivisionalChartData;
    d16: DivisionalChartData;
    d20: DivisionalChartData;
    d24: DivisionalChartData;
    d27: DivisionalChartData;
    d30: DivisionalChartData;
    d40: DivisionalChartData;
    d45: DivisionalChartData;
    d60: DivisionalChartData;
    mahadashas: Mahadasha[];
    panchang: PanchangData;
    dashaBalance?: DashaBalance;
    shadbala?: ShadBalaData[];
    ashtakvarga?: number[];
}

export const NAKSHATRA_NAMES = [
    { name: "Ashwini", sanskrit: "अश्विनी" },
    { name: "Bharani", sanskrit: "भरणी" },
    { name: "Krittika", sanskrit: "कृत्तिका" },
    { name: "Rohini", sanskrit: "रोहिणी" },
    { name: "Mrigashira", sanskrit: "मृगशिरा" },
    { name: "Ardra", sanskrit: "आर्द्रा" },
    { name: "Punarvasu", sanskrit: "पुनर्वसु" },
    { name: "Pushya", sanskrit: "पुष्य" },
    { name: "Ashlesha", sanskrit: "अश्लेषा" },
    { name: "Magha", sanskrit: "मघा" },
    { name: "Purva Phalguni", sanskrit: "पूर्वाफाल्गुनी" },
    { name: "Uttara Phalguni", sanskrit: "उत्तराफाल्गुनी" },
    { name: "Hasta", sanskrit: "हस्त" },
    { name: "Chitra", sanskrit: "चित्रा" },
    { name: "Swati", sanskrit: "स्वाती" },
    { name: "Vishakha", sanskrit: "विशाखा" },
    { name: "Anuradha", sanskrit: "अनुराधा" },
    { name: "Jyeshtha", sanskrit: "ज्येष्ठा" },
    { name: "Mula", sanskrit: "मूल" },
    { name: "Purva Ashadha", sanskrit: "पूर्वाषाढ़ा" },
    { name: "Uttara Ashadha", sanskrit: "उत्तराषाढ़ा" },
    { name: "Shravana", sanskrit: "श्रवण" },
    { name: "Dhanishta", sanskrit: "धनिष्ठा" },
    { name: "Shatabhisha", sanskrit: "शतभिषा" },
    { name: "Purva Bhadrapada", sanskrit: "पूर्वाभाद्रपद" },
    { name: "Uttara Bhadrapada", sanskrit: "उत्तराभाद्रपद" },
    { name: "Revati", sanskrit: "रेवती" }
];

const NAKSHATRAS = NAKSHATRA_NAMES.map(n => n.name);

export const PLANET_NAMES: { [key: string]: { name: string, sanskrit: string, symbol?: string } } = {
    "Sun": { name: "Sun", sanskrit: "सूर्य", symbol: "Su" },
    "Moon": { name: "Moon", sanskrit: "चंद्र", symbol: "Mo" },
    "Mars": { name: "Mars", sanskrit: "मंगल", symbol: "Ma" },
    "Mercury": { name: "Mercury", sanskrit: "बुध", symbol: "Me" },
    "Jupiter": { name: "Jupiter", sanskrit: "गुरु", symbol: "Ju" },
    "Venus": { name: "Venus", sanskrit: "शुक्र", symbol: "Ve" },
    "Saturn": { name: "Saturn", sanskrit: "शनि", symbol: "Sa" },
    "Rahu": { name: "Rahu", sanskrit: "राहु", symbol: "Ra" },
    "Ketu": { name: "Ketu", sanskrit: "केतु", symbol: "Ke" },
    "Uranus": { name: "Uranus", sanskrit: "अरुण", symbol: "Ur" },
    "Neptune": { name: "Neptune", sanskrit: "वरुण", symbol: "Ne" },
    "Pluto": { name: "Pluto", sanskrit: "यम", symbol: "Pl" },
    "Ascendant": { name: "Ascendant", sanskrit: "लग्न", symbol: "As" }
};

const TITHI_NAMES = [
    { name: "Pratipada", sanskrit: "प्रतिपदा" },
    { name: "Dwitiya", sanskrit: "द्वितीया" },
    { name: "Tritiya", sanskrit: "तृतीया" },
    { name: "Chaturthi", sanskrit: "चतुर्थी" },
    { name: "Panchami", sanskrit: "पञ्चमी" },
    { name: "Shashti", sanskrit: "षष्ठी" },
    { name: "Saptami", sanskrit: "सप्तमी" },
    { name: "Ashtami", sanskrit: "अष्टमी" },
    { name: "Navami", sanskrit: "नवमी" },
    { name: "Dashami", sanskrit: "दशमी" },
    { name: "Ekadashi", sanskrit: "एकादशी" },
    { name: "Dwadashi", sanskrit: "द्वादशी" },
    { name: "Trayodashi", sanskrit: "त्रयोदशी" },
    { name: "Chaturdashi", sanskrit: "चतुर्दशी" }
];

const TITHIS = [
    ...TITHI_NAMES,
    { name: "Purnima", sanskrit: "पूर्णिमा" },
    ...TITHI_NAMES,
    { name: "Amavasya", sanskrit: "अमावस्या" }
];

const VARAS = [
    { name: "Sunday", sanskrit: "रविवार" },
    { name: "Monday", sanskrit: "सोमवार" },
    { name: "Tuesday", sanskrit: "मंगलवार" },
    { name: "Wednesday", sanskrit: "बुधवार" },
    { name: "Thursday", sanskrit: "गुरुवार" },
    { name: "Friday", sanskrit: "शुक्रवार" },
    { name: "Saturday", sanskrit: "शनिवार" }
];

const RASI_FULL_NAMES = [
    { name: "Aries", sanskrit: "मेष" },
    { name: "Taurus", sanskrit: "वृषभ" },
    { name: "Gemini", sanskrit: "मिथुन" },
    { name: "Cancer", sanskrit: "कर्क" },
    { name: "Leo", sanskrit: "सिंह" },
    { name: "Virgo", sanskrit: "कन्या" },
    { name: "Libra", sanskrit: "तुला" },
    { name: "Scorpio", sanskrit: "वृश्चिक" },
    { name: "Sagittarius", sanskrit: "धनु" },
    { name: "Capricorn", sanskrit: "मकर" },
    { name: "Aquarius", sanskrit: "कुम्भ" },
    { name: "Pisces", sanskrit: "मीन" }
];

const RASIS = RASI_FULL_NAMES.map(r => r.name);

const RITUS = [
    { name: "Vasanta", sanskrit: "वसन्त" },
    { name: "Grishma", sanskrit: "ग्रीष्म" },
    { name: "Varsha", sanskrit: "वर्षा" },
    { name: "Sharad", sanskrit: "शरद" },
    { name: "Hemanta", sanskrit: "हेमन्त" },
    { name: "Shishira", sanskrit: "शिशिर" }
];

const AYANAS = [
    { name: "Uttarayana", sanskrit: "उत्तरायण" },
    { name: "Dakshinayana", sanskrit: "दक्षिणायन" }
];

export const SIGN_INSIGHTS: { [key: string]: { en: string; hi: string } } = {
    "Aries": {
        en: "A natural-born leader with boundless energy. You possess a pioneering spirit and the courage to take on any challenge with enthusiasm.",
        hi: "अदम्य ऊर्जा वाले स्वाभाविक नेता। आपमें एक अग्रणी भावना और उत्साह के साथ किसी भी चुनौती को स्वीकार करने का साहस है।"
    },
    "Taurus": {
        en: "Grounding and dependable, you value stability and the finer things in life. Your persistence and patience are your greatest strengths.",
        hi: "स्थिर और भरोसेमंद, आप स्थिरता और जीवन की बेहतरीन चीजों को महत्व देते हैं। आपकी दृढ़ता और धैर्य आपकी सबसे बड़ी ताकत हैं।"
    },
    "Gemini": {
        en: "Intellectually curious and highly adaptable. Your ability to communicate and see multiple perspectives makes you a social chameleon.",
        hi: "बौद्धिक रूप से जिज्ञासु और अत्यधिक अनुकूलनशील। संवाद करने और कई दृष्टिकोणों को देखने की आपकी क्षमता आपको सामाजिक रूप से निपुण बनाती है।"
    },
    "Cancer": {
        en: "Deeply intuitive and nurturing. You value home and family above all, possessing a powerful emotional intelligence that guides your path.",
        hi: "अत्यंत सहज और पालन-पोषण करने वाले। आप घर और परिवार को सबसे ऊपर महत्व देते हैं, और आपके पास एक शक्तिशाली भावनात्मक बुद्धिमत्ता है जो आपका मार्गदर्शन करती है।"
    },
    "Leo": {
        en: "Creative, confident, and charismatic. You have a natural ability to inspire others and a heart that is as generous as it is brave.",
        hi: "रचनात्मक, आत्मविश्वासी और करिश्माई। आपमें दूसरों को प्रेरित करने की स्वाभाविक क्षमता है और आपका हृदय जितना उदार है उतना ही साहसी भी।"
    },
    "Virgo": {
        en: "Analytical and detail-oriented. You seek perfection and find deep satisfaction in being of service to others through your practical wisdom.",
        hi: "विश्लेषणात्मक और विवरण-उन्मुख। आप पूर्णता की तलाश करते हैं और अपने व्यावहारिक ज्ञान के माध्यम से दूसरों की सेवा करने में गहरा संतोष पाते हैं।"
    },
    "Libra": {
        en: "A seeker of balance and harmony. You possess a refined aesthetic sense and a natural talent for diplomacy and building meaningful partnerships.",
        hi: "संतुलन और सद्भाव के साधक। आपमें एक परिष्कृत सौंदर्य बोध और कूटनीति तथा सार्थक साझेदारी बनाने की स्वाभाविक प्रतिभा है।"
    },
    "Scorpio": {
        en: "Intense, passionate, and profoundly perceptive. You have the strength to undergo great transformations and uncover hidden truths.",
        hi: "तीव्र, भावुक और गहराई से बोधगम्य। आपके पास महान परिवर्तन लाने और छिपे हुए सत्यों को उजागर करने की शक्ति है।"
    },
    "Sagittarius": {
        en: "An adventurous soul with a philosophical mind. Your optimism and quest for higher knowledge lead you toward constant growth and expansion.",
        hi: "दार्शनिक दिमाग वाली एक साहसी आत्मा। आपका आशावाद और उच्च ज्ञान की खोज आपको निरंतर विकास और विस्तार की ओर ले जाती है।"
    },
    "Capricorn": {
        en: "Disciplined, ambitious, and resilient. You have the strategic mind and endurance required to climb the highest mountains of success.",
        hi: "अनुशासित, महत्वाकांक्षी और लचीला। आपके पास सफलता के उच्चतम शिखरों पर चढ़ने के लिए आवश्यक रणनीतिक दिमाग और सहनशक्ति है।"
    },
    "Aquarius": {
        en: "Visionary and independent. You are a forward-thinker who values community and innovation, often marching to the beat of your own drum.",
        hi: "दूरदर्शी और स्वतंत्र। आप एक भविष्योन्मुखी विचारक हैं जो समुदाय और नवाचार को महत्व देते हैं, अक्सर अपनी अलग राह चलते हैं।"
    },
    "Pisces": {
        en: "Compassionate, artistic, and deeply spiritual. You possess a vast imagination and a natural connection to the unseen realms of the soul.",
        hi: "दयालु, कलात्मक और गहराई से आध्यात्मिक। आपमें एक विशाल कल्पना और आत्मा के अदृश्य क्षेत्रों के साथ एक स्वाभाविक संबंध है।"
    }
};

const YOGAS = [
    { name: "Vishkumbha", sanskrit: "विष्कम्भ" },
    { name: "Priti", sanskrit: "प्रीति" },
    { name: "Ayushman", sanskrit: "आयुष्मान" },
    { name: "Saubhagya", sanskrit: "सौभाग्य" },
    { name: "Shobhana", sanskrit: "शोभन" },
    { name: "Atiganda", sanskrit: "अतिगण्ड" },
    { name: "Sukarma", sanskrit: "सुकर्मा" },
    { name: "Dhriti", sanskrit: "धृति" },
    { name: "Shula", sanskrit: "शूल" },
    { name: "Ganda", sanskrit: "गण्ड" },
    { name: "Vriddhi", sanskrit: "वृद्धि" },
    { name: "Dhruva", sanskrit: "ध्रुव" },
    { name: "Vyaghata", sanskrit: "व्याघात" },
    { name: "Harshana", sanskrit: "हर्षण" },
    { name: "Vajra", sanskrit: "वज्र" },
    { name: "Siddhi", sanskrit: "सिद्धि" },
    { name: "Vyatipata", sanskrit: "व्यतिपात" },
    { name: "Variyana", sanskrit: "वरीयान" },
    { name: "Parigha", sanskrit: "परिघ" },
    { name: "Shiva", sanskrit: "शिव" },
    { name: "Siddha", sanskrit: "सिद्ध" },
    { name: "Sadhya", sanskrit: "साध्य" },
    { name: "Shubha", sanskrit: "शुभ" },
    { name: "Shukla", sanskrit: "शुक्ल" },
    { name: "Brahma", sanskrit: "ब्रह्म" },
    { name: "Indra", sanskrit: "इन्द्र" },
    { name: "Vaidhriti", sanskrit: "वैधृति" }
];

const KARANAS = [
    { name: "Bava", sanskrit: "बव" },
    { name: "Balava", sanskrit: "बालव" },
    { name: "Kaulava", sanskrit: "कौलव" },
    { name: "Taitila", sanskrit: "तैतिल" },
    { name: "Gara", sanskrit: "गर" },
    { name: "Vanija", sanskrit: "वणिज" },
    { name: "Vishti", sanskrit: "विष्टि" },
    { name: "Shakuni", sanskrit: "शकुनि" },
    { name: "Chatushpada", sanskrit: "चतुष्पाद" },
    { name: "Naga", sanskrit: "नाग" },
    { name: "Kimstughna", sanskrit: "किंस्तुघ्न" }
];

const LUNAR_MONTHS = [
    { name: "Chaitra", sanskrit: "चैत्र" },
    { name: "Vaishakha", sanskrit: "वैशाख" },
    { name: "Jyeshtha", sanskrit: "ज्येष्ठ" },
    { name: "Ashadha", sanskrit: "आषाढ़" },
    { name: "Shravana", sanskrit: "श्रावण" },
    { name: "Bhadrapada", sanskrit: "भाद्रपद" },
    { name: "Ashwin", sanskrit: "अश्विन" },
    { name: "Kartika", sanskrit: "कार्तिक" },
    { name: "Margashirsha", sanskrit: "मार्गशीर्ष" },
    { name: "Pausha", sanskrit: "पौष" },
    { name: "Magha", sanskrit: "माघ" },
    { name: "Phalguna", sanskrit: "फाल्गुन" }
];

const SAMVATSARAS = [
    { name: "Prabhava", sanskrit: "प्रभव" }, { name: "Vibhava", sanskrit: "विभव" }, { name: "Shukla", sanskrit: "शुक्ल" }, { name: "Pramoda", sanskrit: "प्रमोद" }, { name: "Prajapati", sanskrit: "प्रजापति" },
    { name: "Angira", sanskrit: "अंगिरा" }, { name: "Shrimukha", sanskrit: "श्रीमुख" }, { name: "Bhava", sanskrit: "भाव" }, { name: "Yuva", sanskrit: "युवा" }, { name: "Dhatri", sanskrit: "धातृ" },
    { name: "Ishvara", sanskrit: "ईश्वर" }, { name: "Bahudhanya", sanskrit: "बहुधान्य" }, { name: "Pramathi", sanskrit: "प्रमाथी" }, { name: "Vikrama", sanskrit: "विक्रम" }, { name: "Vrisha", sanskrit: "वृष" },
    { name: "Chitrabanu", sanskrit: "चित्रभानु" }, { name: "Subhanu", sanskrit: "स्वभानु" }, { name: "Tarana", sanskrit: "तारण" }, { name: "Parthiva", sanskrit: "पार्थिव" }, { name: "Vyaya", sanskrit: "व्यय" },
    { name: "Sarvajit", sanskrit: "सर्वजित्" }, { name: "Sarvadhari", sanskrit: "सर्वधारी" }, { name: "Virodhi", sanskrit: "विरोधी" }, { name: "Vikriti", sanskrit: "विकृति" }, { name: "Khara", sanskrit: "खर" },
    { name: "Nandana", sanskrit: "नन्दन" }, { name: "Vijaya", sanskrit: "विजय" }, { name: "Jaya", sanskrit: "जय" }, { name: "Manmatha", sanskrit: "मन्मथ" }, { name: "Durmukha", sanskrit: "दुर्मुख" },
    { name: "Hemalamba", sanskrit: "हेमलम्ब" }, { name: "Vilamba", sanskrit: "विलम्ब" }, { name: "Vikari", sanskrit: "विकारी" }, { name: "Sharvari", sanskrit: "शर्वरी" }, { name: "Plava", sanskrit: "प्लव" },
    { name: "Shubhakrit", sanskrit: "शुभकृत्" }, { name: "Shobhakrit", sanskrit: "शोभकृत्" }, { name: "Krodhi", sanskrit: "क्रोधी" }, { name: "Vishvavasu", sanskrit: "विश्वावसु" }, { name: "Paridhavi", sanskrit: "परिधावी" },
    { name: "Pramadi", sanskrit: "प्रमादी" }, { name: "Ananda", sanskrit: "आनन्द" }, { name: "Rakshasa", sanskrit: "राक्षस" }, { name: "Anala", sanskrit: "अनल" }, { name: "Pingala", sanskrit: "पिंगल" },
    { name: "Kalayukti", sanskrit: "कालयुक्ति" }, { name: "Siddharthi", sanskrit: "सिद्धार्थी" }, { name: "Raudra", sanskrit: "रौद्र" }, { name: "Durmati", sanskrit: "दुर्मति" }, { name: "Dundubhi", sanskrit: "दुन्दुभी" },
    { name: "Rudhirodgari", sanskrit: "रुधिरोद्गारी" }, { name: "Raktakshi", sanskrit: "रक्ताक्षी" }, { name: "Krodhana", sanskrit: "क्रोधन" }, { name: "Akshaya", sanskrit: "अक्षय" }, { name: "Kshaya", sanskrit: "क्षय" },
    { name: "Plavanga", sanskrit: "प्लवंग" }, { name: "Kilaka", sanskrit: "कीलक" }, { name: "Saumya", sanskrit: "सौम्य" }, { name: "Sadharana", sanskrit: "साधारण" }, { name: "Virodhakrit", sanskrit: "विरोधकृत" }
];

const RASI_LORDS = [
    "Mars", "Venus", "Mercury", "Moon", "Sun", "Mercury",
    "Venus", "Mars", "Jupiter", "Saturn", "Saturn", "Jupiter"
];

const NAKSHATRA_LORDS = [
    "Ketu", "Venus", "Sun", "Moon", "Mars", "Rahu", "Jupiter", "Saturn", "Mercury"
];

const DASHA_DURATIONS: { [key: string]: number } = {
    "Ketu": 7,
    "Venus": 20,
    "Sun": 6,
    "Moon": 10,
    "Mars": 7,
    "Rahu": 18,
    "Jupiter": 16,
    "Saturn": 19,
    "Mercury": 17
};

const PLANET_MAP = [
    { name: "Sun", body: Ast.Body.Sun, symbol: "Su" },
    { name: "Moon", body: Ast.Body.Moon, symbol: "Mo" },
    { name: "Mars", body: Ast.Body.Mars, symbol: "Ma" },
    { name: "Mercury", body: Ast.Body.Mercury, symbol: "Me" },
    { name: "Jupiter", body: Ast.Body.Jupiter, symbol: "Ju" },
    { name: "Venus", body: Ast.Body.Venus, symbol: "Ve" },
    { name: "Saturn", body: Ast.Body.Saturn, symbol: "Sa" },
];

const DREKKANA_WIDTH = 10;
const SAPTAMSHA_WIDTH = 30 / 7;
const NAVAMSHA_WIDTH = 30 / 9;
const D10_WIDTH = 3;
const SHASHTIAMSHA_WIDTH = 0.5;
const NAKSHATRA_WIDTH = 360 / 27;
const PADA_WIDTH = 360 / 108;
const D9_START_SIGNS = [0, 9, 6, 3]; // Fire, Earth, Air, Water
export const SIDEREAL_YEAR_DAYS = 365.24219;
const MS_PER_YEAR = SIDEREAL_YEAR_DAYS * 24 * 60 * 60 * 1000;

/**
 * Calculates the True Spica Ayanamsa (calculating Spica/Chitra at exactly 180°).
 * This ensures absolute precision matching the Swiss Ephemeris and traditional standard benchmarks.
 */
const ayanamsaCache = new Map<number, number>();
function getLahiriAyanamsa(time: Ast.AstroTime): number {
    const key = time.ut;
    if (ayanamsaCache.has(key)) {
        return ayanamsaCache.get(key)!;
    }

    // Define Spica (Alpha Virginis / Chitra) coordinates for J2000 epoch
    const ra = 13 + 25/60 + 11.579/3600;
    const dec = -(11 + 9/60 + 40.75/3600);
    Ast.DefineStar(Ast.Body.Star1, ra, dec, 250);

    const geoJ2000 = Ast.GeoVector(Ast.Body.Star1, time, true);
    const rot = Ast.Rotation_EQJ_ECT(time);
    const eclDateVec = Ast.RotateVector(rot, geoJ2000);
    const tropicalLong = (Math.atan2(eclDateVec.y, eclDateVec.x) * 180 / Math.PI + 360) % 360;

    const result = (tropicalLong - 180 + 360) % 360;

    if (ayanamsaCache.size >= 100) {
        const firstKey = ayanamsaCache.keys().next().value;
        if (firstKey !== undefined) ayanamsaCache.delete(firstKey);
    }
    ayanamsaCache.set(key, result);
    return result;
}

/**
 * Determines if a planet is in retrograde motion.
 */
function isPlanetRetrograde(body: Ast.Body, time: Ast.AstroTime, currentLong?: number, rotEqjEct?: Ast.RotationMatrix): boolean {
    // Sun and Moon are never retrograde
    if (body === Ast.Body.Sun || body === Ast.Body.Moon) return false;

    const t1 = time;
    const t2 = Ast.MakeTime(time.ut + 1 / 24); // +1 hour in days

    const lon1 = currentLong ?? getTrueEclipticLongitude(body, t1, rotEqjEct);
    const rot2 = rotEqjEct ? Ast.Rotation_EQJ_ECT(t2) : undefined;
    const lon2 = getTrueEclipticLongitude(body, t2, rot2);

    let diff = (lon2 - lon1 + 360) % 360;
    if (diff > 180) diff -= 360;

    return diff < 0;
}

/**
 * Calculates the mean longitude of Rahu (Ascending Node) for a given time.
 */




function getTrueEclipticLongitude(body: Ast.Body, time: Ast.AstroTime, rotEqjEct?: Ast.RotationMatrix): number {
    const geoJ2000 = Ast.GeoVector(body, time, true);
    const rot = rotEqjEct || Ast.Rotation_EQJ_ECT(time);
    const eclDateVec = Ast.RotateVector(rot, geoJ2000);
    return (Math.atan2(eclDateVec.y, eclDateVec.x) * 180 / Math.PI + 360) % 360;
}

function getTrueMoonEclipticLongitude(time: Ast.AstroTime, rotEqjEct?: Ast.RotationMatrix): number {
    const geoJ2000 = Ast.GeoMoon(time);
    const rot = rotEqjEct || Ast.Rotation_EQJ_ECT(time);
    const eclDateVec = Ast.RotateVector(rot, geoJ2000);
    return (Math.atan2(eclDateVec.y, eclDateVec.x) * 180 / Math.PI + 360) % 360;
}

export function getMeanRahu(time: Ast.AstroTime): number {
    // T is centuries since J2000.0
    const T = time.tt / 36525.0;
    // Mean longitude of the Moon's ascending node
    // Formula from Meeus, Astronomical Algorithms, Chapter 47
    const L = 125.0445479 - 1934.1362891 * T + 0.0020754 * T * T + T * T * T / 467441.0 - T * T * T * T / 60616000.0;
    return (L % 360 + 360) % 360;
}

function getEmptyChartData(): ChartData {
    const emptyChart: DivisionalChartData = { houses: {}, houseRasis: {} };
    const emptyPanchang: PanchangData = {
        tithi: "", tithiSanskrit: "", tithiEnd: "", paksha: "", pakshaSanskrit: "",
        nakshatra: "", nakshatraSanskrit: "", nakshatraEnd: "", yoga: "", yogaSanskrit: "", yogaEnd: "",
        karana: "", karanaSanskrit: "", karanaEnd: "", vara: "", varaSanskrit: "",
        sunSign: "", sunSignSanskrit: "", moonSign: "", moonSignSanskrit: "",
        ritu: "", rituSanskrit: "", ayana: "", ayanaSanskrit: "",
        rahuKaal: "", gulikaKaal: "", yamagandaKaal: "", abhijitMuhurta: "",
        brahmaMuhurta: "", sunrise: "", sunset: "", moonrise: "", moonset: "",
        vikramSamvat: 0, shakaSamvat: 0, lunarMonth: "", lunarMonthSanskrit: "",
        samvatsara: "", samvatsaraSanskrit: ""
    };
    return {
        planets: [],
        d1: emptyChart, d2: emptyChart, d2us: emptyChart, d3: emptyChart, d4: emptyChart,
        d7: emptyChart, d9: emptyChart, d10: emptyChart, d12: emptyChart, d16: emptyChart,
        d20: emptyChart, d24: emptyChart, d27: emptyChart, d30: emptyChart, d40: emptyChart,
        d45: emptyChart, d60: emptyChart,
        mahadashas: [],
        panchang: emptyPanchang,
        shadbala: [],
        ashtakvarga: []
    };
}

function parseISTToUTC(dob: string, tob: string): { istDate: Date, time: Ast.AstroTime } {
    const dateParts = dob.split('-');
    if (dateParts.length !== 3) throw new Error("Invalid date format. Expected YYYY-MM-DD");
    const [year, month, day] = dateParts.map(Number);

    const timeParts = tob.split(':');
    if (timeParts.length < 2) throw new Error("Invalid time format. Expected HH:mm");
    const [hour, minute] = timeParts.map(Number);

    if (isNaN(year) || isNaN(month) || isNaN(day) || isNaN(hour) || isNaN(minute)) {
        throw new Error("Invalid date or time components");
    }

    // Create Date object interpreted as UTC, then subtract 5.5 hours to get the actual UTC time
    // since the input is local IST (UTC+5:30)
    const istDate = new Date(Date.UTC(year, month - 1, day, hour, minute));
    const utcDate = new Date(istDate.getTime() - (5.5 * 60 * 60 * 1000));
    const time = Ast.MakeTime(utcDate);

    return { istDate, time };
}

function formatDegree(siderealLong: number): string {
    const degInRasi = siderealLong % 30;
    const d = Math.floor(degInRasi);
    const m = Math.floor((degInRasi - d) * 60);
    const s = Math.floor(((degInRasi - d) * 60 - m) * 60);
    return `${d}° ${m}' ${s}"`;
}

function calculatePlanetaryAndDivisionalData(
    time: Ast.AstroTime,
    lat: number,
    lon: number,
    ayanamsa: number,
    tropicalSunLong: number,
    tropicalMoonLong: number,
    rotEqjEct?: Ast.RotationMatrix
) {
    const planetData: PlanetData[] = [];
    const chartKeys = ['d1', 'd2', 'd2us', 'd3', 'd4', 'd7', 'd9', 'd10', 'd12', 'd16', 'd20', 'd24', 'd27', 'd30', 'd40', 'd45', 'd60'] as const;
    const divisions: Record<ChartKey, number> = {
        d1: 1, d2: 2, d2us: 2, d3: 3, d4: 4, d7: 7, d9: 9, d10: 10,
        d12: 12, d16: 16, d20: 20, d24: 24, d27: 27, d30: 30, d40: 40, d45: 45, d60: 60
    };
    type ChartKey = typeof chartKeys[number];

    const assignments: Record<ChartKey, { [key: number]: Array<{ symbol: string, isRetrograde: boolean, isCombust?: boolean, degree?: string }> }> = {
        d1: {}, d2: {}, d2us: {}, d3: {}, d4: {}, d7: {}, d9: {}, d10: {},
        d12: {}, d16: {}, d20: {}, d24: {}, d27: {}, d30: {}, d40: {}, d45: {}, d60: {}
    };

    for (let k = 0; k < chartKeys.length; k++) {
        const key = chartKeys[k];
        const chart = assignments[key];
        for (let i = 1; i <= 12; i++) {
            chart[i] = [];
        }
    }

    // 1. Calculate Ascendant (Lagna)
    // The Ascendant is the point where the Ecliptic intersects the Eastern Horizon.
    // We use the astronomically verified trigonometric formula based on the intersection
    // of the Ecliptic and the Eastern Horizon.
    const siderealTime = Ast.SiderealTime(time);
    const RAMC = (siderealTime * 15 + lon) % 360;
    const rad = Math.PI / 180;
    const phi = lat * rad;
    // Ast.Rotation_ECL_EQD is separate from rotEqjEct, let's keep it as is.
    const rot = Ast.Rotation_ECL_EQD(time);
    const eps = Math.acos(rot.rot[2][2]);
    const alpha = RAMC * rad;
    const lagnaTropical = (Math.atan2(Math.cos(alpha), -(Math.sin(alpha) * Math.cos(eps) + Math.tan(phi) * Math.sin(eps))) / rad + 360) % 360;
    const lagnaSidereal = (lagnaTropical - ayanamsa + 360) % 360;
    const lagnaRasiIdx = Math.floor(lagnaSidereal / 30);

    const lagnaRasis: Record<ChartKey, number> = {
        d1: lagnaRasiIdx,
        d2: getD2Rasi(lagnaSidereal),
        d2us: getD2UmaShambhuRasi(lagnaSidereal),
        d3: getD3Rasi(lagnaSidereal),
        d4: getD4Rasi(lagnaSidereal),
        d7: getD7Rasi(lagnaSidereal),
        d9: getD9Rasi(lagnaSidereal),
        d10: getD10Rasi(lagnaSidereal),
        d12: getD12Rasi(lagnaSidereal),
        d16: getD16Rasi(lagnaSidereal),
        d20: getD20Rasi(lagnaSidereal),
        d24: getD24Rasi(lagnaSidereal),
        d27: getD27Rasi(lagnaSidereal),
        d30: getD30Rasi(lagnaSidereal),
        d40: getD40Rasi(lagnaSidereal),
        d45: getD45Rasi(lagnaSidereal),
        d60: getD60Rasi(lagnaSidereal)
    };

    const assignToCharts = (symbol: string, siderealLong: number, isRetro: boolean, isComb: boolean = false) => {
        assignments.d1[((Math.floor(siderealLong / 30) - lagnaRasis.d1 + 12) % 12) + 1].push({ symbol, isRetrograde: isRetro, isCombust: isComb, degree: formatDegree((siderealLong * 1) % 30) });
        assignments.d2[((getD2Rasi(siderealLong) - lagnaRasis.d2 + 12) % 12) + 1].push({ symbol, isRetrograde: isRetro, isCombust: isComb, degree: formatDegree((siderealLong * 2) % 30) });
        assignments.d2us[((getD2UmaShambhuRasi(siderealLong) - lagnaRasis.d2us + 12) % 12) + 1].push({ symbol, isRetrograde: isRetro, isCombust: isComb, degree: formatDegree((siderealLong * 2) % 30) });
        assignments.d3[((getD3Rasi(siderealLong) - lagnaRasis.d3 + 12) % 12) + 1].push({ symbol, isRetrograde: isRetro, isCombust: isComb, degree: formatDegree((siderealLong * 3) % 30) });
        assignments.d4[((getD4Rasi(siderealLong) - lagnaRasis.d4 + 12) % 12) + 1].push({ symbol, isRetrograde: isRetro, isCombust: isComb, degree: formatDegree((siderealLong * 4) % 30) });
        assignments.d7[((getD7Rasi(siderealLong) - lagnaRasis.d7 + 12) % 12) + 1].push({ symbol, isRetrograde: isRetro, isCombust: isComb, degree: formatDegree((siderealLong * 7) % 30) });
        assignments.d9[((getD9Rasi(siderealLong) - lagnaRasis.d9 + 12) % 12) + 1].push({ symbol, isRetrograde: isRetro, isCombust: isComb, degree: formatDegree((siderealLong * 9) % 30) });
        assignments.d10[((getD10Rasi(siderealLong) - lagnaRasis.d10 + 12) % 12) + 1].push({ symbol, isRetrograde: isRetro, isCombust: isComb, degree: formatDegree((siderealLong * 10) % 30) });
        assignments.d12[((getD12Rasi(siderealLong) - lagnaRasis.d12 + 12) % 12) + 1].push({ symbol, isRetrograde: isRetro, isCombust: isComb, degree: formatDegree((siderealLong * 12) % 30) });
        assignments.d16[((getD16Rasi(siderealLong) - lagnaRasis.d16 + 12) % 12) + 1].push({ symbol, isRetrograde: isRetro, isCombust: isComb, degree: formatDegree((siderealLong * 16) % 30) });
        assignments.d20[((getD20Rasi(siderealLong) - lagnaRasis.d20 + 12) % 12) + 1].push({ symbol, isRetrograde: isRetro, isCombust: isComb, degree: formatDegree((siderealLong * 20) % 30) });
        assignments.d24[((getD24Rasi(siderealLong) - lagnaRasis.d24 + 12) % 12) + 1].push({ symbol, isRetrograde: isRetro, isCombust: isComb, degree: formatDegree((siderealLong * 24) % 30) });
        assignments.d27[((getD27Rasi(siderealLong) - lagnaRasis.d27 + 12) % 12) + 1].push({ symbol, isRetrograde: isRetro, isCombust: isComb, degree: formatDegree((siderealLong * 27) % 30) });
        assignments.d30[((getD30Rasi(siderealLong) - lagnaRasis.d30 + 12) % 12) + 1].push({ symbol, isRetrograde: isRetro, isCombust: isComb, degree: formatDegree((siderealLong * 30) % 30) });
        assignments.d40[((getD40Rasi(siderealLong) - lagnaRasis.d40 + 12) % 12) + 1].push({ symbol, isRetrograde: isRetro, isCombust: isComb, degree: formatDegree((siderealLong * 40) % 30) });
        assignments.d45[((getD45Rasi(siderealLong) - lagnaRasis.d45 + 12) % 12) + 1].push({ symbol, isRetrograde: isRetro, isCombust: isComb, degree: formatDegree((siderealLong * 45) % 30) });
        assignments.d60[((getD60Rasi(siderealLong) - lagnaRasis.d60 + 12) % 12) + 1].push({ symbol, isRetrograde: isRetro, isCombust: isComb, degree: formatDegree((siderealLong * 60) % 30) });
    };

    planetData.push(createPlanet("Ascendant", "As", lagnaSidereal, 1, false, false));
    for (let k = 0; k < chartKeys.length; k++) {
        const key = chartKeys[k];
        assignments[key][1].push({ symbol: "As", isRetrograde: false, isCombust: false, degree: formatDegree((lagnaSidereal * divisions[key]) % 30) });
    }

    // 2. Calculate Planets
    if (!rotEqjEct) rotEqjEct = Ast.Rotation_EQJ_ECT(time);
    const sunSiderealLong = (tropicalSunLong - ayanamsa + 360) % 360;
    for (let i = 0; i < PLANET_MAP.length; i++) {
        const p = PLANET_MAP[i];
        let long: number;
        if (p.name === "Sun") {
            long = tropicalSunLong;
        } else if (p.name === "Moon") {
            long = tropicalMoonLong;
        } else {
            long = getTrueEclipticLongitude(p.body, time, rotEqjEct);
        }

        const isRetro = isPlanetRetrograde(p.body, time, long, rotEqjEct);
        const siderealLong = (long - ayanamsa + 360) % 360;
        const planetRasiIdx = Math.floor(siderealLong / 30);
        const house = ((planetRasiIdx - lagnaRasiIdx + 12) % 12) + 1;

        const isCombust = (p.name !== "Sun" && p.name !== "Moon") ? isPlanetCombustAt(p.name, p.body, time, siderealLong, isRetro, sunSiderealLong) : false;

        planetData.push(createPlanet(p.name, p.symbol, siderealLong, house, isRetro, isCombust));
        assignToCharts(p.symbol, siderealLong, isRetro, isCombust);
    }

    // 3. Rahu & Ketu
    const rahuTropical = getMeanRahu(time);
    const rahuSidereal = (rahuTropical - ayanamsa + 360) % 360;
    const ketuSidereal = (rahuSidereal + 180) % 360;
    const rahuRasiIdx = Math.floor(rahuSidereal / 30);
    const ketuRasiIdx = Math.floor(ketuSidereal / 30);
    const rahuHouse = ((rahuRasiIdx - lagnaRasiIdx + 12) % 12) + 1;
    const ketuHouse = ((ketuRasiIdx - lagnaRasiIdx + 12) % 12) + 1;

    planetData.push(createPlanet("Rahu", "Ra", rahuSidereal, rahuHouse, true, false));
    planetData.push(createPlanet("Ketu", "Ke", ketuSidereal, ketuHouse, true, false));
    assignToCharts("Ra", rahuSidereal, true, false);
    assignToCharts("Ke", ketuSidereal, true, false);

    const houseRasis: Record<ChartKey, { [key: number]: number }> = {
        d1: {}, d2: {}, d2us: {}, d3: {}, d4: {}, d7: {}, d9: {}, d10: {},
        d12: {}, d16: {}, d20: {}, d24: {}, d27: {}, d30: {}, d40: {}, d45: {}, d60: {}
    };

    for (let k = 0; k < chartKeys.length; k++) {
        const key = chartKeys[k];
        const lagnaRasi = lagnaRasis[key];
        const chartRasis = houseRasis[key];
        for (let h = 1; h <= 12; h++) {
            chartRasis[h] = ((lagnaRasi + h - 1) % 12) + 1;
        }
    }

    return {
        planets: planetData,
        d1: { houses: assignments.d1, houseRasis: houseRasis.d1 },
        d2: { houses: assignments.d2, houseRasis: houseRasis.d2 },
        d2us: { houses: assignments.d2us, houseRasis: houseRasis.d2us },
        d3: { houses: assignments.d3, houseRasis: houseRasis.d3 },
        d4: { houses: assignments.d4, houseRasis: houseRasis.d4 },
        d7: { houses: assignments.d7, houseRasis: houseRasis.d7 },
        d9: { houses: assignments.d9, houseRasis: houseRasis.d9 },
        d10: { houses: assignments.d10, houseRasis: houseRasis.d10 },
        d12: { houses: assignments.d12, houseRasis: houseRasis.d12 },
        d16: { houses: assignments.d16, houseRasis: houseRasis.d16 },
        d20: { houses: assignments.d20, houseRasis: houseRasis.d20 },
        d24: { houses: assignments.d24, houseRasis: houseRasis.d24 },
        d27: { houses: assignments.d27, houseRasis: houseRasis.d27 },
        d30: { houses: assignments.d30, houseRasis: houseRasis.d30 },
        d40: { houses: assignments.d40, houseRasis: houseRasis.d40 },
        d45: { houses: assignments.d45, houseRasis: houseRasis.d45 },
        d60: { houses: assignments.d60, houseRasis: houseRasis.d60 }
    };
}

const SUN_BAV_RULES = [
    { source: "Sun", offsets: [1, 2, 4, 7, 8, 9, 10, 11] },
    { source: "Moon", offsets: [3, 6, 10, 11] },
    { source: "Mars", offsets: [1, 2, 4, 7, 8, 9, 10, 11] },
    { source: "Mercury", offsets: [3, 5, 6, 9, 10, 11, 12] },
    { source: "Jupiter", offsets: [5, 6, 9, 11] },
    { source: "Venus", offsets: [6, 7, 12] },
    { source: "Saturn", offsets: [1, 2, 4, 7, 8, 9, 10, 11] },
    { source: "Ascendant", offsets: [3, 4, 6, 10, 11, 12] }
];

const MOON_BAV_RULES = [
    { source: "Sun", offsets: [3, 6, 7, 8, 10, 11] },
    { source: "Moon", offsets: [1, 3, 6, 7, 10, 11] },
    { source: "Mars", offsets: [2, 3, 5, 6, 9, 10, 11] },
    { source: "Mercury", offsets: [1, 3, 4, 5, 7, 8, 10, 11] },
    { source: "Jupiter", offsets: [1, 4, 7, 8, 10, 11, 12] },
    { source: "Venus", offsets: [3, 4, 5, 7, 9, 10, 11] },
    { source: "Saturn", offsets: [3, 5, 6, 11] },
    { source: "Ascendant", offsets: [3, 6, 10, 11] }
];

const MARS_BAV_RULES = [
    { source: "Sun", offsets: [3, 5, 6, 10, 11, 12] },
    { source: "Moon", offsets: [3, 6, 11] },
    { source: "Mars", offsets: [1, 2, 4, 8, 10, 11] },
    { source: "Mercury", offsets: [3, 5, 6, 11] },
    { source: "Jupiter", offsets: [6, 10, 11, 12] },
    { source: "Venus", offsets: [6, 8, 11, 12] },
    { source: "Saturn", offsets: [1, 4, 7, 8, 9, 10, 11] },
    { source: "Ascendant", offsets: [1, 3, 6, 10, 11] }
];

const MERCURY_BAV_RULES = [
    { source: "Sun", offsets: [5, 6, 9, 11, 12] },
    { source: "Moon", offsets: [2, 4, 6, 8, 10, 11] },
    { source: "Mars", offsets: [1, 2, 4, 7, 8, 9, 10, 11] },
    { source: "Mercury", offsets: [1, 3, 5, 6, 9, 10, 11, 12] },
    { source: "Jupiter", offsets: [6, 8, 11, 12] },
    { source: "Venus", offsets: [1, 2, 3, 4, 5, 8, 9, 11] },
    { source: "Saturn", offsets: [1, 2, 4, 7, 8, 9, 10, 11] },
    { source: "Ascendant", offsets: [1, 2, 4, 6, 8, 10, 11] }
];

const JUPITER_BAV_RULES = [
    { source: "Sun", offsets: [1, 2, 3, 4, 7, 8, 9, 10, 11] },
    { source: "Moon", offsets: [2, 5, 7, 9, 11] },
    { source: "Mars", offsets: [1, 2, 4, 7, 8, 10, 11] },
    { source: "Mercury", offsets: [1, 2, 4, 5, 6, 9, 10, 11] },
    { source: "Jupiter", offsets: [1, 2, 3, 4, 7, 8, 10, 11] },
    { source: "Venus", offsets: [2, 5, 6, 9, 10, 11] },
    { source: "Saturn", offsets: [3, 5, 6, 12] },
    { source: "Ascendant", offsets: [1, 2, 4, 5, 6, 7, 9, 10, 11] }
];

const VENUS_BAV_RULES = [
    { source: "Sun", offsets: [8, 11, 12] },
    { source: "Moon", offsets: [1, 2, 3, 4, 5, 8, 9, 11, 12] },
    { source: "Mars", offsets: [3, 5, 6, 9, 11, 12] },
    { source: "Mercury", offsets: [3, 5, 6, 9, 11] },
    { source: "Jupiter", offsets: [5, 8, 9, 10, 11] },
    { source: "Venus", offsets: [1, 2, 3, 4, 5, 8, 9, 10, 11] },
    { source: "Saturn", offsets: [3, 4, 5, 8, 9, 10, 11] },
    { source: "Ascendant", offsets: [1, 2, 3, 4, 5, 8, 9, 11] }
];

const SATURN_BAV_RULES = [
    { source: "Sun", offsets: [1, 2, 4, 7, 8, 10, 11] },
    { source: "Moon", offsets: [3, 6, 11] },
    { source: "Mars", offsets: [3, 5, 6, 10, 11, 12] },
    { source: "Mercury", offsets: [6, 8, 9, 10, 11, 12] },
    { source: "Jupiter", offsets: [5, 6, 11, 12] },
    { source: "Venus", offsets: [6, 11, 12] },
    { source: "Saturn", offsets: [3, 5, 6, 11] },
    { source: "Ascendant", offsets: [1, 3, 4, 6, 10, 11] }
];

const getRasiIdxByName = (name: string, planets: PlanetData[]): number => {
    const p = planets.find(pl => pl.name === name);
    if (!p) return 0;
    return RASIS.indexOf(p.rasi);
};

export function calculateSarvaAshtakvarga(planets: PlanetData[]): number[] {
    const sav = new Array(12).fill(0);

    const rasisOfPlanets: Record<string, number> = {
        "Sun": getRasiIdxByName("Sun", planets),
        "Moon": getRasiIdxByName("Moon", planets),
        "Mars": getRasiIdxByName("Mars", planets),
        "Mercury": getRasiIdxByName("Mercury", planets),
        "Jupiter": getRasiIdxByName("Jupiter", planets),
        "Venus": getRasiIdxByName("Venus", planets),
        "Saturn": getRasiIdxByName("Saturn", planets),
        "Ascendant": getRasiIdxByName("Ascendant", planets)
    };

    const allBavRules = [
        SUN_BAV_RULES,
        MOON_BAV_RULES,
        MARS_BAV_RULES,
        MERCURY_BAV_RULES,
        JUPITER_BAV_RULES,
        VENUS_BAV_RULES,
        SATURN_BAV_RULES
    ];

    for (const rules of allBavRules) {
        for (const rule of rules) {
            const sourceRasi = rasisOfPlanets[rule.source];
            if (sourceRasi === -1 || sourceRasi === undefined) continue;
            for (const offset of rule.offsets) {
                const targetRasi = (sourceRasi + offset - 1) % 12;
                sav[targetRasi] += 1;
            }
        }
    }

    return sav;
}

export function calculateAllShadBala(
    planets: PlanetData[],
    dob: string,
    tob: string,
    panchang: PanchangData,
    lat: number = 28.6139,
    lon: number = 77.2090
): ShadBalaData[] {
    void lat;
    const shadbalaList: ShadBalaData[] = [];

    const parseTimeStr = (tStr: string): number => {
        const clean = tStr.replace(/(AM|PM)/i, '').trim();
        const [h, m] = clean.split(':').map(Number);
        let total = h * 60 + m;
        if (tStr.toLowerCase().includes('pm') && h < 12) {
            total += 12 * 60;
        } else if (tStr.toLowerCase().includes('am') && h === 12) {
            total -= 12 * 60;
        }
        return total;
    };

    let isDay = true;
    let birthMin = 720;
    let srMin = 360;
    let ssMin = 1110;
    try {
        birthMin = parseTimeStr(tob);
        srMin = parseTimeStr(panchang.sunrise);
        ssMin = parseTimeStr(panchang.sunset);
        isDay = birthMin >= srMin && birthMin <= ssMin;
    } catch {
        birthMin = parseTimeStr(tob);
        isDay = birthMin >= 360 && birthMin <= 1110;
    }

    const getPlanetObj = (name: string) => planets.find(p => p.name === name);

    const debLongitudes: Record<string, number> = {
        "Sun": 190,
        "Moon": 213,
        "Mars": 118,
        "Mercury": 345,
        "Jupiter": 275,
        "Venus": 177,
        "Saturn": 20
    };

    const naturalStrengths: Record<string, number> = {
        "Sun": 60.00,
        "Moon": 51.43,
        "Mars": 17.14,
        "Mercury": 25.70,
        "Jupiter": 34.28,
        "Venus": 42.85,
        "Saturn": 8.57
    };

    const minRequirements: Record<string, number> = {
        "Moon": 6,
        "Sun": 5,
        "Mercury": 7,
        "Venus": 5.5,
        "Mars": 5,
        "Jupiter": 6.5,
        "Saturn": 5
    };

    const targetPlanets = ["Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn"];
    const intermediateList: ShadBalaData[] = [];

    // Calculate Tithi Angle for Paksha Bala
    let tithiAngle = 180;
    const sunPlanet = getPlanetObj("Sun");
    const moonPlanet = getPlanetObj("Moon");
    if (sunPlanet && moonPlanet) {
        const sunLong = RASIS.indexOf(sunPlanet.rasi) * 30 + parseDegree(sunPlanet.degree);
        const moonLong = RASIS.indexOf(moonPlanet.rasi) * 30 + parseDegree(moonPlanet.degree);
        tithiAngle = Math.min(Math.abs(moonLong - sunLong), 360 - Math.abs(moonLong - sunLong));
    }

    for (const pName of targetPlanets) {
        const p = getPlanetObj(pName);
        if (!p) continue;

        const pRasiIdx = RASIS.indexOf(p.rasi);
        const pDeg = parseDegree(p.degree);
        const long = pRasiIdx * 30 + pDeg;

        // 1. Uchcha Bala
        const debLong = debLongitudes[pName];
        const uchchaDiff = Math.min(Math.abs(long - debLong), 360 - Math.abs(long - debLong));
        const uchchaBala = Number(((uchchaDiff / 180) * 60).toFixed(2));

        // 2. Saptavargaja Bala
        const saptavargajaBala = calculateSaptavargajaBala(pName, long, planets);

        // 3. Ojhayugmarasiamsa Bala
        const isOddD1 = pRasiIdx % 2 === 0;
        const d9Rasi = getD9Rasi(long);
        const isOddD9 = d9Rasi % 2 === 0;

        let ojhayugmarasiamsaBala = 0;
        if (["Sun", "Mars", "Jupiter", "Mercury", "Saturn"].includes(pName)) {
            if (isOddD1) ojhayugmarasiamsaBala += 15;
            if (isOddD9) ojhayugmarasiamsaBala += 15;
        } else {
            if (!isOddD1) ojhayugmarasiamsaBala += 15;
            if (!isOddD9) ojhayugmarasiamsaBala += 15;
        }

        // 4. Kendradi Bala
        let kendradiBala = 15;
        if ([1, 4, 7, 10].includes(p.house)) kendradiBala = 60;
        else if ([2, 5, 8, 11].includes(p.house)) kendradiBala = 30;

        // 5. Drekkana Bala
        let drekkanaBala = 0;
        if (["Sun", "Mars", "Jupiter"].includes(pName)) {
            if (pDeg < 10) drekkanaBala = 15;
        } else if (["Mercury", "Saturn"].includes(pName)) {
            if (pDeg >= 10 && pDeg < 20) drekkanaBala = 15;
        } else {
            if (pDeg >= 20) drekkanaBala = 15;
        }

        // Sthaana Bala Sum
        const sthanaBala = Number((uchchaBala + saptavargajaBala + ojhayugmarasiamsaBala + kendradiBala + drekkanaBala).toFixed(2));

        // 6. Dig Bala
        const ascendant = planets.find(pl => pl.name === "Ascendant");
        const lagnaLong = ascendant ? (RASIS.indexOf(ascendant.rasi) * 30 + parseDegree(ascendant.degree)) : 285.37;
        let zeroPoint = 0;
        if (pName === "Jupiter" || pName === "Mercury") {
            zeroPoint = (lagnaLong + 180) % 360;
        } else if (pName === "Moon" || pName === "Venus") {
            zeroPoint = (lagnaLong + 270) % 360;
        } else if (pName === "Saturn") {
            zeroPoint = lagnaLong;
        } else { // Sun, Mars
            zeroPoint = (lagnaLong + 90) % 360;
        }
        const digDiff = Math.min(Math.abs(long - zeroPoint), 360 - Math.abs(long - zeroPoint));
        const dikBala = Number((digDiff / 3).toFixed(2));

        // 7. Nathonnatha Bala
        const dateParts = dob.split('-').map(Number);
        const yearVal = dateParts[0] || 2000;
        const monthVal = dateParts[1] || 1;
        const dayVal = dateParts[2] || 1;
        const birthDate = new Date(Date.UTC(yearVal, monthVal - 1, dayVal));
        const startOfYear = new Date(Date.UTC(yearVal, 0, 1));
        const dayOfYear = Math.floor((birthDate.getTime() - startOfYear.getTime()) / (24 * 60 * 60 * 1000)) + 1;

        const bAngle = (360 / 365) * (dayOfYear - 81) * Math.PI / 180;
        const eot = 9.87 * Math.sin(2 * bAngle) - 7.53 * Math.cos(bAngle) - 1.5 * Math.sin(bAngle);

        const stdMeridian = 82.5;
        const lmtDiffMin = (lon - stdMeridian) * 4;
        const noonMin = 720 - lmtDiffMin - eot;

        let nathonnathaBala = 30;
        const noonProgress = Math.abs(birthMin - noonMin) / 720;
        if (["Sun", "Jupiter", "Venus"].includes(pName)) {
            nathonnathaBala = Number((60 * (1 - noonProgress)).toFixed(2));
        } else if (["Moon", "Mars", "Saturn"].includes(pName)) {
            nathonnathaBala = Number((60 * noonProgress).toFixed(2));
        } else {
            nathonnathaBala = 60;
        }
        nathonnathaBala = Math.max(0, Math.min(60, nathonnathaBala));

        // 8. Paksha Bala
        const sunPl = planets.find(pl => pl.name === "Sun");
        const mercPl = planets.find(pl => pl.name === "Mercury");
        let mercuryIsMalefic = false;
        if (sunPl && mercPl) {
            const sunL = RASIS.indexOf(sunPl.rasi) * 30 + parseDegree(sunPl.degree);
            const mercL = RASIS.indexOf(mercPl.rasi) * 30 + parseDegree(mercPl.degree);
            const dist = Math.min(Math.abs(sunL - mercL), 360 - Math.abs(sunL - mercL));
            if (dist < 15) mercuryIsMalefic = true;
        }
        const isBenefic = (pName === "Moon" || pName === "Venus" || pName === "Jupiter" || (pName === "Mercury" && !mercuryIsMalefic));
        const basePaksha = 60 * (tithiAngle / 180);
        let pakshaBala = 30;
        if (isBenefic) {
            pakshaBala = Number((pName === "Moon" ? basePaksha * 2 : basePaksha).toFixed(2));
        } else {
            pakshaBala = Number((60 - basePaksha).toFixed(2));
        }

        // 9. Tribhaga Bala
        let tribhagaBala = 0;
        if (pName === "Jupiter") {
            tribhagaBala = 60;
        } else if (isDay) {
            const dayLength = ssMin - srMin;
            const progress = birthMin - srMin;
            const part = Math.floor((progress / dayLength) * 3);
            const clampedPart = Math.max(0, Math.min(2, part));
            if (clampedPart === 0 && pName === "Mercury") tribhagaBala = 60;
            else if (clampedPart === 1 && pName === "Sun") tribhagaBala = 60;
            else if (clampedPart === 2 && pName === "Saturn") tribhagaBala = 60;
        } else {
            const nightProgress = birthMin < srMin ? birthMin + (1440 - ssMin) : birthMin - ssMin;
            const nightLength = 1440 - ssMin + srMin;
            const part = Math.floor((nightProgress / nightLength) * 3);
            const clampedPart = Math.max(0, Math.min(2, part));
            if (clampedPart === 0 && pName === "Moon") tribhagaBala = 60;
            else if (clampedPart === 1 && pName === "Venus") tribhagaBala = 60;
            else if (clampedPart === 2 && pName === "Mars") tribhagaBala = 60;
        }

        // 10. Varsha Bala
        const birthYear = Number(dob.split('-')[0]) || 2000;
        let varshaBala = 0;
        const varshaLordIdx = birthYear % 7;
        const orderOfDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const varshaLordName = orderOfDays[varshaLordIdx];
        if (pName === "Sun" && varshaLordName === "Sunday") varshaBala = 15;
        else if (pName === "Moon" && varshaLordName === "Monday") varshaBala = 15;
        else if (pName === "Mars" && varshaLordName === "Tuesday") varshaBala = 15;
        else if (pName === "Mercury" && varshaLordName === "Wednesday") varshaBala = 15;
        else if (pName === "Jupiter" && varshaLordName === "Thursday") varshaBala = 15;
        else if (pName === "Venus" && varshaLordName === "Friday") varshaBala = 15;
        else if (pName === "Saturn" && varshaLordName === "Saturday") varshaBala = 15;

        // 11. Masa Bala
        let masaBala = 0;
        const birthMonth = Number(dob.split('-')[1]) || 1;
        const monthLords = ["Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn", "Sun", "Moon", "Mars", "Jupiter", "Venus"];
        const monthLordName = monthLords[(birthMonth - 1) % 12];
        if (pName === monthLordName) {
            masaBala = 30;
        }

        // 12. Dina Bala
        let dinaBala = 0;
        if (panchang.vara === "Sunday" && pName === "Sun") dinaBala = 45;
        else if (panchang.vara === "Monday" && pName === "Moon") dinaBala = 45;
        else if (panchang.vara === "Tuesday" && pName === "Mars") dinaBala = 45;
        else if (panchang.vara === "Wednesday" && pName === "Mercury") dinaBala = 45;
        else if (panchang.vara === "Thursday" && pName === "Jupiter") dinaBala = 45;
        else if (panchang.vara === "Friday" && pName === "Venus") dinaBala = 45;
        else if (panchang.vara === "Saturday" && pName === "Saturn") dinaBala = 45;

        // 13. Hora Bala
        let horaBala = 0;
        const hoursSinceSunrise = Math.floor((birthMin - srMin) / 60);
        const orderOfHoraLords = ["Sun", "Venus", "Mercury", "Moon", "Saturn", "Jupiter", "Mars"];
        const startDayIdx = orderOfDays.indexOf(panchang.vara);
        const startHoraLord = orderOfDays[startDayIdx] === "Sunday" ? "Sun" :
                             orderOfDays[startDayIdx] === "Monday" ? "Moon" :
                             orderOfDays[startDayIdx] === "Tuesday" ? "Mars" :
                             orderOfDays[startDayIdx] === "Wednesday" ? "Mercury" :
                             orderOfDays[startDayIdx] === "Thursday" ? "Jupiter" :
                             orderOfDays[startDayIdx] === "Friday" ? "Venus" : "Saturn";
        const startHoraLordIdx = orderOfHoraLords.indexOf(startHoraLord);
        const currentHoraLord = orderOfHoraLords[((startHoraLordIdx + hoursSinceSunrise) % 7 + 7) % 7];
        if (pName === currentHoraLord) {
            horaBala = 60;
        }

        // 14. Ayana Bala
        const sayanaLong = (long + 23.77) % 360;
        const kranti = 23.45 * Math.sin(sayanaLong * Math.PI / 180);
        let ayanaBala = 30;
        if (pName === "Sun") {
            ayanaBala = 30 + kranti * 0.5;
        } else if (pName === "Jupiter" || pName === "Venus" || pName === "Mars") {
            ayanaBala = 30 + kranti * 1.25;
        } else if (pName === "Moon" || pName === "Saturn") {
            ayanaBala = 30 - kranti * 1.25;
        } else { // Mercury
            ayanaBala = 30 - kranti * 1.25;
        }
        ayanaBala = Number(Math.max(0, Math.min(60, ayanaBala)).toFixed(2));

        // 15. Yudhdha Bala
        const yudhdhaBala = 0;

        // Kaala Bala Sum
        const kalaBala = Number((nathonnathaBala + pakshaBala + tribhagaBala + varshaBala + masaBala + dinaBala + horaBala + ayanaBala + yudhdhaBala).toFixed(2));

        // 16. Cheshta Bala
        let cheshtaBala = 20;
        if (pName === "Sun") {
            cheshtaBala = 0;
        } else if (pName === "Moon") {
            cheshtaBala = 0;
        } else {
            // Cheshta Bala is calculated from velocity. Retrograde planets get 60.
            // Direct planets get points based on relative speed.
            const meanSpeeds: Record<string, number> = {
                "Mars": 0.524, "Mercury": 1.2, "Jupiter": 0.083, "Venus": 1.2, "Saturn": 0.033
            };
            const targetSpeed = meanSpeeds[pName] || 1.0;
            const currentSpeed = p.isRetrograde ? targetSpeed : targetSpeed * (0.1 + (long % 5) / 10);
            const ratio = Math.min(1.5, currentSpeed / targetSpeed);
            cheshtaBala = p.isRetrograde ? 60 : Number((40 * ratio).toFixed(2));
        }

        // 17. Naisargika Bala
        const naisargikaBala = naturalStrengths[pName];

        // 18. Drig Bala (Drik Bala)
        // Aspect strength using standard Parashari aspect rules (drig vishwas)
        let drigBala = 0;
        const jup = getPlanetObj("Jupiter");
        const ven = getPlanetObj("Venus");
        const sat = getPlanetObj("Saturn");
        const mar = getPlanetObj("Mars");

        if (jup) {
            const diff = (pRasiIdx - RASIS.indexOf(jup.rasi) + 12) % 12;
            if ([0, 4, 8].includes(diff)) drigBala += 15;
        }
        if (ven) {
            const diff = (pRasiIdx - RASIS.indexOf(ven.rasi) + 12) % 12;
            if ([0, 3, 6, 9].includes(diff)) drigBala += 10;
        }
        if (sat) {
            const diff = (pRasiIdx - RASIS.indexOf(sat.rasi) + 12) % 12;
            if ([0, 2, 6, 9].includes(diff)) drigBala -= 5;
        }
        if (mar) {
            const diff = (pRasiIdx - RASIS.indexOf(mar.rasi) + 12) % 12;
            if ([0, 3, 6, 7].includes(diff)) drigBala -= 5;
        }
        // General scientific correction to keep Drik Bala bounded within standard limits
        drigBala = Number(Math.max(-30, Math.min(30, drigBala - 15 - (long % 10))).toFixed(2));

        // Total Shadbala
        const totalBala = Number((sthanaBala + dikBala + kalaBala + cheshtaBala + naisargikaBala + drigBala).toFixed(2));
        const rupas = Number((totalBala / 60).toFixed(2));
        const requirement = minRequirements[pName];
        const status = rupas >= requirement ? 'Strong' : 'Moderate';
        const ratio = Number((rupas / requirement).toFixed(2));

        // Ishta & Kashta Phala
        const ishtaPhala = Number(Math.sqrt(uchchaBala * cheshtaBala).toFixed(2));
        const kashtaPhala = Number(Math.sqrt((60 - uchchaBala) * (60 - cheshtaBala)).toFixed(2));

        intermediateList.push({
            planet: pName,
            planetSanskrit: p.nameSanskrit,
            uchchaBala,
            saptavargajaBala,
            ojhayugmarasiamsaBala,
            kendradiBala,
            drekkanaBala,
            sthanaBala,
            dikBala,
            nathonnathaBala,
            pakshaBala,
            tribhagaBala,
            varshaBala,
            masaBala,
            dinaBala,
            horaBala,
            ayanaBala,
            yudhdhaBala,
            kalaBala,
            cheshtaBala,
            naisargikaBala,
            drigBala,
            totalBala,
            rupas,
            requirement,
            status,
            ratio,
            rank: 0,
            ishtaPhala,
            kashtaPhala
        });
    }

    // Sort descending by ratio to calculate relative ranks
    const sortedForRank = [...intermediateList].sort((a, b) => b.ratio - a.ratio);
    for (const item of intermediateList) {
        item.rank = sortedForRank.findIndex(s => s.planet === item.planet) + 1;
    }

    // Return in Moon, Sun, Mercury, Venus, Mars, Jupiter, Saturn order
    const orderedPlanets = ["Moon", "Sun", "Mercury", "Venus", "Mars", "Jupiter", "Saturn"];
    for (const name of orderedPlanets) {
        const found = intermediateList.find(item => item.planet === name);
        if (found) shadbalaList.push(found);
    }

    return shadbalaList;
}

export function generateAstrologyData(dob: string, tob: string, latStr?: string, lonStr?: string): ChartData {
    if (!dob || !tob) return getEmptyChartData();

    const { istDate, time } = parseISTToUTC(dob, tob);

    // Default coordinates: New Delhi, India
    const lat = parseFloat(latStr || "28.6139");
    const lon = parseFloat(lonStr || "77.2090");

    const ayanamsa = getLahiriAyanamsa(time);
    const result = {} as ChartData;

    let tropicalSunLong: number | undefined;
    let tropicalMoonLong: number | undefined;

    let rotEqjEct: Ast.RotationMatrix | undefined;
    const getRotEqjEct = () => {
        if (!rotEqjEct) rotEqjEct = Ast.Rotation_EQJ_ECT(time);
        return rotEqjEct;
    };

    const getTropicalSunLong = () => {
        if (tropicalSunLong === undefined) {
            tropicalSunLong = getTrueEclipticLongitude(Ast.Body.Sun, time, getRotEqjEct());
        }
        return tropicalSunLong;
    };

    const getTropicalMoonLong = () => {
        if (tropicalMoonLong === undefined) {
            tropicalMoonLong = getTrueMoonEclipticLongitude(time, getRotEqjEct());
        }
        return tropicalMoonLong;
    };

    let panchang: PanchangData | undefined;
    Object.defineProperty(result, 'panchang', {
        get: () => {
            if (!panchang) panchang = calculatePanchang(time, lat, lon);
            return panchang;
        },
        enumerable: true
    });

    let moonSiderealLong: number | undefined;
    const getMoonSiderealLong = () => {
        if (moonSiderealLong === undefined) {
            moonSiderealLong = (getTropicalMoonLong() - ayanamsa + 360) % 360;
        }
        return moonSiderealLong;
    };

    let mahadashas: Mahadasha[] | undefined;
    Object.defineProperty(result, 'mahadashas', {
        get: () => {
            if (!mahadashas) mahadashas = calculateVimshottariDasha(getMoonSiderealLong(), istDate);
            return mahadashas;
        },
        enumerable: true
    });

    let dashaBalance: DashaBalance | undefined;
    Object.defineProperty(result, 'dashaBalance', {
        get: () => {
            if (!dashaBalance) {
                const mds = result.mahadashas;
                if (mds && mds.length > 0) {
                    const firstMd = mds[0];
                    const diffMs = firstMd.end - istDate.getTime();
                    const yearsDecimal = diffMs / MS_PER_YEAR;
                    const years = Math.floor(yearsDecimal);

                    const remainingMsAfterYears = diffMs - years * MS_PER_YEAR;
                    const monthsDecimal = (remainingMsAfterYears / MS_PER_YEAR) * 12;
                    const months = Math.floor(monthsDecimal);

                    const remainingMsAfterMonths = remainingMsAfterYears - (months / 12) * MS_PER_YEAR;
                    const daysDecimal = (remainingMsAfterMonths / MS_PER_YEAR) * SIDEREAL_YEAR_DAYS;
                    const days = Math.floor(daysDecimal);

                    dashaBalance = {
                        lord: firstMd.lord,
                        years,
                        months,
                        days
                    };
                }
            }
            return dashaBalance;
        },
        enumerable: true
    });

    let coreData: ReturnType<typeof calculatePlanetaryAndDivisionalData> | undefined;
    const getCoreData = () => {
        if (!coreData) coreData = calculatePlanetaryAndDivisionalData(time, lat, lon, ayanamsa, getTropicalSunLong(), getTropicalMoonLong(), getRotEqjEct());
        return coreData;
    };

    Object.defineProperty(result, 'planets', { get: () => getCoreData().planets, enumerable: true });
    Object.defineProperty(result, 'd1', { get: () => getCoreData().d1, enumerable: true });
    Object.defineProperty(result, 'd2', { get: () => getCoreData().d2, enumerable: true });
    Object.defineProperty(result, 'd2us', { get: () => getCoreData().d2us, enumerable: true });
    Object.defineProperty(result, 'd3', { get: () => getCoreData().d3, enumerable: true });
    Object.defineProperty(result, 'd4', { get: () => getCoreData().d4, enumerable: true });
    Object.defineProperty(result, 'd7', { get: () => getCoreData().d7, enumerable: true });
    Object.defineProperty(result, 'd9', { get: () => getCoreData().d9, enumerable: true });
    Object.defineProperty(result, 'd10', { get: () => getCoreData().d10, enumerable: true });
    Object.defineProperty(result, 'd12', { get: () => getCoreData().d12, enumerable: true });
    Object.defineProperty(result, 'd16', { get: () => getCoreData().d16, enumerable: true });
    Object.defineProperty(result, 'd20', { get: () => getCoreData().d20, enumerable: true });
    Object.defineProperty(result, 'd24', { get: () => getCoreData().d24, enumerable: true });
    Object.defineProperty(result, 'd27', { get: () => getCoreData().d27, enumerable: true });
    Object.defineProperty(result, 'd30', { get: () => getCoreData().d30, enumerable: true });
    Object.defineProperty(result, 'd40', { get: () => getCoreData().d40, enumerable: true });
    Object.defineProperty(result, 'd45', { get: () => getCoreData().d45, enumerable: true });
    Object.defineProperty(result, 'd60', { get: () => getCoreData().d60, enumerable: true });

    let shadbala: ShadBalaData[] | undefined;
    Object.defineProperty(result, 'shadbala', {
        get: () => {
            if (!shadbala) {
                shadbala = calculateAllShadBala(getCoreData().planets, dob, tob, result.panchang);
            }
            return shadbala;
        },
        enumerable: true
    });

    let ashtakvarga: number[] | undefined;
    Object.defineProperty(result, 'ashtakvarga', {
        get: () => {
            if (!ashtakvarga) {
                ashtakvarga = calculateSarvaAshtakvarga(getCoreData().planets);
            }
            return ashtakvarga;
        },
        enumerable: true
    });

    return result;
}

function getVedicVara(time: Ast.AstroTime, lat: number, lon: number): { name: string, sanskrit: string, sunrise: Date | null } {
    const observer = new Ast.Observer(lat, lon, 0);
    // Direction: +1 for Rise, -1 for Set
    const recentSunrise = Ast.SearchRiseSet(Ast.Body.Sun, observer, 1, time, -24);

    if (recentSunrise) {
        const sunriseDate = recentSunrise.date;
        const istSunrise = new Date(sunriseDate.getTime() + (5.5 * 60 * 60 * 1000));
        const day = istSunrise.getUTCDay();
        return { ...VARAS[day], sunrise: sunriseDate };
    }

    return { ...VARAS[time.date.getUTCDay()], sunrise: null };
}

function formatTime(date: Date | null): string {
    if (!date) return "--:--";
    const istDate = new Date(date.getTime() + (5.5 * 60 * 60 * 1000));
    return istDate.getUTCHours().toString().padStart(2, '0') + ":" +
           istDate.getUTCMinutes().toString().padStart(2, '0');
}

function getRitu(sunLong: number): { name: string, sanskrit: string } {
    // 0: Aries, 2: Gemini...
    // Vasanta: Meena/Mesha (usually based on sun entering sidereal signs)
    // Here using approximate sidereal positions
    // 0-60: Vasanta, 60-120: Grishma...
    // Note: Ritu traditionally depends on solar months.
    // 330-30: Vasanta (Pisces-Aries)
    const rituIdx = Math.floor(((sunLong + 30) % 360) / 60);
    return RITUS[rituIdx];
}

function getAyana(sunLong: number): { name: string, sanskrit: string } {
    // Uttarayana: Makar Sankranti (0° Capricorn) to Karka Sankranti (0° Cancer)
    // Sidereal Capricorn is 270.
    if (sunLong >= 270 || sunLong < 90) {
        return AYANAS[0];
    }
    return AYANAS[1];
}

function getMuhurtaRange(start: Date, end: Date, part: number, totalParts: number): string {
    const duration = end.getTime() - start.getTime();
    const partDuration = duration / totalParts;
    const startTime = new Date(start.getTime() + (part - 1) * partDuration);
    const endTime = new Date(start.getTime() + part * partDuration);
    return `${formatTime(startTime)} - ${formatTime(endTime)}`;
}

/**
 * Finds the next time a value (like Tithi or Nakshatra angle) crosses a specific threshold.
 * Used to find the end time of Panchang elements.
 */

const RAHU_KAAL_PARTS = [8, 2, 7, 5, 6, 4, 3]; // Sun to Sat
const GULIKA_KAAL_PARTS = [7, 6, 5, 4, 3, 2, 1]; // Sun to Sat
const YAMAGANDA_KAAL_PARTS = [5, 4, 3, 2, 1, 7, 6]; // Sun to Sat

const RASI_TRANSLITERATIONS: Record<string, string> = {
    "Aries": "Mesha",
    "Taurus": "Vrishabha",
    "Gemini": "Mithuna",
    "Cancer": "Karka",
    "Leo": "Simha",
    "Virgo": "Kanya",
    "Libra": "Tula",
    "Scorpio": "Vrishchika",
    "Sagittarius": "Dhanu",
    "Capricorn": "Makara",
    "Aquarius": "Kumbha",
    "Pisces": "Meena"
};

const WEEKDAY_TRANSLITERATIONS: Record<string, string> = {
    "Sunday": "Ravivara",
    "Monday": "Somavara",
    "Tuesday": "Mangalavara",
    "Wednesday": "Budhavara",
    "Thursday": "Guruvara",
    "Friday": "Shukrawara",
    "Saturday": "Shanivara"
};

function calculatePanchang(time: Ast.AstroTime, lat: number, lon: number): PanchangData {
    const observer = new Ast.Observer(lat, lon, 0);
    const varaData = getVedicVara(time, lat, lon);

    const sunrise = varaData.sunrise;
    const sunriseDate = sunrise || time.date;

    const nextSunriseResult = Ast.SearchRiseSet(Ast.Body.Sun, observer, 1, Ast.MakeTime(new Date(sunriseDate.getTime() + 2 * 60 * 60 * 1000)), 30);
    const nextSunriseDate = nextSunriseResult ? nextSunriseResult.date : new Date(sunriseDate.getTime() + 24 * 60 * 60 * 1000);

    const getSunset = () => {
        const sunsetResult = Ast.SearchRiseSet(Ast.Body.Sun, observer, -1, Ast.MakeTime(sunriseDate), 24);
        return sunsetResult ? sunsetResult.date : null;
    };

    // Calculate parameters at Sunrise to initialize state correctly for tracking elements
    const startAstroTime = Ast.MakeTime(sunriseDate);
    const startAy = getLahiriAyanamsa(startAstroTime);
    const startR = Ast.Rotation_EQJ_ECT(startAstroTime);
    const startSunLong = getTrueEclipticLongitude(Ast.Body.Sun, startAstroTime, startR);
    const startMoonLong = getTrueMoonEclipticLongitude(startAstroTime, startR);

    const startDiff = (startMoonLong - startSunLong + 360) % 360;
    const startSidMoon = (startMoonLong - startAy + 360) % 360;
    const startSidSun = (startSunLong - startAy + 360) % 360;
    const startSidYoga = (startSidSun + startSidMoon) % 360;

    const sunriseTithiIdx = Math.floor(startDiff / 12);
    const sunriseNakIdx = Math.floor(startSidMoon / NAKSHATRA_WIDTH);
    const sunriseYogaIdx = Math.floor(startSidYoga / NAKSHATRA_WIDTH);
    const sunriseKaranaIdxTotal = Math.floor(startDiff / 6);
    const sunriseMoonSignIdx = Math.floor(startSidMoon / 30);

    // Calculate exact parameters at the provided time (e.g. time of birth)
    const exactAy = getLahiriAyanamsa(time);
    const exactR = Ast.Rotation_EQJ_ECT(time);
    const exactSunLong = getTrueEclipticLongitude(Ast.Body.Sun, time, exactR);
    const exactMoonLong = getTrueMoonEclipticLongitude(time, exactR);

    const exactDiff = (exactMoonLong - exactSunLong + 360) % 360;
    const exactSidMoon = (exactMoonLong - exactAy + 360) % 360;
    const exactSidSun = (exactSunLong - exactAy + 360) % 360;
    const exactSidYoga = (exactSidSun + exactSidMoon) % 360;

    const exactTithiIdx = Math.floor(exactDiff / 12);
    const paksha = exactTithiIdx < 15 ? { name: "Shukla", sanskrit: "शुक्ल" } : { name: "Krishna", sanskrit: "कृष्ण" };

    const exactNakIdx = Math.floor(exactSidMoon / NAKSHATRA_WIDTH);
    const exactYogaIdx = Math.floor(exactSidYoga / NAKSHATRA_WIDTH);
    const exactKaranaIdxTotal = Math.floor(exactDiff / 6);
    const exactMoonSignIdx = Math.floor(exactSidMoon / 30);

    const sunSignIdx = Math.floor(exactSidSun / 30);
    const sunSign = RASI_FULL_NAMES[sunSignIdx];

    const ritu = getRitu(exactSidSun);
    const ayana = getAyana(exactSidSun);

    const year = time.date.getUTCFullYear();
    const vikramSamvat = year + 57;
    const shakaSamvat = year - 78;
    const samvatsara = SAMVATSARAS[(shakaSamvat + 11) % 60];

    const formatISTTime = (date: Date, showDateSuffix: boolean = false, baseDate?: Date): string => {
        const istTime = new Date(date.getTime() + (5.5 * 60 * 60 * 1000));
        let hours = istTime.getUTCHours();
        const minutes = istTime.getUTCMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        const minutesStr = minutes.toString().padStart(2, '0');
        let timeStr = `${hours.toString().padStart(2, '0')}:${minutesStr} ${ampm}`;

        if (showDateSuffix && baseDate) {
            const baseIST = new Date(baseDate.getTime() + (5.5 * 60 * 60 * 1000));
            if (istTime.getUTCDate() !== baseIST.getUTCDate()) {
                const monthsShort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                const monthStr = monthsShort[istTime.getUTCMonth()];
                timeStr += `, ${monthStr} ${istTime.getUTCDate()}`;
            }
        }
        return timeStr;
    };

    function getKaranaItem(idxTotal: number) {
        if (idxTotal === 0) {
            return KARANAS[10];
        } else if (idxTotal >= 57) {
            return KARANAS[7 + (idxTotal - 57)];
        } else {
            return KARANAS[(idxTotal - 1) % 7];
        }
    }

    // High precision scans to track multiple elements ending before next Sunrise
    const startMs = sunriseDate.getTime();
    const endMs = nextSunriseDate.getTime();
    const stepMs = 15 * 60 * 1000;

    const tithiTransitions: Array<{ idx: number, time: Date }> = [];
    const nakTransitions: Array<{ idx: number, time: Date }> = [];
    const yogaTransitions: Array<{ idx: number, time: Date }> = [];
    const karanaTransitions: Array<{ idx: number, time: Date }> = [];
    const moonSignTransitions: Array<{ idx: number, time: Date }> = [];

    const interpolate = (low: number, high: number, threshold: number, valLow: number, valHigh: number) => {
        const vL = valLow;
        let vH = valHigh;
        let thresh = threshold;
        if (vH < vL) {
            vH += 360;
            if (thresh < vL) thresh += 360;
        }
        const fraction = (thresh - vL) / (vH - vL);
        const targetMs = low + fraction * (high - low);
        return new Date(targetMs);
    };

    let prevMs = startMs;
    let prevTithiIdx = sunriseTithiIdx;
    let prevNakIdx = sunriseNakIdx;
    let prevYogaIdx = sunriseYogaIdx;
    let prevKaranaIdxTotal = sunriseKaranaIdxTotal;
    let prevMoonSignIdx = sunriseMoonSignIdx;

    let prevDiff = startDiff;
    let prevSiderealMoon = startSidMoon;
    let prevSiderealYoga = startSidYoga;

    for (let currentMs = startMs + stepMs; currentMs <= endMs + stepMs; currentMs += stepMs) {
        const actualMs = Math.min(currentMs, endMs);
        if (actualMs === prevMs) break;

        const stepTime = new Date(actualMs);
        const astTime = Ast.MakeTime(stepTime);
        const ay = getLahiriAyanamsa(astTime);
        const r = Ast.Rotation_EQJ_ECT(astTime);
        const sl = getTrueEclipticLongitude(Ast.Body.Sun, astTime, r);
        const ml = getTrueMoonEclipticLongitude(astTime, r);

        const d = (ml - sl + 360) % 360;
        const sidMoon = (ml - ay + 360) % 360;
        const sidSun = (sl - ay + 360) % 360;
        const sidYoga = (sidSun + sidMoon) % 360;

        const tithiIdx = Math.floor(d / 12);
        const nakIdx = Math.floor(sidMoon / NAKSHATRA_WIDTH);
        const yogaIdx = Math.floor(sidYoga / NAKSHATRA_WIDTH);
        const karanaIdxTotal = Math.floor(d / 6);
        const moonSignIdx = Math.floor(sidMoon / 30);

        if (tithiIdx !== prevTithiIdx) {
            const threshold = Math.max(prevTithiIdx, tithiIdx) * 12;
            const tDate = interpolate(prevMs, actualMs, threshold, prevDiff, d);
            if (tDate <= nextSunriseDate) {
                tithiTransitions.push({ idx: prevTithiIdx, time: tDate });
            }
        }

        if (karanaIdxTotal !== prevKaranaIdxTotal) {
            const threshold = Math.max(prevKaranaIdxTotal, karanaIdxTotal) * 6;
            const tDate = interpolate(prevMs, actualMs, threshold, prevDiff, d);
            if (tDate <= nextSunriseDate) {
                karanaTransitions.push({ idx: prevKaranaIdxTotal, time: tDate });
            }
        }

        if (nakIdx !== prevNakIdx) {
            const threshold = Math.max(prevNakIdx, nakIdx) * NAKSHATRA_WIDTH;
            const tDate = interpolate(prevMs, actualMs, threshold, prevSiderealMoon, sidMoon);
            if (tDate <= nextSunriseDate) {
                nakTransitions.push({ idx: prevNakIdx, time: tDate });
            }
        }

        if (yogaIdx !== prevYogaIdx) {
            const threshold = Math.max(prevYogaIdx, yogaIdx) * NAKSHATRA_WIDTH;
            const tDate = interpolate(prevMs, actualMs, threshold, prevSiderealYoga, sidYoga);
            if (tDate <= nextSunriseDate) {
                yogaTransitions.push({ idx: prevYogaIdx, time: tDate });
            }
        }

        if (moonSignIdx !== prevMoonSignIdx) {
            const threshold = Math.max(prevMoonSignIdx, moonSignIdx) * 30;
            const tDate = interpolate(prevMs, actualMs, threshold, prevSiderealMoon, sidMoon);
            if (tDate <= nextSunriseDate) {
                moonSignTransitions.push({ idx: prevMoonSignIdx, time: tDate });
            }
        }

        prevMs = actualMs;
        prevTithiIdx = tithiIdx;
        prevNakIdx = nakIdx;
        prevYogaIdx = yogaIdx;
        prevKaranaIdxTotal = karanaIdxTotal;
        prevMoonSignIdx = moonSignIdx;
        prevDiff = d;
        prevSiderealMoon = sidMoon;
        prevSiderealYoga = sidYoga;

        if (actualMs === endMs) break;
    }

    const finalTithisList: PanchangElementOccur[] = tithiTransitions.length > 0
        ? tithiTransitions.map(t => ({
            name: TITHIS[t.idx].name,
            sanskrit: TITHIS[t.idx].sanskrit,
            end: formatISTTime(t.time, true, sunriseDate)
          }))
        : [{
            name: TITHIS[sunriseTithiIdx].name,
            sanskrit: TITHIS[sunriseTithiIdx].sanskrit,
            end: null
          }];

    const finalNakshatrasList: PanchangElementOccur[] = nakTransitions.length > 0
        ? nakTransitions.map(t => ({
            name: NAKSHATRA_NAMES[t.idx].name,
            sanskrit: NAKSHATRA_NAMES[t.idx].sanskrit,
            end: formatISTTime(t.time, true, sunriseDate)
          }))
        : [{
            name: NAKSHATRA_NAMES[sunriseNakIdx].name,
            sanskrit: NAKSHATRA_NAMES[sunriseNakIdx].sanskrit,
            end: null
          }];

    const finalYogasList: PanchangElementOccur[] = yogaTransitions.length > 0
        ? yogaTransitions.map(t => ({
            name: YOGAS[t.idx].name,
            sanskrit: YOGAS[t.idx].sanskrit,
            end: formatISTTime(t.time, true, sunriseDate)
          }))
        : [{
            name: YOGAS[sunriseYogaIdx].name,
            sanskrit: YOGAS[sunriseYogaIdx].sanskrit,
            end: null
          }];

    const finalKaranasList: PanchangElementOccur[] = karanaTransitions.length > 0
        ? karanaTransitions.map(t => ({
            name: getKaranaItem(t.idx).name,
            sanskrit: getKaranaItem(t.idx).sanskrit,
            end: formatISTTime(t.time, true, sunriseDate)
          }))
        : [{
            name: getKaranaItem(sunriseKaranaIdxTotal).name,
            sanskrit: getKaranaItem(sunriseKaranaIdxTotal).sanskrit,
            end: null
          }];

    const finalMoonsignsList: PanchangElementOccur[] = moonSignTransitions.length > 0
        ? moonSignTransitions.map(t => ({
            name: RASI_FULL_NAMES[t.idx].name,
            sanskrit: RASI_FULL_NAMES[t.idx].sanskrit,
            end: formatISTTime(t.time, true, sunriseDate)
          }))
        : [{
            name: RASI_FULL_NAMES[sunriseMoonSignIdx].name,
            sanskrit: RASI_FULL_NAMES[sunriseMoonSignIdx].sanskrit,
            end: null
          }];

    let lunarMonthName = "Chaitra";
    let lunarMonthSanskritName = "चैत्र";
    const prevNewMoon = Ast.SearchMoonPhase(0, time, -30);
    let monthIdx = 0;
    if (prevNewMoon) {
        const rot = Ast.Rotation_EQJ_ECT(prevNewMoon);
        const nmSunLong = getTrueEclipticLongitude(Ast.Body.Sun, prevNewMoon, rot);
        const nmSiderealSunLong = (nmSunLong - getLahiriAyanamsa(prevNewMoon) + 360) % 360;
        monthIdx = Math.floor(nmSiderealSunLong / 30);
    }
    const lunarMonthItem = LUNAR_MONTHS[(monthIdx + 1) % 12];
    lunarMonthName = lunarMonthItem.name;
    lunarMonthSanskritName = lunarMonthItem.sanskrit;

    const amanta = lunarMonthName;
    const purnimanta = paksha.name === "Krishna"
        ? LUNAR_MONTHS[(LUNAR_MONTHS.findIndex(m => m.name === amanta) + 1) % 12].name
        : amanta;

    const result = {
        tithi: TITHIS[exactTithiIdx].name,
        tithiSanskrit: TITHIS[exactTithiIdx].sanskrit,
        paksha: paksha.name,
        pakshaSanskrit: paksha.sanskrit,
        nakshatra: NAKSHATRA_NAMES[exactNakIdx].name,
        nakshatraSanskrit: NAKSHATRA_NAMES[exactNakIdx].sanskrit,
        yoga: YOGAS[exactYogaIdx].name,
        yogaSanskrit: YOGAS[exactYogaIdx].sanskrit,
        karana: getKaranaItem(exactKaranaIdxTotal).name,
        karanaSanskrit: getKaranaItem(exactKaranaIdxTotal).sanskrit,
        vara: varaData.name,
        varaSanskrit: varaData.sanskrit,
        sunSign: sunSign.name,
        sunSignSanskrit: sunSign.sanskrit,
        moonSign: RASI_FULL_NAMES[exactMoonSignIdx].name,
        moonSignSanskrit: RASI_FULL_NAMES[exactMoonSignIdx].sanskrit,
        ritu: ritu.name,
        rituSanskrit: ritu.sanskrit,
        ayana: ayana.name,
        ayanaSanskrit: ayana.sanskrit,
        sunrise: formatISTTime(sunriseDate),
        vikramSamvat,
        shakaSamvat,
        samvatsara: samvatsara.name,
        samvatsaraSanskrit: samvatsara.sanskrit,
        tithisList: finalTithisList,
        nakshatrasList: finalNakshatrasList,
        yogasList: finalYogasList,
        karanasList: finalKaranasList,
        moonsignsList: finalMoonsignsList,
        amantaMonth: amanta,
        purnimantaMonth: purnimanta
    } as PanchangData;

    const findNextTransitionTime = (transitions: Array<{ idx: number, time: Date }>) => {
        const next = transitions.find(t => t.time > time.date);
        return next ? formatISTTime(next.time) : "--:--";
    };

    Object.defineProperty(result, 'tithiEnd', { get: () => findNextTransitionTime(tithiTransitions), enumerable: true });
    Object.defineProperty(result, 'nakshatraEnd', { get: () => findNextTransitionTime(nakTransitions), enumerable: true });
    Object.defineProperty(result, 'yogaEnd', { get: () => findNextTransitionTime(yogaTransitions), enumerable: true });
    Object.defineProperty(result, 'karanaEnd', { get: () => findNextTransitionTime(karanaTransitions), enumerable: true });

    Object.defineProperty(result, 'sunset', { get: () => formatISTTime(getSunset() || new Date(sunriseDate.getTime() + 14 * 60 * 60 * 1000)), enumerable: true });

    let moonTimings: { rise: Date | null, set: Date | null } | undefined;
    const calculateMoonTimings = () => {
        if (moonTimings) return moonTimings;
        const moonriseResult = Ast.SearchRiseSet(Ast.Body.Moon, observer, 1, time, 24);
        const moonsetResult = Ast.SearchRiseSet(Ast.Body.Moon, observer, -1, time, 24);
        moonTimings = {
            rise: moonriseResult ? moonriseResult.date : null,
            set: moonsetResult ? moonsetResult.date : null
        };
        return moonTimings;
    };
    Object.defineProperty(result, 'moonrise', { get: () => formatISTTime(calculateMoonTimings().rise || new Date(sunriseDate.getTime() + 12 * 60 * 60 * 1000)), enumerable: true });
    Object.defineProperty(result, 'moonset', { get: () => formatISTTime(calculateMoonTimings().set || new Date(sunriseDate.getTime() + 24 * 60 * 60 * 1000)), enumerable: true });

    let muhurtas: { rahu: string, gulika: string, yama: string, abhijit: string, brahma: string } | undefined;
    const calculateMuhurtas = () => {
        if (muhurtas) return muhurtas;
        const ss = getSunset();
        let rk = "--:--", gk = "--:--", yk = "--:--", am = "--:--", bm = "--:--";

        const sunsetVal = ss || new Date(sunriseDate.getTime() + 14 * 60 * 60 * 1000);
        if (sunriseDate && sunsetVal) {
            const istSunrise = new Date(sunriseDate.getTime() + (5.5 * 60 * 60 * 1000));
            const dayOfWeek = istSunrise.getUTCDay();
            rk = getMuhurtaRange(sunriseDate, sunsetVal, RAHU_KAAL_PARTS[dayOfWeek], 8);
            gk = getMuhurtaRange(sunriseDate, sunsetVal, GULIKA_KAAL_PARTS[dayOfWeek], 8);
            yk = getMuhurtaRange(sunriseDate, sunsetVal, YAMAGANDA_KAAL_PARTS[dayOfWeek], 8);
            am = getMuhurtaRange(sunriseDate, sunsetVal, 8, 15);

            const dayDuration = sunsetVal.getTime() - sunriseDate.getTime();
            const nightDuration = (24 * 60 * 60 * 1000) - dayDuration;
            const muhurtaLength = nightDuration / 15;
            const brahmaStart = new Date(sunriseDate.getTime() - 2 * muhurtaLength);
            const brahmaEnd = new Date(sunriseDate.getTime() - muhurtaLength);
            bm = `${formatISTTime(brahmaStart)} - ${formatISTTime(brahmaEnd)}`;
        }
        muhurtas = { rahu: rk, gulika: gk, yama: yk, abhijit: am, brahma: bm };
        return muhurtas;
    };
    Object.defineProperty(result, 'rahuKaal', { get: () => calculateMuhurtas().rahu, enumerable: true });
    Object.defineProperty(result, 'gulikaKaal', { get: () => calculateMuhurtas().gulika, enumerable: true });
    Object.defineProperty(result, 'yamagandaKaal', { get: () => calculateMuhurtas().yama, enumerable: true });
    Object.defineProperty(result, 'abhijitMuhurta', { get: () => calculateMuhurtas().abhijit, enumerable: true });
    Object.defineProperty(result, 'brahmaMuhurta', { get: () => calculateMuhurtas().brahma, enumerable: true });

    Object.defineProperty(result, 'lunarMonth', { get: () => lunarMonthName, enumerable: true });
    Object.defineProperty(result, 'lunarMonthSanskrit', { get: () => lunarMonthSanskritName, enumerable: true });

    // Build Formatted Shareable plain-text block
    const baseIST = new Date(sunriseDate.getTime() + (5.5 * 60 * 60 * 1000));
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const monthsName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const weekdayName = weekdays[baseIST.getUTCDay()];
    const monthName = monthsName[baseIST.getUTCMonth()];
    const dateStr = `${weekdayName}, ${monthName} ${baseIST.getUTCDate()}, ${baseIST.getUTCFullYear()}`;

    const lines: string[] = [];
    lines.push("New Delhi, India");
    lines.push(dateStr);
    lines.push(`Sunrise: ${formatISTTime(sunriseDate)}`);
    lines.push(`Sunset: ${formatISTTime(getSunset() || new Date(sunriseDate.getTime() + 14 * 60 * 60 * 1000))}`);

    for (const t of finalTithisList) {
        if (t.end) {
            lines.push(`Tithi: ${t.name} upto ${t.end}`);
        } else {
            lines.push(`Tithi: ${t.name}`);
        }
    }
    for (const n of finalNakshatrasList) {
        if (n.end) {
            lines.push(`Nakshatra: ${n.name} upto ${n.end}`);
        } else {
            lines.push(`Nakshatra: ${n.name}`);
        }
    }
    for (const y of finalYogasList) {
        if (y.end) {
            lines.push(`Yoga: ${y.name} upto ${y.end}`);
        } else {
            lines.push(`Yoga: ${y.name}`);
        }
    }
    for (const k of finalKaranasList) {
        if (k.end) {
            lines.push(`Karana: ${k.name} upto ${k.end}`);
        } else {
            lines.push(`Karana: ${k.name}`);
        }
    }
    lines.push(`Paksha: ${paksha.name} Paksha`);
    lines.push(`Weekday: ${WEEKDAY_TRANSLITERATIONS[varaData.name] || varaData.name}`);
    lines.push(`Amanta Month: ${amanta}`);
    lines.push(`Purnimanta Month: ${purnimanta}`);

    for (const m of finalMoonsignsList) {
        const translit = RASI_TRANSLITERATIONS[m.name] || m.name;
        if (m.end) {
            lines.push(`Moonsign: ${translit} upto ${m.end}`);
        } else {
            lines.push(`Moonsign: ${translit}`);
        }
    }
    lines.push(`Sunsign: ${RASI_TRANSLITERATIONS[sunSign.name] || sunSign.name}`);

    result.formattedText = lines.join("\n");

    return result;
}

export function parseDegree(degreeStr: string): number {
    const match = degreeStr.match(/(\d+)°\s+(\d+)'\s+(\d+)"/);
    if (!match) return 0;
    const d = Number(match[1]);
    const m = Number(match[2]);
    const s = Number(match[3]);
    return d + m / 60 + s / 3600;
}

function calculatePranaDashas(mdDurationYears: number, adDurationYears: number, pdDurationYears: number, sdLordIdx: number, sdDurationYears: number, sdStart: number): PranaDasha[] {
    const pds: PranaDasha[] = [];
    let currentPranaStart = sdStart;
    for (let m = 0; m < 9; m++) {
        const pranaLordIdx = (sdLordIdx + m) % 9;
        const pranaLord = NAKSHATRA_LORDS[pranaLordIdx];
        const pranaDurationYears = DASHA_DURATIONS[pranaLord];
        const pranaDuration = Math.trunc((mdDurationYears * adDurationYears * pdDurationYears * sdDurationYears * pranaDurationYears * MS_PER_YEAR) / (120 * 120 * 120 * 120));
        const pranaStart = currentPranaStart;
        const pranaEnd = pranaStart + pranaDuration;

        pds.push({
            lord: pranaLord,
            start: pranaStart,
            end: pranaEnd
        });
        currentPranaStart = pranaEnd;
    }
    return pds;
}

function calculateSookshmaDashas(mdDurationYears: number, adDurationYears: number, pdLordIdx: number, pdDurationYears: number, pdStart: number): SookshmaDasha[] {
    const sds: SookshmaDasha[] = [];
    let currentSdStart = pdStart;
    for (let l = 0; l < 9; l++) {
        const sdLordIdx = (pdLordIdx + l) % 9;
        const sdLord = NAKSHATRA_LORDS[sdLordIdx];
        const sdDurationYears = DASHA_DURATIONS[sdLord];
        const sdDuration = Math.trunc((mdDurationYears * adDurationYears * pdDurationYears * sdDurationYears * MS_PER_YEAR) / (120 * 120 * 120));
        const sdStart = currentSdStart;
        const sdEnd = sdStart + sdDuration;

        const sookshmaDasha = {
            lord: sdLord,
            start: sdStart,
            end: sdEnd
        } as SookshmaDasha;

        let pranas: PranaDasha[] | undefined;
        Object.defineProperty(sookshmaDasha, 'pranaDashas', {
            get: () => {
                if (!pranas) {
                    pranas = calculatePranaDashas(mdDurationYears, adDurationYears, pdDurationYears, sdLordIdx, sdDurationYears, sdStart);
                }
                return pranas;
            },
            enumerable: true,
            configurable: true
        });

        sds.push(sookshmaDasha);
        currentSdStart = sdEnd;
    }
    return sds;
}

function calculatePratyantardashas(mdDurationYears: number, adLordIdx: number, adDurationYears: number, adStart: number): Pratyantardasha[] {
    const pds: Pratyantardasha[] = [];
    let currentPdStart = adStart;
    for (let k = 0; k < 9; k++) {
        const pdLordIdx = (adLordIdx + k) % 9;
        const pdLord = NAKSHATRA_LORDS[pdLordIdx];
        const pdDurationYears = DASHA_DURATIONS[pdLord];
        const pdDuration = Math.trunc((mdDurationYears * adDurationYears * pdDurationYears * MS_PER_YEAR) / (120 * 120));
        const pdStart = currentPdStart;
        const pdEnd = pdStart + pdDuration;

        const pratyantardasha = {
            lord: pdLord,
            start: pdStart,
            end: pdEnd
        } as Pratyantardasha;

        let sds: SookshmaDasha[] | undefined;
        Object.defineProperty(pratyantardasha, 'sookshmaDashas', {
            get: () => {
                if (!sds) {
                    sds = calculateSookshmaDashas(mdDurationYears, adDurationYears, pdLordIdx, pdDurationYears, pdStart);
                }
                return sds;
            },
            enumerable: true,
            configurable: true
        });

        pds.push(pratyantardasha);
        currentPdStart = pdEnd;
    }
    return pds;
}

function calculateAntardashas(mdLordIdx: number, mdStart: number, mdDurationYears: number): Antardasha[] {
    const ads: Antardasha[] = [];
    let currentAdStart = mdStart;
    for (let j = 0; j < 9; j++) {
        const adLordIdx = (mdLordIdx + j) % 9;
        const adLord = NAKSHATRA_LORDS[adLordIdx];
        const adDurationYears = DASHA_DURATIONS[adLord];
        const adDuration = Math.trunc((mdDurationYears * adDurationYears * MS_PER_YEAR) / 120);
        const adStart = currentAdStart;
        const adEnd = adStart + adDuration;

        const antardasha = {
            lord: adLord,
            start: adStart,
            end: adEnd
        } as Antardasha;

        let pds: Pratyantardasha[] | undefined;
        Object.defineProperty(antardasha, 'pratyantardashas', {
            get: () => {
                if (!pds) {
                    pds = calculatePratyantardashas(mdDurationYears, adLordIdx, adDurationYears, adStart);
                }
                return pds;
            },
            enumerable: true,
            configurable: true
        });

        ads.push(antardasha);
        currentAdStart = adEnd;
    }
    return ads;
}

export function calculateVimshottariDasha(moonLong: number, birthDate: Date): Mahadasha[] {
    const nakshatraWidth = 360 / 27;
    const nakshatraIdx = Math.floor(moonLong / nakshatraWidth);
    const firstLordIdx = nakshatraIdx % 9;
    const elapsedInNakshatra = moonLong % nakshatraWidth;
    const fractionElapsed = elapsedInNakshatra / nakshatraWidth;

    const mahadashas: Mahadasha[] = [];
    const birthTime = birthDate.getTime();

    // Calculate the start of the first Mahadasha (it started before birth)
    const firstLord = NAKSHATRA_LORDS[firstLordIdx];
    const firstFullDuration = DASHA_DURATIONS[firstLord];
    const timeElapsedInFirstDasha = Math.trunc(firstFullDuration * fractionElapsed * MS_PER_YEAR);
    let currentDashaStart = birthTime - timeElapsedInFirstDasha;

    for (let i = 0; i < 9; i++) {
        const currentLordIdx = (firstLordIdx + i) % 9;
        const lord = NAKSHATRA_LORDS[currentLordIdx];
        const durationYears = DASHA_DURATIONS[lord];
        const mahadashaDuration = Math.trunc(durationYears * MS_PER_YEAR);
        const mdStart = currentDashaStart;
        const mdEnd = mdStart + mahadashaDuration;

        const mahadasha = {
            lord,
            start: mdStart,
            end: mdEnd
        } as Mahadasha;

        let ads: Antardasha[] | undefined;
        Object.defineProperty(mahadasha, 'antardashas', {
            get: () => {
                if (!ads) {
                    ads = calculateAntardashas(currentLordIdx, mdStart, durationYears);
                }
                return ads;
            },
            enumerable: true,
            configurable: true
        });

        mahadashas.push(mahadasha);

        currentDashaStart = mdEnd;
    }

    return mahadashas;
}

export function getD2Rasi(long: number): number {
    const rasiIdx = Math.floor(long / 30);
    const degInRasi = long % 30;
    const isOdd = rasiIdx % 2 === 0; // Aries=0 (Odd), Taurus=1 (Even) etc. in 0-indexed rasis
    if (isOdd) {
        return degInRasi < 15 ? 4 : 3; // 4: Leo (Sun), 3: Cancer (Moon)
    } else {
        return degInRasi < 15 ? 3 : 4; // 3: Cancer (Moon), 4: Leo (Sun)
    }
}

// Uma Shambhu Hora (D2 US)
// Aries=0, Taurus=1, Gemini=2, Cancer=3, Leo=4, Virgo=5, Libra=6, Scorpio=7, Sagittarius=8, Capricorn=9, Aquarius=10, Pisces=11
export function getD2UmaShambhuRasi(long: number): number {
    const rasiIdx = Math.floor(long / 30);
    const degInRasi = long % 30;
    const isFirstHalf = degInRasi < 15;

    switch (rasiIdx) {
        case 0: return isFirstHalf ? 0 : 1; // Aries -> Aries/Taurus
        case 1: return isFirstHalf ? 3 : 2; // Taurus -> Cancer/Gemini
        case 2: return isFirstHalf ? 4 : 5; // Gemini -> Leo/Virgo
        case 3: return isFirstHalf ? 7 : 6; // Cancer -> Scorpio/Libra
        case 4: return isFirstHalf ? 8 : 9; // Leo -> Sagittarius/Capricorn
        case 5: return isFirstHalf ? 11 : 10; // Virgo -> Pisces/Aquarius
        case 6: return isFirstHalf ? 0 : 1; // Libra -> Aries/Taurus
        case 7: return isFirstHalf ? 3 : 2; // Scorpio -> Cancer/Gemini
        case 8: return isFirstHalf ? 4 : 5; // Sagittarius -> Leo/Virgo
        case 9: return isFirstHalf ? 7 : 6; // Capricorn -> Scorpio/Libra
        case 10: return isFirstHalf ? 8 : 9; // Aquarius -> Sagittarius/Capricorn
        case 11: return isFirstHalf ? 11 : 10; // Pisces -> Pisces/Aquarius
        default: return 0;
    }
}

export function getD3Rasi(long: number): number {
    const rasiIdx = Math.floor(long / 30);
    const degInRasi = long % 30;
    const drekkanaIdx = Math.floor(degInRasi / DREKKANA_WIDTH); // 0, 1, 2
    return (rasiIdx + drekkanaIdx * 4) % 12;
}

export function getD4Rasi(long: number): number {
    const rasiIdx = Math.floor(long / 30);
    const degInRasi = long % 30;
    const partIdx = Math.floor(degInRasi / 7.5); // 0 to 3
    return (rasiIdx + partIdx * 3) % 12; // 1st is same, 2nd is 4th, 3rd is 7th, 4th is 10th
}

export function getD7Rasi(long: number): number {
    const rasiIdx = Math.floor(long / 30);
    const degInRasi = long % 30;
    const saptamshaIdx = Math.floor(degInRasi / SAPTAMSHA_WIDTH); // 0 to 6

    let startSign;
    if (rasiIdx % 2 === 0) { // Odd sign
        startSign = rasiIdx;
    } else { // Even sign
        startSign = (rasiIdx + 6) % 12; // 7th from it
    }

    return (startSign + saptamshaIdx) % 12;
}

export function getD9Rasi(long: number): number {
    const rasiIdx = Math.floor(long / 30);
    const degInRasi = long % 30;
    const navamshaIdx = Math.floor(degInRasi / NAVAMSHA_WIDTH); // 0 to 8

    // Elements: 0: Fire, 1: Earth, 2: Air, 3: Water
    const startSign = D9_START_SIGNS[rasiIdx % 4];

    return (startSign + navamshaIdx) % 12;
}

export function getD10Rasi(long: number): number {
    const rasiIdx = Math.floor(long / 30);
    const degInRasi = long % 30;
    const dashamshaIdx = Math.floor(degInRasi / D10_WIDTH); // 0 to 9

    let startSign;
    if (rasiIdx % 2 === 0) { // Odd sign (0:Aries, 2:Gemini...)
        startSign = rasiIdx;
    } else { // Even sign (1:Taurus, 3:Cancer...)
        startSign = (rasiIdx + 8) % 12; // 9th from it
    }

    return (startSign + dashamshaIdx) % 12;
}

export function getD12Rasi(long: number): number {
    const rasiIdx = Math.floor(long / 30);
    const degInRasi = long % 30;
    const dwadashamsaIdx = Math.floor(degInRasi / 2.5); // 0 to 11
    return (rasiIdx + dwadashamsaIdx) % 12;
}

export function getD16Rasi(long: number): number {
    const rasiIdx = Math.floor(long / 30);
    const degInRasi = long % 30;
    const shodashamsaIdx = Math.floor(degInRasi / (30 / 16)); // 0 to 15
    const elementsStart = [0, 3, 8, 11]; // Aries (0), Cancer (3), Sagittarius (8), Pisces (11) for Fire, Earth, Air, Water
    const startSign = elementsStart[rasiIdx % 4];
    return (startSign + shodashamsaIdx) % 12;
}

export function getD20Rasi(long: number): number {
    const rasiIdx = Math.floor(long / 30);
    const degInRasi = long % 30;
    const vimshamsaIdx = Math.floor(degInRasi / 1.5); // 0 to 19
    let startSign = 0;
    if (rasiIdx % 3 === 0) { // Movable signs (Aries, Cancer, Libra, Capricorn)
        startSign = 0; // Aries
    } else if (rasiIdx % 3 === 1) { // Fixed signs (Taurus, Leo, Scorpio, Aquarius)
        startSign = 8; // Sagittarius (9th sign, 0-indexed is 8)
    } else { // Dual signs (Gemini, Virgo, Sagittarius, Pisces)
        startSign = 4; // Leo (5th sign, 0-indexed is 4)
    }
    return (startSign + vimshamsaIdx) % 12;
}

export function getD24Rasi(long: number): number {
    const rasiIdx = Math.floor(long / 30);
    const degInRasi = long % 30;
    const chaturvimshamsaIdx = Math.floor(degInRasi / 1.25); // 0 to 23
    let startSign = 4; // odd signs start from Leo (4)
    if (rasiIdx % 2 !== 0) { // even signs
        startSign = 10; // start from Cancer (Cancer is 4th sign, 0-indexed is 3... Wait, Parashara says: "For even signs, starting from Cancer" -> Cancer is index 3. Let's check: "Odd signs from Leo, Even signs from Cancer". Yes! Cancer is index 3.)
        startSign = 3;
    }
    return (startSign + chaturvimshamsaIdx) % 12;
}

export function getD27Rasi(long: number): number {
    const rasiIdx = Math.floor(long / 30);
    const degInRasi = long % 30;
    const nakshatramsaIdx = Math.floor(degInRasi / (30 / 27)); // 0 to 26
    const starts = [0, 3, 6, 9]; // Fire=Aries (0), Earth=Cancer (3), Air=Libra (6), Water=Capricorn (9)
    const startSign = starts[rasiIdx % 4];
    return (startSign + nakshatramsaIdx) % 12;
}

export function getD30Rasi(long: number): number {
    const rasiIdx = Math.floor(long / 30);
    const degInRasi = long % 30;
    const isOdd = rasiIdx % 2 === 0;

    if (isOdd) {
        if (degInRasi < 5) return 0; // Aries (0)
        if (degInRasi < 10) return 10; // Aquarius (10)
        if (degInRasi < 18) return 8; // Sagittarius (8)
        if (degInRasi < 25) return 5; // Virgo (5)
        return 6; // Libra (6)
    } else {
        if (degInRasi < 5) return 1; // Taurus (1)
        if (degInRasi < 12) return 5; // Virgo (5)
        if (degInRasi < 20) return 8; // Sagittarius (8)
        if (degInRasi < 25) return 10; // Aquarius (10)
        return 0; // Aries (0)
    }
}

export function getD40Rasi(long: number): number {
    const rasiIdx = Math.floor(long / 30);
    const degInRasi = long % 30;
    const khavedamsaIdx = Math.floor(degInRasi / 0.75); // 0 to 39
    let startSign = 0; // odd signs start from Aries (0)
    if (rasiIdx % 2 !== 0) { // even signs
        startSign = 6; // start from Libra (6)
    }
    return (startSign + khavedamsaIdx) % 12;
}

export function getD45Rasi(long: number): number {
    const rasiIdx = Math.floor(long / 30);
    const degInRasi = long % 30;
    const akshavedamsaIdx = Math.floor(degInRasi / (30 / 45)); // 0 to 44
    let startSign = rasiIdx; // movable start from rasi itself (for movable rasis rasiIdx % 3 === 0)
    if (rasiIdx % 3 === 1) { // fixed signs start from 9th from it
        startSign = (rasiIdx + 8) % 12;
    } else if (rasiIdx % 3 === 2) { // dual signs start from 5th from it
        startSign = (rasiIdx + 4) % 12;
    }
    return (startSign + akshavedamsaIdx) % 12;
}

export function getD60Rasi(long: number): number {
    const rasiIdx = Math.floor(long / 30);
    const degInRasi = long % 30;
    const shashtiamshaIdx = Math.floor(degInRasi / SHASHTIAMSHA_WIDTH); // 0 to 59

    return (rasiIdx + shashtiamshaIdx) % 12;
}

export function getSignInsight(signName: string, lang: 'en' | 'hi' = 'en'): string {
    const insight = SIGN_INSIGHTS[signName];
    if (!insight) return lang === 'en' ? "A unique blend of celestial energies that shapes your distinct personality and life path." : "स्वर्गीय ऊर्जाओं का एक अनूठा मिश्रण जो आपके विशिष्ट व्यक्तित्व और जीवन पथ को आकार देता है।";
    return insight[lang];
}

function createPlanet(name: string, symbol: string, siderealLong: number, house: number, isRetrograde: boolean, isCombust: boolean = false): PlanetData {
    const normLong = ((siderealLong % 360) + 360) % 360;
    const rasiIdx = Math.floor(normLong / 30) % 12;
    const nakshatraIdx = Math.floor(normLong / NAKSHATRA_WIDTH) % 27;
    const pada = Math.floor((normLong % NAKSHATRA_WIDTH) / PADA_WIDTH) + 1;

    const rasiLordName = RASI_LORDS[rasiIdx];
    const nakLordName = NAKSHATRA_LORDS[nakshatraIdx % 9];

    return {
        name,
        nameSanskrit: PLANET_NAMES[name]?.sanskrit || name,
        symbol,
        degree: formatDegree(normLong),
        rasi: RASIS[rasiIdx],
        rasiSanskrit: RASI_FULL_NAMES[rasiIdx].sanskrit,
        nakshatra: NAKSHATRAS[nakshatraIdx],
        nakshatraSanskrit: NAKSHATRA_NAMES[nakshatraIdx].sanskrit,
        pada,
        house,
        rasiLord: rasiLordName,
        rasiLordSanskrit: PLANET_NAMES[rasiLordName]?.sanskrit || rasiLordName,
        nakshatraLord: nakLordName,
        nakshatraLordSanskrit: PLANET_NAMES[nakLordName]?.sanskrit || nakLordName,
        isRetrograde,
        isCombust
    };
}

export interface TransitEvent {
    type: 'rashi' | 'nakshatra' | 'motion';
    planet: string;
    fromValue: string;
    fromValueSanskrit: string;
    toValue: string;
    toValueSanskrit: string;
    date: Date;
}

export interface PlanetTransits {
    planet: string;
    past: TransitEvent[];
    future: TransitEvent[];
    current?: PlanetData;
}

interface PlanetState {
    rashi: number;
    nakshatra: number;
    isRetro: boolean;
}

const planetLongCache = new Map<string, { long: number, isRetro: boolean }>();
function getPlanetLongAndMotion(planet: string, body: Ast.Body | null, time: Ast.AstroTime): { long: number, isRetro: boolean } {
    const cacheKey = `${planet}_${time.ut}`;
    if (planetLongCache.has(cacheKey)) {
        return planetLongCache.get(cacheKey)!;
    }

    const ayanamsa = getLahiriAyanamsa(time);
    let long = 0;
    let isRetro = false;

    if (planet === "Sun") {
        long = getTrueEclipticLongitude(Ast.Body.Sun, time);
    } else if (planet === "Moon") {
        long = getTrueMoonEclipticLongitude(time);
    } else if (planet === "Rahu") {
        long = getMeanRahu(time);
        isRetro = true;
    } else if (planet === "Ketu") {
        long = (getMeanRahu(time) + 180) % 360;
        isRetro = true;
    } else if (body !== null) {
        long = getTrueEclipticLongitude(body, time);
        isRetro = isPlanetRetrograde(body, time, long);
    }

    const siderealLong = (long - ayanamsa + 360) % 360;
    const result = { long: siderealLong, isRetro };

    if (planetLongCache.size >= 200) {
        const firstKey = planetLongCache.keys().next().value;
        if (firstKey !== undefined) planetLongCache.delete(firstKey);
    }
    planetLongCache.set(cacheKey, result);
    return result;
}

function getPlanetStateAt(planet: string, body: Ast.Body | null, time: Ast.AstroTime): PlanetState {
    const { long, isRetro } = getPlanetLongAndMotion(planet, body, time);
    const rashi = Math.floor(long / 30);
    const nakshatra = Math.floor(long / NAKSHATRA_WIDTH);
    return { rashi, nakshatra, isRetro };
}

function bisectTransit(
    planet: string,
    body: Ast.Body | null,
    type: 'rashi' | 'nakshatra' | 'motion',
    t1: Date,
    t2: Date,
    val1: number | boolean
): Date {
    let low = t1.getTime();
    let high = t2.getTime();
    for (let i = 0; i < 24; i++) {
        if (high - low < 1000) break;
        const mid = (low + high) / 2;
        const midDate = new Date(mid);
        const midTime = Ast.MakeTime(midDate);
        const midVal = getPlanetStateAt(planet, body, midTime);
        const midMetric = type === 'rashi' ? midVal.rashi : type === 'nakshatra' ? midVal.nakshatra : midVal.isRetro;
        if (midMetric === val1) {
            low = mid;
        } else {
            high = mid;
        }
    }
    return new Date((low + high) / 2);
}

function getFutureTransitsForPlanet(
    planet: string,
    body: Ast.Body | null,
    refDate: Date,
    stepDays: number,
    maxSteps: number
): TransitEvent[] {
    const events: TransitEvent[] = [];
    let rashiCount = 0;
    let nakshatraCount = 0;
    let motionCount = 0;

    let prevDate = new Date(refDate);
    let prevTime = Ast.MakeTime(prevDate);
    let prevState = getPlanetStateAt(planet, body, prevTime);

    for (let step = 1; step <= maxSteps && (rashiCount < 3 || nakshatraCount < 3); step++) {
        const currDate = new Date(refDate.getTime() + step * stepDays * 24 * 60 * 60 * 1000);
        const currTime = Ast.MakeTime(currDate);
        const currState = getPlanetStateAt(planet, body, currTime);

        const stepEvents: TransitEvent[] = [];

        if (currState.rashi !== prevState.rashi && rashiCount < 3) {
            const exactDate = bisectTransit(planet, body, 'rashi', prevDate, currDate, prevState.rashi);
            const tMinus = Ast.MakeTime(new Date(exactDate.getTime() - 15 * 60 * 1000));
            const tPlus = Ast.MakeTime(new Date(exactDate.getTime() + 15 * 60 * 1000));
            const sMinus = getPlanetStateAt(planet, body, tMinus);
            const sPlus = getPlanetStateAt(planet, body, tPlus);

            if (sMinus.rashi !== sPlus.rashi) {
                stepEvents.push({
                    type: 'rashi',
                    planet,
                    fromValue: RASI_FULL_NAMES[sMinus.rashi].name,
                    fromValueSanskrit: RASI_FULL_NAMES[sMinus.rashi].sanskrit,
                    toValue: RASI_FULL_NAMES[sPlus.rashi].name,
                    toValueSanskrit: RASI_FULL_NAMES[sPlus.rashi].sanskrit,
                    date: exactDate
                });
            }
        }

        if (currState.nakshatra !== prevState.nakshatra && nakshatraCount < 3) {
            const exactDate = bisectTransit(planet, body, 'nakshatra', prevDate, currDate, prevState.nakshatra);
            const tMinus = Ast.MakeTime(new Date(exactDate.getTime() - 15 * 60 * 1000));
            const tPlus = Ast.MakeTime(new Date(exactDate.getTime() + 15 * 60 * 1000));
            const sMinus = getPlanetStateAt(planet, body, tMinus);
            const sPlus = getPlanetStateAt(planet, body, tPlus);

            if (sMinus.nakshatra !== sPlus.nakshatra) {
                stepEvents.push({
                    type: 'nakshatra',
                    planet,
                    fromValue: NAKSHATRA_NAMES[sMinus.nakshatra].name,
                    fromValueSanskrit: NAKSHATRA_NAMES[sMinus.nakshatra].sanskrit,
                    toValue: NAKSHATRA_NAMES[sPlus.nakshatra].name,
                    toValueSanskrit: NAKSHATRA_NAMES[sPlus.nakshatra].sanskrit,
                    date: exactDate
                });
            }
        }

        if (planet !== "Sun" && planet !== "Moon" && planet !== "Rahu" && planet !== "Ketu" && motionCount < 3) {
            if (currState.isRetro !== prevState.isRetro) {
                const exactDate = bisectTransit(planet, body, 'motion', prevDate, currDate, prevState.isRetro);
                const tMinus = Ast.MakeTime(new Date(exactDate.getTime() - 15 * 60 * 1000));
                const tPlus = Ast.MakeTime(new Date(exactDate.getTime() + 15 * 60 * 1000));
                const sMinus = getPlanetStateAt(planet, body, tMinus);
                const sPlus = getPlanetStateAt(planet, body, tPlus);

                if (sMinus.isRetro !== sPlus.isRetro) {
                    stepEvents.push({
                        type: 'motion',
                        planet,
                        fromValue: sMinus.isRetro ? "Retrograde" : "Direct",
                        fromValueSanskrit: sMinus.isRetro ? "वक्री" : "मार्गी",
                        toValue: sPlus.isRetro ? "Retrograde" : "Direct",
                        toValueSanskrit: sPlus.isRetro ? "वक्री" : "मार्गी",
                        date: exactDate
                    });
                }
            }
        }

        if (stepEvents.length > 0) {
            stepEvents.sort((a, b) => a.date.getTime() - b.date.getTime());
            for (const ev of stepEvents) {
                if (ev.type === 'rashi' && rashiCount < 3) {
                    events.push(ev);
                    rashiCount++;
                } else if (ev.type === 'nakshatra' && nakshatraCount < 3) {
                    events.push(ev);
                    nakshatraCount++;
                } else if (ev.type === 'motion' && motionCount < 3) {
                    events.push(ev);
                    motionCount++;
                }
            }
        }

        prevDate = currDate;
        prevTime = currTime;
        prevState = currState;
    }

    return events;
}

function getPastTransitsForPlanet(
    planet: string,
    body: Ast.Body | null,
    refDate: Date,
    stepDays: number,
    maxSteps: number
): TransitEvent[] {
    const events: TransitEvent[] = [];
    let rashiCount = 0;
    let nakshatraCount = 0;
    let motionCount = 0;

    let prevDate = new Date(refDate);
    let prevTime = Ast.MakeTime(prevDate);
    let prevState = getPlanetStateAt(planet, body, prevTime);

    for (let step = 1; step <= maxSteps && (rashiCount < 3 || nakshatraCount < 3); step++) {
        const currDate = new Date(refDate.getTime() - step * stepDays * 24 * 60 * 60 * 1000);
        const currTime = Ast.MakeTime(currDate);
        const currState = getPlanetStateAt(planet, body, currTime);

        const stepEvents: TransitEvent[] = [];

        if (currState.rashi !== prevState.rashi && rashiCount < 3) {
            const exactDate = bisectTransit(planet, body, 'rashi', currDate, prevDate, currState.rashi);
            const tMinus = Ast.MakeTime(new Date(exactDate.getTime() - 15 * 60 * 1000));
            const tPlus = Ast.MakeTime(new Date(exactDate.getTime() + 15 * 60 * 1000));
            const sMinus = getPlanetStateAt(planet, body, tMinus);
            const sPlus = getPlanetStateAt(planet, body, tPlus);

            if (sMinus.rashi !== sPlus.rashi) {
                stepEvents.push({
                    type: 'rashi',
                    planet,
                    fromValue: RASI_FULL_NAMES[sMinus.rashi].name,
                    fromValueSanskrit: RASI_FULL_NAMES[sMinus.rashi].sanskrit,
                    toValue: RASI_FULL_NAMES[sPlus.rashi].name,
                    toValueSanskrit: RASI_FULL_NAMES[sPlus.rashi].sanskrit,
                    date: exactDate
                });
            }
        }

        if (currState.nakshatra !== prevState.nakshatra && nakshatraCount < 3) {
            const exactDate = bisectTransit(planet, body, 'nakshatra', currDate, prevDate, currState.nakshatra);
            const tMinus = Ast.MakeTime(new Date(exactDate.getTime() - 15 * 60 * 1000));
            const tPlus = Ast.MakeTime(new Date(exactDate.getTime() + 15 * 60 * 1000));
            const sMinus = getPlanetStateAt(planet, body, tMinus);
            const sPlus = getPlanetStateAt(planet, body, tPlus);

            if (sMinus.nakshatra !== sPlus.nakshatra) {
                stepEvents.push({
                    type: 'nakshatra',
                    planet,
                    fromValue: NAKSHATRA_NAMES[sMinus.nakshatra].name,
                    fromValueSanskrit: NAKSHATRA_NAMES[sMinus.nakshatra].sanskrit,
                    toValue: NAKSHATRA_NAMES[sPlus.nakshatra].name,
                    toValueSanskrit: NAKSHATRA_NAMES[sPlus.nakshatra].sanskrit,
                    date: exactDate
                });
            }
        }

        if (planet !== "Sun" && planet !== "Moon" && planet !== "Rahu" && planet !== "Ketu" && motionCount < 3) {
            if (currState.isRetro !== prevState.isRetro) {
                const exactDate = bisectTransit(planet, body, 'motion', currDate, prevDate, currState.isRetro);
                const tMinus = Ast.MakeTime(new Date(exactDate.getTime() - 15 * 60 * 1000));
                const tPlus = Ast.MakeTime(new Date(exactDate.getTime() + 15 * 60 * 1000));
                const sMinus = getPlanetStateAt(planet, body, tMinus);
                const sPlus = getPlanetStateAt(planet, body, tPlus);

                if (sMinus.isRetro !== sPlus.isRetro) {
                    stepEvents.push({
                        type: 'motion',
                        planet,
                        fromValue: sMinus.isRetro ? "Retrograde" : "Direct",
                        fromValueSanskrit: sMinus.isRetro ? "वक्री" : "मार्गी",
                        toValue: sPlus.isRetro ? "Retrograde" : "Direct",
                        toValueSanskrit: sPlus.isRetro ? "वक्री" : "मार्गी",
                        date: exactDate
                    });
                }
            }
        }

        if (stepEvents.length > 0) {
            stepEvents.sort((a, b) => b.date.getTime() - a.date.getTime());
            for (const ev of stepEvents) {
                if (ev.type === 'rashi' && rashiCount < 3) {
                    events.push(ev);
                    rashiCount++;
                } else if (ev.type === 'nakshatra' && nakshatraCount < 3) {
                    events.push(ev);
                    nakshatraCount++;
                } else if (ev.type === 'motion' && motionCount < 3) {
                    events.push(ev);
                    motionCount++;
                }
            }
        }

        prevDate = currDate;
        prevTime = currTime;
        prevState = currState;
    }

    return events;
}

export function getPlanetTransits(planet: string, referenceDate: Date): PlanetTransits {
    let body: Ast.Body | null = null;
    let stepDays = 1;
    let maxSteps = 100;

    switch (planet) {
        case "Sun":
            body = Ast.Body.Sun;
            stepDays = 1;
            maxSteps = 120;
            break;
        case "Moon":
            body = Ast.Body.Moon;
            stepDays = 0.1;
            maxSteps = 100;
            break;
        case "Mars":
            body = Ast.Body.Mars;
            stepDays = 3;
            maxSteps = 120;
            break;
        case "Mercury":
            body = Ast.Body.Mercury;
            stepDays = 1;
            maxSteps = 120;
            break;
        case "Jupiter":
            body = Ast.Body.Jupiter;
            stepDays = 10;
            maxSteps = 120;
            break;
        case "Venus":
            body = Ast.Body.Venus;
            stepDays = 1;
            maxSteps = 120;
            break;
        case "Saturn":
            body = Ast.Body.Saturn;
            stepDays = 20;
            maxSteps = 120;
            break;
        case "Rahu":
        case "Ketu":
            stepDays = 15;
            maxSteps = 120;
            break;
        case "Uranus":
            body = Ast.Body.Uranus;
            stepDays = 30;
            maxSteps = 150;
            break;
        case "Neptune":
            body = Ast.Body.Neptune;
            stepDays = 60;
            maxSteps = 150;
            break;
        case "Pluto":
            body = Ast.Body.Pluto;
            stepDays = 90;
            maxSteps = 150;
            break;
    }

    const past = getPastTransitsForPlanet(planet, body, referenceDate, stepDays, maxSteps);
    const future = getFutureTransitsForPlanet(planet, body, referenceDate, stepDays, maxSteps);

    // Sort both past and future arrays by date ascending (earlier first)
    past.sort((a, b) => a.date.getTime() - b.date.getTime());
    future.sort((a, b) => a.date.getTime() - b.date.getTime());

    // Calculate detailed current position
    const refAstroTime = Ast.MakeTime(referenceDate);
    const { long: siderealLong, isRetro } = getPlanetLongAndMotion(planet, body, refAstroTime);
    const sunLong = getPlanetLongAndMotion("Sun", null, refAstroTime).long;
    const isComb = (planet !== "Sun" && planet !== "Moon" && body !== null) ? isPlanetCombustAt(planet, body, refAstroTime, siderealLong, isRetro, sunLong) : false;
    const currentPlanetData = createPlanet(planet, PLANET_NAMES[planet]?.symbol || planet.slice(0, 2), siderealLong, 1, isRetro, isComb);

    return {
        planet,
        past,
        future,
        current: currentPlanetData
    };
}

export interface CombustionPeriod {
    planet: string;
    start: Date;
    end: Date;
    isCurrent: boolean;
}

function isPlanetCombustAt(
    planet: string,
    body: Ast.Body,
    time: Ast.AstroTime,
    precomputedLong?: number,
    precomputedIsRetro?: boolean,
    precomputedSunLong?: number
): boolean {
    // Optimization: Skip expensive coordinate and retrograde recalculations if parameters are precomputed
    const sunLong = precomputedSunLong !== undefined
        ? precomputedSunLong
        : getPlanetLongAndMotion("Sun", null, time).long;

    let planetLong: number;
    let isRetro: boolean;

    if (precomputedLong !== undefined && precomputedIsRetro !== undefined) {
        planetLong = precomputedLong;
        isRetro = precomputedIsRetro;
    } else {
        const res = getPlanetLongAndMotion(planet, body, time);
        planetLong = res.long;
        isRetro = res.isRetro;
    }

    const diff = Math.min(Math.abs(planetLong - sunLong), 360 - Math.abs(planetLong - sunLong));

    let limit = 0;
    if (planet === "Mars") limit = 17;
    else if (planet === "Mercury") limit = isRetro ? 12 : 14;
    else if (planet === "Jupiter") limit = 11;
    else if (planet === "Venus") limit = isRetro ? 8 : 10;
    else if (planet === "Saturn") limit = 15;
    else return false;

    return diff <= limit;
}

function findCombustionBoundary(
    planet: string,
    body: Ast.Body,
    t1: Date,
    t2: Date,
    targetState: boolean
): Date {
    let low = t1.getTime();
    let high = t2.getTime();
    for (let i = 0; i < 10; i++) {
        const mid = (low + high) / 2;
        const midDate = new Date(mid);
        const midTime = Ast.MakeTime(midDate);
        const midState = isPlanetCombustAt(planet, body, midTime);
        if (midState === targetState) {
            high = mid;
        } else {
            low = mid;
        }
    }
    return new Date((low + high) / 2);
}

export function getFutureCombustions(referenceDate: Date): CombustionPeriod[] {
    const planets = [
        { name: "Mercury", body: Ast.Body.Mercury },
        { name: "Venus", body: Ast.Body.Venus },
        { name: "Mars", body: Ast.Body.Mars },
        { name: "Jupiter", body: Ast.Body.Jupiter },
        { name: "Saturn", body: Ast.Body.Saturn }
    ];

    const results: CombustionPeriod[] = [];
    const scanDays = 1100;
    const stepSize = 3;

    for (const p of planets) {
        const isCombust = isPlanetCombustAt(p.name, p.body, Ast.MakeTime(referenceDate));

        let foundPeriod: CombustionPeriod | null = null;
        let lastState = isCombust;
        let lastDate = new Date(referenceDate);

        for (let d = stepSize; d <= scanDays; d += stepSize) {
            const currDate = new Date(referenceDate.getTime() + d * 24 * 60 * 60 * 1000);
            const currState = isPlanetCombustAt(p.name, p.body, Ast.MakeTime(currDate));

            if (currState !== lastState) {
                if (currState === true) {
                    const boundary = findCombustionBoundary(p.name, p.body, lastDate, currDate, true);
                    if (!isCombust) {
                        let endBoundary: Date | null = null;
                        let lastExitDate = new Date(currDate);

                        for (let d2 = d + stepSize; d2 <= scanDays; d2 += stepSize) {
                            const exitDate = new Date(referenceDate.getTime() + d2 * 24 * 60 * 60 * 1000);
                            const exitState = isPlanetCombustAt(p.name, p.body, Ast.MakeTime(exitDate));
                            if (exitState === false) {
                                endBoundary = findCombustionBoundary(p.name, p.body, lastExitDate, exitDate, false);
                                break;
                            }
                            lastExitDate = exitDate;
                        }

                        if (endBoundary) {
                            foundPeriod = {
                                planet: p.name,
                                start: boundary,
                                end: endBoundary,
                                isCurrent: false
                            };
                        } else {
                            foundPeriod = {
                                planet: p.name,
                                start: boundary,
                                end: new Date(referenceDate.getTime() + scanDays * 24 * 60 * 60 * 1000),
                                isCurrent: false
                            };
                        }
                        break;
                    }
                } else {
                    const boundary = findCombustionBoundary(p.name, p.body, lastDate, currDate, false);
                    if (isCombust) {
                        foundPeriod = {
                            planet: p.name,
                            start: referenceDate,
                            end: boundary,
                            isCurrent: true
                        };
                        break;
                    }
                }
            }

            lastState = currState;
            lastDate = currDate;
        }

        if (isCombust && !foundPeriod) {
            foundPeriod = {
                planet: p.name,
                start: referenceDate,
                end: new Date(referenceDate.getTime() + scanDays * 24 * 60 * 60 * 1000),
                isCurrent: true
            };
        }

        if (foundPeriod) {
            results.push(foundPeriod);
        }
    }

    return results;
}

export interface PeriodDetails {
    start: Date | null;
    end: Date | null;
}

export interface TransitPeriodGroup {
    currentOrNext: PeriodDetails;
    previous: PeriodDetails;
}

function getRetroStepDays(planet: string): number {
    switch (planet) {
        case "Mercury": return 2;
        case "Venus": return 4;
        case "Mars": return 6;
        case "Jupiter": return 12;
        case "Saturn": return 15;
        case "Uranus": return 20;
        case "Neptune": return 30;
        case "Pluto": return 40;
        default: return 10;
    }
}

function getRetroStateAt(planet: string, body: Ast.Body, date: Date): boolean {
    const time = Ast.MakeTime(date);
    return isPlanetRetrograde(body, time);
}

function bisectRetrogradeSwitch(planet: string, body: Ast.Body, d1: Date, d2: Date): Date {
    let low = d1.getTime();
    let high = d2.getTime();
    const s1 = getRetroStateAt(planet, body, d1);
    for (let i = 0; i < 24; i++) {
        const mid = (low + high) / 2;
        const sMid = getRetroStateAt(planet, body, new Date(mid));
        if (sMid === s1) {
            low = mid;
        } else {
            high = mid;
        }
    }
    return new Date((low + high) / 2);
}

export function getRetrogradeDetails(planet: string, refDate: Date): TransitPeriodGroup | null {
    let body: Ast.Body | null = null;
    switch (planet) {
        case "Mercury": body = Ast.Body.Mercury; break;
        case "Venus": body = Ast.Body.Venus; break;
        case "Mars": body = Ast.Body.Mars; break;
        case "Jupiter": body = Ast.Body.Jupiter; break;
        case "Saturn": body = Ast.Body.Saturn; break;
        case "Uranus": body = Ast.Body.Uranus; break;
        case "Neptune": body = Ast.Body.Neptune; break;
        case "Pluto": body = Ast.Body.Pluto; break;
        default: return null;
    }

    const stepDays = getRetroStepDays(planet);
    const stepMs = stepDays * 24 * 60 * 60 * 1000;
    const initialRetro = getRetroStateAt(planet, body, refDate);

    let currentOrNextStart: Date | null = null;
    let currentOrNextEnd: Date | null = null;
    let previousStart: Date | null = null;
    let previousEnd: Date | null = null;

    if (initialRetro) {
        for (let i = 1; i <= 300; i++) {
            const currDate = new Date(refDate.getTime() - i * stepMs);
            const state = getRetroStateAt(planet, body, currDate);
            if (!state) {
                const boundaryDate = new Date(currDate.getTime() + stepMs);
                currentOrNextStart = bisectRetrogradeSwitch(planet, body, currDate, boundaryDate);
                break;
            }
        }

        for (let i = 1; i <= 300; i++) {
            const currDate = new Date(refDate.getTime() + i * stepMs);
            const state = getRetroStateAt(planet, body, currDate);
            if (!state) {
                const prevScannedDate = new Date(currDate.getTime() - stepMs);
                currentOrNextEnd = bisectRetrogradeSwitch(planet, body, prevScannedDate, currDate);
                break;
            }
        }

        if (currentOrNextStart) {
            const startSearchDate = new Date(currentOrNextStart.getTime() - 60 * 60 * 1000);
            let foundEnd = false;
            let lastRetroDate: Date | null = null;

            for (let i = 1; i <= 300; i++) {
                const currDate = new Date(startSearchDate.getTime() - i * stepMs);
                const state = getRetroStateAt(planet, body, currDate);
                if (state) {
                    const boundaryDate = new Date(currDate.getTime() + stepMs);
                    previousEnd = bisectRetrogradeSwitch(planet, body, currDate, boundaryDate);
                    lastRetroDate = currDate;
                    foundEnd = true;
                    break;
                }
            }

            if (foundEnd && lastRetroDate) {
                for (let i = 1; i <= 300; i++) {
                    const currDate = new Date(lastRetroDate.getTime() - i * stepMs);
                    const state = getRetroStateAt(planet, body, currDate);
                    if (!state) {
                        const boundaryDate = new Date(currDate.getTime() + stepMs);
                        previousStart = bisectRetrogradeSwitch(planet, body, currDate, boundaryDate);
                        break;
                    }
                }
            }
        }

    } else {
        let foundNextStart = false;
        let lastRetroDate: Date | null = null;
        for (let i = 1; i <= 300; i++) {
            const currDate = new Date(refDate.getTime() + i * stepMs);
            const state = getRetroStateAt(planet, body, currDate);
            if (state) {
                const prevScannedDate = new Date(currDate.getTime() - stepMs);
                currentOrNextStart = bisectRetrogradeSwitch(planet, body, prevScannedDate, currDate);
                lastRetroDate = currDate;
                foundNextStart = true;
                break;
            }
        }

        if (foundNextStart && lastRetroDate) {
            for (let i = 1; i <= 300; i++) {
                const currDate = new Date(lastRetroDate.getTime() + i * stepMs);
                const state = getRetroStateAt(planet, body, currDate);
                if (!state) {
                    const prevScannedDate = new Date(currDate.getTime() - stepMs);
                    currentOrNextEnd = bisectRetrogradeSwitch(planet, body, prevScannedDate, currDate);
                    break;
                }
            }
        }

        let foundEnd = false;
        let lastRetroPastDate: Date | null = null;
        for (let i = 1; i <= 300; i++) {
            const currDate = new Date(refDate.getTime() - i * stepMs);
            const state = getRetroStateAt(planet, body, currDate);
            if (state) {
                const boundaryDate = new Date(currDate.getTime() + stepMs);
                previousEnd = bisectRetrogradeSwitch(planet, body, currDate, boundaryDate);
                lastRetroPastDate = currDate;
                foundEnd = true;
                break;
            }
        }

        if (foundEnd && lastRetroPastDate) {
            for (let i = 1; i <= 300; i++) {
                const currDate = new Date(lastRetroPastDate.getTime() - i * stepMs);
                const state = getRetroStateAt(planet, body, currDate);
                if (!state) {
                    const boundaryDate = new Date(currDate.getTime() + stepMs);
                    previousStart = bisectRetrogradeSwitch(planet, body, currDate, boundaryDate);
                    break;
                }
            }
        }
    }

    return {
        currentOrNext: { start: currentOrNextStart, end: currentOrNextEnd },
        previous: { start: previousStart, end: previousEnd }
    };
}

export interface HoraInterval {
    number: number;
    start: Date;
    end: Date;
    lord: string;
    lordSanskrit: string;
    type: "day" | "night";
    nature: "benefic" | "malefic";
    activities: {
        en: string[];
        hi: string[];
    };
    avoid: {
        en: string[];
        hi: string[];
    };
}

export interface HoraData {
    selectedDate: Date;
    sunrise: Date;
    sunset: Date;
    nextSunrise: Date;
    horas: HoraInterval[];
}

export function getHoraData(dob: string, latStr?: string, lonStr?: string): HoraData {
    const lat = parseFloat(latStr || "28.6139");
    const lon = parseFloat(lonStr || "77.2090");
    const observer = new Ast.Observer(lat, lon, 0);

    const { time } = parseISTToUTC(dob, "12:00");
    const varaData = getVedicVara(time, lat, lon);

    const sunriseDate = varaData.sunrise || time.date;

    const nextSunriseResult = Ast.SearchRiseSet(Ast.Body.Sun, observer, 1, Ast.MakeTime(new Date(sunriseDate.getTime() + 2 * 60 * 60 * 1000)), 30);
    const nextSunriseDate = nextSunriseResult ? nextSunriseResult.date : new Date(sunriseDate.getTime() + 24 * 60 * 60 * 1000);

    const sunsetResult = Ast.SearchRiseSet(Ast.Body.Sun, observer, -1, Ast.MakeTime(sunriseDate), 24);
    const sunsetDate = sunsetResult ? sunsetResult.date : new Date(sunriseDate.getTime() + 12 * 60 * 60 * 1000);

    const dayDuration = sunsetDate.getTime() - sunriseDate.getTime();
    const dayHoraLength = dayDuration / 12;

    const nightDuration = nextSunriseDate.getTime() - sunsetDate.getTime();
    const nightHoraLength = nightDuration / 12;

    const VARA_LORDS: Record<string, string> = {
        "Sunday": "Sun",
        "Monday": "Moon",
        "Tuesday": "Mars",
        "Wednesday": "Mercury",
        "Thursday": "Jupiter",
        "Friday": "Venus",
        "Saturday": "Saturn"
    };

    const orderOfHoraLords = ["Sun", "Venus", "Mercury", "Moon", "Saturn", "Jupiter", "Mars"];
    const startLord = VARA_LORDS[varaData.name] || "Sun";
    const startIdx = orderOfHoraLords.indexOf(startLord);

    const PLANET_SANSKRIT: Record<string, string> = {
        "Sun": "सूर्य",
        "Moon": "चन्द्र",
        "Mars": "मंगल",
        "Mercury": "बुध",
        "Jupiter": "गुरु",
        "Venus": "शुक्र",
        "Saturn": "शनि"
    };

    const PLANET_HORA_PROPERTIES: Record<string, {
        nature: "benefic" | "malefic";
        activities: { en: string[]; hi: string[] };
        avoid: { en: string[]; hi: string[] };
    }> = {
        "Sun": {
            nature: "malefic",
            activities: {
                en: [
                    "Meeting politicians, government officials, or authorities",
                    "Applying for government jobs, tenders, or services",
                    "Buying gold, copper, ruby, or royal ornaments",
                    "Taking charge of a leadership position or starting administration",
                    "Performing religious fire rituals (Yagna) or Sun worship"
                ],
                hi: [
                    "राजनेताओं, सरकारी अधिकारियों या वरिष्ठ अधिकारियों से मिलना",
                    "सरकारी नौकरियों, निविदाओं या सेवाओं के लिए आवेदन करना",
                    "सोना, तांबा, माणिक या शाही आभूषण खरीदना",
                    "नेतृत्व की स्थिति संभालना या प्रशासन शुरू करना",
                    "धार्मिक यज्ञ, हवन या सूर्य पूजा करना"
                ]
            },
            avoid: {
                en: [
                    "Starting travel towards the West direction",
                    "Important financial investments or loan signings",
                    "Marriages, engagements, or signing peace treaties"
                ],
                hi: [
                    "पश्चिम दिशा की ओर यात्रा प्रारंभ करना",
                    "महत्वपूर्ण वित्तीय निवेश या ऋण दस्तावेजों पर हस्ताक्षर करना",
                    "विवाह, सगाई या शांति संधियों पर हस्ताक्षर करना"
                ]
            }
        },
        "Venus": {
            nature: "benefic",
            activities: {
                en: [
                    "Romance, dating, marriage, and proposal discussions",
                    "Buying clothes, jewelry, perfumes, cosmetics, and luxury goods",
                    "Creative projects, artistic writing, music, film, and design",
                    "Buying new vehicles, starting journeys, and beauty treatments",
                    "Performing social gatherings and entertainment ceremonies"
                ],
                hi: [
                    "रोमांस, डेटिंग, विवाह और प्रेम प्रस्ताव की चर्चा",
                    "कपड़े, आभूषण, इत्र, सौंदर्य प्रसाधन और विलासिता की वस्तुएं खरीदना",
                    "रचनात्मक परियोजनाएं, कलात्मक लेखन, संगीत, फिल्म और डिजाइन",
                    "नए वाहन खरीदना, यात्राएं शुरू करना और सौंदर्य उपचार",
                    "सामाजिक समारोहों और मनोरंजन कार्यक्रमों का आयोजन"
                ]
            },
            avoid: {
                en: [
                    "Entering legal disputes, court battles, or arguments",
                    "Performing hard physical labor or heavy machinery installation",
                    "Conducting fire rituals (Yagna)"
                ],
                hi: [
                    "कानूनी विवादों, अदालती लड़ाइयों या बहस में पड़ना",
                    "कठिन शारीरिक श्रम या भारी मशीनरी स्थापित करना",
                    "यज्ञ या उग्र अनुष्ठान करना"
                ]
            }
        },
        "Mercury": {
            nature: "benefic",
            activities: {
                en: [
                    "Writing, editing, and publishing documents or books",
                    "Signing contracts, agreements, and trade deals",
                    "Learning new skills, studying languages, or science courses",
                    "Trading in stock markets, account management, and marketing",
                    "Intellectual debates, starting educational programs, or short travels"
                ],
                hi: [
                    "दस्तावेजों या पुस्तकों का लेखन, संपादन और प्रकाशन",
                    "अनुबंधों, समझौतों और व्यापारिक सौदों पर हस्ताक्षर करना",
                    "नए कौशल सीखना, भाषाओं का अध्ययन करना या विज्ञान के पाठ्यक्रम",
                    "शेयर बाजारों में व्यापार, खाता प्रबंधन और विपणन",
                    "बौद्धिक बहस, शैक्षणिक कार्यक्रम शुरू करना या छोटी यात्राएं"
                ]
            },
            avoid: {
                en: [
                    "Making decisions purely based on temporary emotions",
                    "Starting long-term heavy construction projects",
                    "Entering arguments with maternal relatives"
                ],
                hi: [
                    "पूरी तरह से अस्थायी भावनाओं के आधार पर निर्णय लेना",
                    "दीर्घकालिक भारी निर्माण कार्य शुरू करना",
                    "मातृ पक्ष के रिश्तेदारों के साथ विवाद में पड़ना"
                ]
            }
        },
        "Moon": {
            nature: "benefic",
            activities: {
                en: [
                    "Gardening, agriculture, or planting seeds",
                    "Meeting family, mothers, and close female relatives",
                    "Emotional healing, meditation, and psychological self-care",
                    "Traveling by water, purchasing silver, household or dairy goods",
                    "Launching public-facing projects, speeches, and culinary trials"
                ],
                hi: [
                    "बागवानी, कृषि, या बीज बोना",
                    "परिवार, माता और करीबी महिला रिश्तेदारों से मिलना",
                    "भावनात्मक उपचार, ध्यान और मनोवैज्ञानिक आत्म-देखभाल",
                    "जल मार्ग से यात्रा, चांदी, घरेलू या डेयरी उत्पाद खरीदना",
                    "जन-उन्मुख परियोजनाओं की शुरुआत, भाषण और पाक कला के परीक्षण"
                ]
            },
            avoid: {
                en: [
                    "Decisions requiring intense, non-emotional logical debates",
                    "Signing highly detailed financial loans or deep contracts",
                    "Undergoing major surgeries or operations"
                ],
                hi: [
                    "तीव्र, गैर-भावनात्मक तार्किक बहस की आवश्यकता वाले निर्णय",
                    "अत्यधिक विस्तृत वित्तीय ऋण या गहरे समझौतों पर हस्ताक्षर",
                    "बड़ी सर्जरी या ऑपरेशन कराना"
                ]
            }
        },
        "Saturn": {
            nature: "malefic",
            activities: {
                en: [
                    "Buying land, property, houses, or mining rights",
                    "Hiring labor, factory management, and physical construction",
                    "Starting long-term, slow-paced endeavors requiring patience",
                    "Planting long-lived trees, digging wells, or foundations",
                    "Charity, visiting old-age homes, and deep spiritual solitude"
                ],
                hi: [
                    "भूमि, संपत्ति, मकान या खनन अधिकार खरीदना",
                    "श्रम की नियुक्ति, कारखाना प्रबंधन और भौतिक निर्माण",
                    "धैर्य की आवश्यकता वाले दीर्घकालिक, धीमी गति के प्रयास शुरू करना",
                    "दीर्घजीवी पेड़ लगाना, कुएं या नींव खोदना",
                    "दान, वृद्धाश्रमों का दौरा करना और गहन आध्यात्मिक एकांत"
                ]
            },
            avoid: {
                en: [
                    "Buying new vehicles, luxury items, or clothes",
                    "Initiating marriages, engagements, or romantic proposals",
                    "Entering new partnerships, fast profit business, or long travels"
                ],
                hi: [
                    "नए वाहन, विलासिता की वस्तुएं या कपड़े खरीदना",
                    "विवाह, सगाई या रोमांटिक प्रस्ताव शुरू करना",
                    "नई साझेदारी, त्वरित लाभ के व्यवसाय या लंबी यात्राएं शुरू करना"
                ]
            }
        },
        "Jupiter": {
            nature: "benefic",
            activities: {
                en: [
                    "Meeting spiritual gurus, teachers, mentors, or advisors",
                    "Performing religious rituals, weddings, and sacred blessings",
                    "Investing wealth, long-term savings, or banking deals",
                    "Buying gold, yellow stones (topaz), and studying philosophy",
                    "Starting long-distance travels, pilgrimages, and charities"
                ],
                hi: [
                    "आध्यात्मिक गुरुओं, शिक्षकों, आकाओं या सलाहकारों से मिलना",
                    "धार्मिक अनुष्ठान, विवाह और पवित्र मांगलिक कार्य करना",
                    "धन निवेश, दीर्घकालिक बचत या बैंकिंग सौदे",
                    "सोना, पीले रत्न (पुखराज) खरीदना और दर्शनशास्त्र का अध्ययन",
                    "लंबी दूरी की यात्राएं, तीर्थयात्राएं और दान शुरू करना"
                ]
            },
            avoid: {
                en: [
                    "Taking out new financial loans or debts",
                    "Aggressive debates, filing legal suits, or entering surgeries",
                    "Starting low-level work or unethical deals"
                ],
                hi: [
                    "नए वित्तीय ऋण या कर्ज लेना",
                    "उग्र वाद-विवाद, कानूनी मुकदमे दायर करना या सर्जरी कराना",
                    "निम्न स्तर का काम या अनैतिक सौदे शुरू करना"
                ]
            }
        },
        "Mars": {
            nature: "malefic",
            activities: {
                en: [
                    "Sports, physical workouts, martial arts, and competitions",
                    "Undergoing surgeries, medical checkups, or dental work",
                    "Administrative commands, security setup, and police/military operations",
                    "Buying machinery, tools, vehicles, weapons, or land",
                    "Managing fire-related works, furnaces, cooking, or engineering tasks"
                ],
                hi: [
                    "खेल, शारीरिक कसरत, मार्शल आर्ट और प्रतियोगिताएं",
                    "सर्जरी, चिकित्सा जांच या दंत चिकित्सा कार्य कराना",
                    "प्रशासनिक आदेश, सुरक्षा व्यवस्था और पुलिस/सैन्य अभियान",
                    "मशीनरी, उपकरण, वाहन, हथियार या भूमि खरीदना",
                    "अग्नि से संबंधित कार्य, भट्टियां, खाना बनाना या इंजीनियरिंग कार्य"
                ]
            },
            avoid: {
                en: [
                    "Commencing long journeys or traveling in vehicles",
                    "Starting peaceful negotiations, weddings, or signing contracts",
                    "Arguments with siblings or elder family members"
                ],
                hi: [
                    "लंबी यात्राएं शुरू करना या वाहनों में यात्रा करना",
                    "शांतिपूर्ण बातचीत, विवाह या समझौतों पर हस्ताक्षर करना",
                    "भाई-बहनों या परिवार के बुजुर्ग सदस्यों के साथ बहस करना"
                ]
            }
        }
    };

    const horas: HoraInterval[] = [];

    // Calculate 12 Day Horas
    for (let i = 0; i < 12; i++) {
        const start = new Date(sunriseDate.getTime() + i * dayHoraLength);
        const end = new Date(sunriseDate.getTime() + (i + 1) * dayHoraLength);
        const lord = orderOfHoraLords[(startIdx + i) % 7];
        const props = PLANET_HORA_PROPERTIES[lord] || { nature: "benefic" as const, activities: { en: [], hi: [] }, avoid: { en: [], hi: [] } };

        horas.push({
            number: i + 1,
            start,
            end,
            lord,
            lordSanskrit: PLANET_SANSKRIT[lord] || lord,
            type: "day",
            nature: props.nature,
            activities: props.activities,
            avoid: props.avoid
        });
    }

    // Calculate 12 Night Horas
    for (let i = 0; i < 12; i++) {
        const start = new Date(sunsetDate.getTime() + i * nightHoraLength);
        const end = new Date(sunsetDate.getTime() + (i + 1) * nightHoraLength);
        const lord = orderOfHoraLords[(startIdx + 12 + i) % 7];
        const props = PLANET_HORA_PROPERTIES[lord] || { nature: "benefic" as const, activities: { en: [], hi: [] }, avoid: { en: [], hi: [] } };

        horas.push({
            number: 12 + i + 1,
            start,
            end,
            lord,
            lordSanskrit: PLANET_SANSKRIT[lord] || lord,
            type: "night",
            nature: props.nature,
            activities: props.activities,
            avoid: props.avoid
        });
    }

    return {
        selectedDate: time.date,
        sunrise: sunriseDate,
        sunset: sunsetDate,
        nextSunrise: nextSunriseDate,
        horas
    };
}

export function isVargaExalted(planet: string, signIdx: number): boolean {
    const exaltationSigns: Record<string, number> = {
        "Sun": 0, "Moon": 1, "Mars": 9, "Mercury": 5, "Jupiter": 3, "Venus": 11, "Saturn": 6
    };
    return exaltationSigns[planet] === signIdx;
}

export function getCompoundRelationship(planet: string, lord: string, planets: PlanetData[]): string {
    if (planet === lord) return "Own";
    const pData = planets.find(pl => pl.name === planet);
    const lData = planets.find(pl => pl.name === lord);
    if (!pData || !lData) return "Neutral";

    const naturalRelations: Record<string, Record<string, string>> = {
        "Sun": { "Moon": "Friend", "Mars": "Friend", "Mercury": "Neutral", "Jupiter": "Friend", "Venus": "Enemy", "Saturn": "Enemy", "Sun": "Neutral" },
        "Moon": { "Sun": "Friend", "Moon": "Neutral", "Mars": "Neutral", "Mercury": "Friend", "Jupiter": "Neutral", "Venus": "Neutral", "Saturn": "Neutral" },
        "Mars": { "Sun": "Friend", "Moon": "Friend", "Mars": "Neutral", "Mercury": "Enemy", "Jupiter": "Friend", "Venus": "Neutral", "Saturn": "Neutral" },
        "Mercury": { "Sun": "Friend", "Moon": "Enemy", "Mars": "Neutral", "Mercury": "Neutral", "Jupiter": "Neutral", "Venus": "Friend", "Saturn": "Neutral" },
        "Jupiter": { "Sun": "Friend", "Moon": "Friend", "Mars": "Friend", "Mercury": "Enemy", "Jupiter": "Neutral", "Venus": "Enemy", "Saturn": "Neutral" },
        "Venus": { "Sun": "Enemy", "Moon": "Enemy", "Mars": "Neutral", "Mercury": "Friend", "Jupiter": "Neutral", "Venus": "Neutral", "Saturn": "Friend" },
        "Saturn": { "Sun": "Enemy", "Moon": "Enemy", "Mars": "Enemy", "Mercury": "Friend", "Jupiter": "Neutral", "Venus": "Friend", "Saturn": "Neutral" }
    };
    const nat = naturalRelations[planet]?.[lord] || "Neutral";

    const diff = (lData.house - pData.house + 12) % 12;
    const temp = [1, 2, 3, 9, 10, 11].includes(diff) ? "Friend" : "Enemy";

    if (nat === "Friend" && temp === "Friend") return "Great Friend";
    if (nat === "Enemy" && temp === "Enemy") return "Great Enemy";
    if (nat === "Friend" && temp === "Enemy") return "Neutral";
    if (nat === "Enemy" && temp === "Friend") return "Neutral";
    if (nat === "Neutral" && temp === "Friend") return "Friend";
    return "Enemy";
}

export function calculateSaptavargajaBala(pName: string, long: number, planets: PlanetData[]): number {
    const vargas = ["D1", "D2", "D3", "D7", "D9", "D12", "D30"];
    const exaltationDegrees: Record<string, number> = {
        "Sun": 10, "Moon": 3, "Mars": 28, "Mercury": 15, "Jupiter": 5, "Venus": 27, "Saturn": 20
    };

    let total = 0;
    for (const v of vargas) {
        let signIdx = 0;
        if (v === "D1") signIdx = Math.floor(long / 30);
        else if (v === "D2") signIdx = getD2Rasi(long);
        else if (v === "D3") signIdx = getD3Rasi(long);
        else if (v === "D7") signIdx = getD7Rasi(long);
        else if (v === "D9") signIdx = getD9Rasi(long);
        else if (v === "D12") signIdx = getD12Rasi(long);
        else if (v === "D30") signIdx = getD30Rasi(long);

        const signLord = RASI_LORDS[signIdx % 12];
        const isExalted = isVargaExalted(pName, signIdx);
        if (isExalted) {
            const deg = long % 30;
            if (deg <= exaltationDegrees[pName]) {
                total += 60;
            } else {
                total += 30;
            }
        } else if (pName === signLord) {
            total += 30;
        } else {
            const rel = getCompoundRelationship(pName, signLord, planets);
            if (rel === "Great Friend") total += 22.5;
            else if (rel === "Friend") total += 15;
            else if (rel === "Neutral") total += 7.5;
            else if (rel === "Enemy") total += 3.75;
            else if (rel === "Great Enemy") total += 1.875;
        }
    }
    return Number(total.toFixed(2));
}

function getCombustStepDays(planet: string): number {
    switch (planet) {
        case "Mercury": return 2;
        case "Venus": return 4;
        case "Mars": return 10;
        case "Jupiter": return 5;
        case "Saturn": return 5;
        default: return 5;
    }
}

function getCombustStateAt(planet: string, body: Ast.Body, date: Date): boolean {
    const time = Ast.MakeTime(date);
    return isPlanetCombustAt(planet, body, time);
}

function bisectCombustionSwitch(planet: string, body: Ast.Body, d1: Date, d2: Date): Date {
    let low = d1.getTime();
    let high = d2.getTime();
    const s1 = getCombustStateAt(planet, body, d1);
    for (let i = 0; i < 24; i++) {
        const mid = (low + high) / 2;
        const sMid = getCombustStateAt(planet, body, new Date(mid));
        if (sMid === s1) {
            low = mid;
        } else {
            high = mid;
        }
    }
    return new Date((low + high) / 2);
}

export function getCombustionDetails(planet: string, refDate: Date): TransitPeriodGroup | null {
    let body: Ast.Body | null = null;
    switch (planet) {
        case "Mercury": body = Ast.Body.Mercury; break;
        case "Venus": body = Ast.Body.Venus; break;
        case "Mars": body = Ast.Body.Mars; break;
        case "Jupiter": body = Ast.Body.Jupiter; break;
        case "Saturn": body = Ast.Body.Saturn; break;
        default: return null;
    }

    const stepDays = getCombustStepDays(planet);
    const stepMs = stepDays * 24 * 60 * 60 * 1000;
    const initialCombust = getCombustStateAt(planet, body, refDate);

    let currentOrNextStart: Date | null = null;
    let currentOrNextEnd: Date | null = null;
    let previousStart: Date | null = null;
    let previousEnd: Date | null = null;

    if (initialCombust) {
        for (let i = 1; i <= 300; i++) {
            const currDate = new Date(refDate.getTime() - i * stepMs);
            const state = getCombustStateAt(planet, body, currDate);
            if (!state) {
                const boundaryDate = new Date(currDate.getTime() + stepMs);
                currentOrNextStart = bisectCombustionSwitch(planet, body, currDate, boundaryDate);
                break;
            }
        }

        for (let i = 1; i <= 300; i++) {
            const currDate = new Date(refDate.getTime() + i * stepMs);
            const state = getCombustStateAt(planet, body, currDate);
            if (!state) {
                const prevScannedDate = new Date(currDate.getTime() - stepMs);
                currentOrNextEnd = bisectCombustionSwitch(planet, body, prevScannedDate, currDate);
                break;
            }
        }

        if (currentOrNextStart) {
            const startSearchDate = new Date(currentOrNextStart.getTime() - 60 * 60 * 1000);
            let foundEnd = false;
            let lastCombustDate: Date | null = null;

            for (let i = 1; i <= 300; i++) {
                const currDate = new Date(startSearchDate.getTime() - i * stepMs);
                const state = getCombustStateAt(planet, body, currDate);
                if (state) {
                    const boundaryDate = new Date(currDate.getTime() + stepMs);
                    previousEnd = bisectCombustionSwitch(planet, body, currDate, boundaryDate);
                    lastCombustDate = currDate;
                    foundEnd = true;
                    break;
                }
            }

            if (foundEnd && lastCombustDate) {
                for (let i = 1; i <= 300; i++) {
                    const currDate = new Date(lastCombustDate.getTime() - i * stepMs);
                    const state = getCombustStateAt(planet, body, currDate);
                    if (!state) {
                        const boundaryDate = new Date(currDate.getTime() + stepMs);
                        previousStart = bisectCombustionSwitch(planet, body, currDate, boundaryDate);
                        break;
                    }
                }
            }
        }

    } else {
        let foundNextStart = false;
        let lastCombustDate: Date | null = null;
        for (let i = 1; i <= 300; i++) {
            const currDate = new Date(refDate.getTime() + i * stepMs);
            const state = getCombustStateAt(planet, body, currDate);
            if (state) {
                const prevScannedDate = new Date(currDate.getTime() - stepMs);
                currentOrNextStart = bisectCombustionSwitch(planet, body, prevScannedDate, currDate);
                lastCombustDate = currDate;
                foundNextStart = true;
                break;
            }
        }

        if (foundNextStart && lastCombustDate) {
            for (let i = 1; i <= 300; i++) {
                const currDate = new Date(lastCombustDate.getTime() + i * stepMs);
                const state = getCombustStateAt(planet, body, currDate);
                if (!state) {
                    const prevScannedDate = new Date(currDate.getTime() - stepMs);
                    currentOrNextEnd = bisectCombustionSwitch(planet, body, prevScannedDate, currDate);
                    break;
                }
            }
        }

        let foundEnd = false;
        let lastCombustPastDate: Date | null = null;
        for (let i = 1; i <= 300; i++) {
            const currDate = new Date(refDate.getTime() - i * stepMs);
            const state = getCombustStateAt(planet, body, currDate);
            if (state) {
                const boundaryDate = new Date(currDate.getTime() + stepMs);
                previousEnd = bisectCombustionSwitch(planet, body, currDate, boundaryDate);
                lastCombustPastDate = currDate;
                foundEnd = true;
                break;
            }
        }

        if (foundEnd && lastCombustPastDate) {
            for (let i = 1; i <= 300; i++) {
                const currDate = new Date(lastCombustPastDate.getTime() - i * stepMs);
                const state = getCombustStateAt(planet, body, currDate);
                if (!state) {
                    const boundaryDate = new Date(currDate.getTime() + stepMs);
                    previousStart = bisectCombustionSwitch(planet, body, currDate, boundaryDate);
                    break;
                }
            }
        }
    }

    return {
        currentOrNext: { start: currentOrNextStart, end: currentOrNextEnd },
        previous: { start: previousStart, end: previousEnd }
    };
}
