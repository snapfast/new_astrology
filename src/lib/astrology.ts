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
}

export interface SookshmaDasha {
    lord: string;
    start: Date;
    end: Date;
}

export interface Pratyantardasha {
    lord: string;
    start: Date;
    end: Date;
    sookshmaDashas: SookshmaDasha[];
}

export interface Antardasha {
    lord: string;
    start: Date;
    end: Date;
    pratyantardashas: Pratyantardasha[];
}

export interface Mahadasha {
    lord: string;
    start: Date;
    end: Date;
    antardashas: Antardasha[];
}

export interface DivisionalChartData {
    houses: { [key: number]: Array<{ symbol: string, isRetrograde: boolean, degreeStr: string }> };
    houseRasis: { [key: number]: number };
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
}

export interface ChartData {
    planets: PlanetData[];
    d1: DivisionalChartData;
    d3: DivisionalChartData;
    d7: DivisionalChartData;
    d9: DivisionalChartData;
    d10: DivisionalChartData;
    d60: DivisionalChartData;
    mahadashas: Mahadasha[];
    panchang: PanchangData;
}

const NAKSHATRA_NAMES = [
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

export const PLANET_NAMES: { [key: string]: { name: string, sanskrit: string } } = {
    "Sun": { name: "Sun", sanskrit: "सूर्य" },
    "Moon": { name: "Moon", sanskrit: "चंद्र" },
    "Mars": { name: "Mars", sanskrit: "मंगल" },
    "Mercury": { name: "Mercury", sanskrit: "बुध" },
    "Jupiter": { name: "Jupiter", sanskrit: "गुरु" },
    "Venus": { name: "Venus", sanskrit: "शुक्र" },
    "Saturn": { name: "Saturn", sanskrit: "शनि" },
    "Rahu": { name: "Rahu", sanskrit: "राहु" },
    "Ketu": { name: "Ketu", sanskrit: "केतु" },
    "Ascendant": { name: "Ascendant", sanskrit: "लग्न" }
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
const MS_PER_YEAR = 365.25 * 24 * 60 * 60 * 1000;

/**
 * Calculates the Chitra Paksha Lahiri Ayanamsa for a given date.
 * Based on the J2000.0 epoch with a base value of 23.85°.
 */
function getLahiriAyanamsa(time: Ast.AstroTime): number {
    // T is centuries from J2000.0
    const T = time.tt / 36525.0;
    // Lahiri Ayanamsa at J2000.0 is 23° 51' 25.53" = 23.857091666...
    return 23.85709 + 1.39638 * T + 0.000308 * T * T;
}

/**
 * Determines if a planet is in retrograde motion.
 */
function isPlanetRetrograde(body: Ast.Body, time: Ast.AstroTime, currentLong?: number): boolean {
    // Sun and Moon are never retrograde
    if (body === Ast.Body.Sun || body === Ast.Body.Moon) return false;

    const t1 = time;
    const t2 = Ast.MakeTime(time.ut + 1 / 24); // +1 hour in days

    const lon1 = currentLong ?? Ast.Ecliptic(Ast.GeoVector(body, t1, true)).elon;
    const lon2 = Ast.Ecliptic(Ast.GeoVector(body, t2, true)).elon;

    let diff = (lon2 - lon1 + 360) % 360;
    if (diff > 180) diff -= 360;

    return diff < 0;
}

/**
 * Calculates the mean longitude of Rahu (Ascending Node) for a given time.
 */
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
        d1: emptyChart, d3: emptyChart, d7: emptyChart, d9: emptyChart, d10: emptyChart, d60: emptyChart,
        mahadashas: [],
        panchang: emptyPanchang
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

function calculatePlanetaryAndDivisionalData(
    time: Ast.AstroTime,
    lat: number,
    lon: number,
    ayanamsa: number,
    tropicalSunLong: number,
    tropicalMoonLong: number
) {
    const planetData: PlanetData[] = [];
    const chartKeys = ['d1', 'd3', 'd7', 'd9', 'd10', 'd60'] as const;
    type ChartKey = typeof chartKeys[number];

    const assignments: Record<ChartKey, { [key: number]: Array<{ symbol: string, isRetrograde: boolean, degreeStr: string }> }> = {
        d1: {}, d3: {}, d7: {}, d9: {}, d10: {}, d60: {}
    };

    chartKeys.forEach(key => {
        for (let i = 1; i <= 12; i++) {
            assignments[key][i] = [];
        }
    });

    // 1. Calculate Ascendant (Lagna)
    // The Ascendant is the point where the Ecliptic intersects the Eastern Horizon.
    // We use the astronomically verified trigonometric formula based on the intersection
    // of the Ecliptic and the Eastern Horizon.
    const siderealTime = Ast.SiderealTime(time);
    const RAMC = (siderealTime * 15 + lon) % 360;
    const rad = Math.PI / 180;
    const phi = lat * rad;
    const rot = Ast.Rotation_ECL_EQD(time);
    const eps = Math.acos(rot.rot[2][2]);
    const alpha = RAMC * rad;
    const lagnaTropical = (Math.atan2(Math.cos(alpha), -(Math.sin(alpha) * Math.cos(eps) + Math.tan(phi) * Math.sin(eps))) / rad + 360) % 360;
    const lagnaSidereal = (lagnaTropical - ayanamsa + 360) % 360;
    const lagnaRasiIdx = Math.floor(lagnaSidereal / 30);

    const lagnaRasis: Record<ChartKey, number> = {
        d1: lagnaRasiIdx,
        d3: getD3Rasi(lagnaSidereal),
        d7: getD7Rasi(lagnaSidereal),
        d9: getD9Rasi(lagnaSidereal),
        d10: getD10Rasi(lagnaSidereal),
        d60: getD60Rasi(lagnaSidereal)
    };

    const assignToCharts = (symbol: string, siderealLong: number, isRetro: boolean) => {
        const rasiIndices: Record<ChartKey, number> = {
            d1: Math.floor(siderealLong / 30),
            d3: getD3Rasi(siderealLong),
            d7: getD7Rasi(siderealLong),
            d9: getD9Rasi(siderealLong),
            d10: getD10Rasi(siderealLong),
            d60: getD60Rasi(siderealLong)
        };

        const degInRasi = siderealLong % 30;
        const d = Math.floor(degInRasi);
        const m = Math.floor((degInRasi - d) * 60);
        const s = Math.floor(((degInRasi - d) * 60 - m) * 60);
        const degreeStr = `${d}° ${m}' ${s}"`;

        chartKeys.forEach(key => {
            const chartRasiIdx = rasiIndices[key];
            const lagnaRasi = lagnaRasis[key];
            const house = ((chartRasiIdx - lagnaRasi + 12) % 12) + 1;
            assignments[key][house].push({ symbol, isRetrograde: isRetro, degreeStr });
        });
    };

    planetData.push(createPlanet("Ascendant", "As", lagnaSidereal, 1, false));
    const lagnaDegInRasi = lagnaSidereal % 30;
    const ld = Math.floor(lagnaDegInRasi);
    const lm = Math.floor((lagnaDegInRasi - ld) * 60);
    const ls = Math.floor(((lagnaDegInRasi - ld) * 60 - lm) * 60);
    const lagnaDegreeStr = `${ld}° ${lm}' ${ls}"`;
    chartKeys.forEach(key => assignments[key][1].push({ symbol: "As", isRetrograde: false, degreeStr: lagnaDegreeStr }));

    // 2. Calculate Planets
    PLANET_MAP.forEach(p => {
        let long: number;
        if (p.name === "Sun") {
            long = tropicalSunLong;
        } else if (p.name === "Moon") {
            long = tropicalMoonLong;
        } else {
            const pos = Ast.GeoVector(p.body, time, true);
            const ecl = Ast.Ecliptic(pos);
            long = ecl.elon;
        }

        const isRetro = isPlanetRetrograde(p.body, time, long);
        const siderealLong = (long - ayanamsa + 360) % 360;
        const planetRasiIdx = Math.floor(siderealLong / 30);
        const house = ((planetRasiIdx - lagnaRasiIdx + 12) % 12) + 1;

        planetData.push(createPlanet(p.name, p.symbol, siderealLong, house, isRetro));
        assignToCharts(p.symbol, siderealLong, isRetro);
    });

    // 3. Rahu & Ketu
    const rahuTropical = getMeanRahu(time);
    const rahuSidereal = (rahuTropical - ayanamsa + 360) % 360;
    const ketuSidereal = (rahuSidereal + 180) % 360;
    const rahuRasiIdx = Math.floor(rahuSidereal / 30);
    const ketuRasiIdx = Math.floor(ketuSidereal / 30);
    const rahuHouse = ((rahuRasiIdx - lagnaRasiIdx + 12) % 12) + 1;
    const ketuHouse = ((ketuRasiIdx - lagnaRasiIdx + 12) % 12) + 1;

    planetData.push(createPlanet("Rahu", "Ra", rahuSidereal, rahuHouse, true));
    planetData.push(createPlanet("Ketu", "Ke", ketuSidereal, ketuHouse, true));
    assignToCharts("Ra", rahuSidereal, true);
    assignToCharts("Ke", ketuSidereal, true);

    const houseRasis: Record<ChartKey, { [key: number]: number }> = {
        d1: {}, d3: {}, d7: {}, d9: {}, d10: {}, d60: {}
    };

    chartKeys.forEach(key => {
        const lagnaRasi = lagnaRasis[key];
        for (let h = 1; h <= 12; h++) {
            houseRasis[key][h] = ((lagnaRasi + h - 1) % 12) + 1;
        }
    });

    return {
        planets: planetData,
        d1: { houses: assignments.d1, houseRasis: houseRasis.d1 },
        d3: { houses: assignments.d3, houseRasis: houseRasis.d3 },
        d7: { houses: assignments.d7, houseRasis: houseRasis.d7 },
        d9: { houses: assignments.d9, houseRasis: houseRasis.d9 },
        d10: { houses: assignments.d10, houseRasis: houseRasis.d10 },
        d60: { houses: assignments.d60, houseRasis: houseRasis.d60 }
    };
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

    const getTropicalSunLong = () => {
        if (tropicalSunLong === undefined) {
            const pos = Ast.GeoVector(Ast.Body.Sun, time, true);
            const ecl = Ast.Ecliptic(pos);
            tropicalSunLong = ecl.elon;
        }
        return tropicalSunLong;
    };

    const getTropicalMoonLong = () => {
        if (tropicalMoonLong === undefined) {
            const pos = Ast.GeoMoon(time);
            const ecl = Ast.Ecliptic(pos);
            tropicalMoonLong = ecl.elon;
        }
        return tropicalMoonLong;
    };

    let panchang: PanchangData | undefined;
    Object.defineProperty(result, 'panchang', {
        get: () => {
            if (!panchang) panchang = calculatePanchang(time, lat, lon, ayanamsa, getTropicalSunLong(), getTropicalMoonLong());
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

    let coreData: ReturnType<typeof calculatePlanetaryAndDivisionalData> | undefined;
    const getCoreData = () => {
        if (!coreData) coreData = calculatePlanetaryAndDivisionalData(time, lat, lon, ayanamsa, getTropicalSunLong(), getTropicalMoonLong());
        return coreData;
    };

    Object.defineProperty(result, 'planets', { get: () => getCoreData().planets, enumerable: true });
    Object.defineProperty(result, 'd1', { get: () => getCoreData().d1, enumerable: true });
    Object.defineProperty(result, 'd3', { get: () => getCoreData().d3, enumerable: true });
    Object.defineProperty(result, 'd7', { get: () => getCoreData().d7, enumerable: true });
    Object.defineProperty(result, 'd9', { get: () => getCoreData().d9, enumerable: true });
    Object.defineProperty(result, 'd10', { get: () => getCoreData().d10, enumerable: true });
    Object.defineProperty(result, 'd60', { get: () => getCoreData().d60, enumerable: true });

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

function calculatePanchang(time: Ast.AstroTime, lat: number, lon: number, ayanamsa: number, sunLong: number, moonLong: number): PanchangData {
    const siderealSunLong = (sunLong - ayanamsa + 360) % 360;
    const siderealMoonLong = (moonLong - ayanamsa + 360) % 360;

    const diff = (moonLong - sunLong + 360) % 360;
    const tithiIdx = Math.floor(diff / 12);
    const tithi = TITHIS[tithiIdx];
    const paksha = tithiIdx < 15 ? { name: "Shukla", sanskrit: "शुक्ल" } : { name: "Krishna", sanskrit: "कृष्ण" };

    const nakIdx = Math.floor(siderealMoonLong / NAKSHATRA_WIDTH);
    const nak = NAKSHATRA_NAMES[nakIdx];

    const siderealYogaLong = (siderealSunLong + siderealMoonLong) % 360;
    const yogaIdx = Math.floor(siderealYogaLong / NAKSHATRA_WIDTH);
    const yoga = YOGAS[yogaIdx];

    const karanaIdxTotal = Math.floor(diff / 6);
    let karana;
    if (karanaIdxTotal === 0) {
        karana = KARANAS[10];
    } else if (karanaIdxTotal >= 57) {
        karana = KARANAS[7 + (karanaIdxTotal - 57)];
    } else {
        karana = KARANAS[(karanaIdxTotal - 1) % 7];
    }

    const observer = new Ast.Observer(lat, lon, 0);
    const varaData = getVedicVara(time, lat, lon);

    const sunrise = varaData.sunrise;
    let sunset: Date | null = null;
    const getSunset = () => {
        if (sunset === null && sunrise) {
            const sunsetResult = Ast.SearchRiseSet(Ast.Body.Sun, observer, -1, Ast.MakeTime(sunrise), 24);
            sunset = sunsetResult ? sunsetResult.date : null;
        }
        return sunset;
    };

    const sunSignIdx = Math.floor(siderealSunLong / 30);
    const moonSignIdx = Math.floor(siderealMoonLong / 30);
    const sunSign = RASI_FULL_NAMES[sunSignIdx];
    const moonSign = RASI_FULL_NAMES[moonSignIdx];

    const ritu = getRitu(siderealSunLong);
    const ayana = getAyana(siderealSunLong);

    const year = time.date.getUTCFullYear();
    const vikramSamvat = year + 57;
    const shakaSamvat = year - 78;
    const samvatsara = SAMVATSARAS[(shakaSamvat + 11) % 60];

    const result = {
        tithi: tithi.name,
        tithiSanskrit: tithi.sanskrit,
        paksha: paksha.name,
        pakshaSanskrit: paksha.sanskrit,
        nakshatra: nak.name,
        nakshatraSanskrit: nak.sanskrit,
        yoga: yoga.name,
        yogaSanskrit: yoga.sanskrit,
        karana: karana.name,
        karanaSanskrit: karana.sanskrit,
        vara: varaData.name,
        varaSanskrit: varaData.sanskrit,
        sunSign: sunSign.name,
        sunSignSanskrit: sunSign.sanskrit,
        moonSign: moonSign.name,
        moonSignSanskrit: moonSign.sanskrit,
        ritu: ritu.name,
        rituSanskrit: ritu.sanskrit,
        ayana: ayana.name,
        ayanaSanskrit: ayana.sanskrit,
        sunrise: formatTime(sunrise),
        vikramSamvat,
        shakaSamvat,
        samvatsara: samvatsara.name,
        samvatsaraSanskrit: samvatsara.sanskrit
    } as PanchangData;

    // Performance Optimization: Lazy evaluation for expensive search-based properties
    let endTimes: { tithi: Date | null, nak: Date | null, yoga: Date | null, karana: Date | null } | undefined;
    const calculateEndTimes = () => {
        if (endTimes) return endTimes;

        let tithiEnd: Date | null = null;
        let nakEnd: Date | null = null;
        let yogaEnd: Date | null = null;
        let karanaEnd: Date | null = null;

        const tithiThreshold = (tithiIdx + 1) * 12;
        const nakThreshold = (nakIdx + 1) * NAKSHATRA_WIDTH;
        const yogaThreshold = (yogaIdx + 1) * NAKSHATRA_WIDTH;
        const karanaThreshold = (karanaIdxTotal + 1) * 6;

        const stepDays = 120 / (24 * 60); // 2 hours in days
        const maxDays = 30 / 24; // 30 hours in days

        const sunCache = new Map<number, number>();
        if (sunLong !== undefined) sunCache.set(time.ut, sunLong);
        const getSun = (t: Ast.AstroTime) => {
            const cached = sunCache.get(t.ut);
            if (cached !== undefined) return cached;
            const s = Ast.Ecliptic(Ast.GeoVector(Ast.Body.Sun, t, true)).elon;
            sunCache.set(t.ut, s);
            return s;
        };

        const moonCache = new Map<number, number>();
        if (moonLong !== undefined) moonCache.set(time.ut, moonLong);
        const getMoon = (t: Ast.AstroTime) => {
            const cached = moonCache.get(t.ut);
            if (cached !== undefined) return cached;
            const m = Ast.Ecliptic(Ast.GeoMoon(t)).elon;
            moonCache.set(t.ut, m);
            return m;
        };

        const refine = (low: number, high: number, threshold: number, fn: (t: Ast.AstroTime) => number) => {
            let L = low, H = high;
            for (let i = 0; i < 10; i++) {
                const mid = (L + H) / 2;
                if (fn(Ast.MakeTime(mid)) < threshold) L = mid;
                else H = mid;
            }
            return Ast.MakeTime(H).date;
        };

        let prevUT = time.ut;
        let prevDiff = diff;
        let prevSiderealMoon = siderealMoonLong;
        let prevSiderealYoga = siderealYogaLong;

        for (let d = stepDays; d <= maxDays + 0.0001; d += stepDays) {
            if (tithiEnd && nakEnd && yogaEnd && karanaEnd) break;

            const nextUT = time.ut + d;
            const nextT = Ast.MakeTime(nextUT);
            const ay = getLahiriAyanamsa(nextT);

            const sl = getSun(nextT);
            const ml = getMoon(nextT);

            const nextDiff = (ml - sl + 360) % 360;
            const nextSiderealMoon = (ml - ay + 360) % 360;
            const nextSiderealSun = (sl - ay + 360) % 360;
            const nextYogaLong = (nextSiderealSun + nextSiderealMoon) % 360;

            if (!tithiEnd && ((prevDiff < tithiThreshold && nextDiff >= tithiThreshold) || (prevDiff > nextDiff && (prevDiff < tithiThreshold || nextDiff >= tithiThreshold)))) {
                tithiEnd = refine(prevUT, nextUT, tithiThreshold, (t) => {
                    const s = getSun(t);
                    const mo = getMoon(t);
                    return (mo - s + 360) % 360;
                });
            }
            if (!karanaEnd && ((prevDiff < karanaThreshold && nextDiff >= karanaThreshold) || (prevDiff > nextDiff && (prevDiff < karanaThreshold || nextDiff >= karanaThreshold)))) {
                karanaEnd = refine(prevUT, nextUT, karanaThreshold, (t) => {
                    const s = getSun(t);
                    const mo = getMoon(t);
                    return (mo - s + 360) % 360;
                });
            }
            if (!nakEnd && ((prevSiderealMoon < nakThreshold && nextSiderealMoon >= nakThreshold) || (prevSiderealMoon > nextSiderealMoon && (prevSiderealMoon < nakThreshold || nextSiderealMoon >= nakThreshold)))) {
                nakEnd = refine(prevUT, nextUT, nakThreshold, (t) => {
                    const mo = getMoon(t);
                    return (mo - getLahiriAyanamsa(t) + 360) % 360;
                });
            }
            if (!yogaEnd && ((prevSiderealYoga < yogaThreshold && nextYogaLong >= yogaThreshold) || (prevSiderealYoga > nextYogaLong && (prevSiderealYoga < yogaThreshold || nextYogaLong >= yogaThreshold)))) {
                yogaEnd = refine(prevUT, nextUT, yogaThreshold, (t) => {
                    const s = getSun(t);
                    const mo = getMoon(t);
                    const a = getLahiriAyanamsa(t);
                    return (s - a + mo - a + 720) % 360;
                });
            }
            prevUT = nextUT;
            prevDiff = nextDiff;
            prevSiderealMoon = nextSiderealMoon;
            prevSiderealYoga = nextYogaLong;
        }
        endTimes = { tithi: tithiEnd, nak: nakEnd, yoga: yogaEnd, karana: karanaEnd };
        return endTimes;
    };

    Object.defineProperty(result, 'tithiEnd', { get: () => formatTime(calculateEndTimes().tithi), enumerable: true });
    Object.defineProperty(result, 'nakshatraEnd', { get: () => formatTime(calculateEndTimes().nak), enumerable: true });
    Object.defineProperty(result, 'yogaEnd', { get: () => formatTime(calculateEndTimes().yoga), enumerable: true });
    Object.defineProperty(result, 'karanaEnd', { get: () => formatTime(calculateEndTimes().karana), enumerable: true });

    Object.defineProperty(result, 'sunset', { get: () => formatTime(getSunset()), enumerable: true });

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
    Object.defineProperty(result, 'moonrise', { get: () => formatTime(calculateMoonTimings().rise), enumerable: true });
    Object.defineProperty(result, 'moonset', { get: () => formatTime(calculateMoonTimings().set), enumerable: true });

    let muhurtas: { rahu: string, gulika: string, yama: string, abhijit: string, brahma: string } | undefined;
    const calculateMuhurtas = () => {
        if (muhurtas) return muhurtas;
        const ss = getSunset();
        let rk = "--:--", gk = "--:--", yk = "--:--", am = "--:--", bm = "--:--";

        if (sunrise && ss) {
            const istSunrise = new Date(sunrise.getTime() + (5.5 * 60 * 60 * 1000));
            const dayOfWeek = istSunrise.getUTCDay();
            rk = getMuhurtaRange(sunrise, ss, RAHU_KAAL_PARTS[dayOfWeek], 8);
            gk = getMuhurtaRange(sunrise, ss, GULIKA_KAAL_PARTS[dayOfWeek], 8);
            yk = getMuhurtaRange(sunrise, ss, YAMAGANDA_KAAL_PARTS[dayOfWeek], 8);
            am = getMuhurtaRange(sunrise, ss, 8, 15);

            const dayDuration = ss.getTime() - sunrise.getTime();
            const nightDuration = (24 * 60 * 60 * 1000) - dayDuration;
            const muhurtaLength = nightDuration / 15;
            const brahmaStart = new Date(sunrise.getTime() - 2 * muhurtaLength);
            const brahmaEnd = new Date(sunrise.getTime() - muhurtaLength);
            bm = `${formatTime(brahmaStart)} - ${formatTime(brahmaEnd)}`;
        }
        muhurtas = { rahu: rk, gulika: gk, yama: yk, abhijit: am, brahma: bm };
        return muhurtas;
    };
    Object.defineProperty(result, 'rahuKaal', { get: () => calculateMuhurtas().rahu, enumerable: true });
    Object.defineProperty(result, 'gulikaKaal', { get: () => calculateMuhurtas().gulika, enumerable: true });
    Object.defineProperty(result, 'yamagandaKaal', { get: () => calculateMuhurtas().yama, enumerable: true });
    Object.defineProperty(result, 'abhijitMuhurta', { get: () => calculateMuhurtas().abhijit, enumerable: true });
    Object.defineProperty(result, 'brahmaMuhurta', { get: () => calculateMuhurtas().brahma, enumerable: true });

    let month: { name: string, sanskrit: string } | undefined;
    const calculateLunarMonth = () => {
        if (month) return month;
        const prevNewMoon = Ast.SearchMoonPhase(0, time, -30);
        let monthIdx = 0;
        if (prevNewMoon) {
            const nmSunLong = Ast.Ecliptic(Ast.GeoVector(Ast.Body.Sun, prevNewMoon, true)).elon;
            const nmSiderealSunLong = (nmSunLong - getLahiriAyanamsa(prevNewMoon) + 360) % 360;
            monthIdx = Math.floor(nmSiderealSunLong / 30);
        }
        month = LUNAR_MONTHS[(monthIdx + 1) % 12];
        return month;
    };
    Object.defineProperty(result, 'lunarMonth', { get: () => calculateLunarMonth().name, enumerable: true });
    Object.defineProperty(result, 'lunarMonthSanskrit', { get: () => calculateLunarMonth().sanskrit, enumerable: true });

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

function calculateSookshmaDashas(mdDurationYears: number, adDurationYears: number, pdLordIdx: number, pdDurationYears: number, pdStart: number): SookshmaDasha[] {
    const sds: SookshmaDasha[] = [];
    let currentSdStart = pdStart;
    for (let l = 0; l < 9; l++) {
        const sdLordIdx = (pdLordIdx + l) % 9;
        const sdLord = NAKSHATRA_LORDS[sdLordIdx];
        const sdDuration = Math.trunc((mdDurationYears * adDurationYears * pdDurationYears * DASHA_DURATIONS[sdLord] * MS_PER_YEAR) / (120 * 120 * 120));
        const sdStart = currentSdStart;
        const sdEnd = sdStart + sdDuration;

        sds.push({
            lord: sdLord,
            start: new Date(sdStart),
            end: new Date(sdEnd)
        });
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
            start: new Date(pdStart),
            end: new Date(pdEnd)
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
            start: new Date(adStart),
            end: new Date(adEnd)
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
            start: new Date(mdStart),
            end: new Date(mdEnd)
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

export function getD3Rasi(long: number): number {
    const rasiIdx = Math.floor(long / 30);
    const degInRasi = long % 30;
    const drekkanaIdx = Math.floor(degInRasi / DREKKANA_WIDTH); // 0, 1, 2
    return (rasiIdx + drekkanaIdx * 4) % 12;
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

function createPlanet(name: string, symbol: string, siderealLong: number, house: number, isRetrograde: boolean): PlanetData {
    const rasiIdx = Math.floor(siderealLong / 30);
    const degInRasi = siderealLong % 30;
    const nakshatraIdx = Math.floor(siderealLong / NAKSHATRA_WIDTH);
    const pada = Math.floor((siderealLong % NAKSHATRA_WIDTH) / PADA_WIDTH) + 1;

    const d = Math.floor(degInRasi);
    const m = Math.floor((degInRasi - d) * 60);
    const s = Math.floor(((degInRasi - d) * 60 - m) * 60);

    const rasiLordName = RASI_LORDS[rasiIdx];
    const nakLordName = NAKSHATRA_LORDS[nakshatraIdx % 9];

    return {
        name,
        nameSanskrit: PLANET_NAMES[name]?.sanskrit || name,
        symbol,
        degree: `${d}° ${m}' ${s}"`,
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
        isRetrograde
    };
}
