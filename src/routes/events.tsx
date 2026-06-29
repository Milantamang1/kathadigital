import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Calendar, MapPin, Play } from "lucide-react";
import { CTA } from "@/components/site/CTA";
import { PageHero, Section, SectionHeader } from "@/components/site/Section";
import { YouTubeEmbed } from "@/components/site/YouTubeEmbed";
import { events } from "@/lib/site-data";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Events - Katha Digital" },
      { name: "description", content: "Upcoming and completed event coverage by Katha Digital." },
      { property: "og:title", content: "Events - Katha Digital" },
      { property: "og:description", content: "Upcoming and completed event coverage." },
    ],
  }),
  component: EventsPage,
});

type EventItem = { name: string; date: string; location: string; desc: string; image: string };

function EventCard({ event }: { event: EventItem }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-border bg-card/85 shadow-cinematic transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/45">
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={event.image}
          alt={event.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
      </div>
      <div className="p-5 md:p-6">
        <h3 className="font-display text-2xl leading-tight">{event.name}</h3>
        <div className="mt-3 grid gap-2 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="size-3.5 text-gold" /> {event.date}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="size-3.5 text-gold" /> {event.location}
          </span>
        </div>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">{event.desc}</p>
        <button className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-gold transition-all group-hover:gap-2.5">
          View Gallery <ArrowUpRight className="size-3.5" />
        </button>
      </div>
    </article>
  );
}

function EventsPage() {
  return (
    <>
      <PageHero
        eyebrow="Events"
        title={<>Events we've <em className="italic text-gold">covered</em>.</>}
        subtitle="Live moments need calm planning, fast decisions, and a team that knows how to capture atmosphere without interrupting it."
        className="pb-10 md:pb-14"
      />

      <Section className="relative overflow-hidden py-12 md:py-16">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_6%,oklch(0.80_0.13_82/0.10),transparent_30%),linear-gradient(180deg,oklch(0.13_0.01_60/0.35),transparent_45%)]" />
        <SectionHeader
          eyebrow="Upcoming"
          title={<>What's <em className="italic text-gold">next</em>.</>}
          subtitle="A preview of scheduled event coverage, from cultural programs to corporate stages and public showcases."
          className="!mb-8 md:!mb-10"
        />
        <div className="grid gap-4 md:grid-cols-3">
          {events.upcoming.map((event) => <EventCard key={event.name} event={event} />)}
        </div>
      </Section>

      <Section className="bg-ink/40 py-12 md:py-16">
        <SectionHeader
          eyebrow="Completed"
          title={<>Recently <em className="italic text-gold">delivered</em>.</>}
          subtitle="Selected event stories delivered with a mix of documentary coverage, editorial frames, and cinematic recaps."
          className="!mb-8 md:!mb-10"
        />
        <div className="grid gap-4 md:grid-cols-3">
          {events.completed.map((event) => <EventCard key={event.name} event={event} />)}
        </div>
      </Section>

      <Section className="py-12 md:py-16">
        <SectionHeader
          eyebrow="Event Films"
          title={<>Event <em className="italic text-gold">videos</em>.</>}
          subtitle="A few moving-image selections from our event coverage archive."
          className="!mb-8 md:!mb-10"
        />
        <div className="grid gap-4 md:grid-cols-2">
          {["uNHlc8XwEyY", "6OFqS_qlJB0", "7DCwXWVKbBo"].map((id) => (
            <YouTubeEmbed key={id} id={id} title="Event film" className="rounded-2xl" />
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <button className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm transition-all hover:border-gold hover:text-gold">
            <Play className="size-4" /> Watch More
          </button>
        </div>
      </Section>

      <CTA
        className="py-12 md:py-16"
        panelClassName="p-7 md:p-12"
        title="Hosting an event?"
        subtitle="Let Katha Digital cover it cinematically."
      />
    </>
  );
}
