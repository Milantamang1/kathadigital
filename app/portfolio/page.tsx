import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/site/Section";
import { CTA } from "@/components/site/CTA";
import { VideoGrid } from "@/components/site/VideoCard";
import { getPortfolioVideos, getPublishedPortfolioProjects } from "@/lib/cms/portfolio";
import type { PortfolioProjectValue } from "@/lib/cms/portfolio";

const portfolioTabs = [
  "All",
  "Wedding Films",
  "Events",
  "Portraits",
  "Travel",
  "Music Videos",
  "Brand Stories",
] as const;

export const metadata = {
  title: "Portfolio",
  description:
    "Selected cinematic photography and films across weddings, events, commercial, travel, and portraits.",
  openGraph: {
    title: "Portfolio - Katha Digital",
    description: "Selected frames from our story so far.",
  },
};

export const dynamic = "force-dynamic";

function FeaturedProjectCard({
  featuredProject,
  thumbnailProjects,
}: {
  featuredProject: PortfolioProjectValue;
  thumbnailProjects: PortfolioProjectValue[];
}) {
  return (
    <article className="premium-panel group overflow-hidden rounded-[2rem] p-3 ring-1 ring-white/5">
      <div className="relative aspect-[4/3] overflow-hidden rounded-[1.45rem] bg-ink md:aspect-[16/12] lg:aspect-[4/3]">
        <Image
          src={featuredProject.image}
          alt={featuredProject.title}
          fill
          priority
          sizes="(min-width: 1024px) 44vw, 100vw"
          className={`image-polish object-cover ${featuredProject.position} group-hover:scale-[1.035]`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/22 to-transparent" />
        <div className="absolute left-5 top-5 rounded-full border border-gold/35 bg-ink/70 px-3 py-1 text-[0.68rem] uppercase tracking-widest text-gold backdrop-blur-md">
          Featured Project
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7">
          <div className="mb-3 flex flex-wrap gap-2 text-[0.68rem] uppercase tracking-widest text-foreground/65">
            <span>{featuredProject.category}</span>
            <span>{featuredProject.location}</span>
          </div>
          <h2 className="text-balance font-display text-3xl font-light leading-tight md:text-5xl">
            {featuredProject.title}
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-foreground/72 md:text-base">
            {featuredProject.desc}
          </p>
        </div>
      </div>
      <div className="grid gap-3 px-1 pb-1 pt-3 sm:grid-cols-[1fr_auto] sm:items-center">
        <div className="flex gap-2">
          {thumbnailProjects.map((item) => (
            <div
              key={item.title}
              className="relative h-16 w-20 overflow-hidden rounded-xl border border-white/10 bg-ink sm:h-20 sm:w-28"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="112px"
                className={`object-cover ${item.position}`}
              />
            </div>
          ))}
        </div>
        <a
          href="#portfolio-gallery"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-gold/35 bg-gold/10 px-4 py-3 text-sm font-semibold text-gold transition-all hover:border-gold/70 hover:bg-gold/15"
        >
          View Project <ArrowUpRight className="size-4" />
        </a>
      </div>
    </article>
  );
}

function ProjectCard({ item, lead = false }: { item: PortfolioProjectValue; lead?: boolean }) {
  return (
    <article
      className={`premium-panel group flex h-full flex-col overflow-hidden rounded-[1.5rem] p-2.5 ring-1 ring-white/5 transition-all duration-300 hover:-translate-y-1 hover:border-gold/45 ${
        lead ? "min-h-full" : ""
      }`}
    >
      <div
        className={`relative overflow-hidden rounded-[1.1rem] bg-ink ${
          lead ? "aspect-[16/11] lg:flex-1" : "aspect-[4/3]"
        }`}
      >
        <Image
          src={item.image}
          alt={item.title}
          fill
          priority={lead}
          sizes={lead ? "(min-width: 1024px) 58vw, 100vw" : "(min-width: 1024px) 28vw, 100vw"}
          className={`image-polish object-cover ${item.position} group-hover:scale-[1.045]`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/88 via-ink/18 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-gold/14 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <div className="absolute left-4 top-4 rounded-full border border-gold/35 bg-ink/70 px-3 py-1 text-[0.65rem] uppercase tracking-widest text-gold backdrop-blur-md">
          {item.category}
        </div>
        <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
          <h3
            className={`text-balance font-display font-light leading-tight ${
              lead ? "text-3xl md:text-5xl" : "text-2xl md:text-3xl"
            }`}
          >
            {item.title}
          </h3>
          {lead && (
            <p className="mt-3 max-w-xl text-sm leading-6 text-foreground/72">{item.desc}</p>
          )}
        </div>
      </div>
      <div className="px-2 pb-3 pt-4">
        {!lead && (
          <p className="line-clamp-2 text-sm leading-6 text-muted-foreground">{item.desc}</p>
        )}
        <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-[0.68rem] uppercase tracking-widest text-foreground/48">
          <span>{item.location}</span>
          <span>{item.date}</span>
        </div>
        <a
          href="#portfolio-gallery"
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-gold transition-all group-hover:gap-2.5"
        >
          View Project <ArrowUpRight className="size-3.5" />
        </a>
      </div>
    </article>
  );
}

export default async function PortfolioPage() {
  const [galleryProjects, videos] = await Promise.all([
    getPublishedPortfolioProjects(),
    getPortfolioVideos(),
  ]);
  const featuredProject =
    galleryProjects.find((project) => project.featured) ?? galleryProjects[1] ?? galleryProjects[0];
  const thumbnailProjects = [galleryProjects[0], galleryProjects[6]].filter(Boolean);

  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-border/55 pt-34 pb-14 md:pt-40 md:pb-20">
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_20%_10%,oklch(0.8_0.13_82/0.15),transparent_30%),radial-gradient(circle_at_86%_16%,oklch(0.42_0.04_250/0.15),transparent_34%),linear-gradient(180deg,oklch(0.13_0.01_60/0.42),transparent_62%)]" />
        <div className="container-cinema">
          <div className="grid gap-10 lg:grid-cols-[0.88fr_1fr] lg:items-center xl:gap-14">
            <div className="max-w-4xl">
              <div className="eyebrow mb-5">Portfolio</div>
              <h1 className="text-balance font-display text-5xl font-light leading-[1.02] md:text-7xl lg:text-8xl">
                Stories shaped in <em className="italic text-gold">cinematic frames</em>.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground md:text-lg">
                A polished selection of weddings, portraits, events, travel stories, and film work
                composed with clean light, honest emotion, and warm editorial detail.
              </p>
              <div className="mt-8 grid max-w-2xl gap-3 sm:grid-cols-3">
                {[
                  ["10+", "Featured stories"],
                  ["7", "Portfolio categories"],
                  ["Photo + Film", "Delivery craft"],
                ].map(([value, label]) => (
                  <div
                    key={label}
                    className="premium-panel rounded-[1rem] px-4 py-4 ring-1 ring-white/5"
                  >
                    <div className="font-display text-2xl font-light text-foreground">{value}</div>
                    <div className="mt-1 text-[0.65rem] uppercase tracking-widest text-gold">
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {featuredProject && (
              <FeaturedProjectCard
                featuredProject={featuredProject}
                thumbnailProjects={thumbnailProjects}
              />
            )}
          </div>
        </div>
      </section>

      <Section id="portfolio-gallery" className="relative overflow-hidden py-14 md:py-20">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-[radial-gradient(circle_at_50%_0%,oklch(0.8_0.13_82/0.12),transparent_62%)]" />
        <div className="relative mb-10 grid gap-5 border-y border-border/55 py-6 md:grid-cols-[0.75fr_1fr] md:items-end">
          <div>
            <div className="eyebrow mb-3">Browse the work</div>
            <h2 className="font-display text-4xl font-light leading-tight md:text-5xl">
              Selected stories, framed with intention.
            </h2>
          </div>
          <p className="max-w-3xl text-sm leading-7 text-muted-foreground md:text-base">
            A curated edit of wedding films, event coverage, portraits, travel stories, music
            videos, and brand visuals. Each frame is chosen for mood, composition, and the story it
            carries.
          </p>
        </div>

        <div className="mb-9 flex gap-2 overflow-x-auto rounded-full border border-border/50 bg-ink/35 p-1.5 ring-1 ring-white/5 backdrop-blur-md">
          {portfolioTabs.map((tab, index) => (
            <a
              key={tab}
              href="#portfolio-gallery"
              className={`shrink-0 rounded-full border px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.16em] transition-all md:text-[0.72rem] ${
                index === 0
                  ? "border-gold/55 bg-gold/15 text-gold shadow-[0_12px_34px_-22px_oklch(0.8_0.13_82/0.8)]"
                  : "border-transparent text-foreground/56 hover:border-gold/35 hover:bg-gold/8 hover:text-gold"
              }`}
            >
              {tab}
            </a>
          ))}
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-12 lg:auto-rows-[minmax(17rem,auto)] lg:gap-6">
          {galleryProjects.map((item, index) => (
            <div
              key={item.title}
              className={
                index === 0
                  ? "md:col-span-2 lg:col-span-7 lg:row-span-2"
                  : index < 3
                    ? "lg:col-span-5"
                    : "lg:col-span-4"
              }
            >
              <ProjectCard item={item} lead={index === 0} />
            </div>
          ))}
        </div>
      </Section>

      <Section className="relative overflow-hidden bg-ink/45 py-16 md:py-24">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/35 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-[radial-gradient(circle_at_50%_100%,oklch(0.78_0.13_80/0.08),transparent_62%)]" />
        <div className="relative mb-12 max-w-2xl md:mb-14">
          <div className="eyebrow mb-4">Video Portfolio</div>
          <h2 className="text-balance font-display text-4xl font-light leading-tight md:text-5xl">
            Motion pieces with <em className="italic text-gold">cinematic rhythm</em>.
          </h2>
          <p className="mt-5 text-base leading-8 text-foreground/64 md:text-lg">
            Wedding films, aerial visuals, story features, talk shows, and music videos produced for
            audiences who expect polish on every screen.
          </p>
        </div>
        <VideoGrid videos={videos} />
      </Section>

      <CTA
        title="Ready to create your own cinematic story?"
        subtitle="Book a wedding film, event shoot, portrait session, music video, or brand story with Katha Digital."
      />
    </>
  );
}
