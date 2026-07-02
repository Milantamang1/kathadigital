import Image from "next/image";
import { Camera, CheckCircle2, Eye, Film, Quote, Sparkles, Target } from "lucide-react";
import { PageHero, Section, SectionHeader } from "@/components/site/Section";
import { CTA } from "@/components/site/CTA";
import { Card } from "@/components/site/Card";

const founderImg = "/katha-media/founder.jpg";
const sunilImg = "/katha-media/sunil-shrestha.jpg";

export const metadata = {
  title: "About",
  description:
    "Meet Katha Digital, a creative media studio for photography, cinematography, events, productions, and digital storytelling.",
  openGraph: {
    title: "About Katha Digital",
    description:
      "A creative media team built around thoughtful planning, cinematic craft, and honest visual storytelling.",
  },
};

const principles = [
  {
    icon: Eye,
    eyebrow: "Vision",
    title: "Stories that feel honest, cinematic, and human.",
    text: "We want Katha Digital to be known for visual work that carries emotion first, then technique. Every project should feel personal, polished, and worth returning to.",
  },
  {
    icon: Target,
    eyebrow: "Mission",
    title: "A reliable creative partner from idea to final delivery.",
    text: "We plan, shoot, edit, and deliver photography, films, events, productions, and digital content with a calm process and a strong eye for detail.",
  },
  {
    icon: Sparkles,
    eyebrow: "Craft",
    title: "Premium visuals without losing the real moment.",
    text: "Our work balances direction and natural emotion, so people feel comfortable on camera and the final story still feels true.",
  },
] as const;

const teamMembers = [
  {
    name: "Sunil Shrestha",
    role: "Founder - Cinematographer",
    note: "Leads creative direction, client storytelling, and cinematic execution.",
    image: "/katha-media/sunil-team.jpg",
    position: "object-[52%_30%]",
  },
  {
    name: "Nabin K Shrestha",
    role: "Director",
    note: "Directs each project with a strong focus on storytelling, emotion, visual style, and client experience.",
    image: "/katha-media/team-nabin-director.jpeg",
    position: "object-[50%_32%]",
  },
  {
    name: "Prabin Khatri",
    role: "Cinematographer",
    note: "Handles camera work, lighting, composition, and cinematic visuals to bring every moment to life.",
    image: "/katha-media/team-prabin-cinematographer.jpeg",
    position: "object-[38%_42%]",
  },
  {
    name: "Lovin Ansari",
    role: "Presenter",
    note: "Hosts and presents each story with confidence, warmth, and clear communication to connect with the audience.",
    image: "/katha-media/team-lovin-presenter.jpeg",
    position: "object-[50%_24%]",
  },
] as const;

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title={
          <>
            About <em className="italic text-gold">Katha Digital</em>
          </>
        }
        subtitle="A cinematic media studio for people, brands, events, and stories that deserve to be remembered with precision and feeling."
        className="pb-10 md:pb-14"
      />

      <Section className="py-12 md:py-16">
        <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <div className="eyebrow mb-4">Who we are</div>
            <h2 className="max-w-3xl font-display text-4xl font-light leading-[1.06] md:text-5xl">
              We transform real moments into visual stories with emotional intelligence, clean
              direction, and cinematic polish.
            </h2>
            <div className="mt-6 grid gap-4 text-base leading-relaxed text-muted-foreground md:text-lg">
              <p>
                Katha Digital works across weddings, events, commercial shoots, documentaries, talk
                shows, travel stories, music videos, and social campaigns. The format changes, but
                the intention stays the same: understand the story before touching the camera.
              </p>
              <p>
                Our team combines planning, direction, photography, cinematography, editing, and
                delivery into one focused workflow, so every project feels calm for the client and
                considered on screen.
              </p>
            </div>
            <div className="mt-7 grid gap-3 border-y border-border py-5 sm:grid-cols-3">
              {[
                ["01", "Plan the story"],
                ["02", "Capture with care"],
                ["03", "Deliver with polish"],
              ].map(([num, label]) => (
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
                src={founderImg}
                alt="Katha Digital production moment"
                loading="lazy"
                width={900}
                height={1125}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/65 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-ink/60 px-4 py-2 text-sm text-white backdrop-blur">
                  <Camera className="size-4 text-gold" />
                  Photography, film, and digital production
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section className="bg-ink/40 py-12 md:py-16">
        <div className="grid gap-4 lg:grid-cols-3">
          {principles.map((item) => (
            <div
              key={item.eyebrow}
              className="rounded-2xl border border-border bg-card/90 p-6 md:p-7"
            >
              <item.icon className="mb-5 size-7 text-gold" />
              <div className="eyebrow mb-3">{item.eyebrow}</div>
              <h3 className="font-display text-2xl font-light leading-tight">{item.title}</h3>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">{item.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="py-12 md:py-16">
        <SectionHeader
          eyebrow="From the Founder"
          title={
            <>
              A note from <em className="italic text-gold">Sunil Shrestha</em>.
            </>
          }
          className="!mb-8 md:!mb-10"
        />
        <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <div className="aspect-[4/5] overflow-hidden rounded-2xl border border-border shadow-cinematic">
              <Image
                src={sunilImg}
                alt="Sunil Shrestha"
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
              A camera can record what happened, but a thoughtful team can preserve what it felt
              like. That is the standard we bring to every wedding, event, interview, brand film,
              music video, and documentary we create.
            </p>
            <div className="mt-7 grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
              {[
                "Clear communication before every shoot",
                "Calm direction for natural on-camera moments",
                "Cinematic editing with emotional rhythm",
                "Delivery prepared for web, social, and archive",
              ].map((item) => (
                <div key={item} className="flex gap-2">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-gold" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-7 border-t border-border pt-5">
              <div className="font-display text-xl">Sunil Shrestha</div>
              <div className="text-sm text-muted-foreground">
                Founder - Photographer & Cinematographer
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section className="bg-ink/40 py-12 md:py-16">
        <SectionHeader
          eyebrow="The Team"
          title={
            <>
              The <em className="italic text-gold">people</em> behind the lens.
            </>
          }
          subtitle="A compact crew with clear roles, steady communication, and a shared eye for story."
          className="!mb-8 md:!mb-10"
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map((member) => (
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

      <CTA className="py-12 md:py-16" panelClassName="p-7 md:p-12" />
    </>
  );
}
