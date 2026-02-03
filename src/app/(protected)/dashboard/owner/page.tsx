"use client"; // deve ser a primeira linha

import React from "react";
import { Clock, AlertCircle } from "lucide-react";

// Importa componentes UI
import FleetKPI from "@/components/admin/FleetKPI";
import LiveTrip from "@/components/admin/LiveTrip";
import MaintenanceItem from "@/components/admin/MaintenanceItem";

// Importa os dados
import { fleetKPIs, liveTrips, maintenanceItems } from "@/components/admin/data";

export default function OwnerDashboardPage() {
  return (
    <div className="space-y-10 pb-20 p-6">
      {/* HEADER */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 italic uppercase tracking-tighter">
            Painel Operacional
          </h1>
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.3em] mt-2">
            Nagi Investments • Gestão de Ativos e Viagens
          </p>
        </div>
      </header>

      {/* KPIs */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {fleetKPIs.map((kpi) => (
          <FleetKPI key={kpi.label} {...kpi} />
        ))}
      </section>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* VIAGENS AO VIVO */}
        <div className="xl:col-span-2 bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
          <h3 className="text-sm font-black uppercase tracking-widest mb-8 flex items-center gap-2">
            <Clock size={18} className="text-indigo-600" /> Próximas Partidas
          </h3>
          <div className="space-y-4">
            {liveTrips.map((trip) => (
              <LiveTrip key={trip.bus} {...trip} />
            ))}
          </div>
        </div>

        {/* ALERTAS DE MANUTENÇÃO */}
        <div className="bg-amber-50 p-10 rounded-[3rem] border border-amber-100 shadow-sm">
          <h3 className="text-sm font-black uppercase tracking-widest mb-8 flex items-center gap-2 text-amber-700">
            <AlertCircle size={18} /> Alertas
          </h3>
          <div className="space-y-6">
            {maintenanceItems.map((item) => (
              <MaintenanceItem key={item.bus} {...item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
