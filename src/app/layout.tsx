import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import { GoogleAnalytics } from '@next/third-parties/google'
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rahulbaliastrology.com"),
  title: {
    default: "Rahul Bali Astrology | Vedic Astrology & Spiritual Guidance",
    template: "%s | Rahul Bali Astrology",
  },
  description: "Expert Vedic Astrology guidance by Pandit Rahul Bali Ji. Get personalized horoscopes, birth chart readings, and spiritual consultations to align with your true purpose.",
  keywords: ["Vedic Astrology", "Horoscope", "Birth Chart", "Spiritual Consultation", "Pandit Rahul Bali", "Astrology Readings", "Kundli", "Jyotish"],
  authors: [{ name: "Pandit Rahul Bali" }],
  creator: "Pandit Rahul Bali",
  publisher: "Rahul Bali Astrology",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Rahul Bali Astrology | Vedic Astrology & Spiritual Guidance",
    description: "Expert Vedic Astrology guidance by Pandit Rahul Bali Ji. Get personalized horoscopes, birth chart readings, and spiritual consultations.",
    url: "https://rahulbaliastrology.com",
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
    title: "Rahul Bali Astrology | Vedic Astrology & Spiritual Guidance",
    description: "Expert Vedic Astrology guidance by Pandit Rahul Bali Ji. Get personalized horoscopes, birth chart readings, and spiritual consultations.",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${inter.variable} ${lora.variable} bg-surface text-on-surface font-body selection:bg-primary-fixed selection:text-on-primary-fixed antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Pandit Rahul Bali",
              "url": "https://rahulbaliastrology.com",
              "image": "https://rahulbaliastrology.com/og-image.png",
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
              "description": "Pandit Rahul Bali Ji is a renowned expert in Vedic Astrology based in Gurugram, India, providing personalized horoscopes and spiritual consultations."
            })
          }}
        />
        {children}
      </body>
      <GoogleAnalytics gaId="G-CXNZQJTRVS" />
    </html>
  );
}
