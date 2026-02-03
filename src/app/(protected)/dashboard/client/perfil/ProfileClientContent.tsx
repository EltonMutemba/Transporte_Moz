"use client";

import React, { useTransition } from "react";
import { User, Mail, Phone, Save, Loader2, ShieldCheck, CreditCard, MapPin } from "lucide-react";
import { UserProfile } from "@/types/user";
import { updateProfile } from "@/application/actions/updateProfile";

interface ProfileClientProps {
  user: UserProfile;
}

export default function ProfileClientContent({ user }: ProfileClientProps) {
  const [isPending, startTransition] = useTransition();

  if (!user) return null;
  const formattedId = String(user.id || "").padStart(4, '0');

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-700">
      
      {/* HEADER CLIENTE - TEXTOS AJUSTADOS */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-2 border-slate-900 pb-6">
        <div>
          <h1 className="text-5xl font-black tracking-tighter uppercase italic text-slate-900">
            Meu <span className="text-red-600">Perfil</span>
          </h1>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">
            Gestão de Passageiro • ID #{formattedId}
          </p>
        </div>
        
        <div className="flex items-center gap-3 bg-slate-100 px-4 py-2 border-l-4 border-red-600">
          <ShieldCheck className="text-red-600" size={18} />
          <span className="text-[10px] font-black uppercase text-slate-700 tracking-tighter">
            Conta Verificada
          </span>
        </div>
      </div>

      <form 
        action={(fd) => startTransition(() => updateProfile(fd))}
        className="grid grid-cols-1 lg:grid-cols-12 gap-6"
      >
        <input type="hidden" name="id" value={user.id} />

        {/* COLUNA PRINCIPAL */}
        <div className="lg:col-span-8 bg-white border-2 border-slate-900 p-8 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            <ProfileInput label="Nome Completo" name="name" icon={<User />} defaultValue={user.name} />
            <ProfileInput label="E-mail de Notificações" name="email" icon={<Mail />} defaultValue={user.email} readOnly />
            <ProfileInput label="Telemóvel (Para Bilhetes)" name="phone" icon={<Phone />} defaultValue={user.phone} />
            
            <div className="space-y-2 opacity-50">
              <label className="text-[10px] font-black uppercase text-slate-400">Tipo de Viajante</label>
              <div className="flex items-center gap-3 py-3 border-b border-slate-200 text-slate-900 font-bold text-sm">
                <CreditCard size={16} /> {user.role === 'CLIENT' ? 'PASSAGEIRO' : user.role}
              </div>
            </div>
          </div>

          <div className="mt-12 flex items-center justify-between bg-slate-50 p-6 border-t-2 border-slate-900">
            <p className="text-[9px] font-medium text-slate-500 max-w-[250px] uppercase leading-relaxed italic">
              * Utilize dados reais para garantir a validade dos seus bilhetes em fiscalizações.
            </p>
            <button 
              disabled={isPending}
              className="flex items-center gap-3 bg-red-600 text-white px-8 py-4 font-black uppercase text-xs tracking-widest hover:bg-slate-900 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] active:translate-y-1 active:shadow-none disabled:opacity-50"
            >
              {isPending ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
              {isPending ? "A Guardar..." : "Atualizar Cadastro"}
            </button>
          </div>
        </div>

        {/* COLUNA LATERAL - CONTEXTO CLIENTE */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-slate-900 p-6 text-white italic shadow-[8px_8px_0px_0px_rgba(220,38,38,1)]">
            <h3 className="text-lg font-black uppercase leading-tight italic">Privacidade</h3>
            <p className="text-[10px] text-slate-400 mt-2 not-italic leading-relaxed">
              Os seus dados de contacto são partilhados apenas com a transportadora durante a viagem.
            </p>
          </div>

          <div className="border-2 border-slate-200 p-6">
             <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-900 mb-4 flex items-center gap-2">
               <MapPin size={12} className="text-red-600" /> Histórico de Acesso
             </h4>
             <div className="space-y-3">
                <div className="flex gap-3 items-start border-l-2 border-red-600 pl-3">
                  <p className="text-[9px] font-bold text-slate-600 uppercase tracking-tighter">Sessão em Maputo • Ativa</p>
                </div>
                <div className="flex gap-3 items-start border-l-2 border-slate-100 pl-3 opacity-40">
                  <p className="text-[9px] font-bold text-slate-600 uppercase tracking-tighter">Última Viagem: há 2 dias</p>
                </div>
             </div>
          </div>
        </div>
      </form>
    </div>
  );
}

function ProfileInput({ label, name, icon, defaultValue, readOnly }: any) {
  return (
    <div className="space-y-1.5 group">
      <label className="text-[10px] font-black uppercase text-slate-400 tracking-tighter group-focus-within:text-red-600 transition-colors">
        {label}
      </label>
      <div className="relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 text-slate-900 group-focus-within:text-red-600 transition-colors">
          {React.cloneElement(icon, { size: 18, strokeWidth: 3 })}
        </div>
        <input 
          name={name}
          defaultValue={defaultValue || ""}
          readOnly={readOnly}
          className={`w-full bg-transparent border-b-2 border-slate-200 py-3 pl-8 text-sm font-black text-slate-900 outline-none transition-all ${
            readOnly ? "cursor-not-allowed border-dashed opacity-40" : "focus:border-red-600"
          }`}
        />
      </div>
    </div>
  );
}