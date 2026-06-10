'use client';

import React from 'react';
import { BiorhythmSeriesPoint, BIORHYTHM_CYCLES } from '@/lib/biorhythm';

interface BiorhythmChartProps {
  series: BiorhythmSeriesPoint[];
}

const BiorhythmChart: React.FC<BiorhythmChartProps> = ({ series }) => {
  const width = 1000;
  const height = 400;
  const padding = { top: 40, right: 40, bottom: 60, left: 40 };

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
      <div className="min-w-[800px] bg-white border border-outline/80 rounded-[2.5rem] p-6 shadow-sm">
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
                x={getX(targetIndex)} y={height - padding.bottom + 25}
                className="fill-accent text-[10px] font-bold font-label text-center"
                textAnchor="middle"
              >
                SELECTED DATE
              </text>
            </g>
          )}

          {/* Date Labels (X-Axis) */}
          {series.map((p, i) => (
             i % 5 === 0 || p.isTarget ? (
              <text
                key={i}
                x={getX(i)} y={height - 20}
                className={`text-[10px] font-label ${p.isTarget ? 'fill-on-surface font-bold' : 'fill-secondary/60'}`}
                textAnchor="middle"
              >
                {p.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </text>
             ) : null
          ))}

          {/* Value Labels (Y-Axis) */}
          <text x={padding.left - 10} y={getY(1)} className="fill-secondary/60 text-[10px] font-label" textAnchor="end" dominantBaseline="middle">100%</text>
          <text x={padding.left - 10} y={getY(0)} className="fill-secondary/60 text-[10px] font-label" textAnchor="end" dominantBaseline="middle">50%</text>
          <text x={padding.left - 10} y={getY(-1)} className="fill-secondary/60 text-[10px] font-label" textAnchor="end" dominantBaseline="middle">0%</text>

          {/* Cycle Paths */}
          {BIORHYTHM_CYCLES.map(cycle => (
            <g key={cycle.name}>
              <path
                d={getPathData(cycle.name)}
                fill="none"
                stroke={cycle.color}
                strokeWidth="2.5"
                strokeLinecap="round"
                className="opacity-80"
              />
              {/* Dots */}
              {series.map((p, i) => (
                <circle
                  key={i}
                  cx={getX(i)} cy={getY(p.values[cycle.name])}
                  r={p.isTarget ? 4 : 2}
                  fill={cycle.color}
                  className={p.isTarget ? 'stroke-white stroke-2' : ''}
                />
              ))}
            </g>
          ))}
        </svg>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-4 mt-6">
          {BIORHYTHM_CYCLES.map(cycle => (
            <div key={cycle.name} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cycle.color }} />
              <span className="text-[10px] font-bold font-label uppercase tracking-widest text-secondary">{cycle.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BiorhythmChart;
