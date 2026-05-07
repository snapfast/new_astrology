import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { REVIEWS } from '@/lib/reviews';

export const metadata: Metadata = {
  title: "Client Reviews & Testimonials | Trusted Astrologer Rahul Bali",
  description: "Read authentic testimonials from clients worldwide who have found clarity and guidance through Pandit Rahul Bali Ji's Vedic astrology consultations.",
  alternates: {
    canonical: "https://astro.rahulbali.in/reviews",
  },
};

const GoogleIcon = () => (
  <svg className="w-3.5 h-3.5 md:w-4 md:h-4 shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1 .67-2.26 1.07-3.71 1.07-2.87 0-5.3-1.94-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.11c-.22-.67-.35-1.39-.35-2.11s.13-1.44.35-2.11V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.83z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.83c.86-2.59 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
  </svg>
);

export default function ReviewsPage() {
  const reviewsSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Vedic Astrology Consultation",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": REVIEWS.length.toString()
    },
    "review": REVIEWS.slice(0, 10).map(r => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": r.name
      },
      "datePublished": r.date,
      "reviewBody": r.review,
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5"
      }
    }))
  };

  return (
    <main className="min-h-screen bg-surface">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(reviewsSchema)
            .replace(/</g, "\\u003c")
            .replace(/>/g, "\\u003e")
            .replace(/\u2028/g, "\\u2028")
            .replace(/\u2029/g, "\\u2029"),
        }}
      />
      <Navbar />
      <div className="pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-8 mb-16 text-center">
          <h1 className="text-5xl font-normal mb-8 font-headline text-on-surface tracking-tight">Client Reviews</h1>
          <p className="text-lg font-body text-secondary leading-relaxed">
            Hear from those who have found clarity and guidance through Astrology consultations with Pandit Rahul Bali Ji.
          </p>
          <div className="mt-10 flex flex-col md:flex-row items-center justify-center gap-4">
            <a
              href="https://g.page/r/CXBUAJqKmqoBEB0/review"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-on-surface text-surface px-10 py-4 rounded-full font-medium text-[10px] md:text-xs tracking-[0.1em] uppercase"
            >
              Write a Review on Google
              <span className="material-symbols-outlined text-base">open_in_new</span>
            </a>
            <a
              href="https://maps.app.goo.gl/siGBPsmRpAU6mbYJ7"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-transparent text-on-surface border border-outline/60 px-10 py-4 rounded-full font-medium text-[10px] md:text-xs tracking-[0.1em] uppercase"
            >
              <GoogleIcon />
              Google Reviews
              <span className="material-symbols-outlined text-base">open_in_new</span>
            </a>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {REVIEWS.map((item) => (
            <div key={item.id} className="bg-white p-6 rounded-[2.5rem] border border-outline/50 flex flex-col shadow-sm">
              <p className="text-sm text-on-surface mb-6 italic leading-relaxed font-body font-light flex-grow">
                &quot;{item.review}&quot;
              </p>
              <div className="flex items-center gap-4 pt-6 border-t border-outline/30">
                <div className="w-10 h-10 rounded-full bg-surface-container-low border border-outline/50 flex items-center justify-center text-accent font-semibold text-base uppercase">
                  {item.name[0]}
                </div>
                <div>
                  <h5 className="font-medium text-[11px] tracking-[0.05em] uppercase font-label text-on-surface">{item.name}</h5>
                  <p className="text-[10px] text-secondary/60 uppercase tracking-[0.1em] font-label">{item.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
      <Footer />
    </main>
  );
}
