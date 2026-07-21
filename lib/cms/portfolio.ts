import type { PortfolioProject, VideoItem } from "@prisma/client";
import { prisma } from "@/lib/cms/db";
import { portfolio as fallbackPortfolio, youtubeVideos as fallbackVideos } from "@/lib/site-data";
import { createSlug } from "@/lib/cms/validation";

export type PortfolioProjectValue = {
  id: string;
  title: string;
  slug: string;
  category: string;
  location: string;
  date: string;
  desc: string;
  image: string;
  position: string;
  videoUrl: string;
  status: "draft" | "published" | "archived";
  featured: boolean;
  displayOrder: number;
  publishedAt: string | null;
  updatedAt: string;
};

export type PortfolioVideoValue = {
  id: string;
  title: string;
  type: string;
  description: string;
};

export type PortfolioProjectInput = {
  title: string;
  slug?: string;
  category: string;
  location: string;
  date: string;
  desc: string;
  image: string;
  position: string;
  videoUrl?: string;
  status: "draft" | "published" | "archived";
  featured: boolean;
  displayOrder: number;
};

const statusFromDb = {
  DRAFT: "draft",
  PUBLISHED: "published",
  ARCHIVED: "archived",
} as const;

export const portfolioCategories = [
  "All",
  "Wedding Films",
  "Events",
  "Portraits",
  "Travel",
  "Music Videos",
  "Brand Stories",
  "Weddings",
  "Pre-Wedding",
  "Engagement",
  "Products",
  "Commercial",
];

export function portfolioProjectToValue(project: PortfolioProject): PortfolioProjectValue {
  return {
    id: project.id,
    title: project.title,
    slug: project.slug,
    category: project.category,
    location: project.location ?? "",
    date: project.dateLabel ?? "",
    desc: project.desc ?? "",
    image: project.image ?? project.imageUrl ?? "",
    position: project.position ?? "object-center",
    videoUrl: project.videoUrl ?? "",
    status: statusFromDb[project.status],
    featured: project.featured,
    displayOrder: project.displayOrder,
    publishedAt: project.publishedAt?.toISOString() ?? null,
    updatedAt: project.updatedAt.toISOString(),
  };
}

export function portfolioVideoToValue(video: VideoItem): PortfolioVideoValue {
  return {
    id: video.youtubeId,
    title: video.title,
    type: video.type ?? "",
    description: video.description ?? "",
  };
}

export function portfolioInputToDb(input: PortfolioProjectInput) {
  const slug = input.slug?.trim() || createSlug(input.title);

  return {
    title: input.title,
    slug,
    category: input.category,
    location: input.location,
    dateLabel: input.date,
    desc: input.desc,
    description: input.desc,
    image: input.image,
    imageUrl: input.image,
    position: input.position,
    videoUrl: input.videoUrl || null,
    featured: input.featured,
    displayOrder: input.displayOrder,
  };
}

function fallbackPublishedPortfolioProjects(): PortfolioProjectValue[] {
  return fallbackPortfolio.map((item, index) => ({
    id: `fallback-${index}`,
    slug: createSlug(item.title),
    title: item.title,
    category: item.category,
    location: item.location,
    date: item.date,
    desc: item.desc,
    image: item.image,
    position: item.position,
    videoUrl: "",
    status: "published",
    featured: index === 1,
    displayOrder: index,
    publishedAt: null,
    updatedAt: "",
  }));
}

function fallbackPortfolioVideos(): PortfolioVideoValue[] {
  return fallbackVideos.map((video) => ({
    id: video.id,
    title: video.title,
    type: video.type,
    description: video.description,
  }));
}

export async function getPublishedPortfolioProjects() {
  let records: PortfolioProject[];

  try {
    records = await prisma.portfolioProject.findMany({
      where: { status: "PUBLISHED" },
      orderBy: [{ displayOrder: "asc" }, { createdAt: "asc" }],
    });
  } catch (error) {
    console.error(
      "Unable to load portfolio projects from the database. Using fallback portfolio.",
      error,
    );

    return fallbackPublishedPortfolioProjects();
  }

  if (records.length === 0) {
    const totalRecords = await prisma.portfolioProject.count();
    if (totalRecords > 0) {
      return [];
    }

    return fallbackPublishedPortfolioProjects();
  }

  return records.map(portfolioProjectToValue);
}

export async function getPortfolioVideos() {
  let records: VideoItem[];

  try {
    records = await prisma.videoItem.findMany({
      where: { section: "portfolio", status: "PUBLISHED" },
      orderBy: [{ displayOrder: "asc" }, { createdAt: "asc" }],
    });
  } catch (error) {
    console.error(
      "Unable to load portfolio videos from the database. Using fallback videos.",
      error,
    );

    return fallbackPortfolioVideos();
  }

  if (records.length === 0) {
    return fallbackPortfolioVideos();
  }

  return records.map(portfolioVideoToValue);
}

export async function getEditablePortfolioProjects() {
  const records = await prisma.portfolioProject.findMany({
    orderBy: [{ displayOrder: "asc" }, { createdAt: "asc" }],
  });

  return records.map(portfolioProjectToValue);
}
