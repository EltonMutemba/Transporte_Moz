// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Defina aqui as rotas públicas
const PUBLIC_PATHS = ["/login", "/"];

// Middleware executado em cada requisição
export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // Permite o acesso a rotas públicas
  if (PUBLIC_PATHS.includes(path)) {
    return NextResponse.next();
  }

  // Tenta recuperar o usuário do cookie (ou sessionStorage via client, mas aqui server-side só cookies)
  const userCookie = req.cookies.get("user"); // Assumindo que você salva { username, role } no cookie

  if (!userCookie) {
    // Redireciona para login se não estiver logado
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = "/login";
    return NextResponse.redirect(loginUrl);
  }

  // Se o usuário estiver logado, podemos restringir por role
  const user = JSON.parse(userCookie.value);
  const role = user.role;

  // Exemplo: restringe /admin apenas para admin
  if (path.startsWith("/admin") && role !== "admin") {
    const homeUrl = req.nextUrl.clone();
    homeUrl.pathname = "/";
    return NextResponse.redirect(homeUrl);
  }

  if (path.startsWith("/dono") && role !== "dono") {
    const homeUrl = req.nextUrl.clone();
    homeUrl.pathname = "/";
    return NextResponse.redirect(homeUrl);
  }

  if (path.startsWith("/cobrador") && role !== "cobrador") {
    const homeUrl = req.nextUrl.clone();
    homeUrl.pathname = "/";
    return NextResponse.redirect(homeUrl);
  }

  if (path.startsWith("/cliente") && role !== "cliente") {
    const homeUrl = req.nextUrl.clone();
    homeUrl.pathname = "/";
    return NextResponse.redirect(homeUrl);
  }

  // Tudo certo, segue a requisição
  return NextResponse.next();
}

// Define para quais rotas este middleware será aplicado
export const config = {
  matcher: [
    "/admin/:path*", 
    "/dono/:path*", 
    "/cobrador/:path*", 
    "/cliente/:path*"
  ],
};
