import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ChartGeneration from '@/components/ChartGeneration';
import ExpertConsultations from '@/components/ExpertConsultations';
import Testimonials from '@/components/Testimonials';
import LatestInsights from '@/components/LatestInsights';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Testimonials />
      <ChartGeneration />
      <ExpertConsultations />
      <LatestInsights />
      <Footer />
    </main>
  );
}
