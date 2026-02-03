"use client";
import React from "react";

interface LiveTripProps {
  bus: string;
  route: string;
  driver: string;
  status: string;
  load: string;
  isWarning?: boolean;
}

export default function LiveTrip({ bus, route, driver, status, load, isWarning = false }: LiveTripProps) {
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
