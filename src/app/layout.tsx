/* eslint-disable @next/next/google-font-preconnect */
import type { Metadata } from "next";
import { Akshar } from "next/font/google";
import { GoogleAnalytics } from '@next/third-parties/google'
import JsonLd from "@/components/JsonLd";
import BackToTop from "@/components/BackToTop";
import Breadcrumbs from "@/components/Breadcrumbs";
import { LanguageProvider } from "@/context/LanguageContext";
import "./globals.css";

const akshar = Akshar({
  subsets: ["latin", "devanagari"],
  variable: "--font-akshar",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://astro.rahulbali.in"),
  title: {
    default: "Rahul Bali Astrology",
    template: "%s | Rahul Bali Astrology",
  },
  description: "Vedic Astrology guidance by Rahul Bali. Get horoscopes, birth chart readings, and consultations.",
  keywords: ["Vedic Astrology", "Horoscope", "Birth Chart", "Spiritual Consultation", "Pandit Rahul Bali", "Astrology Readings", "Kundli", "Jyotish"],
  authors: [{ name: "Pandit Rahul Bali" }],
  creator: "Pandit Rahul Bali",
  publisher: "Rahul Bali Astrology",
  alternates: {
    canonical: "https://astro.rahulbali.in",
    languages: {
      "en-US": "https://astro.rahulbali.in",
    },
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Rahul Bali Astrology",
    description: "Vedic Astrology guidance by Rahul Bali. Get horoscopes, birth chart readings, and consultations.",
    url: "https://astro.rahulbali.in",
    siteName: "Rahul Bali Astrology",
    images: [
      {
        url: "/og-image.png", // Assuming an OG image will be provided or exists
        width: 1200,
        height: 630,
        alt: "Rahul Bali Astrology",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rahul Bali Astrology",
    description: "Vedic Astrology guidance by Rahul Bali. Get horoscopes, birth chart readings, and consultations.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const nonce = "";

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Speed Optimizations: Preconnect & DNS Prefetch to establish early connections */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link rel="dns-prefetch" href="https://cdnjs.cloudflare.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />

        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
          nonce={nonce}
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
          nonce={nonce}
        />
      </head>
      <body
        className={`${akshar.variable} bg-surface text-on-surface font-body selection:bg-primary-fixed selection:text-on-primary-fixed antialiased`}
      >
        <LanguageProvider>
          <JsonLd
            nonce={nonce}
            data={{
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Pandit Rahul Bali",
              "url": "https://astro.rahulbali.in",
              "image": "https://astro.rahulbali.in/og-image.png",
              "sameAs": [
                "https://www.instagram.com/RahulBaliAstro",
                "https://www.youtube.com/@RahulBaliAstrology",
                "https://www.linkedin.com/in/rahulbaliastrology/",
                "https://www.threads.net/@rahulbaliastro"
              ],
              "jobTitle": "Vedic Astrologer",
              "worksFor": {
                "@type": "Organization",
                "name": "Rahul Bali Astrology"
              },
              "description": "Pandit Rahul Bali Ji is a renowned expert in Vedic Astrology, providing personalized horoscopes and spiritual consultations."
            }}
          />
          <Breadcrumbs />
          {children}
          <BackToTop />
        </LanguageProvider>
      </body>
      {process.env.NODE_ENV === 'production' && <GoogleAnalytics gaId="G-CXNZQJTRVS" nonce={nonce} />}
    </html>
  );
}
