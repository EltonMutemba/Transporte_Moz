"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Landmark, Bus, Users2, Settings2, LogOut, BarChart } from "lucide-react";
import { cn } from "@/lib/utils";

export default function OwnerLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-indigo-50/20">
      {/* SIDEBAR DO OWNER */}
      <aside className="w-80 bg-white border-r border-indigo-100 p-8 hidden lg:flex flex-col shadow-sm">
        <div className="flex items-center gap-3 mb-12 px-2">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
            <Landmark size={20} />
          </div>
          <span className="font-black uppercase tracking-tighter text-xl italic text-slate-900">
            OWNER<span className="text-indigo-600">.</span>HUB
          </span>
        </div>

        <nav className="flex-1 space-y-2">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 ml-4">Gestão de Negócio</p>
          <OwnerNavLink href="/dashboard/owner" icon={<BarChart size={18}/>} label="Minha Receita" active={pathname === "/dashboard/owner"} />
          <OwnerNavLink href="/dashboard/owner/frota" icon={<Bus size={18}/>} label="Gerir Frota" active={pathname.includes("/frota")} />
          <OwnerNavLink href="/dashboard/owner/staff" icon={<Users2 size={18}/>} label="Minha Equipa" active={pathname.includes("/staff")} />
          <OwnerNavLink href="/dashboard/owner/config" icon={<Settings2 size={18}/>} label="Configurações" active={pathname.includes("/config")} />
        </nav>

        <button className="flex items-center gap-3 text-slate-400 hover:text-red-500 pt-8 border-t border-indigo-50 transition-colors font-bold text-[10px] uppercase tracking-widest">
          <LogOut size={16}/> Terminar Sessão
        </button>
      </aside>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}

function OwnerNavLink({ href, icon, label, active }: any) {
  return (
    <Link href={href} className={cn(
      "flex items-center gap-4 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all",
      active 
        ? "bg-indigo-600 text-white shadow-xl shadow-indigo-200" 
        : "text-slate-400 hover:bg-indigo-50 hover:text-indigo-600"
    )}>
      {icon} {label}
    </Link>
  );
}