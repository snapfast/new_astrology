import { Metadata } from 'next';
import NavagrahaStotramClientPage from './NavagrahaStotramClientPage';
import JsonLd from '@/components/JsonLd';
import { generateWebPageSchema, getAlternates } from '@/lib/seo';

export const metadata: Metadata = {
  title: "Navagraha Stotram",
  description: "Complete Navagraha Stotram composed by Sage Veda Vyasa with original Sanskrit verses in Devanagari, English transliteration, word meaning, and planetary benefits.",
  keywords: [
    "Navagraha Stotram", "Navagraha Stotra", "Navgrah Stotra Sanskrit", "Veda Vyasa Navagraha",
    "Surya Stotram", "Chandra Stotram", "Mangal Stotram", "Budha Stotram", "Guru Stotram",
    "Shukra Stotram", "Shani Stotram", "Rahu Stotram", "Ketu Stotram", "Japa Kusuma Samkasam",
    "Navagraha Shanti", "Navagraha Mantra", "Vedic Astrology Remedies", "Bali Astrology"
  ],
  alternates: getAlternates("/navagraha-stotram"),
  openGraph: {
    title: "Navagraha Stotram | Bali Astrology",
    description: "Complete Navagraha Stotram composed by Sage Veda Vyasa with original Sanskrit verses in Devanagari, English transliteration, word meaning, and planetary benefits.",
    url: "https://baliastrology.com/navagraha-stotram",
    siteName: "Bali Astrology",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Navagraha Stotram - Bali Astrology",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Navagraha Stotram | Bali Astrology",
    description: "Complete Navagraha Stotram composed by Sage Veda Vyasa with original Sanskrit verses in Devanagari, English transliteration, word meaning, and planetary benefits.",
    images: ["/og-image.png"],
  },
};

export default function NavagrahaStotramPage() {
  const schema = generateWebPageSchema(
    "Navagraha Stotram",
    "Complete Navagraha Stotram composed by Sage Veda Vyasa with original Sanskrit verses in Devanagari, English transliteration, word meaning, and planetary benefits.",
    "https://baliastrology.com/navagraha-stotram"
  );

  return (
    <>
      <JsonLd data={schema} />
      <NavagrahaStotramClientPage />
    </>
  );
}
