import React from "react";
import Link from "next/link";
import { Ticket, ArrowRight, QrCode, Plus } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth"; 

export const dynamic = "force-dynamic"; 

async function getUserTickets() {
  const session = await auth();
  
  // Se não houver sessão, não mostra bilhetes de outros
  if (!session?.user?.id) {
    return { activeTicket: null, history: [] };
  }

  try {
    const allTickets = await prisma.ticket.findMany({
      where: { 
        userId: Number(session.user.id), // Filtro de segurança: Só os meus bilhetes
        paymentStatus: { in: ["PAID", "PENDING"] } 
      },
      orderBy: { createdAt: 'desc' },
      include: {
        trip: { include: { bus: true } },
        booking: true 
      }
    });

    if (allTickets.length === 0) return { activeTicket: null, history: [] };

    const activeTicket = allTickets[0];
    const seenTrips = new Set();
    seenTrips.add(activeTicket.tripId);

    const history = allTickets.slice(1).filter(ticket => {
      if (seenTrips.has(ticket.tripId)) return false;
      seenTrips.add(ticket.tripId);
      return true;
    }).slice(0, 5);

    return { activeTicket, history };
  } catch (error) {
    console.error("ERRO_VIAGENS:", error);
    return { activeTicket: null, history: [] };
  }
}

export default async function ViagensPage() {
  const { activeTicket, history } = await getUserTickets();

  return (
    <div className="max-w-5xl mx-auto space-y-8 md:space-y-12 p-4 md:p-0 animate-in fade-in duration-700">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 pt-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 uppercase italic tracking-tighter leading-none">
            Viagem <span className="text-red-600">Ativa</span>
          </h1>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-2">
            Controlo de embarque e bilheteira
          </p>
        </div>
        <Link 
          href="/search" 
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 border border-slate-200 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-600 hover:border-red-600 hover:text-red-600 transition-all"
        >
          <Plus size={14} /> Nova Viagem
        </Link>
      </header>

      <section>
        {activeTicket ? (
          <div className="bg-slate-950 rounded-[2rem] md:rounded-[3rem] p-6 md:p-10 text-white shadow-2xl relative overflow-hidden border border-white/5">
            <div className="relative z-10 flex flex-col lg:flex-row justify-between gap-8 md:gap-12">
              <div className="space-y-8 md:space-y-10 flex-1">
                <div className="flex flex-row items-center justify-between lg:justify-start gap-4 md:gap-8">
                  <div className="flex-1">
                    <p className="text-slate-500 text-[9px] font-black uppercase tracking-widest mb-1 opacity-70">Origem</p>
                    <p className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-black italic uppercase tracking-tighter truncate">{activeTicket.trip.origin}</p>
                  </div>
                  <ArrowRight className="text-red-600 w-5 h-5 md:w-8 md:h-8 animate-pulse shrink-0" />
                  <div className="flex-1 text-right lg:text-left">
                    <p className="text-slate-500 text-[9px] font-black uppercase tracking-widest mb-1 opacity-70">Destino</p>
                    <p className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-black italic uppercase tracking-tighter truncate">{activeTicket.trip.destination}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-8 border-t border-white/10">
                  <InfoItem label="Data" value={new Date(activeTicket.trip.departureTime).toLocaleDateString('pt-MZ')} />
                  <InfoItem label="Lugar" value={activeTicket.seatNumber.toString()} highlight />
                  <div className="col-span-2 md:col-span-1">
                    <InfoItem label="Estado" value={activeTicket.paymentStatus} highlight={activeTicket.paymentStatus === "PAID"} />
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-48 bg-white text-slate-950 p-6 md:p-10 rounded-3xl flex flex-row lg:flex-col items-center justify-center gap-4 shadow-xl shrink-0">
                <QrCode size={32} className="md:w-12 md:h-12" />
                <div className="text-left lg:text-center">
                  <span className="block text-[10px] font-black uppercase tracking-widest">Check-in</span>
                  <span className="text-[8px] font-bold opacity-40 uppercase">Apresentar ao Motorista</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="py-16 md:py-24 rounded-[2rem] border border-dashed border-slate-200 bg-slate-50/50 text-center flex flex-col items-center justify-center">
            <Ticket className="text-slate-300 mb-4" size={32} />
            <p className="font-bold text-slate-400 text-[10px] uppercase tracking-[0.3em]">Nenhum bilhete encontrado</p>
          </div>
        )}
      </section>

      <section className="pb-10">
        <div className="flex items-center gap-4 mb-6">
          <h2 className="text-[9px] font-black text-slate-400 uppercase tracking-[0.4em] whitespace-nowrap">Atividade Recente</h2>
          <div className="h-px w-full bg-slate-100" />
        </div>
        <div className="grid grid-cols-1 gap-3">
          {history.length > 0 ? history.map((ticket) => (
            <div key={ticket.id} className="p-4 md:p-5 flex flex-row items-center justify-between gap-4 bg-white border border-slate-100 rounded-2xl hover:shadow-sm transition-all">
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-300 shrink-0">
                  <Ticket size={18} />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] md:text-xs font-black uppercase text-slate-800 tracking-tight truncate">
                    {ticket.trip.origin} <span className="text-red-600 mx-1">→</span> {ticket.trip.destination}
                  </p>
                  <p className="text-[9px] font-bold text-slate-400 uppercase">
                    {new Date(ticket.trip.departureTime).toLocaleDateString('pt-MZ')}
                  </p>
                </div>
              </div>
              <span className="text-[8px] font-black uppercase tracking-widest text-slate-400 bg-slate-100 px-3 py-1.5 rounded-lg">
                {ticket.paymentStatus}
              </span>
            </div>
          )) : (
            <p className="text-center text-slate-400 text-[10px] font-bold uppercase py-10">Sem histórico</p>
          )}
        </div>
      </section>
    </div>
  );
}

const InfoItem = ({ label, value, highlight }: any) => (
  <div>
    <p className="text-slate-500 text-[8px] md:text-[9px] font-black uppercase tracking-widest mb-1">{label}</p>
    <p className={`text-xs md:text-sm font-bold tracking-tight ${highlight ? 'text-red-600' : 'text-slate-900 lg:text-white'}`}>
        {value}
    </p>
  </div>
);