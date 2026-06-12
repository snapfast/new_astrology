import { memo } from 'react';

interface ExpertConsultationsProps {
  showTitle?: boolean;
}

const CONSULTATION_GUIDELINES = [
  {
    id: "booking-process",
    title: "Booking Process",
    description: "Consultations can be booked in advance to ensure dedicated time. Please use our contact channels to schedule your appointment."
  },
  {
    id: "required-details",
    title: "Required Details",
    description: "For an accurate reading, please provide your exact date, time, and place of birth at the time of booking."
  },
  {
    id: "prepare-questions",
    title: "Prepare Your Questions",
    description: "Take some time to note down your most pressing questions or areas of life you wish to focus on during the session."
  },
  {
    id: "open-mindset",
    title: "Open Mindset",
    description: "Approach the consultation with an open mind. Astrology provides guidance and clarity, empowering you to make informed decisions."
  }
];

const ExpertConsultationsComponent = ({ showTitle = true }: ExpertConsultationsProps) => {
  return (
    <section className={`${showTitle ? 'py-16' : 'pb-16'} bg-white`}>
      <div className="max-w-5xl mx-auto px-8">
        {showTitle && (
          <div className="text-center mb-16">
            <span className="text-[10px] font-medium tracking-[0.3em] uppercase text-accent mb-4 block font-label">Preparation</span>
            <h2 className="text-5xl font-normal mb-6 font-headline text-on-surface">Consultation Guide</h2>
            <p className="text-on-surface max-w-2xl mx-auto text-base font-body leading-relaxed">How to prepare and what to expect during your Vedic astrology session.</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-16">
          {CONSULTATION_GUIDELINES.map((item) => (
            <div key={item.id} className="space-y-4">
              <h3 className="text-xl font-normal font-headline text-on-surface tracking-tight flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                {item.title}
              </h3>
              <p className="text-sm font-body text-on-surface leading-relaxed pl-4.5 border-l border-outline/30">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ExpertConsultations = memo(ExpertConsultationsComponent);
ExpertConsultations.displayName = 'ExpertConsultations';

export default ExpertConsultations;
