import { apiSuccess, handleApiError } from "@/lib/cms/api";
import { getPublishedProductions, getUpcomingProductions } from "@/lib/cms/productions";

export async function GET() {
  try {
    const [productions, upcomingProductions] = await Promise.all([
      getPublishedProductions(),
      getUpcomingProductions(),
    ]);

    return apiSuccess({ productions, upcomingProductions });
  } catch (error) {
    return handleApiError(error);
  }
}
