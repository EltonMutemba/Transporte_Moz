"use client";
import React from "react";
import { Clock, AlertCircle } from "lucide-react";
import FleetKPI from "@/components/admin/FleetKPI";
import LiveTrip from "@/components/admin/LiveTrip";
import MaintenanceItem from "@/components/admin/MaintenanceItem";
import { fleetKPIs, liveTrips, maintenanceItems } from "@/components/admin/data";

export default function TransportOwnerDashboard() {
  return (
    <div className="space-y-10 pb-20">
      {/* HEADER DINÂMICO */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 italic uppercase tracking-tighter">
            Painel Operacional
          </h1>
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.3em] mt-2">
            Nagi Investments • Gestão de Ativos e Viagens
          </p>
        </div>
        <div className="flex gap-2">
          <button className="bg-slate-950 text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 transition-all">
            Relatório de Turno
          </button>
        </div>
      </header>

      {/* MÉTRICAS DE FROTA */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {fleetKPIs.map((kpi, i) => <FleetKPI key={i} {...kpi} />)}
      </section>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* VIAGENS EM TEMPO REAL */}
        <div className="xl:col-span-2 bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm max-h-[500px] overflow-y-auto">
          <h3 className="text-sm font-black uppercase tracking-widest mb-8 flex items-center gap-2">
            <Clock size={18} className="text-indigo-600" /> Próximas Partidas e Estado
          </h3>
          <div className="space-y-4">
            {liveTrips.map((trip, i) => <LiveTrip key={i} {...trip} />)}
          </div>
        </div>

        {/* ALERTAS */}
        <div className="bg-amber-50 p-10 rounded-[3rem] border border-amber-100 shadow-sm">
          <h3 className="text-sm font-black uppercase tracking-widest mb-8 flex items-center gap-2 text-amber-700">
            <AlertCircle size={18} /> Manutenção e Alertas
          </h3>
          <div className="space-y-6">
            {maintenanceItems.map((item, i) => <MaintenanceItem key={i} {...item} />)}

            <div className="pt-6 border-t border-amber-200 mt-6">
              <p className="text-[9px] font-black text-amber-800 uppercase mb-4">Staff em Falta</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-full border-2 border-amber-200" />
                <p className="text-[10px] font-bold text-amber-900 uppercase">Motorista: Pedro Mondlane (Turno 18h)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
