"use server";

import { revalidatePath } from "next/cache";
import { userService } from "@/domains/users/user.service";

export async function updateProfile(formData: FormData) {
  const id = formData.get("id");
  const name = formData.get("name")?.toString();
  const phone = formData.get("phone")?.toString();

  if (!id || !name) return { error: "Dados obrigatórios em falta." };

  try {
    await userService.updateUser(Number(id), { name, phone });
    revalidatePath("/dashboard/client/perfil");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "Falha ao atualizar perfil." };
  }
}