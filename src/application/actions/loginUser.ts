"use server";

// Unificando com o db.ts que já existe na sua árvore
import { prisma } from "@/lib/prisma"; 
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "chave-secreta-moz-2026");

export async function loginUser(formData: FormData) {
  const login = (formData.get("login") as string)?.trim();
  const password = formData.get("password") as string;
  let destination = "";

  if (!login || !password) {
    return { error: "Por favor, preencha todos os campos." };
  }

  try {
    // 1. Procura o utilizador por email ou telefone
    const user = await prisma.user.findFirst({
      where: { 
        OR: [
          { phone: login }, 
          { email: login.includes("@") ? login : undefined } 
        ] 
      },
    });

    if (!user) return { error: "Credenciais inválidas." };

    // 2. Validação de password
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return { error: "Credenciais inválidas." };

    // 3. Geração do Token JWT (Expira em 24h) [cite: 2026-01-28]
    const token = await new SignJWT({ 
      id: user.id, 
      role: user.role, 
      username: user.username || user.phone 
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("24h")
      .sign(SECRET);

    // 4. Configuração do Cookie de Sessão
    const cookieStore = await cookies();
    cookieStore.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    // 5. Lógica de Redirecionamento Baseada em Role
    switch (user.role) {
      case "ADMIN": destination = "/dashboard/admin"; break;
      case "CLIENT": destination = "/dashboard/client/viagens"; break;
      case "OWNER": destination = "/dashboard/owner"; break;
      case "STAFF": destination = "/dashboard/staff"; break;
      default: destination = "/dashboard";
    }

  } catch (e: any) {
    // IMPORTANTE: O redirect do Next.js funciona lançando um erro [cite: 2026-01-28]
    // Se o catch capturar o erro de redirect, o utilizador nunca sairá da página de login
    if (e.message === "NEXT_REDIRECT") throw e; 
    console.error("Login Error:", e);
    return { error: "Ocorreu um erro interno no servidor." };
  }

  // Executa o redirecionamento fora do bloco try/catch para evitar conflitos [cite: 2026-01-28]
  if (destination) {
    redirect(destination);
  }
}