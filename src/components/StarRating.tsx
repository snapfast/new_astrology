'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  className?: string;
  starClassName?: string;
}

const StarRating = ({ className, starClassName }: StarRatingProps) => {
  return (
    <div className={cn("flex items-center gap-0.5", className)}>
      {[...Array(5)].map((_, i) => (
        <span
          key={i}
          className={cn(
            "material-symbols-outlined font-variation-fill text-accent",
            starClassName
          )}
        >
          star
        </span>
      ))}
    </div>
  );
};

export default StarRating;
