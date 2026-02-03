"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getLocations() {
  return await prisma.location.findMany({ orderBy: { name: "asc" } });
}

export async function addLocation(name: string) {
  if (!name.trim()) return { error: "Nome é obrigatório" };
  
  try {
    await prisma.location.create({ data: { name: name.trim() } });
    revalidatePath("/admin/trips"); // Atualiza onde quer que as cidades apareçam
    return { success: true };
  } catch (e) {
    return { error: "Esta cidade já existe." };
  }
}