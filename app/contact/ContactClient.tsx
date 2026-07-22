"use client";

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
import type { SiteSettingsValue } from "@/lib/cms/settings";

export default function ContactPage({ settings }: { settings: SiteSettingsValue }) {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const contactItems = [
    { icon: MapPin, label: "Office", value: settings.office },
    { icon: Phone, label: "Phone", value: settings.phone },
    { icon: MessageCircle, label: "WhatsApp", value: settings.whatsapp },
    { icon: Mail, label: "Email", value: settings.email },
  ] as const;

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
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_4%,oklch(0.80_0.13_82/0.13),transparent_34%),radial-gradient(circle_at_84%_20%,oklch(0.28_0.018_80/0.32),transparent_36%),linear-gradient(180deg,oklch(0.11_0.009_70/0.92),oklch(0.075_0.006_70/0.82)_56%,transparent)]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px gold-line" />

        <div className="grid gap-8 lg:grid-cols-12 lg:items-start lg:gap-10 xl:gap-14">
          <div className="space-y-4 lg:col-span-5">
            <div className="mb-8 border-l border-gold/45 pl-5">
              <div className="eyebrow mb-3">Start a conversation</div>
              <h2 className="text-balance font-display text-3xl font-light leading-tight text-foreground md:text-4xl">
                Share the story, date, place, and feeling you want to preserve.
              </h2>
              <p className="mt-4 text-sm leading-6 text-muted-foreground md:max-w-xl">
                Whether it is a wedding, event, commercial, or original production, a clear brief
                helps us recommend the right crew, timeline, and deliverables.
              </p>
            </div>

            {contactItems.map((item) => (
              <div
                key={item.label}
                className="group flex items-start gap-4 rounded-2xl border border-white/10 bg-[linear-gradient(145deg,oklch(1_0_0/0.055),transparent_38%),oklch(0.135_0.012_70/0.82)] p-4 shadow-[0_22px_74px_-48px_oklch(0_0_0/0.92)] ring-1 ring-white/5 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/45 hover:bg-card/70 md:p-5"
              >
                <div className="flex size-11 shrink-0 items-center justify-center rounded-full border border-gold/35 bg-gold/10 shadow-[0_12px_36px_-24px_oklch(0.8_0.13_82/0.8),inset_0_1px_0_oklch(1_0_0/0.08)] transition-colors duration-300 group-hover:border-gold/60 group-hover:bg-gold/15">
                  <item.icon className="size-5 text-gold transition-transform duration-300 group-hover:scale-110" />
                </div>
                <div>
                  <div className="eyebrow mb-1">{item.label}</div>
                  <div className="font-display text-lg leading-snug text-foreground/92">
                    {item.value}
                  </div>
                </div>
              </div>
            ))}

            <div className="rounded-2xl border border-white/10 bg-[linear-gradient(145deg,oklch(1_0_0/0.055),transparent_42%),oklch(0.135_0.012_70/0.82)] p-4 shadow-[0_22px_74px_-48px_oklch(0_0_0/0.92)] ring-1 ring-white/5 backdrop-blur-md md:p-5">
              <div className="eyebrow mb-4">Follow</div>
              <div className="flex gap-3">
                {[Instagram, Youtube, Facebook].map((Icon, index) => (
                  <a
                    key={index}
                    href={
                      [settings.instagramUrl, settings.youtubeUrl, settings.facebookUrl][index] ||
                      "#"
                    }
                    className="flex size-11 items-center justify-center rounded-full border border-white/10 bg-background/55 text-foreground/58 shadow-[inset_0_1px_0_oklch(1_0_0/0.05)] transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/55 hover:bg-gold/10 hover:text-gold hover:shadow-gold"
                  >
                    <Icon className="size-4" />
                  </a>
                ))}
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
            className="premium-panel relative overflow-hidden rounded-[2rem] p-6 md:p-8 lg:col-span-7 lg:p-10"
          >
            <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-gold/55 to-transparent" />
            <div>
              <div className="eyebrow mb-2">Inquiry form</div>
              <h3 className="font-display text-3xl font-light leading-tight text-foreground">
                Tell us about the project.
              </h3>
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
              className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full border border-gold/70 bg-gold px-7 py-4 font-semibold text-primary-foreground shadow-gold transition-all duration-300 hover:-translate-y-0.5 hover:border-gold hover:shadow-[0_18px_50px_-16px_oklch(0.78_0.13_80/0.8)] disabled:cursor-wait disabled:opacity-70 sm:w-fit"
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
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-card shadow-[0_28px_88px_-54px_oklch(0_0_0/0.85)] ring-1 ring-white/5">
          <iframe
            src={settings.mapSrc}
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
    "w-full rounded-2xl border border-white/10 bg-background/60 px-4 py-3 text-sm text-foreground outline-none shadow-[inset_0_1px_0_oklch(1_0_0/0.05)] transition-all duration-300 placeholder:text-muted-foreground/60 hover:border-gold/30 focus:border-gold/70 focus:bg-background/75 focus:shadow-[0_0_0_4px_oklch(0.8_0.13_82/0.08),inset_0_1px_0_oklch(1_0_0/0.06)]";

  return (
    <label className="block">
      <span className="mb-2 block text-xs uppercase tracking-widest text-muted-foreground transition-colors">
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
