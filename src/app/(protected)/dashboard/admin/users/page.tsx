import React from "react";
import { Users, UserPlus, Search, MoreVertical, Shield, Building } from "lucide-react";
import { prisma } from "@/lib/prisma"; // Conexão real

export default async function UsersAdminPage() {
  // 1. BUSCA REAL NO BANCO DE DADOS
  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="space-y-8 bg-[#0a0f1a] min-h-screen p-2"> 
      {/* HEADER E AÇÕES RÁPIDAS */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-white italic uppercase tracking-tighter">
            Gestão de Utilizadores
          </h1>
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.3em] mt-1">
            Controlo de acessos e permissões globais • TPMOZ 2026
          </p>
        </div>
        <button className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg shadow-red-900/20">
          <UserPlus size={18} /> Novo Utilizador
        </button>
      </div>

      {/* BARRA DE PESQUISA (Visual por enquanto) */}
      <div className="relative group">
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
        <input 
          type="text" 
          placeholder="PESQUISAR POR NOME, EMAIL OU CARGO..." 
          className="w-full bg-slate-900/50 border border-white/5 rounded-2xl py-5 pl-14 pr-6 text-[10px] font-black uppercase text-white focus:ring-2 focus:ring-red-600/50 outline-none transition-all placeholder:text-slate-700" 
        />
      </div>

      {/* LISTA DE UTILIZADORES REAIS */}
      <div className="grid gap-4">
        {users.map((user) => (
          <div key={user.id} className="bg-slate-900/40 border border-white/5 p-6 rounded-[2rem] flex items-center justify-between group hover:border-red-500/30 hover:bg-slate-900/60 transition-all">
            <div className="flex items-center gap-5">
              {/* Avatar Dinâmico */}
              <div className="w-14 h-14 bg-slate-800 rounded-2xl flex items-center justify-center text-red-500 group-hover:scale-105 group-hover:bg-red-500 group-hover:text-white transition-all duration-500 shadow-inner">
                <Users size={24} />
              </div>
              
              <div>
                <h3 className="font-black text-white uppercase italic tracking-tight text-lg">
                  {user.username || "Utilizador Sem Nome"}
                </h3>
                <div className="flex flex-wrap items-center gap-3 mt-1">
                  <span className="text-[10px] font-bold text-slate-500 uppercase">{user.email}</span>
                  <span className="w-1 h-1 bg-slate-700 rounded-full" />
                  
                  {/* Role com cor condicional */}
                  <span className={`text-[10px] font-black uppercase tracking-tighter flex items-center gap-1 ${
                    user.role === 'ADMIN' ? 'text-red-500' : 'text-blue-400'
                  }`}>
                    <Shield size={12} /> {user.role}
                  </span>

                  <span className="w-1 h-1 bg-slate-700 rounded-full" />
                  <span className="text-[10px] font-bold text-slate-600 uppercase italic">
                    {user.phone || "S/ Telefone"}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
               {/* Badge de Status (Lógica simples por enquanto) */}
               <div className="hidden sm:block bg-green-500/10 border border-green-500/20 px-3 py-1 rounded-full">
                  <span className="text-[8px] font-black text-green-500 uppercase">Ativo</span>
               </div>
               
               <button className="p-2 text-slate-600 hover:text-white hover:bg-slate-800 rounded-xl transition-all">
                <MoreVertical size={20} />
              </button>
            </div>
          </div>
        ))}

        {users.length === 0 && (
          <div className="text-center py-20 border-2 border-dashed border-white/5 rounded-[3rem]">
            <p className="text-slate-500 font-black uppercase text-xs">Nenhum utilizador encontrado no banco de dados.</p>
          </div>
        )}
      </div>
    </div>
  );
}