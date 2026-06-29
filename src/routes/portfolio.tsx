import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section } from "@/components/site/Section";
import { CTA } from "@/components/site/CTA";
import { VideoGrid } from "@/components/site/VideoCard";
import { portfolio, youtubeVideos } from "@/lib/site-data";

const highQualityImage = (src: string) => src.replace(".webp", ".jpeg");
const portfolioImageClass =
  "absolute inset-0 h-full w-full object-contain object-center saturate-[1.08] contrast-[1.04]";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio - Katha Digital" },
      { name: "description", content: "Selected work across weddings, events, commercial, travel, and portraits." },
      { property: "og:title", content: "Portfolio - Katha Digital" },
      { property: "og:description", content: "Selected frames from our story so far." },
    ],
  }),
  component: PortfolioPage,
});

function PortfolioPage() {
  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title={<>Selected <em className="italic text-gold">frames</em>.</>}
        subtitle="A curated look at recent projects."
      />

      <Section className="relative overflow-hidden py-16 md:py-24">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_50%_0%,oklch(0.78_0.13_80/0.10),transparent_62%)]" />
        <div className="relative grid gap-6 sm:grid-cols-2 lg:auto-rows-[19rem] lg:grid-cols-6 lg:gap-7">
          {portfolio.map((p, i) => {
            const layout = [
              "lg:col-span-4 lg:row-span-2",
              "lg:col-span-2 lg:row-span-2",
              "lg:col-span-2 lg:row-span-2",
              "lg:col-span-4 lg:row-span-2",
              "lg:col-span-3 lg:row-span-2",
              "lg:col-span-3 lg:row-span-2",
            ];

            return (
              <article key={p.title} className={`group flex flex-col rounded-[1.75rem] border border-border/70 bg-gradient-to-b from-card/85 to-card/45 p-3 shadow-[0_26px_80px_-42px_oklch(0_0_0/0.86)] ring-1 ring-white/5 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/50 hover:shadow-[0_34px_100px_-46px_oklch(0.78_0.13_80/0.32)] ${layout[i % layout.length]}`}>
                <div className="relative aspect-[3/4] overflow-hidden rounded-[1.35rem] border border-border/60 bg-[radial-gradient(circle_at_50%_35%,oklch(0.18_0.04_60),oklch(0.06_0.02_60)_68%)] lg:min-h-0 lg:flex-1 lg:aspect-auto">
                  <img
                    src={highQualityImage(p.image)}
                    alt={p.title}
                    loading="lazy"
                    decoding="async"
                    sizes="(min-width: 1024px) 50vw, (min-width: 640px) 50vw, 100vw"
                    className={portfolioImageClass}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/88 via-ink/10 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-95" />
                  <div className="absolute inset-0 bg-gradient-to-br from-gold/12 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="absolute inset-0 ring-1 ring-inset ring-white/5" />
                  <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-7">
                    <div className="mb-3 w-fit rounded-full border border-gold/25 bg-ink/55 px-3 py-1 text-[0.68rem] uppercase tracking-widest text-gold backdrop-blur-md">{p.category}</div>
                    <h3 className="text-balance font-display text-2xl font-light leading-tight md:text-3xl">{p.title}</h3>
                    <p className="mt-1 text-xs text-foreground/58">{p.location} / {p.date}</p>
                  </div>
                </div>
                <p className="mx-2 border-t border-border/50 pb-3 pt-4 text-sm leading-6 text-foreground/62">{p.desc}</p>
              </article>
            );
          })}
        </div>
      </Section>

      <Section className="relative overflow-hidden bg-ink/45 py-16 md:py-24">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/35 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-[radial-gradient(circle_at_50%_100%,oklch(0.78_0.13_80/0.08),transparent_62%)]" />
        <div className="relative mb-14 max-w-2xl md:mb-16">
          <div className="eyebrow mb-4">Video Portfolio</div>
          <h2 className="text-balance font-display text-4xl font-light leading-tight md:text-5xl">
            Motion pieces with <em className="italic text-gold">cinematic rhythm</em>.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-foreground/64 md:text-lg">
            Wedding films, aerial visuals, story features, talk shows, and music videos
            produced for audiences who expect polish on every screen.
          </p>
        </div>
        <VideoGrid videos={youtubeVideos} />
      </Section>

      <CTA title="Like what you see?" subtitle="Let's create something beautiful together." />
    </>
  );
}
