'use client';

import React, { memo } from 'react';
import { BiorhythmSeriesPoint, BIORHYTHM_CYCLES } from '@/lib/biorhythm';

interface BiorhythmChartProps {
  series: BiorhythmSeriesPoint[];
  lang?: 'en' | 'hi';
}

const TRANSLATIONS = {
  en: {
    selectedDate: "SELECTED DATE"
  },
  hi: {
    selectedDate: "चुनी हुई तारीख"
  }
};

const BiorhythmChartComponent: React.FC<BiorhythmChartProps> = ({ series, lang = 'en' }) => {
  const width = 1000;
  const height = 280;
  const padding = { top: 25, right: 40, bottom: 50, left: 40 };

  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const getX = (index: number) => padding.left + (index / (series.length - 1)) * chartWidth;
  const getY = (value: number) => padding.top + (1 - (value + 1) / 2) * chartHeight;

  // Function to generate SVG path using cubic bezier curves
  const getPathData = (cycleName: string) => {
    if (series.length < 2) return '';

    const points = series.map((p, i) => ({
      x: getX(i),
      y: getY(p.values[cycleName])
    }));

    let path = `M ${points[0].x} ${points[0].y}`;

    const smoothing = 0.15;

    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i - 1] || points[i];
      const p1 = points[i];
      const p2 = points[i + 1];
      const p3 = points[i + 2] || p2;

      const cp1x = p1.x + (p2.x - p0.x) * smoothing;
      const cp1y = p1.y + (p2.y - p0.y) * smoothing;

      const cp2x = p2.x - (p3.x - p1.x) * smoothing;
      const cp2y = p2.y - (p3.y - p1.y) * smoothing;

      path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
    }

    return path;
  };

  const targetIndex = series.findIndex(p => p.isTarget);

  return (
    <div className="w-full overflow-x-auto pb-4">
      <div className="min-w-[800px] bg-white border border-outline/20 rounded-3xl p-4 md:p-6 shadow-sm">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible">
          {/* Horizontal Grid Lines */}
          <line
            x1={padding.left} y1={getY(1)} x2={width - padding.right} y2={getY(1)}
            className="stroke-outline/30" strokeDasharray="4 4"
          />
          <line
            x1={padding.left} y1={getY(0)} x2={width - padding.right} y2={getY(0)}
            className="stroke-outline/50" strokeWidth="1"
          />
          <line
            x1={padding.left} y1={getY(-1)} x2={width - padding.right} y2={getY(-1)}
            className="stroke-outline/30" strokeDasharray="4 4"
          />

          {/* Vertical Target Indicator */}
          {targetIndex !== -1 && (
            <g>
              <line
                x1={getX(targetIndex)} y1={padding.top}
                x2={getX(targetIndex)} y2={height - padding.bottom + 10}
                className="stroke-accent/40" strokeWidth="2" strokeDasharray="6 4"
              />
              <text
                x={getX(targetIndex)} y={height - padding.bottom + 22}
                className={`fill-accent text-[10px] font-bold font-label text-center ${lang === 'hi' ? 'font-hindi' : ''}`}
                textAnchor="middle"
              >
                {TRANSLATIONS[lang].selectedDate}
              </text>
            </g>
          )}

          {/* Date Labels (X-Axis) */}
          {series.map((p, i) => {
            // Only show labels every 10 days to avoid crowding in the 60-day view,
            // but always show the label for the target date.
            const shouldShowLabel = i % 10 === 0 || p.isTarget;
            if (!shouldShowLabel) return null;

            return (
              <text
                key={i}
                x={getX(i)} y={height - 15}
                className={`text-[10px] font-label ${p.isTarget ? 'fill-on-surface font-bold' : 'fill-secondary'} ${lang === 'hi' ? 'font-hindi' : ''}`}
                textAnchor="middle"
              >
                {p.date.toLocaleDateString(lang === 'hi' ? 'hi-IN' : 'en-US', { month: 'short', day: 'numeric' })}
              </text>
            );
          })}

          {/* Value Labels (Y-Axis) */}
          <text x={padding.left - 10} y={getY(1)} className="fill-secondary text-[10px] font-label" textAnchor="end" dominantBaseline="middle">100%</text>
          <text x={padding.left - 10} y={getY(0)} className="fill-secondary text-[10px] font-label" textAnchor="end" dominantBaseline="middle">50%</text>
          <text x={padding.left - 10} y={getY(-1)} className="fill-secondary text-[10px] font-label" textAnchor="end" dominantBaseline="middle">0%</text>

          {/* Cycle Paths */}
          {BIORHYTHM_CYCLES.map(cycle => (
            <g key={cycle.name}>
              <path
                d={getPathData(cycle.name)}
                fill="none"
                stroke={cycle.color}
                strokeWidth="2.5"
                strokeLinecap="round"
                className="opacity-100"
              />
              {/* Dots - Only show for current day */}
              {series.map((p, i) => (
                p.isTarget ? (
                  <circle
                    key={i}
                    cx={getX(i)} cy={getY(p.values[cycle.name])}
                    r={4}
                    fill={cycle.color}
                    className="stroke-white stroke-2"
                  />
                ) : null
              ))}
            </g>
          ))}
        </svg>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mt-6">
          {BIORHYTHM_CYCLES.map(cycle => (
            <div key={cycle.name} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cycle.color }} />
              <span className={`text-[10px] font-bold font-label uppercase text-on-surface ${lang === 'en' ? 'tracking-widest' : 'font-hindi'}`}>
                {lang === 'hi' ? (cycle.name === "Physical" ? "शारीरिक" : cycle.name === "Emotional" ? "भावनात्मक" : cycle.name === "Intellectual" ? "बौद्धिक" : cycle.name === "Spiritual" ? "आध्यात्मिक" : cycle.name === "Intuitional" ? "सहज ज्ञान युक्त" : cycle.name === "Aesthetic" ? "सौंदर्यबोध" : "जागरूकता") : cycle.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const BiorhythmChart = memo(BiorhythmChartComponent);
BiorhythmChart.displayName = 'BiorhythmChart';

export default BiorhythmChart;
