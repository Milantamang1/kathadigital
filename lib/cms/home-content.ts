import type { Prisma } from "@prisma/client";
import {
  blogPosts as staticBlogPosts,
  portfolio as staticPortfolio,
  productions as staticProductions,
  services as staticServices,
  testimonials as staticTestimonials,
} from "@/lib/site-data";
import { prisma } from "./db";

export const HOME_CONTENT_ID = "home";

export type HomeContentValue = {
  metadata: {
    title: string;
    description: string;
    openGraph: {
      title: string;
      description: string;
    };
  };
  heroImg: string;
  heroAlt: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  actions: { label: string; href: string; variant: "primary" | "secondary" | "ghost" }[];
  sideLabel: string;
  metrics: { n: string; l: string }[];
  whoWeAre: {
    eyebrow: string;
    title: string;
    emphasis: string;
    subtitle: string;
  };
  servicesSection: {
    eyebrow: string;
    title: string;
    emphasis: string;
    suffix: string;
    subtitle: string;
    cardLinkText: string;
    limit: number;
  };
  selectedWorkSection: {
    eyebrow: string;
    title: string;
    emphasis: string;
    suffix: string;
    linkText: string;
    href: string;
    limit: number;
  };
  productionsSection: {
    eyebrow: string;
    title: string;
    emphasis: string;
    suffix: string;
    linkText: string;
    href: string;
    limit: number;
  };
  youtubeSection: {
    eyebrow: string;
    title: string;
    emphasis: string;
    suffix: string;
    videos: { id: string; title: string }[];
  };
  newsSection: {
    eyebrow: string;
    title: string;
    emphasis: string;
    suffix: string;
    linkText: string;
    href: string;
    limit: number;
  };
  testimonialsSection: {
    eyebrow: string;
    title: string;
    emphasis: string;
    suffix: string;
  };
  cta: {
    eyebrow: string;
    title: string;
    subtitle: string;
    buttonText: string;
    to: string;
  };
  hiddenImage: {
    src: string;
    alt: string;
  };
  sections: {
    hero: boolean;
    whoWeAre: boolean;
    services: boolean;
    selectedWork: boolean;
    productions: boolean;
    youtube: boolean;
    news: boolean;
    testimonials: boolean;
    cta: boolean;
    hiddenImage: boolean;
  };
};

export const defaultHomeContent: HomeContentValue = {
  metadata: {
    title: "Katha Digital - Premium Cinematic Production Studio",
    description:
      "Premium photography, cinematography, wedding films, productions, events, and digital media by Katha Digital.",
    openGraph: {
      title: "Katha Digital",
      description:
        "Premium cinematic stories for weddings, brands, events, and original productions.",
    },
  },
  heroImg: "/katha-media/mountain-view-trip.jpeg",
  heroAlt: "Cinematic photographer with golden bokeh",
  eyebrow: "Katha Digital - Cinematic Production Studio",
  title: "Premium films and photography with emotional clarity.",
  subtitle:
    "Wedding films, event coverage, talk shows, music videos, brand stories, and digital productions crafted with cinematic restraint and a polished studio finish.",
  actions: [
    { label: "Book Now", href: "/book-now", variant: "primary" },
    { label: "View Portfolio", href: "/portfolio", variant: "secondary" },
    { label: "Watch Films", href: "/productions", variant: "ghost" },
  ],
  sideLabel: "Full-service cinematic production",
  metrics: [
    { n: "500+", l: "Visual Stories" },
    { n: "120+", l: "Wedding Films" },
    { n: "8yr", l: "Production Craft" },
  ],
  whoWeAre: {
    eyebrow: "Who We Are",
    title: "Katha Digital is a production studio for",
    emphasis: "cinematic memories, brands, and original shows",
    subtitle:
      "From intimate weddings and editorial portraits to talk shows, travel stories, events, music videos, and brand films, we build visual work that feels composed, emotional, and ready for every screen.",
  },
  servicesSection: {
    eyebrow: "What We Do",
    title: "Premium",
    emphasis: "production services",
    suffix: "for every story.",
    subtitle:
      "Eight disciplines, one creative team. From intimate portraits to multi-camera productions, every project is shaped with planning, direction, and a clean final finish.",
    cardLinkText: "Learn more",
    limit: 8,
  },
  selectedWorkSection: {
    eyebrow: "Selected Work",
    title: "Recent",
    emphasis: "work",
    suffix: "with presence.",
    linkText: "View full portfolio",
    href: "/portfolio",
    limit: 6,
  },
  productionsSection: {
    eyebrow: "Original Productions",
    title: "Original formats built with",
    emphasis: "cinematic rhythm",
    suffix: ".",
    linkText: "Watch episodes",
    href: "/productions",
    limit: 2,
  },
  youtubeSection: {
    eyebrow: "On YouTube",
    title: "Featured",
    emphasis: "films",
    suffix: ".",
    videos: [
      { id: "4akCjtmezHE", title: "Wedding Cinematography" },
      { id: "Ju5HDbTcXMs", title: "Aerial Cinematography" },
      { id: "ghe6mWFUw4c", title: "Music Video" },
    ],
  },
  newsSection: {
    eyebrow: "Latest",
    title: "News &",
    emphasis: "journal",
    suffix: ".",
    linkText: "All posts",
    href: "/news",
    limit: 3,
  },
  testimonialsSection: {
    eyebrow: "Kind Words",
    title: "What",
    emphasis: "clients",
    suffix: "say.",
  },
  cta: {
    eyebrow: "Let's build the frame",
    title: "Ready to make your story look unforgettable?",
    subtitle:
      "Bring us the moment, the brand, or the idea. We will shape it with cinematic craft, calm direction, and a polished final delivery.",
    buttonText: "Book Now",
    to: "/book-now",
  },
  hiddenImage: {
    src: "/katha-media/wedding-hidden.jpg",
    alt: "",
  },
  sections: {
    hero: true,
    whoWeAre: true,
    services: true,
    selectedWork: true,
    productions: true,
    youtube: true,
    news: true,
    testimonials: true,
    cta: true,
    hiddenImage: true,
  },
};

export function homeContentToCreateInput(
  content: HomeContentValue = defaultHomeContent,
): Prisma.HomeContentCreateInput {
  return {
    id: HOME_CONTENT_ID,
    metadata: content.metadata,
    heroImg: content.heroImg,
    heroAlt: content.heroAlt,
    eyebrow: content.eyebrow,
    title: content.title,
    subtitle: content.subtitle,
    actions: content.actions,
    sideLabel: content.sideLabel,
    metrics: content.metrics,
    whoWeAre: content.whoWeAre,
    servicesSection: content.servicesSection,
    selectedWorkSection: content.selectedWorkSection,
    productionsSection: content.productionsSection,
    youtubeSection: content.youtubeSection,
    newsSection: content.newsSection,
    testimonialsSection: content.testimonialsSection,
    cta: content.cta,
    hiddenImage: content.hiddenImage,
    sections: content.sections,
    status: "PUBLISHED",
    publishedAt: new Date("2026-07-16T00:00:00.000Z"),
  };
}

export function homeContentToValue(record: Prisma.HomeContentGetPayload<object>): HomeContentValue {
  return {
    metadata: record.metadata as HomeContentValue["metadata"],
    heroImg: record.heroImg,
    heroAlt: record.heroAlt,
    eyebrow: record.eyebrow,
    title: record.title,
    subtitle: record.subtitle,
    actions: record.actions as HomeContentValue["actions"],
    sideLabel: record.sideLabel,
    metrics: record.metrics as HomeContentValue["metrics"],
    whoWeAre: record.whoWeAre as HomeContentValue["whoWeAre"],
    servicesSection: record.servicesSection as HomeContentValue["servicesSection"],
    selectedWorkSection: record.selectedWorkSection as HomeContentValue["selectedWorkSection"],
    productionsSection: record.productionsSection as HomeContentValue["productionsSection"],
    youtubeSection: record.youtubeSection as HomeContentValue["youtubeSection"],
    newsSection: record.newsSection as HomeContentValue["newsSection"],
    testimonialsSection: record.testimonialsSection as HomeContentValue["testimonialsSection"],
    cta: record.cta as HomeContentValue["cta"],
    hiddenImage: record.hiddenImage as HomeContentValue["hiddenImage"],
    sections: record.sections as HomeContentValue["sections"],
  };
}

export async function getPublishedHomeContent() {
  const record = await prisma.homeContent.findUnique({
    where: { id: HOME_CONTENT_ID },
  });

  if (!record || record.status !== "PUBLISHED") {
    return defaultHomeContent;
  }

  return homeContentToValue(record);
}

export async function getEditableHomeContent() {
  const record = await prisma.homeContent.findUnique({
    where: { id: HOME_CONTENT_ID },
  });

  return record ? homeContentToValue(record) : defaultHomeContent;
}

export async function getHomepageData() {
  try {
    const home = await getPublishedHomeContent();
    const [services, portfolio, productions, blogPosts, testimonials] = await Promise.all([
      prisma.service.findMany({
        where: { status: "PUBLISHED" },
        orderBy: [{ displayOrder: "asc" }, { createdAt: "asc" }],
        take: home.servicesSection.limit,
      }),
      prisma.portfolioProject.findMany({
        where: { status: "PUBLISHED" },
        orderBy: [{ displayOrder: "asc" }, { createdAt: "asc" }],
        take: home.selectedWorkSection.limit,
      }),
      prisma.production.findMany({
        where: { status: "PUBLISHED" },
        orderBy: [{ displayOrder: "asc" }, { createdAt: "asc" }],
        take: home.productionsSection.limit,
      }),
      prisma.newsPost.findMany({
        where: { status: "PUBLISHED" },
        orderBy: [{ displayOrder: "asc" }, { createdAt: "asc" }],
        take: home.newsSection.limit,
      }),
      prisma.testimonial.findMany({
        where: { status: "PUBLISHED" },
        orderBy: [{ displayOrder: "asc" }, { createdAt: "asc" }],
      }),
    ]);

    return {
      home,
      services: services.map((service) => ({
        slug: service.slug,
        title: service.title,
        short: service.short ?? service.shortDescription ?? "",
        image: service.image ?? service.imageUrl ?? "",
        position: service.position ?? "object-center",
      })),
      portfolio: portfolio.map((project) => ({
        title: project.title,
        category: project.category,
        location: project.location ?? "",
        date: project.dateLabel ?? "",
        desc: project.desc ?? project.description ?? "",
        image: project.image ?? project.imageUrl ?? "",
        position: project.position ?? "object-center",
      })),
      productions: productions.map((production) => ({
        title: production.title,
        type: production.type ?? "",
        description: production.description ?? "",
        image: production.image ?? production.imageUrl ?? "",
      })),
      blogPosts: blogPosts.map((post) => ({
        title: post.title,
        category: post.category ?? "",
        excerpt: post.excerpt ?? "",
        image: post.image ?? post.imageUrl ?? "",
        position: post.position ?? "object-center",
      })),
      testimonials,
    };
  } catch (error) {
    console.error(error);
    return {
      home: defaultHomeContent,
      services: staticServices,
      portfolio: staticPortfolio,
      productions: [staticProductions.kathaMeroPani, staticProductions.gantavya],
      blogPosts: staticBlogPosts,
      testimonials: staticTestimonials,
    };
  }
}
