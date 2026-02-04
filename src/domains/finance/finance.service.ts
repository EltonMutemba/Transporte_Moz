import { prisma as db } from "@/lib/prisma";

export const financeService = {
  async getTodayRevenue() {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    // 1. Soma de Bilhetes (Tickets) vendidos hoje
    const ticketSales = await db.ticket.findMany({
      where: { createdAt: { gte: startOfDay } },
      include: { trip: true } // Para aceder ao preço da viagem
    });

    const ticketTotal = ticketSales.reduce((acc, ticket) => acc + Number(ticket.trip.price), 0);

    // 2. Soma de Encomendas (Packages) hoje
    // Nota: Como Package não tem createdAt no teu schema, recomendo adicionar ou usar Trip
    const packageTotal = await db.package.aggregate({
      _sum: { price: true }
    });

    return ticketTotal + Number(packageTotal._sum.price || 0);
  }
};