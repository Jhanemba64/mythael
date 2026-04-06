import { redirect } from "next/navigation";
import { verifyAdmin } from "@/lib/auth/admin";
import { AdminSidebar } from "./sidebar";

export default async function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAdmin = await verifyAdmin();

  if (!isAdmin) {
    redirect("/admin/login");
  }

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      <main className="flex-1 overflow-auto p-6 lg:p-8">{children}</main>
    </div>
  );
}
