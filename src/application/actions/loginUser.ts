"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";
import { cookies } from "next/headers";

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "chave-secreta-moz-2026");

export async function loginUser(formData: FormData) {
  const login = formData.get("login") as string;
  const password = formData.get("password") as string;

  try {
    const user = await prisma.user.findFirst({
      where: { OR: [{ phone: login }, { email: login }] },
    });

    if (!user) return { error: "Credenciais inválidas." };

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return { error: "Credenciais inválidas." };

    // 🔐 GERAÇÃO DO TOKEN (O que o proxy.ts exige)
    const token = await new SignJWT({ 
      id: user.id, 
      role: user.role, 
      username: user.username || user.phone 
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("24h")
      .sign(SECRET);

    // 🍪 SALVA NO COOKIE (O que o proxy.ts lê)
    const cookieStore = await cookies();
    cookieStore.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 dia
    });

    // Retorna para o AuthGuard salvar no sessionStorage (redundância de segurança)
    return { 
      success: true, 
      user: { username: user.username || user.phone, role: user.role } 
    };
  } catch (e) {
    console.error(e);
    return { error: "Erro interno." };
  }
}