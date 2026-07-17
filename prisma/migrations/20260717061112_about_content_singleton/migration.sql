-- CreateTable
CREATE TABLE "AboutContent" (
    "id" TEXT NOT NULL DEFAULT 'about',
    "metadata" JSONB NOT NULL,
    "hero" JSONB NOT NULL,
    "studio" JSONB NOT NULL,
    "principles" JSONB NOT NULL,
    "founder" JSONB NOT NULL,
    "team" JSONB NOT NULL,
    "cta" JSONB NOT NULL,
    "sections" JSONB NOT NULL,
    "status" "ContentStatus" NOT NULL DEFAULT 'PUBLISHED',
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AboutContent_pkey" PRIMARY KEY ("id")
);
