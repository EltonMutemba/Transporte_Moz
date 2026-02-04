import React from "react";
import { MapPin, Wallet, Bus, Calendar, ArrowLeft, Save, Info } from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { createService } from "@/application/actions/createService";
import { redirect } from "next/navigation";

async function getBuses() {
  return await prisma.bus.findMany({
    orderBy: { plate: 'asc' }
  });
}

export default async function NewServicePage() {
  const buses = await getBuses();

  // WRAPPER INTERNO: Resolve o erro de tipo 'void' vs 'object'
  async function handleAction(formData: FormData) {
    "use server"; // [cite: 2026-02-04] Mantemos a lógica no servidor
    
    const result = await createService(formData);
    
    if (result?.error) {
      // Como estamos num Server Component, o ideal é passar o erro via URL 
      // ou usar o hook useActionState (mas para simplificar o teu build agora):
      console.error(result.error);
    } else {
      redirect("/dashboard/admin");
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      <div className="flex flex-col gap-4">
        <Link href="/dashboard/admin" className="w-fit flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-colors">
          <ArrowLeft size={14} /> Voltar ao Painel
        </Link>
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 uppercase italic tracking-tighter">
          Configurar Novo <span className="text-blue-600">Serviço</span>
        </h1>
      </div>

      {/* Chamamos o wrapper handleAction em vez de createService diretamente */}
      <form action={handleAction} className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* BLOCO ESQUERDO */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-6">
          <h2 className="text-[10px] font-black uppercase tracking-widest text-blue-600 flex items-center gap-2">
            <MapPin size={14} /> Itinerário e Tarifário
          </h2>

          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-[9px] font-black uppercase text-slate-400 ml-2">Origem</label>
              <input required name="origin" type="text" placeholder="Ex: Maputo" className="w-full bg-slate-50 border-none rounded-2xl p-4 text-xs font-bold focus:ring-2 focus:ring-blue-600 transition-all" />
            </div>
            
            <div className="space-y-1">
              <label className="text-[9px] font-black uppercase text-slate-400 ml-2">Destino</label>
              <input required name="destination" type="text" placeholder="Ex: Beira" className="w-full bg-slate-50 border-none rounded-2xl p-4 text-xs font-bold focus:ring-2 focus:ring-blue-600 transition-all" />
            </div>

            <div className="space-y-1 pt-2">
              <label className="text-[9px] font-black uppercase text-slate-400 ml-2">Preço (MT)</label>
              <div className="relative">
                <Wallet className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                <input required name="price" type="number" step="0.01" className="w-full bg-slate-50 border-none rounded-2xl p-4 pl-12 text-xs font-bold focus:ring-2 focus:ring-blue-600" />
              </div>
            </div>
          </div>
        </div>

        {/* BLOCO DIREITO */}
        <div className="bg-slate-950 p-8 rounded-[2.5rem] text-white shadow-xl flex flex-col justify-between">
          <div className="space-y-6">
            <h2 className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
              <Bus size={14} /> Alocação de Frota
            </h2>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase text-slate-500 ml-2">Autocarro</label>
                <select name="busId" required className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-xs font-bold focus:ring-2 focus:ring-blue-600">
                  <option value="" className="text-slate-900">Escolha o veículo...</option>
                  {buses.map(bus => (
                    <option key={bus.id} value={bus.id} className="text-slate-900">{bus.plate} ({bus.capacity} lug)</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase text-slate-500 ml-2">Partida</label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                  <input required name="departureTime" type="datetime-local" className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 pl-12 text-xs font-bold focus:ring-2 focus:ring-blue-600" />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-4">
            <button type="submit" className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg transition-all flex items-center justify-center gap-2">
              <Save size={14} /> Ativar Serviço
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}