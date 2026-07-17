import { apiSuccess, handleApiError } from "@/lib/cms/api";
import { getPublishedServices } from "@/lib/cms/services";

export async function GET() {
  try {
    const services = await getPublishedServices();

    return apiSuccess({ services });
  } catch (error) {
    return handleApiError(error);
  }
}
