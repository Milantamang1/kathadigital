import { apiSuccess, handleApiError } from "@/lib/cms/api";
import { getEventVideos, getPublishedEvents } from "@/lib/cms/events";

export async function GET() {
  try {
    const [events, videos] = await Promise.all([getPublishedEvents(), getEventVideos()]);

    return apiSuccess({ events, videos });
  } catch (error) {
    return handleApiError(error);
  }
}
