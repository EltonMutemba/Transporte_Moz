"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getBuses() {
  return await prisma.bus.findMany({ orderBy: { plate: "asc" } });
}

export async function createBus(formData: FormData) {
  const plate = formData.get("plate") as string;
  const model = formData.get("model") as string;
  
  // CORREÇÃO: Captura a capacidade e converte para número. 
  // Se não vier nada do form, assume 50 lugares (padrão de autocarro)
  const capacityInput = formData.get("capacity");
  const capacity = capacityInput ? Number(capacityInput) : 50;

  try {
    await prisma.bus.create({
      // Adicionamos 'capacity' aqui para satisfazer o Prisma
      data: { 
        plate: plate.toUpperCase(), 
        model,
        capacity 
      }
    });
    
    revalidatePath("/admin/buses");
    return { success: true };
  } catch (e) {
    console.error("Erro ao criar bus:", e);
    return { error: "Erro ao cadastrar autocarro. Verifique se a placa já existe." };
  }
}