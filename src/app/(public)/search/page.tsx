import React from "react";
import { Bus, Clock, MapPin, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

async function getViagensDisponiveis() {
  try {
    return await prisma.trip.findMany({
      where: { status: "AVAILABLE" },
      include: { bus: true },
      orderBy: { departureTime: "asc" },
    });
  } catch (error) {
    console.error("Erro ao buscar viagens:", error);
    return [];
  }
}

export default async function BilhetesPage() {
  const viagens = await getViagensDisponiveis();

  return (
    <main className="min-h-screen bg-slate-50/50 pb-16">
      {/* HEADER */}
      <section className="relative bg-slate-950 pt-24 pb-14 px-6 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600 rounded-full blur-[120px]" />
        </div>
        
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-3">
            <span className="flex items-center gap-1.5 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-[9px] font-black text-blue-400 uppercase tracking-widest">
              <ShieldCheck size={10} /> Conexão Segura
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4 leading-tight">
            Reserve seu <span className="text-blue-600">Bilhete</span>
          </h1>
          <p className="text-slate-400 text-xs md:text-sm max-w-md mx-auto font-medium uppercase tracking-wide">
            Transporte oficial com garantia de lugar e seguro de viagem incluído.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 -mt-6 relative z-10">
        
        {/* INFO BAR */}
        <div className="bg-white shadow-sm rounded-2xl p-4 border border-slate-200 mb-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
             <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
                <MapPin size={16} />
             </div>
             <p className="text-[10px] font-black text-slate-900 uppercase">Rotas Nacionais</p>
          </div>
          <span className="text-[9px] font-black text-slate-400 bg-slate-50 px-3 py-1 rounded-full uppercase tracking-tighter">
            {viagens.length} Viagens Ativas
          </span>
        </div>

        {/* LISTAGEM */}
        <div className="grid gap-3">
          {viagens.length > 0 ? (
            viagens.map((viagem) => (
              <div 
                key={viagem.id} 
                className="group bg-white border border-slate-200 hover:border-blue-500 rounded-2xl p-4 md:p-5 flex flex-col md:flex-row justify-between items-center transition-all duration-200 gap-4"
              >
                {/* ROTA */}
                <div className="flex items-center gap-4 w-full md:w-auto">
                  <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-colors border border-slate-100">
                    <Bus size={20} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-sm md:text-lg font-black text-slate-950 uppercase tracking-tight">
                      {viagem.origin} 
                      <ArrowRight size={14} className="text-blue-600" /> 
                      {viagem.destination}
                    </div>
                    <div className="flex items-center gap-3 mt-0.5">
                      <span className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase">
                        <Clock size={12} className="text-blue-500" /> 
                        {new Date(viagem.departureTime).toLocaleTimeString('pt-MZ', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      <span className="text-[9px] px-2 py-0.5 bg-slate-100 rounded text-slate-500 font-black uppercase tracking-tighter">
                        {viagem.bus?.plate || "Standard"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* PREÇO E AÇÃO */}
                <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-4 md:pt-0 border-slate-50">
                  <div className="text-left md:text-right">
                    <p className="text-[9px] font-black text-slate-400 uppercase leading-none mb-1">Preço Total</p>
                    <p className="text-xl md:text-2xl font-black text-slate-900 tracking-tighter">
                      {Number(viagem.price).toLocaleString('pt-MZ')} <span className="text-[10px]">MT</span>
                    </p>
                  </div>
                  
                  <Link href={`/checkout?tripId=${viagem.id}&preco=${viagem.price}&rota=${viagem.origin}-${viagem.destination}`} className="w-full md:w-auto">
                    <Button className="h-11 md:h-12 px-8 bg-slate-950 hover:bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-md active:scale-95 w-full md:w-auto">
                      Reservar
                    </Button>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-200">
              <p className="text-[10px] font-black text-slate-300 uppercase italic tracking-widest">
                Sem rotas disponíveis no momento
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}