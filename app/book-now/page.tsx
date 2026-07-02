import type { Metadata } from "next";
import BookClient from "../book/BookClient";

export const metadata: Metadata = {
  title: "Book Katha Digital",
  description: "Book Katha Digital for your wedding, event, brand, or production.",
  openGraph: {
    title: "Book Katha Digital",
    description: "Share your details and our team will be in touch shortly.",
  },
};

export default function BookNowPage() {
  return <BookClient />;
}
