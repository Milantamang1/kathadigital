import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { PageHero, Section } from "@/components/site/Section";
import { CTA } from "@/components/site/CTA";
import { services } from "@/lib/site-data";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services - Katha Digital" },
      { name: "description", content: "Photography, cinematography, commercial production, and more by Katha Digital." },
      { property: "og:title", content: "Services - Katha Digital" },
      { property: "og:description", content: "Eight disciplines, one creative team." },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title={<>Crafted for <em className="italic text-gold">every story</em>.</>}
        subtitle="From intimate portraits to multi-camera productions, one focused creative team for the full journey."
        className="pb-10 md:pb-14"
      />

      <Section className="relative overflow-hidden py-12 md:py-16">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_8%,oklch(0.80_0.13_82/0.10),transparent_30%),linear-gradient(180deg,oklch(0.13_0.01_60/0.35),transparent_42%)]" />
        <div className="mb-8 grid gap-5 border-y border-border py-5 md:grid-cols-3">
          {[
            "Story-first planning",
            "Professional production crew",
            "Edited for web, social, and archive",
          ].map((item) => (
            <div key={item} className="flex items-center gap-3 text-sm text-muted-foreground">
              <CheckCircle2 className="size-4 shrink-0 text-gold" />
              <span>{item}</span>
            </div>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {services.map((service, index) => (
            <article
              key={service.slug}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card/85 shadow-cinematic transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/45"
            >
              <div className="grid md:grid-cols-[0.9fr_1.1fr]">
                <div className="aspect-[16/10] overflow-hidden md:aspect-auto">
                  <img
                    src={service.image}
                    alt={service.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex min-h-[230px] flex-col justify-between p-6 md:p-7">
                  <div>
                    <div className="mb-3 text-xs uppercase tracking-[0.22em] text-gold">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <h3 className="mb-2 font-display text-2xl leading-tight">{service.title}</h3>
                    <p className="text-sm leading-6 text-muted-foreground">{service.short}</p>
                  </div>
                  <Link
                    to="/book"
                    className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-gold transition-all group-hover:gap-3"
                  >
                    Inquire Now <ArrowUpRight className="size-4" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <CTA
        className="py-12 md:py-16"
        panelClassName="p-7 md:p-12"
        title="Tell us what you have in mind."
        subtitle="We'll respond within 24 hours with a custom plan."
        buttonText="Start an Inquiry"
      />
    </>
  );
}
