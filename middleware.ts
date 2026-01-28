// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Por agora, deixa passar tudo para poderes ver as telas
  return NextResponse.next();
}

// Configura para rodar apenas no dashboard
export const config = {
  matcher: ["/dashboard/:path*"],
};