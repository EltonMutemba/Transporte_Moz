"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShieldCheck, BarChart3, Users, Building2, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-slate-900 text-white">
      {/* SIDEBAR */}
      <aside className="w-80 border-r border-white/10 p-8 flex flex-col sticky top-0 h-screen">
        <div className="flex items-center gap-3 mb-12 text-red-500 font-black italic uppercase tracking-tighter text-xl">
          <ShieldCheck size={28} /> Admin Panel
        </div>

        <nav className="flex-1 space-y-2">
          <div className="text-white/20 text-[9px] font-black uppercase tracking-[0.3em] mb-4 ml-2">
            Gestão Global
          </div>
          
          <AdminNavLink 
            href="/dashboard/admin" 
            icon={<BarChart3 size={18}/>} 
            label="Relatórios" 
            active={pathname === "/dashboard/admin"} 
          />
          <AdminNavLink 
            href="/dashboard/admin/empresas" 
            icon={<Building2 size={18}/>} 
            label="Transportadoras" 
            active={pathname.includes("/empresas")} 
          />
          <AdminNavLink 
            href="/dashboard/admin/utilizadores" 
            icon={<Users size={18}/>} 
            label="Utilizadores" 
            active={pathname.includes("/utilizadores")} 
          />
        </nav>

        <button className="flex items-center gap-3 text-slate-500 hover:text-red-400 font-black text-[10px] uppercase tracking-widest pt-8 border-t border-white/5 transition-colors">
          <LogOut size={16} /> Sair do Sistema
        </button>
      </aside>

      {/* ÁREA DE CONTEÚDO */}
      <main className="flex-1 p-12 bg-slate-950 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}

function AdminNavLink({ href, icon, label, active }: any) {
  return (
    <Link 
      href={href} 
      className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
        active ? "bg-white/10 text-white shadow-sm" : "text-white/40 hover:bg-white/5 hover:text-white"
      )}
    >
      {icon} {label}
    </Link>
  );
}