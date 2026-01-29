import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "chave-secreta-moz-2026");

// ✅ O Next.js 16 exige que o nome da função seja 'proxy'
export async function proxy(request: NextRequest) {
  const token = request.cookies.get("auth-token")?.value;
  const { pathname } = request.nextUrl;

  // 1. Bloqueio base: Sem token não entra em nada no /dashboard
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    // 🕵️ RAIOS-X: Abre o token para ler o 'role' e o 'username'
    const { payload } = await jwtVerify(token, SECRET);
    const userRole = (payload.role as string)?.toUpperCase();

    // 🚫 PROTEÇÃO DE ADMIN: Se tentar entrar em /admin e não for ADMIN
    if (pathname.startsWith("/dashboard/admin") && userRole !== "ADMIN") {
      console.warn(`🚨 ACESSO NEGADO: ${payload.username} tentou invadir o Admin.`);
      return NextResponse.redirect(new URL("/dashboard/client/viagens", request.url));
    }

    // 🚫 PROTEÇÃO DE OWNER: Só OWNER ou ADMIN entram aqui
    if (pathname.startsWith("/dashboard/owner") && userRole !== "OWNER" && userRole !== "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard/client/viagens", request.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Token corrompido ou expirado");
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*"],
};