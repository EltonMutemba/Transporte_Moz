"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { 
  Calendar, User, Smartphone, 
  CreditCard, ShieldCheck, CheckCircle2,
  Armchair, SteeringWheel, Info
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const [paymentMethod, setPaymentMethod] = useState("mpesa");
  const [selectedSeat, setSelectedSeat] = useState<number | null>(null);

  const rota = searchParams.get("rota") || "Maputo → Beira";
  const preco = searchParams.get("preco") || "3.500";
  const occupiedSeats = [1, 2, 5, 8, 12, 15, 20, 32];

  return (
    <main className="min-h-screen bg-slate-50 pt-28 pb-20 px-6">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-12">
        
        {/* COLUNA ESQUERDA (8 COLUNAS) */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* 1. DADOS DO PASSAGEIRO (PRIMEIRO) */}
          <section className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-sm border border-slate-100">
            <h2 className="text-2xl font-black tracking-tighter uppercase mb-8 flex items-center gap-3">
              <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">1</span>
              Dados do Passageiro
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <InputGroup label="Nome Completo" placeholder="Ex: Stélio Baloi" />
              <InputGroup label="Documento (BI/Passaporte)" placeholder="000000000A" />
              <div className="md:col-span-2">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Data da Viagem</p>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input type="date" className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold outline-none focus:border-blue-600 transition-colors" />
                </div>
              </div>
            </div>
          </section>

          {/* 2. ESCOLHA DO ASSENTO (COM ORIENTAÇÃO DO MOTORISTA) */}
          <section className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-sm border border-slate-100">
            <h2 className="text-2xl font-black tracking-tighter uppercase mb-2 flex items-center gap-3">
              <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">2</span>
              Escolha seu lugar
            </h2>
            <p className="text-slate-400 text-sm mb-8 font-medium italic">O motorista está à frente, escolha o seu lugar preferido.</p>
            
            <div className="bg-slate-900 p-6 md:p-12 rounded-[3rem] border-[12px] border-slate-800 shadow-2xl relative">
              
              {/* CABINE DO MOTORISTA (FRENTE DO CARRO) */}
              <div className="flex justify-between items-center mb-12 pb-6 border-b border-white/10">
                <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/20">
                    <User className="text-white w-6 h-6" /> 
                  </div>
                  <div>
                    <p className="text-white font-black text-xs uppercase tracking-widest">Motorista</p>
                    <p className="text-slate-400 text-[10px] font-bold">Lugar Reservado</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white font-black text-xs uppercase tracking-[0.3em] opacity-20">Frente do Veículo</p>
                  <div className="h-1 w-24 bg-gradient-to-l from-blue-600 to-transparent mt-2 rounded-full" />
                </div>
              </div>

              {/* MAPA DE POLTRONAS (Simulando corredor no meio) */}
              <div className="grid grid-cols-5 gap-y-4 gap-x-2 max-w-sm mx-auto">
                {Array.from({ length: 40 }, (_, i) => i + 1).map((id) => {
                  const isOccupied = occupiedSeats.includes(id);
                  const isSelected = selectedSeat === id;
                  
                  // Lógica para deixar o corredor vazio (coluna do meio)
                  const isAisle = (id % 5 === 3);

                  if (isAisle) return <div key={`aisle-${id}`} className="w-full" />;

                  return (
                    <button
                      key={id}
                      disabled={isOccupied}
                      onClick={() => setSelectedSeat(id)}
                      className={`
                        h-12 w-full rounded-t-xl border-b-4 flex flex-col items-center justify-center transition-all font-black text-[10px]
                        ${isOccupied ? "bg-slate-700 border-slate-800 text-slate-500 cursor-not-allowed" : 
                          isSelected ? "bg-blue-600 border-blue-800 text-white scale-110 shadow-lg shadow-blue-500/40" : 
                          "bg-white border-slate-300 text-slate-900 hover:border-blue-400"}
                      `}
                    >
                      <Armchair className={`w-3 h-3 mb-0.5 ${isSelected ? 'text-white' : 'text-slate-400'}`} />
                      {id}
                    </button>
                  );
                })}
              </div>
            </div>
          </section>

          {/* 3. PAGAMENTO MÓVEL */}
          <section className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-sm border border-slate-100">
            <h2 className="text-2xl font-black tracking-tighter uppercase mb-8 flex items-center gap-3">
              <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">3</span>
              Pagamento via Celular
            </h2>
            <div className="grid grid-cols-2 gap-4 mb-8">
              <PaymentOption active={paymentMethod === "mpesa"} onClick={() => setPaymentMethod("mpesa")} label="M-Pesa" color="bg-red-600" />
              <PaymentOption active={paymentMethod === "emola"} onClick={() => setPaymentMethod("emola")} label="e-Mola" color="bg-orange-500" />
            </div>
            <InputGroup 
              label={`Número do Celular (${paymentMethod.toUpperCase()})`} 
              placeholder="84 / 85 000 0000" 
              icon={<Smartphone className="w-5 h-5" />} 
            />
          </section>
        </div>

        {/* COLUNA DIREITA (STICKY RESUMO) */}
        <aside className="lg:col-span-4">
          <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white sticky top-28 border border-white/5">
            <h3 className="font-black uppercase text-xs tracking-[0.2em] text-blue-400 mb-6">Revisão do Pedido</h3>
            
            <div className="space-y-4 mb-8">
              <SummaryRow label="Rota" value={rota} />
              <SummaryRow label="Assento" value={selectedSeat ? `Poltrona #${selectedSeat}` : "Pendente"} highlight={!!selectedSeat} />
              <SummaryRow label="Passageiros" value="01 Pessoa" />
            </div>

            <div className="border-t border-white/10 pt-6 mb-8">
              <div className="flex justify-between items-end">
                <p className="font-bold text-slate-400">Total</p>
                <p className="text-4xl font-black tracking-tighter">{preco}<span className="text-sm ml-1 text-blue-400">MT</span></p>
              </div>
            </div>

            <Button 
              disabled={!selectedSeat}
              className={`w-full h-16 font-black rounded-2xl shadow-xl transition-all active:scale-95 ${
                selectedSeat ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-slate-800 text-slate-500 cursor-not-allowed"
              }`}
            >
              {selectedSeat ? "FINALIZAR AGORA" : "SELECIONE O LUGAR"}
            </Button>
          </div>
        </aside>
      </div>
    </main>
  );
}

/* --- COMPONENTES AUXILIARES --- */

function InputGroup({ label, placeholder, icon }: { label: string, placeholder: string, icon?: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
      <div className="relative">
        {icon && <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">{icon}</div>}
        <input className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold outline-none focus:border-blue-600 transition-colors" placeholder={placeholder} />
      </div>
    </div>
  );
}

function PaymentOption({ active, onClick, label, color }: { active: boolean, onClick: () => void, label: string, color: string }) {
  return (
    <button onClick={onClick} className={`relative h-20 rounded-2xl border-2 transition-all flex items-center justify-center gap-3 w-full ${active ? 'border-blue-600 bg-blue-50/50 shadow-inner' : 'border-slate-100 bg-white'}`}>
      <div className={`w-3 h-3 rounded-full ${color}`} />
      <span className={`font-black uppercase tracking-tighter ${active ? 'text-blue-600' : 'text-slate-400'}`}>{label}</span>
      {active && <CheckCircle2 className="absolute top-2 right-2 w-4 h-4 text-blue-600" />}
    </button>
  );
}

function SummaryRow({ label, value, highlight = false }: { label: string, value: string, highlight?: boolean }) {
  return (
    <div className="flex justify-between items-center text-sm">
      <span className="text-slate-500 font-medium">{label}</span>
      <span className={`font-bold uppercase tracking-tight ${highlight ? 'text-blue-400' : ''}`}>{value}</span>
    </div>
  );
}