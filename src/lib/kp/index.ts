import * as Ast from 'astronomy-engine';
import { calculatePlacidusCusps, getPlacidusHouse } from './placidus';
import { KP_HORARY_SUBS } from './horary';
import { getKpKhullarAyanamsa } from './ayanamsa';
import {
    DivisionalChartData,
    PlanetData,
    getTrueEclipticLongitude,
    getTrueMoonEclipticLongitude,
    getMeanRahu,
    formatDegree,
    PLANET_NAMES,
    isPlanetCombustAt,
    getRotationMatrix,
    createPlanet
} from '../astrology';

export { KP_HORARY_SUBS, getKpKhullarAyanamsa };

type ChartKey = 'd1';

export function generateKPAstrologyData(
    time: Ast.AstroTime,
    lat: number,
    lon: number,
    kpHoraryNumber?: number
) {
    const ayanamsa = getKpKhullarAyanamsa(time);
    const rotEqjEct = getRotationMatrix(time);

    let kpLagnaOverride: number | undefined;
    if (kpHoraryNumber !== undefined && kpHoraryNumber >= 1 && kpHoraryNumber <= 249) {
        kpLagnaOverride = KP_HORARY_SUBS[kpHoraryNumber - 1];
    }

    const planetData: PlanetData[] = [];
    const assignments: Record<ChartKey, { [key: number]: Array<{ symbol: string, isRetrograde: boolean, isCombust?: boolean, degree?: string }> }> = {
        d1: {}
    };

    for (let i = 1; i <= 12; i++) {
        assignments.d1[i] = [];
    }

    let siderealCusps = calculatePlacidusCusps(time, lat, lon, ayanamsa);

    if (kpLagnaOverride !== undefined) {
        const diff = kpLagnaOverride - siderealCusps[1];
        siderealCusps = siderealCusps.map((c, i) => i === 0 ? 0 : ((c + diff + 360) % 360));
    }

    const lagnaSidereal = siderealCusps[1];

    const assignToChart = (symbol: string, siderealLong: number, isRetro: boolean, isComb: boolean = false) => {
        const placidusHouse = getPlacidusHouse(siderealLong, siderealCusps);
        assignments.d1[placidusHouse].push({ symbol, isRetrograde: isRetro, isCombust: isComb, degree: formatDegree((siderealLong * 1) % 30) });
    };

    planetData.push(createPlanet("Ascendant", "As", lagnaSidereal, 1, false, false));

    const PLANET_MAP = [
        { name: "Sun", body: Ast.Body.Sun, symbol: PLANET_NAMES["Sun"].symbol! },
        { name: "Moon", body: Ast.Body.Moon, symbol: PLANET_NAMES["Moon"].symbol! },
        { name: "Mars", body: Ast.Body.Mars, symbol: PLANET_NAMES["Mars"].symbol! },
        { name: "Mercury", body: Ast.Body.Mercury, symbol: PLANET_NAMES["Mercury"].symbol! },
        { name: "Jupiter", body: Ast.Body.Jupiter, symbol: PLANET_NAMES["Jupiter"].symbol! },
        { name: "Venus", body: Ast.Body.Venus, symbol: PLANET_NAMES["Venus"].symbol! },
        { name: "Saturn", body: Ast.Body.Saturn, symbol: PLANET_NAMES["Saturn"].symbol! },
        { name: "Uranus", body: Ast.Body.Uranus, symbol: PLANET_NAMES["Uranus"].symbol! },
        { name: "Neptune", body: Ast.Body.Neptune, symbol: PLANET_NAMES["Neptune"].symbol! },
        { name: "Pluto", body: Ast.Body.Pluto, symbol: PLANET_NAMES["Pluto"].symbol! }
    ];

    const tropicalSunLong = getTrueEclipticLongitude(Ast.Body.Sun, time, rotEqjEct);
    const sunSiderealLong = (tropicalSunLong - ayanamsa + 360) % 360;

    for (let i = 0; i < PLANET_MAP.length; i++) {
        const p = PLANET_MAP[i];
        let long: number;
        if (p.name === "Sun") {
            long = tropicalSunLong;
        } else if (p.name === "Moon") {
            long = getTrueMoonEclipticLongitude(time, rotEqjEct);
        } else {
            long = getTrueEclipticLongitude(p.body, time, rotEqjEct);
        }

        let isRetro = false;
        if (p.name !== "Sun" && p.name !== "Moon") {
            const nextDay = time.AddDays(1);
            const nextRot = getRotationMatrix(nextDay);
            const nextLong = getTrueEclipticLongitude(p.body, nextDay, nextRot);

            let diff = nextLong - long;
            if (diff > 180) diff -= 360;
            if (diff < -180) diff += 360;

            if (diff < 0) {
                isRetro = true;
            }
        }

        const siderealLong = (long - ayanamsa + 360) % 360;
        const isCombust = (p.name !== "Sun" && p.name !== "Moon") ? isPlanetCombustAt(p.name, p.body, time, siderealLong, isRetro, sunSiderealLong) : false;

        const house = getPlacidusHouse(siderealLong, siderealCusps);

        const planet = createPlanet(p.name, p.symbol, siderealLong, house, isRetro, isCombust);
        planetData.push(planet);

        assignToChart(p.symbol, siderealLong, isRetro, isCombust);
    }

    const rahuTropical = getMeanRahu(time);
    const rahuSidereal = (rahuTropical - ayanamsa + 360) % 360;
    const ketuSidereal = (rahuSidereal + 180) % 360;

    const rahuHouse = getPlacidusHouse(rahuSidereal, siderealCusps);
    const ketuHouse = getPlacidusHouse(ketuSidereal, siderealCusps);

    planetData.push(createPlanet("Rahu", "Ra", rahuSidereal, rahuHouse, true, false));
    planetData.push(createPlanet("Ketu", "Ke", ketuSidereal, ketuHouse, true, false));

    assignToChart("Ra", rahuSidereal, true, false);
    assignToChart("Ke", ketuSidereal, true, false);

    const houseRasis: Record<ChartKey, { [key: number]: number }> = { d1: {} };
    for (let h = 1; h <= 12; h++) {
        houseRasis.d1[h] = Math.floor(siderealCusps[h] / 30) + 1;
    }

    return {
        planets: planetData,
        cusps: siderealCusps,
        d1: { houses: assignments.d1, houseRasis: houseRasis.d1 } as DivisionalChartData
    };
}
