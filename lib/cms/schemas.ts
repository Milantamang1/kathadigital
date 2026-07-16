import { z } from "zod";
import {
  commonContentFieldsSchema,
  mediaReferenceSchema,
  optionalMediaReferenceSchema,
  slugSchema,
} from "./validation";

export const serviceSchema = commonContentFieldsSchema.extend({
  title: z.string().trim().min(1).max(160),
  slug: slugSchema,
  short: z.string().trim().min(1).max(600),
  image: mediaReferenceSchema,
  position: z.string().trim().min(1).max(80),
});

export const portfolioProjectSchema = commonContentFieldsSchema.extend({
  title: z.string().trim().min(1).max(180),
  slug: slugSchema,
  category: z.string().trim().min(1).max(80),
  location: z.string().trim().min(1).max(120),
  date: z.string().trim().min(1).max(80),
  desc: z.string().trim().min(1).max(700),
  image: mediaReferenceSchema,
  position: z.string().trim().min(1).max(80),
});

export const productionSchema = commonContentFieldsSchema.extend({
  title: z.string().trim().min(1).max(180),
  slug: slugSchema,
  type: z.string().trim().min(1).max(100),
  description: z.string().trim().min(1).max(900),
  image: optionalMediaReferenceSchema,
  position: z.string().trim().min(1).max(80).optional(),
  youtubeId: z.string().trim().min(1).max(40).optional(),
  episodes: z.array(z.record(z.string(), z.string())).optional(),
  destinations: z.array(z.string().trim().min(1)).optional(),
});

export const newsPostSchema = commonContentFieldsSchema.extend({
  title: z.string().trim().min(1).max(180),
  slug: slugSchema,
  category: z.string().trim().min(1).max(80),
  date: z.string().trim().min(1).max(80),
  author: z.string().trim().min(1).max(120),
  excerpt: z.string().trim().min(1).max(800),
  image: mediaReferenceSchema,
  position: z.string().trim().min(1).max(80),
});

export const eventSchema = commonContentFieldsSchema.extend({
  name: z.string().trim().min(1).max(180),
  slug: slugSchema,
  date: z.string().trim().min(1).max(80),
  location: z.string().trim().min(1).max(160),
  desc: z.string().trim().min(1).max(800),
  image: mediaReferenceSchema,
  position: z.string().trim().min(1).max(80),
});

export const contactMessageSchema = z.object({
  name: z.string().trim().min(1).max(140),
  email: z.string().trim().email().max(180),
  phone: z.string().trim().max(60).optional(),
  subject: z.string().trim().max(180).optional(),
  message: z.string().trim().min(1).max(5000),
});

export const bookingInquirySchema = z.object({
  name: z.string().trim().min(1).max(140),
  email: z.string().trim().email().max(180).optional(),
  phone: z.string().trim().min(1).max(60),
  service: z.string().trim().max(160).optional(),
  eventDate: z.coerce.date().optional(),
  location: z.string().trim().max(180).optional(),
  budget: z.string().trim().max(120).optional(),
  message: z.string().trim().max(5000).optional(),
});
