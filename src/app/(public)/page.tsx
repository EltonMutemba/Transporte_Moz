"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { 
  ArrowRight, Ticket, ShieldCheck, 
  Box, Zap, Clock, CreditCard, CheckCircle2,
  ChevronRight, MessageSquare
} from "lucide-react";

export default function HomePage() {
  const WHATSAPP_NUMBER = "258840000000"; 

  return (
    <main className="bg-white text-slate-900 selection:bg-blue-600 selection:text-white scroll-smooth">

      {/* 1. HERO - IMAGEM PRIMEIRO NO MOBILE */}
      <section className="relative pt-10 md:pt-20 pb-24 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* IMAGEM (Aparece no topo no Mobile) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative h-[320px] md:h-[500px] rounded-[2.5rem] md:rounded-[3rem] overflow-hidden shadow-2xl border-4 md:border-8 border-white lg:order-last"
          >
            <img 
              src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2069&auto=format&fit=crop" 
              className="w-full h-full object-cover"
              alt="Autocarro moderno em Moçambique"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/20 text-white">
              <p className="font-black uppercase text-[9px] tracking-[0.2em] mb-1 opacity-80">Próxima Partida</p>
              <p className="font-bold text-base md:text-lg">Maputo <span className="text-blue-400">→</span> Beira (05:00 AM)</p>
            </div>
          </motion.div>

          {/* TEXTO (Aparece abaixo da imagem no Mobile) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider mb-6">
              <Zap className="w-3 h-3 fill-current" /> Reservas Online Disponíveis
            </div>

            <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6 text-slate-950 tracking-tight">
              Sua rota de confiança em <span className="text-blue-600">Moçambique.</span>
            </h1>

            <p className="text-base md:text-lg text-slate-600 mb-10 leading-relaxed max-w-xl font-medium">
              Ligamos as principais províncias com uma frota moderna, segurança rigorosa e um serviço de encomendas que não falha.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/search" className="w-full sm:w-auto">
                <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-700 text-white h-14 px-8 rounded-xl font-bold shadow-lg shadow-blue-200 transition-all active:scale-95">
                  Comprar Bilhete <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="#rotas-destaque" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full h-14 px-8 rounded-xl border-slate-200 font-bold hover:bg-slate-50 transition-all text-slate-600">
                  Ver Horários
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. DIFERENCIAIS */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black mb-4 uppercase tracking-tighter italic">Por que viajar connosco?</h2>
          <div className="h-1.5 w-20 bg-blue-600 mx-auto rounded-full mb-4" />
          <p className="text-slate-500 max-w-2xl mx-auto font-medium text-sm md:text-base">Elevamos o padrão do transporte rodoviário nacional com foco na tua experiência.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          <InfoCard icon={<Clock className="w-6 h-6" />} title="Pontualidade" desc="Saídas rigorosas nos horários estabelecidos em todos os terminais." />
          <InfoCard icon={<ShieldCheck className="w-6 h-6" />} title="Segurança" desc="Monitoramento GPS 24/7 e dois motoristas experientes por viagem." />
          <InfoCard icon={<CreditCard className="w-6 h-6" />} title="Pagamento Fácil" desc="Pague via M-Pesa, e-Mola ou Cartão de forma 100% digital." />
          <InfoCard icon={<Ticket className="w-6 h-6" />} title="Bilhete Digital" desc="Receba o código no WhatsApp e SMS. Sem papel, sem filas." />
        </div>
      </section>

      {/* 3. LOGÍSTICA */}
      <section className="py-16 md:py-24 px-4 md:px-6 bg-slate-950 rounded-[3rem] md:rounded-[4rem] mx-2 md:mx-10 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 blur-[100px] rounded-full -mr-48 -mt-48" />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-black leading-[1.1] tracking-tighter">
                Envio de <span className="text-blue-500 italic">Encomendas</span> 
                <br/>Sem Complicação.
              </h2>
              <p className="text-slate-400 text-base md:text-lg leading-relaxed">
                Transportamos desde documentos críticos até mercadoria comercial. Entrega garantida no terminal de destino em até 24h.
              </p>
              
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                <FeatureItem text="Rastreio WhatsApp" />
                <FeatureItem text="Seguro de Carga" />
                <FeatureItem text="Saídas Diárias" />
                <FeatureItem text="Tarifas Fixas" />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/encomendas" className="w-full sm:w-auto">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-2xl px-10 h-16 font-black uppercase tracking-widest transition-all">
                    Saber Mais
                  </Button>
                </Link>
                <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=Olá! Gostaria de enviar uma encomenda.`} target="_blank" className="w-full sm:w-auto">
                  <Button variant="outline" className="w-full border-white/20 hover:bg-white/5 text-white rounded-2xl px-10 h-16 font-black uppercase tracking-widest transition-all">
                    <MessageSquare className="mr-2 w-5 h-5" /> WhatsApp
                  </Button>
                </a>
              </div>
            </div>

            <div className="bg-white/5 p-8 md:p-10 rounded-[2.5rem] border border-white/10 backdrop-blur-xl shadow-2xl">
              <div className="flex items-center gap-4 mb-8 md:mb-10">
                <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/40">
                  <Box className="text-white w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-black uppercase text-sm tracking-wider">Simulador de Frete</h4>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Preços Médios</p>
                </div>
              </div>
              <div className="space-y-4 md:space-y-5">
                <CalcRow label="Origem" value="Maputo" />
                <CalcRow label="Destino" value="Nampula" />
                <CalcRow label="Peso" value="Até 10kg" />
                <div className="pt-6 border-t border-white/10 mt-6 flex justify-between items-center">
                    <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Estimativa</span>
                    <span className="text-2xl md:text-3xl font-black text-blue-500 italic underline decoration-2 underline-offset-8">850 MT</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. ROTAS */}
      <section id="rotas-destaque" className="py-24 px-6 max-w-7xl mx-auto scroll-mt-24">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div className="space-y-2">
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter italic">Rotas em Destaque</h2>
            <p className="text-slate-500 font-medium">As conexões mais rápidas para o seu destino.</p>
          </div>
          <Link href="/search" className="w-full md:w-auto bg-slate-100 text-slate-900 px-6 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all text-center">
            Ver Todos Horários
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <RouteCard from="Maputo" to="Beira" price="3.500" time="05:00" />
          <RouteCard from="Maputo" to="Nampula" price="5.500" time="04:30" />
          <RouteCard from="Beira" to="Quelimane" price="1.800" time="06:00" />
          <RouteCard from="Nampula" to="Pemba" price="1.200" time="07:00" />
          <RouteCard from="Maputo" to="Tete" price="4.200" time="05:00" />
          <RouteCard from="Chimoio" to="Beira" price="600" time="08:00" />
        </div>
      </section>

    </main>
  );
}

/* --- COMPONENTES AUXILIARES --- */

function InfoCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="p-8 rounded-[2.5rem] bg-white border border-slate-100 shadow-xl shadow-slate-200/40 hover:-translate-y-2 transition-all duration-300 group">
      <div className="bg-blue-50 w-14 h-14 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all">
        {icon}
      </div>
      <h3 className="font-black text-xl mb-3 tracking-tight uppercase text-slate-900 italic">{title}</h3>
      <p className="text-slate-500 text-sm leading-relaxed font-medium">{desc}</p>
    </div>
  );
}

function FeatureItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 bg-white/5 p-4 rounded-2xl border border-white/5 group hover:border-blue-500 transition-colors">
      <CheckCircle2 className="text-blue-500 w-4 h-4 md:w-5 md:h-5 shrink-0" />
      <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.1em]">{text}</span>
    </div>
  );
}

function CalcRow({ label, value }: { label: string, value: string }) {
  return (
    <div className="flex justify-between items-center bg-white/5 px-5 py-4 rounded-xl border border-white/5 group hover:border-blue-500/50 transition-colors">
      <span className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em]">{label}</span>
      <span className="text-sm font-bold text-white tracking-tight">{value}</span>
    </div>
  );
}

function RouteCard({ from, to, price, time }: { from: string, to: string, price: string, time: string }) {
  return (
    <Link 
      href={`/search?from=${from.toLowerCase()}&to=${to.toLowerCase()}`}
      className="group bg-white p-7 rounded-[2.5rem] border border-slate-100 shadow-lg shadow-slate-200/30 hover:shadow-blue-200/50 hover:border-blue-200 transition-all flex flex-col justify-between"
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-[9px] font-black uppercase tracking-widest">Lugar Disponível</div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic">{time} AM</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-black text-xl text-slate-900 tracking-tighter">{from}</span>
          <ChevronRight className="w-5 h-5 text-blue-600 group-hover:translate-x-1 transition-transform" />
          <span className="font-black text-xl text-slate-900 tracking-tighter">{to}</span>
        </div>
      </div>
      <div className="mt-8 pt-6 border-t border-slate-50 flex justify-between items-center">
        <div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Preço Bilhete</p>
          <p className="text-blue-600 font-black text-2xl tracking-tighter">{price} <span className="text-xs uppercase font-bold">MT</span></p>
        </div>
        <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white group-hover:bg-blue-600 transition-all group-hover:rotate-[-10deg]">
          <ArrowRight className="w-6 h-6" />
        </div>
      </div>
    </Link>
  );
}