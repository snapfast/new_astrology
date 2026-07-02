'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';
import { useLanguage } from '@/context/LanguageContext';

const TRANSLATIONS = {
  en: {
    title: "Page Not Found",
    subtitle: "404 Error",
    description: "The cosmic path you're looking for doesn't seem to exist. Let's get you back on track.",
    backToHome: "Back to Home"
  },
  hi: {
    title: "पृष्ठ नहीं मिला",
    subtitle: "404 त्रुटि",
    description: "आप जिस ब्रह्मांडीय पथ की तलाश कर रहे हैं वह मौजूद नहीं लगता। आइए आपको वापस ट्रैक पर लाते हैं।",
    backToHome: "होम पर वापस जाएं"
  }
};

export default function NotFound() {
  const { lang } = useLanguage();
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

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
