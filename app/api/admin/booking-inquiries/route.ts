import { apiSuccess, handleApiError } from "@/lib/cms/api";
import { requireAdminSession } from "@/lib/cms/authz";
import { bookingInquiryToValue } from "@/lib/cms/booking-inquiries";
import { prisma } from "@/lib/cms/db";

export async function GET() {
  try {
    await requireAdminSession();

    const inquiries = await prisma.bookingInquiry.findMany({
      orderBy: { createdAt: "desc" },
    });

    return apiSuccess({ inquiries: inquiries.map(bookingInquiryToValue) });
  } catch (error) {
    return handleApiError(error);
  }
}
