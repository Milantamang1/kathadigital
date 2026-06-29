import { createFileRoute } from "@tanstack/react-router";
import { CalendarDays, MapPin, Play, Youtube } from "lucide-react";
import { PageHero, Section, SectionHeader } from "@/components/site/Section";
import { CTA } from "@/components/site/CTA";
import { YouTubeEmbed } from "@/components/site/YouTubeEmbed";
import { productions } from "@/lib/site-data";

const upcomingProductions = [
  {
    title: "Karigar",
    type: "Documentary Series",
    desc: "Intimate profiles of Nepal's master craftspeople, their tools, discipline, and inherited knowledge.",
  },
  {
    title: "Mero Sahar",
    type: "Urban Stories",
    desc: "A grounded city series following people, neighborhoods, small businesses, and everyday Kathmandu rhythms.",
  },
  {
    title: "Saath",
    type: "Long-form Interviews",
    desc: "Unhurried conversations with creative leaders, founders, makers, and people shaping culture.",
  },
] as const;

export const Route = createFileRoute("/productions")({
  head: () => ({
    meta: [
      { title: "Productions - Katha Digital" },
      { name: "description", content: "Original productions by Katha Digital: talk shows, travel films, interviews, and documentary stories." },
      { property: "og:title", content: "Original Productions - Katha Digital" },
      { property: "og:description", content: "Talk shows, travel vlogs, and documentary stories." },
    ],
  }),
  component: ProductionsPage,
});

function ProductionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Productions"
        title={<>Original <em className="italic text-gold">Productions</em>.</>}
        subtitle="Original shows, travel films, interviews, and documentary-style stories shaped for digital audiences with cinematic care."
        className="pb-10 md:pb-14"
      />

      <Section className="relative overflow-hidden py-12 md:py-16">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_5%,oklch(0.80_0.13_82/0.10),transparent_30%),linear-gradient(180deg,oklch(0.13_0.01_60/0.35),transparent_45%)]" />

        <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <YouTubeEmbed id="uNHlc8XwEyY" title="Katha Mero Pani" className="rounded-2xl" />
          </div>
          <div className="lg:col-span-5">
            <div className="eyebrow mb-3">{productions.kathaMeroPani.type}</div>
            <h2 className="font-display text-4xl font-light leading-tight md:text-5xl">{productions.kathaMeroPani.title}</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Conversations with people whose journeys carry craft, courage, and perspective.
              The show is built around warm interviews, thoughtful pacing, and stories that
              leave the audience with something to remember.
            </p>
            <div className="mt-6 grid gap-3 border-y border-border py-4 text-sm text-muted-foreground sm:grid-cols-2">
              <div className="flex items-center gap-2">
                <Play className="size-4 text-gold" />
                Studio conversations
              </div>
              <div className="flex items-center gap-2">
                <CalendarDays className="size-4 text-gold" />
                New episodes by season
              </div>
            </div>
            <a href="https://youtube.com" className="mt-6 inline-flex items-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-medium text-primary-foreground transition-all hover:-translate-y-0.5 hover:shadow-gold">
              <Youtube className="size-4" /> Subscribe
            </a>
          </div>
        </div>

        <div className="mt-10">
          <div className="mb-5 flex items-end justify-between gap-4">
            <h3 className="font-display text-2xl">Episodes</h3>
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Season archive</div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {productions.kathaMeroPani.episodes.map((episode) => (
              <div key={episode.num} className="group rounded-2xl border border-border bg-card/85 p-5 transition-colors hover:border-gold/50">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-xs tracking-widest text-gold">{episode.num}</span>
                  <Play className="size-4 text-muted-foreground transition-colors group-hover:text-gold" />
                </div>
                <h4 className="font-display text-lg leading-tight">{episode.title}</h4>
                <p className="mt-3 text-xs text-muted-foreground">Guest / {episode.guest}</p>
                <p className="text-xs text-muted-foreground/70">{episode.date}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section className="bg-ink/40 py-12 md:py-16">
        <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:order-2 lg:col-span-5">
            <YouTubeEmbed id="7DCwXWVKbBo" title="Gantavya" className="rounded-2xl" />
          </div>
          <div className="lg:order-1 lg:col-span-7">
            <div className="eyebrow mb-3">{productions.gantavya.type}</div>
            <h2 className="font-display text-4xl font-light leading-tight md:text-5xl">{productions.gantavya.title}</h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">
              A travel-led series about place, food, culture, and the people who give a
              destination its voice. Each episode is designed to feel observant, personal,
              and cinematic rather than rushed.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {productions.gantavya.destinations.map((destination) => (
                <span key={destination} className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card/50 px-3 py-1.5 text-xs text-muted-foreground">
                  <MapPin className="size-3 text-gold" />
                  {destination}
                </span>
              ))}
            </div>
            <a href="https://youtube.com" className="mt-7 inline-flex items-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-medium text-primary-foreground transition-all hover:-translate-y-0.5 hover:shadow-gold">
              <Youtube className="size-4" /> Subscribe
            </a>
          </div>
        </div>

        <div className="mt-10">
          <div className="mb-5 flex items-end justify-between gap-4">
            <h3 className="font-display text-2xl">Episodes</h3>
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Travel notes</div>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {productions.gantavya.episodes.map((episode) => (
              <div key={episode.num} className="rounded-2xl border border-border bg-card/85 p-5 transition-colors hover:border-gold/50">
                <span className="text-xs tracking-widest text-gold">{episode.num}</span>
                <h4 className="mt-3 font-display text-lg leading-tight">{episode.title}</h4>
                <p className="mt-2 text-xs text-muted-foreground">{episode.date}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section className="py-12 md:py-16">
        <SectionHeader
          eyebrow="Coming Soon"
          title={<>Future <em className="italic text-gold">productions</em>.</>}
          subtitle="New formats in development, built around craft, culture, city life, and deeper conversations."
          className="!mb-8 md:!mb-10"
        />
        <div className="grid gap-4 sm:grid-cols-3">
          {upcomingProductions.map((production) => (
            <div key={production.title} className="rounded-2xl border border-dashed border-border bg-card/35 p-6 transition-colors hover:border-gold/50">
              <div className="mb-3 text-xs uppercase tracking-widest text-gold">{production.type}</div>
              <h4 className="font-display text-2xl">{production.title}</h4>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{production.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <CTA className="py-12 md:py-16" panelClassName="p-7 md:p-12" />
    </>
  );
}
