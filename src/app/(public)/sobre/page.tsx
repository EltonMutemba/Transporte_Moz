"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Target, 
  Eye, 
  ShieldCheck, 
  Users2, 
  Building2, 
  MapPin, 
  ChevronRight 
} from "lucide-react";

/* --- COMPONENTES AUXILIARES (TypeScript Interfaces incluídas) --- */

interface StatBoxProps {
  label: string;
  value: string;
}

function StatBox({ label, value }: StatBoxProps) {
  return (
    <div className="text-center md:text-left">
      <p className="text-5xl font-black text-slate-950 tracking-tighter mb-1 leading-none">{value}</p>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
    </div>
  );
}

interface ValueCardProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

function ValueCard({ icon, title, desc }: ValueCardProps) {
  return (
    <div className="p-10 bg-white border border-slate-100 rounded-[2.5rem] hover:shadow-2xl transition-all duration-500 group">
      <div className="text-blue-600 mb-8 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-2xl font-black text-slate-950 mb-4 uppercase tracking-tighter">{title}</h3>
      <p className="text-slate-500 text-sm leading-relaxed font-medium">{desc}</p>
    </div>
  );
}

interface AboutItemProps {
  title: string;
  desc: string;
}

function AboutItem({ title, desc }: AboutItemProps) {
  return (
    <div className="flex gap-6 items-start">
      <div className="flex-shrink-0 w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center mt-1">
        <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />
      </div>
      <div>
        <h4 className="font-black text-slate-950 mb-1 uppercase text-xs tracking-wider">{title}</h4>
        <p className="text-sm text-slate-500 leading-relaxed font-medium">{desc}</p>
      </div>
    </div>
  );
}

/* --- PÁGINA PRINCIPAL --- */

export default function AboutPage() {
  return (
    <main className="bg-white min-h-screen">
      
      {/* 1. HERO INSTITUCIONAL */}
      <section className="relative pt-24 pb-32 px-6 bg-slate-950 overflow-hidden text-center">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]" />
        
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block bg-blue-600 text-white font-black text-[10px] uppercase tracking-[0.4em] px-4 py-2 rounded-full mb-8">
              Nossa História e Compromisso
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter leading-[0.9]">
              Conectando províncias, <br />
              <span className="italic text-blue-500 font-serif">unindo moçambicanos.</span>
            </h1>
            <p className="text-slate-400 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
              Lideramos a modernização do transporte rodoviário nacional, garantindo que cada viagem seja uma ponte para o desenvolvimento e o reencontro.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. OS NÚMEROS (PROVA SOCIAL) */}
      <section className="py-20 border-b border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-12">
          <StatBox label="Anos de Estrada" value="12+" />
          <StatBox label="Cidades Atendidas" value="45" />
          <StatBox label="Passageiros / Ano" value="1.2M" />
          <StatBox label="Frota Própria" value="85+" />
        </div>
      </section>

      {/* 3. MISSÃO, VISÃO, VALORES */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-8">
          <ValueCard 
            icon={<Target className="w-10 h-10" />}
            title="Nossa Missão"
            desc="Oferecer soluções de transporte e logística seguras, pontuais e acessíveis, impulsionando a economia de Moçambique."
          />
          <ValueCard 
            icon={<Eye className="w-10 h-10" />}
            title="Nossa Visão"
            desc="Ser a transportadora líder e referência em inovação tecnológica no setor rodoviário da África Austral até 2030."
          />
          <ValueCard 
            icon={<ShieldCheck className="w-10 h-10" />}
            title="Nossos Valores"
            desc="Segurança absoluta, transparência total com o cliente, ética profissional e respeito pela vida humana."
          />
        </div>
      </section>

      {/* 4. O DIFERENCIAL (CORREÇÃO VISUAL DAS IMAGENS E ALINHAMENTO) */}
      <section className="py-32 bg-slate-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
          
          <div className="space-y-12">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-950 uppercase leading-[0.85]">
              Porquê somos <br /> a escolha de <br /> <span className="text-blue-600 italic">confiança?</span>
            </h2>
            
            <div className="space-y-8">
              <AboutItem 
                title="Gestão Profissional" 
                desc="Nossa liderança combina décadas de experiência logística com visão tecnológica moderna para otimizar rotas." 
              />
              <AboutItem 
                title="Responsabilidade Social" 
                desc="Apoiamos comunidades locais e promovemos o emprego em todos os nossos terminais provinciais." 
              />
              <AboutItem 
                title="Manutenção Rigorosa" 
                desc="Nossa frota passa por verificações de segurança exaustivas antes de cada viagem de longo curso." 
              />
            </div>
          </div>

          {/* Grid de Imagens com Fallbacks */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-6 pt-12">
                <div className="aspect-[3/4] rounded-[2.5rem] bg-slate-200 overflow-hidden shadow-2xl relative group">
                  <img 
                    src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=600" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    alt="Equipa Transporto" 
                  />
                  <div className="absolute inset-0 bg-blue-600/10 group-hover:bg-transparent transition-colors" />
                </div>
                <div className="bg-blue-600 p-10 rounded-[2.5rem] text-white shadow-xl shadow-blue-200">
                  <Users2 className="w-10 h-10 mb-6 text-blue-200" />
                  <p className="text-4xl font-black tracking-tighter italic">500+</p>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-80">Colaboradores</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-slate-950 p-10 rounded-[2.5rem] text-white shadow-2xl">
                  <Building2 className="w-10 h-10 mb-6 text-blue-500" />
                  <p className="text-4xl font-black tracking-tighter italic">11</p>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-60">Sedes Nacionais</p>
                </div>
                <div className="aspect-[3/4] rounded-[2.5rem] bg-slate-200 overflow-hidden shadow-2xl relative group">
                  <img 
                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=600" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    alt="Escritório Central" 
                  />
                  <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors" />
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

    </main>
  );
}