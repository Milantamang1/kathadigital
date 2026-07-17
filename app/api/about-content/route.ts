import { apiSuccess, handleApiError } from "@/lib/cms/api";
import { getPublishedAboutContent } from "@/lib/cms/about-content";

export async function GET() {
  try {
    const content = await getPublishedAboutContent();
    return apiSuccess({ content });
  } catch (error) {
    return handleApiError(error);
  }
}
