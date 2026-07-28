import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import JsonLd from "@/components/JsonLd";
import BackToTop from "@/components/BackToTop";
import { LanguageProvider } from "@/context/LanguageContext";
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
  title: "Rahul Bali Astrology | ।। ॐ नमो भगवते वासुदेवाय नम: ।।",
  description: "Jyotish guidance of Pandit Rahul Bali Ji, providing personalized horoscopes, astrology readings, and spiritual consultations. Align with fortune and truth.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const nonce = "";
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${inter.variable} ${lora.variable} bg-surface text-on-surface font-body selection:bg-primary-fixed selection:text-on-primary-fixed antialiased`}
      >
        {children}
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
              "description": "Pandit Rahul Bali Ji is a renowned expert in Vedic Astrology based in Gurugram, India, providing personalized horoscopes and spiritual consultations."
            }}
          />
          {children}
          <BackToTop />
        </LanguageProvider>
      </body>
    </html>
  );
}
