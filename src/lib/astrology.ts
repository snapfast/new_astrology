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
  houses: { [key: number]: string[] }; // House number (1-12) -> Planet symbols
  houseRasis: { [key: number]: number }; // House number (1-12) -> Rasi number (1-12)
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

const PLANETS = [
  { name: "Ascendant", symbol: "As" },
  { name: "Sun", symbol: "Su" },
  { name: "Moon", symbol: "Mo" },
  { name: "Mars", symbol: "Ma" },
  { name: "Mercury", symbol: "Me" },
  { name: "Jupiter", symbol: "Ju" },
  { name: "Venus", symbol: "Ve" },
  { name: "Saturn", symbol: "Sa" },
  { name: "Rahu", symbol: "Ra" },
  { name: "Ketu", symbol: "Ke" },
];

function getSiderealSunRasi(dob: string): number {
  const date = new Date(dob);
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();

  // Approximate Sidereal (Lahiri) Sun Sign boundaries
  if ((month === 4 && day >= 14) || (month === 5 && day <= 14)) return 0; // Aries
  if ((month === 5 && day >= 15) || (month === 6 && day <= 14)) return 1; // Taurus
  if ((month === 6 && day >= 15) || (month === 7 && day <= 16)) return 2; // Gemini
  if ((month === 7 && day >= 17) || (month === 8 && day <= 16)) return 3; // Cancer
  if ((month === 8 && day >= 17) || (month === 9 && day <= 16)) return 4; // Leo
  if ((month === 9 && day >= 17) || (month === 10 && day <= 17)) return 5; // Virgo
  if ((month === 10 && day >= 18) || (month === 11 && day <= 16)) return 6; // Libra
  if ((month === 11 && day >= 17) || (month === 12 && day <= 15)) return 7; // Scorpio
  if ((month === 12 && day >= 16) || (month === 1 && day <= 14)) return 8; // Sagittarius
  if ((month === 1 && day >= 15) || (month === 2 && day <= 12)) return 9; // Capricorn
  if ((month === 2 && day >= 13) || (month === 3 && day <= 14)) return 10; // Aquarius
  return 11; // Pisces (Mar 15 - Apr 13)
}

export function generateAstrologyData(dob: string, tob: string): ChartData {
  // Use dob and tob to create a seed for "deterministic" but realistic-looking data
  const seedStr = dob + tob;
  let seed = 0;
  for (let i = 0; i < seedStr.length; i++) {
    seed = ((seed << 5) - seed) + seedStr.charCodeAt(i);
    seed |= 0;
  }

  const pseudoRandom = () => {
    seed = (seed * 16807) % 2147483647;
    if (seed < 0) seed += 2147483647;
    return seed / 2147483647;
  };

  // Determine Ascendant Rasi based on Sun Rasi and Time of Birth
  // This provides a much more realistic chart structure
  const sunRasiIdx = getSiderealSunRasi(dob);

  // Calculate hours since dawn (approx 6 AM)
  const [hours, minutes] = tob.split(':').map(Number);
  const timeInMinutes = hours * 60 + minutes;
  const dawnInMinutes = 6 * 60; // 6:00 AM
  const minutesSinceDawn = (timeInMinutes - dawnInMinutes + 1440) % 1440;

  // Ascendant changes approx every 2 hours (120 minutes)
  const rasiShift = Math.floor(minutesSinceDawn / 120);
  const ascRasiIdx = (sunRasiIdx + rasiShift) % 12;
  const ascRasiNum = ascRasiIdx + 1;

  const planets: PlanetData[] = [];
  const houses: { [key: number]: string[] } = {};
  const houseRasis: { [key: number]: number } = {};

  // Initialize houses using the calculated Ascendant
  for (let i = 1; i <= 12; i++) {
    houses[i] = [];
    // House 1 is the Ascendant Rasi, then they follow in order
    houseRasis[i] = ((ascRasiIdx + i - 1) % 12) + 1;
  }

  let rahuHouse = 1;

  PLANETS.forEach((p) => {
    let house = Math.floor(pseudoRandom() * 12) + 1;

    // Core Rules for realistic chart representation:
    if (p.name === "Ascendant") {
      house = 1;
    } else if (p.name === "Sun") {
      // Sun rasi is fixed by DOB, so its house depends on the Ascendant
      const targetSunRasiNum = sunRasiIdx + 1;
      for (let h = 1; h <= 12; h++) {
        if (houseRasis[h] === targetSunRasiNum) {
          house = h;
          break;
        }
      }
    } else if (p.name === "Rahu") {
      rahuHouse = house;
    } else if (p.name === "Ketu") {
      // Ketu is always exactly opposite Rahu (7th house from Rahu)
      house = ((rahuHouse + 6 - 1) % 12) + 1;
    }

    const rasiIdx = (houseRasis[house] - 1);
    const degInRasi = pseudoRandom() * 30;

    // Calculate Nakshatra based on actual position in the zodiac (360 degrees)
    const absoluteDegrees = (rasiIdx * 30) + degInRasi;
    const nakshatraIdx = Math.floor(absoluteDegrees / (360 / 27));

    // Format degree: DD° MM' SS"
    const d = Math.floor(degInRasi);
    const m = Math.floor((degInRasi - d) * 60);
    const s = Math.floor(((degInRasi - d) * 60 - m) * 60);
    const degreeStr = `${d}° ${m}' ${s}"`;

    const data: PlanetData = {
      name: p.name,
      symbol: p.symbol,
      degree: degreeStr,
      rasi: RASIS[rasiIdx],
      nakshatra: NAKSHATRAS[nakshatraIdx],
      house: house,
    };

    planets.push(data);
    houses[house].push(p.symbol);
  });

  return {
    planets,
    houses,
    houseRasis,
  };
}
