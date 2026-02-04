"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createService(formData: FormData) {
  // 1. Pegar os dados como Strings
  const origin = formData.get("origin") as string;
  const destination = formData.get("destination") as string;
  const priceRaw = formData.get("price") as string;
  const busIdRaw = formData.get("busId") as string;
  const departureTime = formData.get("departureTime") as string;

  try {
    // 2. CONVERSÃO CRÍTICA: Transformar String em Número (Int) [cite: 2026-02-04]
    const busId = parseInt(busIdRaw);
    const price = parseFloat(priceRaw);

    // 3. Buscar o autocarro usando o ID já convertido para Int
    const bus = await prisma.bus.findUnique({ 
      where: { id: busId } 
    });

    if (!bus) throw new Error("Autocarro não encontrado.");

    // 4. Criar a Viagem
    await prisma.trip.create({
      data: {
        origin,
        destination,
        price: price,
        busId: busId, // Aqui agora vai um Int, o Prisma vai aceitar!
        departureTime: new Date(departureTime),
        status: "AVAILABLE",
        availableSeats: bus.capacity,
      },
    });

  } catch (error) {
    console.error("Erro ao conectar à BD:", error);
    return { error: "Falha ao gravar os dados." };
  }

  // 5. Sucesso: Limpar cache e redirecionar
  revalidatePath("/dashboard/admin");
  redirect("/dashboard/admin");
}