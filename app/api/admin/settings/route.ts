import { apiSuccess, handleApiError } from "@/lib/cms/api";
import { requireAdminSession } from "@/lib/cms/authz";
import { prisma } from "@/lib/cms/db";
import {
  SITE_SETTINGS_ID,
  ensureSiteSettings,
  getSettingsMediaOptions,
  siteSettingsToDbInput,
  siteSettingsToValue,
} from "@/lib/cms/settings";
import { siteSettingsSchema } from "@/lib/cms/schemas";

export async function GET() {
  try {
    await requireAdminSession();

    const [settings, mediaOptions] = await Promise.all([
      ensureSiteSettings(),
      getSettingsMediaOptions(),
    ]);

    return apiSuccess({ settings, mediaOptions });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(request: Request) {
  try {
    await requireAdminSession();

    const parsed = siteSettingsSchema.parse(await request.json());
    const input = siteSettingsToDbInput(parsed);
    const settings = await prisma.siteSettings.upsert({
      where: { id: SITE_SETTINGS_ID },
      create: input,
      update: {
        brandName: input.brandName,
        adminBrand: input.adminBrand,
        adminEmail: input.adminEmail,
        siteTitle: input.siteTitle,
        siteDescription: input.siteDescription,
        openGraphTitle: input.openGraphTitle,
        openGraphDescription: input.openGraphDescription,
        twitterSite: input.twitterSite,
        logoSrc: input.logoSrc,
        faviconSrc: input.faviconSrc,
        openGraphImage: input.openGraphImage,
        office: input.office,
        footerLocation: input.footerLocation,
        phone: input.phone,
        whatsapp: input.whatsapp,
        email: input.email,
        mapSrc: input.mapSrc,
        instagramUrl: input.instagramUrl,
        youtubeUrl: input.youtubeUrl,
        facebookUrl: input.facebookUrl,
        footerDescription: input.footerDescription,
        footerSubtext: input.footerSubtext,
        footerCredit: input.footerCredit,
      },
    });

    return apiSuccess({ settings: siteSettingsToValue(settings) });
  } catch (error) {
    return handleApiError(error);
  }
}
