"use server";

import { signIn } from "@/lib/auth";
import { AuthError } from "next-auth";

// Removido o 'prevState' porque o teu handleSubmit passa apenas o formData
export async function loginUser(formData: FormData) {
  const login = formData.get("login") as string;
  const password = formData.get("password") as string;

  if (!login || !password) {
    return { error: "Por favor, preencha todos os campos." };
  }

  try {
    await signIn("credentials", {
      login,
      password,
      redirectTo: "/dashboard/client/viagens",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Credenciais inválidas. Verifique os dados." };
    }
    // Essencial: permite que o Next.js trate o redirecionamento
    throw error;
  }
}