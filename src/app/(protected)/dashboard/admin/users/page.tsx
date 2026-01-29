"use client";

import React from "react";
import { Users, UserPlus, Search, MoreVertical, Shield, Building } from "lucide-react";

const USERS_DATA = [
  { id: "1", name: "Stélio Mutemba", email: "stelio@moz.com", role: "Admin", status: "Ativo" },
  { id: "2", name: "João Oliveira", email: "joao@nagi.com", role: "Owner", company: "Nagi Investments" },
  { id: "3", name: "Maria Silva", email: "maria@maningue.com", role: "Staff", company: "Maningue Nice" },
];

export default function UsersAdminPage() {
  return (
    <div className="space-y-8">
      {/* HEADER E AÇÕES RÁPIDAS */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white italic uppercase tracking-tighter">
            Gestão de Utilizadores
          </h1>
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.3em] mt-1">
            Controlo de acessos e permissões globais
          </p>
        </div>
        <button className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">
          <UserPlus size={18} /> Novo Utilizador
        </button>
      </div>

      {/* BARRA DE PESQUISA */}
      <div className="relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
        <input 
          type="text" 
          placeholder="PESQUISAR POR NOME, EMAIL OU CARGO..." 
          className="w-full bg-slate-900 border border-white/5 rounded-2xl py-4 pl-12 pr-6 text-[10px] font-black uppercase text-white focus:ring-2 focus:ring-red-600/50 outline-none transition-all" 
        />
      </div>

      {/* LISTA DE UTILIZADORES */}
      <div className="grid gap-4">
        {USERS_DATA.map((user) => (
          <div key={user.id} className="bg-slate-900/50 border border-white/5 p-6 rounded-[2rem] flex items-center justify-between group hover:border-red-500/30 transition-all">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-slate-800 rounded-2xl flex items-center justify-center text-red-500 group-hover:scale-110 transition-transform">
                <Users size={20} />
              </div>
              <div>
                <h3 className="font-black text-white uppercase italic">{user.name}</h3>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-[9px] font-bold text-slate-500 uppercase">{user.email}</span>
                  <span className="w-1 h-1 bg-slate-700 rounded-full" />
                  <span className="text-[9px] font-black text-red-400 uppercase tracking-tighter flex items-center gap-1">
                    <Shield size={10} /> {user.role}
                  </span>
                  {user.company && (
                    <>
                      <span className="w-1 h-1 bg-slate-700 rounded-full" />
                      <span className="text-[9px] font-bold text-slate-400 uppercase flex items-center gap-1">
                        <Building size={10} /> {user.company}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
            <button className="text-slate-600 hover:text-white transition-colors">
              <MoreVertical size={20} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}