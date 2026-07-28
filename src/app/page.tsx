import { Suspense } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ChartGeneration from '@/components/ChartGeneration';
import CelestialForecasts from '@/components/CelestialForecasts';
import ExpertConsultations from '@/components/ExpertConsultations';
import VoicesOfInsight from '@/components/VoicesOfInsight';
import LatestInsights from '@/components/LatestInsights';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Suspense fallback={<div className="py-20 text-center">Loading Chart Generator...</div>}>
        <ChartGeneration />
      </Suspense>
      <CelestialForecasts />
      <ExpertConsultations />
      <VoicesOfInsight />
      <LatestInsights />
      <Footer />
    </main>
  );
}
