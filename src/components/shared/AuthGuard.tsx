"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// Importa como 'type' para o compilador não procurar código executável
import type { Role } from "@/lib/auth"; 

type AuthGuardProps = {
  children: ReactNode;
  allowedRoles?: Role[];
};

export function AuthGuard({ children, allowedRoles }: AuthGuardProps) {
  // Inicializamos com o tipo correto para satisfazer o TS
  const [user, setUser] = useState<{ username: string; role: Role } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (!storedUser) {
      router.push("/login");
      return;
    }

    try {
      const parsedUser = JSON.parse(storedUser) as { username: string; role: Role };
      
      if (allowedRoles && !allowedRoles.includes(parsedUser.role)) {
        router.push("/login"); 
        return;
      }

      setUser(parsedUser);
    } catch (e) {
      console.error("Erro ao validar sessão local");
      router.push("/login");
    }
  }, [router, allowedRoles]);

  if (!user) return <div className="p-10 text-center font-black uppercase text-xs tracking-widest">Verificando Acesso...</div>;

  return <>{children}</>;
}