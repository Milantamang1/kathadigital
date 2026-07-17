import { apiSuccess, handleApiError } from "@/lib/cms/api";
import { requireAdminSession } from "@/lib/cms/authz";
import { contactMessageToValue } from "@/lib/cms/contact-messages";
import { prisma } from "@/lib/cms/db";

export async function GET() {
  try {
    await requireAdminSession();

    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
    });

    return apiSuccess({ messages: messages.map(contactMessageToValue) });
  } catch (error) {
    return handleApiError(error);
  }
}
