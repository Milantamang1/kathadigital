import { z } from "zod";
import { apiSuccess, handleApiError } from "@/lib/cms/api";
import { requireAdminSession } from "@/lib/cms/authz";
import { bookingInquiryToValue, bookingStatusToDb } from "@/lib/cms/booking-inquiries";
import { prisma } from "@/lib/cms/db";

type RouteContext = {
  params: Promise<{ id: string }>;
};

const inquiryUpdateSchema = z.object({
  status: z
    .enum(["new", "inProgress", "contacted", "confirmed", "completed", "cancelled", "archived"])
    .optional(),
  adminNotes: z.string().trim().max(5000).optional(),
});

export async function PATCH(request: Request, context: RouteContext) {
  try {
    await requireAdminSession();

    const { id } = await context.params;
    const parsed = inquiryUpdateSchema.parse(await request.json());
    const inquiry = await prisma.bookingInquiry.update({
      where: { id },
      data: {
        ...(parsed.status ? { status: bookingStatusToDb[parsed.status] } : {}),
        ...(parsed.adminNotes !== undefined ? { adminNotes: parsed.adminNotes } : {}),
      },
    });

    return apiSuccess({ inquiry: bookingInquiryToValue(inquiry) });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  try {
    await requireAdminSession();

    const { id } = await context.params;

    await prisma.bookingInquiry.delete({ where: { id } });

    return apiSuccess({ id });
  } catch (error) {
    return handleApiError(error);
  }
}
