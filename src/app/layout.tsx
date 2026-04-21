import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
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
  description: "Jyotishi guidance of Pandit Rahul Bali Ji, providing personalized horoscopes, astrology readings, and spiritual consultations. Align with fortune and truth.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
      </body>
    </html>
  );
}
