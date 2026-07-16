import { z } from "zod";
import { contentStatusInputSchema } from "./status";

export const slugSchema = z
  .string()
  .trim()
  .min(1)
  .max(120)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use a lowercase URL slug.");

export const displayOrderSchema = z.coerce.number().int().min(0).default(0);

export const publishedAtSchema = z.coerce.date().nullable().optional();

export const commonContentFieldsSchema = z.object({
  status: contentStatusInputSchema.default("published"),
  displayOrder: displayOrderSchema,
  publishedAt: publishedAtSchema,
});

export const mediaReferenceSchema = z
  .string()
  .trim()
  .min(1)
  .max(300)
  .refine((value) => value.startsWith("/katha-media/"), {
    message: "Media must reference an existing /katha-media asset.",
  })
  .refine((value) => !value.includes("..") && !value.includes("\\"), {
    message: "Media paths cannot contain traversal segments.",
  })
  .refine((value) => /\.(avif|gif|jpe?g|png|webp)$/i.test(value), {
    message: "Media path must reference a supported image file.",
  });

export const optionalMediaReferenceSchema = z
  .union([mediaReferenceSchema, z.literal("")])
  .optional();

export function createSlug(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

export function validateSlugFromTitle(value: string) {
  return slugSchema.parse(createSlug(value));
}
