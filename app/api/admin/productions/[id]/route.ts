import { Prisma } from "@prisma/client";
import { apiSuccess, ApiError, handleApiError } from "@/lib/cms/api";
import { requireAdminSession } from "@/lib/cms/authz";
import { prisma } from "@/lib/cms/db";
import { productionInputToDb, productionToValue } from "@/lib/cms/productions";
import { productionUpdateSchema } from "@/lib/cms/schemas";
import { toDbContentStatus } from "@/lib/cms/status";

type RouteContext = {
  params: Promise<{ id: string }>;
};

function duplicateError(error: unknown): never {
  if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
    throw new ApiError(409, "DUPLICATE_PRODUCTION", "A production with this slug already exists.");
  }

  throw error;
}

export async function PUT(request: Request, context: RouteContext) {
  try {
    await requireAdminSession();

    const { id } = await context.params;
    const parsed = productionUpdateSchema.parse(await request.json());
    const status = toDbContentStatus(parsed.status);
    const data = productionInputToDb(parsed);

    const production = await prisma.production
      .update({
        where: { id },
        data: {
          ...data,
          status,
          publishedAt: status === "PUBLISHED" ? new Date() : null,
        },
      })
      .catch(duplicateError);

    return apiSuccess({ production: productionToValue(production) });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  try {
    await requireAdminSession();

    const { id } = await context.params;

    await prisma.production.delete({ where: { id } });

    return apiSuccess({ id });
  } catch (error) {
    return handleApiError(error);
  }
}
