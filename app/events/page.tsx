import Image from "next/image";
import { ArrowUpRight, Calendar, MapPin, Play } from "lucide-react";
import { CTA } from "@/components/site/CTA";
import { Section, SectionHeader } from "@/components/site/Section";
import { YouTubeEmbed } from "@/components/site/YouTubeEmbed";
import { events } from "@/lib/site-data";

export const metadata = {
  title: "Events",
  description: "Premium upcoming and completed event coverage by Katha Digital.",
  openGraph: {
    title: "Events - Katha Digital",
    description: "Upcoming and completed event coverage.",
  },
};

type EventItem = {
  name: string;
  date: string;
  location: string;
  desc: string;
  image: string;
  position: string;
};

function EventCard({ event, featured = false }: { event: EventItem; featured?: boolean }) {
  return (
    <article
      className={`group overflow-hidden rounded-[1.45rem] border border-border/65 bg-card/70 p-2.5 shadow-[0_24px_80px_-50px_oklch(0_0_0/0.88)] ring-1 ring-white/5 transition-all duration-300 hover:-translate-y-1 hover:border-gold/45 hover:bg-card/90 ${
        featured ? "lg:col-span-2" : ""
      }`}
    >
      <div className={featured ? "grid h-full gap-0 lg:grid-cols-[1.18fr_0.82fr]" : ""}>
        <div
          className={`relative overflow-hidden rounded-[1.05rem] bg-ink ${
            featured
              ? "aspect-[16/11] min-h-[20rem] lg:aspect-auto"
              : "aspect-[4/5] sm:aspect-[3/4]"
          }`}
        >
          <Image
            src={event.image}
            alt={event.name}
            fill
            loading={featured ? "eager" : "lazy"}
            priority={featured}
            sizes={
              featured
                ? "(min-width: 1024px) 52vw, 100vw"
                : "(min-width: 1024px) 31vw, (min-width: 768px) 50vw, 100vw"
            }
            className={`object-cover ${event.position} saturate-[1.07] contrast-[1.04] transition-transform duration-700 ease-out group-hover:scale-[1.04]`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/78 via-ink/10 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-br from-gold/14 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <div className="absolute left-4 top-4 rounded-full border border-gold/35 bg-ink/70 px-3 py-1 text-[0.68rem] uppercase tracking-widest text-gold backdrop-blur-md">
            Event coverage
          </div>
        </div>
        <div className="flex flex-col justify-between px-2 pb-4 pt-5 md:px-3 lg:p-7">
          <div>
            <h3 className="text-balance font-display text-2xl font-light leading-tight transition-colors group-hover:text-gold md:text-3xl">
              {event.name}
            </h3>
            <div className="mt-4 grid gap-2 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <Calendar className="size-4 shrink-0 text-gold" /> {event.date}
              </span>
              <span className="inline-flex items-center gap-2">
                <MapPin className="size-4 shrink-0 text-gold" /> {event.location}
              </span>
            </div>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">{event.desc}</p>
          </div>
          <button className="mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-border/70 bg-ink/35 px-4 py-2 text-sm font-medium text-gold transition-all group-hover:border-gold/50 group-hover:bg-gold/10">
            View Gallery <ArrowUpRight className="size-3.5" />
          </button>
        </div>
      </div>
    </article>
  );
}

export default function EventsPage() {
  const [featuredUpcoming, ...otherUpcoming] = events.upcoming;

  return (
    <>
      <section className="relative overflow-hidden border-b border-border/55 py-20 md:py-28">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_0%,oklch(0.80_0.13_82/0.15),transparent_34%),radial-gradient(circle_at_88%_10%,oklch(0.42_0.04_250/0.16),transparent_34%),linear-gradient(180deg,oklch(0.13_0.01_60/0.34),transparent_60%)]" />
        <div className="container-cinema">
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1fr] lg:items-end">
            <div className="max-w-4xl">
              <div className="eyebrow mb-5">Events</div>
              <h1 className="text-balance font-display text-5xl font-light leading-[1.02] md:text-7xl lg:text-8xl">
                Events we've <em className="italic text-gold">covered</em>.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground md:text-lg">
                Live moments need calm planning, quick decisions, and a team that knows how to
                capture atmosphere without interrupting the experience.
              </p>
            </div>
            {featuredUpcoming && (
              <div className="relative hidden min-h-[26rem] overflow-hidden rounded-[1.75rem] border border-border/70 bg-ink shadow-cinematic ring-1 ring-white/5 lg:block">
                <Image
                  src={featuredUpcoming.image}
                  alt={featuredUpcoming.name}
                  fill
                  priority
                  sizes="42vw"
                  className={`object-cover ${featuredUpcoming.position} saturate-[1.08] contrast-[1.05]`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/88 via-ink/12 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-br from-gold/18 via-transparent to-transparent" />
                <div className="absolute bottom-0 p-7">
                  <div className="mb-3 text-xs uppercase tracking-widest text-gold">
                    Next Coverage
                  </div>
                  <h2 className="font-display text-4xl font-light leading-tight">
                    {featuredUpcoming.name}
                  </h2>
                  <p className="mt-3 text-sm text-foreground/66">
                    {featuredUpcoming.date} / {featuredUpcoming.location}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <Section className="relative overflow-hidden py-14 md:py-20">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_10%,oklch(0.80_0.13_82/0.09),transparent_28%)]" />
        <div className="mb-9 grid gap-5 border-y border-border/60 py-6 lg:grid-cols-[0.7fr_1fr] lg:items-end">
          <div>
            <div className="eyebrow mb-3">Upcoming</div>
            <h2 className="font-display text-4xl font-light leading-tight md:text-5xl">
              What's <em className="italic text-gold">next</em>.
            </h2>
          </div>
          <p className="max-w-3xl text-sm leading-7 text-muted-foreground md:text-base">
            A preview of scheduled event coverage, from cultural programs to corporate stages and
            public showcases. Each event is planned for clean photo delivery, cinematic recap films,
            social edits, and a calm production workflow.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {featuredUpcoming && <EventCard event={featuredUpcoming} featured />}
          {otherUpcoming.map((event) => (
            <EventCard key={event.name} event={event} />
          ))}
        </div>
      </Section>

      <Section className="bg-ink/40 py-14 md:py-20">
        <SectionHeader
          eyebrow="Completed"
          title={
            <>
              Recently <em className="italic text-gold">delivered</em>.
            </>
          }
          subtitle="Selected event stories delivered with a mix of documentary coverage, editorial frames, and cinematic recaps."
          className="!mb-8 md:!mb-10"
        />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {events.completed.map((event) => (
            <EventCard key={event.name} event={event} />
          ))}
        </div>
      </Section>

      <Section className="py-14 md:py-20">
        <SectionHeader
          eyebrow="Event Films"
          title={
            <>
              Event <em className="italic text-gold">videos</em>.
            </>
          }
          subtitle="A few moving-image selections from our event coverage archive."
          className="!mb-8 md:!mb-10"
        />
        <div className="grid gap-5 md:grid-cols-2">
          {["QVfkQe29EKY", "u-yd2xWAQZk", "6OFqS_qlJB0"].map((id) => (
            <YouTubeEmbed key={id} id={id} title="Event film" className="rounded-2xl" />
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <button className="inline-flex items-center gap-2 rounded-full border border-border/70 px-5 py-3 text-sm transition-all hover:border-gold hover:bg-gold/10 hover:text-gold">
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
