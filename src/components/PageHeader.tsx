'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  description?: string | React.ReactNode;
  children?: React.ReactNode;
  centered?: boolean;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  description,
  children,
  centered = true,
}) => {
  const { lang } = useLanguage();

  return (
    <section className={`pt-20 pb-6 md:pt-28 md:pb-8 bg-background relative overflow-hidden border-b border-outline/20 ${centered ? 'text-center' : ''}`}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[300px] bg-[radial-gradient(circle,rgba(255,174,66,0.05)_0%,transparent_70%)] rounded-full -z-0"></div>

      <div className="max-w-7xl mx-auto px-8 relative z-10">
        {subtitle && (
          <span className={`font-bold text-accent uppercase font-label block mb-2 transition-all ${
            lang === 'hi'
              ? 'text-xs md:text-sm tracking-normal'
              : 'text-[10px] tracking-[0.3em]'
          }`}>
            {subtitle}
          </span>
        )}

        <h1 className={`font-normal font-headline text-on-surface mb-3 tracking-tight leading-tight transition-all ${
          lang === 'hi'
            ? 'text-2xl md:text-4xl lg:text-5xl'
            : 'text-3xl md:text-5xl'
        }`}>
          {title}
        </h1>

        {description && (
          <div className={`font-body text-on-surface leading-relaxed max-w-2xl transition-all ${
            centered ? 'mx-auto' : ''
          } ${lang === 'hi' ? 'text-lg' : 'text-base'}`}>
            {description}
          </div>
        )}

        {children && (
          <div className={`mt-4 ${centered ? 'flex flex-col md:flex-row items-center justify-center gap-4' : ''}`}>
            {children}
          </div>
        )}
      </div>
    </section>
  );
};

export default PageHeader;
