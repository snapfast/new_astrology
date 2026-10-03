'use client';

import React from 'react';
import Image from 'next/image';

interface YamagandaIconProps {
  className?: string;
  width?: number;
  height?: number;
  alt?: string;
}

const YamagandaIcon: React.FC<YamagandaIconProps> = ({
  className = '',
  width = 24,
  height = 24,
  alt = 'Yamaganda Kaal',
}) => {
  return (
    <Image
      src="/yamaganda.gif"
      alt={alt}
      width={width}
      height={height}
      className={`inline-block object-contain ${className}`}
      unoptimized
    />
  );
};

export default YamagandaIcon;
