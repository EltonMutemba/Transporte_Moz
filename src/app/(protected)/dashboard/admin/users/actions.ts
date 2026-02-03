"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";

/**
 * 1. CRIAR UTILIZADOR
 * Mantém a password genérica "Password123" protegendo a privacidade [cite: 2026-01-28].
 */
export async function createUser(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const role = formData.get("role") as any;

  const hashedPassword = await bcrypt.hash("Password123", 10);

  try {
    await prisma.user.create({
      data: { 
        name, 
        email, 
        phone, 
        role, 
        username: email.split('@')[0],
        password: hashedPassword 
      },
    });
    revalidatePath("/dashboard/admin/users");
    return { success: true };
  } catch (error) {
    console.error("Erro Prisma Create:", error);
    return { success: false };
  }
}

/**
 * 2. EDITAR DADOS UNIFICADO (NOME, TELEFONE E CARGO)
 * Agora captura o 'role' diretamente do modal de edição [cite: 2026-01-28].
 */
export async function updateUser(id: string, formData: FormData) {
  const name = formData.get("name") as string;
  const phone = formData.get("phone") as string;
  const role = formData.get("role") as any; // NOVO: Captura do formulário [cite: 2026-01-28]

  try {
    // Criamos o objeto de dados dinamicamente [cite: 2026-01-28]
    const updateData: any = { name, phone };

    // Só atualizamos o role se ele for enviado (evita erros em OWNERs) [cite: 2026-01-28]
    if (role) {
      updateData.role = role;
    }

    await prisma.user.update({
      where: { id: Number(id) },
      data: updateData,
    });

    revalidatePath("/dashboard/admin/users");
    return { success: true };
  } catch (error) {
    console.error("Erro Prisma Update:", error);
    return { success: false };
  }
}

/**
 * 3. ELIMINAR UTILIZADOR
 */
export async function deleteUser(id: string) {
  try {
    await prisma.user.delete({ 
      where: { id: Number(id) } 
    });
    revalidatePath("/dashboard/admin/users");
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}

/**
 * 4. FUNÇÃO OBSOLETA (PODE SER REMOVIDA)
 * A alteração de privilégio agora acontece dentro da 'updateUser' [cite: 2026-01-28].
 */
export async function updateUserRole(id: string, role: any) {
  try {
    await prisma.user.update({ 
      where: { id: Number(id) },
      data: { role } 
    });
    revalidatePath("/dashboard/admin/users");
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}