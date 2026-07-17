import { Prisma } from "@prisma/client";
import { apiSuccess, ApiError, handleApiError } from "@/lib/cms/api";
import { requireAdminSession } from "@/lib/cms/authz";
import { prisma } from "@/lib/cms/db";
import { serviceInputToDb, serviceToValue } from "@/lib/cms/services";
import { serviceUpdateSchema } from "@/lib/cms/schemas";
import { toDbContentStatus } from "@/lib/cms/status";

type RouteContext = {
  params: Promise<{ id: string }>;
};

function duplicateError(error: unknown): never {
  if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
    throw new ApiError(409, "DUPLICATE_SERVICE", "A service with this slug already exists.");
  }

  throw error;
}

export async function PUT(request: Request, context: RouteContext) {
  try {
    await requireAdminSession();

    const { id } = await context.params;
    const parsed = serviceUpdateSchema.parse(await request.json());
    const status = toDbContentStatus(parsed.status);
    const data = serviceInputToDb(parsed);

    const service = await prisma.service
      .update({
        where: { id },
        data: {
          ...data,
          status,
          publishedAt: status === "PUBLISHED" ? new Date() : null,
        },
      })
      .catch(duplicateError);

    return apiSuccess({ service: serviceToValue(service) });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  try {
    await requireAdminSession();

    const { id } = await context.params;

    await prisma.service.delete({ where: { id } });

    return apiSuccess({ id });
  } catch (error) {
    return handleApiError(error);
  }
}
