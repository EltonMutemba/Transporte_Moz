"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Ticket, Package, LayoutDashboard, LogOut, User } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* SIDEBAR DO CLIENTE (PASSAGEIRO) */}
      <aside className="w-80 bg-slate-950 p-8 hidden lg:flex flex-col text-white sticky top-0 h-screen shadow-2xl">
        
        {/* Logo Identitária */}
        <div className="mb-12 text-xl font-black italic uppercase tracking-tighter">
          Transporto<span className="text-blue-500">Moz</span>
        </div>

        {/* Navegação Principal */}
        <nav className="flex-1 flex flex-col gap-2">
          <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em] mb-4 ml-4">
            Área do Passageiro
          </p>
          
          <ClientNavLink 
            href="/dashboard/client/viagens" 
            icon={<Ticket size={20} />} 
            label="Minhas Viagens" 
            active={pathname.includes("/viagens")} 
          />
          
          <ClientNavLink 
            href="/dashboard/client/encomendas" 
            icon={<Package size={20} />} 
            label="Encomendas" 
            active={pathname.includes("/encomendas")} 
          />

          <ClientNavLink 
            href="/dashboard/client/perfil" 
            icon={<User size={20} />} 
            label="Meu Perfil" 
            active={pathname.includes("/perfil")} 
          />
        </nav>

        {/* Rodapé da Sidebar */}
        <div className="pt-6 border-t border-white/5">
          <button className="flex items-center gap-3 w-full text-slate-500 hover:text-red-500 font-black text-[10px] uppercase tracking-widest transition-colors group">
            <div className="p-2 rounded-lg group-hover:bg-red-500/10">
              <LogOut size={18} />
            </div>
            Sair da Conta
          </button>
        </div>
      </aside>

      {/* ÁREA DE CONTEÚDO DINÂMICO */}
      <main className="flex-1 p-6 md:p-10 lg:p-12 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}

/* COMPONENTE DE LINK AUXILIAR */
function ClientNavLink({ href, icon, label, active }: { href: string; icon: React.ReactNode; label: string; active: boolean }) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-4 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all",
        active
          ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20"
          : "text-slate-400 hover:bg-white/5 hover:text-white"
      )}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}