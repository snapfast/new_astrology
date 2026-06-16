import { Metadata } from 'next';
import ContactContent from './ContactContent';

export const metadata: Metadata = {
  title: "Contact | Rahul Bali Astrology",
  description: "Get in touch with Pandit Rahul Bali Ji for Vedic astrology consultations in Gurugram or online.",
};

export default function ContactPage() {
  return <ContactContent />;
}
