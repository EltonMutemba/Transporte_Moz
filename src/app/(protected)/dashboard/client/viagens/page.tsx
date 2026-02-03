"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Ticket, ArrowRight, QrCode, Plus } from "lucide-react";

/* --- TIPAGEM E MOCKS MANTIDOS --- */
interface Trip {
  id: string;
  origin: string;
  destination: string;
  date: string;
  time: string;
  seat: string;
  status: "ACTIVE" | "COMPLETED" | "CANCELLED";
}

const TRIPS_DATA: Trip[] = [
  { id: "TR-001", origin: "Maputo", destination: "Beira", date: "15 Fev 2026", time: "06:00", seat: "12A", status: "ACTIVE" },
  { id: "TR-002", origin: "Maputo", destination: "Xai-Xai", date: "10 Jan 2026", time: "08:30", seat: "03B", status: "COMPLETED" },
];

export default function ViagensPage() {
  const [selectedTrip] = useState<Trip | null>(
    TRIPS_DATA.find((t) => t.status === "ACTIVE") || null
  );

  return (
    <div className="max-w-5xl mx-auto space-y-8 md:space-y-12 p-4 md:p-0 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* HEADER RESPONSIVO */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 uppercase italic tracking-tighter leading-none">
            Viagem <span className="text-red-600">Ativa</span>
          </h1>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-2">
            Controlo de embarque e bilheteira
          </p>
        </div>

        <Link 
          href="/search" 
          className="w-full sm:w-auto group flex items-center justify-center gap-2 px-6 py-3 border border-slate-200 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-600 hover:border-red-600 hover:text-red-600 transition-all active:scale-95"
        >
          <Plus size={14} />
          Nova Viagem
        </Link>
      </header>

      {/* ÁREA DA VIAGEM ATIVA */}
      <section>
        {selectedTrip ? <ActiveTripCard trip={selectedTrip} /> : <EmptyState />}
      </section>

      {/* HISTÓRICO - Padding e Grid Ajustados */}
      <section>
        <div className="flex items-center gap-4 mb-6">
          <h2 className="text-[9px] font-black text-slate-400 uppercase tracking-[0.4em] whitespace-nowrap">Atividade Recente</h2>
          <div className="h-px w-full bg-slate-100" />
        </div>

        <div className="grid grid-cols-1 gap-3">
          {TRIPS_DATA.filter(t => t.status !== "ACTIVE").map((trip) => (
            <div key={trip.id} className="p-4 md:p-5 flex flex-wrap sm:flex-nowrap items-center justify-between gap-4 bg-white border border-slate-100 rounded-2xl hover:shadow-md transition-all">
              <div className="flex items-center gap-4 md:gap-6">
                <div className="hidden xs:flex w-10 h-10 items-center justify-center rounded-xl bg-slate-50 text-slate-300">
                  <Ticket size={18} />
                </div>
                <div>
                  <p className="text-[11px] md:text-xs font-black uppercase text-slate-800 tracking-tight">
                    {trip.origin} <span className="text-red-600 mx-1">→</span> {trip.destination}
                  </p>
                  <p className="text-[9px] font-bold text-slate-400 uppercase">{trip.date} • {trip.time}</p>
                </div>
              </div>
              <div className="flex items-center justify-between w-full sm:w-auto gap-4">
                 <span className="text-[8px] font-black uppercase tracking-widest text-slate-400 bg-slate-100 px-3 py-1.5 rounded-lg">Finalizada</span>
                 <ArrowRight size={14} className="text-slate-200" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function ActiveTripCard({ trip }: { trip: Trip }) {
  return (
    <div className="bg-slate-950 rounded-[2rem] md:rounded-[3rem] p-6 md:p-10 text-white shadow-2xl relative overflow-hidden group border border-white/5">
      <div className="relative z-10 flex flex-col lg:flex-row justify-between gap-8 md:gap-12">
        
        {/* Rota com texto fluido */}
        <div className="space-y-8 md:space-y-10 flex-1">
          <div className="flex flex-row items-center justify-between lg:justify-start gap-4 md:gap-8">
            <div className="flex-1">
              <p className="text-slate-500 text-[9px] font-black uppercase tracking-widest mb-1 opacity-70">Origem</p>
              <p className="text-2xl md:text-4xl lg:text-5xl font-black italic uppercase tracking-tighter">{trip.origin}</p>
            </div>
            <ArrowRight className="text-red-600 w-6 h-6 md:w-8 md:h-8 animate-pulse shrink-0" />
            <div className="flex-1 text-right lg:text-left">
              <p className="text-slate-500 text-[9px] font-black uppercase tracking-widest mb-1 opacity-70">Destino</p>
              <p className="text-2xl md:text-4xl lg:text-5xl font-black italic uppercase tracking-tighter">{trip.destination}</p>
            </div>
          </div>

          {/* Grid Técnico: 2 colunas no mobile, 3 no desktop */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-8 border-t border-white/10">
            <InfoItem label="Data" value={trip.date} />
            <InfoItem label="Lugar" value={trip.seat} highlight />
            <div className="col-span-2 md:col-span-1">
              <InfoItem label="Referência" value={trip.id} muted />
            </div>
          </div>
        </div>

        {/* QR Code Responsivo */}
        <button className="w-full lg:w-48 bg-white text-slate-950 p-6 md:p-10 rounded-3xl flex flex-row lg:flex-col items-center justify-center gap-4 hover:bg-red-600 hover:text-white transition-all duration-500 group/qr shrink-0">
          <QrCode size={32} className="md:w-12 md:h-12" />
          <div className="text-left lg:text-center">
            <span className="block text-[10px] font-black uppercase tracking-widest">Check-in</span>
            <span className="text-[8px] font-bold opacity-40 uppercase">Apresentar ao Motorista</span>
          </div>
        </button>
      </div>
    </div>
  );
}

/* --- COMPONENTES AUXILIARES --- */
const InfoItem = ({ label, value, highlight, muted }: any) => (
  <div>
    <p className="text-slate-500 text-[8px] md:text-[9px] font-black uppercase tracking-widest mb-1">{label}</p>
    <p className={`text-xs md:text-sm font-bold tracking-tight ${highlight ? 'text-red-600' : muted ? 'opacity-30' : ''}`}>{value}</p>
  </div>
);

const EmptyState = () => (
  <div className="py-16 md:py-24 rounded-[2rem] md:rounded-[3rem] border border-dashed border-slate-200 bg-slate-50/50 text-center flex flex-col items-center justify-center">
    <Ticket className="text-slate-300 mb-4" size={32} />
    <p className="font-bold text-slate-400 text-[10px] uppercase tracking-[0.3em]">Nenhum bilhete ativo</p>
  </div>
);