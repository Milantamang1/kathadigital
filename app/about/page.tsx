import Image from "next/image";
import { Camera, CheckCircle2, Eye, Film, Quote, Sparkles, Target } from "lucide-react";
import { PageHero, Section, SectionHeader } from "@/components/site/Section";
import { CTA } from "@/components/site/CTA";
import { Card } from "@/components/site/Card";
import { defaultAboutContent, getPublishedAboutContent } from "@/lib/cms/about-content";

const principleIcons = {
  Eye,
  Target,
  Sparkles,
};

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const about = await getPublishedAboutContent().catch(() => defaultAboutContent);

  return about.metadata;
}

export default async function AboutPage() {
  const about = await getPublishedAboutContent().catch(() => defaultAboutContent);

  return (
    <>
      {about.sections.hero && (
        <PageHero
          eyebrow={about.hero.eyebrow}
          title={
            <>
              {about.hero.title} <em className="italic text-gold">{about.hero.emphasis}</em>
            </>
          }
          subtitle={about.hero.subtitle}
          className="pb-10 md:pb-14"
        />
      )}

      {about.sections.studio && (
        <Section className="py-12 md:py-16">
          <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <div className="eyebrow mb-4">{about.studio.eyebrow}</div>
              <h2 className="max-w-3xl font-display text-4xl font-light leading-[1.06] md:text-5xl">
                {about.studio.title}
              </h2>
              <div className="mt-6 grid gap-4 text-base leading-relaxed text-muted-foreground md:text-lg">
                {about.studio.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <div className="mt-7 grid gap-3 border-y border-border py-5 sm:grid-cols-3">
                {about.studio.steps.map(([num, label]) => (
                  <div key={num}>
                    <div className="font-display text-3xl text-gold">{num}</div>
                    <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-border shadow-cinematic">
                <Image
                  src={about.studio.image}
                  alt={about.studio.imageAlt}
                  loading="lazy"
                  width={900}
                  height={1125}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/65 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-ink/60 px-4 py-2 text-sm text-white backdrop-blur">
                    <Camera className="size-4 text-gold" />
                    {about.studio.imageBadge}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Section>
      )}

      {about.sections.principles && (
        <Section className="bg-ink/40 py-12 md:py-16">
          <div className="grid gap-4 lg:grid-cols-3">
            {about.principles.map((item) => {
              const Icon = principleIcons[item.iconKey];
              return (
                <div
                  key={item.eyebrow}
                  className="rounded-2xl border border-border bg-card/90 p-6 md:p-7"
                >
                  <Icon className="mb-5 size-7 text-gold" />
                  <div className="eyebrow mb-3">{item.eyebrow}</div>
                  <h3 className="font-display text-2xl font-light leading-tight">{item.title}</h3>
                  <p className="mt-4 text-sm leading-6 text-muted-foreground">{item.text}</p>
                </div>
              );
            })}
          </div>
        </Section>
      )}

      {about.sections.founder && (
        <Section className="py-12 md:py-16">
          <SectionHeader
            eyebrow={about.founder.eyebrow}
            title={
              <>
                {about.founder.title} <em className="italic text-gold">{about.founder.emphasis}</em>
                {about.founder.suffix}
              </>
            }
            className="!mb-8 md:!mb-10"
          />
          <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <div className="aspect-[4/5] overflow-hidden rounded-2xl border border-border shadow-cinematic">
                <Image
                  src={about.founder.image}
                  alt={about.founder.imageAlt}
                  loading="lazy"
                  width={900}
                  height={1125}
                  className="h-full w-full object-cover object-top"
                />
              </div>
            </div>
            <div className="lg:col-span-7">
              <Quote className="mb-5 size-9 text-gold" />
              <p className="font-display text-2xl font-light leading-snug md:text-3xl">
                {about.founder.quote}
              </p>
              <div className="mt-7 grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
                {about.founder.bullets.map((item) => (
                  <div key={item} className="flex gap-2">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-gold" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-7 border-t border-border pt-5">
                <div className="font-display text-xl">{about.founder.name}</div>
                <div className="text-sm text-muted-foreground">{about.founder.role}</div>
              </div>
            </div>
          </div>
        </Section>
      )}

      {about.sections.team && (
        <Section className="bg-ink/40 py-12 md:py-16">
          <SectionHeader
            eyebrow={about.team.eyebrow}
            title={
              <>
                {about.team.title} <em className="italic text-gold">{about.team.emphasis}</em>{" "}
                {about.team.suffix}
              </>
            }
            subtitle={about.team.subtitle}
            className="!mb-8 md:!mb-10"
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {about.team.members.map((member) => (
              <Card
                key={member.name}
                className="group overflow-hidden p-3 hover:-translate-y-1 hover:border-gold/45"
              >
                <div className="relative aspect-[3/4] overflow-hidden rounded-[1.35rem] border border-border/70 bg-ink shadow-[inset_0_1px_0_oklch(1_0_0/0.06)]">
                  <Image
                    src={member.image}
                    alt={member.name}
                    loading="lazy"
                    width={900}
                    height={1200}
                    sizes="(min-width: 1024px) 23vw, (min-width: 640px) 46vw, 92vw"
                    className={`h-full w-full object-cover ${member.position} transition-transform duration-700 group-hover:scale-105`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/82 via-ink/12 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-72" />
                  <div className="absolute left-4 top-4 grid size-9 place-items-center rounded-full border border-gold/30 bg-ink/58 text-gold shadow-[0_10px_34px_-18px_oklch(0.8_0.13_82/0.7)] backdrop-blur-md">
                    <Film className="size-4" />
                  </div>
                </div>
                <div className="px-2 pb-3 pt-5">
                  <div className="font-display text-xl leading-tight text-foreground">
                    {member.name}
                  </div>
                  <div className="mt-2 text-xs uppercase tracking-[0.22em] text-gold/85">
                    {member.role}
                  </div>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{member.note}</p>
                </div>
              </Card>
            ))}
          </div>
        </Section>
      )}

      {about.sections.cta && (
        <CTA
          className="py-12 md:py-16"
          panelClassName="p-7 md:p-12"
          eyebrow={about.cta.eyebrow}
          title={about.cta.title}
          subtitle={about.cta.subtitle}
          buttonText={about.cta.buttonText}
          to={about.cta.to}
        />
      )}
    </>
  );
}
