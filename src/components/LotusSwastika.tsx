import { FC, SVGProps } from 'react';

const LotusSwastika: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g fill="currentColor">
      {/* Right facing swastika */}
      <path d="M 45,45 v -40 h 40 v 10 h -30 v 30 z" />
      <path d="M 55,45 h 40 v 40 h -10 v -30 h -30 z" />
      <path d="M 55,55 v 40 h -40 v -10 h 30 v -30 z" />
      <path d="M 45,55 h -40 v -40 h 10 v 30 h 30 z" />
      <rect x="45" y="45" width="10" height="10" />

      {/* 4 Central Dots */}
      <circle cx="70" cy="30" r="5" />
      <circle cx="70" cy="70" r="5" />
      <circle cx="30" cy="70" r="5" />
      <circle cx="30" cy="30" r="5" />
    </g>
  </svg>
);

export default LotusSwastika;
