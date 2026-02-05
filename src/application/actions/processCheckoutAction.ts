"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// Removi o import de auth que estava a dar erro

type CheckoutResponse = 
  | { success: true; reference: string; error?: never }
  | { success: false; error: string; reference?: never };

export async function processCheckoutAction(data: {
  tripId: number;
  passengerName: string;
  phoneNumber: string;
  paymentMethod: "mpesa" | "emola";
  seatNumbers: number[];
  totalAmount: number;
}): Promise<CheckoutResponse> {
  try {
    // TENTATIVA DE BUSCAR O USER PELO TELEMÓVEL (Já que não temos a sessão configurada)
    // Isto garante que o bilhete apareça no dashboard se o user logar com este número
    const existingUser = await prisma.user.findUnique({
      where: { phone: data.phoneNumber }
    });

    const userId = existingUser ? existingUser.id : null;

    const reference = await prisma.$transaction(async (tx) => {
      
      const occupied = await tx.ticket.findMany({
        where: {
          tripId: Number(data.tripId),
          seatNumber: { in: data.seatNumbers },
          paymentStatus: { in: ["PENDING", "PAID"] }
        }
      });

      if (occupied.length > 0) {
        throw new Error(`Lugares ${occupied.map(s => s.seatNumber).join(", ")} já ocupados.`);
      }

      const generatedRef = `MOV-${Date.now()}-${data.phoneNumber.slice(-4)}`;

      // Criar Booking e Tickets
      await (tx as any).booking.create({
        data: {
          reference: generatedRef,
          passengerName: data.passengerName,
          phoneNumber: data.phoneNumber,
          totalAmount: data.totalAmount,
          status: "PENDING",
          tickets: {
            create: data.seatNumbers.map((seat) => ({
              tripId: Number(data.tripId),
              seatNumber: seat,
              paymentStatus: "PENDING",
              userId: userId, // Vincula se encontrar o user pelo telefone
            })),
          },
        },
      });

      await tx.trip.update({
        where: { id: Number(data.tripId) },
        data: { availableSeats: { decrement: data.seatNumbers.length } }
      });

      return generatedRef;
    }, { timeout: 15000 });

    console.log(`[PAGAMENTO] Push enviado: ${reference}`);
    revalidatePath("/dashboard/client/viagens");
    
    return { success: true, reference: String(reference) };

  } catch (error: any) {
    console.error("ERRO_CHECKOUT:", error.message);
    return { success: false, error: error.message };
  }
}