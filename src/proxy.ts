import { NextResponse } from "next/server";
import type { NextRequest } from "next/server"; 
import { jwtVerify } from "jose";

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "chave-secreta-moz-2026");

/**
 * ✅ CORREÇÃO TURBOPACK: O nome da função DEVE ser 'proxy' 
 * para alinhar com o novo padrão do Next.js 16.
 */
export async function proxy(request: NextRequest) {
  const token = request.cookies.get("auth-token")?.value;
  const { pathname } = request.nextUrl;

  // 1. Bloqueio de acesso sem token
  if (!token) {
    if (pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
  }

  try {
    const { payload } = await jwtVerify(token, SECRET);
    const userRole = (payload.role as string)?.toUpperCase();

    // 2. LOGICA DE REDIRECIONAMENTO (Conforme a tua Árvore)
    // Direciona o Admin para a Visão Geral em /dashboard/admin
    if (pathname === "/dashboard") {
      if (userRole === "ADMIN" || userRole === "OWNER") {
        return NextResponse.redirect(new URL("/dashboard/admin", request.url));
      }
      return NextResponse.redirect(new URL("/dashboard/client/viagens", request.url));
    }

    // 3. PROTEÇÃO DE ROTAS ADMIN
    if (pathname.startsWith("/dashboard/admin") && userRole !== "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard/client/viagens", request.url));
    }

    return NextResponse.next();
  } catch (error) {
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("auth-token");
    return response;
  }
}

// O matcher continua obrigatório
export const config = {
  matcher: ["/dashboard", "/dashboard/:path*"],
};