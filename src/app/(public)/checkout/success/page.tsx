"use client";

import React, { useEffect, useState, useCallback, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { 
  CheckCircle2, QrCode, Share2, ArrowRight, Loader2, XCircle, Clock
} from "lucide-react";
import { simulatePayment } from "@/application/actions/simulatePayment";
import { getBookingStatus } from "@/application/actions/getBookingStatus";

/* --- COMPONENTE DE CONTEÚDO (Lógica Principal) --- */

function SuccessContent() {
  const searchParams = useSearchParams();
  const ref = searchParams.get("ref");
  
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState<any | null>(null);
  const [simulating, setSimulating] = useState(false);
  const pollTimerRef = useRef<NodeJS.Timeout | null>(null);

  const checkStatus = useCallback(async () => {
    if (!ref) return;
    try {
      const data = await getBookingStatus(ref);
      if (data) {
        setBooking(data);
        setLoading(false);
        if (data.status === "PENDING") {
          pollTimerRef.current = setTimeout(checkStatus, 8000);
        }
      }
    } catch (error) {
      pollTimerRef.current = setTimeout(checkStatus, 15000);
    }
  }, [ref]);

  useEffect(() => {
    checkStatus();
    return () => { if (pollTimerRef.current) clearTimeout(pollTimerRef.current); };
  }, [checkStatus]);

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
      <Loader2 className="w-8 h-8 text-blue-600 animate-spin mb-4" />
      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 animate-pulse">Sincronizando Bilhete...</p>
    </div>
  );

  if (!booking) return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-white text-center">
      <XCircle size={40} strokeWidth={1} className="text-red-500 mb-4" />
      <h2 className="text-lg font-black uppercase tracking-tight text-slate-900">Falha na Verificação</h2>
      <p className="text-xs text-slate-400 mt-2 max-w-[200px]">Não conseguimos conectar à base de dados para validar esta referência.</p>
    </div>
  );

  const isPaid = booking.status === "PAID";

  return (
    <main className="min-h-screen bg-[#F8FAFC] py-0 md:py-12 px-0 md:px-6 font-sans antialiased">
      <div className="max-w-md mx-auto relative">
        
        {/* Notificação de Status */}
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-20 w-full px-8 hidden md:block">
            <div className={`py-2 px-4 rounded-full text-center text-[9px] font-black uppercase tracking-[0.2em] shadow-sm border ${
                isPaid ? "bg-emerald-500 text-white border-emerald-400" : "bg-amber-400 text-white border-amber-300"
            }`}>
                {isPaid ? "✔ Pagamento Confirmado" : "⌛ Aguardando PIN M-Pesa"}
            </div>
        </div>

        {/* O BILHETE (CARD) */}
        <div className="bg-white shadow-[0_20px_50px_rgba(0,0,0,0.08)] md:rounded-[2rem] overflow-hidden border-x border-b md:border border-slate-200/60">
          
          <div className={`p-8 pb-12 relative overflow-hidden ${
            isPaid ? "bg-slate-900" : "bg-blue-700"
          }`}>
            <div className="absolute top-0 right-0 p-8 opacity-10">
                <CheckCircle2 size={120} />
            </div>
            
            <div className="relative z-10 flex justify-between items-start">
                <div>
                    <h1 className="text-white text-2xl font-black tracking-tighter">TransPorto</h1>
                    <p className="text-blue-200/60 text-[10px] font-bold uppercase tracking-[0.2em]">Mozambique Transport</p>
                </div>
                <div className="text-right">
                    <p className="text-blue-200/40 text-[9px] font-bold uppercase tracking-wider">Ref. Viagem</p>
                    <p className="text-white font-mono text-xs font-bold">{booking.reference.split('-').pop()}</p>
                </div>
            </div>

            <div className="relative z-10 mt-10 flex items-center justify-between">
                <div className="flex-1">
                    <p className="text-blue-200/50 text-[9px] font-black uppercase mb-1">Origem</p>
                    <p className="text-white text-2xl font-black tracking-tight">{booking.trip.origin}</p>
                </div>
                <div className="px-4 flex flex-col items-center opacity-40">
                    <div className="w-12 h-[1px] bg-white/30" />
                    <ArrowRight className="text-white my-1" size={16} />
                    <div className="w-12 h-[1px] bg-white/30" />
                </div>
                <div className="flex-1 text-right">
                    <p className="text-blue-200/50 text-[9px] font-black uppercase mb-1">Destino</p>
                    <p className="text-white text-2xl font-black tracking-tight">{booking.trip.destination}</p>
                </div>
            </div>
          </div>

          <div className="relative h-6 bg-white">
            <div className="absolute -top-3 -left-3 w-6 h-6 bg-[#F8FAFC] rounded-full border-r border-slate-200/60 hidden md:block" />
            <div className="absolute -top-3 -right-3 w-6 h-6 bg-[#F8FAFC] rounded-full border-l border-slate-200/60 hidden md:block" />
            <div className="mx-8 border-b-2 border-dashed border-slate-100 h-full w-auto" />
          </div>

          <div className="bg-white px-8 py-6">
            <div className="grid grid-cols-2 gap-y-8 gap-x-4">
              <DetailItem label="Passageiro" value={booking.passengerName} />
              <DetailItem label="Data Partida" value={new Date(booking.trip.departureTime).toLocaleDateString('pt-MZ')} />
              <DetailItem label="Lugar" value={booking.tickets.map((t:any) => t.seatNumber).join(", ")} />
              <DetailItem label="Tarifa" value={`${Number(booking.totalAmount).toLocaleString()} MT`} isBold />
            </div>

            <div className="mt-12 flex flex-col items-center relative">
                <div className={`p-4 bg-white border-2 border-slate-900 rounded-3xl transition-all duration-1000 ${
                    !isPaid ? "opacity-5 blur-xl scale-90" : "opacity-100 scale-100"
                }`}>
                    <QrCode size={130} strokeWidth={1.2} className="text-slate-900" />
                </div>
                {!isPaid && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center animate-bounce">
                        <Clock size={20} className="text-slate-400 mb-2" />
                        <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Aguardando PIN</p>
                    </div>
                )}
                <p className={`mt-6 text-[10px] font-black uppercase tracking-[0.3em] ${isPaid ? 'text-slate-900' : 'text-slate-300'}`}>
                    {isPaid ? "Voucher de Embarque Ativo" : "Bilhete Provisório"}
                </p>
            </div>
          </div>
        </div>

        <div className="p-8 space-y-3">
          {isPaid ? (
            <div className="grid grid-cols-1 gap-3">
              <button className="w-full h-14 bg-slate-900 text-white font-black text-[11px] uppercase tracking-[0.2em] rounded-2xl hover:bg-black transition-all shadow-lg active:scale-95">
                Baixar PDF do Bilhete
              </button>
              <button className="w-full h-14 bg-white border border-slate-200 text-slate-600 font-black text-[11px] uppercase tracking-[0.2em] rounded-2xl hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
                <Share2 size={16} /> Partilhar no WhatsApp
              </button>
            </div>
          ) : (
            <button 
              onClick={async () => {
                setSimulating(true);
                await simulatePayment(booking.reference);
                window.location.reload();
              }}
              disabled={simulating}
              className="w-full py-5 text-[10px] font-black uppercase tracking-[0.4em] text-blue-500 bg-blue-50/50 border-2 border-dashed border-blue-200 rounded-2xl animate-pulse"
            >
              {simulating ? "Processando..." : "Simular Recebimento"}
            </button>
          )}
        </div>
      </div>
    </main>
  );
}

/* --- COMPONENTE PRINCIPAL (Export Default) --- */

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-center">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin mb-4" />
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
          Iniciando validação segura...
        </p>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}

/* --- AUXILIARES --- */

function DetailItem({ label, value, isBold = false }: { label: string, value: string, isBold?: boolean }) {
  return (
    <div className="flex flex-col">
      <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">{label}</span>
      <span className={`text-[13px] uppercase truncate ${isBold ? 'font-black text-blue-600' : 'font-bold text-slate-800'}`}>
        {value}
      </span>
    </div>
  );
}