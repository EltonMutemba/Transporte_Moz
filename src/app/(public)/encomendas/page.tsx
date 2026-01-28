"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Box, Truck, ShieldCheck, MapPin, Search, MessageCircle } from "lucide-react";

export default function EncomendasPage() {
  const [trackingId, setTrackingId] = useState("");

  return (
    <div className="bg-white min-h-screen">
      {/* HERO ENCOMENDAS */}
      <section className="bg-slate-950 py-20 px-6 text-white text-center">
        <h1 className="text-4xl md:text-5xl font-black mb-6 italic">Logística TransPorto<span className="text-blue-500">Moz</span></h1>
        <p className="text-slate-400 max-w-2xl mx-auto mb-10">
          Enviamos os seus bens para qualquer província com segurança monitorada e prazos de entrega recorde.
        </p>
        
        {/* BARRA DE RASTREIO REAL */}
        <div className="max-w-xl mx-auto bg-white/10 p-2 rounded-2xl border border-white/20 flex gap-2">
          <input 
            type="text" 
            placeholder="Introduza o Código da Guia (Ex: TP-2026-XXXX)"
            className="bg-transparent border-none flex-grow px-4 text-sm focus:outline-none"
            value={trackingId}
            onChange={(e) => setTrackingId(e.target.value)}
          />
          <Button className="bg-blue-600 hover:bg-blue-700 px-6 rounded-xl font-bold">
            <Search className="w-4 h-4 mr-2" /> Rastrear
          </Button>
        </div>
      </section>

      {/* PROCESSO DE ENVIO */}
      <section className="py-20 px-6 max-w-7xl mx-auto grid md:grid-cols-3 gap-12">
        <StepCard 
          icon={<MapPin className="text-blue-600" />} 
          title="1. Entrega no Terminal" 
          desc="Entregue a sua encomenda num dos nossos balcões autorizados até 1h antes da partida." 
        />
        <StepCard 
          icon={<ShieldCheck className="text-blue-600" />} 
          title="2. Selagem e Seguro" 
          desc="A sua carga é selada com QR Code e segurada contra danos ou extravios." 
        />
        <StepCard 
          icon={<Truck className="text-blue-600" />} 
          title="3. Levantamento Rápido" 
          desc="O destinatário recebe um SMS assim que o autocarro entra no terminal de destino." 
        />
      </section>

      {/* CALL TO ACTION PARA WHATSAPP */}
      <section className="bg-blue-600 py-16 px-6 mx-4 md:mx-10 rounded-[3rem] text-white flex flex-col items-center text-center">
        <h2 className="text-3xl font-black mb-4">Precisa de um envio volumoso ou comercial?</h2>
        <p className="mb-8 font-medium">Temos condições especiais para empresas e transporte de grandes volumes.</p>
        <Button size="lg" className="bg-slate-950 hover:bg-slate-900 text-white h-16 px-10 rounded-2xl font-black">
          <MessageCircle className="mr-2 w-6 h-6 fill-blue-600" /> FALAR COM GESTOR DE CARGA
        </Button>
      </section>
    </div>
  );
}

function StepCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="p-8 border border-slate-100 rounded-3xl hover:shadow-xl transition-all">
      <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6">{icon}</div>
      <h3 className="font-black text-xl mb-4 italic tracking-tight uppercase">{title}</h3>
      <p className="text-slate-500 leading-relaxed text-sm font-medium">{desc}</p>
    </div>
  );
}