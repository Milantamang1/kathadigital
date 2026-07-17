import { z } from "zod";
import {
  commonContentFieldsSchema,
  mediaReferenceSchema,
  optionalMediaReferenceSchema,
  slugSchema,
} from "./validation";

const requiredTextSchema = z.string().trim().min(1).max(1000);
const positiveLimitSchema = z.coerce.number().int().min(1).max(12);

export const serviceSchema = commonContentFieldsSchema.extend({
  title: z.string().trim().min(1).max(160),
  slug: slugSchema,
  short: z.string().trim().min(1).max(600),
  image: mediaReferenceSchema,
  position: z.string().trim().min(1).max(80),
});

export const portfolioProjectSchema = commonContentFieldsSchema.extend({
  title: z.string().trim().min(1).max(180),
  slug: slugSchema,
  category: z.string().trim().min(1).max(80),
  location: z.string().trim().min(1).max(120),
  date: z.string().trim().min(1).max(80),
  desc: z.string().trim().min(1).max(700),
  image: mediaReferenceSchema,
  position: z.string().trim().min(1).max(80),
});

export const productionSchema = commonContentFieldsSchema.extend({
  title: z.string().trim().min(1).max(180),
  slug: slugSchema,
  type: z.string().trim().min(1).max(100),
  description: z.string().trim().min(1).max(900),
  image: optionalMediaReferenceSchema,
  position: z.string().trim().min(1).max(80).optional(),
  youtubeId: z.string().trim().min(1).max(40).optional(),
  episodes: z.array(z.record(z.string(), z.string())).optional(),
  destinations: z.array(z.string().trim().min(1)).optional(),
});

export const newsPostSchema = commonContentFieldsSchema.extend({
  title: z.string().trim().min(1).max(180),
  slug: slugSchema,
  category: z.string().trim().min(1).max(80),
  date: z.string().trim().min(1).max(80),
  author: z.string().trim().min(1).max(120),
  excerpt: z.string().trim().min(1).max(800),
  image: mediaReferenceSchema,
  position: z.string().trim().min(1).max(80),
});

export const eventSchema = commonContentFieldsSchema.extend({
  name: z.string().trim().min(1).max(180),
  slug: slugSchema,
  date: z.string().trim().min(1).max(80),
  location: z.string().trim().min(1).max(160),
  desc: z.string().trim().min(1).max(800),
  image: mediaReferenceSchema,
  position: z.string().trim().min(1).max(80),
});

export const contactMessageSchema = z.object({
  name: z.string().trim().min(1).max(140),
  email: z.string().trim().email().max(180),
  phone: z.string().trim().max(60).optional(),
  subject: z.string().trim().max(180).optional(),
  message: z.string().trim().min(1).max(5000),
});

export const bookingInquirySchema = z.object({
  name: z.string().trim().min(1).max(140),
  email: z.string().trim().email().max(180).optional(),
  phone: z.string().trim().min(1).max(60),
  service: z.string().trim().max(160).optional(),
  eventDate: z.coerce.date().optional(),
  location: z.string().trim().max(180).optional(),
  budget: z.string().trim().max(120).optional(),
  message: z.string().trim().max(5000).optional(),
});

export const homeContentSchema = z.object({
  metadata: z.object({
    title: requiredTextSchema,
    description: requiredTextSchema,
    openGraph: z.object({
      title: requiredTextSchema,
      description: requiredTextSchema,
    }),
  }),
  heroImg: mediaReferenceSchema,
  heroAlt: z.string().trim().max(220),
  eyebrow: requiredTextSchema,
  title: requiredTextSchema,
  subtitle: requiredTextSchema,
  actions: z
    .array(
      z.object({
        label: requiredTextSchema,
        href: z.string().trim().min(1).max(120).startsWith("/"),
        variant: z.enum(["primary", "secondary", "ghost"]),
      }),
    )
    .length(3),
  sideLabel: requiredTextSchema,
  metrics: z
    .array(
      z.object({
        n: z.string().trim().min(1).max(40),
        l: z.string().trim().min(1).max(80),
      }),
    )
    .length(3),
  whoWeAre: z.object({
    eyebrow: requiredTextSchema,
    title: requiredTextSchema,
    emphasis: requiredTextSchema,
    subtitle: requiredTextSchema,
  }),
  servicesSection: z.object({
    eyebrow: requiredTextSchema,
    title: requiredTextSchema,
    emphasis: requiredTextSchema,
    suffix: requiredTextSchema,
    subtitle: requiredTextSchema,
    cardLinkText: requiredTextSchema,
    limit: positiveLimitSchema,
  }),
  selectedWorkSection: z.object({
    eyebrow: requiredTextSchema,
    title: requiredTextSchema,
    emphasis: requiredTextSchema,
    suffix: requiredTextSchema,
    linkText: requiredTextSchema,
    href: z.string().trim().min(1).max(120).startsWith("/"),
    limit: positiveLimitSchema,
  }),
  productionsSection: z.object({
    eyebrow: requiredTextSchema,
    title: requiredTextSchema,
    emphasis: requiredTextSchema,
    suffix: requiredTextSchema,
    linkText: requiredTextSchema,
    href: z.string().trim().min(1).max(120).startsWith("/"),
    limit: positiveLimitSchema,
  }),
  youtubeSection: z.object({
    eyebrow: requiredTextSchema,
    title: requiredTextSchema,
    emphasis: requiredTextSchema,
    suffix: requiredTextSchema,
    videos: z
      .array(
        z.object({
          id: z.string().trim().min(1).max(40),
          title: requiredTextSchema,
        }),
      )
      .length(3),
  }),
  newsSection: z.object({
    eyebrow: requiredTextSchema,
    title: requiredTextSchema,
    emphasis: requiredTextSchema,
    suffix: requiredTextSchema,
    linkText: requiredTextSchema,
    href: z.string().trim().min(1).max(120).startsWith("/"),
    limit: positiveLimitSchema,
  }),
  testimonialsSection: z.object({
    eyebrow: requiredTextSchema,
    title: requiredTextSchema,
    emphasis: requiredTextSchema,
    suffix: requiredTextSchema,
  }),
  cta: z.object({
    eyebrow: requiredTextSchema,
    title: requiredTextSchema,
    subtitle: requiredTextSchema,
    buttonText: requiredTextSchema,
    to: z.string().trim().min(1).max(120).startsWith("/"),
  }),
  hiddenImage: z.object({
    src: mediaReferenceSchema,
    alt: z.string().trim().max(220),
  }),
  sections: z.object({
    hero: z.boolean(),
    whoWeAre: z.boolean(),
    services: z.boolean(),
    selectedWork: z.boolean(),
    productions: z.boolean(),
    youtube: z.boolean(),
    news: z.boolean(),
    testimonials: z.boolean(),
    cta: z.boolean(),
    hiddenImage: z.boolean(),
  }),
});

export const homeContentUpdateSchema = z.object({
  status: z.enum(["draft", "published", "archived"]),
  content: homeContentSchema,
});

export const aboutContentSchema = z.object({
  metadata: z.object({
    title: requiredTextSchema,
    description: requiredTextSchema,
    openGraph: z.object({
      title: requiredTextSchema,
      description: requiredTextSchema,
    }),
  }),
  hero: z.object({
    eyebrow: requiredTextSchema,
    title: requiredTextSchema,
    emphasis: requiredTextSchema,
    subtitle: requiredTextSchema,
  }),
  studio: z.object({
    eyebrow: requiredTextSchema,
    title: requiredTextSchema,
    paragraphs: z.array(requiredTextSchema).length(2),
    steps: z.array(z.tuple([requiredTextSchema, requiredTextSchema])).length(3),
    image: mediaReferenceSchema,
    imageAlt: z.string().trim().max(220),
    imageBadge: requiredTextSchema,
  }),
  principles: z
    .array(
      z.object({
        iconKey: z.enum(["Eye", "Target", "Sparkles"]),
        eyebrow: requiredTextSchema,
        title: requiredTextSchema,
        text: requiredTextSchema,
      }),
    )
    .length(3),
  founder: z.object({
    eyebrow: requiredTextSchema,
    title: requiredTextSchema,
    emphasis: requiredTextSchema,
    suffix: requiredTextSchema,
    image: mediaReferenceSchema,
    imageAlt: z.string().trim().max(220),
    quote: requiredTextSchema,
    bullets: z.array(requiredTextSchema).length(4),
    name: requiredTextSchema,
    role: requiredTextSchema,
  }),
  team: z.object({
    eyebrow: requiredTextSchema,
    title: requiredTextSchema,
    emphasis: requiredTextSchema,
    suffix: requiredTextSchema,
    subtitle: requiredTextSchema,
    members: z
      .array(
        z.object({
          name: requiredTextSchema,
          role: requiredTextSchema,
          note: requiredTextSchema,
          image: mediaReferenceSchema,
          position: requiredTextSchema,
        }),
      )
      .length(4),
  }),
  cta: z.object({
    eyebrow: requiredTextSchema,
    title: requiredTextSchema,
    subtitle: requiredTextSchema,
    buttonText: requiredTextSchema,
    to: z.string().trim().min(1).max(120).startsWith("/"),
  }),
  sections: z.object({
    hero: z.boolean(),
    studio: z.boolean(),
    principles: z.boolean(),
    founder: z.boolean(),
    team: z.boolean(),
    cta: z.boolean(),
  }),
});

export const aboutContentUpdateSchema = z.object({
  status: z.enum(["draft", "published", "archived"]),
  content: aboutContentSchema,
});
