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
      <ChartGeneration />
      <CelestialForecasts />
      <ExpertConsultations />
      <VoicesOfInsight />
      <LatestInsights />
      <Footer />
    </main>
  );
}
