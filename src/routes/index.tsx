import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Aperture,
  ArrowUpRight,
  Camera,
  CheckCircle2,
  Clapperboard,
  Film,
  Play,
  Quote,
  Sparkles,
} from "lucide-react";
import weddingImg from "@/assets/wedding.jpg";
import { CTA } from "@/components/site/CTA";
import { Section, SectionHeader } from "@/components/site/Section";
import { YouTubeEmbed } from "@/components/site/YouTubeEmbed";
import { blogPosts, portfolio, productions, services, testimonials } from "@/lib/site-data";

const heroImg = "/katha-media/mountain-view-trip.jpeg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Katha Digital - Stories That Inspire, Moments That Last" },
      { name: "description", content: "Cinematic photography, films, and digital productions by Katha Digital." },
      { property: "og:title", content: "Katha Digital" },
      { property: "og:description", content: "Stories That Inspire, Moments That Last." },
    ],
  }),
  component: Index,
});

function Index() {
  const metrics = [
    { n: "500+", l: "Stories Told" },
    { n: "120+", l: "Weddings" },
    { n: "8yr", l: "Crafting Films" },
  ];

  return (
    <>
      <section id="home" className="relative min-h-screen overflow-hidden">
        <img
          src={heroImg}
          alt="Cinematic photographer with golden bokeh"
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,oklch(0.07_0.01_60/0.95),oklch(0.08_0.01_60/0.65)_42%,transparent_78%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,var(--background),oklch(0.13_0.01_60/0.35)_34%,transparent_72%)]" />

        <div className="container-cinema relative grid min-h-screen content-end gap-12 pb-10 pt-36 md:pb-16 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-end">
          <div className="max-w-5xl">
            <div className="eyebrow mb-6 animate-fade-up">Katha Digital - Est. Storytellers</div>
            <h1 className="max-w-5xl text-5xl font-light leading-[0.94] md:text-7xl lg:text-[7.5rem] animate-fade-up">
              Cinematic stories for people, places, and brands.
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-8 text-foreground/72 md:text-xl animate-fade-up">
              Photography, films, digital media, and original productions crafted
              with a documentary eye and a polished studio finish.
            </p>
            <div className="mt-10 flex flex-wrap gap-3 animate-fade-up">
              <Link to="/book" className="btn-primary group">
                Book a Shoot
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <Link to="/portfolio" className="btn-secondary">
                View Portfolio
              </Link>
              <Link to="/productions" className="btn-ghost">
                <Play className="size-4" /> Watch Films
              </Link>
            </div>
          </div>

          <div className="hidden lg:block animate-fade-up">
            <div className="border-l border-white/18 pl-7">
              <div className="mb-6 flex items-center gap-3 text-sm text-foreground/70">
                <span className="grid size-10 place-items-center border border-gold/40 bg-gold/10 text-gold">
                  <Clapperboard className="size-5" />
                </span>
                Full-service visual production
              </div>
              <div className="grid gap-4">
                {metrics.map((s) => (
                  <div key={s.l} className="flex items-end justify-between border-b border-white/12 pb-4">
                    <div className="text-sm uppercase tracking-[0.24em] text-muted-foreground">{s.l}</div>
                    <div className="text-4xl font-display text-gold">{s.n}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <div className="eyebrow mb-5">Who We Are</div>
            <h2 className="text-3xl font-display font-light leading-[1.08] md:text-5xl">
              Katha Digital is a creative media and production company dedicated to
              telling <em className="italic text-gold"> powerful visual stories</em>.
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-lg leading-relaxed text-muted-foreground">
              From wedding photography and cinematic films to talk shows, travel
              vlogs, events, commercial productions, and digital news - we bring
              moments to life with creativity, emotion, and professionalism.
            </p>
            <div className="mt-10 grid grid-cols-3 gap-3 border-y border-border py-6">
              {metrics.map((s) => (
                <div key={s.l}>
                  <div className="text-3xl font-display text-gold md:text-4xl">{s.n}</div>
                  <div className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section className="surface-band py-12 md:py-16">
        <SectionHeader
          eyebrow="What We Do"
          title={<>Crafted <em className="italic text-gold">services</em> for every story.</>}
          subtitle="Eight disciplines, one creative team. From intimate portraits to multi-camera productions."
          className="!mb-8 md:!mb-10"
        />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {services.slice(0, 8).map((s, i) => {
            const icons = [Camera, Film, Sparkles, Aperture, Camera, Film, Sparkles, Aperture];
            const Icon = icons[i];
            return (
              <Link
                key={s.slug}
                to="/services"
                className="group relative min-h-[285px] overflow-hidden border border-border bg-card transition-all hover:-translate-y-1 hover:border-gold/60 hover:shadow-cinematic md:min-h-[310px]"
              >
                <img src={s.image} alt={s.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/72 to-ink/10" />
                <div className="absolute inset-0 flex flex-col justify-between p-5">
                  <Icon className="size-6 text-gold" />
                  <div>
                    <h3 className="text-xl font-display">{s.title}</h3>
                    <p className="mt-2 line-clamp-3 text-sm leading-6 text-foreground/65">{s.short}</p>
                    <div className="mt-4 inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors group-hover:text-gold">
                      Learn more <ArrowUpRight className="size-3" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </Section>

      <Section className="py-12 md:py-16">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4 md:mb-10">
          <div className="max-w-xl">
            <div className="eyebrow mb-4">Selected Work</div>
            <h2 className="text-4xl font-display font-light md:text-5xl">
              Recent <em className="italic text-gold">frames</em>.
            </h2>
          </div>
          <Link to="/portfolio" className="inline-flex items-center gap-2 text-sm text-gold hover:underline">
            View full portfolio <ArrowUpRight className="size-4" />
          </Link>
        </div>
        <div className="grid auto-rows-[220px] gap-3 md:auto-rows-[240px] md:grid-cols-4">
          {portfolio.slice(0, 6).map((p, i) => (
            <div
              key={p.title}
              className={`group relative overflow-hidden border border-border ${
                i === 0 ? "md:col-span-2 md:row-span-2" : i === 3 ? "md:col-span-2" : ""
              }`}
            >
              <img src={p.image} alt={p.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/30 to-transparent opacity-80 transition-opacity group-hover:opacity-100" />
              <div className="absolute inset-0 flex flex-col justify-end p-5">
                <div className="mb-2 text-xs uppercase tracking-widest text-gold">{p.category}</div>
                <h3 className="text-2xl font-display">{p.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{p.location} / {p.date}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section className="surface-band py-12 md:py-16">
        <SectionHeader
          eyebrow="Original Productions"
          title={<>Stories told in <em className="italic text-gold">series</em>.</>}
          className="!mb-8 md:!mb-10"
        />
        <div className="grid gap-3 md:grid-cols-2">
          {[productions.kathaMeroPani, productions.gantavya].map((p) => (
            <Link key={p.title} to="/productions" className="group relative aspect-[16/10] overflow-hidden border border-border">
              <img src={p.image} alt={p.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                <div className="mb-3 text-xs uppercase tracking-widest text-gold">{p.type}</div>
                <h3 className="text-3xl font-display md:text-4xl">{p.title}</h3>
                <p className="mt-2 max-w-md text-muted-foreground">{p.description}</p>
                <div className="mt-4 inline-flex items-center gap-2 text-sm text-gold">
                  <Play className="size-4" /> Watch episodes
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      <Section className="py-12 md:py-16">
        <SectionHeader
          eyebrow="On YouTube"
          title={<>Featured <em className="italic text-gold">films</em>.</>}
          className="!mb-8 md:!mb-10"
        />
        <div className="grid gap-3 md:grid-cols-3">
          {[
            { id: "4akCjtmezHE", title: "Wedding Cinematography" },
            { id: "Ju5HDbTcXMs", title: "Aerial Cinematography" },
            { id: "ghe6mWFUw4c", title: "Music Video" },
          ].map((v) => (
            <div key={v.id} className="space-y-2.5">
              <YouTubeEmbed id={v.id} title={v.title} />
              <h3 className="text-xl font-display">{v.title}</h3>
            </div>
          ))}
        </div>
      </Section>

      <Section className="surface-band py-12 md:py-16">
        <div className="mb-8 flex items-end justify-between md:mb-10">
          <SectionHeader eyebrow="Latest" title={<>News & <em className="italic text-gold">journal</em>.</>} className="!mb-0" />
          <Link to="/news" className="hidden items-center gap-2 text-sm text-gold hover:underline sm:inline-flex">
            All posts <ArrowUpRight className="size-4" />
          </Link>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          {blogPosts.slice(0, 3).map((b) => (
            <Link key={b.title} to="/news" className="group">
              <div className="mb-3 aspect-[4/3] overflow-hidden border border-border">
                <img src={b.image} alt={b.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="mb-2 text-xs uppercase tracking-widest text-gold">{b.category}</div>
              <h3 className="text-xl font-display transition-colors group-hover:text-gold">{b.title}</h3>
              <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{b.excerpt}</p>
            </Link>
          ))}
        </div>
      </Section>

      <Section className="py-12 md:py-16">
        <SectionHeader
          eyebrow="Kind Words"
          align="center"
          title={<>What <em className="italic text-gold">clients</em> say.</>}
          className="!mb-8 md:!mb-10"
        />
        <div className="grid gap-3 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.name} className="border border-border bg-card/80 p-6 transition-colors hover:border-gold/40">
              <Quote className="mb-4 size-6 text-gold" />
              <blockquote className="text-base leading-relaxed text-foreground/90">
                {t.quote}
              </blockquote>
              <figcaption className="mt-5 border-t border-border pt-5">
                <CheckCircle2 className="mb-2 size-4 text-gold" />
                <div className="font-medium">{t.name}</div>
                <div className="mt-1 text-xs text-muted-foreground">{t.role}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>

      <CTA className="py-12 md:py-16" panelClassName="p-7 md:p-12" />

      <img src={weddingImg} alt="" width={1} height={1} className="hidden" />
    </>
  );
}
