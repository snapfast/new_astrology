import * as Ast from 'astronomy-engine';

export function normalizeAngle(angle: number): number {
    return ((angle % 360) + 360) % 360;
}

export function calculatePlacidusCusps(time: Ast.AstroTime, lat: number, lon: number, ayanamsa: number): number[] {
    const rad = Math.PI / 180;
    const deg = 180 / Math.PI;

    const siderealTime = Ast.SiderealTime(time);
    const RAMC = normalizeAngle(siderealTime * 15 + lon);
    const RAMCRad = RAMC * rad;

    const phi = lat * rad;
    const rot = Ast.Rotation_ECL_EQD(time);
    const eps = Math.acos(rot.rot[2][2]); // Obliquity of ecliptic

    const MC = normalizeAngle(Math.atan2(Math.sin(RAMCRad), Math.cos(RAMCRad) * Math.cos(eps)) * deg);

    const lagnaTropical = normalizeAngle(
        Math.atan2(
            Math.cos(RAMCRad),
            -(Math.sin(RAMCRad) * Math.cos(eps) + Math.tan(phi) * Math.sin(eps))
        ) * deg
    );

    const getPlacidusCusp = (RAMC_Offset: number, r: number): number => {
        let cusp = 0; // initial guess
        let rightAscension = RAMC_Offset;

        for (let i = 0; i < 15; i++) {
            const declination = Math.asin(Math.sin(rightAscension * rad) * Math.sin(eps));
            let D = Math.asin(Math.tan(declination) * Math.tan(phi));
            if (isNaN(D)) {
                D = 0;
            }

            const ascensionalDiffDeg = D * deg;
            const R = RAMC_Offset + (ascensionalDiffDeg / 3) * (r / 30);
            rightAscension = normalizeAngle(R);
        }

        cusp = normalizeAngle(Math.atan2(Math.sin(rightAscension * rad) / Math.cos(eps), Math.cos(rightAscension * rad)) * deg);
        return cusp;
    };

    const cusp11 = getPlacidusCusp(RAMC + 30, 30);
    const cusp12 = getPlacidusCusp(RAMC + 60, 60);
    const cusp2  = getPlacidusCusp(RAMC + 120, 60);
    const cusp3  = getPlacidusCusp(RAMC + 150, 30);

    const tropicalCusps = [
        0, // dummy
        lagnaTropical,
        cusp2,
        cusp3,
        normalizeAngle(MC + 180), // 4th is IC (MC + 180)
        normalizeAngle(cusp11 + 180), // 5th is opposite 11th
        normalizeAngle(cusp12 + 180), // 6th is opposite 12th
        normalizeAngle(lagnaTropical + 180), // 7th is Descendant
        normalizeAngle(cusp2 + 180), // 8th is opposite 2nd
        normalizeAngle(cusp3 + 180), // 9th is opposite 3rd
        MC, // 10th is MC
        cusp11,
        cusp12
    ];

    const siderealCusps = tropicalCusps.map(c => normalizeAngle(c - ayanamsa));
    return siderealCusps;
}

export function getPlacidusHouse(planetSiderealLong: number, siderealCusps: number[]): number {
    for (let i = 1; i <= 12; i++) {
        const currentCusp = siderealCusps[i];
        const nextCusp = siderealCusps[i === 12 ? 1 : i + 1];

        if (currentCusp < nextCusp) {
            if (planetSiderealLong >= currentCusp && planetSiderealLong < nextCusp) {
                return i;
            }
        } else {
            if (planetSiderealLong >= currentCusp || planetSiderealLong < nextCusp) {
                return i;
            }
        }
    }
    return 1;
}
