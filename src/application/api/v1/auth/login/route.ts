import { prisma } from "../../../../../lib/prisma";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { SignJWT } from "jose";
import { cookies } from "next/headers";

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "chave-secreta-moz-2026");

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email: username }, { username: username }]
      },
    });

    if (!user) return NextResponse.json({ error: "Utilizador não encontrado" }, { status: 401 });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return NextResponse.json({ error: "Senha incorreta" }, { status: 401 });

    const token = await new SignJWT({ id: user.id, role: user.role })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("2h")
      .sign(SECRET);

    const cookieStore = await cookies();
    cookieStore.set("auth-token", token, { httpOnly: true, path: "/" });

    // 💡 IMPORTANTE: Retornar o role aqui
    return NextResponse.json({ message: "OK", role: user.role });

  } catch (error) {
    return NextResponse.json({ error: "Erro no servidor" }, { status: 500 });
  }
}