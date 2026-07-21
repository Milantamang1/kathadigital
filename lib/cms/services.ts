import type { Service } from "@prisma/client";
import { prisma } from "@/lib/cms/db";
import { services as fallbackServices } from "@/lib/site-data";
import { createSlug } from "@/lib/cms/validation";

export type ServiceValue = {
  id: string;
  title: string;
  slug: string;
  short: string;
  image: string;
  position: string;
  status: "draft" | "published" | "archived";
  featured: boolean;
  displayOrder: number;
  publishedAt: string | null;
  updatedAt: string;
};

export type ServiceInput = {
  title: string;
  slug?: string;
  short: string;
  image: string;
  position: string;
  status: "draft" | "published" | "archived";
  featured: boolean;
  displayOrder: number;
};

const statusFromDb = {
  DRAFT: "draft",
  PUBLISHED: "published",
  ARCHIVED: "archived",
} as const;

export function serviceToValue(service: Service): ServiceValue {
  return {
    id: service.id,
    title: service.title,
    slug: service.slug,
    short: service.short ?? service.shortDescription ?? "",
    image: service.image ?? service.imageUrl ?? "",
    position: service.position ?? "object-center",
    status: statusFromDb[service.status],
    featured: service.featured,
    displayOrder: service.displayOrder,
    publishedAt: service.publishedAt?.toISOString() ?? null,
    updatedAt: service.updatedAt.toISOString(),
  };
}

export function serviceInputToDb(input: ServiceInput) {
  const slug = input.slug?.trim() || createSlug(input.title);

  return {
    title: input.title,
    slug,
    short: input.short,
    shortDescription: input.short,
    image: input.image,
    imageUrl: input.image,
    position: input.position,
    featured: input.featured,
    displayOrder: input.displayOrder,
  };
}

function fallbackPublishedServices(): ServiceValue[] {
  return fallbackServices.map((service, index) => ({
    id: `fallback-${index}`,
    slug: service.slug,
    title: service.title,
    short: service.short,
    image: service.image,
    position: service.position,
    status: "published",
    featured: false,
    displayOrder: index,
    publishedAt: null,
    updatedAt: "",
  }));
}

export async function getPublishedServices() {
  let records: Service[];

  try {
    records = await prisma.service.findMany({
      where: { status: "PUBLISHED" },
      orderBy: [{ displayOrder: "asc" }, { createdAt: "asc" }],
    });
  } catch (error) {
    console.error("Unable to load services from the database. Using fallback services.", error);

    return fallbackPublishedServices();
  }

  if (records.length === 0) {
    const totalRecords = await prisma.service.count();
    if (totalRecords > 0) {
      return [];
    }

    return fallbackPublishedServices();
  }

  return records.map(serviceToValue);
}

export async function getEditableServices() {
  const records = await prisma.service.findMany({
    orderBy: [{ displayOrder: "asc" }, { createdAt: "asc" }],
  });

  return records.map(serviceToValue);
}
