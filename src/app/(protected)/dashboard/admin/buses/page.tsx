import React from "react";
import { Bus as BusIcon, MapPin, Users } from "lucide-react";
import { db } from "@/lib/db";
import { RegisterBusModal } from "@/components/admin/RegisterBusModal";
import { DeleteBusButton } from "@/components/admin/DeleteBusButton"; // [cite: 2026-01-28]

export default async function AdminBusesPage() {
  const buses = await db.bus.findMany({
    include: {
      trips: {
        where: { status: "AVAILABLE" },
        take: 1
      }
    },
    orderBy: { plate: 'asc' }
  });

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 italic uppercase tracking-tighter">
            Controlo de <span className="text-red-600">Frota</span>
          </h1>
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.3em] mt-2">
            {buses.length} Veículos Ativos no Sistema
          </p>
        </div>
        <RegisterBusModal />
      </div>

      {buses.length === 0 ? (
        <div className="text-center py-20 border-2 border-dashed border-slate-200 rounded-[2.5rem]">
          <p className="text-slate-400 font-bold uppercase text-xs tracking-widest">Nenhum veículo encontrado.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {buses.map((bus) => {
            const currentTrip = bus.trips[0];
            
            return (
              <div key={bus.id} className="bg-white border border-slate-200 rounded-[2.5rem] p-8 hover:shadow-2xl hover:border-red-500/20 transition-all group relative">
                
                {/* ÁREA DE STATUS E ELIMINAÇÃO [cite: 2026-01-28] */}
                <div className="flex justify-between items-start mb-6">
                  <div className="p-4 bg-slate-100 rounded-2xl text-slate-950 group-hover:bg-red-600 group-hover:text-white transition-all">
                    <BusIcon size={24} />
                  </div>
                  
                  <div className="flex flex-col items-end gap-3">
                    <span className={`text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest ${
                      currentTrip ? "bg-green-100 text-green-600" : "bg-slate-100 text-slate-500"
                    }`}>
                      {currentTrip ? "Em Rota" : "Disponível"}
                    </span>
                    
                    {/* O BOTÃO QUE FALTA NO TEU CÓDIGO [cite: 2026-01-28] */}
                    <DeleteBusButton id={bus.id} plate={bus.plate} />
                  </div>
                </div>

                <div className="space-y-1 mb-6">
                  <h2 className="text-2xl font-black text-slate-900 uppercase italic tracking-tighter">
                    {bus.plate}
                  </h2>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    {bus.model}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-100">
                  <div>
                    <p className="text-[8px] font-black text-slate-400 uppercase mb-1 flex items-center gap-1">
                      <Users size={10} /> Lotação
                    </p>
                    <p className="text-[10px] font-bold text-slate-700 uppercase">
                      {bus.capacity} Lugares
                    </p>
                  </div>
                  <div>
                    <p className="text-[8px] font-black text-slate-400 uppercase mb-1 flex items-center gap-1">
                      <MapPin size={10} /> Rota
                    </p>
                    <p className="text-[10px] font-bold text-slate-700 uppercase truncate">
                      {currentTrip ? `${currentTrip.origin} ↔ ${currentTrip.destination}` : "Pátio"}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}