import { apiSuccess, handleApiError } from "@/lib/cms/api";
import { getHomepageData } from "@/lib/cms/home-content";

export async function GET() {
  try {
    const data = await getHomepageData();
    return apiSuccess(data);
  } catch (error) {
    return handleApiError(error);
  }
}
