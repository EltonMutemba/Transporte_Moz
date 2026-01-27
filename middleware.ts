// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_PATHS = ["/login", "/"];

export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  if (PUBLIC_PATHS.includes(path)) {
    return NextResponse.next();
  }

  const userCookie = req.cookies.get("user");
  if (!userCookie) {
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = "/login";
    return NextResponse.redirect(loginUrl);
  }

  const user = JSON.parse(userCookie.value);
  const role = user.role;

  if (path.startsWith("/admin") && role !== "admin") return NextResponse.redirect("/");
  if (path.startsWith("/dono") && role !== "dono") return NextResponse.redirect("/");
  if (path.startsWith("/cobrador") && role !== "cobrador") return NextResponse.redirect("/");
  if (path.startsWith("/cliente") && role !== "cliente") return NextResponse.redirect("/");

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*", 
    "/dono/:path*", 
    "/cobrador/:path*", 
    "/cliente/:path*"
  ],
};
