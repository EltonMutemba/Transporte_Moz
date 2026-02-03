import React from "react";
import { Wallet, TrendingUp, CreditCard, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { db } from "@/lib/db";

export default async function AdminFinancePage() {
  // 1. Extração de Dados Reais
  const tickets = await db.ticket.findMany();
  const totalRevenue = tickets.reduce((acc, ticket) => acc + ticket.price, 0);
  const totalTickets = tickets.length;

  // Estatísticas fictícias para design (enquanto não temos gastos na DB)
  const stats = [
    { label: "Receita Total", value: `${totalRevenue.toLocaleString()} MT`, icon: Wallet, trend: "+12.5%", positive: true },
    { label: "Bilhetes Vendidos", value: totalTickets, icon: CreditCard, trend: "+8.2%", positive: true },
    { label: "Margem de Lucro", value: "85%", icon: TrendingUp, trend: "-2.1%", positive: false },
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      {/* HEADER */}
      <div>
        <h1 className="text-4xl font-black text-slate-900 italic uppercase tracking-tighter">
          Gestão <span className="text-red-600">Financeira</span>
        </h1>
        <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.3em] mt-2">
          Controlo de fluxo de caixa e receitas de bilheteira
        </p>
      </div>

      {/* CARDS DE SUMÁRIO */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm hover:shadow-xl transition-all">
            <div className="flex justify-between items-start mb-6">
              <div className="p-4 bg-slate-900 text-white rounded-2xl">
                <stat.icon size={24} />
              </div>
              <div className={`flex items-center gap-1 text-[10px] font-black px-3 py-1 rounded-full ${
                stat.positive ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
              }`}>
                {stat.positive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                {stat.trend}
              </div>
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
            <h3 className="text-3xl font-black text-slate-900 italic tracking-tighter">{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* LISTA DE TRANSAÇÕES RECENTES */}
      <div className="bg-slate-950 rounded-[3rem] p-10 text-white">
        <h2 className="text-xl font-black uppercase italic mb-8 flex items-center gap-3">
          <div className="w-2 h-8 bg-red-600" /> Últimas Vendas
        </h2>
        
        <div className="space-y-4">
          {tickets.length === 0 ? (
            <p className="text-slate-500 text-[10px] font-bold uppercase">Nenhuma transação registada.</p>
          ) : (
            tickets.slice(0, 5).map((t) => (
              <div key={t.id} className="flex items-center justify-between py-4 border-b border-white/5 hover:bg-white/5 px-4 rounded-xl transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-red-600/20 rounded-full flex items-center justify-center text-red-500">
                    <CreditCard size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-tighter">Bilhete #{t.id.slice(0, 8)}</p>
                    <p className="text-[8px] text-slate-500 font-bold uppercase">Passageiro: {t.passengerName}</p>
                  </div>
                </div>
                <p className="text-sm font-black text-red-500">+{t.price} MT</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}