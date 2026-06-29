import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero, Section } from "@/components/site/Section";
import { CheckCircle2, ArrowUpRight } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/book")({
  head: () => ({
    meta: [
      { title: "Book Katha Digital" },
      { name: "description", content: "Book Katha Digital for your wedding, event, brand, or production." },
      { property: "og:title", content: "Book Katha Digital" },
      { property: "og:description", content: "Share your details and our team will be in touch shortly." },
    ],
  }),
  component: BookPage,
});

const services = [
  "Wedding Photography",
  "Wedding Cinematography",
  "Event Coverage",
  "Product Photography",
  "Commercial Production",
  "Social Media Content",
  "Documentary",
  "Corporate Video",
];

const eventTypes = ["Wedding", "Pre-Wedding", "Engagement", "Corporate", "Pageant", "Concert", "Cultural", "Other"];

export function BookPage() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <Section className="min-h-[70vh] flex items-center">
        <div className="max-w-xl mx-auto text-center">
          <div className="size-20 rounded-full bg-gold/10 border border-gold/40 flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 className="size-10 text-gold" />
          </div>
          <h1 className="text-4xl md:text-5xl font-display">Thank you for your inquiry.</h1>
          <p className="text-muted-foreground mt-4 text-lg">Our team will contact you soon.</p>
          <button onClick={() => setSubmitted(false)} className="mt-8 inline-flex items-center gap-2 text-gold">
            Submit another <ArrowUpRight className="size-4" />
          </button>
        </div>
      </Section>
    );
  }

  return (
    <>
      <PageHero
        eyebrow="Booking"
        title={<>Book <em className="italic text-gold">Katha Digital</em>.</>}
        subtitle="Ready to book Katha Digital for your wedding, event, brand, or production? Share your details and our team will contact you shortly."
      />

      <Section>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
            toast.success("Booking inquiry received!");
          }}
          className="max-w-3xl mx-auto p-8 md:p-12 rounded-3xl border border-border bg-card space-y-6"
        >
          <div className="grid sm:grid-cols-2 gap-5">
            <F label="Full Name" name="name" required />
            <F label="Phone Number" name="phone" type="tel" required />
          </div>
          <F label="Email Address" name="email" type="email" required />

          <div className="grid sm:grid-cols-2 gap-5">
            <F label="Event Type" name="eventType" select options={eventTypes} required />
            <F label="Event Date" name="eventDate" type="date" required />
          </div>

          <F label="Event Location" name="location" required />

          <div className="grid sm:grid-cols-2 gap-5">
            <F label="Service Required" name="service" select options={services} required />
            <F label="Estimated Budget" name="budget" placeholder="NPR 50,000 - 200,000" />
          </div>

          <F label="Message / Details" name="message" textarea />

          <button
            type="submit"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gold text-primary-foreground font-medium hover:shadow-gold transition-all"
          >
            Submit Inquiry <ArrowUpRight className="size-4" />
          </button>
        </form>
      </Section>
    </>
  );
}

function F({
  label,
  name,
  type = "text",
  textarea,
  required,
  select,
  options = [],
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  textarea?: boolean;
  required?: boolean;
  select?: boolean;
  options?: string[];
  placeholder?: string;
}) {
  const cls = "w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-gold outline-none text-sm transition-colors";
  return (
    <label className="block">
      <span className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">{label}{required && " *"}</span>
      {textarea ? (
        <textarea name={name} required={required} rows={5} className={cls} placeholder={placeholder} />
      ) : select ? (
        <select name={name} required={required} className={cls} defaultValue="">
          <option value="" disabled>Select...</option>
          {options.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      ) : (
        <input name={name} type={type} required={required} className={cls} placeholder={placeholder} />
      )}
    </label>
  );
}
