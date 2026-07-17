import { apiSuccess, handleApiError } from "@/lib/cms/api";
import { bookingInquiryToValue } from "@/lib/cms/booking-inquiries";
import { prisma } from "@/lib/cms/db";
import { bookingInquirySchema } from "@/lib/cms/schemas";

export async function POST(request: Request) {
  try {
    const parsed = bookingInquirySchema.parse(await request.json());
    const inquiry = await prisma.bookingInquiry.create({
      data: {
        name: parsed.name,
        email: parsed.email || null,
        phone: parsed.phone,
        service: parsed.service || null,
        eventType: parsed.eventType || null,
        eventDate: parsed.eventDate ?? null,
        location: parsed.location || null,
        budget: parsed.budget || null,
        message: parsed.message || null,
        status: "NEW",
      },
    });

    return apiSuccess({ inquiry: bookingInquiryToValue(inquiry) }, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
