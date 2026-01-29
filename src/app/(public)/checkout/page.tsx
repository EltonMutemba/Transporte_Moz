"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { 
  Plus, Minus, Armchair, ShieldCheck, User, 
  PhoneForwarded, CheckCircle2, Info, ChevronLeft, Loader2 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center font-black uppercase tracking-widest text-slate-400">Iniciando Checkout...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // ESTADOS
  const [passengerCount, setPassengerCount] = useState(1);
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [paymentMethod, setPaymentMethod] = useState("mpesa");
  const [isProcessing, setIsProcessing] = useState(false);

  // DADOS DA VIAGEM
  const rota = searchParams.get("rota") || "Maputo → Beira";
  const precoBase = parseInt(searchParams.get("preco")?.replace(".", "") || "3500");
  const totalPagar = (precoBase * passengerCount).toLocaleString();
  const occupiedSeats = [1, 2, 5, 8, 12, 15, 20, 32];

  // LÓGICA DE SELEÇÃO
  const toggleSeat = (id: number) => {
    if (selectedSeats.includes(id)) {
      setSelectedSeats(selectedSeats.filter(seat => seat !== id));
    } else if (selectedSeats.length < passengerCount) {
      setSelectedSeats([...selectedSeats, id].sort((a, b) => a - b));
    } else {
      const newSeats = [...selectedSeats.slice(1), id].sort((a, b) => a - b);
      setSelectedSeats(newSeats);
    }
  };

  const isFormValid = selectedSeats.length === passengerCount;

  // SIMULAÇÃO DE PAGAMENTO
  const handleFinalizar = () => {
    setIsProcessing(true);
    // Simula o tempo de resposta do Gateway M-Pesa/e-Mola
    setTimeout(() => {
      setIsProcessing(false);
      router.push("/checkout/success");
    }, 2500);
  };

  return (
    <main className="min-h-screen bg-slate-50 pt-12 pb-24 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        
        <Link href="/search" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 transition font-black text-[10px] uppercase tracking-[0.2em] mb-10">
          <ChevronLeft className="w-4 h-4" /> Alterar Pesquisa
        </Link>

        <div className="grid lg:grid-cols-12 gap-10">
          
          <div className="lg:col-span-8 space-y-10">
            
            {/* 1. QUANTIDADE */}
            <section className="bg-white p-8 md:p-10 rounded-[3rem] border border-slate-100 shadow-sm">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                  <h2 className="text-2xl font-black uppercase tracking-tighter flex items-center gap-3">
                    <span className="w-8 h-8 bg-blue-600 text-white rounded-xl flex items-center justify-center text-sm italic">01</span>
                    Viajantes
                  </h2>
                </div>
                
                <div className="flex items-center gap-6 bg-slate-900 p-3 rounded-2xl border border-slate-800 w-full md:w-auto justify-between md:justify-center">
                  <button 
                    disabled={isProcessing}
                    onClick={() => { setPassengerCount(Math.max(1, passengerCount - 1)); setSelectedSeats([]); }}
                    className="w-12 h-12 bg-slate-800 text-white rounded-xl flex items-center justify-center hover:bg-blue-600 transition-all disabled:opacity-50"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <span className="font-black text-3xl text-white w-12 text-center">{passengerCount}</span>
                  <button 
                    disabled={isProcessing}
                    onClick={() => { setPassengerCount(Math.min(5, passengerCount + 1)); setSelectedSeats([]); }}
                    className="w-12 h-12 bg-slate-800 text-white rounded-xl flex items-center justify-center hover:bg-blue-600 transition-all disabled:opacity-50"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </section>

            {/* 2. IDENTIFICAÇÃO DINÂMICA */}
            <section className="bg-white p-8 md:p-10 rounded-[3rem] border border-slate-100 shadow-sm">
              <h2 className="text-2xl font-black uppercase tracking-tighter mb-10 flex items-center gap-3">
                <span className="w-8 h-8 bg-blue-600 text-white rounded-xl flex items-center justify-center text-sm italic">02</span>
                Dados de Identificação
              </h2>

              <div className="space-y-12">
                {Array.from({ length: passengerCount }).map((_, i) => (
                  <div key={i} className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em] mb-6">
                      Passageiro {i + 1} {i === 0 && "(Responsável)"}
                    </p>
                    <div className="grid md:grid-cols-2 gap-8">
                      <InputGroup label="Nome Completo" placeholder="Ex: Stélio Baloi" icon={<User className="w-4 h-4"/>} />
                      <InputGroup label="BI / Passaporte" placeholder="000000000A" />
                    </div>
                  </div>
                ))}

                <div className="p-8 bg-amber-50 rounded-[2.5rem] border border-amber-100/50 space-y-5">
                  <div className="flex items-center gap-3 text-amber-700 font-black text-xs uppercase tracking-widest">
                    <ShieldCheck className="w-5 h-5" /> Emergência
                  </div>
                  <InputGroup 
                    label="Telemóvel Alternativo" 
                    placeholder="84 / 85 000 0000" 
                    icon={<PhoneForwarded className="w-4 h-4 text-amber-600" />}
                  />
                </div>
              </div>
            </section>

            {/* 3. ASSENTOS */}
            <section className="bg-white p-8 md:p-10 rounded-[3rem] border border-slate-100 shadow-sm">
              <div className="flex justify-between items-end mb-10">
                <h2 className="text-2xl font-black uppercase tracking-tighter flex items-center gap-3">
                  <span className="w-8 h-8 bg-blue-600 text-white rounded-xl flex items-center justify-center text-sm italic">03</span>
                  Escolha os Lugares
                </h2>
                <div className="flex gap-4">
                  <LegendItem color="bg-blue-600" label="Sua Escolha" />
                  <LegendItem color="bg-slate-800" label="Ocupado" />
                </div>
              </div>

              <div className="bg-slate-950 p-10 md:p-16 rounded-[4rem] border-[14px] border-slate-900 shadow-2xl">
                <div className="grid grid-cols-5 gap-y-5 gap-x-3 max-w-sm mx-auto">
                  {Array.from({ length: 40 }, (_, i) => i + 1).map((id) => {
                    const isOccupied = occupiedSeats.includes(id);
                    const isSelected = selectedSeats.includes(id);
                    const isAisle = (id % 5 === 3);

                    if (isAisle) return <div key={`aisle-${id}`} className="w-full flex items-center justify-center opacity-10"><div className="w-0.5 h-full bg-white rounded-full" /></div>;

                    return (
                      <button
                        key={id}
                        disabled={isOccupied || isProcessing}
                        onClick={() => toggleSeat(id)}
                        className={`
                          h-12 w-full rounded-t-2xl border-b-[4px] flex flex-col items-center justify-center transition-all font-black text-[10px]
                          ${isOccupied ? "bg-slate-800 border-slate-900 text-slate-600" : 
                            isSelected ? "bg-blue-600 border-blue-800 text-white scale-110 shadow-lg shadow-blue-500/30" : 
                            "bg-white border-slate-200 text-slate-900 hover:border-blue-400"}
                        `}
                      >
                        <Armchair className={`w-3.5 h-3.5 mb-0.5 ${isSelected ? 'text-white' : 'text-slate-300'}`} />
                        {id}
                      </button>
                    );
                  })}
                </div>
              </div>
            </section>
          </div>

          {/* RESUMO FIXO */}
          <aside className="lg:col-span-4 lg:sticky lg:top-28 h-fit">
            <div className="bg-slate-900 rounded-[3rem] p-8 md:p-10 text-white border border-white/5 shadow-2xl">
              <h3 className="text-blue-500 font-black uppercase text-[10px] tracking-[0.3em] mb-10 italic flex items-center gap-2">
                <Info className="w-3 h-3" /> Resumo Final
              </h3>
              
              <div className="space-y-6 mb-10">
                <SummaryRow label="Rota" value={rota} />
                <SummaryRow label="Passageiros" value={`${passengerCount} Pessoa(s)`} />
                <SummaryRow label="Assentos" value={selectedSeats.length > 0 ? selectedSeats.join(", ") : "Pendente"} highlight={isFormValid} />
              </div>

              <div className="grid grid-cols-2 gap-3 mb-10">
                <PaymentMini active={paymentMethod === "mpesa"} onClick={() => setPaymentMethod("mpesa")} label="M-Pesa" color="bg-red-600" />
                <PaymentMini active={paymentMethod === "emola"} onClick={() => setPaymentMethod("emola")} label="e-Mola" color="bg-orange-500" />
              </div>

              <div className="border-t border-white/5 pt-8 mb-10">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Total a pagar</p>
                <p className="text-5xl font-black tracking-tighter italic">{totalPagar}<span className="text-sm ml-1 text-blue-500">MT</span></p>
              </div>

              <Button 
                disabled={!isFormValid || isProcessing}
                onClick={handleFinalizar}
                className={`w-full h-20 font-black rounded-2xl text-[11px] tracking-[0.3em] shadow-xl transition-all ${
                  isFormValid ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-slate-800 text-slate-600"
                }`}
              >
                {isProcessing ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" /> PROCESSANDO...
                  </span>
                ) : isFormValid ? "CONFIRMAR PAGAMENTO" : `FALTA SELECIONAR LUGAR`}
              </Button>
            </div>
          </aside>

        </div>
      </div>
    </main>
  );
}

// COMPONENTES AUXILIARES
function InputGroup({ label, placeholder, icon }: { label: string, placeholder: string, icon?: React.ReactNode }) {
  return (
    <div className="space-y-4 w-full text-left">
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
      <div className="relative">
        {icon && <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400">{icon}</div>}
        <input className="w-full pl-14 pr-6 py-5 bg-slate-50 border border-slate-100 rounded-2xl font-black outline-none focus:border-blue-600 focus:bg-white transition-all text-sm uppercase" placeholder={placeholder} />
      </div>
    </div>
  );
}

function SummaryRow({ label, value, highlight = false }: { label: string, value: string, highlight?: boolean }) {
  return (
    <div className="flex justify-between items-center text-[10px]">
      <span className="text-slate-500 font-black uppercase tracking-widest">{label}</span>
      <span className={`font-black uppercase tracking-tight ${highlight ? 'text-blue-400' : 'text-slate-300'}`}>{value}</span>
    </div>
  );
}

function LegendItem({ color, label }: { color: string, label: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className={`w-3 h-3 rounded-full ${color}`} />
      <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest">{label}</span>
    </div>
  );
}

function PaymentMini({ active, onClick, label, color }: { active: boolean, onClick: () => void, label: string, color: string }) {
  return (
    <button onClick={onClick} className={`h-14 rounded-2xl border-2 transition-all flex items-center justify-center gap-3 w-full ${active ? 'border-blue-600 bg-blue-600/10' : 'border-white/5 bg-white/5'}`}>
      <div className={`w-2.5 h-2.5 rounded-full ${color}`} />
      <span className={`text-[10px] font-black uppercase tracking-widest ${active ? 'text-white' : 'text-slate-500'}`}>{label}</span>
    </button>
  );
}