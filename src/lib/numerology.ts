export type NumerologySystem = 'chaldean' | 'pythagorean';

export interface LetterBreakdown {
  letter: string;
  value: number;
}

export interface NumerologyProfile {
  number: number;
  rulingPlanet: string;
  element: string;
  gemstone: string;
  luckyColors: string[];
  luckyDays: string[];
  friendlyNumbers: number[];
  enemyNumbers: number[];
  traits: string[];
  remedies: string[];
}

// Chaldean Values (1-8, 9 is not assigned to any letter but can be a result)
const CHALDEAN_MAP: Record<string, number> = {
  a: 1, i: 1, j: 1, q: 1, y: 1,
  b: 2, k: 2, r: 2,
  c: 3, g: 3, l: 3, s: 3,
  d: 4, m: 4, t: 4,
  e: 5, h: 5, n: 5, x: 5,
  u: 6, v: 6, w: 6,
  o: 7, z: 7,
  f: 8, p: 8
};

// Pythagorean Values (1-9 sequential)
const PYTHAGOREAN_MAP: Record<string, number> = {
  a: 1, j: 1, s: 1,
  b: 2, k: 2, t: 2,
  c: 3, l: 3, u: 3,
  d: 4, m: 4, v: 4,
  e: 5, n: 5, w: 5,
  f: 6, o: 6, x: 6,
  g: 7, p: 7, y: 7,
  h: 8, q: 8, z: 8,
  i: 9, r: 9
};

const reduceToSingleDigit = (num: number): number => {
  if (num === 0) return 0;
  if (num % 9 === 0) return 9;
  return num % 9;
};

// Mulank (Birth Number)
export const calculateMulank = (dobDateStr: string): number => {
  if (!dobDateStr) return 0;
  // expects "YYYY-MM-DD"
  const parts = dobDateStr.split('-');
  if (parts.length !== 3) return 0;
  const day = parseInt(parts[2], 10);
  if (isNaN(day)) return 0;
  return reduceToSingleDigit(day);
};

// Bhagyank (Destiny/Life Path Number)
export const calculateBhagyank = (dobDateStr: string): number => {
  if (!dobDateStr) return 0;
  const digitsStr = dobDateStr.replace(/\D/g, '');
  let sum = 0;
  for (const char of digitsStr) {
    sum += parseInt(char, 10);
  }
  return reduceToSingleDigit(sum);
};

// Namank (Name Number)
export const calculateNamank = (
  name: string,
  system: NumerologySystem
): { total: number; singleDigit: number; breakdown: LetterBreakdown[] } => {
  const breakdown: LetterBreakdown[] = [];
  let sum = 0;
  const map = system === 'chaldean' ? CHALDEAN_MAP : PYTHAGOREAN_MAP;

  for (const char of name) {
    const lowerChar = char.toLowerCase();
    if (/[a-z]/.test(lowerChar)) {
      const val = map[lowerChar] || 0;
      breakdown.push({ letter: char, value: val });
      sum += val;
    } else if (char.trim() !== '') {
      breakdown.push({ letter: char, value: 0 }); // for spaces/punctuation if kept, but usually skipped. We'll include them with 0 value to reconstruct name visually.
    } else {
      breakdown.push({ letter: ' ', value: 0 });
    }
  }

  return {
    total: sum,
    singleDigit: reduceToSingleDigit(sum),
    breakdown
  };
};

// Lucky Numbers Matrix
export interface LuckyNumbersMatrix {
  singleDigits: number[];
  twoDigits: number[];
  vehiclePlatePatterns: number[];
  mobileDigitPatterns: number[];
}

export const getLuckyNumbersMatrix = (mulank: number, bhagyank: number): LuckyNumbersMatrix => {
  const profileM = NUMEROLOGY_PROFILES[mulank as keyof typeof NUMEROLOGY_PROFILES];
  const profileB = NUMEROLOGY_PROFILES[bhagyank as keyof typeof NUMEROLOGY_PROFILES];

  const friendlyMulank = profileM ? profileM.friendlyNumbers : [];
  const friendlyBhagyank = profileB ? profileB.friendlyNumbers : [];

  // Combine and deduplicate friendly numbers
  const baseLucky = Array.from(new Set([mulank, bhagyank, ...friendlyMulank, ...friendlyBhagyank]));
  // Remove enemy numbers (if they conflict, enemies take precedence usually, but here we just ensure we don't pick strict enemies)
  const enemyMulank = profileM ? profileM.enemyNumbers : [];
  const singleDigits = baseLucky.filter(n => !enemyMulank.includes(n)).sort((a, b) => a - b);

  if (singleDigits.length === 0) singleDigits.push(mulank || 1);

  // Generate some two-digit patterns that sum to a lucky single digit
  const twoDigits: number[] = [];
  for (let i = 10; i <= 99; i++) {
    if (singleDigits.includes(reduceToSingleDigit(i))) {
      twoDigits.push(i);
    }
  }

  // Pick a few examples for plate patterns and mobile patterns (sums matching lucky digits)
  // Just shuffle and slice for variety
  const shuffle = (array: number[]) => array.slice().sort(() => Math.random() - 0.5);
  const selectedTwoDigits = shuffle(twoDigits).slice(0, 10).sort((a, b) => a - b);

  // Example patterns that total to lucky single digits
  const vehiclePatterns = [1000, 2000, 3000].map(base => {
    const targetDigit = singleDigits[Math.floor(Math.random() * singleDigits.length)];
    let offset = targetDigit - reduceToSingleDigit(base);
    if (offset < 0) offset += 9;
    return base + offset;
  });

  return {
    singleDigits: singleDigits.slice(0, 5),
    twoDigits: selectedTwoDigits,
    vehiclePlatePatterns: [mulank * 1111, bhagyank * 1111, ...vehiclePatterns].slice(0, 4),
    mobileDigitPatterns: singleDigits
  };
};

// TODO: Future implementations for compound numbers (10-99 meaning) and personal year transits

export const NUMEROLOGY_PROFILES: Record<number, NumerologyProfile> = {
  1: {
    number: 1,
    rulingPlanet: "Sun (Surya)",
    element: "Fire",
    gemstone: "Ruby",
    luckyColors: ["Gold", "Orange", "Yellow", "Red"],
    luckyDays: ["Sunday", "Monday"],
    friendlyNumbers: [2, 3, 9],
    enemyNumbers: [6, 8],
    traits: ["Leadership", "Independence", "Originality", "Ambition", "Courage"],
    remedies: ["Offer water to the Sun (Surya Arghya) daily morning.", "Respect father and authority figures.", "Chant Aditya Hrudaya Stotram."]
  },
  2: {
    number: 2,
    rulingPlanet: "Moon (Chandra)",
    element: "Water",
    gemstone: "Pearl",
    luckyColors: ["White", "Silver", "Pale Green", "Cream"],
    luckyDays: ["Monday", "Friday"],
    friendlyNumbers: [1, 3, 5],
    enemyNumbers: [8, 9],
    traits: ["Diplomacy", "Intuition", "Sensitivity", "Cooperation", "Peacemaking"],
    remedies: ["Offer milk and water on Shivling on Mondays.", "Respect mother and elderly women.", "Meditate to calm emotional fluctuations."]
  },
  3: {
    number: 3,
    rulingPlanet: "Jupiter (Guru/Brihaspati)",
    element: "Fire",
    gemstone: "Yellow Sapphire",
    luckyColors: ["Yellow", "Purple", "Lilac", "Pink"],
    luckyDays: ["Thursday", "Tuesday"],
    friendlyNumbers: [1, 2, 9],
    enemyNumbers: [6],
    traits: ["Creativity", "Optimism", "Expression", "Sociability", "Wisdom"],
    remedies: ["Worship Lord Vishnu or your Guru.", "Donate yellow items (chana dal, turmeric) on Thursdays.", "Apply kesar (saffron) tilak on forehead."]
  },
  4: {
    number: 4,
    rulingPlanet: "Rahu",
    element: "Earth",
    gemstone: "Hessonite (Gomed)",
    luckyColors: ["Blue", "Grey", "Khaki", "Brown"],
    luckyDays: ["Sunday", "Monday", "Saturday"],
    friendlyNumbers: [1, 5, 6, 8],
    enemyNumbers: [2, 9],
    traits: ["Practicality", "Organization", "Hard Work", "Unconventionality", "Logic"],
    remedies: ["Worship Lord Ganesha or Goddess Saraswati.", "Feed birds and stray dogs.", "Avoid taking quick, impulsive decisions."]
  },
  5: {
    number: 5,
    rulingPlanet: "Mercury (Budh)",
    element: "Air",
    gemstone: "Emerald",
    luckyColors: ["Green", "Light shades", "White"],
    luckyDays: ["Wednesday", "Friday"],
    friendlyNumbers: [1, 4, 6],
    enemyNumbers: [2],
    traits: ["Adaptability", "Communication", "Freedom", "Versatility", "Curiosity"],
    remedies: ["Feed green grass to cows on Wednesdays.", "Worship Lord Ganesha.", "Keep a tulsi plant and water it regularly."]
  },
  6: {
    number: 6,
    rulingPlanet: "Venus (Shukra)",
    element: "Earth",
    gemstone: "Diamond or White Sapphire",
    luckyColors: ["White", "Light Blue", "Pink", "Silver"],
    luckyDays: ["Friday", "Tuesday"],
    friendlyNumbers: [4, 5, 8],
    enemyNumbers: [1, 3],
    traits: ["Love", "Harmony", "Responsibility", "Artistic", "Nurturing"],
    remedies: ["Worship Goddess Lakshmi or Durga.", "Maintain cleanliness and use fragrances.", "Respect women and partner."]
  },
  7: {
    number: 7,
    rulingPlanet: "Ketu",
    element: "Water",
    gemstone: "Cat's Eye (Lehsuniya)",
    luckyColors: ["Light Yellow", "Light Green", "White", "Grey"],
    luckyDays: ["Sunday", "Monday"],
    friendlyNumbers: [1, 2, 4],
    enemyNumbers: [8, 9],
    traits: ["Spirituality", "Analysis", "Intuition", "Research", "Mysticism"],
    remedies: ["Feed stray dogs regularly.", "Meditate and engage in spiritual reading.", "Donate blankets to the needy."]
  },
  8: {
    number: 8,
    rulingPlanet: "Saturn (Shani)",
    element: "Earth",
    gemstone: "Blue Sapphire",
    luckyColors: ["Black", "Dark Blue", "Grey", "Purple"],
    luckyDays: ["Saturday", "Wednesday"],
    friendlyNumbers: [4, 5, 6],
    enemyNumbers: [1, 2, 9],
    traits: ["Ambition", "Discipline", "Authority", "Patience", "Material Success"],
    remedies: ["Light a mustard oil lamp under a peepal tree on Saturdays.", "Help laborers and the less fortunate.", "Chant Shani mantra and read Hanuman Chalisa."]
  },
  9: {
    number: 9,
    rulingPlanet: "Mars (Mangal)",
    element: "Fire",
    gemstone: "Red Coral",
    luckyColors: ["Red", "Crimson", "Rose", "Pink"],
    luckyDays: ["Tuesday", "Thursday"],
    friendlyNumbers: [1, 2, 3],
    enemyNumbers: [4, 7],
    traits: ["Courage", "Humanitarianism", "Energy", "Passion", "Action"],
    remedies: ["Recite Hanuman Chalisa daily.", "Donate red items or blood.", "Control temper and practice patience."]
  }
};
