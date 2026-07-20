import fs from "node:fs/promises";
import path from "node:path";
import type { Prisma, SiteSettings } from "@prisma/client";
import { prisma } from "@/lib/cms/db";

export const SITE_SETTINGS_ID = "site-settings";

export type SiteSettingsValue = {
  brandName: string;
  adminBrand: string;
  adminEmail: string;
  siteTitle: string;
  siteDescription: string;
  openGraphTitle: string;
  openGraphDescription: string;
  twitterSite: string;
  logoSrc: string;
  faviconSrc: string;
  openGraphImage: string;
  office: string;
  footerLocation: string;
  phone: string;
  whatsapp: string;
  email: string;
  mapSrc: string;
  instagramUrl: string;
  youtubeUrl: string;
  facebookUrl: string;
  footerDescription: string;
  footerSubtext: string;
  footerCredit: string;
};

export const defaultSiteSettings: SiteSettingsValue = {
  brandName: "Katha Digital",
  adminBrand: "CMS Admin",
  adminEmail: "hello@kathadigital.com",
  siteTitle: "Katha Digital",
  siteDescription:
    "Katha Digital is a premium cinematic production studio for wedding films, photography, events, original shows, music videos, brand stories, and digital media.",
  openGraphTitle: "Katha Digital - Premium Cinematic Production Studio",
  openGraphDescription:
    "Premium wedding films, photography, events, original shows, music videos, brand stories, and digital media.",
  twitterSite: "@KathaDigital",
  logoSrc: "/katha-media/kathadigital-logo-cutout.png",
  faviconSrc: "/katha-media/kathadigital-logo.png",
  openGraphImage: "/katha-media/hero-preview.jpg",
  office: "Madhyapur Thimi, Bhaktapur, Nepal",
  footerLocation: "Bhaktapur, Nepal",
  phone: "+977 9861078220",
  whatsapp: "+977 9861078220",
  email: "hello@kathadigital.com",
  mapSrc: "https://www.google.com/maps?q=Katha%20Digital%4027.6628191,85.3932101&z=17&output=embed",
  instagramUrl: "#",
  youtubeUrl: "#",
  facebookUrl: "#",
  footerDescription:
    "Premium photography, cinematography, events, original shows, and digital films shaped with story-first production craft.",
  footerSubtext: "Built in Nepal for people, brands, and moments that deserve a cinematic memory.",
  footerCredit: "Stories composed with cinematic care.",
};

export function siteSettingsToValue(settings: SiteSettings): SiteSettingsValue {
  return {
    brandName: settings.brandName,
    adminBrand: settings.adminBrand,
    adminEmail: settings.adminEmail,
    siteTitle: settings.siteTitle,
    siteDescription: settings.siteDescription,
    openGraphTitle: settings.openGraphTitle,
    openGraphDescription: settings.openGraphDescription,
    twitterSite: settings.twitterSite ?? "",
    logoSrc: settings.logoSrc,
    faviconSrc: settings.faviconSrc,
    openGraphImage: settings.openGraphImage,
    office: settings.office,
    footerLocation: settings.footerLocation,
    phone: settings.phone,
    whatsapp: settings.whatsapp,
    email: settings.email,
    mapSrc: settings.mapSrc,
    instagramUrl: settings.instagramUrl ?? "",
    youtubeUrl: settings.youtubeUrl ?? "",
    facebookUrl: settings.facebookUrl ?? "",
    footerDescription: settings.footerDescription,
    footerSubtext: settings.footerSubtext,
    footerCredit: settings.footerCredit,
  };
}

export function siteSettingsToDbInput(settings: SiteSettingsValue): Prisma.SiteSettingsCreateInput {
  return {
    id: SITE_SETTINGS_ID,
    brandName: settings.brandName,
    adminBrand: settings.adminBrand,
    adminEmail: settings.adminEmail,
    siteTitle: settings.siteTitle,
    siteDescription: settings.siteDescription,
    openGraphTitle: settings.openGraphTitle,
    openGraphDescription: settings.openGraphDescription,
    twitterSite: settings.twitterSite || null,
    logoSrc: settings.logoSrc,
    faviconSrc: settings.faviconSrc,
    openGraphImage: settings.openGraphImage,
    office: settings.office,
    footerLocation: settings.footerLocation,
    phone: settings.phone,
    whatsapp: settings.whatsapp,
    email: settings.email,
    mapSrc: settings.mapSrc,
    instagramUrl: settings.instagramUrl || null,
    youtubeUrl: settings.youtubeUrl || null,
    facebookUrl: settings.facebookUrl || null,
    footerDescription: settings.footerDescription,
    footerSubtext: settings.footerSubtext,
    footerCredit: settings.footerCredit,
  };
}

export async function getSiteSettings() {
  try {
    const record = await prisma.siteSettings.findUnique({ where: { id: SITE_SETTINGS_ID } });
    return record ? siteSettingsToValue(record) : defaultSiteSettings;
  } catch {
    return defaultSiteSettings;
  }
}

export async function ensureSiteSettings() {
  const record = await prisma.siteSettings.upsert({
    where: { id: SITE_SETTINGS_ID },
    create: siteSettingsToDbInput(defaultSiteSettings),
    update: {},
  });

  return siteSettingsToValue(record);
}

export async function getSettingsMediaOptions() {
  const mediaRoot = path.join(process.cwd(), "public", "katha-media");
  const entries = await fs.readdir(mediaRoot, { withFileTypes: true });

  return entries
    .filter((entry) => entry.isFile())
    .map((entry) => `/katha-media/${entry.name}`)
    .filter((src) => /\.(avif|gif|jpe?g|png|webp)$/i.test(src))
    .sort((a, b) => a.localeCompare(b));
}
