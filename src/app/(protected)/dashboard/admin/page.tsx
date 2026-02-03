"use client";

import React, { useState } from "react";
import { Search, Shield, Smartphone, Crown, Users2 } from "lucide-react";
import { AddUserButton } from "@/components/dashboard/AddUserButton";
import { UserActions } from "@/components/dashboard/UserActions";

export default function UsersAdminPage({ initialUsers = [] }: { initialUsers: any[] }) {
  const [activeTab, setActiveTab] = useState<'staff' | 'clientes'>('staff');
  const [search, setSearch] = useState("");

  const roleStyles: any = {
    OWNER: "bg-blue-50 text-blue-700 border-blue-100",
    ADMIN: "bg-red-50 text-red-700 border-red-100",
    STAFF: "bg-emerald-50 text-emerald-700 border-emerald-100",
    CLIENT: "bg-slate-100 text-slate-700 border-slate-200",
  };

  // FILTRAGEM COM PRIORIDADE EXECUTIVA [cite: 2026-01-28]
  const filteredUsers = initialUsers
    .filter((user) => {
      const matchesSearch = 
        user.name?.toLowerCase().includes(search.toLowerCase()) || 
        user.email?.toLowerCase().includes(search.toLowerCase()) ||
        user.phone?.includes(search);
      
      if (activeTab === 'staff') {
        return matchesSearch && ['OWNER', 'ADMIN', 'STAFF'].includes(user.role);
      }
      return matchesSearch && ['CLIENT', 'USER', 'PASSAGEIRO'].includes(user.role);
    })
    .sort((a, b) => (a.role === 'OWNER' ? -1 : 1));

  return (
    // pb-32 garante que o dropdown do último utilizador não seja cortado pelo fim da página [cite: 2026-01-28]
    <div className="space-y-8 animate-in fade-in duration-500 pb-32">
      
      {/* 1. HEADER E AÇÃO PRINCIPAL */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-slate-950 uppercase">
            Gestão de <span className="text-blue-600">Identidades</span>
          </h1>
          <p className="text-slate-500 font-semibold text-sm mt-1">
            Administração de privilégios e base de dados operacional.
          </p>
        </div>
        <AddUserButton />
      </div>

      {/* 2. BARRA DE FERRAMENTAS: BUSCA E FILTRO DE TIPO [cite: 2026-01-28] */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex p-1.5 bg-slate-100 rounded-[1.5rem] border border-slate-200 w-fit">
          <button 
            onClick={() => setActiveTab('staff')}
            className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'staff' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Equipa & Direção
          </button>
          <button 
            onClick={() => setActiveTab('clientes')}
            className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'clientes' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Passageiros
          </button>
        </div>

        <div className="relative flex-1 group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-blue-600 transition-colors" />
          <input 
            type="text" 
            placeholder="PESQUISAR POR NOME, EMAIL OU TELEFONE..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-[1.5rem] py-5 pl-16 pr-8 text-sm font-semibold text-slate-900 outline-none focus:ring-4 focus:ring-blue-600/5 transition-all" 
          />
        </div>
      </div>

      {/* 3. TABELA DE DADOS - REMOVIDO OVERFLOW HIDDEN PARA NÃO CORTAR DROPDOWNS */}
      <div className="bg-white border border-slate-200 rounded-[2.5rem] shadow-sm">
        <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/30 rounded-t-[2.5rem]">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white rounded-lg shadow-sm">
              <Users2 size={20} className="text-blue-600" />
            </div>
            <h3 className="font-bold text-slate-800 uppercase text-sm tracking-widest">
              {activeTab === 'staff' ? 'Corpo Operacional' : 'Lista de Clientes'}
            </h3>
          </div>
          <span className="text-xs font-bold text-slate-400 uppercase">Total: {filteredUsers.length}</span>
        </div>

        <div className="p-6">
          <table className="w-full text-left border-separate border-spacing-y-4">
            <thead>
              <tr className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.15em]">
                <th className="px-6 pb-2">Identidade</th>
                <th className="px-6 pb-2">Nível de Acesso</th>
                <th className="px-6 pb-2">Contacto</th>
                <th className="px-6 pb-2 text-right">Gestão</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="group transition-all">
                  <td className="px-6 py-5 bg-slate-50/50 group-hover:bg-blue-50/30 border-y border-l border-transparent group-hover:border-blue-100 rounded-l-[2rem] transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 text-slate-950 flex items-center justify-center font-black text-sm relative">
                        {user.name?.[0] || "U"}
                        {user.role === 'OWNER' && <Crown size={12} className="absolute -top-1 -right-1 text-amber-500 fill-amber-500" />}
                      </div>
                      <div>
                        <p className="font-bold text-slate-950 text-base leading-tight">{user.name || user.username}</p>
                        <p className="text-xs text-slate-500 lowercase mt-0.5">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 bg-slate-50/50 group-hover:bg-blue-50/30 border-y border-transparent group-hover:border-blue-100 transition-colors">
                    <span className={`text-[10px] font-bold px-4 py-1.5 rounded-full border uppercase tracking-wider flex items-center w-fit gap-2 ${roleStyles[user.role]}`}>
                      <Shield size={12} /> {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-5 bg-slate-50/50 group-hover:bg-blue-50/30 border-y border-transparent group-hover:border-blue-100 transition-colors">
                    <span className="text-sm font-bold text-slate-800 flex items-center gap-2">
                      <Smartphone size={14} className="text-blue-500" /> {user.phone || "---"}
                    </span>
                  </td>
                  <td className="px-6 py-5 bg-slate-50/50 group-hover:bg-blue-50/30 border-y border-r border-transparent group-hover:border-blue-100 rounded-r-[2rem] text-right">
                    <UserActions user={user} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}