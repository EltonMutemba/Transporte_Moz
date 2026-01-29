"use client";

import React from "react";
import { 
  ShieldCheck, 
  Building2, 
  Users, 
  AlertTriangle, 
  CheckCircle2,
  TrendingUp 
} from "lucide-react";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-4xl font-black text-slate-900 italic uppercase tracking-tighter">
          Controlo do Sistema
        </h1>
        <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.3em] mt-2">
          Monitorização Global de Transportadoras e Utilizadores
        </p>
      </header>

      {/* MÉTRICAS GLOBAIS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <AdminStat icon={<Building2 />} label="Empresas" value="24" color="text-blue-600" />
        <AdminStat icon={<Users />} label="Utilizadores" value="1.2k" color="text-indigo-600" />
        <AdminStat icon={<CheckCircle2 />} label="Viagens Hoje" value="156" color="text-green-600" />
        <AdminStat icon={<AlertTriangle />} label="Incidências" value="3" color="text-red-500" />
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* LISTA DE TRANSPORTADORAS RECENTES */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <h3 className="text-sm font-black uppercase tracking-widest mb-6">Transportadoras Recentes</h3>
          <div className="space-y-4">
            {["Nagi Investments", "Maningue Nice", "Virgem da Nazaré"].map((empresa) => (
              <div key={empresa} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                <span className="text-[10px] font-black uppercase">{empresa}</span>
                <span className="text-[9px] font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full uppercase">Ativa</span>
              </div>
            ))}
          </div>
        </div>

        {/* LOGS DE ATIVIDADE */}
        <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white">
          <h3 className="text-sm font-black uppercase tracking-widest mb-6 text-slate-400">Atividade do Servidor</h3>
          <div className="space-y-4 font-mono text-[10px]">
            <p className="text-green-400 font-bold tracking-tighter">[11:05] Nova transportadora registada: "Transporte Sul"</p>
            <p className="text-slate-500 tracking-tighter">[11:02] Backup automático concluído com sucesso.</p>
            <p className="text-amber-400 font-bold tracking-tighter">[10:45] Tentativa de login suspeita bloqueada (IP: 192.168.1.1)</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function AdminStat({ icon, label, value, color }: any) {
  return (
    <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col gap-4">
      <div className={`w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center ${color}`}>
        {icon}
      </div>
      <div>
        <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] leading-none">{label}</p>
        <p className="text-2xl font-black text-slate-900 mt-1 uppercase italic tracking-tighter">{value}</p>
      </div>
    </div>
  );
}