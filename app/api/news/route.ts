import { apiSuccess, handleApiError } from "@/lib/cms/api";
import { getPublishedNewsPosts } from "@/lib/cms/news";

export async function GET() {
  try {
    const posts = await getPublishedNewsPosts();

    return apiSuccess({ posts });
  } catch (error) {
    return handleApiError(error);
  }
}
