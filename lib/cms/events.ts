import type { Event, VideoItem } from "@prisma/client";
import { prisma } from "@/lib/cms/db";
import { events as fallbackEvents } from "@/lib/site-data";
import { createSlug } from "@/lib/cms/validation";

export type EventValue = {
  id: string;
  name: string;
  slug: string;
  type: string;
  date: string;
  dateLabel: string;
  location: string;
  desc: string;
  description: string;
  image: string;
  position: string;
  eventStatus: "upcoming" | "completed" | "cancelled";
  status: "draft" | "published" | "archived";
  featured: boolean;
  displayOrder: number;
  publishedAt: string | null;
  updatedAt: string;
};

export type EventVideoValue = {
  id: string;
  title: string;
};

export type EventInput = {
  name: string;
  slug?: string;
  type?: string;
  date?: string;
  dateLabel: string;
  location: string;
  desc: string;
  image: string;
  position: string;
  eventStatus: "upcoming" | "completed" | "cancelled";
  status: "draft" | "published" | "archived";
  featured: boolean;
  displayOrder: number;
};

const contentStatusFromDb = {
  DRAFT: "draft",
  PUBLISHED: "published",
  ARCHIVED: "archived",
} as const;

const eventStatusFromDb = {
  UPCOMING: "upcoming",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
} as const;

export const eventStatusToDb = {
  upcoming: "UPCOMING",
  completed: "COMPLETED",
  cancelled: "CANCELLED",
} as const;

function formatEventDate(value: Date | null) {
  if (!value) return "";

  return value.toISOString().slice(0, 10);
}

export function eventToValue(event: Event): EventValue {
  return {
    id: event.id,
    name: event.name,
    slug: event.slug,
    type: event.type ?? "",
    date: formatEventDate(event.date),
    dateLabel: event.dateLabel ?? formatEventDate(event.date),
    location: event.location ?? "",
    desc: event.desc ?? event.description ?? "",
    description: event.description ?? event.desc ?? "",
    image: event.image ?? event.imageUrl ?? "",
    position: event.position ?? "object-center",
    eventStatus: eventStatusFromDb[event.status],
    status: contentStatusFromDb[event.contentStatus],
    featured: event.featured,
    displayOrder: event.displayOrder,
    publishedAt: event.publishedAt?.toISOString() ?? null,
    updatedAt: event.updatedAt.toISOString(),
  };
}

export function eventVideoToValue(video: VideoItem): EventVideoValue {
  return {
    id: video.youtubeId,
    title: video.title,
  };
}

export function eventInputToDb(input: EventInput) {
  const slug = input.slug?.trim() || createSlug(input.name);
  const parsedDate = input.date ? new Date(`${input.date}T00:00:00.000Z`) : null;

  return {
    name: input.name,
    slug,
    type: input.type || "Event coverage",
    date: parsedDate,
    dateLabel: input.dateLabel,
    location: input.location,
    desc: input.desc,
    description: input.desc,
    image: input.image,
    imageUrl: input.image,
    position: input.position,
    status: eventStatusToDb[input.eventStatus],
    featured: input.featured,
    displayOrder: input.displayOrder,
  };
}

function fallbackEvent(
  group: "upcoming" | "completed",
  event: (typeof fallbackEvents)[typeof group][number],
  index: number,
): EventValue {
  return {
    id: `fallback-${group}-${index}`,
    slug: createSlug(event.name),
    name: event.name,
    type: "Event coverage",
    date: "",
    dateLabel: event.date,
    location: event.location,
    desc: event.desc,
    description: event.desc,
    image: event.image,
    position: event.position,
    eventStatus: group,
    status: "published",
    featured: index === 0 && group === "upcoming",
    displayOrder: group === "upcoming" ? index : index + 100,
    publishedAt: null,
    updatedAt: "",
  };
}

export async function getPublishedEvents() {
  let records: Event[];

  try {
    records = await prisma.event.findMany({
      where: { contentStatus: "PUBLISHED" },
      orderBy: [{ displayOrder: "asc" }, { createdAt: "asc" }],
    });
  } catch (error) {
    console.error("Unable to load events from the database. Using fallback events.", error);

    return {
      upcoming: fallbackEvents.upcoming.map((event, index) =>
        fallbackEvent("upcoming", event, index),
      ),
      completed: fallbackEvents.completed.map((event, index) =>
        fallbackEvent("completed", event, index),
      ),
    };
  }

  if (records.length === 0) {
    const totalRecords = await prisma.event.count();
    if (totalRecords > 0) {
      return { upcoming: [], completed: [] };
    }

    return {
      upcoming: fallbackEvents.upcoming.map((event, index) =>
        fallbackEvent("upcoming", event, index),
      ),
      completed: fallbackEvents.completed.map((event, index) =>
        fallbackEvent("completed", event, index),
      ),
    };
  }

  const events = records.map(eventToValue);

  return {
    upcoming: events.filter((event) => event.eventStatus === "upcoming"),
    completed: events.filter((event) => event.eventStatus === "completed"),
  };
}

export async function getEventVideos() {
  let records: VideoItem[];

  try {
    records = await prisma.videoItem.findMany({
      where: { section: "events", status: "PUBLISHED" },
      orderBy: [{ displayOrder: "asc" }, { createdAt: "asc" }],
    });
  } catch (error) {
    console.error("Unable to load event videos from the database. Using fallback videos.", error);

    return ["QVfkQe29EKY", "u-yd2xWAQZk", "6OFqS_qlJB0"].map((id) => ({
      id,
      title: "Event film",
    }));
  }

  if (records.length === 0) {
    return ["QVfkQe29EKY", "u-yd2xWAQZk", "6OFqS_qlJB0"].map((id) => ({
      id,
      title: "Event film",
    }));
  }

  return records.map(eventVideoToValue);
}

export async function getEditableEvents() {
  const records = await prisma.event.findMany({
    orderBy: [{ displayOrder: "asc" }, { createdAt: "asc" }],
  });

  return records.map(eventToValue);
}
