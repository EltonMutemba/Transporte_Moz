"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, Users, Bus, Wallet, Activity, 
  Ticket, CheckCircle, Map, User, FileText, Truck, LogOut,
  Settings, Shield, HelpCircle, Menu, X 
} from "lucide-react";
import { logoutUser } from "@/application/actions/logoutUser";

/**
 * MAPA DE ÍCONES: Centraliza a gestão visual do sistema.
 */
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

export interface SidebarLink {
  label: string;
  href: string;
  iconKey: keyof typeof ICONS_MAP;
}

/**
 * PROPS: 'title' é opcional para evitar erros de tipagem no layout.
 */
interface AdminSidebarProps {
  title?: string; 
  links: SidebarLink[];
  userName: string;
}

export function AdminSidebar({ title, links = [], userName }: AdminSidebarProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error("Erro ao processar logout:", error);
    }
  };

  return (
    <>
      {/* TRIGGER MOBILE: Botão flutuante para abrir o menu */}
      <div className="lg:hidden fixed top-4 left-4 z-[60]">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="p-3 bg-slate-950 text-white rounded-xl border border-white/10 shadow-2xl active:scale-95 transition-transform"
          aria-label="Abrir Menu"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* OVERLAY: Escurece o conteúdo ao abrir no mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[40] lg:hidden animate-in fade-in duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* SIDEBAR: Estrutura industrial/brutalista adaptável */}
      <aside className={`
        fixed inset-y-0 left-0 z-[50] w-64 bg-slate-950 text-slate-400 flex flex-col h-screen shrink-0 border-r border-white/5 transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:relative lg:translate-x-0
      `}>
        <div className="p-8 flex-1 overflow-y-auto custom-scrollbar">
          {/* LOGOTIPO */}
          <div className="flex items-center gap-3 mb-10">
            <div className="p-2 bg-red-600 rounded-lg shadow-lg shadow-red-900/20">
              <Truck className="text-white w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-black text-white italic tracking-tighter uppercase leading-none">
                TP<span className="text-red-600">MOZ</span>
              </h1>
              {title && (
                <span className="text-[8px] font-bold text-slate-600 uppercase tracking-widest block mt-1">
                  Acesso: {title}
                </span>
              )}
            </div>
          </div>

          {/* NAVEGAÇÃO PRINCIPAL */}
          <nav className="space-y-1.5">
            {links.map((link) => {
              const Icon = ICONS_MAP[link.iconKey as keyof typeof ICONS_MAP] || FileText;
              const isActive = link.href === "/dashboard" 
                ? pathname === "/dashboard" 
                : pathname.startsWith(link.href);

              return (
                <Link 
                  key={link.href} 
                  href={link.href} 
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-[11px] font-bold transition-all duration-200 group ${
                    isActive 
                      ? "bg-white/10 text-white shadow-sm shadow-black/20" 
                      : "hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon 
                    size={18} 
                    className={`transition-colors ${isActive ? "text-red-600" : "group-hover:text-red-400"}`} 
                  />
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
        
        {/* RODAPÉ DA SIDEBAR: Info de Sessão e Logout */}
        <div className="p-6 border-t border-white/5 bg-black/20">
          <div className="mb-4">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Sessão Ativa</p>
            <p className="text-xs font-bold text-slate-300 truncate" title={userName}>{userName}</p>
          </div>
          
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 justify-center w-full py-2.5 rounded-lg border border-white/5 text-[11px] font-bold text-slate-400 hover:text-white hover:bg-red-600/10 hover:border-red-600/20 transition-all active:scale-95"
          >
            <LogOut size={14} /> Sair do Sistema
          </button>
        </div>
      </aside>
    </>
  );
}