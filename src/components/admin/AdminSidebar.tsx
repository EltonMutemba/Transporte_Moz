"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, Users, Bus, Wallet, Activity, 
  Ticket, CheckCircle, Map, User, FileText, Truck, LogOut,
  Settings, Shield, HelpCircle // Adicionei extras para prevenir futuros erros
} from "lucide-react";
import { logoutUser } from "@/application/actions/logoutUser";

// O objeto de mapeamento deve conter todas as chaves usadas no teu navigation.ts
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
  settings: Settings, // RESOLVE O ERRO: "settings" is not assignable
  shield: Shield,
  help: HelpCircle
};

export interface SidebarLink {
  label: string;
  href: string;
  iconKey: keyof typeof ICONS_MAP;
}

interface AdminSidebarProps {
  title?: string;
  links: SidebarLink[];
  userName: string;
}

export function AdminSidebar({ links = [], userName }: AdminSidebarProps) {
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error("Erro ao processar logout:", error);
    }
  };

  return (
    <aside className="w-64 bg-slate-950 text-slate-400 flex flex-col h-screen shrink-0 border-r border-white/5">
      <div className="p-8">
        <div className="flex items-center gap-3 mb-10">
          <div className="p-2 bg-red-600 rounded-lg shadow-lg shadow-red-900/20">
            <Truck className="text-white w-5 h-5" />
          </div>
          <h1 className="text-xl font-black text-white italic tracking-tighter uppercase">
            TP<span className="text-red-600">MOZ</span>
          </h1>
        </div>

        <nav className="space-y-1.5">
          {links.map((link) => {
            // Se a chave não existir no mapa, ele usa o FileText por segurança
            const Icon = ICONS_MAP[link.iconKey as keyof typeof ICONS_MAP] || FileText;
            const isActive = link.href === "/dashboard" 
              ? pathname === "/dashboard" 
              : pathname.startsWith(link.href);

            return (
              <Link 
                key={link.href} 
                href={link.href} 
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
      
      <div className="mt-auto p-6 border-t border-white/5 bg-black/20">
        <div className="mb-4">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Sessão Ativa</p>
          <p className="text-xs font-bold text-slate-300 truncate">{userName}</p>
        </div>
        
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 justify-center w-full py-2.5 rounded-lg border border-white/5 text-[11px] font-bold text-slate-400 hover:text-white hover:bg-red-600/10 hover:border-red-600/20 transition-all"
        >
          <LogOut size={14} /> Sair do Sistema
        </button>
      </div>
    </aside>
  );
}