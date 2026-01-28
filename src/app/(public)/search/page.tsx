"use client";

import React, { useState } from "react";
import { Bus, Clock, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link"; // Importação vital para navegação

const TODAS_VIAGENS = [
  { id: "1", origem: "Maputo", destino: "Beira", partida: "05:00", preco: 3500, tipo: "Executivo" },
  { id: "2", origem: "Maputo", destino: "Nampula", partida: "04:00", preco: 5500, tipo: "Standard" },
  { id: "3", origem: "Beira", destino: "Tete", partida: "06:00", preco: 2200, tipo: "Standard" },
  { id: "4", origem: "Nampula", destino: "Pemba", partida: "07:30", preco: 1500, tipo: "Económico" },
];

export default function BilhetesPage() {
  const [origemFiltro, setOrigemFiltro] = useState("");

  const viagensFiltradas = TODAS_VIAGENS.filter(v => 
    v.origem.toLowerCase().includes(origemFiltro.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-white">
      {/* HEADER DA PÁGINA */}
      <section className="bg-slate-950 pt-28 pb-16 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4">
          Comprar <span className="text-blue-600">Bilhete</span>
        </h1>
        <p className="text-slate-400 max-w-xl mx-auto">
          Selecione a sua rota abaixo. O seu lugar é garantido após a confirmação do pagamento via M-Pesa ou e-Mola.
        </p>
      </section>

      <div className="max-w-6xl mx-auto px-6 -mt-8">
        {/* FILTRO RÁPIDO */}
        <div className="bg-white shadow-2xl rounded-3xl p-4 border border-slate-100 mb-12 flex flex-wrap gap-4 items-center">
          <div className="flex-1 min-w-[200px] flex items-center gap-3 px-4 py-3 bg-slate-50 rounded-2xl border border-slate-100">
            <MapPin className="text-blue-600 w-5 h-5" />
            <input 
              type="text" 
              placeholder="De onde você parte? (Ex: Maputo)" 
              className="bg-transparent outline-none w-full font-bold text-sm"
              onChange={(e) => setOrigemFiltro(e.target.value)}
            />
          </div>
          <div className="hidden md:block text-slate-300 font-light">|</div>
          <p className="text-xs font-black uppercase text-slate-400 px-4">
            {viagensFiltradas.length} Viagens Disponíveis
          </p>
        </div>

        {/* LISTA DE CARROS/VIAGENS */}
        <div className="grid gap-4 mb-20">
          {viagensFiltradas.map((viagem) => (
            <div 
              key={viagem.id} 
              className="group bg-white border-2 border-slate-100 hover:border-blue-600 rounded-[2rem] p-6 md:p-8 flex flex-col md:flex-row justify-between items-center transition-all gap-8"
            >
              {/* ROTA */}
              <div className="flex items-center gap-6 w-full md:w-auto">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Bus className="w-8 h-8" />
                </div>
                <div>
                  <div className="flex items-center gap-2 text-xl font-black text-slate-950 uppercase">
                    {viagem.origem} <ArrowRight className="w-4 h-4 text-slate-300" /> {viagem.destino}
                  </div>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="flex items-center gap-1 text-xs font-bold text-slate-400 uppercase">
                      <Clock className="w-3 h-3" /> Partida: {viagem.partida}
                    </span>
                    <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded font-black text-slate-500 uppercase tracking-widest">
                      {viagem.tipo}
                    </span>
                  </div>
                </div>
              </div>

              {/* PREÇO E AÇÃO (CONECTADO AO CHECKOUT) */}
              <div className="flex items-center gap-8 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-6 md:pt-0 border-slate-50">
                <div className="text-right">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Preço do Bilhete</p>
                  <p className="text-3xl font-black text-slate-950 tracking-tighter">{viagem.preco} MT</p>
                </div>
                
                {/* O LINK ENVOLVE O BOTÃO PARA DIRECIONAR AO CHECKOUT PASSANDO OS DADOS */}
                <Link 
                  href={`/checkout?id=${viagem.id}&rota=${viagem.origem}-${viagem.destino}&preco=${viagem.preco}`}
                  className="w-full md:w-auto"
                >
                  <Button className="h-16 px-10 bg-slate-950 hover:bg-blue-600 text-white rounded-2xl font-black transition-all shadow-lg active:scale-95 w-full">
                    COMPRAR AGORA
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}