"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, Users, Bus, Wallet, Activity, 
  Ticket, CheckCircle, Map, User, FileText, Truck, LogOut 
} from "lucide-react";

const ICONS_MAP: Record<string, any> = {
  layout: LayoutDashboard,
  users: Users,
  bus: Bus,
  wallet: Wallet,
  activity: Activity,
  ticket: Ticket,
  check: CheckCircle,
  map: Map,
  user: User,
};

export function AdminSidebar({ title, links = [], userName }: any) {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-slate-950 text-slate-400 flex flex-col h-screen shrink-0">
      <div className="p-8">
        <div className="flex items-center gap-3 mb-10">
          <div className="p-2 bg-red-600 rounded-lg"><Truck className="text-white w-5 h-5" /></div>
          <h1 className="text-xl font-black text-white italic tracking-tighter">TP<span className="text-red-600">MOZ</span></h1>
        </div>

        <nav className="space-y-1.5">
          {links.map((link: any) => {
            const Icon = ICONS_MAP[link.iconKey] || FileText;
            const isActive = pathname === link.href;
            return (
              <Link key={link.href} href={link.href} className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${isActive ? "bg-white/10 text-white shadow-lg" : "hover:text-white hover:bg-white/5"}`}>
                <Icon size={18} className={isActive ? "text-red-600" : ""} />
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
      
      <div className="mt-auto p-6 border-t border-slate-900 text-center">
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">{userName}</p>
        <button className="flex items-center gap-2 justify-center w-full text-xs text-slate-500 hover:text-red-500 transition-colors">
          <LogOut size={14} /> Sair
        </button>
      </div>
    </aside>
  );
}