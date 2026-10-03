'use client';

import React from 'react';
import Image from 'next/image';

interface RahuIconProps {
  className?: string;
  width?: number;
  height?: number;
  alt?: string;
}

const RahuIcon: React.FC<RahuIconProps> = ({
  className = '',
  width = 24,
  height = 24,
  alt = 'Rahu Kaal',
}) => {
  return (
    <Image
      src="/rahu.gif"
      alt={alt}
      width={width}
      height={height}
      className={`inline-block object-contain ${className}`}
      unoptimized
    />
  );
};

export default RahuIcon;
