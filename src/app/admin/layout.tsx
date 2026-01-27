import { ReactNode } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AuthGuard } from "@/components/shared/AuthGuard";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <AuthGuard allowedRoles={["admin"]}>
      <div className="flex min-h-screen bg-gray-50">
        <AdminSidebar />
        <main className="flex-1 p-10">{children}</main>
      </div>
    </AuthGuard>
  );
}
