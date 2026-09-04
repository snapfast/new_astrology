'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import JsonLd from './JsonLd';
import { generateBreadcrumbSchema } from '@/lib/seo';

const Breadcrumbs = () => {
  const pathname = usePathname();

  // Do not render on the home page
  if (pathname === '/') return null;

  const pathSegments = pathname.split('/').filter(Boolean);

  const breadcrumbItems = pathSegments.map((segment, index) => {
    const url = `/${pathSegments.slice(0, index + 1).join('/')}`;
    const title = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
    return { name: title, item: `https://astro.rahulbali.in${url}` };
  });

  const schemaItems = [
    { name: 'Home', item: 'https://astro.rahulbali.in' },
    ...breadcrumbItems
  ];

  const schema = generateBreadcrumbSchema(schemaItems);

  return (
    <>
      <JsonLd data={schema} />
      <nav aria-label="Breadcrumb" className="w-full bg-surface text-sm py-3 border-b border-outline/20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <ol className="flex items-center space-x-2 text-on-surface/70">
            <li>
              <Link href="/" className="hover:text-primary transition-colors flex items-center">
                <span className="material-symbols-outlined text-[18px]">home</span>
                <span className="sr-only">Home</span>
              </Link>
            </li>
            {breadcrumbItems.map((item, index) => {
              const isLast = index === breadcrumbItems.length - 1;
              return (
                <li key={item.item} className="flex items-center space-x-2">
                  <span className="material-symbols-outlined text-[16px] text-on-surface/40">chevron_right</span>
                  {isLast ? (
                    <span className="text-on-surface font-medium truncate max-w-[150px] md:max-w-none" aria-current="page">
                      {item.name}
                    </span>
                  ) : (
                    <Link href={item.item.replace('https://astro.rahulbali.in', '')} className="hover:text-primary transition-colors truncate max-w-[150px] md:max-w-none">
                      {item.name}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </nav>
    </>
  );
};

export default Breadcrumbs;
