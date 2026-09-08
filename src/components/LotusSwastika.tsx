import { FC, SVGProps } from 'react';

const LotusSwastika: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g fill="currentColor">
      <defs>
        {/* Arm goes UP from center, then RIGHT with flared end */}
        <path id="swastika-arm" d="
          M 45,55
          L 45,25
          L 65,25
          L 80,10
          L 95,10
          L 95,20
          L 80,35
          L 55,35
          L 55,55 Z" />
      </defs>

      {/* 4 Rotated Arms */}
      <use href="#swastika-arm" />
      <use href="#swastika-arm" transform="rotate(90 50 50)" />
      <use href="#swastika-arm" transform="rotate(180 50 50)" />
      <use href="#swastika-arm" transform="rotate(270 50 50)" />

      {/* 4 Central Dots */}
      <circle cx="67" cy="33" r="4.5" />
      <circle cx="67" cy="67" r="4.5" />
      <circle cx="33" cy="67" r="4.5" />
      <circle cx="33" cy="33" r="4.5" />
    </g>
  </svg>
);

export default LotusSwastika;
