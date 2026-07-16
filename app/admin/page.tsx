import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { AUTH_COOKIE_NAME, verifyAdminToken } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Frontend-only Katha Digital CMS dashboard preview.",
};

export default async function AdminPage() {
  const token = (await cookies()).get(AUTH_COOKIE_NAME)?.value;
  const session = await verifyAdminToken(token);

  if (!session) {
    redirect("/admin/login");
  }

  return <AdminShell />;
}
