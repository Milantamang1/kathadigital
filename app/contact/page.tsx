import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Katha Digital for premium photography, cinematography, events, wedding films, and production inquiries.",
  openGraph: {
    title: "Contact - Katha Digital",
    description: "Have a wedding, event, brand film, or original production in mind? Let's talk.",
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
