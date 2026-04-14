import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Consultation from '@/components/Consultation';
import MysticalArts from '@/components/MysticalArts';
import Resources from '@/components/Resources';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Consultation />
      <MysticalArts />
      <Resources />
      <Testimonials />
      <Footer />
    </main>
  );
}
