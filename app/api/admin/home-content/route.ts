import fs from "node:fs/promises";
import path from "node:path";
import { apiSuccess, handleApiError } from "@/lib/cms/api";
import { requireAdminSession } from "@/lib/cms/authz";
import { prisma } from "@/lib/cms/db";
import {
  HOME_CONTENT_ID,
  getEditableHomeContent,
  homeContentToCreateInput,
} from "@/lib/cms/home-content";
import { homeContentUpdateSchema } from "@/lib/cms/schemas";
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
      prisma.homeContent.findUnique({ where: { id: HOME_CONTENT_ID } }),
      getEditableHomeContent(),
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

    const parsed = homeContentUpdateSchema.parse(await request.json());
    const status = toDbContentStatus(parsed.status);
    const publishedAt = status === "PUBLISHED" ? new Date() : null;
    const base = homeContentToCreateInput(parsed.content);

    const record = await prisma.homeContent.upsert({
      where: { id: HOME_CONTENT_ID },
      create: {
        ...base,
        status,
        publishedAt,
      },
      update: {
        metadata: parsed.content.metadata,
        heroImg: parsed.content.heroImg,
        heroAlt: parsed.content.heroAlt,
        eyebrow: parsed.content.eyebrow,
        title: parsed.content.title,
        subtitle: parsed.content.subtitle,
        actions: parsed.content.actions,
        sideLabel: parsed.content.sideLabel,
        metrics: parsed.content.metrics,
        whoWeAre: parsed.content.whoWeAre,
        servicesSection: parsed.content.servicesSection,
        selectedWorkSection: parsed.content.selectedWorkSection,
        productionsSection: parsed.content.productionsSection,
        youtubeSection: parsed.content.youtubeSection,
        newsSection: parsed.content.newsSection,
        testimonialsSection: parsed.content.testimonialsSection,
        cta: parsed.content.cta,
        hiddenImage: parsed.content.hiddenImage,
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
