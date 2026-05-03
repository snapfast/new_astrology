import React from 'react';
import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { REVIEWS } from '@/lib/reviews';
import { Review } from '@/lib/types';

export const metadata: Metadata = {
  title: "Client Reviews & Testimonials",
  description: "Read what our clients have to say about their experiences with Pandit Rahul Bali Ji's Vedic astrology readings and spiritual guidance.",
};

const GoogleIcon = () => (
  <svg className="w-3.5 h-3.5 md:w-4 md:h-4 shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1 .67-2.26 1.07-3.71 1.07-2.87 0-5.3-1.94-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.11c-.22-.67-.35-1.39-.35-2.11s.13-1.44.35-2.11V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.83z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.83c.86-2.59 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
  </svg>
);

const reviews: Review[] = [
  { id: 1, name: "Aditi", date: "Oct 28, 2025", review: "I wanted to share with someone trustworthy and fortunately got the answers I needed. Thank you for the guidance and advice. Can't thank you enough!" },
  { id: 2, name: "Ishwar Goswami", date: "Oct 25, 2025", review: "A very good experience with quick responses and clear guidance. Highly recommend." },
  { id: 3, name: "Saurav Thapa", date: "Sep 14, 2025", review: "Rahul sir provides skilled astrology with practical remedies. A wonderful experience; I highly suggest his consultation to everyone." },
  { id: 4, name: "Ansh", date: "Mar 16, 2025", review: "A wonderful session. Rahul-ji was patient, accurate, and took great care to explain everything clearly with considerate advice." },
  { id: 5, name: "Chaitanya", date: "Mar 08, 2025", review: "I was impressed with your reputation on Reddit and hence, took up the service. Very good!" },
  { id: 6, name: "Devansh", date: "Feb 12, 2025", review: "Gives accurate and to the point reading, no sugarcoating etc." },
  { id: 7, name: "Petra", date: "Feb 08, 2025", review: "Really good advice received! Much appreciated!" },
  { id: 8, name: "Luis", date: "Jan 26, 2025", review: "Wildly accurate. It felt like he lived my events. Very insightful and explained everything in depth." },
  { id: 9, name: "Vishnu", date: "Jan 20, 2025", review: "Very insightful and explained things to the depth. Gave remedies where needed." },
  { id: 10, name: "Sanaa", date: "Jan 17, 2025", review: "Rahul Bali Ji is empathetic and understanding. He provided an honest reading while patiently addressing all my concerns." },
  { id: 11, name: "Shweta", date: "Jan 16, 2025", review: "Very nice and patient, he is. Will solve all your queries, calmly. Pandit ji bohot sweet bhi hai :)" },
  { id: 12, name: "Sayan Bera", date: "Jan 14, 2025", review: "It felt nice talking to Rahul bhaiya. He cleared all the questions and doubts I had for my kundli with patience." },
  { id: 13, name: "Mahee", date: "Jan 03, 2025", review: "Very accurate information and he's a patient person explaining everything in depth." },
  { id: 14, name: "Gomathi", date: "Nov 11, 2024", review: "My first consultation, and I felt extremely comfortable. Grateful for clarity and cleared doubts. Thank you!" },
  { id: 15, name: "Dev", date: "Nov 09, 2024", review: "Had a really positive conversation. Told very practical remedies. Will consult again for a deeper discussion!" },
  { id: 16, name: "Pranav Lokhande", date: "Nov 08, 2024", review: "I liked the analysis, was hopeful." },
  { id: 17, name: "Nagamanikanta Manam", date: "Nov 08, 2024", review: "Very nice and optimistic." },
  { id: 18, name: "Sam", date: "Nov 08, 2024", review: "A detailed and insightful session. Helped me explore spirituality more. Thank you for the lovely session." },
  { id: 19, name: "Shrey Mishra", date: "Nov 08, 2024", review: "He cleared my doubts; a very helpful session. I would recommend him to others as well." },
  { id: 20, name: "Subramanian R", date: "Nov 08, 2024", review: "Detailed chart analysis with positive information and ways to overcome challenges. This reading helped me a lot." },
  { id: 21, name: "Priya", date: "Nov 08, 2024", review: "I appreciate how kind and patient Rahul was. I felt like he genuinely cared about helping with my challenges." },
  { id: 22, name: "Shekhar Sikka", date: "Nov 06, 2024", review: "What a prediction! He exactly told me about my past and then predicted the future accurately." },
  { id: 23, name: "Viyoni", date: "Oct 20, 2024", review: "Fantastic conversation about my chart. Learned a lot about kundli and remedies to reduce malefic effects." },
  { id: 24, name: "Chakri", date: "Oct 20, 2024", review: "It was great speaking with you; you put things in perspective and were spot on with your reading." },
  { id: 25, name: "Siddharth Rathee", date: "Oct 07, 2024", review: "Fun to talk to." },
  { id: 26, name: "Hersh Hemrajani", date: "Oct 02, 2024", review: "Detailed and fast responses regarding my general kundli reading. Fun to talk to." },
  { id: 27, name: "Shashank", date: "Sep 27, 2024", review: "The session was very informative and helpful." },
  { id: 28, name: "Suprava", date: "Sep 12, 2024", review: "The session was informative, providing logical advice mixed with spiritual guidance." },
  { id: 29, name: "Aaiyash-Barbaad", date: "Sep 07, 2024", review: "Felt like a breath of fresh air. Thanks for sharing your wisdom; you're doing a great job." },
  { id: 30, name: "Fantastic_Result_828", date: "Aug 27, 2024", review: "I liked the positive insights about my chart; it was refreshing and very kind. Thank you for your help!" },
];

export default function ReviewsPage() {
  return (
    <main className="min-h-screen bg-surface">
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
