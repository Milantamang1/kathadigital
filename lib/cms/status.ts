import { z } from "zod";

export const contentStatusInputSchema = z.enum(["draft", "published", "archived"]);

export type ContentStatusInput = z.infer<typeof contentStatusInputSchema>;

export const contentStatusToDb = {
  draft: "DRAFT",
  published: "PUBLISHED",
  archived: "ARCHIVED",
} as const satisfies Record<ContentStatusInput, "DRAFT" | "PUBLISHED" | "ARCHIVED">;

export const contentStatusFromDb = {
  DRAFT: "draft",
  PUBLISHED: "published",
  ARCHIVED: "archived",
} as const;

export function toDbContentStatus(status: ContentStatusInput) {
  return contentStatusToDb[status];
}

export function fromDbContentStatus(status: keyof typeof contentStatusFromDb) {
  return contentStatusFromDb[status];
}
