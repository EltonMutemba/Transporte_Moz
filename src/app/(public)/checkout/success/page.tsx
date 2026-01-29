"use client";

import React from "react";
import { CheckCircle2, QrCode, Download, Share2, MapPin, Calendar, User, ArrowRight, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-slate-50 pt-16 pb-20 px-6">
      <div className="max-w-2xl mx-auto">
        
        {/* STATUS DA TRANSAÇÃO */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 bg-green-100 text-green-700 px-6 py-2 rounded-full mb-6">
            <CheckCircle2 className="w-5 h-5" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Pagamento Confirmado</span>
          </div>
          <h1 className="text-4xl font-black tracking-tighter text-slate-900 uppercase italic">
            Reserva Finalizada.
          </h1>
          <p className="text-slate-500 font-bold text-xs uppercase tracking-widest mt-3">
            O seu bilhete digital foi gerado com sucesso.
          </p>
        </div>

        {/* BILHETE DIGITAL (ESTILO MINIMALISTA) */}
        <div className="bg-white rounded-[2rem] shadow-xl overflow-hidden border border-slate-100 relative">
          
          {/* HEADER DO BILHETE */}
          <div className="bg-slate-900 p-8 text-white flex justify-between items-center">
            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.3em] text-blue-400 mb-1">Bilhete Eletrónico</p>
              <h2 className="text-xl font-black italic uppercase tracking-tight">TransPorto Moz</h2>
            </div>
            <div className="text-right">
              <p className="text-[9px] font-black uppercase opacity-50">Localizador</p>
              <p className="text-lg font-black text-blue-400 uppercase">TPM-99283</p>
            </div>
          </div>

          {/* CORPO DO BILHETE */}
          <div className="p-8 md:p-10 space-y-10">
            
            {/* ROTA PRINCIPAL */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-8">
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Origem</p>
                <p className="text-2xl font-black text-slate-900 uppercase italic">Maputo</p>
              </div>
              <div className="flex flex-col items-center gap-1 opacity-20">
                <div className="w-12 h-px bg-slate-900" />
                <ArrowRight className="w-4 h-4" />
              </div>
              <div className="text-right">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Destino</p>
                <p className="text-2xl font-black text-slate-900 uppercase italic">Beira</p>
              </div>
            </div>

            {/* DETALHES TÉCNICOS */}
            <div className="grid grid-cols-2 gap-y-8 gap-x-12">
              <TicketInfo label="Data de Partida" value="15 de Fevereiro, 2026" icon={<Calendar className="w-3.5 h-3.5"/>} />
              <TicketInfo label="Assento(s)" value="Poltrona 07, 08" icon={<MapPin className="w-3.5 h-3.5"/>} />
              <TicketInfo label="Passageiro Principal" value="Stélio Baloi" icon={<User className="w-3.5 h-3.5"/>} />
              <TicketInfo label="Terminal de Saída" value="Terminal da Junta" />
            </div>

            {/* ZONA DE VALIDAÇÃO */}
            <div className="pt-10 border-t border-dashed border-slate-200 flex flex-col md:flex-row items-center gap-10">
              <div className="bg-white p-3 rounded-2xl border border-slate-200">
                <QrCode className="w-28 h-28 text-slate-900" />
              </div>
              <div className="space-y-3">
                <h4 className="text-[11px] font-black uppercase text-slate-900 tracking-widest">Instruções de Embarque</h4>
                <ul className="text-[10px] text-slate-500 font-bold space-y-2 uppercase leading-relaxed tracking-tight">
                  <li>• Chegue ao terminal 30 minutos antes.</li>
                  <li>• Apresente este QR Code ao motorista.</li>
                  <li>• Tenha o seu BI/Passaporte disponível.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* BOTÕES DE ACÇÃO */}
        <div className="mt-12 flex flex-col sm:flex-row gap-4">
          <Button className="flex-1 h-14 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-black text-[10px] tracking-widest uppercase gap-2">
            <Printer className="w-4 h-4" /> Imprimir Bilhete
          </Button>
          <Button variant="outline" className="flex-1 h-14 border-slate-200 rounded-2xl font-black text-[10px] tracking-widest uppercase gap-2 hover:bg-slate-100">
            <Share2 className="w-4 h-4" /> Enviar por WhatsApp
          </Button>
        </div>

        <div className="mt-12 text-center">
          <Link href="/" className="text-[11px] font-black text-slate-400 hover:text-blue-600 uppercase tracking-[0.3em] transition-all">
            Voltar para a Página Inicial
          </Link>
        </div>
      </div>
    </main>
  );
}

function TicketInfo({ label, value, icon }: { label: string, value: string, icon?: React.ReactNode }) {
  return (
    <div className="space-y-1">
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
        {icon} {label}
      </p>
      <p className="text-sm font-black text-slate-900 uppercase tracking-tight">{value}</p>
    </div>
  );
}