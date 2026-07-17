import fs from "node:fs/promises";
import path from "node:path";
import { Prisma } from "@prisma/client";
import { apiSuccess, ApiError, handleApiError } from "@/lib/cms/api";
import { requireAdminSession } from "@/lib/cms/authz";
import { prisma } from "@/lib/cms/db";
import {
  getEditableProductions,
  productionInputToDb,
  productionToValue,
} from "@/lib/cms/productions";
import { productionCreateSchema, productionReorderSchema } from "@/lib/cms/schemas";
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
    throw new ApiError(409, "DUPLICATE_PRODUCTION", "A production with this slug already exists.");
  }

  throw error;
}

export async function GET() {
  try {
    await requireAdminSession();

    const [productions, mediaOptions] = await Promise.all([
      getEditableProductions(),
      getMediaOptions(),
    ]);

    return apiSuccess({ productions, mediaOptions });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: Request) {
  try {
    await requireAdminSession();

    const parsed = productionCreateSchema.parse(await request.json());
    const status = toDbContentStatus(parsed.status);
    const data = productionInputToDb(parsed);

    const production = await prisma.production
      .create({
        data: {
          ...data,
          status,
          publishedAt: status === "PUBLISHED" ? new Date() : null,
        },
      })
      .catch(duplicateError);

    return apiSuccess({ production: productionToValue(production) }, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PATCH(request: Request) {
  try {
    await requireAdminSession();

    const parsed = productionReorderSchema.parse(await request.json());

    await prisma.$transaction(
      parsed.ids.map((id, index) =>
        prisma.production.update({
          where: { id },
          data: { displayOrder: index },
        }),
      ),
    );

    const productions = await getEditableProductions();

    return apiSuccess({ productions });
  } catch (error) {
    return handleApiError(error);
  }
}
