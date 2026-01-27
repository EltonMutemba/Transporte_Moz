"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { Role } from "@/lib/auth";

type AuthGuardProps = {
  children: ReactNode;
  allowedRoles?: Role[];
};

export function AuthGuard({ children, allowedRoles }: AuthGuardProps) {
  const [user, setUser] = useState<{ username: string; role: Role } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (!storedUser) {
      router.push("/login");
      return;
    }

    const parsedUser = JSON.parse(storedUser) as { username: string; role: Role };
    if (allowedRoles && !allowedRoles.includes(parsedUser.role)) {
      router.push("/login");
      return;
    }

    setUser(parsedUser);
  }, [router, allowedRoles]);

  if (!user) return <div>Carregando...</div>;

  return <>{children}</>;
}
