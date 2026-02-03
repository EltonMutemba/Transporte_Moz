import { NextResponse } from "next/server";
import type { NextRequest } from "next/server"; 
import { jwtVerify } from "jose";

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "chave-secreta-moz-2026");

// ✅ No Next.js 16, a função DEVE chamar-se 'proxy'
export async function proxy(request: NextRequest) {
  const token = request.cookies.get("auth-token")?.value;
  const { pathname } = request.nextUrl;

  // 1. Redireciona se não houver token (Proteção Básica)
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const { payload } = await jwtVerify(token, SECRET);
    const userRole = (payload.role as string)?.toUpperCase();

    // 2. Proteção de Nível Admin
    if (pathname.startsWith("/dashboard/admin") && userRole !== "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard/client/viagens", request.url));
    }

    // 3. Proteção de Nível Owner (Dono da Transportadora)
    if (pathname.startsWith("/dashboard/owner") && userRole !== "OWNER" && userRole !== "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard/client/viagens", request.url));
    }

    return NextResponse.next();
  } catch (error) {
    // 4. Token corrompido ou expirado: Limpeza de segurança
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("auth-token");
    return response;
  }
}

// Define quais rotas o proxy deve vigiar
export const config = {
  matcher: ["/dashboard/:path*"],
};