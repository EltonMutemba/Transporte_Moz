import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { NextResponse } from "next/server";

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "chave-secreta-moz-2026");

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth-token")?.value;

  if (!token) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

  try {
    const { payload } = await jwtVerify(token, SECRET);

    // 🛡️ A VERDADEIRA SEGURANÇA: Se não for ADMIN, a API nega os dados
    if (payload.role !== "ADMIN") {
      return NextResponse.json({ error: "Acesso proibido para o seu cargo" }, { status: 403 });
    }

    // Aqui viria a tua consulta ao MySQL (ex: Prisma)
    const users = [{ id: 1, name: "Stélio" }]; 
    return NextResponse.json(users);

  } catch (e) {
    return NextResponse.json({ error: "Token inválido" }, { status: 401 });
  }
}