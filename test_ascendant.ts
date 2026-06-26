import * as Ast from 'astronomy-engine';

const dob = "1993-11-02";
const tob = "13:10";
const lat = 31.3965; // Nangal Dam lat
const lon = 76.3867; // Nangal Dam lon

// Parse
const istDate = new Date(Date.UTC(1993, 10, 2, 13, 10));
const utcDate = new Date(istDate.getTime() - (5.5 * 60 * 60 * 1000));
const time = Ast.MakeTime(utcDate);

const T = time.tt / 36525.0;
const ayanamsa = 23.85709 + 1.39638 * T + 0.000308 * T * T;

// Matrix formula (Current repo)
const observer = new Ast.Observer(lat, lon, 0);
const R_ecl_eq = Ast.Rotation_ECL_EQD(time);
const R_eq_hor = Ast.Rotation_EQD_HOR(time, observer);
const R = [[0,0,0],[0,0,0],[0,0,0]];
for (let i=0; i<3; i++)
  for (let j=0; j<3; j++)
    for (let k=0; k<3; k++)
      R[i][j] += R_eq_hor.rot[i][k] * R_ecl_eq.rot[k][j];
const lagnaTropicalBase = (Math.atan2(-R[2][0], R[2][1]) * (180 / Math.PI) + 360) % 360;
const lrad = lagnaTropicalBase * (Math.PI / 180);
const v_ecl = [Math.cos(lrad), Math.sin(lrad), 0];
let y_hor = 0;
for (let j=0; j<3; j++) y_hor += R[1][j] * v_ecl[j];
const lagnaTropical1 = y_hor > 0 ? lagnaTropicalBase : (lagnaTropicalBase + 180) % 360;
const lagnaSidereal1 = (lagnaTropical1 - ayanamsa + 360) % 360;

// Trigonometric formula (Kundli Milan repo)
const siderealTime = Ast.SiderealTime(time);
const RAMC = (siderealTime * 15 + lon) % 360;
const rad = Math.PI / 180;
const phi = lat * rad;
const rot = Ast.Rotation_ECL_EQD(time);
const eps = Math.acos(rot.rot[2][2]);
const alpha = RAMC * rad;
const lagnaTropical2 = (Math.atan2(Math.cos(alpha), -(Math.sin(alpha) * Math.cos(eps) + Math.tan(phi) * Math.sin(eps))) / rad + 360) % 360;
const lagnaSidereal2 = (lagnaTropical2 - ayanamsa + 360) % 360;

console.log("Matrix Sidereal:", lagnaSidereal1);
console.log("Trigo  Sidereal:", lagnaSidereal2);

const d1 = Math.floor(lagnaSidereal1);
const m1 = Math.floor((lagnaSidereal1 - d1) * 60);
console.log(`Matrix: ${d1}° ${m1}'`);

const d2 = Math.floor(lagnaSidereal2);
const m2 = Math.floor((lagnaSidereal2 - d2) * 60);
console.log(`Trigo : ${d2}° ${m2}'`);
