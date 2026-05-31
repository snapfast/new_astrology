import * as Ast from 'astronomy-engine';

export interface PlanetData {
    name: string;
    symbol: string;
    degree: string;
    rasi: string;
    nakshatra: string;
    pada: number;
    house: number;
    rasiLord: string;
    nakshatraLord: string;
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
    houses: { [key: number]: Array<{ symbol: string, isRetrograde: boolean }> };
    houseRasis: { [key: number]: number };
}

export interface PanchangData {
    tithi: string;
    tithiSanskrit: string;
    paksha: string;
    pakshaSanskrit: string;
    nakshatra: string;
    nakshatraSanskrit: string;
    yoga: string;
    yogaSanskrit: string;
    karana: string;
    karanaSanskrit: string;
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
}

export interface ChartData {
    planets: PlanetData[];
    d1: DivisionalChartData;
    d3: DivisionalChartData;
    d9: DivisionalChartData;
    d10: DivisionalChartData;
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

export const SIGN_INSIGHTS: { [key: string]: string } = {
    "Aries": "A natural-born leader with boundless energy. You possess a pioneering spirit and the courage to take on any challenge with enthusiasm.",
    "Taurus": "Grounding and dependable, you value stability and the finer things in life. Your persistence and patience are your greatest strengths.",
    "Gemini": "Intellectually curious and highly adaptable. Your ability to communicate and see multiple perspectives makes you a social chameleon.",
    "Cancer": "Deeply intuitive and nurturing. You value home and family above all, possessing a powerful emotional intelligence that guides your path.",
    "Leo": "Creative, confident, and charismatic. You have a natural ability to inspire others and a heart that is as generous as it is brave.",
    "Virgo": "Analytical and detail-oriented. You seek perfection and find deep satisfaction in being of service to others through your practical wisdom.",
    "Libra": "A seeker of balance and harmony. You possess a refined aesthetic sense and a natural talent for diplomacy and building meaningful partnerships.",
    "Scorpio": "Intense, passionate, and profoundly perceptive. You have the strength to undergo great transformations and uncover hidden truths.",
    "Sagittarius": "An adventurous soul with a philosophical mind. Your optimism and quest for higher knowledge lead you toward constant growth and expansion.",
    "Capricorn": "Disciplined, ambitious, and resilient. You have the strategic mind and endurance required to climb the highest mountains of success.",
    "Aquarius": "Visionary and independent. You are a forward-thinker who values community and innovation, often marching to the beat of your own drum.",
    "Pisces": "Compassionate, artistic, and deeply spiritual. You possess a vast imagination and a natural connection to the unseen realms of the soul."
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
const NAVAMSHA_WIDTH = 30 / 9;
const D10_WIDTH = 3;
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
    return 23.85 + 1.39638 * T + 0.000308 * T * T;
}

/**
 * Determines if a planet is in retrograde motion.
 */
function isPlanetRetrograde(body: Ast.Body, time: Ast.AstroTime): boolean {
    // Sun and Moon are never retrograde
    if (body === Ast.Body.Sun || body === Ast.Body.Moon) return false;

    const t1 = time;
    const t2 = Ast.MakeTime(new Date(time.date.getTime() + 60 * 60 * 1000)); // +1 hour

    const pos1 = Ast.GeoVector(body, t1, true);
    const pos2 = Ast.GeoVector(body, t2, true);

    const ecl1 = Ast.Ecliptic(pos1);
    const ecl2 = Ast.Ecliptic(pos2);

    let diff = (ecl2.elon - ecl1.elon + 360) % 360;
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

export function generateAstrologyData(dob: string, tob: string, latStr?: string, lonStr?: string): ChartData {
    const emptyChart: DivisionalChartData = { houses: {}, houseRasis: {} };
    const emptyPanchang: PanchangData = {
        tithi: "", tithiSanskrit: "", paksha: "", pakshaSanskrit: "",
        nakshatra: "", nakshatraSanskrit: "", yoga: "", yogaSanskrit: "",
        karana: "", karanaSanskrit: "", vara: "", varaSanskrit: "",
        sunSign: "", sunSignSanskrit: "", moonSign: "", moonSignSanskrit: "",
        ritu: "", rituSanskrit: "", ayana: "", ayanaSanskrit: "",
        rahuKaal: "", gulikaKaal: "", yamagandaKaal: "", abhijitMuhurta: ""
    };
    if (!dob || !tob) return { planets: [], d1: emptyChart, d3: emptyChart, d9: emptyChart, d10: emptyChart, mahadashas: [], panchang: emptyPanchang };

    // Parse Date and Time in UTC to avoid environment-dependent timezone issues
    const [year, month, day] = dob.split('-').map(Number);
    const [hour, minute] = tob.split(':').map(Number);

    // Create Date object interpreted as UTC, then subtract 5.5 hours to get the actual UTC time
    // since the input is local IST (UTC+5:30)
    const istDate = new Date(Date.UTC(year, month - 1, day, hour, minute));
    const utcDate = new Date(istDate.getTime() - (5.5 * 60 * 60 * 1000));
    const time = Ast.MakeTime(utcDate);

    // Default coordinates: New Delhi, India
    const lat = parseFloat(latStr || "28.6139");
    const lon = parseFloat(lonStr || "77.2090");

    // Calculate Ayanamsa (Lahiri)
    const ayanamsa = getLahiriAyanamsa(time);

    const planetData: PlanetData[] = [];
    const d1Assignments: { [key: number]: Array<{ symbol: string, isRetrograde: boolean }> } = {};
    const d3Assignments: { [key: number]: Array<{ symbol: string, isRetrograde: boolean }> } = {};
    const d9Assignments: { [key: number]: Array<{ symbol: string, isRetrograde: boolean }> } = {};
    const d10Assignments: { [key: number]: Array<{ symbol: string, isRetrograde: boolean }> } = {};
    for (let i = 1; i <= 12; i++) {
        d1Assignments[i] = [];
        d3Assignments[i] = [];
        d9Assignments[i] = [];
        d10Assignments[i] = [];
    }

    // 1. Calculate Ascendant (Lagna)
    const siderealTime = Ast.SiderealTime(time);
    const RAMC = (siderealTime * 15 + lon) % 360;
    const rad = Math.PI / 180;
    const phi = lat * rad;

    // Calculate Obliquity of the Ecliptic (eps) for the given time
    const rot = Ast.Rotation_ECL_EQD(time);
    const eps = Math.acos(rot.rot[2][2]);

    const alpha = RAMC * rad;

    const lagnaTropical = (Math.atan2(Math.cos(alpha), -(Math.sin(alpha) * Math.cos(eps) + Math.tan(phi) * Math.sin(eps))) / rad + 360) % 360;
    const lagnaSidereal = (lagnaTropical - ayanamsa + 360) % 360;
    const lagnaRasiIdx = Math.floor(lagnaSidereal / 30);
    const d3LagnaRasiIdx = getD3Rasi(lagnaSidereal);
    const d9LagnaRasiIdx = getD9Rasi(lagnaSidereal);
    const d10LagnaRasiIdx = getD10Rasi(lagnaSidereal);

    planetData.push(createPlanet("Ascendant", "As", lagnaSidereal, 1, false));

    // 2. Calculate Planets
    let moonSiderealLong = 0;
    PLANET_MAP.forEach(p => {
        let long: number;
        if (p.name === "Sun") {
            const pos = Ast.GeoVector(Ast.Body.Sun, time, true);
            const ecl = Ast.Ecliptic(pos);
            long = ecl.elon;
        } else if (p.name === "Moon") {
            const pos = Ast.GeoMoon(time);
            const ecl = Ast.Ecliptic(pos);
            long = ecl.elon;
        } else {
            const pos = Ast.GeoVector(p.body, time, true);
            const ecl = Ast.Ecliptic(pos);
            long = ecl.elon;
        }

        const isRetro = isPlanetRetrograde(p.body, time);
        const siderealLong = (long - ayanamsa + 360) % 360;
        if (p.name === "Moon") moonSiderealLong = siderealLong;
        const planetRasiIdx = Math.floor(siderealLong / 30);
        const house = ((planetRasiIdx - lagnaRasiIdx + 12) % 12) + 1;

        const planet = createPlanet(p.name, p.symbol, siderealLong, house, isRetro);
        planetData.push(planet);

        // Divisional Assignments
        const d3RasiIdx = getD3Rasi(siderealLong);
        const d9RasiIdx = getD9Rasi(siderealLong);
        const d10RasiIdx = getD10Rasi(siderealLong);

        d1Assignments[house].push({ symbol: p.symbol, isRetrograde: isRetro });
        d3Assignments[((d3RasiIdx - d3LagnaRasiIdx + 12) % 12) + 1].push({ symbol: p.symbol, isRetrograde: isRetro });
        d9Assignments[((d9RasiIdx - d9LagnaRasiIdx + 12) % 12) + 1].push({ symbol: p.symbol, isRetrograde: isRetro });
        d10Assignments[((d10RasiIdx - d10LagnaRasiIdx + 12) % 12) + 1].push({ symbol: p.symbol, isRetrograde: isRetro });
    });

    // 3. Rahu & Ketu (Dynamic Mean Nodes)
    const rahuTropical = getMeanRahu(time);

    const rahuSidereal = (rahuTropical - ayanamsa + 360) % 360;
    const ketuSidereal = (rahuSidereal + 180) % 360;

    const rahuRasiIdx = Math.floor(rahuSidereal / 30);
    const ketuRasiIdx = Math.floor(ketuSidereal / 30);

    const rahuHouse = ((rahuRasiIdx - lagnaRasiIdx + 12) % 12) + 1;
    const ketuHouse = ((ketuRasiIdx - lagnaRasiIdx + 12) % 12) + 1;

    // Rahu and Ketu are always retrograde as mean nodes
    planetData.push(createPlanet("Rahu", "Ra", rahuSidereal, rahuHouse, true));
    planetData.push(createPlanet("Ketu", "Ke", ketuSidereal, ketuHouse, true));

    // Assign Rahu/Ketu to divisions
    const d3RahuIdx = getD3Rasi(rahuSidereal);
    const d3KetuIdx = getD3Rasi(ketuSidereal);
    const d9RahuIdx = getD9Rasi(rahuSidereal);
    const d9KetuIdx = getD9Rasi(ketuSidereal);
    const d10RahuIdx = getD10Rasi(rahuSidereal);
    const d10KetuIdx = getD10Rasi(ketuSidereal);

    d1Assignments[rahuHouse].push({ symbol: "Ra", isRetrograde: true });
    d1Assignments[ketuHouse].push({ symbol: "Ke", isRetrograde: true });
    d3Assignments[((d3RahuIdx - d3LagnaRasiIdx + 12) % 12) + 1].push({ symbol: "Ra", isRetrograde: true });
    d3Assignments[((d3KetuIdx - d3LagnaRasiIdx + 12) % 12) + 1].push({ symbol: "Ke", isRetrograde: true });
    d9Assignments[((d9RahuIdx - d9LagnaRasiIdx + 12) % 12) + 1].push({ symbol: "Ra", isRetrograde: true });
    d9Assignments[((d9KetuIdx - d9LagnaRasiIdx + 12) % 12) + 1].push({ symbol: "Ke", isRetrograde: true });
    d10Assignments[((d10RahuIdx - d10LagnaRasiIdx + 12) % 12) + 1].push({ symbol: "Ra", isRetrograde: true });
    d10Assignments[((d10KetuIdx - d10LagnaRasiIdx + 12) % 12) + 1].push({ symbol: "Ke", isRetrograde: true });

    // Lagna assignments
    d1Assignments[1].push({ symbol: "As", isRetrograde: false });
    d3Assignments[1].push({ symbol: "As", isRetrograde: false });
    d9Assignments[1].push({ symbol: "As", isRetrograde: false });
    d10Assignments[1].push({ symbol: "As", isRetrograde: false });

    const d1HouseRasis: { [key: number]: number } = {};
    const d3HouseRasis: { [key: number]: number } = {};
    const d9HouseRasis: { [key: number]: number } = {};
    const d10HouseRasis: { [key: number]: number } = {};

    for (let h = 1; h <= 12; h++) {
        d1HouseRasis[h] = ((lagnaRasiIdx + h - 1) % 12) + 1;
        d3HouseRasis[h] = ((d3LagnaRasiIdx + h - 1) % 12) + 1;
        d9HouseRasis[h] = ((d9LagnaRasiIdx + h - 1) % 12) + 1;
        d10HouseRasis[h] = ((d10LagnaRasiIdx + h - 1) % 12) + 1;
    }

    // 4. Calculate Vimshottari Dasha
    const mahadashas = calculateVimshottariDasha(moonSiderealLong, istDate);

    // 5. Calculate Panchang
    const panchang = calculatePanchang(time, lat, lon, ayanamsa);

    return {
        planets: planetData,
        d1: { houses: d1Assignments, houseRasis: d1HouseRasis },
        d3: { houses: d3Assignments, houseRasis: d3HouseRasis },
        d9: { houses: d9Assignments, houseRasis: d9HouseRasis },
        d10: { houses: d10Assignments, houseRasis: d10HouseRasis },
        mahadashas,
        panchang
    };
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

const RAHU_KAAL_PARTS = [8, 2, 7, 5, 6, 4, 3]; // Sun to Sat
const GULIKA_KAAL_PARTS = [7, 6, 5, 4, 3, 2, 1]; // Sun to Sat
const YAMAGANDA_KAAL_PARTS = [5, 4, 3, 2, 1, 7, 6]; // Sun to Sat

function calculatePanchang(time: Ast.AstroTime, lat: number, lon: number, ayanamsa: number): PanchangData {
    const sunPos = Ast.GeoVector(Ast.Body.Sun, time, true);
    const sunEcl = Ast.Ecliptic(sunPos);
    const moonPos = Ast.GeoMoon(time);
    const moonEcl = Ast.Ecliptic(moonPos);

    const sunLong = sunEcl.elon;
    const moonLong = moonEcl.elon;

    const siderealSunLong = (sunLong - ayanamsa + 360) % 360;
    const siderealMoonLong = (moonLong - ayanamsa + 360) % 360;

    const diff = (moonLong - sunLong + 360) % 360;
    const tithiIdx = Math.floor(diff / 12);
    const tithi = TITHIS[tithiIdx];
    const paksha = tithiIdx < 15 ? { name: "Shukla", sanskrit: "शुक्ल" } : { name: "Krishna", sanskrit: "कृष्ण" };

    const nakIdx = Math.floor(siderealMoonLong / NAKSHATRA_WIDTH);
    const nak = NAKSHATRA_NAMES[nakIdx];

    const yogaLong = (sunLong + moonLong) % 360;
    const yogaIdx = Math.floor(yogaLong / NAKSHATRA_WIDTH);
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

    // Sunrise/Sunset for birth day
    const sunrise = varaData.sunrise;
    let sunset = null;
    if (sunrise) {
        const sunsetResult = Ast.SearchRiseSet(Ast.Body.Sun, observer, -1, Ast.MakeTime(sunrise), 24);
        sunset = sunsetResult ? sunsetResult.date : null;
    }

    // Sun/Moon Signs
    const sunSignIdx = Math.floor(siderealSunLong / 30);
    const moonSignIdx = Math.floor(siderealMoonLong / 30);
    const sunSign = RASI_FULL_NAMES[sunSignIdx];
    const moonSign = RASI_FULL_NAMES[moonSignIdx];

    // Ritu and Ayana
    const ritu = getRitu(siderealSunLong);
    const ayana = getAyana(siderealSunLong);

    // Muhurtas (based on Sunrise/Sunset)
    let rahuKaal = "--:--";
    let gulikaKaal = "--:--";
    let yamagandaKaal = "--:--";
    let abhijitMuhurta = "--:--";

    if (sunrise && sunset) {
        const dayOfWeek = new Date(sunrise.getTime() + (5.5 * 60 * 60 * 1000)).getUTCDay();
        rahuKaal = getMuhurtaRange(sunrise, sunset, RAHU_KAAL_PARTS[dayOfWeek], 8);
        gulikaKaal = getMuhurtaRange(sunrise, sunset, GULIKA_KAAL_PARTS[dayOfWeek], 8);
        yamagandaKaal = getMuhurtaRange(sunrise, sunset, YAMAGANDA_KAAL_PARTS[dayOfWeek], 8);
        abhijitMuhurta = getMuhurtaRange(sunrise, sunset, 8, 15); // Approximately 8th Muhurta out of 15
    }

    return {
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
        rahuKaal,
        gulikaKaal,
        yamagandaKaal,
        abhijitMuhurta
    };
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

function getD3Rasi(long: number): number {
    const rasiIdx = Math.floor(long / 30);
    const degInRasi = long % 30;
    const drekkanaIdx = Math.floor(degInRasi / DREKKANA_WIDTH); // 0, 1, 2
    return (rasiIdx + drekkanaIdx * 4) % 12;
}

function getD9Rasi(long: number): number {
    const rasiIdx = Math.floor(long / 30);
    const degInRasi = long % 30;
    const navamshaIdx = Math.floor(degInRasi / NAVAMSHA_WIDTH); // 0 to 8

    // Elements: 0: Fire, 1: Earth, 2: Air, 3: Water
    const startSign = D9_START_SIGNS[rasiIdx % 4];

    return (startSign + navamshaIdx) % 12;
}

function getD10Rasi(long: number): number {
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

export function getSignInsight(signName: string): string {
    return SIGN_INSIGHTS[signName] || "A unique blend of celestial energies that shapes your distinct personality and life path.";
}

function createPlanet(name: string, symbol: string, siderealLong: number, house: number, isRetrograde: boolean): PlanetData {
    const rasiIdx = Math.floor(siderealLong / 30);
    const degInRasi = siderealLong % 30;
    const nakshatraIdx = Math.floor(siderealLong / NAKSHATRA_WIDTH);
    const pada = Math.floor((siderealLong % NAKSHATRA_WIDTH) / PADA_WIDTH) + 1;

    const d = Math.floor(degInRasi);
    const m = Math.floor((degInRasi - d) * 60);
    const s = Math.floor(((degInRasi - d) * 60 - m) * 60);

    return {
        name,
        symbol,
        degree: `${d}° ${m}' ${s}"`,
        rasi: RASIS[rasiIdx],
        nakshatra: NAKSHATRAS[nakshatraIdx],
        pada,
        house,
        rasiLord: RASI_LORDS[rasiIdx],
        nakshatraLord: NAKSHATRA_LORDS[nakshatraIdx % 9],
        isRetrograde
    };
}
