'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';

const TRANSLATIONS = {
  en: {
    title: "Page Not Found",
    subtitle: "Not Found",
    description: "The page you are looking for does not exist.",
    backToHome: "Back to Home"
  }};

export default function NotFound() {
  const t = TRANSLATIONS.en;

  return (
    <main className="min-h-screen bg-surface">
      <Navbar />
      <PageHeader
        title={t.title}
        subtitle={t.subtitle}
        description={t.description}
      >
        <Link
          href="/"
          className="inline-flex items-center justify-center px-8 py-3 bg-primary text-white rounded-full font-medium text-sm tracking-widest uppercase transition-all hover:bg-primary/90 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 shadow-lg"
        >
          {t.backToHome}
        </Link>
      </PageHeader>
      <div className="flex-grow h-32 md:h-64" />
      <Footer />
    </main>
  );
}
