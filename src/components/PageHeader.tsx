import React from 'react';

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
  return (
    <section className={`pt-32 pb-12 md:pt-44 md:pb-20 bg-background relative overflow-hidden border-b border-outline/10 ${centered ? 'text-center' : ''}`}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-[radial-gradient(circle,rgba(255,174,66,0.05)_0%,transparent_70%)] rounded-full -z-0"></div>

      <div className="max-w-7xl mx-auto px-8 relative z-10">
        {subtitle && (
          <span className="text-[10px] font-bold text-accent uppercase tracking-[0.3em] font-label block mb-4">
            {subtitle}
          </span>
        )}

        <h1 className="text-4xl md:text-6xl font-normal font-headline text-on-surface mb-6 tracking-tight leading-tight">
          {title}
        </h1>

        {description && (
          <p className={`text-lg font-body text-on-surface leading-relaxed max-w-2xl ${centered ? 'mx-auto' : ''}`}>
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
