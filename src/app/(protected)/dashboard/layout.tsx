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
      /**
       * FIX PRINCIPAL: 'h-screen' e 'overflow-hidden' no contentor raiz 
       * impedem que a página inteira estique e quebre o layout mobile. [cite: 2026-02-04]
       */
      <div className="flex flex-col lg:flex-row h-screen w-full bg-white overflow-hidden">
        
        {/* SIDEBAR: Componente que gere a sua própria responsividade (fixed em mobile) [cite: 2026-02-04] */}
        <AdminSidebar title={role} links={links} userName={userName} />
        
        {/* MAIN: 
            1. 'flex-1': Ocupa todo o espaço restante. [cite: 2026-02-04]
            2. 'min-w-0': Crucial! Impede que o flexbox cresça além do ecrã por causa de tabelas largas. [cite: 2026-02-04]
            3. 'overflow-hidden': Garante que o main seja um contentor estanque. [cite: 2026-02-04]
        */}
        <main className="flex-1 min-w-0 w-full flex flex-col bg-slate-50 overflow-hidden border-t lg:border-t-0 lg:border-l border-slate-200">
          
          {/* HEADER FIXO: Altura constante para não roubar espaço do conteúdo [cite: 2026-02-04] */}
          <header className="h-16 flex-shrink-0 border-b border-slate-200 bg-white flex items-center px-4 md:px-8 justify-between sticky top-0 z-40">
            <div className="flex items-center gap-3 ml-12 lg:ml-0">
              <div className="w-2 h-2 bg-red-600 rounded-none hidden sm:block" />
              <h3 className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-slate-400">
                SISTEMA DE GESTÃO <span className="text-slate-900">OPERACIONAL</span>
              </h3>
            </div>
            
            <div className="flex items-center gap-2">
               <span className="hidden sm:inline-block text-[8px] font-bold text-slate-300 uppercase tracking-widest">v1.0.2</span>
               <div className="w-1.5 h-1.5 bg-green-500 rounded-none animate-pulse" />
            </div>
          </header>
          
          {/* ÁREA DE SCROLL INDEPENDENTE: 
              É aqui que o 'children' (tabelas, gráficos, etc) vive. 
              O 'overflow-x-hidden' aqui é a última barreira contra a quebra lateral. [cite: 2026-02-04]
          */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-10 custom-scrollbar">
            <div className="max-w-7xl mx-auto w-full">
              {children}
            </div>
          </div>

        </main>
      </div>
    );
  } catch (err) { 
    console.error("Erro JWT:", err);
    redirect("/login"); 
  }
}