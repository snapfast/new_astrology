import { Metadata } from 'next';
import ServicesPlaceholder from '@/components/ServicesPlaceholder';

export const metadata: Metadata = {
  title: "Personal Astrology Consultation | Pandit Rahul Bali Ji",
  description: "Book a personalized Vedic astrology consultation with Pandit Rahul Bali Ji. Get deep insights into your birth chart, career, health, and relationships.",
  alternates: {
    canonical: "https://astro.rahulbali.in/consultation",
  },
};

export default function Page() { return <ServicesPlaceholder title="Consultation" />; }
