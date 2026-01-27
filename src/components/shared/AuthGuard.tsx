"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type AuthGuardProps = {
  children: ReactNode;
  allowedRoles?: string[];
};

export function AuthGuard({ children, allowedRoles }: AuthGuardProps) {
  const [user, setUser] = useState<{ username: string; role: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (!storedUser) {
      router.push("/login");
      return;
    }

    const parsedUser = JSON.parse(storedUser);
    if (allowedRoles && !allowedRoles.includes(parsedUser.role)) {
      router.push("/login");
      return;
    }

    setUser(parsedUser);
  }, [router, allowedRoles]);

  if (!user) return null; // ou um loader

  return <>{children}</>;
}
