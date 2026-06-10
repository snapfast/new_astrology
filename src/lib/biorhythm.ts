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
  { name: 'Spiritual', period: 53, color: '#8B5CF6', description: 'Peace, harmony, and inner stability.' },
  { name: 'Intuitional', period: 38, color: '#F59E0B', description: 'Unconscious perception and instincts.' },
  { name: 'Aesthetic', period: 43, color: '#10B981', description: 'Appreciation for art, culture, and beauty.' },
  { name: 'Awareness', period: 48, color: '#6366F1', description: 'Conscious perception and alertness.' },
];

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
  const start = new Date(Date.UTC(birthDate.getFullYear(), birthDate.getMonth(), birthDate.getDate()));
  const end = new Date(Date.UTC(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate()));

  const diffTime = end.getTime() - start.getTime();
  const daysSinceBirth = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  const cycles = BIORHYTHM_CYCLES.map(cycle => {
    const value = Math.sin((2 * Math.PI * daysSinceBirth) / cycle.period);
    return {
      ...cycle,
      value: parseFloat(value.toFixed(4))
    };
  });

  return {
    cycles,
    targetDate: end,
    daysSinceBirth
  };
}

export function calculateBiorhythmSeries(birthDate: Date, targetDate: Date, rangeDays: number = 15): BiorhythmSeriesPoint[] {
  const series: BiorhythmSeriesPoint[] = [];

  // Normalize target date to midnight
  const baseTarget = new Date(Date.UTC(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate()));

  for (let i = -rangeDays; i <= rangeDays; i++) {
    const currentTarget = new Date(baseTarget);
    currentTarget.setUTCDate(baseTarget.getUTCDate() + i);

    const data = calculateBiorhythms(birthDate, currentTarget);
    const values: { [key: string]: number } = {};
    data.cycles.forEach(c => {
      values[c.name] = c.value;
    });

    series.push({
      date: currentTarget,
      values,
      isTarget: i === 0
    });
  }

  return series;
}
