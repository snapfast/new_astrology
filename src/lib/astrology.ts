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
    return (seed - 1) / 2147483646;
  };

  // Determine Ascendant Rasi (1-12)
  const ascRasiNum = Math.floor(pseudoRandom() * 12) + 1;

  const planets: PlanetData[] = [];
  const houses: { [key: number]: string[] } = {};
  const houseRasis: { [key: number]: number } = {};

  // Initialize houses
  for (let i = 1; i <= 12; i++) {
    houses[i] = [];
    // Calculate Rasi for each house based on Ascendant
    houseRasis[i] = ((ascRasiNum + i - 2) % 12) + 1;
  }

  PLANETS.forEach((p) => {
    const totalDegrees = pseudoRandom() * 360;
    const house = Math.floor(pseudoRandom() * 12) + 1;
    const degInRasi = pseudoRandom() * 30;
    const rasiIdx = (houseRasis[house] - 1);

    // Format degree: DD° MM' SS"
    const d = Math.floor(degInRasi);
    const m = Math.floor((degInRasi - d) * 60);
    const s = Math.floor(((degInRasi - d) * 60 - m) * 60);
    const degreeStr = `${d}° ${m}' ${s}"`;

    const nakshatraIdx = Math.floor((totalDegrees / 360) * 27);

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
