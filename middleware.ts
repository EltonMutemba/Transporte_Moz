// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Defina as rotas que precisam de autenticação e os papéis permitidos
const protectedRoutes: { path: string; roles: string[] }[] = [
  { path: "/admin", roles: ["admin"] },
  { path: "/dono", roles: ["dono"] },
  { path: "/cobrador", roles: ["cobrador"] },
  { path: "/cliente", roles: ["cliente"] },
];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Permitir arquivos estáticos e /login
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon.ico") ||
    pathname === "/login"
  ) {
    return NextResponse.next();
  }

  // Verificar se a rota é protegida
  const route = protectedRoutes.find((r) => pathname.startsWith(r.path));
  if (!route) {
    return NextResponse.next();
  }

  // Verificar usuário armazenado nos cookies (ou Authorization header)
  const userCookie = req.cookies.get("user");
  if (!userCookie) {
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  const user = JSON.parse(userCookie.value) as { username: string; role: string };

  // Verificar se o papel é permitido
  if (!route.roles.includes(user.role)) {
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// Quais rotas esse middleware deve rodar
export const config = {
  matcher: ["/admin/:path*", "/dono/:path*", "/cobrador/:path*", "/cliente/:path*"],
};
