import { requireAdmin } from "@/lib/admin/auth";
import AdminSidebar from "@/components/admin/AdminSidebar";

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await requireAdmin();

  return (
    <div className="min-h-screen bg-[#04060d] text-slate-100 light:bg-[#eef1f7] light:text-slate-700 lg:flex">
      <AdminSidebar email={user.email} />
      <div className="min-w-0 flex-1">
        <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-8 sm:py-8">{children}</main>
      </div>
    </div>
  );
}
