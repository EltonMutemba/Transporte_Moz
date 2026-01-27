"use client";
import { useState } from "react";

type SeatMapProps = {
  capacity: number;
  occupiedSeats: number[];
  onSelect: (seat: number) => void;
};

export function SeatMap({ capacity, occupiedSeats, onSelect }: SeatMapProps) {
  const [selectedSeat, setSelectedSeat] = useState<number | null>(null);

  const handleSeatClick = (seatNumber: number) => {
    if (occupiedSeats.includes(seatNumber)) return; // Assento já ocupado
    setSelectedSeat(seatNumber);
    onSelect(seatNumber);
  };

  return (
    <div className="bg-slate-100 p-6 rounded-3xl border-4 border-slate-200 max-w-xs mx-auto">
      {/* Frente do Autocarro / Cabine do Motorista */}
      <div className="w-full h-12 bg-slate-300 rounded-t-xl mb-8 flex items-center justify-center">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Frente / Motorista</span>
      </div>

      {/* Grade de Assentos */}
      <div className="grid grid-cols-4 gap-3">
        {Array.from({ length: capacity }, (_, i) => i + 1).map((seat) => {
          const isOccupied = occupiedSeats.includes(seat);
          const isSelected = selectedSeat === seat;

          return (
            <button
              key={seat}
              disabled={isOccupied}
              onClick={() => handleSeatClick(seat)}
              className={`
                h-10 w-10 rounded-lg text-xs font-bold transition-all
                ${isOccupied ? "bg-slate-300 text-slate-400 cursor-not-allowed" : ""}
                ${isSelected ? "bg-orange-500 text-white shadow-lg scale-110 ring-2 ring-orange-200" : ""}
                ${!isOccupied && !isSelected ? "bg-white text-slate-600 hover:border-blue-500 border-2 border-transparent shadow-sm" : ""}
                ${seat % 4 === 2 ? "mr-4" : ""} /* Corredor central */
              `}
            >
              {seat}
            </button>
          );
        })}
      </div>

      {/* Legenda */}
      <div className="mt-8 flex justify-between text-[10px] font-bold uppercase text-slate-500">
        <div className="flex items-center gap-1"><div className="w-3 h-3 bg-white border border-slate-300 rounded"></div> Livre</div>
        <div className="flex items-center gap-1"><div className="w-3 h-3 bg-slate-300 rounded"></div> Ocupado</div>
        <div className="flex items-center gap-1"><div className="w-3 h-3 bg-orange-500 rounded"></div> Teu Lugar</div>
      </div>
    </div>
  );
}