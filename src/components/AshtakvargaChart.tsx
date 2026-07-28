import { FC, memo } from 'react';

interface AshtakvargaChartProps {
  ashtakvarga: number[]; // array of 12 numbers representing SAV points for Rasis 0-11 (Aries=0)
  houseRasis: { [key: number]: number }; // record mapping house number (1-12) to Rasi number (1-12)
}

interface HouseConfig {
  rasiX: number;
  rasiY: number;
  rasiAnchor: 'start' | 'end' | 'middle';
  pX: number;
  pY: number;
  pWidth: number;
  pHeight: number;
}

const HOUSE_CONFIGS: Record<number, HouseConfig> = {
  1: { rasiX: 200, rasiY: 180, rasiAnchor: 'middle', pX: 150, pY: 65, pWidth: 100, pHeight: 40 },
  2: { rasiX: 100, rasiY: 82, rasiAnchor: 'middle', pX: 70, pY: 25, pWidth: 60, pHeight: 40 },
  3: { rasiX: 82, rasiY: 104, rasiAnchor: 'middle', pX: 20, pY: 65, pWidth: 60, pHeight: 40 },
  4: { rasiX: 180, rasiY: 204, rasiAnchor: 'end', pX: 55, pY: 175, pWidth: 80, pHeight: 40 },
  5: { rasiX: 82, rasiY: 304, rasiAnchor: 'middle', pX: 20, pY: 265, pWidth: 60, pHeight: 40 },
  6: { rasiX: 100, rasiY: 322, rasiAnchor: 'middle', pX: 70, pY: 315, pWidth: 60, pHeight: 40 },
  7: { rasiX: 200, rasiY: 220, rasiAnchor: 'middle', pX: 150, pY: 295, pWidth: 100, pHeight: 40 },
  8: { rasiX: 300, rasiY: 322, rasiAnchor: 'middle', pX: 270, pY: 315, pWidth: 60, pHeight: 40 },
  9: { rasiX: 318, rasiY: 304, rasiAnchor: 'middle', pX: 320, pY: 265, pWidth: 60, pHeight: 40 },
  10: { rasiX: 220, rasiY: 204, rasiAnchor: 'start', pX: 265, pY: 175, pWidth: 80, pHeight: 40 },
  11: { rasiX: 318, rasiY: 104, rasiAnchor: 'middle', pX: 320, pY: 65, pWidth: 60, pHeight: 40 },
  12: { rasiX: 300, rasiY: 82, rasiAnchor: 'middle', pX: 270, pY: 25, pWidth: 60, pHeight: 40 }
};

const AshtakvargaChartComponent: FC<AshtakvargaChartProps> = ({ ashtakvarga, houseRasis }) => {
  if (!ashtakvarga || ashtakvarga.length === 0 || !houseRasis) return null;

  return (
    <div className="w-full aspect-square max-w-[400px] mx-auto relative p-4">
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

        {/* House Labels and SAV Points */}
        {Array.from({ length: 12 }, (_, i) => i + 1).map((houseNum) => {
          const rasi = houseRasis[houseNum];
          const config = HOUSE_CONFIGS[houseNum];
          if (!config || rasi === undefined) return null;

          // SAV array is 0-indexed for Rasis (Aries=0, so rasi - 1)
          const points = ashtakvarga[rasi - 1] || 0;

          // Determine class based on SAV points count for a professional/helpful look
          let pointsColorClass = "text-on-surface font-extrabold";
          if (points >= 30) {
            pointsColorClass = "text-primary font-black"; // Highly auspicious points (30+)
          } else if (points < 25) {
            pointsColorClass = "text-accent font-semibold"; // Lower points
          }

          return (
            <g key={houseNum}>
              {/* Rasi Number (Small, tucked in the inner corner) */}
              <text
                x={config.rasiX}
                y={config.rasiY}
                textAnchor={config.rasiAnchor}
                className="fill-accent font-bold text-[12px] select-none"
              >
                {rasi}
              </text>

              {/* SAV points/bindus centered in the house */}
              <foreignObject
                x={config.pX}
                y={config.pY}
                width={config.pWidth}
                height={config.pHeight}
                className="overflow-visible"
              >
                <div className="w-full h-full flex items-center justify-center">
                  <div className={`text-2xl font-headline tracking-tighter ${pointsColorClass}`}>
                    {points}
                  </div>
                </div>
              </foreignObject>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

const AshtakvargaChart = memo(AshtakvargaChartComponent);
AshtakvargaChart.displayName = 'AshtakvargaChart';

export default AshtakvargaChart;
