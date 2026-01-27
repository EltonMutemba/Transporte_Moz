"use client"

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const userStr = sessionStorage.getItem("user");
    if (!userStr) {
      router.push("/(auth)/login");
      return;
    }

    const user = JSON.parse(userStr);
    if (!pathname.includes(user.role)) {
      router.push("/(auth)/login");
      return;
    }

    setAuthorized(true);
  }, [pathname, router]);

  if (!authorized) return <div className="p-10 text-center">Verificando acesso...</div>;

  return <>{children}</>;
}
