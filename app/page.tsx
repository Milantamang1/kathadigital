import Link from "next/link";
import Image from "next/image";
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
import { CTA } from "@/components/site/CTA";
import { Card } from "@/components/site/Card";
import { Section, SectionHeader } from "@/components/site/Section";
import { YouTubeEmbed } from "@/components/site/YouTubeEmbed";
import {
  defaultHomeContent,
  getHomepageData,
  getPublishedHomeContent,
} from "@/lib/cms/home-content";

export async function generateMetadata() {
  const home = await getPublishedHomeContent().catch(() => defaultHomeContent);

  return home.metadata;
}

export default async function Index() {
  const { home, services, portfolio, productions, blogPosts, testimonials } =
    await getHomepageData();

  return (
    <>
      {home.sections.hero && (
        <section id="home" className="relative min-h-dvh w-full max-w-full overflow-hidden">
          <Image
            src={home.heroImg}
            alt={home.heroAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,oklch(0.07_0.01_60/0.95),oklch(0.08_0.01_60/0.65)_42%,transparent_78%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(0deg,var(--background),oklch(0.13_0.01_60/0.35)_34%,transparent_72%)]" />

          <div className="container-cinema relative grid min-h-dvh content-end gap-10 pb-10 pt-32 sm:pt-36 md:pb-14 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-end">
            <div className="max-w-5xl">
              <div className="eyebrow mb-6 animate-fade-up">{home.eyebrow}</div>
              <h1 className="text-balance max-w-5xl text-5xl font-light leading-[0.94] md:text-7xl lg:text-[clamp(5.75rem,7vw,7.5rem)] animate-fade-up">
                {home.title}
              </h1>
              <p className="mt-7 max-w-2xl text-base leading-8 text-foreground/72 md:text-xl animate-fade-up">
                {home.subtitle}
              </p>
              <div className="mt-10 flex flex-wrap gap-3 animate-fade-up">
                <Link href={home.actions[0].href} className="btn-primary group">
                  {home.actions[0].label}
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
                <Link href={home.actions[1].href} className="btn-secondary">
                  {home.actions[1].label}
                </Link>
                <Link href={home.actions[2].href} className="btn-ghost">
                  <Play className="size-4" /> {home.actions[2].label}
                </Link>
              </div>
            </div>

            <div className="hidden lg:block animate-fade-up">
              <div className="border-l border-white/18 pl-7">
                <div className="mb-6 flex items-center gap-3 text-sm text-foreground/70">
                  <span className="grid size-10 place-items-center border border-gold/40 bg-gold/10 text-gold">
                    <Clapperboard className="size-5" />
                  </span>
                  {home.sideLabel}
                </div>
                <div className="grid gap-4">
                  {home.metrics.map((s) => (
                    <div
                      key={s.l}
                      className="flex items-end justify-between border-b border-white/12 pb-4"
                    >
                      <div className="text-sm uppercase tracking-[0.24em] text-muted-foreground">
                        {s.l}
                      </div>
                      <div className="text-4xl font-display text-gold">{s.n}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {home.sections.whoWeAre && (
        <Section>
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <div className="eyebrow mb-5">{home.whoWeAre.eyebrow}</div>
              <h2 className="text-3xl font-display font-light leading-[1.08] md:text-5xl">
                {home.whoWeAre.title} <em className="italic text-gold">{home.whoWeAre.emphasis}</em>
                .
              </h2>
            </div>
            <div className="lg:col-span-5">
              <p className="text-lg leading-relaxed text-muted-foreground">
                {home.whoWeAre.subtitle}
              </p>
              <div className="mt-10 grid grid-cols-3 gap-3 border-y border-border py-6">
                {home.metrics.map((s) => (
                  <div key={s.l}>
                    <div className="text-3xl font-display text-gold md:text-4xl">{s.n}</div>
                    <div className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">
                      {s.l}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>
      )}

      {home.sections.services && (
        <Section className="surface-band py-12 md:py-16">
          <SectionHeader
            eyebrow={home.servicesSection.eyebrow}
            title={
              <>
                {home.servicesSection.title}{" "}
                <em className="italic text-gold">{home.servicesSection.emphasis}</em>{" "}
                {home.servicesSection.suffix}
              </>
            }
            subtitle={home.servicesSection.subtitle}
            className="!mb-8 md:!mb-10"
          />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s, i) => {
              const icons = [Camera, Film, Sparkles, Aperture, Camera, Film, Sparkles, Aperture];
              const Icon = icons[i];
              return (
                <Link
                  key={s.slug}
                  href="/services"
                  className="group relative min-h-[285px] overflow-hidden rounded-[1.35rem] border border-border/70 bg-card transition-all hover:-translate-y-1 hover:border-gold/60 hover:shadow-cinematic md:min-h-[310px]"
                >
                  <Image
                    src={s.image}
                    alt={s.title}
                    loading="lazy"
                    width={900}
                    height={700}
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className={`image-polish absolute inset-0 h-full w-full object-cover ${s.position} group-hover:scale-105`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/72 to-ink/10" />
                  <div className="absolute inset-0 flex flex-col justify-between p-5">
                    <Icon className="size-6 text-gold" />
                    <div>
                      <h3 className="text-xl font-display">{s.title}</h3>
                      <p className="mt-2 line-clamp-3 text-sm leading-6 text-foreground/65">
                        {s.short}
                      </p>
                      <div className="mt-4 inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors group-hover:text-gold">
                        {home.servicesSection.cardLinkText} <ArrowUpRight className="size-3" />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </Section>
      )}

      {home.sections.selectedWork && (
        <Section className="py-12 md:py-16">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4 md:mb-10">
            <div className="max-w-xl">
              <div className="eyebrow mb-4">{home.selectedWorkSection.eyebrow}</div>
              <h2 className="text-4xl font-display font-light md:text-5xl">
                {home.selectedWorkSection.title}{" "}
                <em className="italic text-gold">{home.selectedWorkSection.emphasis}</em>{" "}
                {home.selectedWorkSection.suffix}
              </h2>
            </div>
            <Link
              href={home.selectedWorkSection.href}
              className="inline-flex items-center gap-2 text-sm text-gold hover:underline"
            >
              {home.selectedWorkSection.linkText} <ArrowUpRight className="size-4" />
            </Link>
          </div>
          <div className="grid auto-rows-[220px] gap-3 md:auto-rows-[240px] md:grid-cols-4">
            {portfolio.map((p, i) => (
              <div
                key={p.title}
                className={`group relative overflow-hidden rounded-[1.35rem] border border-border/70 ${
                  i === 0 ? "md:col-span-2 md:row-span-2" : i === 3 ? "md:col-span-2" : ""
                }`}
              >
                <Image
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  width={1200}
                  height={900}
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className={`image-polish absolute inset-0 h-full w-full object-cover ${p.position} group-hover:scale-105`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/30 to-transparent opacity-80 transition-opacity group-hover:opacity-100" />
                <div className="absolute inset-0 flex flex-col justify-end p-5">
                  <div className="mb-2 text-xs uppercase tracking-widest text-gold">
                    {p.category}
                  </div>
                  <h3 className="text-2xl font-display">{p.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {p.location} / {p.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}

      {home.sections.productions && (
        <Section className="surface-band py-12 md:py-16">
          <SectionHeader
            eyebrow={home.productionsSection.eyebrow}
            title={
              <>
                {home.productionsSection.title}{" "}
                <em className="italic text-gold">{home.productionsSection.emphasis}</em>
                {home.productionsSection.suffix}
              </>
            }
            className="!mb-8 md:!mb-10"
          />
          <div className="grid gap-3 md:grid-cols-2">
            {productions.map((p) => (
              <Link
                key={p.title}
                href={home.productionsSection.href}
                className="group relative aspect-[16/10] overflow-hidden border border-border"
              >
                <Image
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  width={1200}
                  height={800}
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="absolute inset-0 h-full w-full object-cover object-center saturate-[1.04] contrast-[1.03] transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                  <div className="mb-3 text-xs uppercase tracking-widest text-gold">{p.type}</div>
                  <h3 className="text-3xl font-display md:text-4xl">{p.title}</h3>
                  <p className="mt-2 max-w-md text-muted-foreground">{p.description}</p>
                  <div className="mt-4 inline-flex items-center gap-2 text-sm text-gold">
                    <Play className="size-4" /> {home.productionsSection.linkText}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Section>
      )}

      {home.sections.youtube && (
        <Section className="py-12 md:py-16">
          <SectionHeader
            eyebrow={home.youtubeSection.eyebrow}
            title={
              <>
                {home.youtubeSection.title}{" "}
                <em className="italic text-gold">{home.youtubeSection.emphasis}</em>
                {home.youtubeSection.suffix}
              </>
            }
            className="!mb-8 md:!mb-10"
          />
          <div className="grid gap-3 md:grid-cols-3">
            {home.youtubeSection.videos.map((v) => (
              <div key={v.id} className="space-y-2.5">
                <YouTubeEmbed id={v.id} title={v.title} />
                <h3 className="text-xl font-display">{v.title}</h3>
              </div>
            ))}
          </div>
        </Section>
      )}

      {home.sections.news && (
        <Section className="surface-band py-12 md:py-16">
          <div className="mb-8 flex items-end justify-between md:mb-10">
            <SectionHeader
              eyebrow={home.newsSection.eyebrow}
              title={
                <>
                  {home.newsSection.title}{" "}
                  <em className="italic text-gold">{home.newsSection.emphasis}</em>
                  {home.newsSection.suffix}
                </>
              }
              className="!mb-0"
            />
            <Link
              href={home.newsSection.href}
              className="hidden items-center gap-2 text-sm text-gold hover:underline sm:inline-flex"
            >
              {home.newsSection.linkText} <ArrowUpRight className="size-4" />
            </Link>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {blogPosts.map((b) => (
              <Link key={b.title} href="/news" className="group">
                <div className="mb-3 aspect-[4/3] overflow-hidden border border-border">
                  <Image
                    src={b.image}
                    alt={b.title}
                    loading="lazy"
                    width={900}
                    height={700}
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className={`h-full w-full object-cover ${b.position} saturate-[1.05] contrast-[1.03] transition-transform duration-700 group-hover:scale-105`}
                  />
                </div>
                <div className="mb-2 text-xs uppercase tracking-widest text-gold">{b.category}</div>
                <h3 className="text-xl font-display transition-colors group-hover:text-gold">
                  {b.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{b.excerpt}</p>
              </Link>
            ))}
          </div>
        </Section>
      )}

      {home.sections.testimonials && (
        <Section className="py-12 md:py-16">
          <SectionHeader
            eyebrow={home.testimonialsSection.eyebrow}
            align="center"
            title={
              <>
                {home.testimonialsSection.title}{" "}
                <em className="italic text-gold">{home.testimonialsSection.emphasis}</em>{" "}
                {home.testimonialsSection.suffix}
              </>
            }
            className="!mb-8 md:!mb-10"
          />
          <div className="grid gap-3 md:grid-cols-3">
            {testimonials.map((t) => (
              <Card key={t.name} as="figure" className="p-6 hover:border-gold/40">
                <Quote className="mb-4 size-6 text-gold" />
                <blockquote className="text-base leading-relaxed text-foreground/90">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-5 border-t border-border pt-5">
                  <CheckCircle2 className="mb-2 size-4 text-gold" />
                  <div className="font-medium">{t.name}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{t.role}</div>
                </figcaption>
              </Card>
            ))}
          </div>
        </Section>
      )}

      {home.sections.cta && (
        <CTA
          className="py-12 md:py-16"
          panelClassName="p-7 md:p-12"
          eyebrow={home.cta.eyebrow}
          title={home.cta.title}
          subtitle={home.cta.subtitle}
          buttonText={home.cta.buttonText}
          to={home.cta.to}
        />
      )}

      {home.sections.hiddenImage && (
        <Image
          src={home.hiddenImage.src}
          alt={home.hiddenImage.alt}
          width={1}
          height={1}
          className="hidden"
        />
      )}
    </>
  );
}
