"use client";

import { useState } from "react";
import { createBus } from "@/application/actions/busActions";
import { X, Truck, Hash, Users } from "lucide-react";

export function RegisterBusModal() {
  const [isOpen, setIsOpen] = useState(false);

  async function handleSubmit(formData: FormData) {
    const result = await createBus(formData);
    if (result.success) setIsOpen(false);
    else alert(result.error);
  }

  if (!isOpen) return (
    <button 
      onClick={() => setIsOpen(true)}
      className="flex items-center justify-center gap-3 bg-slate-950 text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-red-600 transition-all shadow-xl"
    >
      Registar Veículo
    </button>
  );

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-[2.5rem] p-10 shadow-2xl animate-in zoom-in duration-300">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-black italic uppercase tracking-tighter">Novo <span className="text-red-600">Veículo</span></h2>
          <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-slate-100 rounded-full"><X size={20}/></button>
        </div>

        <form action={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-400 flex items-center gap-2"><Hash size={12}/> Matrícula</label>
            <input name="plate" required placeholder="Ex: ABC-123-MC" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 px-6 text-sm font-bold outline-none focus:border-red-500 transition-all uppercase" />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-400 flex items-center gap-2"><Truck size={12}/> Modelo</label>
            <input name="model" required placeholder="Ex: Marcopolo G7" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 px-6 text-sm font-bold outline-none focus:border-red-500 transition-all" />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-400 flex items-center gap-2"><Users size={12}/> Lotação</label>
            <input name="capacity" type="number" required placeholder="Ex: 49" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 px-6 text-sm font-bold outline-none focus:border-red-500 transition-all" />
          </div>

          <button type="submit" className="w-full bg-slate-950 text-white py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-red-600 transition-all">
            Confirmar Registo
          </button>
        </form>
      </div>
    </div>
  );
}