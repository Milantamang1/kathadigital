import "dotenv/config";
import bcrypt from "bcryptjs";
import fs from "node:fs";
import path from "node:path";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import {
  aboutContent,
  blogCategories,
  blogPosts,
  events,
  homeContent,
  homepageFeaturedVideos,
  navigationItems,
  pageContent,
  portfolio,
  portfolioCategories,
  portfolioTabs,
  principles,
  productions,
  services,
  teamMembers,
  testimonials,
  upcomingProductions,
  youtubeVideos,
} from "./cms-seed-data.mjs";

const { ADMIN_EMAIL, ADMIN_PASSWORD, DATABASE_URL } = process.env;

if (!DATABASE_URL) {
  throw new Error("DATABASE_URL is required.");
}

if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
  throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD are required.");
}

const adapter = new PrismaPg({ connectionString: DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const publishedAt = new Date("2026-07-16T00:00:00.000Z");

function slugify(value) {
  return value
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

function assertSlug(value) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)) {
    throw new Error(`Invalid slug generated for seed data: ${value}`);
  }
  return value;
}

function collectMediaReferences(value, references = new Set()) {
  if (typeof value === "string" && value.startsWith("/katha-media/")) {
    references.add(value);
    return references;
  }

  if (Array.isArray(value)) {
    for (const item of value) collectMediaReferences(item, references);
    return references;
  }

  if (value && typeof value === "object") {
    for (const item of Object.values(value)) collectMediaReferences(item, references);
  }

  return references;
}

function assertMediaReferencesExist() {
  const references = new Set();
  for (const source of [
    services,
    homeContent,
    aboutContent,
    portfolio,
    productions,
    blogPosts,
    events,
    pageContent,
    teamMembers,
  ]) {
    collectMediaReferences(source, references);
  }

  for (const reference of references) {
    if (reference.includes("..") || reference.includes("\\")) {
      throw new Error(`Unsafe media reference: ${reference}`);
    }

    const filePath = path.join(process.cwd(), "public", reference.replace(/^\//, ""));
    if (!fs.existsSync(filePath)) {
      throw new Error(`Missing media asset referenced by seed data: ${reference}`);
    }
  }
}

function contentDefaults(displayOrder) {
  return {
    status: "PUBLISHED",
    displayOrder,
    publishedAt,
  };
}

const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 12);

await prisma.adminUser.upsert({
  where: { email: ADMIN_EMAIL.toLowerCase() },
  update: {
    passwordHash,
  },
  create: {
    name: "Katha Digital Admin",
    email: ADMIN_EMAIL.toLowerCase(),
    role: "admin",
    passwordHash,
  },
});

assertMediaReferencesExist();

await prisma.homeContent.upsert({
  where: { id: "home" },
  update: {
    metadata: homeContent.metadata,
    heroImg: homeContent.heroImg,
    heroAlt: homeContent.heroAlt,
    eyebrow: homeContent.eyebrow,
    title: homeContent.title,
    subtitle: homeContent.subtitle,
    actions: homeContent.actions,
    sideLabel: homeContent.sideLabel,
    metrics: homeContent.metrics,
    whoWeAre: homeContent.whoWeAre,
    servicesSection: homeContent.servicesSection,
    selectedWorkSection: homeContent.selectedWorkSection,
    productionsSection: homeContent.productionsSection,
    youtubeSection: homeContent.youtubeSection,
    newsSection: homeContent.newsSection,
    testimonialsSection: homeContent.testimonialsSection,
    cta: homeContent.cta,
    hiddenImage: homeContent.hiddenImage,
    sections: homeContent.sections,
    status: "PUBLISHED",
    publishedAt,
  },
  create: {
    id: "home",
    metadata: homeContent.metadata,
    heroImg: homeContent.heroImg,
    heroAlt: homeContent.heroAlt,
    eyebrow: homeContent.eyebrow,
    title: homeContent.title,
    subtitle: homeContent.subtitle,
    actions: homeContent.actions,
    sideLabel: homeContent.sideLabel,
    metrics: homeContent.metrics,
    whoWeAre: homeContent.whoWeAre,
    servicesSection: homeContent.servicesSection,
    selectedWorkSection: homeContent.selectedWorkSection,
    productionsSection: homeContent.productionsSection,
    youtubeSection: homeContent.youtubeSection,
    newsSection: homeContent.newsSection,
    testimonialsSection: homeContent.testimonialsSection,
    cta: homeContent.cta,
    hiddenImage: homeContent.hiddenImage,
    sections: homeContent.sections,
    status: "PUBLISHED",
    publishedAt,
  },
});

await prisma.aboutContent.upsert({
  where: { id: "about" },
  update: {
    metadata: aboutContent.metadata,
    hero: aboutContent.hero,
    studio: aboutContent.studio,
    principles: aboutContent.principles,
    founder: aboutContent.founder,
    team: aboutContent.team,
    cta: aboutContent.cta,
    sections: aboutContent.sections,
    status: "PUBLISHED",
    publishedAt,
  },
  create: {
    id: "about",
    metadata: aboutContent.metadata,
    hero: aboutContent.hero,
    studio: aboutContent.studio,
    principles: aboutContent.principles,
    founder: aboutContent.founder,
    team: aboutContent.team,
    cta: aboutContent.cta,
    sections: aboutContent.sections,
    status: "PUBLISHED",
    publishedAt,
  },
});

for (const [index, service] of services.entries()) {
  await prisma.service.upsert({
    where: { slug: assertSlug(service.slug) },
    update: {
      title: service.title,
      short: service.short,
      shortDescription: service.short,
      image: service.image,
      imageUrl: service.image,
      position: service.position,
      ...contentDefaults(index),
    },
    create: {
      slug: service.slug,
      title: service.title,
      short: service.short,
      shortDescription: service.short,
      image: service.image,
      imageUrl: service.image,
      position: service.position,
      ...contentDefaults(index),
    },
  });
}

for (const [index, item] of portfolio.entries()) {
  const slug = assertSlug(slugify(item.title));
  await prisma.portfolioProject.upsert({
    where: { slug },
    update: {
      title: item.title,
      category: item.category,
      location: item.location,
      dateLabel: item.date,
      desc: item.desc,
      description: item.desc,
      image: item.image,
      imageUrl: item.image,
      position: item.position,
      featured: index === 1,
      ...contentDefaults(index),
    },
    create: {
      slug,
      title: item.title,
      category: item.category,
      location: item.location,
      dateLabel: item.date,
      desc: item.desc,
      description: item.desc,
      image: item.image,
      imageUrl: item.image,
      position: item.position,
      featured: index === 1,
      ...contentDefaults(index),
    },
  });
}

for (const [index, post] of blogPosts.entries()) {
  const slug = assertSlug(slugify(post.title));
  await prisma.newsPost.upsert({
    where: { slug },
    update: {
      title: post.title,
      category: post.category,
      author: post.author,
      dateLabel: post.date,
      excerpt: post.excerpt,
      image: post.image,
      imageUrl: post.image,
      position: post.position,
      featured: index === 0,
      ...contentDefaults(index),
    },
    create: {
      slug,
      title: post.title,
      category: post.category,
      author: post.author,
      dateLabel: post.date,
      excerpt: post.excerpt,
      image: post.image,
      imageUrl: post.image,
      position: post.position,
      featured: index === 0,
      ...contentDefaults(index),
    },
  });
}

for (const [index, [key, production]] of Object.entries(productions).entries()) {
  const slug = assertSlug(slugify(production.title));
  await prisma.production.upsert({
    where: { slug },
    update: {
      title: production.title,
      type: production.type,
      desc: production.pageDescription,
      description: production.description,
      image: production.image,
      imageUrl: production.image,
      youtubeId: production.youtubeId,
      subscribeUrl: "https://youtube.com",
      destinations: production.destinations ?? undefined,
      episodes: production.episodes,
      featured: key === "kathaMeroPani",
      ...contentDefaults(index),
    },
    create: {
      slug,
      title: production.title,
      type: production.type,
      desc: production.pageDescription,
      description: production.description,
      image: production.image,
      imageUrl: production.image,
      youtubeId: production.youtubeId,
      subscribeUrl: "https://youtube.com",
      destinations: production.destinations ?? undefined,
      episodes: production.episodes,
      featured: key === "kathaMeroPani",
      ...contentDefaults(index),
    },
  });
}

for (const [index, production] of upcomingProductions.entries()) {
  const slug = assertSlug(slugify(production.title));
  await prisma.production.upsert({
    where: { slug },
    update: {
      title: production.title,
      type: production.type,
      desc: production.desc,
      description: production.desc,
      status: "DRAFT",
      displayOrder: index + 100,
      publishedAt: null,
    },
    create: {
      slug,
      title: production.title,
      type: production.type,
      desc: production.desc,
      description: production.desc,
      status: "DRAFT",
      displayOrder: index + 100,
      publishedAt: null,
    },
  });
}

for (const [group, groupEvents] of Object.entries(events)) {
  for (const [index, event] of groupEvents.entries()) {
    const slug = assertSlug(slugify(event.name));
    await prisma.event.upsert({
      where: { slug },
      update: {
        name: event.name,
        type: "Event coverage",
        dateLabel: event.date,
        location: event.location,
        desc: event.desc,
        description: event.desc,
        image: event.image,
        imageUrl: event.image,
        position: event.position,
        status: group === "upcoming" ? "UPCOMING" : "COMPLETED",
        contentStatus: "PUBLISHED",
        displayOrder: group === "upcoming" ? index : index + 100,
        publishedAt,
      },
      create: {
        slug,
        name: event.name,
        type: "Event coverage",
        dateLabel: event.date,
        location: event.location,
        desc: event.desc,
        description: event.desc,
        image: event.image,
        imageUrl: event.image,
        position: event.position,
        status: group === "upcoming" ? "UPCOMING" : "COMPLETED",
        contentStatus: "PUBLISHED",
        displayOrder: group === "upcoming" ? index : index + 100,
        publishedAt,
      },
    });
  }
}

for (const [index, testimonial] of testimonials.entries()) {
  await prisma.testimonial.upsert({
    where: { name_role: { name: testimonial.name, role: testimonial.role } },
    update: { quote: testimonial.quote, ...contentDefaults(index) },
    create: { ...testimonial, ...contentDefaults(index) },
  });
}

for (const [index, member] of teamMembers.entries()) {
  await prisma.teamMember.upsert({
    where: { name_role: { name: member.name, role: member.role } },
    update: {
      note: member.note,
      image: member.image,
      position: member.position,
      ...contentDefaults(index),
    },
    create: { ...member, ...contentDefaults(index) },
  });
}

for (const [index, principle] of principles.entries()) {
  await prisma.principle.upsert({
    where: { eyebrow_title: { eyebrow: principle.eyebrow, title: principle.title } },
    update: { text: principle.text, iconKey: principle.iconKey, ...contentDefaults(index) },
    create: { ...principle, ...contentDefaults(index) },
  });
}

for (const [index, video] of youtubeVideos.entries()) {
  await prisma.videoItem.upsert({
    where: { section_youtubeId: { section: "portfolio", youtubeId: video.id } },
    update: {
      title: video.title,
      type: video.type,
      description: video.description,
      ...contentDefaults(index),
    },
    create: {
      section: "portfolio",
      youtubeId: video.id,
      title: video.title,
      type: video.type,
      description: video.description,
      ...contentDefaults(index),
    },
  });
}

for (const [index, video] of homepageFeaturedVideos.entries()) {
  await prisma.videoItem.upsert({
    where: { section_youtubeId: { section: "home", youtubeId: video.id } },
    update: { title: video.title, ...contentDefaults(index) },
    create: { section: "home", youtubeId: video.id, title: video.title, ...contentDefaults(index) },
  });
}

for (const [index, id] of ["QVfkQe29EKY", "u-yd2xWAQZk", "6OFqS_qlJB0"].entries()) {
  await prisma.videoItem.upsert({
    where: { section_youtubeId: { section: "events", youtubeId: id } },
    update: { title: "Event film", ...contentDefaults(index) },
    create: { section: "events", youtubeId: id, title: "Event film", ...contentDefaults(index) },
  });
}

for (const [scope, labels] of [
  ["portfolioCategories", portfolioCategories],
  ["portfolioTabs", portfolioTabs],
  ["blogCategories", blogCategories],
]) {
  for (const [index, label] of labels.entries()) {
    await prisma.categoryOption.upsert({
      where: { scope_label: { scope, label } },
      update: contentDefaults(index),
      create: { scope, label, ...contentDefaults(index) },
    });
  }
}

for (const [index, item] of navigationItems.entries()) {
  await prisma.navigationItem.upsert({
    where: { label_to: { label: item.label, to: item.to } },
    update: contentDefaults(index),
    create: { ...item, ...contentDefaults(index) },
  });
}

for (const [index, content] of pageContent.entries()) {
  await prisma.pageContent.upsert({
    where: {
      page_section_key: {
        page: content.page,
        section: content.section,
        key: content.key,
      },
    },
    update: {
      value: content.value,
      ...contentDefaults(index),
    },
    create: {
      ...content,
      ...contentDefaults(index),
    },
  });
}

await prisma.$disconnect();

console.log(`Admin user ready: ${ADMIN_EMAIL.toLowerCase()}`);
console.log("CMS seed content copied from static project data.");
