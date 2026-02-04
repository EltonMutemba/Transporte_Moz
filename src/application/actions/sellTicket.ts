"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function processCheckoutAction(data: {
  tripId: number;
  passengerName: string;
  phoneNumber: string;
  seatNumbers: number[];
  totalAmount: number;
}) {
  try {
    // 1. INICIAR TRANSAÇÃO (Tudo ou nada)
    const result = await prisma.$transaction(async (tx) => {
      
      // 2. VALIDAR SE OS ASSENTOS AINDA ESTÃO LIVRES
      const occupied = await tx.ticket.findMany({
        where: {
          tripId: data.tripId,
          seatNumber: { in: data.seatNumbers },
          paymentStatus: { in: ["PENDING", "PAID"] }
        }
      });

      if (occupied.length > 0) {
        throw new Error(`Os assentos ${occupied.map(s => s.seatNumber).join(", ")} já não estão disponíveis.`);
      }

      // 3. GERAR REFERÊNCIA ÚNICA (Padrão Moçambique)
      const reference = `MOV-${Date.now()}-${data.phoneNumber.slice(-4)}`;

      // 4. CRIAR RESERVA E BILHETES (Nested Write)
      const booking = await tx.booking.create({
        data: {
          reference,
          passengerName: data.passengerName,
          phoneNumber: data.phoneNumber,
          totalAmount: data.totalAmount,
          status: "PENDING",
          tickets: {
            create: data.seatNumbers.map((seat) => ({
              tripId: data.tripId,
              seatNumber: seat,
              paymentStatus: "PENDING",
            })),
          },
        },
        include: { tickets: true }
      });

      // 5. ATUALIZAR CAPACIDADE DA VIAGEM
      await tx.trip.update({
        where: { id: data.tripId },
        data: { 
          availableSeats: { decrement: data.seatNumbers.length } 
        }
      });

      return booking;
    });

    /**
     * 6. SIMULAÇÃO DO PUSH M-PESA [cite: 2026-02-04]
     * Aqui é onde a tua API chamaria o gateway externo.
     */
    console.log(`[M-PESA PUSH] Enviado para ${data.phoneNumber} - Ref: ${result.reference}`);

    revalidatePath("/(public)/search"); // Atualiza lista de viagens
    
    return { success: true, reference: result.reference };

  } catch (error: any) {
    console.error("ERRO_CHECKOUT:", error.message);
    return { success: false, error: error.message || "Erro interno no processamento." };
  }
}