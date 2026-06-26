import { FC, memo } from 'react';
import { DivisionalChartData } from '@/lib/astrology';

interface KundliChartProps {
  data: DivisionalChartData;
}

const KundliChartComponent: FC<KundliChartProps> = ({ data }) => {
  const { houses, houseRasis } = data;

  // House coordinates and labels for North Indian Style (Diamond)
  // 1st house is the top center diamond

  return (
    <div className="w-full aspect-square max-w-[500px] mx-auto relative p-4">
      <svg viewBox="0 0 400 400" className="w-full h-full">
        {/* Main Outer Square */}
        <rect x="0" y="0" width="400" height="400" fill="none" stroke="#991B1B" strokeWidth="1.5" strokeOpacity="0.8" />

        {/* Diamond lines */}
        <line x1="0" y1="0" x2="400" y2="400" stroke="#991B1B" strokeWidth="1.5" strokeOpacity="0.8" />
        <line x1="400" y1="0" x2="0" y2="400" stroke="#991B1B" strokeWidth="1.5" strokeOpacity="0.8" />

        {/* Inner Diamond */}
        <line x1="200" y1="0" x2="400" y2="200" stroke="#991B1B" strokeWidth="1.5" strokeOpacity="0.8" />
        <line x1="400" y1="200" x2="200" y2="400" stroke="#991B1B" strokeWidth="1.5" strokeOpacity="0.8" />
        <line x1="200" y1="400" x2="0" y2="200" stroke="#991B1B" strokeWidth="1.5" strokeOpacity="0.8" />
        <line x1="0" y1="200" x2="200" y2="0" stroke="#991B1B" strokeWidth="1.5" strokeOpacity="0.8" />

        {/* House Labels and Planets */}
        {/* 1st House */}
        <HouseContent x={200} y={100} rasi={houseRasis[1]} planets={houses[1]} />
        {/* 2nd House */}
        <HouseContent x={100} y={50} rasi={houseRasis[2]} planets={houses[2]} />
        {/* 3rd House */}
        <HouseContent x={50} y={100} rasi={houseRasis[3]} planets={houses[3]} />
        {/* 4th House */}
        <HouseContent x={100} y={200} rasi={houseRasis[4]} planets={houses[4]} />
        {/* 5th House */}
        <HouseContent x={50} y={300} rasi={houseRasis[5]} planets={houses[5]} />
        {/* 6th House */}
        <HouseContent x={100} y={350} rasi={houseRasis[6]} planets={houses[6]} />
        {/* 7th House */}
        <HouseContent x={200} y={300} rasi={houseRasis[7]} planets={houses[7]} />
        {/* 8th House */}
        <HouseContent x={300} y={350} rasi={houseRasis[8]} planets={houses[8]} />
        {/* 9th House */}
        <HouseContent x={350} y={300} rasi={houseRasis[9]} planets={houses[9]} />
        {/* 10th House */}
        <HouseContent x={300} y={200} rasi={houseRasis[10]} planets={houses[10]} />
        {/* 11th House */}
        <HouseContent x={350} y={100} rasi={houseRasis[11]} planets={houses[11]} />
        {/* 12th House */}
        <HouseContent x={300} y={50} rasi={houseRasis[12]} planets={houses[12]} />
      </svg>
    </div>
  );
};

interface HouseContentProps {
  x: number;
  y: number;
  rasi: number;
  planets: Array<{ symbol: string, isRetrograde: boolean, degreeStr: string }>;
}

const HouseContent: FC<HouseContentProps> = ({ x, y, rasi, planets }) => {
  // Foreign object dimensions
  const foWidth = 140;
  const foHeight = 100;
  // Center foreign object around x,y
  const foX = x - foWidth / 2;
  const foY = y - foHeight / 2 + 5; // Slight offset so planets sit nicely relative to the rasi number

  return (
    <g>
      {/* Rasi Number (Small) */}
      <text
        x={x}
        y={y - 25}
        textAnchor="middle"
        className="fill-accent font-bold text-[12px]"
      >
        {rasi}
      </text>

      {/* Planets via foreignObject for flexible wrapping and layout */}
      <foreignObject x={foX} y={foY} width={foWidth} height={foHeight} style={{ overflow: 'visible' }}>
        <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 w-full h-full leading-none">
          {planets && planets.map((p, i) => {
            const colorClass = p.symbol === 'As' ? 'text-purple-600' : 'text-accent';
            return (
              <div key={i} className={`flex flex-col items-center ${colorClass}`}>
                <div className="font-medium text-[14px]">
                  {p.symbol}
                  {p.isRetrograde && <span>*</span>}
                </div>
                <div className="text-[9px] font-normal tracking-tighter opacity-80" style={{ marginTop: '1px' }}>
                  {p.degreeStr}
                </div>
              </div>
            );
          })}
        </div>
      </foreignObject>
    </g>
  );
};

const KundliChart = memo(KundliChartComponent);
KundliChart.displayName = 'KundliChart';

export default KundliChart;
