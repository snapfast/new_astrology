/**
 * Biorhythm calculation utility
 * Formulas based on the Sinusoidal model: sin(2 * PI * t / period)
 */

export interface BiorhythmCycle {
  name: string;
  period: number;
  value: number; // -1 to 1
  description: string;
  color: string;
}

export const BIORHYTHM_CYCLES = [
  { name: 'Physical', period: 23, color: '#EF4444', description: 'Coordination, strength, and well-being.' },
  { name: 'Emotional', period: 28, color: '#EC4899', description: 'Creativity, sensitivity, and mood.' },
  { name: 'Intellectual', period: 33, color: '#3B82F6', description: 'Logic, memory, and concentration.' },
  { name: 'Spiritual', period: 53, color: '#9333EA', description: 'Peace, harmony, and inner stability.' },
  { name: 'Intuitional', period: 38, color: '#F59E0B', description: 'Unconscious perception and instincts.' },
  { name: 'Aesthetic', period: 43, color: '#10B981', description: 'Appreciation for art, culture, and beauty.' },
  { name: 'Awareness', period: 48, color: '#06B6D4', description: 'Conscious perception and alertness.' },
];

// Pre-calculate factors to avoid repeated division and PI access
const TWO_PI = 2 * Math.PI;
const CYCLE_FACTORS = BIORHYTHM_CYCLES.map(c => TWO_PI / c.period);
const DAY_MS = 86400000; // 1000 * 60 * 60 * 24

export interface BiorhythmData {
  cycles: BiorhythmCycle[];
  targetDate: Date;
  daysSinceBirth: number;
}

export interface BiorhythmSeriesPoint {
  date: Date;
  values: { [key: string]: number };
  isTarget: boolean;
}

export function calculateBiorhythms(birthDate: Date, targetDate: Date): BiorhythmData {
  // Normalize both dates to midnight UTC to ensure accurate day counting
  // Use Date.UTC for normalization as it returns a timestamp directly
  const startTs = Date.UTC(birthDate.getUTCFullYear(), birthDate.getUTCMonth(), birthDate.getUTCDate());
  const endTs = Date.UTC(targetDate.getUTCFullYear(), targetDate.getUTCMonth(), targetDate.getUTCDate());

  const daysSinceBirth = Math.floor((endTs - startTs) / DAY_MS);

  // Performance optimization: Avoid expensive string conversion and redundant Math.PI access
  const cycles = BIORHYTHM_CYCLES.map((cycle, index) => {
    const value = Math.sin(daysSinceBirth * CYCLE_FACTORS[index]);
    return {
      ...cycle,
      value: Math.round(value * 10000) / 10000
    };
  });

  return {
    cycles,
    targetDate: new Date(endTs),
    daysSinceBirth
  };
}

export function calculateBiorhythmSeries(birthDate: Date, targetDate: Date, rangeDays: number = 15): BiorhythmSeriesPoint[] {
  // Hoist normalization and pre-allocate series array
  const startTs = Date.UTC(birthDate.getUTCFullYear(), birthDate.getUTCMonth(), birthDate.getUTCDate());
  const baseTargetTs = Date.UTC(targetDate.getUTCFullYear(), targetDate.getUTCMonth(), targetDate.getUTCDate());

  const totalPoints = 2 * rangeDays + 1;
  const series = new Array<BiorhythmSeriesPoint>(totalPoints);

  for (let i = -rangeDays; i <= rangeDays; i++) {
    const currentTs = baseTargetTs + (i * DAY_MS);
    const daysSinceBirth = Math.floor((currentTs - startTs) / DAY_MS);

    // Optimized inner loop: direct calculation and minimal object creation
    const values: { [key: string]: number } = {};
    for (let j = 0; j < BIORHYTHM_CYCLES.length; j++) {
      const value = Math.sin(daysSinceBirth * CYCLE_FACTORS[j]);
      values[BIORHYTHM_CYCLES[j].name] = Math.round(value * 10000) / 10000;
    }

    series[i + rangeDays] = {
      date: new Date(currentTs),
      values,
      isTarget: i === 0
    };
  }

  return series;
}
