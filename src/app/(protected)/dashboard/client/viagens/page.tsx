"use client";

import React, { useState } from "react";
import { Ticket, ArrowRight, QrCode, MapPin, XCircle, RefreshCcw } from "lucide-react";

/* ---------------------
TIPOS DE DADOS
--------------------- */
interface Trip {
  id: string;
  origin: string;
  destination: string;
  date: string;
  time: string;
  seat: string;
  status: "ACTIVE" | "COMPLETED" | "CANCELLED";
}

/* ---------------------
DADOS MOCK (simula backend)
--------------------- */
const trips: Trip[] = [
  {
    id: "TR-001",
    origin: "Maputo",
    destination: "Beira",
    date: "15 Fev 2026",
    time: "06:00",
    seat: "12A",
    status: "ACTIVE",
  },
  {
    id: "TR-002",
    origin: "Maputo",
    destination: "Xai-Xai",
    date: "10 Jan 2026",
    time: "08:30",
    seat: "03B",
    status: "COMPLETED",
  },
  {
    id: "TR-003",
    origin: "Beira",
    destination: "Tete",
    date: "02 Jan 2026",
    time: "14:00",
    seat: "07C",
    status: "COMPLETED",
  },
];

export default function ViagensPage() {
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(
    trips.find((t) => t.status === "ACTIVE") || null
  );

  return (
    <div className="max-w-5xl mx-auto space-y-14">

      {/* ---------------------
      VIAGEM ATIVA
      --------------------- */}
      <section>
        <h1 className="text-4xl font-black text-slate-900 uppercase italic tracking-tighter mb-8">
          Viagem Ativa
        </h1>

        {selectedTrip ? (
          <ActiveTripCard trip={selectedTrip} />
        ) : (
          <div className="p-10 rounded-[2.5rem] bg-slate-50 border border-slate-200 text-center">
            <p className="font-black uppercase text-slate-500 text-sm">
              Nenhuma viagem ativa no momento
            </p>
          </div>
        )}
      </section>

      {/* ---------------------
      HISTÓRICO
      --------------------- */}
      <section className="pt-10">
        <h2 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-6">
          Histórico de Viagens
        </h2>

        <div className="space-y-3">
          {trips
            .filter((t) => t.status !== "ACTIVE")
            .map((trip) => (
              <HistoryRow
                key={trip.id}
                trip={trip}
                onSelect={() => setSelectedTrip(trip)}
              />
            ))}
        </div>
      </section>
    </div>
  );
}

/* ---------------------
COMPONENTE VIAGEM ATIVA
--------------------- */
function ActiveTripCard({ trip }: { trip: Trip }) {
  return (
    <div className="bg-blue-600 rounded-[3rem] p-10 text-white shadow-2xl shadow-blue-200 relative overflow-hidden">
      <div className="relative z-10 flex flex-col md:flex-row justify-between gap-12">

        {/* Rota */}
        <div className="space-y-8 flex-1">
          <div className="flex items-center gap-10">
            <div>
              <p className="text-blue-200 text-[10px] font-black uppercase tracking-[0.2em]">
                Origem
              </p>
              <p className="text-4xl font-black italic">
                {trip.origin.toUpperCase()}
              </p>
            </div>

            <ArrowRight className="text-white/30 w-10 h-10" />

            <div>
              <p className="text-blue-200 text-[10px] font-black uppercase tracking-[0.2em]">
                Destino
              </p>
              <p className="text-4xl font-black italic">
                {trip.destination.toUpperCase()}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10">
            <TripStat label="Data" value={trip.date} />
            <TripStat label="Hora" value={trip.time} />
            <TripStat label="Lugar" value={`Assento ${trip.seat}`} />
          </div>

          {/* Ações */}
          <div className="flex gap-4 pt-6">
            <ActionButton icon={<RefreshCcw size={16} />} label="Mudar Lugar" />
            <ActionButton icon={<XCircle size={16} />} label="Cancelar Viagem" danger />
          </div>
        </div>

        {/* QR */}
        <button className="bg-white text-blue-600 p-8 rounded-[2rem] flex flex-col items-center justify-center gap-4 hover:scale-105 transition-transform">
          <QrCode className="w-16 h-16" />
          <span className="text-[10px] font-black uppercase tracking-widest">
            Mostrar Bilhete
          </span>
        </button>
      </div>

      {/* Marca d’água */}
      <Ticket className="absolute -bottom-10 -right-10 w-64 h-64 text-white/5 -rotate-12" />
    </div>
  );
}

/* ---------------------
HISTÓRICO
--------------------- */
function HistoryRow({
  trip,
  onSelect,
}: {
  trip: Trip;
  onSelect: () => void;
}) {
  return (
    <div
      onClick={onSelect}
      className="flex items-center justify-between p-6 bg-white border border-slate-100 rounded-2xl hover:bg-slate-50 transition-colors cursor-pointer"
    >
      <div className="flex items-center gap-4 text-sm font-bold text-slate-700 uppercase">
        <span>{trip.origin}</span>
        <ArrowRight className="w-3 h-3 text-slate-300" />
        <span>{trip.destination}</span>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-[10px] font-black text-slate-400">
          {trip.date}
        </span>
        <MapPin className="w-4 h-4 text-slate-300" />
      </div>
    </div>
  );
}

/* ---------------------
UI PEÇAS
--------------------- */
function TripStat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-blue-200 text-[10px] font-black uppercase tracking-[0.2em]">
        {label}
      </p>
      <p className="text-lg font-bold">{value}</p>
    </div>
  );
}

function ActionButton({
  icon,
  label,
  danger,
}: {
  icon: React.ReactNode;
  label: string;
  danger?: boolean;
}) {
  return (
    <button
      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition
      ${
        danger
          ? "bg-red-500/20 text-red-200 hover:bg-red-500/30"
          : "bg-white/20 hover:bg-white/30"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}
