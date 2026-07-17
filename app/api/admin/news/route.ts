import fs from "node:fs/promises";
import path from "node:path";
import { Prisma } from "@prisma/client";
import { apiSuccess, ApiError, handleApiError } from "@/lib/cms/api";
import { requireAdminSession } from "@/lib/cms/authz";
import { prisma } from "@/lib/cms/db";
import {
  getEditableNewsPosts,
  newsCategories,
  newsPostInputToDb,
  newsPostToValue,
} from "@/lib/cms/news";
import { newsPostCreateSchema, newsReorderSchema } from "@/lib/cms/schemas";
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
    throw new ApiError(409, "DUPLICATE_NEWS_POST", "A news post with this slug already exists.");
  }

  throw error;
}

export async function GET() {
  try {
    await requireAdminSession();

    const [posts, mediaOptions] = await Promise.all([getEditableNewsPosts(), getMediaOptions()]);

    return apiSuccess({ posts, mediaOptions, categories: newsCategories });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: Request) {
  try {
    await requireAdminSession();

    const parsed = newsPostCreateSchema.parse(await request.json());
    const status = toDbContentStatus(parsed.status);
    const data = newsPostInputToDb(parsed);

    const post = await prisma.newsPost
      .create({
        data: {
          ...data,
          status,
          publishedAt: status === "PUBLISHED" ? new Date() : null,
        },
      })
      .catch(duplicateError);

    return apiSuccess({ post: newsPostToValue(post) }, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PATCH(request: Request) {
  try {
    await requireAdminSession();

    const parsed = newsReorderSchema.parse(await request.json());

    await prisma.$transaction(
      parsed.ids.map((id, index) =>
        prisma.newsPost.update({
          where: { id },
          data: { displayOrder: index },
        }),
      ),
    );

    const posts = await getEditableNewsPosts();

    return apiSuccess({ posts });
  } catch (error) {
    return handleApiError(error);
  }
}
