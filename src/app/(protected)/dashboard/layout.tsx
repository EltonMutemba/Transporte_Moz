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
      // AJUSTE: No mobile, a estrutura é vertical (flex-col), no desktop é horizontal (lg:flex-row)
      <div className="flex flex-col lg:flex-row min-h-screen bg-white overflow-hidden">
        
        {/* SIDEBAR: Já cuidámos da responsividade interna dela antes */}
        <AdminSidebar title={role} links={links} userName={userName} />
        
        {/* MAIN: Agora ele ocupa todo o espaço restante corretamente */}
        <main className="flex-1 flex flex-col bg-slate-50 min-w-0 overflow-hidden border-t lg:border-t-0 lg:border-l border-slate-200">
          
          {/* HEADER RESPONSIVO: Altura fixa com paddings ajustados */}
          <header className="h-16 border-b border-slate-200 bg-white flex items-center px-4 md:px-8 justify-between sticky top-0 z-40">
            <div className="flex items-center gap-3 ml-12 lg:ml-0"> {/* ml-12 abre espaço para o botão do menu no mobile */}
              <div className="w-2 h-2 bg-red-600 rounded-none hidden sm:block" />
              <h3 className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-slate-400">
                SISTEMA DE GESTÃO <span className="text-slate-900">OPERACIONAL</span>
              </h3>
            </div>
            
            {/* Indicador de Status Subtil */}
            <div className="flex items-center gap-2">
               <span className="hidden sm:inline-block text-[8px] font-bold text-slate-300 uppercase tracking-widest">v1.0.2</span>
               <div className="w-1.5 h-1.5 bg-green-500 rounded-none animate-pulse" />
            </div>
          </header>
          
          {/* CONTEÚDO: Padding fluido e scroll independente */}
          <div className="flex-1 overflow-y-auto p-4 md:p-10">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </div>
        </main>
      </div>
    );
  } catch (err) { redirect("/login"); }
}