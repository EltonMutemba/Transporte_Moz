"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logoutUser() {
  const cookieStore = await cookies();
  
  // 1. Remove o Cookie que o seu proxy.ts exige
  cookieStore.delete("auth-token");

  // 2. Redireciona para o login
  // Nota: O redirect no servidor é seguro aqui porque é o fim da linha.
  redirect("/login");
}