import { apiSuccess, handleApiError } from "@/lib/cms/api";
import { getPortfolioVideos, getPublishedPortfolioProjects } from "@/lib/cms/portfolio";

export async function GET() {
  try {
    const [projects, videos] = await Promise.all([
      getPublishedPortfolioProjects(),
      getPortfolioVideos(),
    ]);

    return apiSuccess({ projects, videos });
  } catch (error) {
    return handleApiError(error);
  }
}
