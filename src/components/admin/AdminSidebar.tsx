"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, Users, Bus, Wallet, Activity, 
  Ticket, CheckCircle, Map, User, FileText, Truck, LogOut,
  Settings, Shield, HelpCircle, Menu, X, PlusCircle, Home 
} from "lucide-react";
import { logoutUser } from "@/application/actions/logoutUser";

const ICONS_MAP = {
  layout: LayoutDashboard,
  users: Users,
  bus: Bus,
  wallet: Wallet,
  activity: Activity,
  ticket: Ticket,
  check: CheckCircle,
  map: Map,
  user: User,
  settings: Settings,
  shield: Shield,
  help: HelpCircle
};

export function AdminSidebar({ title, links = [], userName }: any) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* TRIGGER MOBILE */}
      <div className="lg:hidden fixed top-4 left-4 z-[60]">
        <button onClick={() => setIsOpen(!isOpen)} className="p-3 bg-slate-950 text-white rounded-xl border border-white/10 shadow-2xl active:scale-95 transition-transform">
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[40] lg:hidden animate-in fade-in" onClick={() => setIsOpen(false)} />
      )}

      <aside className={`
        fixed inset-y-0 left-0 z-[50] w-64 bg-slate-950 text-slate-400 flex flex-col h-screen shrink-0 border-r border-white/5 transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:relative lg:translate-x-0
      `}>
        <div className="p-8 flex-1 overflow-y-auto custom-scrollbar">
          
          {/* LOGOTIPO TPMOZ - Agora com Link para Home */}
          <Link href="/" className="flex items-center gap-3 mb-10 group cursor-pointer">
            <div className="p-2 bg-red-600 rounded-lg shadow-lg shadow-red-900/20 group-hover:scale-110 transition-transform">
              <Truck className="text-white w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-black text-white italic tracking-tighter uppercase leading-none">
                TP<span className="text-red-600">MOZ</span>
              </h1>
              <span className="text-[8px] font-bold text-slate-600 uppercase tracking-widest block mt-1 group-hover:text-slate-400 transition-colors">
                {title || "Administração"}
              </span>
            </div>
          </Link>

          {/* NAVEGAÇÃO */}
          <nav className="space-y-1.5">
            {/* BOTÃO PROFISSIONAL PARA HOME NO TOPO DA LISTA */}
            <Link 
              href="/" 
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-[11px] font-bold text-slate-500 hover:text-white hover:bg-white/5 transition-all mb-4 border-b border-white/5 pb-6"
            >
              <Home size={18} className="text-slate-600 group-hover:text-white" />
              Página Principal
            </Link>

            {links.map((link: any) => {
              const Icon = ICONS_MAP[link.iconKey as keyof typeof ICONS_MAP] || FileText;
              const isActive = pathname.startsWith(link.href);
              const isBusLink = link.iconKey === 'bus';

              return (
                <React.Fragment key={link.href}>
                  {isBusLink && (
                    <Link 
                      href="/dashboard/admin/services/new" 
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest bg-blue-600/10 text-blue-400 border border-blue-600/20 hover:bg-blue-600 hover:text-white transition-all my-4 group shadow-sm"
                    >
                      <PlusCircle size={18} className="group-hover:rotate-90 transition-transform" />
                      Novo Serviço
                    </Link>
                  )}

                  <Link 
                    href={link.href} 
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-[11px] font-bold transition-all duration-200 group ${
                      isActive 
                        ? "bg-white/10 text-white shadow-sm" 
                        : "hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <Icon 
                      size={18} 
                      className={`transition-colors ${isActive ? "text-red-600" : "group-hover:text-red-400"}`} 
                    />
                    {link.label}
                  </Link>
                </React.Fragment>
              );
            })}
          </nav>
        </div>
        
        {/* FOOTER INFO */}
        <div className="p-6 border-t border-white/5 bg-black/20">
          <div className="mb-4 px-2 text-center lg:text-left">
            <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Operador Ativo</p>
            <p className="text-xs font-bold text-slate-300 truncate">{userName}</p>
          </div>
          <button 
            onClick={() => logoutUser()}
            className="flex items-center gap-2 justify-center w-full py-2.5 rounded-lg border border-white/5 text-[11px] font-bold text-slate-400 hover:text-white hover:bg-red-600/10 hover:border-red-600/20 transition-all"
          >
            <LogOut size={14} /> Sair do Sistema
          </button>
        </div>
      </aside>
    </>
  );
}