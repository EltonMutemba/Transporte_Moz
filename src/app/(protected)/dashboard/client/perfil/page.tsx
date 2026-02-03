"use client";

import React, { useState } from "react";
import { 
  User, Mail, Phone, MapPin, ShieldCheck, 
  CreditCard, Bell, Save, AlertCircle, Camera
} from "lucide-react";

export default function ClientProfilePage() {
  return (
    <div className="max-w-5xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* HEADER DO PERFIL - TEMA DARK UNIFICADO */}
      <header className="flex flex-col md:flex-row items-center gap-8 bg-[#0a0f1a] p-10 rounded-[3rem] border border-white/5 shadow-2xl relative overflow-hidden">
        {/* Efeito de brilho de fundo */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-red-600/10 blur-[100px] rounded-full" />
        
        <div className="relative group">
          <div className="w-32 h-32 bg-slate-900 border-2 border-red-600/30 rounded-[2.5rem] flex items-center justify-center text-red-600 text-4xl font-black italic shadow-2xl transition-transform group-hover:scale-105 duration-500">
            SM
          </div>
          <button className="absolute -bottom-2 -right-2 bg-red-600 p-2.5 rounded-xl text-white shadow-lg hover:bg-red-700 transition-colors">
            <Camera size={16} />
          </button>
        </div>

        <div className="text-center md:text-left z-10">
          <h1 className="text-4xl font-black text-white italic uppercase tracking-tighter">Stélio Mutemba</h1>
          <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-3">
            <span className="text-[9px] font-black px-4 py-1.5 bg-red-600 text-white rounded-full uppercase tracking-widest shadow-lg shadow-red-900/20">
              Cliente Platinum
            </span>
            <span className="text-[9px] font-black px-4 py-1.5 bg-white/5 text-slate-400 rounded-full uppercase tracking-widest flex items-center gap-2 border border-white/5">
              <ShieldCheck size={12} className="text-red-500" /> Conta Verificada
            </span>
          </div>
        </div>
      </header>

      <div className="grid md:grid-cols-4 gap-8">
        {/* NAVEGAÇÃO LATERAL - TEMA DARK */}
        <aside className="md:col-span-1 space-y-2">
          <ProfileTab icon={<User size={18} />} label="Dados Pessoais" active />
          <ProfileTab icon={<CreditCard size={18} />} label="Pagamentos" />
          <ProfileTab icon={<Bell size={18} />} label="Notificações" />
        </aside>

        {/* FORMULÁRIO - TEMA DARK */}
        <div className="md:col-span-3 bg-[#0a0f1a] p-10 rounded-[3rem] border border-white/5 shadow-2xl space-y-10">
          
          <section className="space-y-6">
            <div className="flex items-center gap-3 border-b border-white/5 pb-4">
              <div className="w-1 h-4 bg-red-600 rounded-full" />
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-white">
                Informação de Identidade
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <InputField label="Nome Completo" icon={<User />} defaultValue="Stélio Mutemba" />
              <InputField label="Número do BI" icon={<ShieldCheck />} defaultValue="110200345678B" />
            </div>
          </section>

          <section className="space-y-6">
            <div className="flex items-center gap-3 border-b border-white/5 pb-4">
              <div className="w-1 h-4 bg-red-600 rounded-full" />
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-white">
                Contactos e Segurança
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <InputField label="E-mail Pessoal" icon={<Mail />} defaultValue="stelio@transporte.mz" />
              <InputField label="Telemóvel" icon={<Phone />} defaultValue="+258 84 000 0000" />
              <InputField label="Contacto de Emergência" icon={<AlertCircle className="text-red-500" />} defaultValue="+258 82 111 1111" />
              <InputField label="Cidade de Residência" icon={<MapPin />} defaultValue="Matola" />
            </div>
          </section>

          <div className="pt-6 border-t border-white/5 flex justify-end">
            <button className="group flex items-center justify-center gap-3 bg-red-600 text-white px-12 py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-red-700 transition-all shadow-xl shadow-red-900/20">
              <Save size={18} className="group-hover:scale-110 transition-transform" /> 
              Atualizar Credenciais
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Sub-componentes ajustados para o tema Dark
function ProfileTab({ icon, label, active = false }: any) {
  return (
    <button className={`w-full flex items-center gap-4 px-6 py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
      active 
        ? "bg-red-600 text-white shadow-xl shadow-red-900/30" 
        : "bg-[#0a0f1a] text-slate-500 hover:bg-white/5 border border-white/5"
    }`}>
      {icon} {label}
    </button>
  );
}

function InputField({ label, icon, defaultValue }: any) {
  return (
    <div className="space-y-3">
      <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">{label}</label>
      <div className="relative group">
        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-red-500 transition-colors">
          {React.isValidElement(icon) ? React.cloneElement(icon as React.ReactElement, { size: 18 }) : icon}
        </div>
        <input 
          type="text" 
          defaultValue={defaultValue}
          className="w-full bg-black/40 border border-white/5 rounded-2xl py-5 pl-14 pr-6 text-xs font-bold text-white focus:ring-2 focus:ring-red-600/50 focus:bg-black/60 outline-none transition-all placeholder:text-slate-800"
        />
      </div>
    </div>
  );
}