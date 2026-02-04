"use server";

import { prisma } from "@/lib/prisma";

/**
 * Interface para garantir que o Frontend saiba exatamente o que recebe
 * e o TypeScript pare de reclamar de propriedades inexistentes.
 */
export interface SanitizedBooking {
  id: number;
  reference: string;
  passengerName: string;
  phoneNumber: string;
  status: string;
  totalAmount: number;
  createdAt: string;
  tickets: {
    id: number;
    seatNumber: number;
  }[];
  trip: {
    origin: string;
    destination: string;
    departureTime: string;
    price: number;
    bus: {
      plateNumber: string;
      company: string;
    };
  } | null;
}

export async function getBookingStatus(reference: string): Promise<SanitizedBooking | null> {
  // 1. Verificação de segurança para o Prisma (evita o erro 'possibly undefined')
  if (!prisma) {
    console.error("ERRO_INFRAESTRUTURA: Cliente Prisma não inicializado.");
    return null;
  }

  try {
    const booking = await prisma.booking.findUnique({
      where: { reference },
      include: {
        tickets: {
          include: {
            trip: {
              include: {
                bus: true 
              }
            }
          }
        },
      },
    });

    // Se a reserva não existir ou não tiver bilhetes, abortamos
    if (!booking || !booking.tickets || booking.tickets.length === 0) {
      return null;
    }

    // Assumimos que todos os tickets de uma reserva (Booking) pertencem à mesma viagem (Trip)
    const firstTicket = booking.tickets[0];
    const trip = firstTicket?.trip;

    // 2. SANITIZAÇÃO RADICAL
    // Transformamos os tipos complexos do Prisma (Decimal, Date) em tipos simples (Number, String)
    return {
      id: booking.id,
      reference: booking.reference,
      passengerName: booking.passengerName,
      phoneNumber: booking.phoneNumber,
      status: booking.status,
      
      // Conversão de Decimal para Number
      totalAmount: Number(booking.totalAmount), 
      createdAt: booking.createdAt.toISOString(),
      
      // Mapeamento simplificado dos bilhetes
      tickets: booking.tickets.map(t => ({
        id: t.id,
        seatNumber: t.seatNumber,
      })),

      // Mapeamento simplificado da viagem e autocarro
      trip: trip ? {
        origin: trip.origin,
        destination: trip.destination,
        departureTime: trip.departureTime.toISOString(),
        price: Number(trip.price), // Conversão de Decimal
        bus: {
          // Ajustado para 'plate' conforme o teu Schema.prisma
          plateNumber: trip.bus.plate, 
          // Como 'company' não existe no teu Schema, usamos um fallback para não quebrar a UI
          company: "TransPorto Moz" 
        }
      } : null
    };

  } catch (error) {
    console.error("ERRO_AO_BUSCAR_STATUS_RESERVA:", error);
    return null;
  }
}