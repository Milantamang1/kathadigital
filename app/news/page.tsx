import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { PageHero, Section } from "@/components/site/Section";
import { blogPosts } from "@/lib/site-data";

export const metadata = {
  title: "News & Blog",
  description:
    "Stories, production notes, photography tips, and behind-the-scenes from the Katha Digital team.",
  openGraph: {
    title: "News & Blog - Katha Digital",
    description: "Stories, tips, and behind-the-scenes.",
  },
};

export default function NewsPage() {
  const [featured, ...rest] = blogPosts;

  return (
    <>
      <PageHero
        eyebrow="Journal"
        title={
          <>
            News & <em className="italic text-gold">Blog</em>.
          </>
        }
        subtitle="Field notes from shoots, practical guides for clients, and thoughtful observations from the Katha Digital team."
        className="pb-10 md:pb-14"
      />

      <Section className="relative overflow-hidden py-14 md:py-20">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_76%_0%,oklch(0.80_0.13_82/0.13),transparent_32%),linear-gradient(180deg,oklch(0.13_0.01_60/0.44),transparent_48%)]" />

        {featured && (
          <article className="group mb-12 overflow-hidden rounded-[1.75rem] border border-border/70 bg-card/80 shadow-cinematic ring-1 ring-white/5 transition-all duration-300 hover:-translate-y-1 hover:border-gold/45 md:mb-14 lg:grid lg:grid-cols-[1.12fr_0.88fr]">
            <div className="relative aspect-[16/11] min-h-[20rem] overflow-hidden bg-ink lg:aspect-auto">
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                priority
                sizes="(min-width: 1024px) 56vw, 100vw"
                className={`object-cover ${featured.position} saturate-[1.06] contrast-[1.05] transition-transform duration-700 ease-out group-hover:scale-[1.035]`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/78 via-ink/10 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-ink/12 lg:to-ink/70" />
              <div className="absolute left-5 top-5 rounded-full border border-gold/35 bg-ink/70 px-3 py-1 text-[0.68rem] uppercase tracking-widest text-gold backdrop-blur-md">
                Featured
              </div>
            </div>
            <div className="relative flex flex-col justify-center p-6 md:p-10 lg:p-12">
              <div className="absolute inset-y-8 left-0 hidden w-px bg-gradient-to-b from-transparent via-gold/45 to-transparent lg:block" />
              <div className="mb-3 text-xs uppercase tracking-widest text-gold">
                {featured.category}
              </div>
              <h2 className="text-balance font-display text-3xl font-light leading-tight md:text-5xl">
                {featured.title}
              </h2>
              <p className="mt-5 text-sm leading-7 text-muted-foreground md:text-base">
                {featured.excerpt}
              </p>
              <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-xs uppercase tracking-widest text-foreground/50">
                <span>{featured.author}</span>
                <span>{featured.date}</span>
              </div>
              <a
                href="#"
                className="mt-7 inline-flex w-fit items-center gap-2 rounded-full border border-gold/35 bg-gold/10 px-4 py-2 text-sm font-medium text-gold transition-all hover:border-gold/65 hover:bg-gold/15"
              >
                Read More <ArrowUpRight className="size-4" />
              </a>
            </div>
          </article>
        )}

        <div className="mb-8 grid gap-4 border-y border-border/55 py-5 md:grid-cols-[0.7fr_1fr] md:items-end">
          <div>
            <div className="eyebrow mb-3">Latest Notes</div>
            <h2 className="font-display text-4xl font-light leading-tight md:text-5xl">
              Ideas from the <em className="italic text-gold">field</em>.
            </h2>
          </div>
          <p className="max-w-3xl text-sm leading-7 text-muted-foreground md:text-base">
            A tighter editorial grid for production tips, visual thinking, and behind-the-scenes
            moments from recent Katha Digital shoots.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((post) => (
            <article
              key={post.title}
              className="group overflow-hidden rounded-[1.35rem] border border-border/60 bg-card/55 p-2.5 shadow-[0_22px_70px_-48px_oklch(0_0_0/0.84)] ring-1 ring-white/5 transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:bg-card/80"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-[1rem] bg-ink">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(min-width: 1024px) 31vw, (min-width: 768px) 48vw, 100vw"
                  className={`object-cover ${post.position} saturate-[1.05] contrast-[1.04] transition-transform duration-700 ease-out group-hover:scale-[1.04]`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/68 via-transparent to-transparent opacity-80" />
                <div className="absolute left-4 top-4 rounded-full border border-gold/30 bg-ink/62 px-3 py-1 text-[0.65rem] uppercase tracking-widest text-gold backdrop-blur-md">
                  {post.category}
                </div>
              </div>
              <div className="px-2 pb-4 pt-5">
                <h3 className="text-balance font-display text-2xl font-light leading-tight transition-colors group-hover:text-gold">
                  {post.title}
                </h3>
                <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">
                  {post.excerpt}
                </p>
                <div className="mt-5 flex flex-wrap gap-x-3 gap-y-1 text-[0.68rem] uppercase tracking-widest text-foreground/48">
                  <span>{post.author}</span>
                  <span>{post.date}</span>
                </div>
                <a
                  href="#"
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-gold transition-all group-hover:gap-2.5"
                >
                  Read More <ArrowUpRight className="size-3.5" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
