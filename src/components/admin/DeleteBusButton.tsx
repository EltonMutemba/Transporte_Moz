"use client";

import { useState } from "react";
import { Trash2, AlertTriangle } from "lucide-react";
import { deleteBus } from "@/application/actions/busActions";

export function DeleteBusButton({ id, plate }: { id: number, plate: string }) {
  const [isConfirming, setIsConfirming] = useState(false);

  async function handleDelete() {
    const result = await deleteBus(id);
    if (!result.success) alert(result.error);
    setIsConfirming(false);
  }

  if (isConfirming) {
    return (
      <div className="flex items-center gap-2 animate-in fade-in zoom-in duration-200">
        <button onClick={handleDelete} className="bg-red-600 text-white text-[8px] font-black px-3 py-1.5 rounded-lg uppercase">Confirmar</button>
        <button onClick={() => setIsConfirming(false)} className="text-slate-400 text-[8px] font-black uppercase">Cancelar</button>
      </div>
    );
  }

  return (
    <button 
      onClick={() => setIsConfirming(true)}
      className="p-2 text-slate-300 hover:text-red-600 transition-colors"
      title="Eliminar Veículo"
    >
      <Trash2 size={16} />
    </button>
  );
}