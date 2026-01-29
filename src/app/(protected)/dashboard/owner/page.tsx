"use client";

import React from "react";
import { 
  Bus, Users, Fuel, Map, 
  ArrowUpRight, ArrowDownRight, AlertCircle, Clock 
} from "lucide-react";

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

      {/* MÉTRICAS DE ATIVOS (FROTA E DINHEIRO) */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <FleetKPI label="Receita Bruta Hoje" value="85.400 MT" trend="+5%" up={true} icon={<Fuel size={20} />} />
        <FleetKPI label="Autocarros em Rota" value="12 / 15" trend="3 Parados" up={false} icon={<Bus size={20} />} />
        <FleetKPI label="Passageiros Hoje" value="412" trend="+12%" up={true} icon={<Users size={20} />} />
        <FleetKPI label="Ocupação Média" value="92%" trend="Excelente" up={true} icon={<Map size={20} />} />
      </section>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* MONITORIZAÇÃO DE VIAGENS EM TEMPO REAL */}
        <div className="xl:col-span-2 bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
          <h3 className="text-sm font-black uppercase tracking-widest mb-8 flex items-center gap-2">
            <Clock size={18} className="text-indigo-600" /> Próximas Partidas e Estado
          </h3>
          <div className="space-y-4">
            <LiveTrip bus="AAB-202-MC" route="Maputo ↔ Beira" driver="J. Muthemba" status="Em Embarque" load="42/50" />
            <LiveTrip bus="MC-01-99-MP" route="Maputo ↔ Xai-Xai" driver="A. Sitoe" status="Em Rota" load="50/50" />
            <LiveTrip bus="AFG-505-MC" route="Beira ↔ Tete" driver="C. Langa" status="Atrasado" load="12/50" isWarning />
          </div>
        </div>

        {/* ALERTAS DE MANUTENÇÃO E STAFF */}
        <div className="bg-amber-50 p-10 rounded-[3rem] border border-amber-100 shadow-sm">
          <h3 className="text-sm font-black uppercase tracking-widest mb-8 flex items-center gap-2 text-amber-700">
            <AlertCircle size={18} /> Manutenção e Alertas
          </h3>
          <div className="space-y-6">
            <MaintenanceItem bus="ABX-101-MC" issue="Troca de Óleo" days="Faltam 2 dias" />
            <MaintenanceItem bus="MM-442-MP" issue="Pneus Desgastados" days="Urgente" critical />
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

/* COMPONENTES ESPECÍFICOS PARA TRANSPORTADORA */
function FleetKPI({ label, value, trend, up, icon }: any) {
  return (
    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm group">
      <div className="flex justify-between items-center mb-4">
        <div className="p-3 bg-slate-50 rounded-2xl group-hover:bg-indigo-600 group-hover:text-white transition-all italic">
          {icon}
        </div>
        <span className={`text-[9px] font-black px-3 py-1 rounded-full ${up ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
          {trend}
        </span>
      </div>
      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
      <h2 className="text-2xl font-black text-slate-900 italic tracking-tighter">{value}</h2>
    </div>
  );
}

function LiveTrip({ bus, route, driver, status, load, isWarning = false }: any) {
  return (
    <div className={`flex flex-col md:flex-row md:items-center justify-between p-6 rounded-[2rem] border ${isWarning ? 'bg-red-50 border-red-100' : 'bg-slate-50 border-slate-100'}`}>
      <div className="flex items-center gap-4">
        <div className={`w-3 h-3 rounded-full ${isWarning ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`} />
        <div>
          <p className="text-[11px] font-black text-slate-900 uppercase italic">{bus} — {route}</p>
          <p className="text-[9px] font-bold text-slate-400 uppercase italic">Motorista: {driver}</p>
        </div>
      </div>
      <div className="flex items-center gap-8 mt-4 md:mt-0">
        <div className="text-right">
          <p className="text-[9px] font-black text-slate-400 uppercase">Estado</p>
          <p className={`text-[10px] font-black uppercase ${isWarning ? 'text-red-600' : 'text-indigo-600'}`}>{status}</p>
        </div>
        <div className="text-right border-l pl-8 border-slate-200">
          <p className="text-[9px] font-black text-slate-400 uppercase">Ocupação</p>
          <p className="text-[10px] font-black text-slate-900">{load}</p>
        </div>
      </div>
    </div>
  );
}

function MaintenanceItem({ bus, issue, days, critical = false }: any) {
  return (
    <div className="flex justify-between items-center">
      <div>
        <p className="text-[10px] font-black text-slate-900 uppercase tracking-tight">{bus}</p>
        <p className="text-[9px] font-bold text-slate-500 uppercase">{issue}</p>
      </div>
      <p className={`text-[9px] font-black uppercase ${critical ? 'text-red-600' : 'text-amber-600'}`}>{days}</p>
    </div>
  );
}