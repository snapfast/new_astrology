'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';

const TRANSLATIONS = {
  en: {
    title: "Something Went Wrong",
    subtitle: "Error",
    description: "We\'ve encountered an unexpected error.",
    tryAgain: "Try Again",
    backToHome: "Back to Home"
  }};

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = TRANSLATIONS.en;

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen bg-surface">
      <Navbar />
      <PageHeader
        title={t.title}
        subtitle={t.subtitle}
        description={t.description}
      >
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <button
            onClick={() => reset()}
            className="inline-flex items-center justify-center px-8 py-3 bg-primary text-white rounded-full font-medium text-sm tracking-widest uppercase transition-all hover:bg-primary/90 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 shadow-lg"
          >
            {t.tryAgain}
          </button>
          <Link
            href="/"
            className="btn-secondary inline-flex items-center justify-center px-8 py-3 font-medium text-sm tracking-widest uppercase shadow-sm"
          >
            {t.backToHome}
          </Link>
        </div>
      </PageHeader>
      <div className="flex-grow h-32 md:h-64" />
      <Footer />
    </main>
  );
}
