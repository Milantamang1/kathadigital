import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/AdminShell";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Frontend-only Katha Digital CMS dashboard preview.",
};

export default function AdminPage() {
  return <AdminShell />;
}
