import { CalendarDays, MapPin, Play, Youtube } from "lucide-react";
import { PageHero, Section, SectionHeader } from "@/components/site/Section";
import { CTA } from "@/components/site/CTA";
import { YouTubeEmbed } from "@/components/site/YouTubeEmbed";
import { getPublishedProductions, getUpcomingProductions } from "@/lib/cms/productions";

export const metadata = {
  title: "Productions",
  description:
    "Original productions by Katha Digital: talk shows, travel films, interviews, and documentary stories.",
  openGraph: {
    title: "Original Productions - Katha Digital",
    description: "Talk shows, travel vlogs, and documentary stories.",
  },
};

export const dynamic = "force-dynamic";

export default async function ProductionsPage() {
  const [productions, upcomingProductions] = await Promise.all([
    getPublishedProductions(),
    getUpcomingProductions(),
  ]);
  const primaryProduction = productions[0];
  const secondaryProduction = productions[1];

  return (
    <>
      <PageHero
        eyebrow="Productions"
        title={
          <>
            Original <em className="italic text-gold">Productions</em>.
          </>
        }
        subtitle="Original shows, travel films, interviews, serials, and documentary stories shaped for digital audiences with cinematic care."
        className="pb-10 md:pb-14"
      />

      <Section className="relative overflow-hidden py-12 md:py-16">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_5%,oklch(0.80_0.13_82/0.10),transparent_30%),linear-gradient(180deg,oklch(0.13_0.01_60/0.35),transparent_45%)]" />

        {primaryProduction && (
          <>
            <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-10">
              <div className="lg:col-span-7">
                <YouTubeEmbed
                  id={primaryProduction.youtubeId}
                  title={primaryProduction.title}
                  className="rounded-2xl"
                />
              </div>
              <div className="lg:col-span-5">
                <div className="eyebrow mb-3">{primaryProduction.type}</div>
                <h2 className="font-display text-4xl font-light leading-tight md:text-5xl">
                  {primaryProduction.title}
                </h2>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  {primaryProduction.desc}
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
                <a
                  href={primaryProduction.subscribeUrl}
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-medium text-primary-foreground transition-all hover:-translate-y-0.5 hover:shadow-gold"
                >
                  <Youtube className="size-4" /> Subscribe
                </a>
              </div>
            </div>

            <div className="mt-10">
              <div className="mb-5 flex items-end justify-between gap-4">
                <h3 className="font-display text-2xl">Episodes</h3>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">
                  Season archive
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {primaryProduction.episodes.map((episode) => (
                  <div
                    key={episode.num}
                    className="group rounded-2xl border border-border bg-card/85 p-5 transition-colors hover:border-gold/50"
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <span className="text-xs tracking-widest text-gold">{episode.num}</span>
                      <Play className="size-4 text-muted-foreground transition-colors group-hover:text-gold" />
                    </div>
                    <h4 className="font-display text-lg leading-tight">{episode.title}</h4>
                    {episode.guest && (
                      <p className="mt-3 text-xs text-muted-foreground">Guest / {episode.guest}</p>
                    )}
                    <p className="text-xs text-muted-foreground/70">{episode.date}</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </Section>

      {secondaryProduction && (
        <Section className="bg-ink/40 py-12 md:py-16">
          <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-10">
            <div className="lg:order-2 lg:col-span-5">
              <YouTubeEmbed
                id={secondaryProduction.youtubeId}
                title={secondaryProduction.title}
                className="rounded-2xl"
              />
            </div>
            <div className="lg:order-1 lg:col-span-7">
              <div className="eyebrow mb-3">{secondaryProduction.type}</div>
              <h2 className="font-display text-4xl font-light leading-tight md:text-5xl">
                {secondaryProduction.title}
              </h2>
              <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">
                {secondaryProduction.desc}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {secondaryProduction.destinations.map((destination) => (
                  <span
                    key={destination}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card/50 px-3 py-1.5 text-xs text-muted-foreground"
                  >
                    <MapPin className="size-3 text-gold" />
                    {destination}
                  </span>
                ))}
              </div>
              <a
                href={secondaryProduction.subscribeUrl}
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-medium text-primary-foreground transition-all hover:-translate-y-0.5 hover:shadow-gold"
              >
                <Youtube className="size-4" /> Subscribe
              </a>
            </div>
          </div>

          <div className="mt-10">
            <div className="mb-5 flex items-end justify-between gap-4">
              <h3 className="font-display text-2xl">Episodes</h3>
              <div className="text-xs uppercase tracking-widest text-muted-foreground">
                Travel notes
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {secondaryProduction.episodes.map((episode) => (
                <div
                  key={episode.num}
                  className="rounded-2xl border border-border bg-card/85 p-5 transition-colors hover:border-gold/50"
                >
                  <span className="text-xs tracking-widest text-gold">{episode.num}</span>
                  <h4 className="mt-3 font-display text-lg leading-tight">{episode.title}</h4>
                  <p className="mt-2 text-xs text-muted-foreground">{episode.date}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>
      )}

      <Section className="py-12 md:py-16">
        <SectionHeader
          eyebrow="Coming Soon"
          title={
            <>
              Future <em className="italic text-gold">productions</em>.
            </>
          }
          subtitle="New formats in development, built around craft, culture, city life, serial storytelling, and deeper conversations."
          className="!mb-8 md:!mb-10"
        />
        <div className="grid gap-4 sm:grid-cols-3">
          {upcomingProductions.map((production) => (
            <div
              key={production.title}
              className="rounded-2xl border border-dashed border-border bg-card/35 p-6 transition-colors hover:border-gold/50"
            >
              <div className="mb-3 text-xs uppercase tracking-widest text-gold">
                {production.type}
              </div>
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
