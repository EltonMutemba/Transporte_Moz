"use client";

import React, { useState, Suspense, useMemo, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Plus, Minus, User, Phone, ChevronLeft, Loader2, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { processCheckoutAction } from "@/application/actions/processCheckoutAction";
import { getOccupiedSeats } from "@/application/actions/getOccupiedSeats";

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center font-black text-slate-400 uppercase animate-pulse text-xs">Sincronizando...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const tripId = Number(searchParams.get("tripId") || "0");
  const rota = searchParams.get("rota") || "Rota Nacional";
  const precoBase = Number(searchParams.get("preco") || "0");

  const [passengerCount, setPassengerCount] = useState(1);
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [occupiedSeats, setOccupiedSeats] = useState<number[]>([]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [passengerName, setPassengerName] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"mpesa" | "emola">("mpesa");
  const [isProcessing, setIsProcessing] = useState(false);

  // Sincronizar lugares ocupados da DB para o Mapa
  useEffect(() => {
    if (tripId > 0) {
      getOccupiedSeats(tripId).then(setOccupiedSeats).catch(console.error);
    }
  }, [tripId]);

  const totalPagar = useMemo(() => {
    const qtd = selectedSeats.length > 0 ? selectedSeats.length : passengerCount;
    return precoBase * qtd;
  }, [precoBase, selectedSeats, passengerCount]);

  const toggleSeat = (id: number) => {
    if (occupiedSeats.includes(id)) return;
    if (selectedSeats.includes(id)) {
      setSelectedSeats(prev => prev.filter(s => s !== id));
    } else {
      if (selectedSeats.length < 4) {
        setSelectedSeats(prev => [...prev, id].sort((a, b) => a - b));
      } else {
        alert("Máximo 4 lugares por reserva.");
      }
    }
  };

  const isFormValid = passengerName.length > 3 && phoneNumber.length >= 9 && selectedSeats.length > 0;

  const handleFinalizar = async () => {
    setIsProcessing(true);
    try {
      const result = await processCheckoutAction({
        tripId,
        passengerName,
        phoneNumber,
        paymentMethod,
        seatNumbers: selectedSeats,
        totalAmount: totalPagar,
      });

      if (result.success && result.reference) {
        // Redirecionamento para a página de sucesso
        router.push(`/checkout/success?ref=${result.reference}`);
      } else {
        alert(result.error || "Erro desconhecido.");
      }
    } catch (e) {
      alert("Erro na rede. Tente novamente.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      <div className="bg-slate-950 pt-16 pb-10 px-6 text-center">
        <Link href="/search" className="text-blue-500 text-[10px] font-black uppercase flex items-center justify-center gap-2 mb-4">
          <ChevronLeft size={14} /> Voltar aos Horários
        </Link>
        <h1 className="text-2xl font-black text-white uppercase italic tracking-tighter">Finalizar Reserva</h1>
        <p className="text-blue-500 text-[10px] font-black uppercase mt-2">{rota.replace("-", " → ")}</p>
      </div>

      <div className="max-w-5xl mx-auto px-4 -mt-6 grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-4">
          
          <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-[10px] font-black uppercase mb-4 text-slate-400">01. Nome do Passageiro</h2>
            <input 
              value={passengerName}
              onChange={(e) => setPassengerName(e.target.value)}
              placeholder="Ex: Stélio Chilengue" 
              className="w-full p-4 bg-slate-50 border rounded-xl font-bold text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />
          </section>

          <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-[10px] font-black uppercase text-slate-400">02. Pagamento Móvel</h2>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <button 
                onClick={() => setPaymentMethod("mpesa")}
                className={`p-4 rounded-xl border-2 font-black text-[10px] ${paymentMethod === 'mpesa' ? 'border-red-600 bg-red-50 text-red-600' : 'border-slate-100 bg-slate-50 opacity-60'}`}
              >M-PESA</button>
              <button 
                onClick={() => setPaymentMethod("emola")}
                className={`p-4 rounded-xl border-2 font-black text-[10px] ${paymentMethod === 'emola' ? 'border-orange-500 bg-orange-50 text-orange-600' : 'border-slate-100 bg-slate-50 opacity-60'}`}
              >E-MOLA</button>
            </div>
            <input 
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Ex: 84 / 85 / 86..." 
              className="w-full p-4 bg-slate-50 border rounded-xl font-bold text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />
          </section>

          <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-[10px] font-black uppercase mb-6 text-slate-400 flex justify-between">
              <span>03. Seleção de Assentos</span>
              <span className="text-blue-600">{selectedSeats.length} Selecionados</span>
            </h2>
            <div className="bg-slate-950 p-6 rounded-[2.5rem] border-[8px] border-slate-900">
              <div className="grid grid-cols-5 gap-2 max-w-[300px] mx-auto">
                {Array.from({ length: 40 }, (_, i) => i + 1).map(id => {
                  if (id % 5 === 3) return <div key={`gap-${id}`} className="w-4" />;
                  const isOccupied = occupiedSeats.includes(id);
                  const isSelected = selectedSeats.includes(id);
                  return (
                    <button 
                      key={id} 
                      disabled={isOccupied}
                      onClick={() => toggleSeat(id)}
                      className={`h-11 rounded-t-xl border-b-[4px] font-black text-[10px] transition-all
                        ${isOccupied ? 'bg-slate-800 border-slate-900 text-slate-700 cursor-not-allowed' : 
                          isSelected ? 'bg-blue-600 border-blue-800 text-white scale-110' : 
                          'bg-white border-slate-300 text-slate-900'}
                      `}
                    >
                      {isOccupied ? "X" : id}
                    </button>
                  );
                })}
              </div>
            </div>
          </section>
        </div>

        <aside className="lg:col-span-4">
          <div className="bg-slate-900 rounded-3xl p-6 text-white sticky top-6 shadow-xl">
            <h3 className="text-[10px] font-black text-blue-400 uppercase mb-6">Resumo da Reserva</h3>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between border-b border-white/5 pb-3">
                <span className="text-[10px] text-slate-400 font-bold uppercase">Total a Pagar</span>
                <span className="text-2xl font-black">{totalPagar.toLocaleString()} MT</span>
              </div>
            </div>
            <Button 
              disabled={!isFormValid || isProcessing}
              onClick={handleFinalizar}
              className="w-full h-14 bg-blue-600 hover:bg-blue-700 rounded-2xl font-black uppercase text-[10px]"
            >
              {isProcessing ? <Loader2 className="animate-spin" /> : "Confirmar e Pagar"}
            </Button>
          </div>
        </aside>
      </div>
    </main>
  );
}