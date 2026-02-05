"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// Definimos o tipo de retorno explicitamente para evitar erros no Frontend
type CheckoutResponse = 
  | { success: true; reference: string; error?: never }
  | { success: false; error: string; reference?: never };

export async function processCheckoutAction(data: {
  tripId: number;
  passengerName: string;
  phoneNumber: string;
  paymentMethod: "mpesa" | "emola"; // Adicionado aqui
  seatNumbers: number[];
  totalAmount: number;
}): Promise<CheckoutResponse> { // Forçamos o tipo de retorno
  try {
    const reference = await prisma.$transaction(async (tx) => {
      
      const occupied = await tx.ticket.findMany({
        where: {
          tripId: Number(data.tripId),
          seatNumber: { in: data.seatNumbers },
          paymentStatus: { in: ["PENDING", "PAID"] }
        }
      });

      if (occupied.length > 0) {
        throw new Error(`Lugares ${occupied.map(s => s.seatNumber).join(", ")} já foram reservados.`);
      }

      const generatedRef = `MOV-${Date.now()}-${data.phoneNumber.slice(-4)}`;

      await (tx as any).booking.create({
        data: {
          reference: generatedRef,
          passengerName: data.passengerName,
          phoneNumber: data.phoneNumber,
          // Se o teu banco ainda não tem a coluna paymentMethod, 
          // comenta a linha abaixo até fazeres o prisma migrate
          // paymentMethod: data.paymentMethod, 
          totalAmount: data.totalAmount,
          status: "PENDING",
          tickets: {
            create: data.seatNumbers.map((seat) => ({
              tripId: Number(data.tripId),
              seatNumber: seat,
              paymentStatus: "PENDING",
            })),
          },
        },
      });

      await tx.trip.update({
        where: { id: Number(data.tripId) },
        data: { 
          availableSeats: { decrement: data.seatNumbers.length } 
        }
      });

      return generatedRef;
    }, {
      timeout: 15000 
    });

    console.log(`[PAGAMENTO] Push ${data.paymentMethod} enviado: ${reference}`);

    revalidatePath("/(public)/search");
    
    // Retorno sanitizado e tipado
    return {
      success: true,
      reference: String(reference),
    };

  } catch (error: any) {
    console.error("ERRO_FATAL_CHECKOUT:", error.message);
    return { 
      success: false, 
      error: error.message || "Falha técnica no processamento." 
    };
  }
}