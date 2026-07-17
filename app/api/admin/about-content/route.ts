import fs from "node:fs/promises";
import path from "node:path";
import { apiSuccess, handleApiError } from "@/lib/cms/api";
import { requireAdminSession } from "@/lib/cms/authz";
import {
  ABOUT_CONTENT_ID,
  aboutContentToCreateInput,
  getEditableAboutContent,
} from "@/lib/cms/about-content";
import { prisma } from "@/lib/cms/db";
import { aboutContentUpdateSchema } from "@/lib/cms/schemas";
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

export async function GET() {
  try {
    await requireAdminSession();

    const [record, content, mediaOptions] = await Promise.all([
      prisma.aboutContent.findUnique({ where: { id: ABOUT_CONTENT_ID } }),
      getEditableAboutContent(),
      getMediaOptions(),
    ]);

    return apiSuccess({
      content,
      status:
        record?.status === "DRAFT"
          ? "draft"
          : record?.status === "ARCHIVED"
            ? "archived"
            : "published",
      updatedAt: record?.updatedAt?.toISOString() ?? null,
      mediaOptions,
    });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(request: Request) {
  try {
    await requireAdminSession();

    const parsed = aboutContentUpdateSchema.parse(await request.json());
    const status = toDbContentStatus(parsed.status);
    const publishedAt = status === "PUBLISHED" ? new Date() : null;
    const base = aboutContentToCreateInput(parsed.content);

    const record = await prisma.aboutContent.upsert({
      where: { id: ABOUT_CONTENT_ID },
      create: {
        ...base,
        status,
        publishedAt,
      },
      update: {
        metadata: parsed.content.metadata,
        hero: parsed.content.hero,
        studio: parsed.content.studio,
        principles: parsed.content.principles,
        founder: parsed.content.founder,
        team: parsed.content.team,
        cta: parsed.content.cta,
        sections: parsed.content.sections,
        status,
        publishedAt,
      },
    });

    return apiSuccess({
      content: parsed.content,
      status: parsed.status,
      updatedAt: record.updatedAt.toISOString(),
    });
  } catch (error) {
    return handleApiError(error);
  }
}
