import { z } from "zod";
import { apiSuccess, handleApiError } from "@/lib/cms/api";
import { requireAdminSession } from "@/lib/cms/authz";
import { contactMessageToValue, contactStatusToDb } from "@/lib/cms/contact-messages";
import { prisma } from "@/lib/cms/db";

type RouteContext = {
  params: Promise<{ id: string }>;
};

const statusUpdateSchema = z.object({
  status: z.enum(["new", "read", "resolved", "archived"]),
});

export async function PATCH(request: Request, context: RouteContext) {
  try {
    await requireAdminSession();

    const { id } = await context.params;
    const parsed = statusUpdateSchema.parse(await request.json());
    const message = await prisma.contactMessage.update({
      where: { id },
      data: { status: contactStatusToDb[parsed.status] },
    });

    return apiSuccess({ message: contactMessageToValue(message) });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  try {
    await requireAdminSession();

    const { id } = await context.params;

    await prisma.contactMessage.delete({ where: { id } });

    return apiSuccess({ id });
  } catch (error) {
    return handleApiError(error);
  }
}
