"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Ticket, ArrowRight, QrCode, Plus } from "lucide-react";

/* -------------------------------------------------------------------------- */
/* 1. TIPAGEM                                  */
/* -------------------------------------------------------------------------- */
interface Trip {
  id: string;
  origin: string;
  destination: string;
  date: string;
  time: string;
  seat: string;
  status: "ACTIVE" | "COMPLETED" | "CANCELLED";
}

/* -------------------------------------------------------------------------- */
/* 2. DADOS MOCK                               */
/* -------------------------------------------------------------------------- */
const TRIPS_DATA: Trip[] = [
  { 
    id: "TR-001", 
    origin: "Maputo", 
    destination: "Beira", 
    date: "15 Fev 2026", 
    time: "06:00", 
    seat: "12A", 
    status: "ACTIVE" 
  },
  { 
    id: "TR-002", 
    origin: "Maputo", 
    destination: "Xai-Xai", 
    date: "10 Jan 2026", 
    time: "08:30", 
    seat: "03B", 
    status: "COMPLETED" 
  },
];

/* -------------------------------------------------------------------------- */
/* 3. COMPONENTE PRINCIPAL                           */
/* -------------------------------------------------------------------------- */
export default function ViagensPage() {
  const [selectedTrip] = useState<Trip | null>(
    TRIPS_DATA.find((t) => t.status === "ACTIVE") || null
  );

  return (
    <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* HEADER [cite: 2026-01-28] */}
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black text-slate-900 uppercase italic tracking-tighter">
            Viagem <span className="text-red-600">Ativa</span>
          </h1>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-2">
            Controlo de embarque e bilheteira
          </p>
        </div>

        {/* Botão Subtil e Profissional [cite: 2026-01-28] */}
        <Link 
          href="/search" 
          className="group flex items-center gap-2 px-6 py-3 border border-slate-200 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-600 hover:border-red-600 hover:text-red-600 hover:bg-red-50/50 transition-all active:scale-95"
        >
          <Plus size={14} className="group-hover:rotate-90 transition-transform duration-300" />
          Nova Viagem
        </Link>
      </header>

      {/* ÁREA DA VIAGEM ATIVA */}
      <section>
        {selectedTrip ? (
          <ActiveTripCard trip={selectedTrip} />
        ) : (
          <div className="py-24 rounded-[3rem] border border-dashed border-slate-200 bg-slate-50/50 text-center flex flex-col items-center justify-center group">
            <div className="p-4 bg-white rounded-full shadow-sm mb-4 group-hover:scale-110 transition-transform">
              <Ticket className="text-slate-300" size={32} />
            </div>
            <p className="font-bold text-slate-400 text-[10px] uppercase tracking-[0.3em]">
              Nenhum bilhete ativo para hoje
            </p>
          </div>
        )}
      </section>

      {/* HISTÓRICO DE ATIVIDADE */}
      <section>
        <div className="flex items-center gap-4 mb-8">
          <h2 className="text-[9px] font-black text-slate-400 uppercase tracking-[0.4em] whitespace-nowrap">
            Atividade Recente
          </h2>
          <div className="h-px w-full bg-slate-100" />
        </div>

        <div className="grid grid-cols-1 gap-2">
          {TRIPS_DATA.filter(t => t.status !== "ACTIVE").map((trip) => (
            <div key={trip.id} className="p-5 flex items-center justify-between group bg-white border border-transparent hover:border-slate-100 hover:shadow-sm rounded-2xl transition-all">
              <div className="flex items-center gap-6">
                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-300 group-hover:bg-red-50 group-hover:text-red-600 transition-colors">
                  <Ticket size={18} />
                </div>
                <div>
                  <p className="text-[11px] font-black uppercase text-slate-800 tracking-tight">
                    {trip.origin} <span className="text-slate-300 mx-1">→</span> {trip.destination}
                  </p>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">
                    {trip.date} • {trip.time}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                 <span className="text-[8px] font-black uppercase tracking-widest text-slate-400 bg-slate-100 px-3 py-1.5 rounded-lg">
                  Finalizada
                </span>
                <ArrowRight size={14} className="text-slate-200 group-hover:text-red-600 group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 4. COMPONENTE INTERNO CARD                        */
/* -------------------------------------------------------------------------- */
function ActiveTripCard({ trip }: { trip: Trip }) {
  return (
    <div className="bg-slate-950 rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden group border border-white/5">
      <div className="relative z-10 flex flex-col md:flex-row justify-between gap-12">
        
        {/* Detalhes da Rota */}
        <div className="space-y-10 flex-1">
          <div className="flex items-center gap-8">
            <div className="flex-1">
              <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-2 opacity-70">Partida</p>
              <p className="text-4xl font-black italic uppercase tracking-tighter group-hover:text-red-500 transition-colors">
                {trip.origin}
              </p>
            </div>
            <div className="flex flex-col items-center">
               <ArrowRight className="text-red-600 w-8 h-8 flex-shrink-0 animate-pulse" />
               <span className="text-[8px] font-bold text-slate-700 uppercase mt-2 text-center">Expresso</span>
            </div>
            <div className="flex-1 text-right md:text-left">
              <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-2 opacity-70">Chegada</p>
              <p className="text-4xl font-black italic uppercase tracking-tighter">
                {trip.destination}
              </p>
            </div>
          </div>

          {/* Grid de Informações Técnicas */}
          <div className="grid grid-cols-3 gap-8 pt-10 border-t border-white/5">
            <div>
              <p className="text-slate-500 text-[9px] font-black uppercase tracking-widest mb-1">Data de Viagem</p>
              <p className="text-sm font-bold tracking-tight">{trip.date}</p>
            </div>
            <div>
              <p className="text-slate-500 text-[9px] font-black uppercase tracking-widest mb-1">Lugar Reservado</p>
              <p className="text-sm font-bold text-red-600">{trip.seat}</p>
            </div>
            <div>
              <p className="text-slate-500 text-[9px] font-black uppercase tracking-widest mb-1">Referência</p>
              <p className="text-sm font-bold opacity-30 tracking-widest">{trip.id}</p>
            </div>
          </div>
        </div>

        {/* Botão QR Code (Foco do Cliente) */}
        <button className="bg-white text-slate-950 p-10 rounded-[2.5rem] flex flex-col items-center justify-center gap-4 hover:bg-red-600 hover:text-white transition-all duration-500 shadow-2xl group/qr">
          <QrCode size={48} className="group-hover/qr:scale-110 transition-transform duration-500" />
          <div className="text-center">
            <span className="block text-[10px] font-black uppercase tracking-[0.2em]">Check-in</span>
            <span className="text-[8px] font-bold opacity-40 uppercase">Digital Ticket</span>
          </div>
        </button>
      </div>

      {/* Marca de Água Estilizada */}
      <Ticket className="absolute -bottom-16 -left-16 w-80 h-80 text-white/[0.02] -rotate-12 pointer-events-none group-hover:text-red-600/[0.03] transition-colors duration-700" />
    </div>
  );
}