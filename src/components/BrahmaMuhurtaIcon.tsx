'use client';

import React from 'react';
import Image from 'next/image';

interface BrahmaMuhurtaIconProps {
  className?: string;
  width?: number;
  height?: number;
  alt?: string;
}

const BrahmaMuhurtaIcon: React.FC<BrahmaMuhurtaIconProps> = ({
  className = '',
  width = 24,
  height = 24,
  alt = 'Brahma Muhurta',
}) => {
  return (
    <Image
      src="/brahma-muhurta.gif"
      alt={alt}
      width={width}
      height={height}
      className={`inline-block object-contain ${className}`}
      unoptimized
    />
  );
};

export default BrahmaMuhurtaIcon;
