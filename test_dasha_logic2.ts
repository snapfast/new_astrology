import { calculateVimshottariDasha } from './src/lib/astrology.ts';
const moonLongitude = 306.0;
const birthDate = new Date('1990-01-01T12:00:00Z');
const result = calculateVimshottariDasha(moonLongitude, birthDate);

// Find first dasha lord and compute the elapsed and total time in that dasha for the current nakshatra
// Wait, the logic is in calculateVimshottariDasha itself
// I should export a calculateDashaBalance function
