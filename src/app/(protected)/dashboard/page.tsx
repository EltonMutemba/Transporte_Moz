import React from "react";
import FleetKPI from "@/components/admin/FleetKPI";
import LiveTrip from "@/components/admin/LiveTrip";
import MaintenanceItem from "@/components/admin/MaintenanceItem";
import { maintenanceItems } from "@/components/admin/data";
import { db } from "@/lib/db";
import { Wallet, Users, Bus, Package } from "lucide-react";
import { Role } from "@prisma/client"; // Importamos o Enum real

export default async function GeneralDashboardPage() {
  // 1. Buscas filtradas para precisão operacional [cite: 2026-01-28]
  const [totalClients, totalBuses, totalPackages, ticketData, dbTrips] = await Promise.all([
    // CONTAGEM PRECISA: Apenas clientes são passageiros [cite: 2026-01-28]
    db.user.count({ where: { role: Role.CLIENT } }), 
    db.bus.count(),
    db.package.count(),
    db.ticket.findMany({ include: { trip: true } }),
    // Buscamos as viagens reais para substituir o dado estático [cite: 2026-01-28]
    db.trip.findMany({ 
      take: 3, 
      include: { bus: true, tickets: true },
      orderBy: { departureTime: 'asc' }
    })
  ]);

  // 2. Cálculo da Receita
  const ticketRevenue = ticketData.reduce((acc, t) => acc + Number(t.trip.price), 0);
  const packageRevenue = await db.package.aggregate({ _sum: { price: true } });
  const totalRevenue = ticketRevenue + Number(packageRevenue._sum.price || 0);

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-4xl font-black text-slate-950 uppercase italic tracking-tighter">
          Dashboard <span className="text-red-600">Real-Time</span>
        </h1>
        <p className="text-slate-500 font-bold text-[10px] uppercase tracking-widest">Controlo Operacional TPMOZ</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <FleetKPI 
          label="Receita Bruta" 
          value={`${totalRevenue.toLocaleString()} MT`} 
          trend="Total" 
          up={true} 
          icon={<Wallet size={20} className="text-emerald-600" />} 
        />
        <FleetKPI 
          label="Passageiros" 
          value={totalClients.toString()} // Agora mostra "1" em vez de "4" [cite: 2026-01-28]
          trend="Clientes Reais" 
          up={true} 
          icon={<Users size={20} className="text-blue-600" />} 
        />
        <FleetKPI 
          label="Frota Ativa" 
          value={totalBuses.toString()} 
          trend="Unidades" 
          up={true} 
          icon={<Bus size={20} className="text-red-600" />} 
        />
        <FleetKPI 
          label="Encomendas" 
          value={totalPackages.toString()} 
          trend="Cargas" 
          up={true} 
          icon={<Package size={20} className="text-amber-600" />} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-slate-200 p-8 shadow-sm">
          <h3 className="text-slate-400 font-black text-[10px] uppercase tracking-widest mb-6">Viagens em Curso (Live)</h3>
          <div className="space-y-4">
            {/* MAPEANDO VIAGENS REAIS DA DB [cite: 2026-01-28] */}
            {dbTrips.map((trip) => (
              <LiveTrip 
                key={trip.id}
                bus={trip.bus.plate}
                route={`${trip.origin} ↔ ${trip.destination}`}
                driver="A designar" // Precisamos de um campo Driver no schema futuramente
                status={trip.status}
                load={`${trip.tickets.length}/${trip.bus.capacity}`}
                isWarning={trip.availableSeats < 5}
              />
            ))}
          </div>
        </div>

        <div className="bg-slate-50 rounded-[2.5rem] border border-slate-200 p-8">
          <h3 className="text-slate-400 font-black text-[10px] uppercase tracking-widest mb-6">Alertas de Oficina</h3>
          <div className="space-y-4">
            {maintenanceItems.map((item, i) => <MaintenanceItem key={i} {...item} />)}
          </div>
        </div>
      </div>
    </div>
  );
}