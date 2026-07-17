import type { ContactMessage, MessageStatus } from "@prisma/client";

export type ContactMessageValue = {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: "new" | "read" | "resolved" | "archived";
  createdAt: string;
  updatedAt: string;
};

export const contactStatusToDb = {
  new: "NEW",
  read: "READ",
  resolved: "REPLIED",
  archived: "ARCHIVED",
} as const satisfies Record<ContactMessageValue["status"], MessageStatus>;

const contactStatusFromDb = {
  NEW: "new",
  READ: "read",
  REPLIED: "resolved",
  ARCHIVED: "archived",
} as const satisfies Record<MessageStatus, ContactMessageValue["status"]>;

export function contactMessageToValue(message: ContactMessage): ContactMessageValue {
  return {
    id: message.id,
    name: message.name,
    email: message.email,
    phone: message.phone ?? "",
    subject: message.subject ?? "",
    message: message.message,
    status: contactStatusFromDb[message.status],
    createdAt: message.createdAt.toISOString(),
    updatedAt: message.updatedAt.toISOString(),
  };
}
