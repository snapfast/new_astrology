import * as Ast from 'astronomy-engine';
import {
    getLahiriAyanamsa,
    getTrueEclipticLongitude,
    getTrueMoonEclipticLongitude,
    getMeanRahu,
    createPlanet,
    generateAstrologyData,
    type PlanetData,
    type ChartData,
    RASI_FULL_NAMES,
    RASI_LORDS,
    PLANET_NAMES,
    NAKSHATRA_NAMES
} from './astrology';

const NAKSHATRA_WIDTH = 360 / 27;

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

export interface CombustionPeriod {
    planet: string;
    start: Date;
    end: Date;
    isCurrent: boolean;
}

export interface PeriodDetails {
    start: Date | null;
    end: Date | null;
}

export interface TransitPeriodGroup {
    currentOrNext: PeriodDetails;
    previous: PeriodDetails;
}

export interface AscendantTransitData {
    signIndex: number;
    signName: string;
    signSanskrit: string;
    signLord: string;
    signLordSanskrit: string;
    timeIST: string;
    timeObj: Date;
    chart: ChartData;
}

interface PlanetState {
    rashi: number;
    nakshatra: number;
    isRetro: boolean;
}

const planetLongCache = new Map<string, { long: number, isRetro: boolean }>();

function isPlanetRetrograde(body: Ast.Body, time: Ast.AstroTime, currentLong?: number): boolean {
    if (body === Ast.Body.Sun || body === Ast.Body.Moon) return false;

    const t1 = time;
    const t2 = Ast.MakeTime(time.ut + 1 / 24);

    const lon1 = currentLong ?? getTrueEclipticLongitude(body, t1);
    const lon2 = getTrueEclipticLongitude(body, t2);

    let diff = (lon2 - lon1 + 360) % 360;
    if (diff > 180) diff -= 360;

    return diff < 0;
}

export function isPlanetCombustAt(
    planet: string,
    body: Ast.Body,
    time: Ast.AstroTime,
    precomputedLong?: number,
    precomputedIsRetro?: boolean,
    precomputedSunLong?: number
): boolean {
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

export function getPlanetTransits(planet: string, referenceDate: Date): PlanetTransits {
    if (!referenceDate || isNaN(referenceDate.getTime())) {
        return {
            planet,
            past: [],
            future: [],
            current: undefined
        };
    }

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

    past.sort((a, b) => a.date.getTime() - b.date.getTime());
    future.sort((a, b) => a.date.getTime() - b.date.getTime());

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

export function getSiderealLagnaAt(time: Ast.AstroTime, lat: number, lon: number): number {
    const siderealTime = Ast.SiderealTime(time);
    const RAMC = (siderealTime * 15 + lon) % 360;
    const rad = Math.PI / 180;
    const phi = lat * rad;
    const rot = Ast.Rotation_ECL_EQD(time);
    const eps = Math.acos(rot.rot[2][2]);
    const alpha = RAMC * rad;
    const lagnaTropical = (Math.atan2(Math.cos(alpha), -(Math.sin(alpha) * Math.cos(eps) + Math.tan(phi) * Math.sin(eps))) / rad + 360) % 360;
    const ayanamsa = getLahiriAyanamsa(time);
    return (lagnaTropical - ayanamsa + 360) % 360;
}

export function getTransitsPerAscendant(dateStr: string, latStr?: string, lonStr?: string): AscendantTransitData[] {
    const lat = parseFloat(latStr || "28.6139");
    const lon = parseFloat(lonStr || "77.2090");

    const parts = dateStr.split('-').map(Number);
    if (parts.length !== 3 || parts.some(isNaN)) {
        return [];
    }
    const [year, month, day] = parts;

    const startISTMs = Date.UTC(year, month - 1, day, 0, 0, 0) - 5.5 * 60 * 60 * 1000;
    const endISTMs = startISTMs + 24 * 60 * 60 * 1000;

    const stepMs = 2 * 60 * 1000;
    const timePoints: { ms: number; lagna: number }[] = [];

    for (let ms = startISTMs; ms <= endISTMs; ms += stepMs) {
        const time = Ast.MakeTime(new Date(ms));
        const lagna = getSiderealLagnaAt(time, lat, lon);
        timePoints.push({ ms, lagna });
    }

    const results: AscendantTransitData[] = [];

    for (let S = 0; S < 12; S++) {
        const targetDeg = S * 30 + 15;
        let bestMs = startISTMs;
        let minDiff = 360;

        for (let i = 1; i < timePoints.length; i++) {
            const p1 = timePoints[i - 1];
            const p2 = timePoints[i];

            const l1 = p1.lagna;
            let l2 = p2.lagna;

            let t = targetDeg;
            if (l2 < l1) {
                l2 += 360;
                if (t < l1) t += 360;
            }

            if (t >= l1 && t <= l2) {
                let low = p1.ms;
                let high = p2.ms;

                for (let iter = 0; iter < 20; iter++) {
                    const mid = (low + high) / 2;
                    const midTime = Ast.MakeTime(new Date(mid));
                    let midLagna = getSiderealLagnaAt(midTime, lat, lon);
                    if (midLagna < l1 && l2 >= 360) midLagna += 360;

                    if (midLagna < t) {
                        low = mid;
                    } else {
                        high = mid;
                    }
                }
                bestMs = (low + high) / 2;
                minDiff = 0;
                break;
            } else {
                const d1 = Math.min(Math.abs(p1.lagna - targetDeg), 360 - Math.abs(p1.lagna - targetDeg));
                if (d1 < minDiff) {
                    minDiff = d1;
                    bestMs = p1.ms;
                }
            }
        }

        const istMs = bestMs + 5.5 * 60 * 60 * 1000;
        const istDate = new Date(istMs);

        const h = istDate.getUTCHours();
        const m = istDate.getUTCMinutes();
        const ampm = h >= 12 ? 'PM' : 'AM';
        const h12 = h % 12 === 0 ? 12 : h % 12;
        const timeIST = `${String(h12).padStart(2, '0')}:${String(m).padStart(2, '0')} ${ampm} IST`;

        const dobStr = `${istDate.getUTCFullYear()}-${String(istDate.getUTCMonth() + 1).padStart(2, '0')}-${String(istDate.getUTCDate()).padStart(2, '0')}`;
        const tobStr = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;

        const chart = generateAstrologyData(dobStr, tobStr, lat.toString(), lon.toString());

        const signInfo = RASI_FULL_NAMES[S];
        const lordName = RASI_LORDS[S];
        const lordSanskrit = PLANET_NAMES[lordName]?.sanskrit || lordName;

        results.push({
            signIndex: S,
            signName: signInfo.name,
            signSanskrit: signInfo.sanskrit,
            signLord: lordName,
            signLordSanskrit: lordSanskrit,
            timeIST,
            timeObj: new Date(bestMs),
            chart
        });
    }

    return results;
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
    if (!refDate || isNaN(refDate.getTime())) return null;

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
    if (!refDate || isNaN(refDate.getTime())) return null;

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
