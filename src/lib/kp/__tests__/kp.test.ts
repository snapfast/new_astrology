import { test } from 'node:test';
import assert from 'node:assert';
import * as Ast from 'astronomy-engine';
import { generateKPAstrologyData } from '../index.ts';

test('KP Chart generates planets in correct houses', () => {
    // Test data derived from sample KP chart
    // Date: Nov 02 1993, 13:10 IST, Lat: 31.3789, Lng: 76.3888 (approx)
    const date = new Date("1993-11-02T13:10:00+05:30");
    const time = Ast.MakeTime(date);
    const lat = 31.3789;
    const lon = 76.3888;

    const data = generateKPAstrologyData(time, lat, lon);

    // Verify planetary house placements based on the image:
    const rahu = data.planets.find(p => p.name === "Rahu");
    assert.strictEqual(rahu?.house, 10, 'Rahu should be in 10th house');

    const mars = data.planets.find(p => p.name === "Mars");
    assert.strictEqual(mars?.house, 9, 'Mars should be in 9th house');

    const moon = data.planets.find(p => p.name === "Moon");
    assert.strictEqual(moon?.house, 4, 'Moon should be in 4th house');

    const saturn = data.planets.find(p => p.name === "Saturn");
    assert.strictEqual(saturn?.house, 1, 'Saturn should be in 1st house');

    const venus = data.planets.find(p => p.name === "Venus");
    assert.strictEqual(venus?.house, 8, 'Venus should be in 8th house');

    const sun = data.planets.find(p => p.name === "Sun");
    assert.strictEqual(sun?.house, 9, 'Sun should be in 9th house');

    const ketu = data.planets.find(p => p.name === "Ketu");
    assert.strictEqual(ketu?.house, 4, 'Ketu should be in 4th house');
});
