import React from "react";
import FleetKPI from "@/components/admin/FleetKPI";
import LiveTrip from "@/components/admin/LiveTrip";
import MaintenanceItem from "@/components/admin/MaintenanceItem";
import { maintenanceItems } from "@/components/admin/data";
import { db } from "@/lib/db";
import { Wallet, Users, Bus, Package } from "lucide-react";
import { Role } from "@prisma/client";

export default async function GeneralDashboardPage() {
  const [totalClients, totalBuses, totalPackages, ticketData, dbTrips] = await Promise.all([
    db.user.count({ where: { role: Role.CLIENT } }), 
    db.bus.count(),
    db.package.count(),
    db.ticket.findMany({ include: { trip: true } }),
    db.trip.findMany({ 
      take: 3, 
      include: { bus: true, tickets: true },
      orderBy: { departureTime: 'asc' }
    })
  ]);

  const ticketRevenue = ticketData.reduce((acc, t) => acc + Number(t.trip.price), 0);
  const packageRevenue = await db.package.aggregate({ _sum: { price: true } });
  const totalRevenue = ticketRevenue + Number(packageRevenue._sum.price || 0);

  return (
    // AJUSTE: p-4 no mobile para ganhar espaço lateral
    <div className="p-4 md:p-8 space-y-6 md:space-y-8 animate-in fade-in duration-500">
      
      {/* HEADER RESPONSIVO */}
      <div>
        <h1 className="text-2xl md:text-4xl font-black text-slate-950 uppercase italic tracking-tighter leading-tight">
          Dashboard <span className="text-red-600">Real-Time</span>
        </h1>
        <p className="text-slate-500 font-bold text-[9px] md:text-[10px] uppercase tracking-widest mt-1">
          Controlo Operacional TPMOZ
        </p>
      </div>

      {/* GRID DE KPIs: 1 col (mobile), 2 col (tablet), 4 col (desktop) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <FleetKPI 
          label="Receita Bruta" 
          value={`${totalRevenue.toLocaleString()} MT`} 
          trend="Total" up={true} 
          icon={<Wallet size={20} className="text-emerald-600" />} 
        />
        <FleetKPI 
          label="Passageiros" 
          value={totalClients.toString()} 
          trend="Clientes Reais" up={true} 
          icon={<Users size={20} className="text-blue-600" />} 
        />
        <FleetKPI 
          label="Frota Ativa" 
          value={totalBuses.toString()} 
          trend="Unidades" up={true} 
          icon={<Bus size={20} className="text-red-600" />} 
        />
        <FleetKPI 
          label="Encomendas" 
          value={totalPackages.toString()} 
          trend="Cargas" up={true} 
          icon={<Package size={20} className="text-amber-600" />} 
        />
      </div>

      {/* SEÇÃO LIVE E ALERTAS: Empilhamento inteligente */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        
        {/* Viagens em Curso - overflow-x-auto no mobile para tabelas/listas longas */}
        <div className="lg:col-span-2 bg-white rounded-[1.5rem] md:rounded-[2.5rem] border border-slate-200 p-5 md:p-8 shadow-sm">
          <h3 className="text-slate-400 font-black text-[9px] md:text-[10px] uppercase tracking-widest mb-6">
            Viagens em Curso (Live)
          </h3>
          <div className="space-y-4 overflow-hidden">
            {dbTrips.map((trip) => (
              <LiveTrip 
                key={trip.id}
                bus={trip.bus.plate}
                route={`${trip.origin} ↔ ${trip.destination}`}
                driver="A designar"
                status={trip.status}
                load={`${trip.tickets.length}/${trip.bus.capacity}`}
                isWarning={trip.availableSeats < 5}
              />
            ))}
            {dbTrips.length === 0 && (
              <p className="text-center text-slate-400 py-10 text-xs font-bold uppercase tracking-widest">Sem viagens ativas</p>
            )}
          </div>
        </div>

        {/* Alertas de Oficina */}
        <div className="bg-slate-50 rounded-[1.5rem] md:rounded-[2.5rem] border border-slate-200 p-5 md:p-8">
          <h3 className="text-slate-400 font-black text-[9px] md:text-[10px] uppercase tracking-widest mb-6">
            Alertas de Oficina
          </h3>
          <div className="space-y-4">
            {maintenanceItems.map((item, i) => <MaintenanceItem key={i} {...item} />)}
          </div>
        </div>

      </div>
    </div>
  );
}