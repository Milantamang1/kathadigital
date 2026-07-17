import type { Production } from "@prisma/client";
import { prisma } from "@/lib/cms/db";
import { createSlug } from "@/lib/cms/validation";

export type ProductionEpisodeValue = {
  num: string;
  title: string;
  guest?: string;
  date: string;
};

export type ProductionValue = {
  id: string;
  title: string;
  slug: string;
  type: string;
  desc: string;
  description: string;
  image: string;
  position: string;
  youtubeId: string;
  subscribeUrl: string;
  destinations: string[];
  episodes: ProductionEpisodeValue[];
  status: "draft" | "published" | "archived";
  featured: boolean;
  displayOrder: number;
  publishedAt: string | null;
  updatedAt: string;
};

export type ProductionInput = {
  title: string;
  slug?: string;
  type: string;
  desc: string;
  description: string;
  image?: string;
  position?: string;
  youtubeId?: string;
  subscribeUrl?: string;
  destinations?: string[];
  episodes?: ProductionEpisodeValue[];
  status: "draft" | "published" | "archived";
  featured: boolean;
  displayOrder: number;
};

const statusFromDb = {
  DRAFT: "draft",
  PUBLISHED: "published",
  ARCHIVED: "archived",
} as const;

const fallbackPublishedProductionData = [
  {
    title: "Katha Mero Pani",
    type: "Talk Show",
    description:
      "A refined talk show built around honest conversation, memorable guests, cultural perspective, and stories with emotional depth.",
    pageDescription:
      "Conversations with people whose journeys carry craft, courage, and perspective. The show is built around warm interviews, thoughtful pacing, and stories that stay with the audience after the episode ends.",
    image: "/katha-media/katha-mero-pani-talkshow.jpeg",
    youtubeId: "QVfkQe29EKY",
    destinations: [],
    episodes: [
      {
        num: "EP 01",
        title: "The Storyteller's Mind",
        guest: "Anil Pradhan",
        date: "May 14, 2025",
      },
      { num: "EP 02", title: "Crafting a Brand", guest: "Sunita Rai", date: "May 28, 2025" },
      { num: "EP 03", title: "Cinema & Culture", guest: "Deepak Tamang", date: "Jun 11, 2025" },
      { num: "EP 04", title: "The Mountain Mindset", guest: "Maya Sherpa", date: "Jun 25, 2025" },
    ],
  },
  {
    title: "Gantavya Eak Katha",
    type: "Travel Vlog",
    description:
      "A cinematic travel series exploring destinations, local voices, food, culture, lifestyle, and the feeling of place.",
    pageDescription:
      "A travel-led series about place, food, culture, and the people who give a destination its voice. Each episode is designed to feel observant, personal, cinematic, and never rushed.",
    image: "/katha-media/mountain-view-trip.jpeg",
    youtubeId: "7DCwXWVKbBo",
    destinations: ["Mustang", "Rara Lake", "Ilam", "Bandipur", "Manang", "Janakpur"],
    episodes: [
      { num: "EP 01", title: "Above the Clouds - Mustang", date: "Apr 02, 2025" },
      { num: "EP 02", title: "Rara, The Hidden Mirror", date: "Apr 16, 2025" },
      { num: "EP 03", title: "Tea Trails of Ilam", date: "Apr 30, 2025" },
    ],
  },
];

const fallbackUpcomingProductionData = [
  {
    title: "Karigar",
    type: "Documentary Series",
    desc: "Intimate profiles of Nepal's master craftspeople, their tools, discipline, and inherited knowledge.",
  },
  {
    title: "Mero Sahar",
    type: "Urban Stories",
    desc: "A grounded city series following people, neighborhoods, small businesses, and everyday Kathmandu rhythms.",
  },
  {
    title: "Saath",
    type: "Long-form Interviews",
    desc: "Unhurried conversations with creative leaders, founders, makers, and people shaping culture.",
  },
];

function asStringArray(value: unknown) {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string")
    : [];
}

function asEpisodes(value: unknown): ProductionEpisodeValue[] {
  if (!Array.isArray(value)) return [];

  return value
    .filter((item): item is Record<string, unknown> => Boolean(item) && typeof item === "object")
    .map((item) => ({
      num: typeof item.num === "string" ? item.num : "",
      title: typeof item.title === "string" ? item.title : "",
      guest: typeof item.guest === "string" ? item.guest : "",
      date: typeof item.date === "string" ? item.date : "",
    }));
}

export function productionToValue(production: Production): ProductionValue {
  return {
    id: production.id,
    title: production.title,
    slug: production.slug,
    type: production.type ?? "",
    desc: production.desc ?? production.description ?? "",
    description: production.description ?? production.desc ?? "",
    image: production.image ?? production.imageUrl ?? "",
    position: production.position ?? "object-center",
    youtubeId: production.youtubeId ?? "",
    subscribeUrl: production.subscribeUrl ?? "https://youtube.com",
    destinations: asStringArray(production.destinations),
    episodes: asEpisodes(production.episodes),
    status: statusFromDb[production.status],
    featured: production.featured,
    displayOrder: production.displayOrder,
    publishedAt: production.publishedAt?.toISOString() ?? null,
    updatedAt: production.updatedAt.toISOString(),
  };
}

export function productionInputToDb(input: ProductionInput) {
  const slug = input.slug?.trim() || createSlug(input.title);

  return {
    title: input.title,
    slug,
    type: input.type,
    desc: input.desc,
    description: input.description,
    image: input.image || null,
    imageUrl: input.image || null,
    position: input.position || null,
    youtubeId: input.youtubeId || null,
    subscribeUrl: input.subscribeUrl || null,
    destinations: input.destinations ?? [],
    episodes: input.episodes ?? [],
    featured: input.featured,
    displayOrder: input.displayOrder,
  };
}

function fallbackPublishedProductions(): ProductionValue[] {
  return fallbackPublishedProductionData.map((production, index) => ({
    id: `fallback-production-${index}`,
    slug: createSlug(production.title),
    title: production.title,
    type: production.type,
    desc: production.pageDescription,
    description: production.description,
    image: production.image,
    position: "object-center",
    youtubeId: production.youtubeId,
    subscribeUrl: "https://youtube.com",
    destinations: production.destinations ?? [],
    episodes: production.episodes,
    status: "published" as const,
    featured: index === 0,
    displayOrder: index,
    publishedAt: null,
    updatedAt: "",
  }));
}

function fallbackUpcoming(): ProductionValue[] {
  return fallbackUpcomingProductionData.map((production, index) => ({
    id: `fallback-upcoming-${index}`,
    slug: createSlug(production.title),
    title: production.title,
    type: production.type,
    desc: production.desc,
    description: production.desc,
    image: "",
    position: "object-center",
    youtubeId: "",
    subscribeUrl: "https://youtube.com",
    destinations: [],
    episodes: [],
    status: "draft" as const,
    featured: false,
    displayOrder: index + 100,
    publishedAt: null,
    updatedAt: "",
  }));
}

export async function getPublishedProductions() {
  const records = await prisma.production.findMany({
    where: { status: "PUBLISHED" },
    orderBy: [{ displayOrder: "asc" }, { createdAt: "asc" }],
  });

  if (records.length === 0) {
    const totalRecords = await prisma.production.count();
    if (totalRecords > 0) {
      return [];
    }

    return fallbackPublishedProductions();
  }

  return records.map(productionToValue);
}

export async function getUpcomingProductions() {
  const records = await prisma.production.findMany({
    where: { status: { not: "PUBLISHED" } },
    orderBy: [{ displayOrder: "asc" }, { createdAt: "asc" }],
  });

  if (records.length === 0) {
    const totalRecords = await prisma.production.count();
    if (totalRecords > 0) {
      return [];
    }

    return fallbackUpcoming();
  }

  return records.map(productionToValue);
}

export async function getEditableProductions() {
  const records = await prisma.production.findMany({
    orderBy: [{ displayOrder: "asc" }, { createdAt: "asc" }],
  });

  return records.map(productionToValue);
}
