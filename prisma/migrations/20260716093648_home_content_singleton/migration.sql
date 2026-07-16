-- CreateTable
CREATE TABLE "HomeContent" (
    "id" TEXT NOT NULL DEFAULT 'home',
    "metadata" JSONB NOT NULL,
    "heroImg" TEXT NOT NULL,
    "heroAlt" TEXT NOT NULL,
    "eyebrow" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "actions" JSONB NOT NULL,
    "sideLabel" TEXT NOT NULL,
    "metrics" JSONB NOT NULL,
    "whoWeAre" JSONB NOT NULL,
    "servicesSection" JSONB NOT NULL,
    "selectedWorkSection" JSONB NOT NULL,
    "productionsSection" JSONB NOT NULL,
    "youtubeSection" JSONB NOT NULL,
    "newsSection" JSONB NOT NULL,
    "testimonialsSection" JSONB NOT NULL,
    "cta" JSONB NOT NULL,
    "hiddenImage" JSONB NOT NULL,
    "sections" JSONB NOT NULL,
    "status" "ContentStatus" NOT NULL DEFAULT 'PUBLISHED',
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HomeContent_pkey" PRIMARY KEY ("id")
);
