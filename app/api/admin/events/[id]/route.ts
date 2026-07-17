import { Prisma } from "@prisma/client";
import { apiSuccess, ApiError, handleApiError } from "@/lib/cms/api";
import { requireAdminSession } from "@/lib/cms/authz";
import { prisma } from "@/lib/cms/db";
import { eventInputToDb, eventToValue } from "@/lib/cms/events";
import { eventUpdateSchema } from "@/lib/cms/schemas";
import { toDbContentStatus } from "@/lib/cms/status";

type RouteContext = {
  params: Promise<{ id: string }>;
};

function duplicateError(error: unknown): never {
  if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
    throw new ApiError(409, "DUPLICATE_EVENT", "An event with this slug already exists.");
  }

  throw error;
}

export async function PUT(request: Request, context: RouteContext) {
  try {
    await requireAdminSession();

    const { id } = await context.params;
    const parsed = eventUpdateSchema.parse(await request.json());
    const contentStatus = toDbContentStatus(parsed.status);
    const data = eventInputToDb(parsed);

    const event = await prisma.event
      .update({
        where: { id },
        data: {
          ...data,
          contentStatus,
          publishedAt: contentStatus === "PUBLISHED" ? new Date() : null,
        },
      })
      .catch(duplicateError);

    return apiSuccess({ event: eventToValue(event) });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  try {
    await requireAdminSession();

    const { id } = await context.params;

    await prisma.event.delete({ where: { id } });

    return apiSuccess({ id });
  } catch (error) {
    return handleApiError(error);
  }
}
