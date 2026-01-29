"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardEntryPage() {
  const router = useRouter();

  useEffect(() => {
    // Aqui virá a lógica de autenticação real (Ex: Supabase, Clerk ou JWT)
    // Por agora, altere manualmente esta string para testar cada rota:
    const userRole = "client"; // Opções: "admin", "owner", "staff", "client"

    const routes = {
      admin: "/dashboard/admin",
      owner: "/dashboard/owner",
      staff: "/dashboard/staff",
      client: "/dashboard/client/viagens",
    };

    // Redireciona conforme o papel, ou volta para o login se for desconhecido
    const target = routes[userRole as keyof typeof routes] || "/auth/login";
    router.push(target);
  }, [router]);

  return (
    <div className="h-screen flex items-center justify-center bg-slate-50">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        <div className="animate-pulse font-black uppercase text-slate-400 tracking-[0.3em] text-[10px]">
          A verificar credenciais...
        </div>
      </div>
    </div>
  );
}