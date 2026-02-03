import { prisma } from "@/lib/prisma";

export class TripService {
  static async getOwnerDashboardStats() {
    const [totalBuses, activeTripsCount, pendingPackages] = await Promise.all([
      prisma.bus.count(),
      prisma.trip.count({ where: { status: "AVAILABLE" } }),
      prisma.package.count({ where: { status: "PENDING" } })
    ]);

    const activeTrips = await prisma.trip.findMany({
      where: { status: "AVAILABLE" },
      include: { 
        bus: true,
        _count: { select: { tickets: true } }
      },
      take: 5,
      orderBy: { departureTime: 'asc' }
    });

    return {
      kpis: [
        { label: "Frota Ativa", value: totalBuses.toString(), icon: "bus", trend: "estável" },
        { label: "Viagens Hoje", value: activeTripsCount.toString(), icon: "map", trend: "subida" },
        { label: "Encomendas", value: pendingPackages.toString(), icon: "package", trend: "alerta" },
        { label: "Ocupação", value: "75%", icon: "users", trend: "estável" }
      ],
      formattedTrips: activeTrips.map(trip => ({
        id: trip.id,
        origin: trip.origin,
        destination: trip.destination,
        bus: trip.bus.plate,
        // Correção do erro de overload: use "2-digit" [cite: 2026-02-03]
        time: trip.departureTime.toLocaleTimeString('pt-MZ', { 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
        occupancy: `${trip._count.tickets}/${trip.bus.capacity}`
      }))
    };
  }
}