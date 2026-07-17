"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  Youtube,
} from "lucide-react";
import { toast } from "sonner";
import { PageHero, Section } from "@/components/site/Section";

const contactItems = [
  { icon: MapPin, label: "Office", value: "Madhyapur Thimi, Bhaktapur, Nepal" },
  { icon: Phone, label: "Phone", value: "+977 9861078220" },
  { icon: MessageCircle, label: "WhatsApp", value: "+977 9861078220" },
  { icon: Mail, label: "Email", value: "hello@kathadigital.com" },
] as const;

const contactImage = "/katha-media/event-grand-finale.jpeg";
const mapSrc =
  "https://www.google.com/maps?q=Katha%20Digital%4027.6628191,85.3932101&z=17&output=embed";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Have a project in mind? <em className="italic text-gold">Let's talk.</em>
          </>
        }
        subtitle="Tell us what you are planning, what matters most, and when you need it delivered. We will help shape the right visual approach."
        className="pb-10 md:pb-14"
      />

      <Section className="relative overflow-hidden py-14 md:py-20">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_8%,oklch(0.80_0.13_82/0.10),transparent_30%),linear-gradient(180deg,oklch(0.13_0.01_60/0.35),transparent_45%)]" />

        <div className="grid gap-8 lg:grid-cols-12 lg:items-start lg:gap-12">
          <div className="space-y-5 lg:col-span-5">
            <div className="mb-7">
              <div className="eyebrow mb-3">Start a conversation</div>
              <h2 className="font-display text-3xl font-light leading-tight md:text-4xl">
                Share the story, date, place, and feeling you want to preserve.
              </h2>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">
                Whether it is a wedding, event, commercial, or original production, a clear brief
                helps us recommend the right crew, timeline, and deliverables.
              </p>
            </div>

            {contactItems.map((item) => (
              <div
                key={item.label}
                className="flex items-start gap-4 rounded-2xl border border-border/65 bg-card/55 p-4 shadow-[0_18px_60px_-44px_oklch(0_0_0/0.82)] ring-1 ring-white/5 backdrop-blur-sm transition-all duration-300 hover:border-gold/35 hover:bg-card/70 md:p-5"
              >
                <div className="flex size-11 shrink-0 items-center justify-center rounded-full border border-gold/30 bg-gold/10 shadow-[inset_0_1px_0_oklch(1_0_0/0.05)]">
                  <item.icon className="size-5 text-gold" />
                </div>
                <div>
                  <div className="eyebrow mb-1">{item.label}</div>
                  <div className="font-display text-lg leading-snug text-foreground/92">
                    {item.value}
                  </div>
                </div>
              </div>
            ))}

            <div className="rounded-2xl border border-border/65 bg-card/55 p-4 shadow-[0_18px_60px_-44px_oklch(0_0_0/0.82)] ring-1 ring-white/5 backdrop-blur-sm md:p-5">
              <div className="eyebrow mb-4">Follow</div>
              <div className="flex gap-3">
                {[Instagram, Youtube, Facebook].map((Icon, index) => (
                  <a
                    key={index}
                    href="#"
                    className="flex size-11 items-center justify-center rounded-full border border-border/70 bg-background/30 text-foreground/58 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/55 hover:bg-gold/10 hover:text-gold"
                  >
                    <Icon className="size-4" />
                  </a>
                ))}
              </div>
            </div>

            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-border/65 bg-[radial-gradient(circle_at_50%_30%,oklch(0.18_0.04_250),oklch(0.06_0.02_60)_70%)] shadow-[0_26px_90px_-52px_oklch(0_0_0/0.9)] ring-1 ring-white/5 sm:aspect-[5/4] lg:aspect-[4/5]">
              <Image
                src={contactImage}
                alt="Katha Digital event coverage"
                loading="lazy"
                decoding="async"
                width={1200}
                height={1600}
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="h-full w-full object-cover object-[50%_28%] saturate-[1.06] contrast-[1.03] transition-transform duration-700 hover:scale-[1.025]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/74 via-ink/5 to-transparent" />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/5" />
              <div className="absolute bottom-5 left-5 right-5">
                <div className="text-xs uppercase tracking-widest text-gold">Booking support</div>
                <p className="mt-1 max-w-sm text-sm leading-6 text-white/85">
                  Share the date, location, and mood. We will help shape the right coverage plan.
                </p>
              </div>
            </div>
          </div>

          <form
            onSubmit={async (event) => {
              event.preventDefault();
              setSending(true);

              const form = event.currentTarget;
              const formData = new FormData(form);
              const payload = Object.fromEntries(formData.entries());

              try {
                const response = await fetch("/api/contact", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(payload),
                });
                const result = (await response.json().catch(() => null)) as { ok?: boolean } | null;

                if (!response.ok || !result?.ok) {
                  throw new Error("Unable to send message.");
                }

                form.reset();
                setSent(true);
                toast.success("Message sent successfully!");
              } catch {
                toast.error("Unable to send message. Please try again.");
              } finally {
                setSending(false);
              }
            }}
            className="space-y-5 rounded-[2rem] border border-border/65 bg-gradient-to-b from-card/78 to-card/56 p-6 shadow-[0_30px_95px_-54px_oklch(0_0_0/0.88)] ring-1 ring-white/5 backdrop-blur-sm md:p-8 lg:col-span-7 lg:p-10"
          >
            <div>
              <div className="eyebrow mb-2">Inquiry form</div>
              <h3 className="font-display text-3xl font-light">Tell us about the project.</h3>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Name" name="name" required />
              <Field label="Phone" name="phone" type="tel" />
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Email" name="email" type="email" required />
              <Field label="Subject" name="subject" required />
            </div>
            <Field label="Message" name="message" textarea required />
            <button
              type="submit"
              disabled={sending}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-7 py-4 font-semibold text-primary-foreground shadow-gold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_50px_-16px_oklch(0.78_0.13_80/0.8)] sm:w-fit"
            >
              {sending ? (
                "Sending..."
              ) : sent ? (
                <>
                  Send Message <Send className="size-4" />
                </>
              ) : (
                <>
                  Send Message <Send className="size-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </Section>

      <Section className="pt-0 pb-14 md:pb-20">
        <div className="relative overflow-hidden rounded-[2rem] border border-border/65 bg-card shadow-[0_28px_88px_-54px_oklch(0_0_0/0.85)] ring-1 ring-white/5">
          <iframe
            src={mapSrc}
            title="Katha Digital location map"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-[20rem] w-full border-0 grayscale-[0.15] contrast-[1.04] md:h-[26rem]"
            allowFullScreen
          />
          <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/5" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/45 to-transparent" />
        </div>
      </Section>
    </>
  );
}

function Field({
  label,
  name,
  type = "text",
  textarea,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  textarea?: boolean;
  required?: boolean;
}) {
  const className =
    "w-full rounded-2xl border border-border/70 bg-background/50 px-4 py-3 text-sm outline-none shadow-[inset_0_1px_0_oklch(1_0_0/0.04)] transition-colors focus:border-gold/70";

  return (
    <label className="block">
      <span className="mb-2 block text-xs uppercase tracking-widest text-muted-foreground">
        {label}
        {required && " *"}
      </span>
      {textarea ? (
        <textarea name={name} required={required} rows={5} className={className} />
      ) : (
        <input name={name} type={type} required={required} className={className} />
      )}
    </label>
  );
}
