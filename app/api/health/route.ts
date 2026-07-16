import { apiSuccess, handleApiError } from "@/lib/cms/api";
import { verifyDatabaseConnection } from "@/lib/cms/db";

export async function GET() {
  try {
    const database = await verifyDatabaseConnection();
    return apiSuccess({ status: "ok", database });
  } catch (error) {
    return handleApiError(error);
  }
}
