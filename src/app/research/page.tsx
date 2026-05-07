import { Metadata } from 'next';
import ServicesPlaceholder from '@/components/ServicesPlaceholder';

export const metadata: Metadata = {
  title: "Astrological Research Appointment | Vedic Analytics",
  description: "Specialized research-based astrology appointments for complex cases, mundane astrology, and advanced predictive analysis with Pandit Rahul Bali Ji.",
  alternates: {
    canonical: "https://astro.rahulbali.in/research",
  },
};

export default function Page() { return <ServicesPlaceholder title="Research Appointment" />; }
