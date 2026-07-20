import fs from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { apiFailure, apiSuccess, handleApiError } from "@/lib/cms/api";
import { requireAdminSession } from "@/lib/cms/authz";

const allowedTypes = {
  "image/avif": "avif",
  "image/gif": "gif",
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
} as const;

export async function POST(request: Request) {
  try {
    await requireAdminSession();

    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return apiFailure(400, "VALIDATION_ERROR", "An image file is required.");
    }

    const extension = allowedTypes[file.type as keyof typeof allowedTypes];
    if (!extension) {
      return apiFailure(400, "VALIDATION_ERROR", "Logo and favicon uploads must be image files.");
    }

    if (file.size > 2 * 1024 * 1024) {
      return apiFailure(400, "VALIDATION_ERROR", "Image uploads must be 2MB or smaller.");
    }

    const mediaRoot = path.join(process.cwd(), "public", "katha-media");
    await fs.mkdir(mediaRoot, { recursive: true });

    const filename = `settings-${Date.now()}-${randomUUID()}.${extension}`;
    const diskPath = path.join(mediaRoot, filename);
    await fs.writeFile(diskPath, Buffer.from(await file.arrayBuffer()));

    return apiSuccess({ src: `/katha-media/${filename}` }, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
