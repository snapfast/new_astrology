'use client';
import { ReactNode } from 'react';

interface Props {
  href: string;
  onClick?: () => void;
  className?: string;
  children: ReactNode;
}

export default function ScheduleButton({ href, onClick, className, children }: Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      className={`inline-block ${className || ''}`}
    >
      {children}
    </a>
  );
}
