'use client';

import React from 'react';
import Image from 'next/image';

interface DeepamIconProps {
  className?: string;
  width?: number;
  height?: number;
  alt?: string;
}

const DeepamIcon: React.FC<DeepamIconProps> = ({
  className = '',
  width = 24,
  height = 24,
  alt = 'Deepam',
}) => {
  return (
    <Image
      src="/deepam.gif"
      alt={alt}
      width={width}
      height={height}
      className={`inline-block object-contain ${className}`}
      unoptimized
    />
  );
};

export default DeepamIcon;
