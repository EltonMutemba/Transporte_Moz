import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { jwtVerify } from "jose";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { NAVIGATION_CONFIG } from "@/lib/navigation";
import { Role } from "@prisma/client";

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "chave-secreta-moz-2026");

export default async function DashboardRootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth-token")?.value;
  if (!token) redirect("/login");

  try {
    const { payload } = await jwtVerify(token, SECRET);
    const role = (payload.role as string).toUpperCase() as Role;
    const userName = (payload.username || "Utilizador") as string;
    const links = NAVIGATION_CONFIG[role] || [];

    return (
      <div className="flex h-screen bg-white overflow-hidden">
        {/* Sidebar sem arredondamentos */}
        <AdminSidebar title={role} links={links} userName={userName} />
        
        {/* MAIN: Removemos mt-2, mr-2, mb-2 e rounded para as bordas ficarem retas e encostadas */}
        <main className="flex-1 flex flex-col bg-slate-50 overflow-hidden border-l border-slate-200">
          <header className="h-16 border-b border-slate-200 bg-white flex items-center px-8 justify-between sticky top-0 z-40">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-red-600 rounded-none" /> {/* Quadrado em vez de círculo */}
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
                SISTEMA DE GESTÃO <span className="text-slate-900">OPERACIONAL</span>
              </h3>
            </div>
          </header>
          
          <div className="flex-1 overflow-y-auto p-6 lg:p-10">
            {children}
          </div>
        </main>
      </div>
    );
  } catch (err) { redirect("/login"); }
}