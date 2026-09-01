import { test } from 'node:test';
import assert from 'node:assert';
import * as Ast from 'astronomy-engine';
import { calculatePlacidusCusps, getPlacidusHouse } from '../placidus.ts';

test('Placidus cusps align with sample KP chart degrees', () => {
    // Nov 02, 1993, 13:10 IST, Nangal Punjab
    const date = new Date("1993-11-02T13:10:00+05:30");
    const time = Ast.MakeTime(date);
    const lat = 31.3789;
    const lon = 76.3888;

    // We inject the exact ayanamsa from the image to isolate the placidus calculation test
    const imageAyanamsa = 23 + (41/60) + (39/3600); // 23° 41' 39"

    const cusps = calculatePlacidusCusps(time, lat, lon, imageAyanamsa);

    // Cusp 2 should be Aquarius (300) + 27° 1' = 327.016
    assert.ok(Math.abs(cusps[2] - (300 + 27 + 1/60)) < 1.0, `Cusp 2 is ${cusps[2]}`);
});
