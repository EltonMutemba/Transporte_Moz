import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const userRole = req.auth?.user?.role?.toUpperCase();

  const isDashboardPage = nextUrl.pathname.startsWith("/dashboard");

  // 1. Se não estiver logado e tentar entrar no dashboard -> Login
  if (!isLoggedIn && isDashboardPage) {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

  // 2. Lógica de Redirecionamento Inteligente (A tua Árvore)
  if (nextUrl.pathname === "/dashboard") {
    if (userRole === "ADMIN" || userRole === "OWNER") {
      return NextResponse.redirect(new URL("/dashboard/admin", nextUrl));
    }
    return NextResponse.redirect(new URL("/dashboard/client/viagens", nextUrl));
  }

  // 3. Proteção de Rotas Admin (Só ADMIN entra aqui)
  if (nextUrl.pathname.startsWith("/dashboard/admin") && userRole !== "ADMIN") {
    return NextResponse.redirect(new URL("/dashboard/client/viagens", nextUrl));
  }

  return NextResponse.next();
});

// Matcher para proteger toda a árvore do dashboard
export const config = {
  matcher: ["/dashboard/:path*", "/dashboard"],
};