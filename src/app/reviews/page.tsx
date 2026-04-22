import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const reviews = [
  { id: 1, name: "Aditi", date: "Oct 28, 2025", review: "There were so many things going on in life. I wanted to share with someone trustworthy fortunately I got answers today, I hope this person helps others too... thank youuu so much for answering about everything and advising me. Can't thank you enough!!!" },
  { id: 2, name: "Ishwar Goswami", date: "Oct 25, 2025", review: "Panditji provided a very good experience. The response was quick, the guidance was clear, and everything went smoothly. Highly recommend." },
  { id: 3, name: "Saurav Thapa", date: "Sep 14, 2025", review: "The consultation is really nice. I have taken consultation multiple times and each time i was really down in my life. Rahul sir provides astrology+practical life remedies for the client. He is really skilled in astrology and he is a really good person too. I would suggest everyone to take his consultation." },
  { id: 4, name: "Ansh", date: "Mar 16, 2025", review: "It was a wonderful session. Rahul-ji took immense care to make me understand what I was going through. Rahul-ji was patient, accurate in his readings, most considerate while giving suggestions & advice, extremely compassionate & professional while interacting with me throughout the session." },
  { id: 5, name: "Chaitanya", date: "Mar 08, 2025", review: "I was impressed with your reputation on Reddit and hence, took up the service. Very good!" },
  { id: 6, name: "Devansh", date: "Feb 12, 2025", review: "Gives accurate and to the point reading, no sugarcoating etc." },
  { id: 7, name: "Petra", date: "Feb 08, 2025", review: "Really good advice received! Much appreciated!" },
  { id: 8, name: "Luis", date: "Jan 26, 2025", review: "He's so accurate it's wild. It felt like he knew me and lived my events." },
  { id: 9, name: "Vishnu", date: "Jan 20, 2025", review: "Very insightful and explained things to the depth. Gave remedies where needed." },
  { id: 10, name: "Sanaa", date: "Jan 17, 2025", review: "I consulted Rahul Bali Ji for a birth chart reading, and I was pleasantly surprised by how empathetic and understanding he was. He provided an honest reading while patiently listening to my concerns." },
  { id: 11, name: "Shweta", date: "Jan 16, 2025", review: "Very nice and patient, he is. Will solve all your queries, calmly. Pandit ji bohot sweet bhi hai :)" },
  { id: 12, name: "Sayan Bera", date: "Jan 14, 2025", review: "It felt nice talking to Rahul bhaiya. He cleared all the questions and doubts I had for my kundli with patience." },
  { id: 13, name: "Mahee", date: "Jan 03, 2025", review: "Very accurate information and he's a patient person explaining everything in depth." },
  { id: 14, name: "Gomathi", date: "Nov 11, 2024", review: "My first time consulting an astrologer, and you made me feel extremely comfortable. I am extremely grateful that I got to consult you and got my doubts cleared. Thank you so much!" },
  { id: 15, name: "Dev", date: "Nov 09, 2024", review: "Had a really positive conversation with. Told very practical remedies. Will consult again for a deeper discussion next time 🙏🏻" },
  { id: 16, name: "Pranav Lokhande", date: "Nov 08, 2024", review: "I liked the analysis, was hopeful." },
  { id: 17, name: "Nagamanikanta Manam", date: "Nov 08, 2024", review: "Very nice and optimistic." },
  { id: 18, name: "Sam", date: "Nov 08, 2024", review: "It was a very detailed and insightful session that we had. Got to understand a lot about myself and helped me explore spirituality more. Thank you for the lovely session." },
  { id: 19, name: "Shrey Mishra", date: "Nov 08, 2024", review: "He cleared my doubts and was a very helpful and nice session, would recommend him to others as well." },
  { id: 20, name: "Subramanian R", date: "Nov 08, 2024", review: "I got a detailed analysis of my chart in the 30 mins time slot. He gave me a lot of positive information and also gave me ways to overcome my challenges. This reading helped me a lot." },
  { id: 21, name: "Priya", date: "Nov 08, 2024", review: "I really appreciate how kind and patient Rahul was during the session. I felt like he genuinely cared about helping with my current challenges." },
  { id: 22, name: "Shekhar Sikka", date: "Nov 06, 2024", review: "What a prediction! He exactly told me about my past and then predicted the future. Any donation is just penny for his predictions." },
  { id: 23, name: "Viyoni", date: "Oct 20, 2024", review: "Had a fantastic conversation about my chart, learned a lot from him not only about the kundli but also about remedies to reduce the effects of malefics." },
  { id: 24, name: "Chakri", date: "Oct 20, 2024", review: "It was great speaking with you and you put many things in perspective. It really helped me understand myself better and were pretty much spot on with your reading." },
  { id: 25, name: "Siddharth Rathee", date: "Oct 07, 2024", review: "Fun to talk to." },
  { id: 26, name: "Hersh Hemrajani", date: "Oct 02, 2024", review: "Gives very detailed and fast responses regarding my general kundli reading. Fun to talk to." },
  { id: 27, name: "Shashank", date: "Sep 27, 2024", review: "The session was very informative and helpful." },
  { id: 28, name: "Suprava", date: "Sep 12, 2024", review: "The session was informative and you provided me with logical advice mixed with spiritual guidance." },
  { id: 29, name: "Aaiyash-Barbaad", date: "Sep 07, 2024", review: "It felt good interacting with you. You're doing a great job, felt like a breath of fresh air. Thanks for sharing your wisdom." },
  { id: 30, name: "Fantastic_Result_828", date: "Aug 27, 2024", review: "I liked the way you pointed out positive things about my chart, I'm used to hearing pretty negative things so that was refreshing and very kind of you. Thank you so much for your help!" },
];

export default function ReviewsPage() {
  return (
    <main className="min-h-screen bg-surface">
      <Navbar />
      <div className="pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-8 mb-16 text-center">
          <h1 className="text-5xl font-normal mb-8 font-headline text-on-surface tracking-tight">Client Reviews</h1>
          <p className="text-lg font-body text-secondary leading-relaxed">
            Hear from those who have found clarity and guidance through Jyotishi consultations with Pandit Rahul Bali Ji.
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((item) => (
            <div key={item.id} className="bg-white p-8 rounded-[2.5rem] border border-outline/50 flex flex-col shadow-sm">
              <div className="flex items-center gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="material-symbols-outlined text-accent text-lg" style={{ fontVariationSettings: "'FILL' 1, 'wght' 400" }}>star</span>
                ))}
              </div>
              <p className="text-base text-on-surface mb-8 italic leading-relaxed font-body font-light flex-grow">
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

        <div className="mt-20 text-center">
          <a
            href="https://g.page/r/CXBUAJqKmqoBEB0/review"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-on-surface text-surface px-10 py-4 rounded-full font-medium text-sm tracking-wider transition-all hover:opacity-90"
          >
            Write a Review on Google
            <span className="material-symbols-outlined text-base">open_in_new</span>
          </a>
        </div>
      </div>
      <Footer />
    </main>
  );
}
