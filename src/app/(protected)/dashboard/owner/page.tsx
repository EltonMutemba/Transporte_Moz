"use client";

import React from "react";
import { Landmark, TrendingUp, Bus, AlertCircle } from "lucide-react";

export default function OwnerPage() {
  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-4xl font-black text-slate-900 italic uppercase tracking-tighter">Gestão de Frota</h1>
        <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.3em] mt-2">Visão Geral da Transportadora</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Receita Mensal" value="450.000 MT" icon={<Landmark className="text-indigo-600" />} trend="+12%" />
        <StatCard title="Autocarros Ativos" value="14 / 15" icon={<Bus className="text-blue-600" />} />
        <StatCard title="Taxa de Ocupação" value="88%" icon={<TrendingUp className="text-green-600" />} trend="+5%" />
      </div>

      <div className="bg-white p-8 rounded-[2.5rem] border border-indigo-100 shadow-sm flex items-center gap-6">
        <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600"><AlertCircle /></div>
        <div>
          <h4 className="font-black uppercase text-sm">Manutenção Pendente</h4>
          <p className="text-xs text-slate-500">O autocarro A-22 necessita de revisão em 48h.</p>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, trend }: any) {
  return (
    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-slate-50 rounded-2xl">{icon}</div>
        {trend && <span className="text-[10px] font-black text-green-600 bg-green-50 px-3 py-1 rounded-full">{trend}</span>}
      </div>
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{title}</p>
      <p className="text-2xl font-black text-slate-900 mt-1">{value}</p>
    </div>
  );
}