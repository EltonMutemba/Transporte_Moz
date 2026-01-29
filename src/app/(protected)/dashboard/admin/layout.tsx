"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  ShieldCheck, BarChart3, Users, 
  Building2, LogOut, BusFront 
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleSignOut = async () => {
    // Aqui, no futuro, chamarás a tua API de Logout (ex: NextAuth ou sessão manual)
    console.log("A encerrar sessão no MySQL...");
    window.location.href = "/login"; 
  };

  return (
    <div className="flex min-h-screen bg-slate-950 text-white">
      <aside className="w-80 border-r border-white/5 p-8 flex flex-col sticky top-0 h-screen bg-slate-900/50 backdrop-blur-xl">
        <div className="flex items-center gap-3 mb-12 text-red-600 font-black italic uppercase tracking-tighter text-xl">
          <ShieldCheck size={28} />
          <span>Admin Panel</span>
        </div>

        <nav className="flex-1 space-y-2">
          <AdminNavLink href="/dashboard/admin" icon={<BarChart3 size={18}/>} label="Relatórios" active={pathname === "/dashboard/admin"} />
          <AdminNavLink href="/dashboard/admin/users" icon={<Users size={18}/>} label="Utilizadores" active={pathname.includes("/users")} />
          <AdminNavLink href="/dashboard/admin/buses" icon={<BusFront size={18}/>} label="Frota" active={pathname.includes("/buses")} />
          <AdminNavLink href="/dashboard/admin/finance" icon={<Building2 size={18}/>} label="Financeiro" active={pathname.includes("/finance")} />
        </nav>

        <div className="pt-8 border-t border-white/5">
          <button onClick={handleSignOut} className="flex items-center gap-4 w-full text-slate-500 hover:text-red-500 font-black text-[10px] uppercase tracking-widest transition-all group py-2">
            <LogOut size={18} /> Sair do Sistema
          </button>
        </div>
      </aside>

      <main className="flex-1 p-12 overflow-y-auto bg-gradient-to-br from-slate-950 to-slate-900">
        <div className="max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}

function AdminNavLink({ href, icon, label, active }: NavLinkProps) {
  return (
    <Link href={href} className={cn(
      "flex items-center gap-4 px-5 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all duration-300",
      active ? "bg-red-600 text-white shadow-lg shadow-red-900/40 translate-x-1" : "text-white/40 hover:bg-white/5 hover:text-white"
    )}>
      {icon} {label}
    </Link>
  );
}

interface NavLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  active: boolean;
}