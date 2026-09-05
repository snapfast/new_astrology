import { FC, SVGProps } from 'react';

const LotusSwastika: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g fill="currentColor">
      {/* 8-Petal Lotus Outline */}
      <path d="M 50,0
               C 56,12 60,18 64,20
               C 72,16 80,12 85,15
               C 82,23 80,30 80,36
               C 84,40 92,44 100,50
               C 92,56 84,60 80,64
               C 80,70 82,77 85,85
               C 80,88 72,84 64,80
               C 60,82 56,88 50,100
               C 44,88 40,82 36,80
               C 28,84 20,88 15,85
               C 18,77 20,70 20,64
               C 16,60 8,56 0,50
               C 8,44 16,40 20,36
               C 20,30 18,23 15,15
               C 20,12 28,16 36,20
               C 40,18 44,12 50,0 Z" />

      {/* White Cut Out to create the inner frame */}
      <path d="M 50,16
               C 53,19 56,23 62,23
               C 66,23 71,28 73,32
               C 77,32 77,38 77,38
               C 77,38 81,46 84,50
               C 81,54 77,62 77,62
               C 77,62 77,68 73,68
               C 71,72 66,77 62,77
               C 56,77 53,81 50,84
               C 47,81 44,77 38,77
               C 34,77 29,72 27,68
               C 23,68 23,62 23,62
               C 23,62 19,54 16,50
               C 19,46 23,38 23,38
               C 23,38 23,32 27,32
               C 29,28 34,23 38,23
               C 44,23 47,19 50,16 Z" fill="white" />

      {/* Dots */}
      <circle cx="50" cy="19.5" r="4.5" />
      <circle cx="80.5" cy="50" r="4.5" />
      <circle cx="50" cy="80.5" r="4.5" />
      <circle cx="19.5" cy="50" r="4.5" />

      {/* Right facing swastika */}
      <path d="M 45,45 v -17 h 22 v 10 h -12 v 7 z" />
      <path d="M 55,45 h 17 v 22 h -10 v -12 h -7 z" />
      <path d="M 55,55 v 17 h -22 v -10 h 12 v -7 z" />
      <path d="M 45,55 h -17 v -22 h 10 v 12 h 7 z" />
      <rect x="45" y="45" width="10" height="10" />
    </g>
  </svg>
);

export default LotusSwastika;
