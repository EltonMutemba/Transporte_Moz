"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function simulatePayment(reference: string) {
  try {
    await prisma.booking.update({
      where: { reference },
      data: { status: "PAID" },
    });
    
    // Isto avisa o Next.js para atualizar os dados desta rota
    revalidatePath("/checkout/success");
    
    return { success: true };
  } catch (error) {
    return { error: "Erro ao simular pagamento" };
  }
}