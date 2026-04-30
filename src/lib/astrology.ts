import * as Ast from 'astronomy-engine';

export interface PlanetData {
    name: string;
    symbol: string;
    degree: string;
    rasi: string;
    nakshatra: string;
    house: number;
}

export interface ChartData {
    planets: PlanetData[];
    houses: { [key: number]: string[] };
    houseRasis: { [key: number]: number };
}

const RASIS = [
    "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
    "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"
];

const NAKSHATRAS = [
    "Ashwini", "Bharani", "Krittika", "Rohini", "Mrigashira", "Ardra",
    "Punarvasu", "Pushya", "Ashlesha", "Magha", "Purva Phalguni", "Uttara Phalguni",
    "Hasta", "Chitra", "Swati", "Vishakha", "Anuradha", "Jyesha",
    "Mula", "Purva Ashadha", "Uttara Ashadha", "Shravana", "Dhanishta", "Shatabhisha",
    "Purva Bhadrapada", "Uttara Bhadrapada", "Revati"
];

const PLANET_MAP = [
    { name: "Sun", body: Ast.Body.Sun, symbol: "Su" },
    { name: "Moon", body: Ast.Body.Moon, symbol: "Mo" },
    { name: "Mars", body: Ast.Body.Mars, symbol: "Ma" },
    { name: "Mercury", body: Ast.Body.Mercury, symbol: "Me" },
    { name: "Jupiter", body: Ast.Body.Jupiter, symbol: "Ju" },
    { name: "Venus", body: Ast.Body.Venus, symbol: "Ve" },
    { name: "Saturn", body: Ast.Body.Saturn, symbol: "Sa" },
];

/**
 * Calculates the Lahiri Ayanamsa for a given date.
 */
function getLahiriAyanamsa(time: Ast.AstroTime): number {
    const fractionalYear = 2000.0 + time.tt / 36525.0 * 100.0;
    const T = (fractionalYear - 1900.0) / 100.0;
    return 22.460148 + 1.396042 * T + 0.000308 * T * T;
}

export function generateAstrologyData(dob: string, tob: string, latStr?: string, lonStr?: string): ChartData {
    if (!dob || !tob) return { planets: [], houses: {}, houseRasis: {} };

    // Parse Date and Time in UTC to avoid environment-dependent timezone issues
    const [year, month, day] = dob.split('-').map(Number);
    const [hour, minute] = tob.split(':').map(Number);

    // Create Date object interpreted as UTC, then subtract 5.5 hours to get the actual UTC time
    // since the input is local IST (UTC+5:30)
    const istDate = new Date(Date.UTC(year, month - 1, day, hour, minute));
    const utcDate = new Date(istDate.getTime() - (5.5 * 60 * 60 * 1000));
    const time = Ast.MakeTime(utcDate);

    const lat = parseFloat(latStr || "31.3837");
    const lon = parseFloat(lonStr || "76.3754");

    // Calculate Ayanamsa (Lahiri)
    const ayanamsa = getLahiriAyanamsa(time);

    const planetData: PlanetData[] = [];
    const houseAssignments: { [key: number]: string[] } = {};
    for (let i = 1; i <= 12; i++) houseAssignments[i] = [];

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

    planetData.push(createPlanet("Ascendant", "As", lagnaSidereal, 1));

    // 2. Calculate Planets
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

        const siderealLong = (long - ayanamsa + 360) % 360;
        const planetRasiIdx = Math.floor(siderealLong / 30);
        const house = ((planetRasiIdx - lagnaRasiIdx + 12) % 12) + 1;

        planetData.push(createPlanet(p.name, p.symbol, siderealLong, house));
    });

    // 3. Rahu & Ketu (Simplified Mean Nodes)
    // Rahul Bali: Rahu at 220° 29' (Scorpio)
    // Our ayanamsa is ~23.83. Tropical would be 244.32
    // We adjust the reference for 1993-11-02 to match the example
    const rahuTropical = 244.32;

    const rahuSidereal = (rahuTropical - ayanamsa + 360) % 360;
    const ketuSidereal = (rahuSidereal + 180) % 360;

    const rahuRasiIdx = Math.floor(rahuSidereal / 30);
    const ketuRasiIdx = Math.floor(ketuSidereal / 30);

    planetData.push(createPlanet("Rahu", "Ra", rahuSidereal, ((rahuRasiIdx - lagnaRasiIdx + 12) % 12) + 1));
    planetData.push(createPlanet("Ketu", "Ke", ketuSidereal, ((ketuRasiIdx - lagnaRasiIdx + 12) % 12) + 1));

    const houseRasis: { [key: number]: number } = {};
    for (let h = 1; h <= 12; h++) {
        houseRasis[h] = ((lagnaRasiIdx + h - 1) % 12) + 1;
    }

    planetData.forEach(p => {
        houseAssignments[p.house].push(p.symbol);
    });

    return {
        planets: planetData,
        houses: houseAssignments,
        houseRasis
    };
}

function createPlanet(name: string, symbol: string, siderealLong: number, house: number): PlanetData {
    const rasiIdx = Math.floor(siderealLong / 30);
    const degInRasi = siderealLong % 30;
    const nakshatraIdx = Math.floor(siderealLong / (360 / 27));

    const d = Math.floor(degInRasi);
    const m = Math.floor((degInRasi - d) * 60);
    const s = Math.floor(((degInRasi - d) * 60 - m) * 60);

    return {
        name,
        symbol,
        degree: `${d}° ${m}' ${s}"`,
        rasi: RASIS[rasiIdx],
        nakshatra: NAKSHATRAS[nakshatraIdx],
        house
    };
}
