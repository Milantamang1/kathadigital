import fs from "node:fs/promises";
import path from "node:path";
import { Prisma } from "@prisma/client";
import { apiSuccess, ApiError, handleApiError } from "@/lib/cms/api";
import { requireAdminSession } from "@/lib/cms/authz";
import { prisma } from "@/lib/cms/db";
import { eventInputToDb, eventToValue, getEditableEvents } from "@/lib/cms/events";
import { eventCreateSchema, eventReorderSchema } from "@/lib/cms/schemas";
import { toDbContentStatus } from "@/lib/cms/status";

async function getMediaOptions() {
  const mediaRoot = path.join(process.cwd(), "public", "katha-media");
  const entries = await fs.readdir(mediaRoot, { withFileTypes: true });

  return entries
    .filter((entry) => entry.isFile())
    .map((entry) => `/katha-media/${entry.name}`)
    .filter((src) => /\.(avif|gif|jpe?g|png|webp)$/i.test(src))
    .sort((a, b) => a.localeCompare(b));
}

function duplicateError(error: unknown): never {
  if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
    throw new ApiError(409, "DUPLICATE_EVENT", "An event with this slug already exists.");
  }

  throw error;
}

export async function GET() {
  try {
    await requireAdminSession();

    const [events, mediaOptions] = await Promise.all([getEditableEvents(), getMediaOptions()]);

    return apiSuccess({ events, mediaOptions });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: Request) {
  try {
    await requireAdminSession();

    const parsed = eventCreateSchema.parse(await request.json());
    const contentStatus = toDbContentStatus(parsed.status);
    const data = eventInputToDb(parsed);

    const event = await prisma.event
      .create({
        data: {
          ...data,
          contentStatus,
          publishedAt: contentStatus === "PUBLISHED" ? new Date() : null,
        },
      })
      .catch(duplicateError);

    return apiSuccess({ event: eventToValue(event) }, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PATCH(request: Request) {
  try {
    await requireAdminSession();

    const parsed = eventReorderSchema.parse(await request.json());

    await prisma.$transaction(
      parsed.ids.map((id, index) =>
        prisma.event.update({
          where: { id },
          data: { displayOrder: index },
        }),
      ),
    );

    const events = await getEditableEvents();

    return apiSuccess({ events });
  } catch (error) {
    return handleApiError(error);
  }
}
