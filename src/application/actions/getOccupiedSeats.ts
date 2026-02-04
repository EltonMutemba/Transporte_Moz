"use server"; // OBRIGATÓRIO para Server Actions

import { prisma } from "@/lib/prisma";

export async function getOccupiedSeats(tripId: number) {
  // Proteção para o TypeScript e Runtime
  if (!prisma) {
    console.error("Prisma não inicializado");
    return [];
  }

  try {
    const occupied = await prisma.ticket.findMany({
      where: {
        tripId: Number(tripId),
        paymentStatus: { in: ["PENDING", "PAID"] }
      },
      select: { seatNumber: true }
    });

    return occupied.map(t => t.seatNumber);
  } catch (error) {
    console.error("ERRO_AO_BUSCAR_ASSENTOS:", error);
    return [];
  }
}