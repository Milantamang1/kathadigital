import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { PageHero, Section } from "@/components/site/Section";
import { blogPosts } from "@/lib/site-data";

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [
      { title: "News & Blog - Katha Digital" },
      { name: "description", content: "Stories, production notes, photography tips, and behind-the-scenes from the Katha Digital team." },
      { property: "og:title", content: "News & Blog - Katha Digital" },
      { property: "og:description", content: "Stories, tips, and behind-the-scenes." },
    ],
  }),
  component: NewsPage,
});

function NewsPage() {
  const [featured, ...rest] = blogPosts;

  return (
    <>
      <PageHero
        eyebrow="Journal"
        title={<>News & <em className="italic text-gold">Blog</em>.</>}
        subtitle="Field notes from shoots, practical guides for clients, and thoughtful observations from the Katha Digital team."
        className="pb-10 md:pb-14"
      />

      <Section className="relative overflow-hidden py-16 md:py-24">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_80%_0%,oklch(0.80_0.13_82/0.10),transparent_30%),linear-gradient(180deg,oklch(0.13_0.01_60/0.35),transparent_45%)]" />

        {featured && (
          <article className="group mb-12 grid overflow-hidden rounded-[2rem] border border-border/70 bg-card/85 shadow-[0_30px_95px_-54px_oklch(0_0_0/0.88)] ring-1 ring-white/5 transition-colors hover:border-gold/45 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="aspect-[16/10] overflow-hidden bg-ink lg:aspect-auto">
              <img
                src={featured.image}
                alt={featured.title}
                loading="lazy"
                className="h-full w-full object-cover object-center saturate-[1.05] contrast-[1.03] transition-transform duration-700 group-hover:scale-[1.03]"
              />
            </div>
            <div className="flex flex-col justify-center p-6 md:p-10">
              <div className="mb-3 text-xs uppercase tracking-widest text-gold">Featured / {featured.category}</div>
              <h2 className="font-display text-3xl font-light leading-tight md:text-5xl">{featured.title}</h2>
              <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base">{featured.excerpt}</p>
              <div className="mt-5 text-xs uppercase tracking-widest text-muted-foreground">
                {featured.author} / {featured.date}
              </div>
              <a href="#" className="mt-6 inline-flex w-fit items-center gap-2 text-sm font-medium text-gold transition-all hover:gap-3">
                Read More <ArrowUpRight className="size-4" />
              </a>
            </div>
          </article>
        )}

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((post) => (
            <article key={post.title} className="group rounded-[1.5rem] border border-border/60 bg-card/45 p-3 shadow-[0_22px_70px_-50px_oklch(0_0_0/0.82)] ring-1 ring-white/5 transition-all duration-300 hover:-translate-y-1 hover:border-gold/40">
              <div className="mb-4 aspect-[4/3] overflow-hidden rounded-[1.15rem] border border-border/50 bg-ink">
                <img
                  src={post.image}
                  alt={post.title}
                  loading="lazy"
                  className="h-full w-full object-cover object-center saturate-[1.05] contrast-[1.03] transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>
              <div className="px-2 pb-3">
                <div className="mb-2 text-xs uppercase tracking-widest text-gold">{post.category}</div>
                <h3 className="font-display text-2xl leading-tight transition-colors group-hover:text-gold">{post.title}</h3>
                <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">{post.excerpt}</p>
                <div className="mt-3 text-xs uppercase tracking-widest text-muted-foreground">
                  {post.author} / {post.date}
                </div>
                <a href="#" className="mt-4 inline-flex items-center gap-1.5 text-sm text-gold transition-all group-hover:gap-2.5">
                  Read More <ArrowUpRight className="size-3" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
