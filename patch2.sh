sed -i "s/const degree = formatDegree(siderealLong);/const divisions: Record<ChartKey, number> = { d1: 1, d3: 3, d7: 7, d9: 9, d10: 10, d60: 60 };/" src/lib/astrology.ts
