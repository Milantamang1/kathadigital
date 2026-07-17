import type { BookingInquiry, BookingStatus } from "@prisma/client";

export type BookingInquiryStatus =
  | "new"
  | "inProgress"
  | "contacted"
  | "confirmed"
  | "completed"
  | "cancelled"
  | "archived";

export type BookingInquiryValue = {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  eventType: string;
  eventDate: string;
  location: string;
  budget: string;
  message: string;
  adminNotes: string;
  status: BookingInquiryStatus;
  createdAt: string;
  updatedAt: string;
};

export const bookingStatusToDb = {
  new: "NEW",
  inProgress: "IN_PROGRESS",
  contacted: "CONTACTED",
  confirmed: "CONFIRMED",
  completed: "COMPLETED",
  cancelled: "CANCELLED",
  archived: "ARCHIVED",
} as const satisfies Record<BookingInquiryStatus, BookingStatus>;

const bookingStatusFromDb = {
  NEW: "new",
  IN_PROGRESS: "inProgress",
  CONTACTED: "contacted",
  CONFIRMED: "confirmed",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
  ARCHIVED: "archived",
} as const satisfies Record<BookingStatus, BookingInquiryStatus>;

export function bookingInquiryToValue(inquiry: BookingInquiry): BookingInquiryValue {
  return {
    id: inquiry.id,
    name: inquiry.name,
    email: inquiry.email ?? "",
    phone: inquiry.phone,
    service: inquiry.service ?? "",
    eventType: inquiry.eventType ?? "",
    eventDate: inquiry.eventDate?.toISOString() ?? "",
    location: inquiry.location ?? "",
    budget: inquiry.budget ?? "",
    message: inquiry.message ?? "",
    adminNotes: inquiry.adminNotes ?? "",
    status: bookingStatusFromDb[inquiry.status],
    createdAt: inquiry.createdAt.toISOString(),
    updatedAt: inquiry.updatedAt.toISOString(),
  };
}
