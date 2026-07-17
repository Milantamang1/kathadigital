import { apiSuccess, handleApiError } from "@/lib/cms/api";
import { prisma } from "@/lib/cms/db";
import { contactMessageToValue } from "@/lib/cms/contact-messages";
import { contactMessageSchema } from "@/lib/cms/schemas";

export async function POST(request: Request) {
  try {
    const parsed = contactMessageSchema.parse(await request.json());
    const message = await prisma.contactMessage.create({
      data: {
        name: parsed.name,
        email: parsed.email,
        phone: parsed.phone || null,
        subject: parsed.subject || null,
        message: parsed.message,
        status: "NEW",
      },
    });

    return apiSuccess({ message: contactMessageToValue(message) }, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
