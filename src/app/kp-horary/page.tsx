import { Metadata } from 'next';
import KPHoraryClientPage from './KPHoraryClientPage';

export const metadata: Metadata = {
  title: "KP Prashna Kundli",
  description: "Cast a KP Prashna chart online using a Horary number from 1 to 249.",
  alternates: {
    canonical: "https://astro.rahulbali.in/kp-horary",
  }
};

export default function KPHoraryPage() {
  return <KPHoraryClientPage />;
}