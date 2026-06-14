import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
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
    <section className={`pt-32 pb-12 md:pt-44 md:pb-20 bg-background relative overflow-hidden border-b border-outline/10 ${centered ? 'text-center' : ''}`}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-[radial-gradient(circle,rgba(255,174,66,0.05)_0%,transparent_70%)] rounded-full -z-0"></div>

      <div className="max-w-7xl mx-auto px-8 relative z-10">
        {subtitle && (
          <span className={`font-bold text-accent uppercase font-label block mb-4 transition-all ${
            lang === 'hi'
              ? 'text-xs md:text-sm tracking-normal'
              : 'text-[10px] tracking-[0.3em]'
          }`}>
            {subtitle}
          </span>
        )}

        <h1 className={`font-normal font-headline text-on-surface mb-6 tracking-tight leading-tight transition-all ${
          lang === 'hi'
            ? 'text-3xl md:text-5xl lg:text-6xl'
            : 'text-4xl md:text-6xl'
        }`}>
          {title}
        </h1>

        {description && (
          <p className={`font-body text-on-surface leading-relaxed max-w-2xl transition-all ${
            centered ? 'mx-auto' : ''
          } ${lang === 'hi' ? 'text-xl' : 'text-lg'}`}>
            {description}
          </p>
        )}

        {children && (
          <div className={`mt-8 ${centered ? 'flex flex-col md:flex-row items-center justify-center gap-4' : ''}`}>
            {children}
          </div>
        )}
      </div>
    </section>
  );
};

export default PageHeader;
