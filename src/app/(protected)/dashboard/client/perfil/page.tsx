"use client";

import React from "react";
import { 
  User, Mail, Phone, MapPin, ShieldCheck, 
  CreditCard, Bell, Save, AlertCircle 
} from "lucide-react";

export default function ClientProfilePage() {
  return (
    <div className="max-w-4xl mx-auto space-y-10">
      {/* HEADER DO PERFIL */}
      <header className="flex flex-col md:flex-row items-center gap-8 bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
        <div className="w-32 h-32 bg-blue-600 rounded-[2.5rem] flex items-center justify-center text-white text-4xl font-black italic shadow-2xl shadow-blue-200">
          SM
        </div>
        <div className="text-center md:text-left">
          <h1 className="text-4xl font-black text-slate-900 italic uppercase tracking-tighter">Stélio Mutemba</h1>
          <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-3">
            <span className="text-[9px] font-black px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full uppercase tracking-widest">Cliente Platinum</span>
            <span className="text-[9px] font-black px-4 py-1.5 bg-slate-100 text-slate-500 rounded-full uppercase tracking-widest flex items-center gap-2">
              <ShieldCheck size={12} /> Conta Verificada
            </span>
          </div>
        </div>
      </header>

      <div className="grid md:grid-cols-3 gap-8">
        {/* NAVEGAÇÃO LATERAL DO PERFIL */}
        <aside className="space-y-2">
          <ProfileTab icon={<User size={18} />} label="Dados Pessoais" active />
          <ProfileTab icon={<CreditCard size={18} />} label="Pagamentos" />
          <ProfileTab icon={<Bell size={18} />} label="Notificações" />
        </aside>

        {/* FORMULÁRIO DE EDIÇÃO */}
        <div className="md:col-span-2 bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm space-y-8">
          
          <div className="space-y-6">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600 border-b border-blue-50 pb-2">
              Informação de Identidade
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField label="Nome Completo" icon={<User />} defaultValue="Stélio Mutemba" />
              <InputField label="Número do BI" icon={<ShieldCheck />} defaultValue="110200345678B" />
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-red-500 border-b border-red-50 pb-2">
              Contactos e Segurança
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField label="E-mail Pessoal" icon={<Mail />} defaultValue="stelio@transporte.mz" />
              <InputField label="Telemóvel" icon={<Phone />} defaultValue="+258 84 000 0000" />
              <InputField label="Contacto de Emergência" icon={<AlertCircle className="text-red-500" />} defaultValue="+258 82 111 1111" />
              <InputField label="Cidade de Residência" icon={<MapPin />} defaultValue="Matola" />
            </div>
          </div>

          <div className="pt-6 border-t border-slate-50">
            <button className="w-full md:w-auto flex items-center justify-center gap-3 bg-slate-950 text-white px-10 py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-blue-600 transition-all shadow-lg">
              <Save size={18} /> Atualizar Perfil de Segurança
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfileTab({ icon, label, active = false }: any) {
  return (
    <button className={`w-full flex items-center gap-4 px-6 py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
      active ? "bg-blue-600 text-white shadow-xl shadow-blue-100" : "bg-white text-slate-400 hover:bg-slate-50 border border-slate-50"
    }`}>
      {icon} {label}
    </button>
  );
}

function InputField({ label, icon, defaultValue }: any) {
  return (
    <div className="space-y-2">
      <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">{label}</label>
      <div className="relative group">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors italic">
          {React.isValidElement(icon) ? React.cloneElement(icon as React.ReactElement, { size: 16 }) : icon}
        </div>
        <input 
          type="text" 
          defaultValue={defaultValue}
          className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-12 pr-6 text-[11px] font-bold text-slate-700 focus:ring-2 focus:ring-blue-600 outline-none transition-all"
        />
      </div>
    </div>
  );
}