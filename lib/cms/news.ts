import type { NewsPost } from "@prisma/client";
import { prisma } from "@/lib/cms/db";
import { blogPosts as fallbackPosts } from "@/lib/site-data";
import { createSlug } from "@/lib/cms/validation";

export type NewsPostValue = {
  id: string;
  title: string;
  slug: string;
  category: string;
  date: string;
  author: string;
  excerpt: string;
  content: string;
  image: string;
  position: string;
  status: "draft" | "published" | "archived";
  featured: boolean;
  displayOrder: number;
  publishedAt: string | null;
  updatedAt: string;
};

export type NewsPostInput = {
  title: string;
  slug?: string;
  category: string;
  date: string;
  author: string;
  excerpt: string;
  content?: string;
  image: string;
  position: string;
  status: "draft" | "published" | "archived";
  featured: boolean;
  displayOrder: number;
};

export const newsCategories = [
  "All",
  "Entertainment",
  "Lifestyle",
  "Photography",
  "Events",
  "Culture",
  "Media",
  "Business Stories",
  "Wedding Tips",
  "Travel Stories",
  "Camera Reviews",
];

const statusFromDb = {
  DRAFT: "draft",
  PUBLISHED: "published",
  ARCHIVED: "archived",
} as const;

export function newsPostToValue(post: NewsPost): NewsPostValue {
  return {
    id: post.id,
    title: post.title,
    slug: post.slug,
    category: post.category ?? "",
    date: post.dateLabel ?? "",
    author: post.author ?? "",
    excerpt: post.excerpt ?? "",
    content: post.content ?? "",
    image: post.image ?? post.imageUrl ?? "",
    position: post.position ?? "object-center",
    status: statusFromDb[post.status],
    featured: post.featured,
    displayOrder: post.displayOrder,
    publishedAt: post.publishedAt?.toISOString() ?? null,
    updatedAt: post.updatedAt.toISOString(),
  };
}

export function newsPostInputToDb(input: NewsPostInput) {
  const slug = input.slug?.trim() || createSlug(input.title);

  return {
    title: input.title,
    slug,
    category: input.category,
    author: input.author,
    dateLabel: input.date,
    excerpt: input.excerpt,
    content: input.content || input.excerpt,
    image: input.image,
    imageUrl: input.image,
    position: input.position,
    featured: input.featured,
    displayOrder: input.displayOrder,
  };
}

function fallbackPublishedNewsPosts(): NewsPostValue[] {
  return fallbackPosts.map((post, index) => ({
    id: `fallback-${index}`,
    slug: createSlug(post.title),
    title: post.title,
    category: post.category,
    date: post.date,
    author: post.author,
    excerpt: post.excerpt,
    content: post.excerpt,
    image: post.image,
    position: post.position,
    status: "published",
    featured: index === 0,
    displayOrder: index,
    publishedAt: null,
    updatedAt: "",
  }));
}

export async function getPublishedNewsPosts() {
  let records: NewsPost[];

  try {
    records = await prisma.newsPost.findMany({
      where: { status: "PUBLISHED" },
      orderBy: [{ displayOrder: "asc" }, { createdAt: "asc" }],
    });
  } catch (error) {
    console.error("Unable to load news from the database. Using fallback news.", error);

    return fallbackPublishedNewsPosts();
  }

  if (records.length === 0) {
    const totalRecords = await prisma.newsPost.count();
    if (totalRecords > 0) {
      return [];
    }

    return fallbackPublishedNewsPosts();
  }

  return records.map(newsPostToValue);
}

export async function getEditableNewsPosts() {
  const records = await prisma.newsPost.findMany({
    orderBy: [{ displayOrder: "asc" }, { createdAt: "asc" }],
  });

  return records.map(newsPostToValue);
}
