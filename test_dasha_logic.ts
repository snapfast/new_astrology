import { calculateVimshottariDasha } from './src/lib/astrology.ts';

const moonLongitude = 306.0;
const birthDate = new Date('1990-01-01T12:00:00Z');
const result = calculateVimshottariDasha(moonLongitude, birthDate);
const firstDasha = result[0];

const MS_PER_YEAR = 365.25 * 24 * 60 * 60 * 1000;
const remainingMs = firstDasha.end - birthDate.getTime();
console.log("Lord:", firstDasha.lord);
console.log("Remaining ms:", remainingMs);

let yDiff = remainingMs / MS_PER_YEAR;
const years = Math.floor(yDiff);
const mDiff = (yDiff - years) * 12;
const months = Math.floor(mDiff);
const days = Math.floor((mDiff - months) * 30.4375); // approx

console.log(`${years} years, ${months} months, ${days} days`);
