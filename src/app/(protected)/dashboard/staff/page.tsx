"use client";

import React from "react";
import { ScanQrCode, Users, PackageCheck } from "lucide-react";

export default function StaffPage() {
  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-4xl font-black text-amber-900 italic uppercase tracking-tighter">Terminal de Operações</h1>
        <p className="text-amber-700/60 text-[10px] font-bold uppercase tracking-[0.3em] mt-2">Check-in e Manifesto em Tempo Real</p>
      </header>

      <div className="grid md:grid-cols-2 gap-8">
        <button className="bg-amber-600 p-10 rounded-[3rem] text-white flex flex-col items-center gap-4 hover:bg-amber-700 transition-all shadow-xl shadow-amber-200 group">
          <ScanQrCode size={48} className="group-hover:scale-110 transition-transform" />
          <span className="font-black uppercase tracking-widest text-sm">Validar Bilhete (Scanner)</span>
        </button>

        <div className="space-y-6">
          <div className="bg-white p-8 rounded-[2.5rem] border border-amber-100 flex justify-between items-center">
            <div className="flex gap-4 items-center">
              <Users className="text-amber-600" />
              <span className="font-black uppercase text-xs tracking-widest">Passageiros no Terminal</span>
            </div>
            <span className="text-2xl font-black">42</span>
          </div>
          <div className="bg-white p-8 rounded-[2.5rem] border border-amber-100 flex justify-between items-center">
            <div className="flex gap-4 items-center">
              <PackageCheck className="text-amber-600" />
              <span className="font-black uppercase text-xs tracking-widest">Encomendas por Processar</span>
            </div>
            <span className="text-2xl font-black">18</span>
          </div>
        </div>
      </div>
    </div>
  );
}