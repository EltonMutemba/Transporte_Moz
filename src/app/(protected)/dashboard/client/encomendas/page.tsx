"use client";

import React from "react";
import { Package, Truck, MapPin, Calendar, Search, AlertCircle } from "lucide-react";

const ORDERS_DATA = [
  {
    id: "TRX-9901",
    status: "Em Trânsito",
    origin: "Maputo (Terminal Junta)",
    destination: "Beira (Terminal Central)",
    sender: "Armazéns Moçambique",
    date: "29 Jan 2026",
    color: "text-amber-500",
    bg: "bg-amber-500/10"
  },
  {
    id: "TRX-8842",
    status: "Entregue",
    origin: "Nampula",
    destination: "Maputo",
    sender: "Loja do Povo",
    date: "25 Jan 2026",
    color: "text-green-500",
    bg: "bg-green-500/10"
  }
];

export default function ClientOrdersPage() {
  return (
    <div className="space-y-8">
      {/* HEADER */}
      <header>
        <h1 className="text-3xl font-black text-slate-900 italic uppercase tracking-tighter">
          Minhas Encomendas
        </h1>
        <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.3em] mt-1">
          Rastreio de carga e mercadorias em tempo real
        </p>
      </header>

      {/* BARRA DE RASTREIO RÁPIDO */}
      <div className="bg-blue-600 p-8 rounded-[2.5rem] shadow-xl shadow-blue-900/20 text-white relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1">
            <h3 className="text-lg font-black uppercase italic mb-2">Rastreio Rápido</h3>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 w-4 h-4" />
              <input 
                type="text" 
                placeholder="INTRODUZA O CÓDIGO DA ENCOMENDA (EX: TRX-0000)" 
                className="w-full bg-white/10 border border-white/20 rounded-2xl py-4 pl-12 pr-6 text-[10px] font-black uppercase placeholder:text-white/40 focus:bg-white/20 outline-none transition-all"
              />
            </div>
          </div>
          <button className="bg-white text-blue-600 px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-transform">
            Rastrear Agora
          </button>
        </div>
        {/* Decorativo de fundo */}
        <Package className="absolute -right-8 -bottom-8 w-40 h-40 text-white/5 rotate-12" />
      </div>

      {/* LISTA DE ENCOMENDAS */}
      <div className="grid gap-6">
        {ORDERS_DATA.map((order) => (
          <div key={order.id} className="bg-white border border-slate-100 p-8 rounded-[2.5rem] shadow-sm hover:shadow-md transition-shadow">
            <div className="flex flex-col lg:flex-row justify-between gap-6">
              
              {/* Info Principal */}
              <div className="flex gap-6">
                <div className={`w-16 h-16 ${order.bg} ${order.color} rounded-3xl flex items-center justify-center`}>
                  <Package size={28} />
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">ID: {order.id}</span>
                    <span className={`text-[9px] font-black px-3 py-1 rounded-full uppercase ${order.bg} ${order.color}`}>
                      {order.status}
                    </span>
                  </div>
                  <h2 className="text-xl font-black text-slate-900 uppercase italic mt-1">{order.sender}</h2>
                </div>
              </div>

              {/* Rota Visual */}
              <div className="flex-1 flex items-center gap-4 px-6 py-4 bg-slate-50 rounded-2xl">
                <div className="text-center">
                  <p className="text-[8px] font-black text-slate-400 uppercase">Origem</p>
                  <p className="text-[10px] font-bold text-slate-700 uppercase">{order.origin}</p>
                </div>
                <div className="flex-1 h-[2px] bg-slate-200 relative">
                  <Truck className="absolute -top-2 left-1/2 -translate-x-1/2 text-slate-300 w-4 h-4 bg-slate-50" />
                </div>
                <div className="text-center">
                  <p className="text-[8px] font-black text-slate-400 uppercase">Destino</p>
                  <p className="text-[10px] font-bold text-slate-700 uppercase">{order.destination}</p>
                </div>
              </div>

              {/* Botão de Detalhes */}
              <button className="flex items-center justify-center gap-2 border-2 border-slate-100 hover:border-blue-600 hover:text-blue-600 px-6 py-4 rounded-2xl text-[10px] font-black uppercase transition-all">
                Ver Guia
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}