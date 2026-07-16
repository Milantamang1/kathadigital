-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "contentStatus" "ContentStatus" NOT NULL DEFAULT 'PUBLISHED',
ADD COLUMN     "dateLabel" TEXT,
ADD COLUMN     "desc" TEXT,
ADD COLUMN     "displayOrder" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "image" TEXT,
ADD COLUMN     "position" TEXT,
ADD COLUMN     "publishedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "NewsPost" ADD COLUMN     "dateLabel" TEXT,
ADD COLUMN     "displayOrder" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "image" TEXT,
ADD COLUMN     "position" TEXT;

-- AlterTable
ALTER TABLE "PortfolioProject" ADD COLUMN     "dateLabel" TEXT,
ADD COLUMN     "desc" TEXT,
ADD COLUMN     "displayOrder" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "image" TEXT,
ADD COLUMN     "position" TEXT,
ADD COLUMN     "publishedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Production" ADD COLUMN     "desc" TEXT,
ADD COLUMN     "destinations" JSONB,
ADD COLUMN     "displayOrder" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "image" TEXT,
ADD COLUMN     "position" TEXT,
ADD COLUMN     "publishedAt" TIMESTAMP(3),
ADD COLUMN     "subscribeUrl" TEXT,
ADD COLUMN     "youtubeId" TEXT;

-- AlterTable
ALTER TABLE "Service" ADD COLUMN     "image" TEXT,
ADD COLUMN     "position" TEXT,
ADD COLUMN     "publishedAt" TIMESTAMP(3),
ADD COLUMN     "short" TEXT;

-- CreateTable
CREATE TABLE "PageContent" (
    "id" TEXT NOT NULL,
    "page" TEXT NOT NULL,
    "section" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "value" JSONB NOT NULL,
    "status" "ContentStatus" NOT NULL DEFAULT 'PUBLISHED',
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PageContent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Testimonial" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "quote" TEXT NOT NULL,
    "status" "ContentStatus" NOT NULL DEFAULT 'PUBLISHED',
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Testimonial_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeamMember" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "note" TEXT,
    "image" TEXT,
    "position" TEXT,
    "status" "ContentStatus" NOT NULL DEFAULT 'PUBLISHED',
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TeamMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Principle" (
    "id" TEXT NOT NULL,
    "eyebrow" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "iconKey" TEXT,
    "status" "ContentStatus" NOT NULL DEFAULT 'PUBLISHED',
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Principle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VideoItem" (
    "id" TEXT NOT NULL,
    "section" TEXT NOT NULL,
    "youtubeId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "type" TEXT,
    "description" TEXT,
    "status" "ContentStatus" NOT NULL DEFAULT 'PUBLISHED',
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VideoItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CategoryOption" (
    "id" TEXT NOT NULL,
    "scope" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "status" "ContentStatus" NOT NULL DEFAULT 'PUBLISHED',
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CategoryOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NavigationItem" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "status" "ContentStatus" NOT NULL DEFAULT 'PUBLISHED',
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NavigationItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PageContent_page_section_key_key" ON "PageContent"("page", "section", "key");

-- CreateIndex
CREATE UNIQUE INDEX "Testimonial_name_role_key" ON "Testimonial"("name", "role");

-- CreateIndex
CREATE UNIQUE INDEX "TeamMember_name_role_key" ON "TeamMember"("name", "role");

-- CreateIndex
CREATE UNIQUE INDEX "Principle_eyebrow_title_key" ON "Principle"("eyebrow", "title");

-- CreateIndex
CREATE UNIQUE INDEX "VideoItem_section_youtubeId_key" ON "VideoItem"("section", "youtubeId");

-- CreateIndex
CREATE UNIQUE INDEX "CategoryOption_scope_label_key" ON "CategoryOption"("scope", "label");

-- CreateIndex
CREATE UNIQUE INDEX "NavigationItem_label_to_key" ON "NavigationItem"("label", "to");
