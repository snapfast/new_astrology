'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';
import { REVIEWS } from '@/lib/reviews';
import JsonLd from '@/components/JsonLd';
import StarRating from '@/components/StarRating';
import { useLanguage } from '@/context/LanguageContext';
import { sendGAEvent } from '@next/third-parties/google';
import ExploreTools from '@/components/ExploreTools';
import Script from 'next/script';

const TRANSLATIONS = {
  en: {
    title: "Bali Astrology Reviews",
    subtitle: "Testimonials",
    description: "Client reviews and experiences with Bali Astrology",
    googleReviews: "Google Reviews",
    writeReview: "Write a Review on Google",
    latestReviewsNote: "Please check our Google profile above for the latest reviews."
  }};

const GoogleIcon = () => (
  <svg className="w-3.5 h-3.5 md:w-4 md:h-4 shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1 .67-2.26 1.07-3.71 1.07-2.87 0-5.3-1.94-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.11c-.22-.67-.35-1.39-.35-2.11s.13-1.44.35-2.11V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.83z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.83c.86-2.59 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
  </svg>
);

export default function ReviewsClientPage() {
  const { lang } = useLanguage();
  const t = TRANSLATIONS.en;

  const reviewsSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Bali Astrology - Vedic Astrology Consultation",
    "description": "Professional Vedic Astrology consultations by Pandit Rahul Bali Ji.",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": REVIEWS.length.toString()
    },
    "review": REVIEWS.map(r => ({
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
      <JsonLd data={reviewsSchema} />
      <Navbar />
      <PageHeader
        title={t.title}
        subtitle={t.subtitle}
        description={t.description}
      >
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 w-full">
            <a
              href="https://maps.app.goo.gl/siGBPsmRpAU6mbYJ7"
              target="_blank"
              rel="noopener noreferrer"
              className={`btn-secondary inline-flex items-center justify-center gap-3 px-10 py-4 font-medium text-[10px] md:text-xs w-full md:w-auto font-label ${lang === 'en' ? 'tracking-[0.1em]' : ''}`}
            >
              <GoogleIcon />
              {t.googleReviews}
              <span className="material-symbols-outlined text-base">open_in_new</span>
            </a>
            <a
              href="https://g.page/r/CXBUAJqKmqoBEB0/review"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center justify-center gap-3 bg-on-surface text-surface px-10 py-4 rounded-full font-medium text-[10px] md:text-xs w-full md:w-auto font-label ${lang === 'en' ? 'tracking-[0.1em]' : ''}`}
            >
              {t.writeReview}
              <span className="material-symbols-outlined text-base">open_in_new</span>
            </a>
          </div>
      </PageHeader>

      <div className="pt-16 pb-16">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {REVIEWS.map((item) => (
            <div key={item.id} className="bg-white p-6 rounded-3xl border border-outline flex flex-col shadow-sm">
              <StarRating className="mb-4" starClassName="text-base" />
              <p className="text-sm text-on-surface mb-6 leading-relaxed font-body font-normal flex-grow">
                &quot;{item.review}&quot;
              </p>
              <div className="flex items-center gap-4 pt-6 border-t border-outline/20">
                <div className="w-10 h-10 rounded-full bg-white border border-outline/20 flex items-center justify-center text-accent font-semibold text-base uppercase">
                  {item.name[0]}
                </div>
                <div>
                  <h3 className="font-medium text-[12px] tracking-[0.05em] uppercase font-label text-on-surface">{item.name}</h3>
                  <p className="text-[10px] text-on-surface uppercase tracking-[0.1em] font-label">{item.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 pb-8 text-center">
        <p className="text-on-surface text-sm md:text-base font-body max-w-2xl mx-auto">
          {t.latestReviewsNote}
        </p>
      </div>


            <section className="max-w-7xl mx-auto px-8 pb-16 flex flex-col items-center">
        <h2 className="text-xl md:text-2xl font-headline text-on-surface mb-6 text-center">
          {lang === 'en' ? 'Featured on Threads' : 'थ्रेड्स पर देखें'}
        </h2>
        <div className="w-full flex flex-col md:flex-row items-center justify-center gap-6">
          <blockquote
            className="text-post-media"
            data-text-post-permalink="https://www.threads.com/@baliastrology/post/Dd2CG6YE1Qm"
            data-text-post-version="0"
            id="ig-tp-Dd2CG6YE1Qm"
            style={{
              background: '#FFF',
              borderWidth: '1px',
              borderStyle: 'solid',
              borderColor: '#00000026',
              borderRadius: '16px',
              maxWidth: '650px',
              margin: '1px',
              minWidth: '270px',
              padding: 0,
              width: '99.375%',
            }}
          >
            <a
              href="https://www.threads.com/@baliastrology/post/Dd2CG6YE1Qm"
              style={{
                background: '#FFFFFF',
                lineHeight: 0,
                padding: '0 0',
                textAlign: 'center',
                textDecoration: 'none',
                width: '100%',
                fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
              }}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div style={{ padding: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ display: 'block', height: '32px', width: '32px', paddingBottom: '20px' }}>
                  <svg aria-label="Threads" height="32px" role="img" viewBox="0 0 192 192" width="32px" xmlns="http://www.w3.org/2000/svg">
                    <path d="M141.537 88.9883C140.71 88.5919 139.87 88.2104 139.019 87.8451C137.537 60.5382 122.616 44.905 97.5619 44.745C97.4484 44.7443 97.3355 44.7443 97.222 44.7443C82.2364 44.7443 69.7731 51.1409 62.102 62.7807L75.881 72.2328C81.6116 63.5383 90.6052 61.6848 97.2286 61.6848C97.3051 61.6848 97.3819 61.6848 97.4576 61.6855C105.707 61.7381 111.932 64.1366 115.961 68.814C118.893 72.2193 120.854 76.925 121.825 82.8638C114.511 81.6207 106.601 81.2385 98.145 81.7233C74.3247 83.0954 59.0111 96.9879 60.0396 116.292C60.5615 126.084 65.4397 134.508 73.775 140.011C80.8224 144.663 89.899 146.938 99.3323 146.423C111.79 145.74 121.563 140.987 128.381 132.296C133.559 125.696 136.834 117.143 138.28 106.366C144.217 109.949 148.617 114.664 151.047 120.332C155.179 129.967 155.42 145.8 142.501 158.708C131.182 170.016 117.576 174.908 97.0135 175.059C74.2042 174.89 56.9538 167.575 45.7381 153.317C35.2355 139.966 29.8077 120.682 29.6052 96C29.8077 71.3178 35.2355 52.0336 45.7381 38.6827C56.9538 24.4249 74.2039 17.11 97.0132 16.9405C119.988 17.1113 137.539 24.4614 149.184 38.788C154.894 45.8136 159.199 54.6488 162.037 64.9503L178.184 60.6422C174.744 47.9622 169.331 37.0357 161.965 27.974C147.036 9.60668 125.202 0.195148 97.0695 0H96.9569C68.8816 0.19447 47.2921 9.6418 32.7883 28.0793C19.8819 44.4864 13.2244 67.3157 13.0007 95.9325L13 96L13.0007 96.0675C13.2244 124.684 19.8819 147.514 32.7883 163.921C47.2921 182.358 68.8816 191.806 96.9569 192H97.0695C122.03 191.827 139.624 185.292 154.118 170.811C173.081 151.866 172.51 128.119 166.26 113.541C161.776 103.087 153.227 94.5962 141.537 88.9883ZM98.4405 129.507C88.0005 130.095 77.1544 125.409 76.6196 115.372C76.2232 107.93 81.9158 99.626 99.0812 98.6368C101.047 98.5234 102.976 98.468 104.871 98.468C111.106 98.468 116.939 99.0737 122.242 100.233C120.264 124.935 108.662 128.946 98.4405 129.507Z" />
                  </svg>
                </div>
                <div style={{ fontSize: '15px', lineHeight: '21px', color: '#000000', fontWeight: 600 }}>
                  View on Threads
                </div>
              </div>
            </a>
          </blockquote>

          <blockquote
            className="text-post-media"
            data-text-post-permalink="https://www.threads.com/@baliastrology/post/DcweC7zEwwf"
            data-text-post-version="0"
            id="ig-tp-DcweC7zEwwf"
            style={{
              background: '#FFF',
              borderWidth: '1px',
              borderStyle: 'solid',
              borderColor: '#00000026',
              borderRadius: '16px',
              maxWidth: '650px',
              margin: '1px',
              minWidth: '270px',
              padding: 0,
              width: '99.375%',
            }}
          >
            <a
              href="https://www.threads.com/@baliastrology/post/DcweC7zEwwf"
              style={{
                background: '#FFFFFF',
                lineHeight: 0,
                padding: '0 0',
                textAlign: 'center',
                textDecoration: 'none',
                width: '100%',
                fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
              }}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div style={{ padding: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ display: 'block', height: '32px', width: '32px', paddingBottom: '20px' }}>
                  <svg aria-label="Threads" height="32px" role="img" viewBox="0 0 192 192" width="32px" xmlns="http://www.w3.org/2000/svg">
                    <path d="M141.537 88.9883C140.71 88.5919 139.87 88.2104 139.019 87.8451C137.537 60.5382 122.616 44.905 97.5619 44.745C97.4484 44.7443 97.3355 44.7443 97.222 44.7443C82.2364 44.7443 69.7731 51.1409 62.102 62.7807L75.881 72.2328C81.6116 63.5383 90.6052 61.6848 97.2286 61.6848C97.3051 61.6848 97.3819 61.6848 97.4576 61.6855C105.707 61.7381 111.932 64.1366 115.961 68.814C118.893 72.2193 120.854 76.925 121.825 82.8638C114.511 81.6207 106.601 81.2385 98.145 81.7233C74.3247 83.0954 59.0111 96.9879 60.0396 116.292C60.5615 126.084 65.4397 134.508 73.775 140.011C80.8224 144.663 89.899 146.938 99.3323 146.423C111.79 145.74 121.563 140.987 128.381 132.296C133.559 125.696 136.834 117.143 138.28 106.366C144.217 109.949 148.617 114.664 151.047 120.332C155.179 129.967 155.42 145.8 142.501 158.708C131.182 170.016 117.576 174.908 97.0135 175.059C74.2042 174.89 56.9538 167.575 45.7381 153.317C35.2355 139.966 29.8077 120.682 29.6052 96C29.8077 71.3178 35.2355 52.0336 45.7381 38.6827C56.9538 24.4249 74.2039 17.11 97.0132 16.9405C119.988 17.1113 137.539 24.4614 149.184 38.788C154.894 45.8136 159.199 54.6488 162.037 64.9503L178.184 60.6422C174.744 47.9622 169.331 37.0357 161.965 27.974C147.036 9.60668 125.202 0.195148 97.0695 0H96.9569C68.8816 0.19447 47.2921 9.6418 32.7883 28.0793C19.8819 44.4864 13.2244 67.3157 13.0007 95.9325L13 96L13.0007 96.0675C13.2244 124.684 19.8819 147.514 32.7883 163.921C47.2921 182.358 68.8816 191.806 96.9569 192H97.0695C122.03 191.827 139.624 185.292 154.118 170.811C173.081 151.866 172.51 128.119 166.26 113.541C161.776 103.087 153.227 94.5962 141.537 88.9883ZM98.4405 129.507C88.0005 130.095 77.1544 125.409 76.6196 115.372C76.2232 107.93 81.9158 99.626 99.0812 98.6368C101.047 98.5234 102.976 98.468 104.871 98.468C111.106 98.468 116.939 99.0737 122.242 100.233C120.264 124.935 108.662 128.946 98.4405 129.507Z" />
                  </svg>
                </div>
                <div style={{ fontSize: '15px', lineHeight: '21px', color: '#000000', fontWeight: 600 }}>
                  View on Threads
                </div>
              </div>
            </a>
          </blockquote>
        </div>
        <Script src="https://www.threads.com/embed.js" strategy="afterInteractive" />
      </section>

      <section className="max-w-7xl mx-auto px-8 pb-16">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3507.5973617160266!2d77.0661377!3d28.4615515!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1911f4ce53e1%3A0x1aa9a8a9a005470!2sRahul%20Bali%20Astrology!5e0!3m2!1sen!2sin!4v1781586655704!5m2!1sen!2sin"
          className="w-full h-[450px] rounded-3xl border border-outline shadow-sm"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Bali Astrology on Google Maps"
        />
      </section>

      {/* CTA Section to Reduce Bounce Rate */}
      <section className="py-16 bg-surface-bright relative overflow-hidden border-t border-outline/20">
        <div className="max-w-4xl mx-auto px-8 text-center relative z-10">
          <div className="bg-white border border-outline/20 rounded-3xl p-8 md:p-12 shadow-sm">
            <h2 className="text-2xl md:text-3xl font-normal mb-4 font-headline text-on-surface">
              {lang === 'en' ? "Experience the Guidance Yourself" : "स्वयं मार्गदर्शन का अनुभव करें"}
            </h2>
            <p className="text-sm md:text-base text-on-surface/90 font-body mb-8 leading-relaxed max-w-2xl mx-auto">
              {lang === 'en'
                ? "Join hundreds of satisfied clients. Get clarity on your career, relationships, wealth, and wellness with an in-depth Vedic consultation."
                : "संतुष्ट ग्राहकों में शामिल हों। गहन वैदिक परामर्श के साथ अपने करियर, रिश्तों, धन और कल्याण पर स्पष्टता प्राप्त करें।"}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  sendGAEvent({ event: 'action_click', action_name: 'reviews_page_book_now' });
                  window.dispatchEvent(new CustomEvent('openBookingModal'));
                }}
                className={`px-8 py-4 bg-accent text-white rounded-full font-medium text-[10px] md:text-xs font-label shadow-lg hover:shadow-xl active:scale-[0.98] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${lang === 'en' ? 'tracking-[0.1em]' : ''}`}
              >
                {lang === 'en' ? 'Book Personal Session' : 'परामर्श सत्र बुक करें'}
              </button>
            </div>
          </div>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border-[0.5px] border-outline/5 rounded-full -z-0"></div>
      </section>

      <ExploreTools currentPath="/reviews" className="mb-12" />

      <Footer />
    </main>
  );
}
