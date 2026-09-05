'use client';

import React, { useMemo } from 'react';
import { BiorhythmSeriesPoint } from '@/lib/biorhythm';

interface MiniBiorhythmChartProps {
  series: BiorhythmSeriesPoint[];
  cycleName: string;
  color: string;
}

const MiniBiorhythmChart: React.FC<MiniBiorhythmChartProps> = ({ series, cycleName, color }) => {
  const width = 200;
  const height = 60;
  const padding = { top: 5, right: 5, bottom: 5, left: 5 };

  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const getX = (index: number) => padding.left + (index / (series.length - 1)) * chartWidth;
  const getY = (value: number) => padding.top + (1 - (value + 1) / 2) * chartHeight;

  const targetIndex = useMemo(() => series.findIndex(p => p.isTarget), [series]);

  if (series.length < 2) return null;

  const points = series.map((p, i) => ({
    x: getX(i),
    y: getY(p.values[cycleName])
  }));

  // Simple cubic bezier curve path
  let pathData = `M ${points[0].x} ${points[0].y}`;
  const smoothing = 0.2;

  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] || points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] || p2;

    const cp1x = p1.x + (p2.x - p0.x) * smoothing;
    const cp1y = p1.y + (p2.y - p0.y) * smoothing;

    const cp2x = p2.x - (p3.x - p1.x) * smoothing;
    const cp2y = p2.y - (p3.y - p1.y) * smoothing;

    pathData += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
  }

  return (
    <div className="w-full h-[60px]">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
        {/* Baseline */}
        <line
          x1={padding.left} y1={getY(0)} x2={width - padding.right} y2={getY(0)}
          className="stroke-outline/20" strokeWidth="1"
        />

        {/* Path */}
        <path
          d={pathData}
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          className="opacity-100"
        />

        {/* Current Day Dot */}
        {targetIndex !== -1 && (
          <circle
            cx={getX(targetIndex)}
            cy={getY(series[targetIndex].values[cycleName])}
            r={3}
            fill={color}
            className="stroke-white stroke-[1.5]"
          />
        )}
      </svg>
    </div>
  );
};

export default React.memo(MiniBiorhythmChart);
