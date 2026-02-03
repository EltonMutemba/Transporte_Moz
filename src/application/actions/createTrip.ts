"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getBuses() {
  return await prisma.bus.findMany({ orderBy: { plate: "asc" } });
}

export async function createBus(formData: FormData) {
  const plate = formData.get("plate") as string;
  const model = formData.get("model") as string;

  try {
    await prisma.bus.create({
      data: { plate: plate.toUpperCase(), model }
    });
    revalidatePath("/admin/buses");
    return { success: true };
  } catch (e) {
    return { error: "Erro ao cadastrar autocarro. Placa duplicada?" };
  }
}