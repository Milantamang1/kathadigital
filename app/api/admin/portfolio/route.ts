import fs from "node:fs/promises";
import path from "node:path";
import { Prisma } from "@prisma/client";
import { apiSuccess, ApiError, handleApiError } from "@/lib/cms/api";
import { requireAdminSession } from "@/lib/cms/authz";
import { prisma } from "@/lib/cms/db";
import {
  getEditablePortfolioProjects,
  portfolioCategories,
  portfolioInputToDb,
  portfolioProjectToValue,
} from "@/lib/cms/portfolio";
import { portfolioProjectCreateSchema, portfolioReorderSchema } from "@/lib/cms/schemas";
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
    throw new ApiError(
      409,
      "DUPLICATE_PORTFOLIO_PROJECT",
      "A project with this slug already exists.",
    );
  }

  throw error;
}

export async function GET() {
  try {
    await requireAdminSession();

    const [projects, mediaOptions] = await Promise.all([
      getEditablePortfolioProjects(),
      getMediaOptions(),
    ]);

    return apiSuccess({ projects, mediaOptions, categories: portfolioCategories });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: Request) {
  try {
    await requireAdminSession();

    const parsed = portfolioProjectCreateSchema.parse(await request.json());
    const status = toDbContentStatus(parsed.status);
    const data = portfolioInputToDb(parsed);

    const project = await prisma.portfolioProject
      .create({
        data: {
          ...data,
          status,
          publishedAt: status === "PUBLISHED" ? new Date() : null,
        },
      })
      .catch(duplicateError);

    return apiSuccess({ project: portfolioProjectToValue(project) }, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PATCH(request: Request) {
  try {
    await requireAdminSession();

    const parsed = portfolioReorderSchema.parse(await request.json());

    await prisma.$transaction(
      parsed.ids.map((id, index) =>
        prisma.portfolioProject.update({
          where: { id },
          data: { displayOrder: index },
        }),
      ),
    );

    const projects = await getEditablePortfolioProjects();

    return apiSuccess({ projects });
  } catch (error) {
    return handleApiError(error);
  }
}
