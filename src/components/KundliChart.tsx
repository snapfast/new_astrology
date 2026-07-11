import { FC, memo } from 'react';
import { DivisionalChartData } from '@/lib/astrology';

interface KundliChartProps {
  data: DivisionalChartData;
}

interface HouseConfig {
  rasiX: number;
  rasiY: number;
  rasiAnchor: 'start' | 'end' | 'middle';
  pX: number;
  pY: number;
  pWidth: number;
  pHeight: number;
  orientation: 'horizontal' | 'vertical' | 'diamond';
}

const HOUSE_CONFIGS: Record<number, HouseConfig> = {
  1: {
    rasiX: 200,
    rasiY: 175,
    rasiAnchor: 'middle',
    pX: 125,
    pY: 50,
    pWidth: 150,
    pHeight: 70,
    orientation: 'diamond'
  },
  2: {
    rasiX: 115,
    rasiY: 90,
    rasiAnchor: 'start',
    pX: 45,
    pY: 15,
    pWidth: 110,
    pHeight: 50,
    orientation: 'horizontal'
  },
  3: {
    rasiX: 90,
    rasiY: 115,
    rasiAnchor: 'end',
    pX: 10,
    pY: 55,
    pWidth: 55,
    pHeight: 90,
    orientation: 'vertical'
  },
  4: {
    rasiX: 175,
    rasiY: 204,
    rasiAnchor: 'end',
    pX: 25,
    pY: 165,
    pWidth: 120,
    pHeight: 70,
    orientation: 'diamond'
  },
  5: {
    rasiX: 85,
    rasiY: 295,
    rasiAnchor: 'end',
    pX: 10,
    pY: 255,
    pWidth: 55,
    pHeight: 90,
    orientation: 'vertical'
  },
  6: {
    rasiX: 110,
    rasiY: 330,
    rasiAnchor: 'start',
    pX: 45,
    pY: 335,
    pWidth: 110,
    pHeight: 50,
    orientation: 'horizontal'
  },
  7: {
    rasiX: 200,
    rasiY: 228,
    rasiAnchor: 'middle',
    pX: 125,
    pY: 280,
    pWidth: 150,
    pHeight: 70,
    orientation: 'diamond'
  },
  8: {
    rasiX: 285,
    rasiY: 310,
    rasiAnchor: 'end',
    pX: 245,
    pY: 335,
    pWidth: 110,
    pHeight: 50,
    orientation: 'horizontal'
  },
  9: {
    rasiX: 310,
    rasiY: 285,
    rasiAnchor: 'start',
    pX: 335,
    pY: 255,
    pWidth: 55,
    pHeight: 90,
    orientation: 'vertical'
  },
  10: {
    rasiX: 225,
    rasiY: 204,
    rasiAnchor: 'start',
    pX: 255,
    pY: 165,
    pWidth: 120,
    pHeight: 70,
    orientation: 'diamond'
  },
  11: {
    rasiX: 315,
    rasiY: 110,
    rasiAnchor: 'start',
    pX: 335,
    pY: 55,
    pWidth: 55,
    pHeight: 90,
    orientation: 'vertical'
  },
  12: {
    rasiX: 285,
    rasiY: 70,
    rasiAnchor: 'end',
    pX: 245,
    pY: 15,
    pWidth: 110,
    pHeight: 50,
    orientation: 'horizontal'
  }
};

function trimDegree(degStr: string | undefined): string {
  if (!degStr) return '';
  const match = degStr.match(/(\d+°\s*\d+')[^\w]*/);
  if (match) {
    return match[1];
  }
  return degStr;
}

const KundliChartComponent: FC<KundliChartProps> = ({ data }) => {
  if (!data || !data.houses) return null;
  const { houses, houseRasis } = data;

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
        {Array.from({ length: 12 }, (_, i) => i + 1).map((houseNum) => (
          <HouseContent
            key={houseNum}
            houseNum={houseNum}
            rasi={houseRasis[houseNum]}
            planets={houses[houseNum]}
          />
        ))}
      </svg>
    </div>
  );
};

interface HouseContentProps {
  houseNum: number;
  rasi: number;
  planets: Array<{ symbol: string, isRetrograde: boolean, degree?: string }>;
}

const HouseContent: FC<HouseContentProps> = ({ houseNum, rasi, planets }) => {
  const config = HOUSE_CONFIGS[houseNum];
  if (!config) return null;

  // Choose the dynamic container layout class
  let containerClassName = "w-fit mx-auto h-full font-medium text-[14px] ";
  if (config.orientation === 'diamond') {
    if (planets?.length >= 3) {
      containerClassName += "grid grid-cols-3 gap-x-1 gap-y-0.5 place-items-center place-content-center leading-none";
    } else {
      containerClassName += "flex flex-row justify-center items-start gap-1";
    }
  } else if (config.orientation === 'horizontal') {
    if (planets?.length >= 3) {
      containerClassName += "grid grid-cols-2 gap-x-1 gap-y-0.5 place-items-center place-content-center leading-none";
    } else {
      containerClassName += "flex flex-row justify-center items-start gap-1";
    }
  } else {
    // vertical
    if (planets?.length >= 3) {
      containerClassName += "grid grid-cols-2 gap-x-1 gap-y-0.5 place-items-center place-content-center leading-none";
    } else {
      containerClassName += "flex flex-col justify-center items-center gap-0.5";
    }
  }

  return (
    <g>
      {/* Rasi Number (Small, tucked in the inner corner) */}
      <text
        x={config.rasiX}
        y={config.rasiY}
        textAnchor={config.rasiAnchor}
        className="fill-accent font-bold text-[12px] select-none"
      >
        {rasi}
      </text>

      {/* Planets (Positioned in the wider region of the house) */}
      <foreignObject
        x={config.pX}
        y={config.pY}
        width={config.pWidth}
        height={config.pHeight}
        className="overflow-visible"
      >
        <div className={containerClassName}>
          {(planets || []).map((p, i) => {
            const color = p.symbol === 'As' ? '#9333EA' : '#991B1B';
            return (
              <div key={i} className="flex flex-col items-center">
                <div style={{ color }}>
                  {p.symbol}
                  {p.isRetrograde && '*'}
                </div>
                {p.degree && (
                  <div className="text-[7px] text-on-surface whitespace-nowrap" style={{ lineHeight: '1' }}>
                    {trimDegree(p.degree)}
                  </div>
                )}
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
