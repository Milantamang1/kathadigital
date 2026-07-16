import { apiSuccess, handleApiError } from "@/lib/cms/api";
import { requireAdminSession } from "@/lib/cms/authz";
import { prisma } from "@/lib/cms/db";

type SnapshotStatus = "Published" | "Draft" | "Archived" | "Mixed";

type SectionSnapshot = {
  section: string;
  status: SnapshotStatus;
  itemCount: number;
  lastUpdated: string | null;
  href: string;
  publishedCount: number;
  draftCount: number;
  archivedCount: number;
};

function adminHref(section: string) {
  return `/admin?section=${encodeURIComponent(section)}`;
}

function formatStatus({
  archivedCount,
  draftCount,
  publishedCount,
}: {
  archivedCount: number;
  draftCount: number;
  publishedCount: number;
}): SnapshotStatus {
  const activeStatuses = [publishedCount, draftCount, archivedCount].filter((count) => count > 0);

  if (activeStatuses.length > 1) return "Mixed";
  if (draftCount > 0) return "Draft";
  if (archivedCount > 0) return "Archived";
  return "Published";
}

function buildSnapshot({
  archivedCount,
  draftCount,
  href,
  itemCount,
  lastUpdated,
  publishedCount,
  section,
}: {
  section: string;
  itemCount: number;
  publishedCount: number;
  draftCount: number;
  archivedCount: number;
  lastUpdated?: Date | null;
  href: string;
}): SectionSnapshot | null {
  if (itemCount < 1) return null;

  return {
    section,
    status: formatStatus({ archivedCount, draftCount, publishedCount }),
    itemCount,
    lastUpdated: lastUpdated?.toISOString() ?? null,
    href,
    publishedCount,
    draftCount,
    archivedCount,
  };
}

async function pageSnapshot(section: string, page: string) {
  const [itemCount, publishedCount, draftCount, archivedCount, maxUpdated] =
    await prisma.$transaction([
      prisma.pageContent.count({ where: { page } }),
      prisma.pageContent.count({ where: { page, status: "PUBLISHED" } }),
      prisma.pageContent.count({ where: { page, status: "DRAFT" } }),
      prisma.pageContent.count({ where: { page, status: "ARCHIVED" } }),
      prisma.pageContent.aggregate({ where: { page }, _max: { updatedAt: true } }),
    ]);

  return buildSnapshot({
    section,
    itemCount,
    publishedCount,
    draftCount,
    archivedCount,
    lastUpdated: maxUpdated._max.updatedAt,
    href: adminHref(section),
  });
}

async function serviceSnapshot() {
  const [itemCount, publishedCount, draftCount, archivedCount, maxUpdated] =
    await prisma.$transaction([
      prisma.service.count(),
      prisma.service.count({ where: { status: "PUBLISHED" } }),
      prisma.service.count({ where: { status: "DRAFT" } }),
      prisma.service.count({ where: { status: "ARCHIVED" } }),
      prisma.service.aggregate({ _max: { updatedAt: true } }),
    ]);

  return buildSnapshot({
    section: "Services",
    itemCount,
    publishedCount,
    draftCount,
    archivedCount,
    lastUpdated: maxUpdated._max.updatedAt,
    href: adminHref("Services"),
  });
}

async function portfolioSnapshot() {
  const [itemCount, publishedCount, draftCount, archivedCount, maxUpdated] =
    await prisma.$transaction([
      prisma.portfolioProject.count(),
      prisma.portfolioProject.count({ where: { status: "PUBLISHED" } }),
      prisma.portfolioProject.count({ where: { status: "DRAFT" } }),
      prisma.portfolioProject.count({ where: { status: "ARCHIVED" } }),
      prisma.portfolioProject.aggregate({ _max: { updatedAt: true } }),
    ]);

  return buildSnapshot({
    section: "Portfolio",
    itemCount,
    publishedCount,
    draftCount,
    archivedCount,
    lastUpdated: maxUpdated._max.updatedAt,
    href: adminHref("Portfolio"),
  });
}

async function productionSnapshot() {
  const [itemCount, publishedCount, draftCount, archivedCount, maxUpdated] =
    await prisma.$transaction([
      prisma.production.count(),
      prisma.production.count({ where: { status: "PUBLISHED" } }),
      prisma.production.count({ where: { status: "DRAFT" } }),
      prisma.production.count({ where: { status: "ARCHIVED" } }),
      prisma.production.aggregate({ _max: { updatedAt: true } }),
    ]);

  return buildSnapshot({
    section: "Productions",
    itemCount,
    publishedCount,
    draftCount,
    archivedCount,
    lastUpdated: maxUpdated._max.updatedAt,
    href: adminHref("Productions"),
  });
}

async function newsSnapshot() {
  const [itemCount, publishedCount, draftCount, archivedCount, maxUpdated] =
    await prisma.$transaction([
      prisma.newsPost.count(),
      prisma.newsPost.count({ where: { status: "PUBLISHED" } }),
      prisma.newsPost.count({ where: { status: "DRAFT" } }),
      prisma.newsPost.count({ where: { status: "ARCHIVED" } }),
      prisma.newsPost.aggregate({ _max: { updatedAt: true } }),
    ]);

  return buildSnapshot({
    section: "News",
    itemCount,
    publishedCount,
    draftCount,
    archivedCount,
    lastUpdated: maxUpdated._max.updatedAt,
    href: adminHref("News"),
  });
}

async function eventSnapshot() {
  const [itemCount, publishedCount, draftCount, archivedCount, maxUpdated] =
    await prisma.$transaction([
      prisma.event.count(),
      prisma.event.count({ where: { contentStatus: "PUBLISHED" } }),
      prisma.event.count({ where: { contentStatus: "DRAFT" } }),
      prisma.event.count({ where: { contentStatus: "ARCHIVED" } }),
      prisma.event.aggregate({ _max: { updatedAt: true } }),
    ]);

  return buildSnapshot({
    section: "Events",
    itemCount,
    publishedCount,
    draftCount,
    archivedCount,
    lastUpdated: maxUpdated._max.updatedAt,
    href: adminHref("Events"),
  });
}

export async function GET() {
  try {
    await requireAdminSession();

    const [snapshots, newMessages, bookingLeads, publishedPortfolioItems] = await Promise.all([
      Promise.all([
        pageSnapshot("Home Content", "home"),
        pageSnapshot("About Content", "about"),
        serviceSnapshot(),
        portfolioSnapshot(),
        productionSnapshot(),
        newsSnapshot(),
        eventSnapshot(),
      ]),
      prisma.contactMessage.count({ where: { status: "NEW" } }),
      prisma.bookingInquiry.count({ where: { status: "NEW" } }),
      prisma.portfolioProject.count({ where: { status: "PUBLISHED" } }),
    ]);

    const contentSnapshots = snapshots.filter((snapshot): snapshot is SectionSnapshot =>
      Boolean(snapshot),
    );
    const publishedPages = contentSnapshots.filter(
      (snapshot) => snapshot.publishedCount > 0,
    ).length;
    const pendingWork = contentSnapshots
      .filter((snapshot) => snapshot.draftCount > 0 || snapshot.archivedCount > 0)
      .map((snapshot) => ({
        section: snapshot.section,
        href: snapshot.href,
        draftCount: snapshot.draftCount,
        archivedCount: snapshot.archivedCount,
      }));

    return apiSuccess({
      stats: [
        {
          label: "Published Pages",
          value: String(publishedPages),
          note: "Live CMS sections",
        },
        {
          label: "New Messages",
          value: String(newMessages),
          note: "Unread contact messages",
        },
        {
          label: "Booking Leads",
          value: String(bookingLeads),
          note: "New booking inquiries",
        },
        {
          label: "Portfolio Items",
          value: String(publishedPortfolioItems),
          note: "Published portfolio records",
        },
      ],
      snapshots: contentSnapshots,
      pendingWork,
    });
  } catch (error) {
    return handleApiError(error);
  }
}
