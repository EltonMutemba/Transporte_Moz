import React from "react";
import { TripService } from "@/domains/trips/trip.service";

export default async function OwnerDashboardPage() {
  const data = await TripService.getOwnerDashboardStats();

  return (
    <div className="p-12 max-w-[1600px] mx-auto space-y-12 animate-in fade-in duration-500">
      {/* CABEÇALHO LIMPO - IGUAL À IMAGEM DO PERFIL */}
      <header className="flex justify-between items-end border-b border-slate-200 pb-10">
        <div>
          <h1 className="text-6xl font-black text-slate-900 italic uppercase tracking-tighter leading-none">
            GESTÃO <span className="text-red-600">OPERACIONAL</span>
          </h1>
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.5em] mt-4 italic">
            TPMOZ • DASHBOARD DE CONTROLO • ID #0001
          </p>
        </div>
        
        {/* STATUS DA CONTA (ESTILO IMAGEM 1) */}
        <div className="flex items-center gap-4">
          <div className="h-10 w-[2px] bg-red-600" />
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 border-2 border-red-600 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-red-600 rounded-full" />
            </div>
            <span className="text-[10px] font-black uppercase text-slate-900 italic">Conta Verificada</span>
          </div>
        </div>
      </header>

      {/* KPIs EM CARDS DE LINHAS FINAS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {data.kpis.map((kpi) => (
          <div key={kpi.label} className="bg-white p-8 border border-slate-200 rounded-xl hover:border-red-600 transition-colors group">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 group-hover:text-red-600 transition-colors">
              {kpi.label}
            </p>
            <h2 className="text-5xl font-black text-slate-900 italic leading-none">
              {kpi.value}
            </h2>
          </div>
        ))}
      </div>

      {/* ÁREA DE MOVIMENTAÇÃO (TOTALMENTE LARGA) */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <div className="px-10 py-8 border-b border-slate-100 bg-slate-50/30">
          <h3 className="text-sm font-black uppercase italic text-slate-900 tracking-widest">
            Movimentação de Frota em Tempo Real
          </h3>
        </div>
        <div className="divide-y divide-slate-100 px-10 py-4">
          {data.formattedTrips.map(trip => (
            <div key={trip.id} className="py-8 flex justify-between items-center group hover:bg-slate-50/50 transition-all rounded-lg px-4 -mx-4">
              <div className="flex items-center gap-6">
                <div className="w-1 h-8 bg-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                <div>
                  <p className="text-2xl font-black text-slate-900 uppercase tracking-tight italic">
                    {trip.origin} <span className="text-red-600">→</span> {trip.destination}
                  </p>
                  <p className="text-[11px] font-bold text-slate-400 uppercase mt-2 tracking-widest">
                    Autocarro: {trip.bus} • Saída: {trip.time}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-3xl font-black text-slate-900 italic leading-none">{trip.occupancy}</p>
                <p className="text-[10px] font-black text-slate-400 uppercase mt-2 tracking-tighter">Lotação</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}