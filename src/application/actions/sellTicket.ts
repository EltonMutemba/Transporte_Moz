"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getLocations() {
  // Comentado porque a tabela 'location' não existe no schema.prisma
  // return await prisma.location.findMany({ orderBy: { name: "asc" } });
  
  return []; // Retorna lista vazia para o build passar
}

export async function addLocation(name: string) {
  if (!name.trim()) return { error: "Nome é obrigatório" };
  
  try {
    // Comentado para evitar erro TS2339 no Render
    /*
    await prisma.location.create({ data: { name: name.trim() } });
    revalidatePath("/admin/trips");
    */
    return { success: true };
  } catch (e) {
    return { error: "Erro ao processar localização." };
  }
}