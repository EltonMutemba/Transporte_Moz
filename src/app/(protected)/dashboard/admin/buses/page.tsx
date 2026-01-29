"use client";

import React from "react";
import { Bus, Plus, Search, Filter, AlertCircle, CheckCircle2, MapPin } from "lucide-react";

const FLEET_DATA = [
  { id: "1", plate: "AFG-202-MC", company: "Nagi Investments", model: "Marcopolo G7", status: "Em Rota", route: "Maputo - Beira" },
  { id: "2", plate: "MM-991-MP", company: "Maningue Nice", model: "Yutong ZK6122H", status: "Manutenção", route: "N/A" },
  { id: "3", plate: "ABC-123-MC", company: "Virgem da Nazaré", model: "Scania K400", status: "Disponível", route: "Maputo - Xai-Xai" },
];

export default function AdminBusesPage() {
  return (
    <div className="space-y-10">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-white italic uppercase tracking-tighter">
            Controlo de Frota
          </h1>
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.3em] mt-2">
            Monitorização de veículos e conformidade técnica
          </p>
        </div>
        <button className="flex items-center justify-center gap-3 bg-white text-slate-950 px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all duration-300 shadow-lg shadow-white/5">
          <Plus size={20} /> Registar Veículo
        </button>
      </div>

      {/* FILTROS E PESQUISA */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-3 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 w-4 h-4" />
          <input 
            type="text" 
            placeholder="PESQUISAR POR MATRÍCULA OU EMPRESA..." 
            className="w-full bg-slate-900/50 border border-white/5 rounded-2xl py-4 pl-12 pr-6 text-[10px] font-black uppercase text-white focus:border-red-500/50 outline-none transition-all" 
          />
        </div>
        <button className="bg-slate-900 border border-white/5 rounded-2xl flex items-center justify-center gap-3 text-slate-400 hover:text-white transition-colors">
          <Filter size={18} /> <span className="text-[10px] font-black uppercase">Filtros</span>
        </button>
      </div>

      {/* GRID DE VEÍCULOS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {FLEET_DATA.map((bus) => (
          <div key={bus.id} className="bg-slate-900/40 border border-white/5 rounded-[2.5rem] p-8 hover:border-white/20 transition-all group">
            <div className="flex justify-between items-start mb-6">
              <div className="p-4 bg-slate-800 rounded-2xl text-red-500 group-hover:bg-red-600 group-hover:text-white transition-all">
                <Bus size={24} />
              </div>
              <span className={`text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest ${
                bus.status === "Em Rota" ? "bg-green-500/10 text-green-500" : 
                bus.status === "Manutenção" ? "bg-red-500/10 text-red-500" : "bg-blue-500/10 text-blue-500"
              }`}>
                {bus.status}
              </span>
            </div>

            <div className="space-y-1 mb-6">
              <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">{bus.plate}</h2>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{bus.company}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/5">
              <div>
                <p className="text-[8px] font-black text-slate-600 uppercase mb-1">Modelo</p>
                <p className="text-[10px] font-bold text-slate-300 uppercase">{bus.model}</p>
              </div>
              <div>
                <p className="text-[8px] font-black text-slate-600 uppercase mb-1 flex items-center gap-1">
                  <MapPin size={8} /> Rota Atual
                </p>
                <p className="text-[10px] font-bold text-slate-300 uppercase truncate">{bus.route}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}