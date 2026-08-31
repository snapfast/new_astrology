import * as Ast from 'astronomy-engine';
import { generateAstrologyData, parseDegree, parseISTToUTC, getVedicVara, RASIS, getLahiriAyanamsa, getTrueEclipticLongitude, type ChartData } from './astrology';

export interface BTRData {
    chartData: ChartData;
    kunda: {
        longitude: number;
        rasi: string;
        nakshatraIdx: number;
        matchesLagna: boolean;
    };
    pranapada: {
        longitude: number;
        rasi: string;
    };
    gulika: {
        longitude: number;
        rasi: string;
    };
    tattva: {
        rulingElement: string;
        genderMatches: boolean;
        gender: string;
        expectedGender: string;
    };
}

export function calculateBTRData(dob: string, tob: string, latStr?: string, lonStr?: string, gender: "Male" | "Female" = "Male"): BTRData {
    const lat = parseFloat(latStr || "28.6139");
    const lon = parseFloat(lonStr || "77.2090");

    // Generate full astrological charts and planetary positions
    const chartData = generateAstrologyData(dob, tob, latStr, lonStr);

    // Get Time and Date Data
    const { time } = parseISTToUTC(dob, tob);

    // Calculate Ascendant (Lagna) Longitude
    const ascendant = chartData.planets.find(p => p.name === "Ascendant");
    const lagnaLong = ascendant ? (RASIS.indexOf(ascendant.rasi) * 30 + parseDegree(ascendant.degree)) : 0;

    // === 1. Kunda Calculation ===
    // Kunda longitude = (Lagna Longitude * 81) % 360
    const kundaLong = (lagnaLong * 81) % 360;
    const kundaRasiIdx = Math.floor(kundaLong / 30);
    const kundaNakshatraIdx = Math.floor(kundaLong / (360 / 27));

    // Rule: Kunda should ideally fall in the Lagna sign or its trines (1, 5, 9)
    // 0 = Aries, 4 = Leo, 8 = Sag (same elements)
    const kundaMatchesLagna = (kundaRasiIdx % 4 === Math.floor(lagnaLong / 30) % 4);

    // === 2. Tattva Siddhanta (Gender Check) ===
    // Ascendant (Lagna) sign elements:
    // Fire (Aries, Leo, Sag) - Male
    // Earth (Taurus, Virgo, Cap) - Female
    // Air (Gemini, Libra, Aqua) - Male
    // Water (Cancer, Scorpio, Pisces) - Female
    const lagnaSignIdx = Math.floor(lagnaLong / 30);
    const elements = ["Fire", "Earth", "Air", "Water"];
    const rulingElement = elements[lagnaSignIdx % 4];

    const expectedGender = (rulingElement === "Fire" || rulingElement === "Air") ? "Male" : "Female";
    const genderMatches = (gender === expectedGender);

    // === 3. Gulika ===
    const observer = new Ast.Observer(lat, lon, 0);
    const varaData = getVedicVara(time, lat, lon);
    const sunriseDate = varaData.sunrise || time.date;

    const nextSunriseResult = Ast.SearchRiseSet(Ast.Body.Sun, observer, 1, Ast.MakeTime(new Date(sunriseDate.getTime() + 2 * 60 * 60 * 1000)), 30);
    const nextSunriseDate = nextSunriseResult ? nextSunriseResult.date : new Date(sunriseDate.getTime() + 24 * 60 * 60 * 1000);

    const sunsetResult = Ast.SearchRiseSet(Ast.Body.Sun, observer, -1, Ast.MakeTime(sunriseDate), 24);
    const sunsetDate = sunsetResult ? sunsetResult.date : new Date(sunriseDate.getTime() + 12 * 60 * 60 * 1000);

    const isDayTime = time.date.getTime() >= sunriseDate.getTime() && time.date.getTime() <= sunsetDate.getTime();

    // Day duration and 8 parts (Muhurtas for Gulika)
    const duration = isDayTime
        ? (sunsetDate.getTime() - sunriseDate.getTime())
        : (nextSunriseDate.getTime() - sunsetDate.getTime());

    const partLength = duration / 8;

    const GULIKA_KAAL_PARTS_DAY = [6, 5, 4, 3, 2, 1, 0]; // Sun to Sat
    const GULIKA_KAAL_PARTS_NIGHT = [2, 1, 0, 6, 5, 4, 3]; // Sun to Sat

    const istSunrise = new Date(sunriseDate.getTime() + (5.5 * 60 * 60 * 1000));
    const dayOfWeek = istSunrise.getUTCDay();

    const gulikaPart = isDayTime ? GULIKA_KAAL_PARTS_DAY[dayOfWeek] : GULIKA_KAAL_PARTS_NIGHT[dayOfWeek];

    const gulikaTimeMs = (isDayTime ? sunriseDate.getTime() : sunsetDate.getTime()) + (gulikaPart * partLength);
    const gulikaAstroTime = Ast.MakeTime(new Date(gulikaTimeMs));

    // Calculate Ascendant (Lagna) at Gulika Time
    const gulikaSiderealTime = Ast.SiderealTime(gulikaAstroTime);
    const gulikaRAMC = (gulikaSiderealTime * 15 + lon) % 360;
    const rad = Math.PI / 180;

    const obliq = 23.4392911; // Approx J2000 obliquity

    let gulikaTropicalLagna = Math.atan2(
        Math.cos(gulikaRAMC * rad),
        -Math.sin(gulikaRAMC * rad) * Math.cos(obliq * rad) - Math.tan(lat * rad) * Math.sin(obliq * rad)
    ) * (180 / Math.PI);

    if (gulikaTropicalLagna < 0) gulikaTropicalLagna += 360;
    gulikaTropicalLagna = (gulikaTropicalLagna + 90) % 360;

    const gulikaAy = getLahiriAyanamsa(gulikaAstroTime);
    const gulikaSiderealLagna = (gulikaTropicalLagna - gulikaAy + 360) % 360;

    // === 4. Pranapada Lagna ===
    // Pranapada Lagna falls in a sign based on Sunrise time and Lagna.
    // Simple BPHS Pranapada Calculation:
    // Pranapada moves 1 rasi in 15 palas (24 seconds) -> 360 degrees in 1 ghati (24 mins)
    // Time from sunrise in seconds
    const timeFromSunriseSec = (time.date.getTime() - sunriseDate.getTime()) / 1000;

    // Sun's Longitude at sunrise
    const sunriseAstroTime = Ast.MakeTime(sunriseDate);
    const sunriseSunLongTropical = getTrueEclipticLongitude(Ast.Body.Sun, sunriseAstroTime);
    const sunriseAy = getLahiriAyanamsa(sunriseAstroTime);
    const sunriseSunLongSidereal = (sunriseSunLongTropical - sunriseAy + 360) % 360;

    // Pranapada calculation
    // Is Sun in Movable, Fixed or Dual?
    const sunSign = Math.floor(sunriseSunLongSidereal / 30);
    const sunQuality = sunSign % 3; // 0: Movable (Aries, Cancer, Libra, Cap), 1: Fixed, 2: Dual

    let baseLagnaLong = 0;
    if (sunQuality === 0) baseLagnaLong = sunriseSunLongSidereal; // Movable: same as Sun
    else if (sunQuality === 1) baseLagnaLong = (sunriseSunLongSidereal + 270) % 360; // Fixed: 9th from Sun (or 10th depending on interpretation)
    else baseLagnaLong = (sunriseSunLongSidereal + 120) % 360; // Dual: 5th from Sun

    // Add movement (360 degrees per 24 minutes = 1440 seconds) => 360 / 1440 = 0.25 degrees per second
    const pranapadaMovement = (timeFromSunriseSec * 0.25) % 360;
    const pranapadaLong = (baseLagnaLong + pranapadaMovement + 360) % 360;

    return {
        chartData,
        kunda: {
            longitude: kundaLong,
            rasi: RASIS[kundaRasiIdx],
            nakshatraIdx: kundaNakshatraIdx,
            matchesLagna: kundaMatchesLagna
        },
        pranapada: {
            longitude: pranapadaLong,
            rasi: RASIS[Math.floor(pranapadaLong / 30)]
        },
        gulika: {
            longitude: gulikaSiderealLagna,
            rasi: RASIS[Math.floor(gulikaSiderealLagna / 30)]
        },
        tattva: {
            rulingElement,
            genderMatches,
            gender,
            expectedGender
        }
    };
}
