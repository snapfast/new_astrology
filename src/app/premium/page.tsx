import { Metadata } from 'next';
import ServicesPlaceholder from '@/components/ServicesPlaceholder';

export const metadata: Metadata = {
  title: "Premium Astrology Appointment | Exclusive Vedic Guidance",
  description: "Experience exclusive, in-depth astrological analysis with our Premium Appointment service. Priority scheduling and comprehensive life path mapping by Pandit Rahul Bali Ji.",
  alternates: {
    canonical: "https://astro.rahulbali.in/premium",
  },
};

export default function Page() { return <ServicesPlaceholder title="Premium Appointment" />; }
