"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardEntryPage() {
  const router = useRouter();
  const [roleName, setRoleName] = useState("utilizador");

  useEffect(() => {
    const userRole = localStorage.getItem("user-role") || "client";
    setRoleName(userRole);

    const routes: Record<string, string> = {
      admin: "/dashboard/admin",
      owner: "/dashboard/owner",
      staff: "/dashboard/staff",
      client: "/dashboard/client/viagens",
    };

    const target = routes[userRole.toLowerCase()] || "/dashboard/client/viagens";
    
    const timeout = setTimeout(() => {
      router.push(target);
    }, 500);

    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <div className="h-screen flex items-center justify-center bg-slate-50">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        <div className="animate-pulse font-black uppercase text-slate-400 tracking-[0.3em] text-[10px]">
          Encaminhando para o painel de {roleName}...
        </div>
      </div>
    </div>
  );
}